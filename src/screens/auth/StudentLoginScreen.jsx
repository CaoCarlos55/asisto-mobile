import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { styles } from '../../styles/auth/StudentLogin.styles'

export default function StudentLoginScreen({ navigation }) {
  const { loginAsStudent } = useAuth()
  const [email, setEmail] = useState('estudiante.alvarez@univ.edu')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    loginAsStudent(email)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header con icono y títulos */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <GraduationCap size={36} color="#ffffff" />
            </View>
            <Text style={styles.title}>Portal Estudiante</Text>
            <Text style={styles.subtitle}>Pase de lista automatizado y control de asistencia</Text>
          </View>

          {/* Tarjeta de Formulario */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Iniciar sesión</Text>
            <Text style={styles.cardSubtitle}>Ingresa con tus credenciales de alumno</Text>

            {/* Input Cédula / Correo */}
            <Text style={styles.inputLabel}>CÉDULA O CORREO ESTUDIANTIL</Text>
            <View style={styles.inputContainer}>
              <Mail size={18} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="estudiante.alvarez@univ.edu"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
              />
            </View>

            {/* Input Contraseña */}
            <Text style={styles.inputLabel}>CONTRASEÑA</Text>
            <View style={styles.inputContainer}>
              <Lock size={18} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="••••••••••••"
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#64748b" />
                ) : (
                  <Eye size={18} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPass}>
              <Text style={styles.forgotPassText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Botón Principal */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.loginBtnText}>Ingresar como Estudiante</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Acceso exclusivo para alumnos con matrícula activa en el período actual
            </Text>
          </View>

          {/* Switch rápido al Portal Docente */}
          <TouchableOpacity
            style={styles.switchRoleBtn}
            onPress={() => navigation.navigate('TeacherLogin')}
          >
            <Text style={styles.switchRoleText}>
              ¿Eres docente? <Text style={styles.switchRoleTextHighlight}>Ingresar al Portal Docente</Text>
            </Text>
          </TouchableOpacity>

          {/* Píldora inferior de estado */}
          <View style={styles.statusPillStudent}>
            <View style={styles.blueDot} />
            <Text style={styles.statusPillTextStudent}>Geocerca Activa • Validación de Presencia en Aula</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
