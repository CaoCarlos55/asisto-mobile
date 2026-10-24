import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'

const AuthContext = createContext(null)

export const DEFAULT_TEACHER = {
  id: 'doc-001',
  role: 'teacher',
  name: 'Prof. Roberto García',
  email: 'profesor.garcia@institucion.edu',
  ci: 'V-12.345.678',
  subject: 'Matemática',
  classroomId: '204',
  section: 'Sección B',
  yearLevel: '5to Año',
  scheduleSlot: 'martes-slot-4',
  dept: 'Área de Matemática • Año Escolar 2026-2027',
  initials: 'RG'
}

export const DEFAULT_STUDENT = {
  id: 'est-001',
  role: 'student',
  name: 'Daniel Álvarez',
  email: 'estudiante.alvarez@institucion.edu',
  ci: 'V-28.452.190',
  section: 'Sección B',
  yearLevel: '5to Año',
  subject: 'Matemática',
  classroomId: '204',
  campus: 'En el Plantel (Aula 204)',
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
          // Limpiar sesiones obsoletas de desarrollo previo
          if (
            parsed.dept?.includes('Ingeniería') ||
            parsed.email?.includes('ucab.edu.ve') ||
            parsed.campus?.includes('Aula 12')
          ) {
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

  // Inicio de sesión Docente con Supabase Auth y sincronización de perfil
  const loginAsTeacher = async (email = 'profesor.garcia@institucion.edu', password = '••••••••••••') => {
    const cleanEmail = String(email).trim().toLowerCase()
    let teacherProfile = null

    if (supabase) {
      try {
        // 1. Intentar inicio de sesión oficial con contraseña si no es el placeholder
        if (password && !password.includes('••••')) {
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password
          }).catch(() => {})
        }

        // 2. Consultar perfil institucional en public.profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .ilike('email', cleanEmail)
          .maybeSingle()

        if (data) {
          teacherProfile = {
            id: data.id,
            role: 'teacher',
            name: data.full_name,
            email: data.email,
            ci: data.ci || 'V-12.345.678',
            subject: data.subject || 'Matemática',
            classroomId: data.classroom_id || '204',
            section: data.section || 'Sección B',
            yearLevel: data.year_level || '5to Año',
            scheduleSlot: data.schedule_slot || 'martes-slot-4',
            dept: `Área de ${data.subject || 'Matemática'} • Año Escolar 2026-2027`,
            initials: data.avatar_initials || data.full_name?.substring(0, 2).toUpperCase() || 'RG'
          }
        }
      } catch (err) {
        console.warn('Advertencia consultando perfil docente en Supabase:', err)
      }
    }

    // Fallback con datos consistentes si no se obtuvo de la BD
    if (!teacherProfile) {
      teacherProfile = {
        ...DEFAULT_TEACHER,
        email: cleanEmail,
        name: cleanEmail.includes('mendez')
          ? 'Prof. Patricia Méndez'
          : cleanEmail.includes('torres')
          ? 'Prof. Carlos Torres'
          : cleanEmail.includes('ortiz')
          ? 'Prof. Carmen Ortiz'
          : 'Prof. Roberto García',
        subject: cleanEmail.includes('mendez')
          ? 'Física'
          : cleanEmail.includes('torres')
          ? 'Matemática'
          : cleanEmail.includes('ortiz')
          ? 'Química'
          : 'Matemática',
        classroomId: cleanEmail.includes('mendez')
          ? '101'
          : cleanEmail.includes('torres')
          ? '102'
          : cleanEmail.includes('ortiz')
          ? '97'
          : '204'
      }
    }

    setCurrentUser(teacherProfile)
    setUserRole('teacher')
    await AsyncStorage.setItem('asisto_user_session', JSON.stringify(teacherProfile))
    return teacherProfile
  }

  // Inicio de sesión Estudiante (admite correo institucional o Cédula C.I.)
  const loginAsStudent = async (emailOrCi = 'estudiante.alvarez@institucion.edu', password = '••••••••••••') => {
    const cleanInput = String(emailOrCi).trim()
    let studentProfile = null

    if (supabase) {
      try {
        const isEmail = cleanInput.includes('@')
        let profileData = null

        if (isEmail) {
          if (password && !password.includes('••••')) {
            await supabase.auth.signInWithPassword({
              email: cleanInput.toLowerCase(),
              password: password
            }).catch(() => {})
          }

          const { data } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', cleanInput.toLowerCase())
            .maybeSingle()
          profileData = data
        } else {
          // Búsqueda por Cédula (C.I.)
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .ilike('ci', `%${cleanInput.replace(/[^0-9]/g, '')}%`)
            .maybeSingle()
          profileData = data
        }

        // Si no está en profiles, buscar en la nómina de students
        let studentRow = null
        if (!profileData) {
          const { data: std } = await supabase
            .from('students')
            .select('*')
            .or(`ci.ilike.%${cleanInput}%,name.ilike.%${cleanInput}%`)
            .maybeSingle()
          studentRow = std
        }

        if (profileData || studentRow) {
          const name = profileData?.full_name || studentRow?.name || 'Daniel Álvarez'
          const ci = profileData?.ci || studentRow?.ci || 'V-28.452.190'
          const section = profileData?.section || studentRow?.section || 'Sección B'
          const classroomId = profileData?.classroom_id || '204'
          const subject = profileData?.subject || 'Matemática'

          studentProfile = {
            id: profileData?.id || studentRow?.id || 'est-001',
            role: 'student',
            name: name,
            email: profileData?.email || `${cleanInput}@institucion.edu`,
            ci: ci,
            section: section,
            yearLevel: profileData?.year_level || '5to Año',
            subject: subject,
            classroomId: classroomId,
            campus: `En el Plantel (Aula ${classroomId})`,
            initials: profileData?.avatar_initials || name.substring(0, 2).toUpperCase() || 'DA'
          }
        }
      } catch (err) {
        console.warn('Advertencia consultando estudiante en Supabase:', err)
      }
    }

    if (!studentProfile) {
      studentProfile = {
        ...DEFAULT_STUDENT,
        email: cleanInput.includes('@') ? cleanInput : DEFAULT_STUDENT.email,
        ci: !cleanInput.includes('@') ? cleanInput : DEFAULT_STUDENT.ci
      }
    }

    setCurrentUser(studentProfile)
    setUserRole('student')
    await AsyncStorage.setItem('asisto_user_session', JSON.stringify(studentProfile))
    return studentProfile
  }

  // Cierre de sesión completo y seguro
  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut().catch(() => {})
      }
      await AsyncStorage.removeItem('asisto_user_session')
      await AsyncStorage.removeItem('asisto_session_state')
    } catch (e) {
      console.warn('Error al limpiar sesión en almacenamiento:', e)
    } finally {
      setCurrentUser(null)
      setUserRole(null)
    }
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
