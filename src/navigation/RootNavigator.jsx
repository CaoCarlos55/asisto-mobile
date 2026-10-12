import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../context/AuthContext'

// Auth Screens
import TeacherLoginScreen from '../screens/auth/TeacherLoginScreen'
import StudentLoginScreen from '../screens/auth/StudentLoginScreen'

// Teacher Screens (HU01 - HU05, HU10)
import TeacherOutOfScheduleScreen from '../screens/teacher/TeacherOutOfScheduleScreen'
import TeacherClassDashboardScreen from '../screens/teacher/TeacherClassDashboardScreen'
import TeacherQRScreen from '../screens/teacher/TeacherQRScreen'
import TeacherCancelClassModal from '../screens/teacher/TeacherCancelClassModal'
import TeacherRosterScreen from '../screens/teacher/TeacherRosterScreen'
import TeacherManualAttendanceModal from '../screens/teacher/TeacherManualAttendanceModal'
import TeacherLogbookScreen from '../screens/teacher/TeacherLogbookScreen'
import TeacherCloseClassModal from '../screens/teacher/TeacherCloseClassModal'

// Student Screens (HU06 - HU09)
import StudentHomeScreen from '../screens/student/StudentHomeScreen'
import StudentScannerScreen from '../screens/student/StudentScannerScreen'
import StudentSuccessPresentScreen from '../screens/student/StudentSuccessPresentScreen'
import StudentSuccessLateScreen from '../screens/student/StudentSuccessLateScreen'
import StudentIncidentFormScreen from '../screens/student/StudentIncidentFormScreen'
import StudentIncidentSuccessScreen from '../screens/student/StudentIncidentSuccessScreen'
import StudentHistoryScreen from '../screens/student/StudentHistoryScreen'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const { currentUser, userRole } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom'
        }}
      >
        {!currentUser ? (
          <>
            <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} />
            <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
          </>
        ) : userRole === 'teacher' ? (
          <>
            <Stack.Screen name="TeacherOutOfSchedule" component={TeacherOutOfScheduleScreen} />
            <Stack.Screen name="TeacherDashboard" component={TeacherClassDashboardScreen} />
            <Stack.Screen name="TeacherQR" component={TeacherQRScreen} />
            <Stack.Screen
              name="TeacherCancelModal"
              component={TeacherCancelClassModal}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
            <Stack.Screen name="TeacherRoster" component={TeacherRosterScreen} />
            <Stack.Screen
              name="TeacherManualModal"
              component={TeacherManualAttendanceModal}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
            <Stack.Screen name="TeacherLogbook" component={TeacherLogbookScreen} />
            <Stack.Screen
              name="TeacherCloseModal"
              component={TeacherCloseClassModal}
              options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            <Stack.Screen name="StudentScanner" component={StudentScannerScreen} />
            <Stack.Screen name="StudentSuccessPresent" component={StudentSuccessPresentScreen} />
            <Stack.Screen name="StudentSuccessLate" component={StudentSuccessLateScreen} />
            <Stack.Screen name="StudentIncidentForm" component={StudentIncidentFormScreen} />
            <Stack.Screen name="StudentIncidentSuccess" component={StudentIncidentSuccessScreen} />
            <Stack.Screen name="StudentHistory" component={StudentHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
