import {createContext, useState} from 'react'

export const PositionContext = createContext()

export function PositionProvider({children}){
    const [textPositionsState, setTextPositionsState] = useState([])
    const [workbook, setWorkbook] = useState([])
    const [sheetChoosed, setSheetChoosed] = useState([])
    const [selectedRow, setSelectedRow] = useState(null); // New state for selected row
    const [filters, setFilters] = useState([])

    return(
        <PositionContext.Provider
        value={{
            textPositionsState, 
            setTextPositionsState,
            workbook, 
            setWorkbook,
            sheetChoosed, 
            setSheetChoosed,
            selectedRow, 
            setSelectedRow,
            filters, 
            setFilters
        }}
        >
            {children}
        </PositionContext.Provider>
    )
}