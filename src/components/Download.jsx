import './Download.css'
import { jsPDF as JSPDF } from 'jspdf'

export function Download ({ TextsPosition, JsonResult, RowSelected, Size, HeaderQty }) {
  const [width, height] = Size
  const pxToCm = 0.0264583333

  const handleClickOne = () => {
    const doc = new JSPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [width * pxToCm, height * pxToCm]
    })

    const tagData = JsonResult[RowSelected]
    TextsPosition.forEach((position, index) => {
      const { x, y, height: fontSize } = position
      const key = Object.keys(tagData)[index]
      const value = tagData[key]

      doc.setFontSize(fontSize / 1.35)
      doc.text(x * pxToCm, y * pxToCm, `${key}: ${value}`)
    })
    doc.save('tag.pdf')
  }

  const handleClickAccQty = () => {
    const doc = new JSPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [width * pxToCm, height * pxToCm]
    })

    const tagData = JsonResult[RowSelected]
    const headerQty = tagData[HeaderQty]

    if (typeof headerQty === 'number') {
      for (let i = 0; i < headerQty; i++) {
        TextsPosition.forEach((position, index) => {
          const { x, y, height: fontSize } = position
          const key = Object.keys(tagData)[index]
          const value = tagData[key]

          doc.setFontSize(fontSize / 1.35)
          doc.text(x * pxToCm, y * pxToCm, `${key}: ${value}`)
        })

        doc.addPage()
      }
      doc.save('tag.pdf')
    }
  }

  const handleClickAll = () => {
    const doc = new JSPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [width * pxToCm, height * pxToCm]
    })

    // const tagData = JsonResult[RowSelected]

    JsonResult.forEach((tag) => {
      const headerQty = tag[HeaderQty]
      if (typeof headerQty === 'number') {
        for (let i = 0; i < headerQty; i++) {
          TextsPosition.forEach((position, index) => {
            const { x, y, height: fontSize } = position
            const key = Object.keys(tag)[index]
            const value = tag[key]

            doc.setFontSize(fontSize / 1.35)
            doc.text(x * pxToCm, y * pxToCm, `${key}: ${value}`)
          })

          doc.addPage()
        }
      }
    })
    doc.save('tag.pdf')
  }

  return (
    <div className='grid-container'>
      <button
        onClick={handleClickOne}
        className='flex item1 items-center gap-1 bg-[#301c6a] text-white hover:bg-[#432797] mt-1 w-fit px-3 py-1 rounded-xl text-justify'
        type='button'
      >
        <img src='pdf17.svg' width={18} height={18} alt='' /> Etiqueta única
      </button>

      <button
        onClick={handleClickAccQty}
        className='flex  items-center gap-1 bg-[#301c6a] text-white hover:bg-[#432797] my-1 w-fit px-3 py-1 rounded-xl text-justify'
        type='button'
      >
        <img src='pdf17.svg' width={18} height={18} alt='' /> Etiqueta según Field
      </button>

      <button
        onClick={handleClickAll}
        className='flex  items-center gap-1 bg-[#301c6a] text-white hover:bg-[#432797] my-1 w-fit px-3 py-1 rounded-xl text-justify'
        type='button'
      >
        <img src='pdf17.svg' width={18} height={18} alt='' /> Todas
      </button>

    </div>
  )
}
