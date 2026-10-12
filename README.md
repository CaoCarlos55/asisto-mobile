# Asisto Mobile — Aplicación Móvil de Control de Asistencia

> **Ecosistema Móvil para Docentes y Estudiantes (Bachillerato)**  
> Proyecto desarrollado para la asignatura **Tópicos Avanzados en Interacción Humano-Computador (TAIHC)**  
> **Universidad Central de Venezuela (UCV)** • Semestre 1-2026

---

## 👥 Integrantes (Grupo 1)

* **Carlos Cao**
* **César Carios**
* **Miguel Ciavato**
* **Erimar Reis**

---

## 💡 Propuesta de Valor y Usabilidad Móvil

En las instituciones de educación media general (Bachillerato), el pase de lista tradicional presenta dos fricciones críticas identificadas en el análisis de usabilidad:
1. **Pérdida de tiempo pedagógico:** El docente pierde entre 10 y 15 minutos nombrando manualmente a 30+ alumnos, interrumpiendo el flujo de la clase.
2. **Falta de autonomía e indefensión del estudiante:** Si un alumno llega con un retraso justificado o sufre una contingencia técnica, no tiene un canal formal e inmediato para consignar su justificativo digital ante Coordinación.

**La ventaja competitiva de la interfaz de Asisto Mobile:**  
Descentraliza y agiliza el control de asistencia delegando el registro inicial al propio estudiante mediante escaneo de un **código QR dinámico** con **validación de geocerca GPS**. Al mismo tiempo, provee al docente de una consola de aula con **marcado manual auditado para contingencias**, **bitácora pedagógica** y **cierre definitivo de registro**, todo bajo una arquitectura **Offline-First** que garantiza operatividad ante caídas de conectividad.

---

## 📱 Módulos y Pantallas Móviles

### 👨‍🏫 1. Módulo del Docente (`HU01 - HU05`, `HU10`)

1. **Control de Bloque y Fuera de Horario (`HU01`)**
   * Bloqueo inteligente del pase de lista si la hora del servidor no coincide con el horario asignado.
   * Tarjeta con la información de la **Próxima Clase** (*Asignatura, Aula 12, Sección B y tiempo restante*).
   * Botón de activación o simulación de apertura de clase con restauración de nómina de prueba.

2. **Gestión de Contingencias y Cancelación (`HU02`)**
   * Modal de confirmación con fricción intencionada y advertencia de acción destructiva.
   * Campo obligatorio para redactar el motivo oficial de la suspensión.
   * Invalidación inmediata del código QR y notificación en tiempo real a Coordinación.

3. **Pase de Lista QR Dinámico (`HU03`)**
   * Generador de código QR de alta resolución (SVG vectorial nítido).
   * **Seguridad Dinámica:** Semilla criptográfica y token rotativo que se actualiza automáticamente cada 15 segundos con indicador de expiración para prevenir capturas compartidas.
   * Cronómetro de clase transcurrida y contador de estudiantes registrados en tiempo real.
   * Modo Pantalla Completa para proyección en proyector o pantalla de aula.

4. **Control de Nómina y Marcado Manual Auditado (`HU04`)**
   * Lista completa de los 32 alumnos de la sección con buscador en vivo por nombre o cédula.
   * Pestañas de filtrado rápido (*Todos*, *Presentes*, *Retardos*, *Pendientes*).
   * **Marcado Manual por Contingencia:** Modal para registrar alumnos que no pudieron escanear (*Falla en cámara*, *Batería agotada*, *Sin datos móviles*).
   * Etiqueta obligatoria de auditoría: `"Registro Manual • [Causa elegida]"` para control de Coordinación.
   * Persistencia local con soporte Offline-First.

5. **Cierre Definitivo de Registro (`HU05`)**
   * Balance final de la sesión (*Presentes QR, Presentes Manuales, Retardos e Inasistencias*).
   * Congelamiento irreversible de la nómina y conversión automática de los alumnos "Pendientes" a "Ausente / Inasistencia".
   * Transformación del código QR a estado **Inerte**, rechazando cualquier intento posterior de escaneo.

