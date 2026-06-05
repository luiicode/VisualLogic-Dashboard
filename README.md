# 🚀 VisualLogic - Dashboard

> **Hackathon:** Reto Hackatón - Agente de Dashboard
> **Empresa del Caso:** Visual Logic

---

## 🏢 El Desafío: Caso Visual Logic

**El Problema:**
_En la empresa de Visual Logic, las problemáticas son la lucha por visualizar KPIs críticos en un solo lugar, además de depender de la creación manual de tableros, lo que genera retraso en la identificación de cuellos de botella operativos._

**La Solución Esperada:**
_Un agente capaz de crear y actualizar dashboard en tiempo real, permitiendo visibilidad integral de la facturación, casos abiertos y actividades por equipo sin intervención manual._

---

## 💡 Nuestra Solución

VisualLogic resuelve el desafío mediante una arquitectura moderna y desacoplada que integra nuestro motor de IA propio (**Vigic AI**) directamente en un entorno de trabajo unificado. Hemos construido un sistema impulsado por Python y WebSockets donde el agente procesa comandos en lenguaje natural, interactúa de forma autónoma con la base de datos de Salesforce, y envía actualizaciones al frontend en tiempo real. Los gráficos y las tablas mutan al instante, creando una experiencia analítica dinámica, conversacional y sin intervención manual.

---

## 🌟 Innovación: Más allá del desafío

No nos conformamos con cumplir los requisitos básicos. Para aportar un valor diferencial y de nivel empresarial a Visual Logic, implementamos:

* **Identidad y Auditoría de IA (Vigic AI):** El agente no es un simple script; opera bajo su propio perfil de integración, credenciales JWT y Conjunto de Permisos en Salesforce. Esto deja un rastro inmutable (Log de Historial) en cada registro modificado para garantizar la gobernanza de datos.
* **Validación Semántica y Protección de Esquemas:** El motor cuenta con algoritmos de coincidencia difusa (Fuzzy Matching) y protección contra la manipulación de campos autonuméricos. La IA comprende el esquema estricto de Salesforce antes de ejecutar cualquier acción, previniendo errores de API.
* **Sincronización Bidireccional de Baja Latencia:** Eliminamos el *polling* tradicional implementando una arquitectura basada en WebSockets que empuja los cambios desde el microservicio de IA hacia el dashboard en Next.js de manera instantánea.

---

## 📈 Escalabilidad y Futuro

La arquitectura del proyecto fue diseñada pensando en el crecimiento masivo de Visual Logic:

* **Arquitectura Desacoplada (Frontend + Microservicio IA):** Separamos la interfaz de usuario (Next.js) del motor de inteligencia (FastAPI). Esto permite que, si la empresa crece, la capa de IA pueda escalar en servidores dedicados o integrarse a nuevas plataformas (como una app móvil) sin tocar el código del frontend.
* **Autenticación Headless (JWT):** Preparada para la automatización a gran escala. La conexión servidor a servidor mediante certificados elimina la necesidad de inicios de sesión manuales por parte del equipo.
* **Gestión de Estado Ligera (Zustand):** Preparada para manejar múltiples flujos de datos asíncronos y eventos de WebSockets sin afectar el rendimiento de renderizado de React, soportando tableros mucho más complejos en el futuro.

---

## ✨ Características Principales

* **🤖 Vigic AI Engine:** Procesamiento de lenguaje natural y estructuración JSON inteligente (Gemini 2.5 Flash).
* **📊 Dashboard Dinámico:** Gráficos y componentes que reaccionan al estado global modificado por la IA en tiempo real.
* **🔒 Arquitectura Segura:** Flujo de autorización OAuth 2.0 JWT con Salesforce Data Cloud.
* **💎 UI/UX Premium:** Interfaz construida con Shadcn/ui, Tailwind CSS y efecto Glassmorphism.

---

## 🛠️ Stack Tecnológico

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand
* **Backend & IA:** Python, FastAPI, WebSockets, Google Gemini API
* **Bases de Datos & Auth:** Salesforce (Simple-Salesforce), JWT Authentication
* **Librerías Visuales:** Shadcn/ui, Lucide Icons, Recharts

---

## 🚀 Cómo ejecutarlo localmente

Para correr este proyecto en tu entorno local, necesitas levantar tanto el servidor del motor de IA como el frontend de Next.js.

**1. Clona este repositorio:**
```bash
git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)
cd tu-repo
```

**2. Configuración del Motor de IA
```bash
# Abre una terminal y navega a la carpeta del backend
# Instala las dependencias de Python
pip install fastapi uvicorn google-genai pydantic python-dotenv simple-salesforce pyjwt requests websockets

# Asegúrate de configurar tu archivo .env con tus llaves (GEMINI_API_KEY, SF_USERNAME, etc.)
# Asegúrate de tener tu certificado private.pem en la raíz del backend

# Inicia el servidor de Vigic AI
python agent_brain.py 
# (o el nombre de tu archivo principal, ej: uvicorn agent_brain:app --reload)
```

**3. Configuración del Dashboard
```bash
# Abre una nueva pestaña en tu terminal
# Instala las dependencias del frontend usando pnpm
pnpm install

# Inicia el entorno de desarrollo
pnpm dev
```
**4. Abre la aplicación:
Visita http://localhost:3000 en tu navegador para ver el dashboard en acción y comenzar a interactuar con Vigic.

---

## 👥 Equipo

Luis Eduardo Cortes Lopez - Desarrollo de la capa de presentación y experiencia de usuario (Next.js/React), y configuración de la autenticación segura, variables de entorno y políticas de acceso en Salesforce Data Cloud.

Sebastian Aristi -  Diseño y arquitectura del backend (Python/FastAPI), integración del motor de inteligencia artificial (Gemini) y estructuración de la lógica de procesamiento de lenguaje natural a esquemas JSON para consumo de APIs.
