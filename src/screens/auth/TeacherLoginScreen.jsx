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
import { styles } from '../../styles/auth/TeacherLogin.styles'

export default function TeacherLoginScreen({ navigation }) {
  const { loginAsTeacher } = useAuth()
  const [email, setEmail] = useState('profesor.garcia@universidad.edu')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    loginAsTeacher(email)
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
            <Text style={styles.title}>Portal Docente</Text>
            <Text style={styles.subtitle}>Control de Asistencia y Gestión de Aula</Text>
          </View>

          {/* Tarjeta de Formulario */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Iniciar sesión</Text>
            <Text style={styles.cardSubtitle}>Ingresa con tus credenciales institucionales</Text>

            {/* Input Cédula / Correo */}
            <Text style={styles.inputLabel}>CÉDULA O CORREO INSTITUCIONAL</Text>
            <View style={styles.inputContainer}>
              <Mail size={18} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="profesor.garcia@universidad.edu"
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
              <Text style={styles.loginBtnText}>Ingresar al Aula</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>Acceso exclusivo para personal docente autorizado</Text>
          </View>

          {/* Switch rápido al Portal Estudiante */}
          <TouchableOpacity
            style={styles.switchRoleBtn}
            onPress={() => navigation.navigate('StudentLogin')}
          >
            <Text style={styles.switchRoleText}>
              ¿Eres estudiante? <Text style={styles.switchRoleTextHighlight}>Ingresar como Estudiante</Text>
            </Text>
          </TouchableOpacity>

          {/* Píldora inferior de estado */}
          <View style={styles.statusPillTeacher}>
            <View style={styles.greenDot} />
            <Text style={styles.statusPillTextTeacher}>Servidor Académico Central • Sincronización Lista</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
