import './SizeSlider.css'
import { useContext } from 'react'
import { PositionContext } from '../Positions'

export function SizeSlider () {
  const { tagSize, setTagSize } = useContext(PositionContext)
  const pxToCm = 0.0264583333
  const handleChangeWidth = (e) => {
    const width = Number(e.target.value)
    setTagSize(prevState => [width, prevState[1]])
    console.log('w', width)
  }

  const handleChangeHeight = (e) => {
    const heigth = Number(e.target.value)
    setTagSize(prevState => [prevState[0], heigth])
    console.log('h', heigth)
  }

  return (
    <>
      <div className='w-full flex gap-3 mb-1'>
        <label className='w-[3rem]' htmlFor='width'>Width</label>
        <input
          className='w-[50%] custom-slider'
          type='range'
          name='width'
          id='width'
          min={1 / pxToCm}
          max={12 / pxToCm}
          step={1 / pxToCm}
          defaultValue={8 / pxToCm}
          onChange={handleChangeWidth}
        />
        <p>{Math.round(tagSize[0] * pxToCm)} cm</p>
      </div>
      <div className='flex gap-3'>
        <label className='w-[3rem]' htmlFor='height'>Height</label>
        <input
          className='w-[50%] custom-slider'
          type='range'
          name='height'
          id='height'
          min={1 / pxToCm}
          max={12 / pxToCm}
          step={1 / pxToCm}
          defaultValue={3 / pxToCm}
          onChange={handleChangeHeight}
        />
        <p>{Math.round(tagSize[1] * pxToCm)} cm</p>
      </div>
    </>
  )
}
