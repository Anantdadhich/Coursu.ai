import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gemini-2.0-flash", 
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
  
    let output_format_prompt: string = `\nYou are to output valid JSON that strictly follows this format: ${JSON.stringify(
      output_format
    )}. 
    
    IMPORTANT REQUIREMENTS:
    1. The output must be valid JSON that can be parsed with JSON.parse()
    2. Do not include markdown formatting, code blocks, or any text outside of the JSON object
    3. Do not include backticks or any other delimiters around the JSON
    4. Do not escape quotes within the JSON unless necessary for valid JSON
    5. Do not put unnecessary quotation marks or escape characters in output fields`;

    if (list_output) {
      output_format_prompt += `\n6. If an output field is a list, classify the output into the most appropriate element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\n7. Any text enclosed by < and > indicates you must generate content to replace it. Example: For '<location>', generate an appropriate location name.\n8. Any output key containing < and > indicates you must generate the key name to replace it.`;
    }

    if (list_input) {
      output_format_prompt += `\n9. Generate an array of JSON objects, one for each input element.`;
    }

    // Get the appropriate model with updated parameters
    const geminiModel = genAI.getGenerativeModel({ 
      model: model,
      generationConfig: {
        temperature: temperature,
        maxOutputTokens: 8192,
      }
    });

    const fullPrompt = system_prompt + output_format_prompt + error_msg + "\n" + (Array.isArray(user_prompt) ? JSON.stringify(user_prompt) : user_prompt);

    try {
      if (verbose) {
        console.log("Sending prompt:", fullPrompt);
      }

      const result = await geminiModel.generateContent(fullPrompt);
      const response = await result.response;
      let responseText = response.text();
      
      // Clean up the response to ensure it's valid JSON
      responseText = responseText.trim();
      
      // Remove markdown code blocks if present
      responseText = responseText.replace(/```(json|javascript)?\n/g, '').replace(/\n```$/g, '');
      
      if (verbose) {
        console.log("\nRaw Gemini response:", responseText);
      }

      // Try to parse the JSON
      let output: any;
      try {
        output = JSON.parse(responseText);
      } catch (parseError) {
        // If parsing fails, try some recovery methods
        // Replace single quotes with double quotes
        let cleaned = responseText.replace(/'/g, '"');
        // Fix common JSON formatting issues
        cleaned = cleaned.replace(/(\w)"(\w)/g, "$1'$2");
        // Try again
        try {
          output = JSON.parse(cleaned);
        } catch (secondParseError) {
          throw new Error(`Failed to parse response as JSON: ${secondParseError}`);
        }
      }

      // Normalize output to always be an array for consistent processing
      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Expected an array of objects, but got a single object");
        }
      } else {
        output = [output];
      }

      // Validate and process each output item
      for (let index = 0; index < output.length; index++) {
        const item = output[index];
        
        // Check required keys
        for (const key in output_format) {
          if (/<.*?>/.test(key)) {
            continue; // Skip dynamic keys
          }

          if (!(key in item)) {
            throw new Error(`Required key '${key}' missing in output item ${index}`);
          }

          // Handle array values (categories)
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            
            // If the output is an array, take the first element
            if (Array.isArray(item[key])) {
              item[key] = item[key][0];
            }
            
            // Check if the value is in the allowed choices
            if (!choices.includes(item[key])) {
              if (default_category) {
                item[key] = default_category;
              } else {
                throw new Error(`Value '${item[key]}' for key '${key}' not in allowed choices: ${choices.join(', ')}`);
              }
            }
            
            // Clean up any category labels
            if (typeof item[key] === 'string' && item[key].includes(":")) {
              item[key] = item[key].split(":")[0].trim();
            }
          }
        }

        // If only values are requested, transform the output
        if (output_value_only) {
          output[index] = Object.values(item);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      // Return the final processed output
      return list_input ? output : output[0];
      
    } catch (e: any) {
      // Handle rate limiting errors specifically
      if (e.status === 429) {
        const retryDelay = e.errorDetails?.[2]?.retryDelay || '60s';
        const delayMs = parseInt(retryDelay) * 1000;
        console.log(`Rate limited. Waiting ${retryDelay} before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }

      error_msg = `\n\nError in previous attempt: ${e}\nPlease fix the issues and ensure the response is valid JSON.`;
      console.log("Attempt failed:", e);
      
      // On the last attempt, throw the error
      if (i === num_tries - 1) {
        throw new Error(`Failed to generate valid output after ${num_tries} attempts: ${e}`);
      }
    }
  }

  return []; // Return empty array if all attempts fail (should not reach here with the error throw above)
}