6. **Bitácora e Incidencias en Aula (`HU10`)**
   * Editor de temas vistos durante la sesión pedagógica.
   * Clasificador de incidencias de aula (*Clase sin novedades*, *Incidencia de conducta*, *Falla de infraestructura*, *Consulta pedagógica*).
   * Observaciones y acuerdos de aula con vinculación al historial académico docente.

---

### 👨‍🎓 2. Módulo del Estudiante (`HU06 - HU09`)

1. **Dashboard Principal del Alumno**
   * Identificación del estudiante (*Daniel Álvarez • 4to Año B*).
   * Píldora de geocerca en tiempo real: `"En el Plantel (Aula 12)"`.
   * Tarjeta dinámica de la clase en curso con tiempo transcurrido y estado actual de asistencia (*Aún no registrado*, *Presente*, *Retardo* o *Sesión cerrada*).
   * Resumen global de asistencia del año escolar (94% - Sin riesgo).

2. **Escáner QR y Geocerca Activa (`HU06`, `HU07`, `HU09`)**
   * Visor con guías de encuadre HUD y control de linterna/flash.
   * **HU09 Validación de Geocerca:** Comprobación estricta de distancia GPS (< 25 metros del aula). Incluye selector interactivo para probar tanto el escenario válido (6m) como el rechazo por estar fuera del plantel (45m).
   * **HU06 Tolerancia (Minuto 0 al 10):** Registro puntual de asistencia con emisión de comprobante académico con validación QR + GPS.
   * **HU07 Ventana Frontera (Minuto 11 al 20):** Registro con Retardo, advertencia de reglamento académico (*3 retardos = 1 inasistencia*) y barra de cómputo acumulativo.

3. **Bandeja de Incidencias Extemporáneas (`HU08`)**
   * Se activa obligatoriamente al intentar registrar después del minuto 20.
   * Formulario de justificación de causa (*Salud / Médico*, *Transporte*, *Fuerza Mayor*).
   * Selector de archivos adjuntos (`expo-document-picker`) para comprobantes digitales (PDF / Imagen).
   * Generación de **Folio oficial único** (`#INC-2026-XXXX`) y persistencia directa en Supabase (`incidents`), reflejándose en vivo en la Bandeja de Incidencias de la Coordinación Web.
   * Actualización del estado del estudiante a `"En revisión por Coordinación"`.

4. **Historial de Asistencia y Filtros**
   * Desglose histórico de asignaturas de Bachillerato (*Matemáticas*, *Física*, *Química*, *Castellano*, *Biología*).
   * Filtros dinámicos por materia.
   * Visualización del estado en tiempo real sincronizado con la sesión activa del día.

---

## 🛠️ Tecnologías Utilizadas

