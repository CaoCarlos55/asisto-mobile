import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'

const AuthContext = createContext(null)

export const DEFAULT_TEACHER = {
  id: 'doc-001',
  role: 'teacher',
  name: 'Prof. Roberto García',
  email: 'profesor.garcia@institucion.edu',
  dept: 'Área de Matemáticas • Año Escolar 2025-2026',
  initials: 'RG'
}

export const DEFAULT_STUDENT = {
  id: 'est-001',
  role: 'student',
  name: 'Daniel Álvarez',
  email: 'estudiante.alvarez@institucion.edu',
  ci: 'V-29.842.119',
  section: '4to Año • Sección B',
  campus: 'En el Plantel (Aula 12)',
  initials: 'DA'
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    async function loadStoredSession() {
      try {
        const stored = await AsyncStorage.getItem('asisto_user_session')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed.dept?.includes('Ingeniería') || parsed.email?.includes('ucab.edu.ve') || parsed.section?.includes('Semestre')) {
            await AsyncStorage.removeItem('asisto_user_session')
            return
          }
          setCurrentUser(parsed)
          setUserRole(parsed.role)
        }
      } catch (e) {
        console.warn('Error al cargar sesión:', e)
      } finally {
        setIsLoadingAuth(false)
      }
    }
    loadStoredSession()
  }, [])

  const loginAsTeacher = async (email = 'profesor.garcia@institucion.edu') => {
    const profile = { ...DEFAULT_TEACHER, email }
    setCurrentUser(profile)
    setUserRole('teacher')
    await AsyncStorage.setItem('asisto_user_session', JSON.stringify(profile))
  }

  const loginAsStudent = async (email = 'estudiante.alvarez@institucion.edu') => {
    const profile = { ...DEFAULT_STUDENT, email }
    setCurrentUser(profile)
    setUserRole('student')
    await AsyncStorage.setItem('asisto_user_session', JSON.stringify(profile))
  }

  const logout = async () => {
    setCurrentUser(null)
    setUserRole(null)
    await AsyncStorage.removeItem('asisto_user_session')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        isLoadingAuth,
        loginAsTeacher,
        loginAsStudent,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
