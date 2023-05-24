import { useState, useEffect } from "react"

export function useSheets({workbook}){
    const[sheets, setSheets] = useState([])

    useEffect(()=>{
    setSheets(workbook.Sheets || [])
    },[workbook])

    return {sheets}
}