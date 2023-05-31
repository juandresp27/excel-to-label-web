import React, { useRef, useEffect, useCallback } from 'react'

const Canvas = ({ width, height, colums, onCanvasUpdate, texts, textSize, disableTextDragging, onUpdateTextPositions }) => {
  const canvasRef = useRef(null)
  const isDraggingRef = useRef(false)
  const textPositionsRef = useRef([])
  const prevMousePositionRef = useRef({ x: 0, y: 0 })
  const activeTextIndexRef = useRef(-1)

  const updateTextPositions = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'black'
    context.font = `${textSize}px Arial`

    const lineHeight = 30
    const columnWidth = width / colums
    const paddingX = 10
    const paddingY = 30

    let currentColumn = 0
    let currentLine = 0

    textPositionsRef.current = texts.map((text, index) => {
      const measureText = context.measureText(text)
      const textWidth = measureText.width

      let x, y

      if (currentColumn === colums - 1) {
        // Última columna: poner todos los textos debajo del otro
        x = paddingX + columnWidth * currentColumn
        y = paddingY + lineHeight * currentLine
        currentLine++
      } else {
        // Columnas anteriores: colocar solo los textos que quepan en cada columna
        x = paddingX + columnWidth * currentColumn
        y = paddingY + lineHeight * currentLine
        currentLine++

        if (currentLine * lineHeight + paddingY > height) {
          // Pasar a la siguiente columna si se alcanza la altura máxima
          currentColumn++
          currentLine = 0
        }
      }

      context.fillText(text, x, y)

      return { x, y, width: textWidth, height: textSize }
    })

    if (typeof onCanvasUpdate === 'function') {
      onCanvasUpdate(canvasRef.current)
    }

    if (typeof onUpdateTextPositions === 'function') {
      onUpdateTextPositions(textPositionsRef.current)
    }
  }, [onCanvasUpdate, onUpdateTextPositions, width, height, colums, textSize, texts])

  const handleMouseDown = (event) => {
    if (disableTextDragging) {
      return
    }

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    for (let i = 0; i < textPositionsRef.current.length; i++) {
      const { x, y, width, height } = textPositionsRef.current[i]

      if (offsetX >= x && offsetX <= x + width && offsetY >= y - height && offsetY <= y) {
        isDraggingRef.current = true
        prevMousePositionRef.current = { x: offsetX, y: offsetY }
        activeTextIndexRef.current = i
        break
      }
    }
  }

  const handleMouseMove = useCallback((event) => {
    if (isDraggingRef.current && !disableTextDragging) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const offsetY = event.clientY - rect.top
      const dx = offsetX - prevMousePositionRef.current.x
      const dy = offsetY - prevMousePositionRef.current.y

      const activeTextPosition = textPositionsRef.current[activeTextIndexRef.current]
      activeTextPosition.x += dx
      activeTextPosition.y += dy
      prevMousePositionRef.current = { x: offsetX, y: offsetY }

      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'black'
      context.font = `${textSize}px Arial`

      textPositionsRef.current.forEach(({ x, y }, index) => {
        context.fillText(texts[index], x, y)
      })
    }
  }, [disableTextDragging, textSize, texts])

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current && !disableTextDragging) {
      isDraggingRef.current = false
      activeTextIndexRef.current = -1

      if (typeof onUpdateTextPositions === 'function') {
        onUpdateTextPositions(textPositionsRef.current)
      }
    }
  }, [disableTextDragging, onUpdateTextPositions])

  useEffect(() => {
    const canvas = canvasRef.current

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (canvasRef.current) {
      updateTextPositions()
    }
  }, [updateTextPositions])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
    />
  )
}

export default Canvas
