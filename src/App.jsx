import './App.css'
import { columsOptions } from './config'
import toast, { Toaster } from 'react-hot-toast'

import { useContext, useEffect } from 'react'

import { PositionContext } from './Positions'

import CanvasControls from './components/CanvasControls'
import { InputExcel } from './components/InputExcel'
import { Header } from './components/Header'
import Select from './components/Select'
import { Table } from './components/Table'

import { useSheets } from './hooks/useSheets'
import { useSheetToJson } from './hooks/useSheetToJson'
import useFilter from './hooks/useFilter'

function App () {
  const { workbook, sheetChoosed, setSheetChoosed, filters, setFilters, setSelectedRow, excelFileName } = useContext(PositionContext)
  const { sheets } = useSheets({ workbook })
  const { jsonResult } = useSheetToJson({ sheets, sheetChoosed })

  const { filteredJsonResult } = useFilter({ jsonResult, filters, workbook })

  useEffect(() => {
    workbook.length !== 0 && jsonResult.length !== 0 && setFilters(new Array(Object.keys(jsonResult[0]).length).fill(''))
  }, [jsonResult])

  useEffect(() => {
    if (sheetChoosed.length !== 0) {
      toast.success('Sheet Imported, select a row in table', {
        duration: 3000,
        position: 'buttom-right',

        // Styling
        style: {
          background: '#301c6a67',
          color: '#fff'
        },
        className: '',

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#429649',
          secondary: '#fff'
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite'
        }
      })
    }
  }, [sheetChoosed])

  return (
    <>
      <Header />
      <section className='input-selection'>
        <InputExcel Workbook={workbook} />
        {
        workbook.length !== 0
          ? (
            <div className='flex flex-col items-center justify-center p-2'>
              <h3 className='text-[#2F1C6A]'>{excelFileName}</h3>
              {
                sheetChoosed.length !== 0
                  ? (<></>)
                  : (<p className='justify-center pt-2 text-[#301c6a67] italic text-sm'>Choose a sheet</p>)
              }
              <div className='w-full max-w-xs mx-auto'>
                <Select
                  options={Object.keys(sheets)}
                  selectedOption={Object.keys(sheetChoosed)}
                  handelChange={(event) => {
                    setSheetChoosed(Object.fromEntries(Object.entries(sheets).filter(([key]) => key === event)))
                    setSelectedRow(null)
                  }}
                />
              </div>
            </div>
            )
          : (<></>)
        }
      </section>

      {jsonResult && (
        <section className='content-tags'>
          {
          jsonResult && (
            <Table
              JsonInput={jsonResult}
              Position={0}
            />)
          }
          <aside className='flex flex-col items-center'>
            {jsonResult && (
              <CanvasControls
                tags={filteredJsonResult}
                columsOptions={columsOptions}
              />)}
          </aside>
        </section>
      )}
      <Toaster />
    </>
  )
}

export default App
