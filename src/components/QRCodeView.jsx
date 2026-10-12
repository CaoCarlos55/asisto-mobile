import React, { useMemo } from 'react'
import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

// Generador de matriz QR Version 2 (25x25 módulos) de alta densidad
function generateQRMatrix() {
  const size = 25
  const matrix = Array.from({ length: size }, () => Array(size).fill(false))
  const isReserved = Array.from({ length: size }, () => Array(size).fill(false))

  // Patrón de detección de posición (Finder Pattern 7x7)
  const placeFinder = (r0, c0) => {
    // Área reservada con separador
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = r0 + r
        const nc = c0 + c
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          isReserved[nr][nc] = true
          matrix[nr][nc] = false
        }
      }
    }

    // Dibujar patrón 7x7 (borde exterior 7x7, blanco intermedio, centro 3x3)
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4
        matrix[r0 + r][c0 + c] = isBorder || isCenter
      }
    }
  }

  // 3 esquinas estándar de QR
  placeFinder(0, 0)
  placeFinder(0, 18)
  placeFinder(18, 0)

  // Patrones de sincronización (Timing patterns en fila 6 y columna 6)
  for (let i = 8; i <= 16; i++) {
    isReserved[6][i] = true
    matrix[6][i] = i % 2 === 0
    isReserved[i][6] = true
    matrix[i][6] = i % 2 === 0
  }

  // Patrón de alineación en (18, 18)
  for (let r = 16; r <= 20; r++) {
    for (let c = 16; c <= 20; c++) {
      isReserved[r][c] = true
      const isBorder = r === 16 || r === 20 || c === 16 || c === 20
      const isCenter = r === 18 && c === 18
      matrix[r][c] = isBorder || isCenter
    }
  }

  // Patrón de datos pseudoaleatorio determinista (Asistencia Dinámica Asisto)
  let seed = 0x7c49b2
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isReserved[r][c]) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff
        const bit = ((seed >> 16) & 1) === 1
        const mask = (r + c) % 2 === 0 || (r * c) % 3 === 0
        matrix[r][c] = bit ^ mask
      }
    }
  }

  return matrix
}

export default function QRCodeView({ size = 220, color = '#0f172a', bgColor = '#ffffff' }) {
  const matrix = useMemo(() => generateQRMatrix(), [])
  const matrixSize = 25
  const padding = 2
  const totalUnits = matrixSize + padding * 2 // 29 unidades

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${totalUnits} ${totalUnits}`}
      >
        {/* Fondo blanco completo */}
        <Rect x="0" y="0" width={totalUnits} height={totalUnits} fill={bgColor} rx="1" />

        {/* Celdas del código QR */}
        {matrix.map((row, r) =>
          row.map((isDark, c) => {
            if (!isDark) return null
            return (
              <Rect
                key={`m-${r}-${c}`}
                x={c + padding}
                y={r + padding}
                width="1.04"
                height="1.04"
                fill={color}
              />
            )
          })
        )}
      </Svg>
    </View>
  )
}
