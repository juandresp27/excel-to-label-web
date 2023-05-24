import { useState, useEffect } from "react"
import * as XLSX from 'xlsx'

export function useSheetToJson({sheets, sheetChoosed}){
    const [jsonResult, setJsonResult] = useState()
  
    useEffect(()=>{
      const worksheet = sheets[Object.keys(sheetChoosed)[0]]
      worksheet &&  setJsonResult(XLSX.utils.sheet_to_json(worksheet)) 
    },[sheetChoosed])

    return {jsonResult}
}