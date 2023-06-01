import { createContext, useState } from 'react'

export const PositionContext = createContext()

export function PositionProvider ({ children }) {
  const [textPositionsState, setTextPositionsState] = useState([])
  const [workbook, setWorkbook] = useState([])
  const [sheetChoosed, setSheetChoosed] = useState([])
  const [selectedRow, setSelectedRow] = useState(null) // New state for selected row
  const [filters, setFilters] = useState([])
  const [excelFileName, setExcelFileName] = useState(null)
  const [tagSize, setTagSize] = useState([302, 113])
  return (
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
        setFilters,
        excelFileName,
        setExcelFileName,
        tagSize,
        setTagSize
      }}
    >
      {children}
    </PositionContext.Provider>
  )
}
