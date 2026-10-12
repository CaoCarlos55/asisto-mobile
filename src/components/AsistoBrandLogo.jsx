import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SquareCheck } from 'lucide-react-native'

export default function AsistoBrandLogo({
  size = 56,
  iconSize = 30,
  showTitle = true,
  title = 'Asisto',
  subtitle = null
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.brandBox, { width: size, height: size, borderRadius: Math.round(size * 0.28) }]}>
        <SquareCheck size={iconSize} color="#ffffff" strokeWidth={2.5} />
      </View>
      {showTitle && <Text style={styles.brandTitle}>{title}</Text>}
      {subtitle && <Text style={styles.brandSubtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  brandBox: {
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginTop: 8
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    textAlign: 'center'
  }
})
