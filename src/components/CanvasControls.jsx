import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import {PositionContext} from '../Positions'

import Canvas from './Canvas';
import { Download } from './Download';

const CanvasControls = ({ tags,  tagsOptions, columsOptions}) => {

  const {textPositionsState, setTextPositionsState, selectedRow} = useContext(PositionContext);

  const canvasRef = useRef(null);
  const textPositionsRef = useRef([]);
  const [selectedSize, setSelectedSize] = useState(tagsOptions[0].value);
  const [selectedColumn, setSelectedColumn] = useState(columsOptions[0]);
  const [selectedTextSize, setSelectedTextSize] = useState(20);
  const [qtyToChoose, setQtyToChoose] = useState('');

  const [texts, setTexts] = useState([])

  const handleUpdateTextPositions = useCallback((positions) => {
    textPositionsRef.current = positions;
    setTextPositionsState([...textPositionsRef.current]);
  }, []);

  const handleCanvasRef = (canvas) => {
    canvasRef.current = canvas;
  };

  const handleChangeSelect = (e) => {
    setSelectedSize(JSON.parse(e.target.value));
  };

  const handleChangeSelect2 = (e) => {
    setSelectedColumn(JSON.parse(e.target.value));
  };

  const handleChangeSelect3 = (e) => {
    setSelectedTextSize(JSON.parse(e.target.value));
  };

  const handleChangeSelectQty = (e) => {
    setQtyToChoose((e.target.value));
  };

  useEffect(()=>{
    const tagSelected = tags[selectedRow] || {};
    setTexts(Object.entries(tagSelected).map(([key, value]) => `${key}: ${value}`))

  },[tags, selectedRow])
  
  

  return (
    <div className='flex flex-col w-fit m-auto text-[#301c6a]'>
      <label htmlFor="tag-size">Elige tamaño etiqueta: </label>
      <select className='bg-[#301c6a67] text-white rounded-lg' name="tag-size" id="tag-size" onChange={handleChangeSelect}>
        {tagsOptions.map((option, index) => (
          <option key={index} value={JSON.stringify(option.value)}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="tag-colums"> Elige cuantas columnas </label>
      <select className='bg-[#301c6a67] text-white rounded-lg' name="tag-colums" id="tag-colums" onChange={handleChangeSelect2}>
        {columsOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="tag-text-size"> Elige tamaño del texto </label>
      <select className='bg-[#301c6a67] text-white rounded-lg' name="tag-text-size" id="tag-text-size" onChange={handleChangeSelect3}>
        {Array.from({ length: 46 }, (_, index) => index + 5).map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      
      <section className='w-fit border-2 mt-2 border-[#301c6a31]'>
        <Canvas
          width={selectedSize[0]}
          height={selectedSize[1]}
          onCanvasRef={handleCanvasRef}
          onUpdateTextPositions={handleUpdateTextPositions}
          texts={texts}
          textSize={selectedTextSize}
          disableTextDragging={false}
          colums={selectedColumn}
        />
      </section>

      {(selectedRow!==null) && <div>
        <section>
          <label htmlFor="qty-selector" >Seleccione campo Qty: </label>
          <select name="qty-selector" id="qty-selector" className='mt-1 bg-[#301c6a67] text-white rounded-lg' onChange={handleChangeSelectQty}>
            {Object.keys(tags[selectedRow]).map((key,index)=>(
              <option key={index} value={key}>{key}</option>
              ))}
          </select>
        </section>
      

        <Download
          TextsPosition = {textPositionsState}
          JsonResult = {tags}
          RowSelected = {selectedRow}
          Size = {selectedSize}
          HeaderQty={qtyToChoose}
        />
      </div>
      }
    </div>
  );
};

export default CanvasControls;
