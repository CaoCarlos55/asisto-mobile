import React, { useMemo } from 'react'
import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'
import QRCode from 'qrcode'

export default function QRCodeView({
  value = 'ASISTO-SESSION-001',
  size = 220,
  color = '#0f172a',
  bgColor = '#ffffff'
}) {
  const { matrix, matrixSize } = useMemo(() => {
    try {
      const qr = QRCode.create(String(value), { errorCorrectionLevel: 'M' })
      const s = qr.modules.size
      const grid = []
      for (let r = 0; r < s; r++) {
        const row = []
        for (let c = 0; c < s; c++) {
          row.push(qr.modules.get(r, c) === 1)
        }
        grid.push(row)
      }
      return { matrix: grid, matrixSize: s }
    } catch (e) {
      console.warn('Error al generar código QR dinámico:', e)
      return { matrix: [], matrixSize: 21 }
    }
  }, [value])

  const padding = 2
  const totalUnits = matrixSize + padding * 2

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${totalUnits} ${totalUnits}`}
      >
        {/* Fondo blanco completo */}
        <Rect x="0" y="0" width={totalUnits} height={totalUnits} fill={bgColor} rx="1" />

        {/* Celdas dinámicas del código QR */}
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