* **Framework Base:** [React Native](https://reactnative.dev/) `0.86.3`
* **Plataforma / Tooling:** [Expo SDK 57](https://expo.dev/)
* **Navegación:** [React Navigation](https://reactnavigation.org/) (`@react-navigation/native-stack` v7)
* **Soporte Web:** [React Native Web](https://necolas.github.io/react-native-web/) `v0.21.2` (ejecución sin emulador en cualquier navegador)
* **Backend & Base de Datos:** [Supabase](https://supabase.com/) (`@supabase/supabase-js` v2)
* **Iconografía:** [Lucide React Native](https://lucide.dev/)
* **Gráficos & QR:** [React Native SVG](https://github.com/software-mansion/react-native-svg) (renderizado vectorial de alta precisión)
* **Persistencia Offline:** [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
* **Módulos Nativos:** `expo-document-picker`, `expo-location`, `expo-camera`, `expo-status-bar`
* **Arquitectura de Estilos:** Vanilla StyleSheet 100% modular desacoplado en `src/styles/{auth,teacher,student,modals}/` con tokens unificados (`theme.js`), sin estilos incrustados.

---

## 🚀 Formas de Compilar, Ejecutar y Probar la App

### 1. Requisitos Previos

Asegúrate de contar con Node.js instalado (versión recomendada: **20.x** o superior) y npm:

```bash
node -v   # v20.x o superior
npm -v
```

Clona e instala las dependencias del proyecto:

```bash
git clone https://github.com/CaoCarlos55/asisto-mobile.git
cd asisto-mobile
npm install
```

---

### 🌐 Forma 1: Probar en el Navegador Web (Recomendado para Pruebas Rápidas)

Puedes ejecutar la aplicación directamente en cualquier navegador de escritorio o móvil sin necesidad de emuladores pesados:

```bash
# Iniciar en modo web
npx expo start --web
# o mediante el script npm:
npm run web
```

* **URL predeterminada:** `http://localhost:8081` (o el puerto indicado por Expo en la terminal).
* **Diseño Responsive:** Todos los componentes, modales y visores QR están configurados con cotas de ancho máximas (`Math.min(width * factor, 230)`) para asegurar que en pantallas panorámicas de escritorio se visualicen con las proporciones idénticas a un dispositivo móvil.

---

### 📲 Forma 2: Probar en Dispositivo Físico con Expo Go (Android / iOS)

1. Instala la app gratuita **Expo Go** en tu teléfono:
   * [Expo Go en Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   * [Expo Go en Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Inicia el servidor de desarrollo en la computadora:
   ```bash
   npx expo start
   ```
3. **Escanear el código:**
   * **En Android:** Abre Expo Go y pulsa en *"Scan QR code"* enfocando el código QR generado en la terminal.
   * **En iOS:** Abre la app nativa de la Cámara y enfoca el código QR para abrir el enlace en Expo Go.
4. *Nota:* Si tu teléfono y tu computadora están en redes distintas, inicia con el flag de túnel:
   ```bash
   npx expo start --tunnel
   ```

---

### 💻 Forma 3: Probar en Emulador Android o Simulador iOS

Si dispones de Android Studio o Xcode configurado en tu equipo:

```bash
# Para Emulador de Android:
npm run android
# (O presiona 'a' con el servidor expo en ejecución)

# Para Simulador de iOS (requiere macOS):
npm run ios
# (O presiona 'i' con el servidor expo en ejecución)
```

---

### 📦 Forma 4: Compilar APK / Bundle Independiente de Producción (EAS Build)

Para empaquetar un archivo instalable `.apk` standalone para Android sin depender de Expo Go:

1. Instala la herramienta CLI de EAS globalmente:
   ```bash
   npm install -g eas-cli
   ```
2. Inicia sesión con tu cuenta de Expo:
   ```bash
   eas login
   ```
3. Genera la compilación APK directa:
   ```bash
   eas build -p android --profile preview
   ```
   Al finalizar, la terminal te entregará el enlace de descarga directa del instalable `.apk`.

---

## 🔑 Credenciales y Usuarios de Prueba

La aplicación incluye perfiles preconfigurados para validar todas las historias de usuario de inmediato:

| Rol | Correo Institucional | Contraseña | Perfil Académico |
| :--- | :--- | :--- | :--- |
| **Docente** | `profesor.garcia@institucion.edu` | *(Cualquiera / demo)* | Prof. Roberto García • Área de Matemáticas • 4to Año B |
| **Estudiante** | `estudiante.alvarez@institucion.edu` | *(Cualquiera / demo)* | Daniel Álvarez • C.I. V-29.842.119 • 4to Año B • Aula 12 |

> *Tip de Usabilidad:* Ambas pantallas de inicio de sesión cuentan con botones de acceso rápido para alternar instantáneamente entre el Portal Docente y el Portal Estudiante.

---

## 🔄 Cómo Reiniciar la Simulación de Prueba (Reset)

Para facilitar pruebas y evaluaciones repetitivas, la aplicación cuenta con botones de reinicio en caliente:
* **Desde el Portal Docente (Fuera de Horario / Cierre):** El botón principal indica `"Iniciar Clase (Restaurar Nómina)"`, el cual restaura los 32 alumnos y reactiva el QR.
* **Desde el Dashboard Docente:** En la parte inferior cuentas con `"Reiniciar Nómina y QR (Modo Prueba)"`.
* **Desde el Portal Estudiante:** Al final de la pantalla de inicio tienes el botón `"Reiniciar Simulación de Prueba (Reset)"` para regresar a Daniel Álvarez al estado pendiente.
