import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'

const AuthContext = createContext(null)

export const DEFAULT_TEACHER = {
  id: 'doc-001',
  role: 'teacher',
  name: 'Prof. Roberto García',
  email: 'profesor.garcia@universidad.edu',
  dept: 'Dpto. de Computación • Semestre 2026-II',
  initials: 'RG'
}

export const DEFAULT_STUDENT = {
  id: 'est-001',
  role: 'student',
  name: 'Daniel Álvarez',
  email: 'estudiante.alvarez@univ.edu',
  ci: 'V-29.842.119',
  section: 'Sección B',
  campus: 'En Campus (Aula 204)',
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

  const loginAsTeacher = async (email = 'profesor.garcia@universidad.edu') => {
    const profile = { ...DEFAULT_TEACHER, email }
    setCurrentUser(profile)
    setUserRole('teacher')
    await AsyncStorage.setItem('asisto_user_session', JSON.stringify(profile))
  }

  const loginAsStudent = async (email = 'estudiante.alvarez@univ.edu') => {
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
