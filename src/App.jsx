import './App.css'
import { tagsOptions, columsOptions} from './config'

import { useContext, useEffect } from 'react';

import { PositionContext } from './Positions';

import CanvasControls from './components/CanvasControls'
import { InputExcel } from './components/InputExcel';
import { Header } from './components/Header';
import Select from './components/Select';
import { Table } from './components/Table';

import { useSheets } from './hooks/useSheets';
import { useSheetToJson } from './hooks/useSheetToJson';
import useFilter from './hooks/useFilter';



function App() {

  const {workbook, sheetChoosed, setSheetChoosed, filters, setFilters, setSelectedRow} = useContext(PositionContext)
  const {sheets} = useSheets({workbook})
  const {jsonResult} = useSheetToJson({sheets, sheetChoosed})

  const {filteredJsonResult} = useFilter({jsonResult, filters, workbook})
  
  useEffect(()=>{
    workbook.length !== 0 && jsonResult.length !== 0 && setFilters(new Array(Object.keys(jsonResult[0]).length).fill(''))
  },[jsonResult])

  return (
    <>
      <Header/>
      <section className='input-selection'>
        <InputExcel Workbook={workbook}/>
        {workbook.length !== 0 ? <div className="flex flex-col items-center justify-center p-2">
        {sheetChoosed.length !== 0 ? (<></>) : (<p className='justify-center pt-2'>Choose a sheet</p>)}
          <div className="w-full max-w-xs mx-auto">
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
        :(<></>)
        }
      </section>
      
      {jsonResult && <section className='content-tags'>
        {jsonResult && <Table
          JsonInput = {jsonResult}
          Position = {0}
        />}
        <aside className='flex flex-col items-center'>
          {jsonResult && <><CanvasControls 
              tags = {filteredJsonResult}
              tagsOptions = {tagsOptions}
              columsOptions={columsOptions}
            />
            </>
          } 
        </aside>
      </section>
      }
    </>
  );
};

export default App
