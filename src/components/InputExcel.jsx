import './InputExcel.css'
import * as XLSX from 'xlsx'

import { useContext, useEffect } from 'react';
import {PositionContext} from '../Positions'

export function InputExcel({Workbook}){
  const {setWorkbook} = useContext(PositionContext)

  const handleChange = async(e)=>{
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      setWorkbook(wb)
  }

  useEffect(() => {
    const inputArea = document.querySelector('.input-area');
    if (Workbook.length !== 0) {
      inputArea.classList.add('small-input-area'); // Agregar clase para cambiar el tamaño
    } else {
      inputArea.classList.remove('small-input-area'); // Remover clase para restaurar el tamaño completo
    }
  }, [Workbook]);

    return(
      <div className='input-area' style={{display: 'flex', verticalAlign: 'middle'}}>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-[#301c6a67] border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-[#301c6a1f]">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-[#301c6a67]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-[#301c6a67] dark:text-[#301c6a67]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-[#301c6a67] dark:text-[#301c6a67]">EXCEL FILE (.xlsx)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleChange}/>
          </label>
        </div> 
      </div>
      
    )
}