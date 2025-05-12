import { useEffect, useState } from "react"



export const UserCountDisplay=()=>{
    const [usercount,setUserCount]=useState(0)
    useEffect(()=>{
        const fetchusercount=async()=>{
            const response=await fetch("/api/usercount")
            const data=await response.json()
            setUserCount(data.usercount)
        }
        fetchusercount()
    },[])
    return(
       
        <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
        🚀 {usercount ?? "..."} users are currently exploring Coursu.ai!
      </p>
    
    )
}