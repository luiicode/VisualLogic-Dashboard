Markdown

# 🚀 VisualLogic - Dashboard

> **Hackathon:** Reto Hackatón - Agente de Dashboard
> **Empresa del Caso:** Visual Logic

---

## 🏢 El Desafío: Caso Visual Logic

**El Problema:**
_En la empresa de Visual Logic, las problematicas son la lucha por visualizar KPIs criticos en un solo lugar, además de depender de la creación manual de tableros , loq ue genera retraso en la identificación de cuellos de botella operativos._

**La Solución Esperada:**
_Un agente capaz de crear y actualizar dashboard en tiempo real, permitiendo visibilidad integral de la facturación, casos abiertos y actividades por equipo sin intervención manual._

---

## 💡 Nuestra Solución

<!--
[Nombre de tu proyecto] resuelve el desafío mediante una arquitectura moderna que integra **Salesforce Agentforce** directamente en un entorno de trabajo unificado. Hemos construido un sistema donde el Agente de IA controla la interfaz visual: los gráficos y las tablas mutan en tiempo real según las peticiones del usuario, creando una experiencia analítica dinámica y conversacional. -->

---

## 🌟 Innovación: Más allá del desafío

<!-- No nos conformamos con cumplir los requisitos básicos. Para aportar un valor diferencial a Visual Logic, implementamos:

* **[Tu Innovación 1]:** *(Ej: "Generación de UI Predictiva. El agente no solo responde a lo que el usuario pide, sino que anticipa sus necesidades y renderiza tarjetas de 'Alertas Críticas' antes de que el usuario haga la pregunta.")*
* **[Tu Innovación 2]:** *(Ej: "Motor de análisis de sentimiento en el chat, ajustando el tono de las respuestas y resaltando datos urgentes en rojo cuando detecta frustración o urgencia en el trabajador.")*
* **[Tu Innovación 3]:** *(Ej: "Soporte multimodal básico / Exportación inteligente a un solo clic de los dashboards generados por IA a reportes PDF listos para junta.")* -->

---

## 📈 Escalabilidad y Futuro

<!-- La arquitectura del proyecto fue diseñada pensando en el crecimiento masivo de Visual Logic:

* **Arquitectura de Monolito Modular:** Empleamos Next.js con servicios de datos centralizados (`src/services/`). Esto permite que, si la empresa crece, la capa de conexión con Salesforce pueda extraerse fácilmente a un microservicio independiente sin reescribir el Frontend.
* **Gestión de Estado Ligera (Zustand):** Preparada para manejar múltiples flujos de datos en tiempo real (WebSockets) sin afectar el rendimiento de renderizado de React, soportando dashboards mucho más complejos en el futuro.
* **Agente Agnóstico en Interfaz:** El modelo MVC (`agent-parser.ts`) permite que el día de mañana el mismo agente de Salesforce pueda conectarse a una aplicación móvil de Visual Logic reutilizando el 90% de la lógica actual. -->

---

## ✨ Características Principales

<!-- * **🤖 Integración MVC con Agentforce:** Procesamiento y limpieza de datos en tiempo real.
* **📊 Dashboard Dinámico:** Gráficos de Recharts que reaccionan al estado global del agente.
* **🔒 Arquitectura Segura:** Route Groups y Middleware protegiendo el entorno corporativo. -->

- **💎 UI/UX Premium:** Interfaz construida con Shadcn/ui y efecto Glassmorphism.

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Librerías Visuales:** Shadcn/ui & Lucide Icons
- **Backend & IA:** Salesforce Agentforce

---

## 🚀 Cómo ejecutarlo localmente

1. Clona este repositorio:

   ```bash
   git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)

    Instala las dependencias:
    Bash

    pnpm install

    Inicia el servidor (pnpm dev) y abre http://localhost:3000.
   ```

👥 Equipo

    Luis Eduardo Cortes Lopez - Arquitectura & Frontend

    Sebastian Aristi - Agente-Agentforce & Backend
