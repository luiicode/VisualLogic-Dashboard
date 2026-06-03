import json
import os
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from google import genai
from google.genai import types
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("\n[ERROR CRÍTICO]: No se encontró GEMINI_API_KEY en el archivo .env\n")

client = genai.Client(api_key=API_KEY)

app = FastAPI(title="VisualLogic AI Engine")

db_oportunidades = {
    "walmart": {"name": "Walmart Corporate", "stage": "Prospecting", "amount": 150000},
    "soriana": {"name": "Soriana Noroeste", "stage": "Qualification", "amount": 85000},
    "costco": {"name": "Costco México", "stage": "Needs Analysis", "amount": 210000}
}

db_ingresos = {
    "q1": {"periodo": "Primer Trimestre", "monto": 450000, "estado": "Auditado"},
    "q2": {"periodo": "Segundo Trimestre", "monto": 620000, "estado": "En Progreso"}
}

db_reportes = {
    "operaciones_cdmx": {"titulo": "Reporte Operativo Central", "eficiencia": "94%", "alertas": 2}
}

db_evaluaciones = {
    "equipo_alfa": {"grupo": "Desarrollo IA", "desempeno": "Excelente", "score": 9.5}
}

DICCIONARIOS_POR_OBJETO = {
    "Opportunity": db_oportunidades,
    "Ingreso__c": db_ingresos,
    "Reporte_Operativo__c": db_reportes,
    "Evaluacion_Equipo__c": db_evaluaciones
}

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"[WebSocket]: Nueva conexión activa. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"[WebSocket]: Conexión cerrada. Total: {len(self.active_connections)}")

    async def send_json_to_web(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

class UserCommand(BaseModel):
    TextoUsuario: str

gemini_schema = types.Schema(
    type=types.Type.OBJECT,
    properties={
        "intent": types.Schema(type=types.Type.STRING),
        "target_object": types.Schema(type=types.Type.STRING),
        "action": types.Schema(type=types.Type.STRING),
        "filters": types.Schema(type=types.Type.OBJECT),
        "visual_component": types.Schema(type=types.Type.STRING),
        "graph_data": types.Schema(type=types.Type.OBJECT),
        "audit_log": types.Schema(type=types.Type.STRING),
    },
    required=["intent", "target_object", "action", "filters", "visual_component", "graph_data", "audit_log"]
)

def interpretar_comando_visual(comando_usuario: str) -> dict:
    prompt_sistema = """
    Eres el motor de IA avanzado de VisualLogic Dashboards para Salesforce y Data Cloud. 
    Tu tarea es traducir el lenguaje natural del usuario a comandos estructurados en JSON.
    
    Campos válidos para "target_object":
    - 'Opportunity'
    - 'Ingreso__c'
    - 'Reporte_Operativo__c'
    - 'Evaluacion_Equipo__c'
    
    Reglas CRUCIALES para el objeto "filters":
    1. DEBE contener OBLIGATORIAMENTE la clave 'target_key' con el identificador del registro en minúsculas (ej: 'q2', 'walmart', 'equipo_alfa').
    2. Si el usuario pide cambiar un estado, fase o estatus, agrega la clave correspondiente con su nuevo valor (ej: 'estado': 'Auditado', 'stage': 'Closed Won').
    
    EJEMPLO 1:
    Usuario: "Actualiza el ingreso de q2 y pon su estado en Auditado"
    Salida JSON esperada:
    {
      "intent": "update_record",
      "target_object": "Ingreso__c",
      "action": "UPDATE",
      "filters": {"target_key": "q2", "estado": "Auditado"},
      "visual_component": "none",
      "graph_data": {},
      "audit_log": "Solicitando actualización de estado para Q2."
    }

    EJEMPLO 2:
    Usuario: "Modifica la oportunidad de walmart a Closed Won"
    Salida JSON esperada:
    {
      "intent": "update_record",
      "target_object": "Opportunity",
      "action": "UPDATE",
      "filters": {"target_key": "walmart", "stage": "Closed Won"},
      "visual_component": "none",
      "graph_data": {},
      "audit_log": "Modificando fase de oportunidad de Walmart."
    }
    
    Sigue esta estructura de forma milimétrica. No omitas el objeto 'filters'.
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=comando_usuario,
            config=types.GenerateContentConfig(
                system_instruction=prompt_sistema,
                temperature=0.0,  
                response_mime_type="application/json",
                response_schema=gemini_schema
            )
        )
        return json.loads(response.text.strip())
    except Exception as e:
        return {
            "intent": "error", "target_object": "None", "action": "READ",
            "filters": {}, "visual_component": "none", "graph_data": {},
            "audit_log": f"Error en procesamiento de IA: {str(e)}"
        }

@app.post("/api/v1/chat")
async def procesar_agente(command: UserCommand):
    print(f"\n[Salesforce dice]: {command.TextoUsuario}")
    
    resultado = interpretar_comando_visual(command.TextoUsuario)
    target_obj = resultado.get("target_object")
    action = resultado.get("action")
    filters = resultado.get("filters", {})
    
    texto_min = command.TextoUsuario.lower()
    if not filters or "target_key" not in filters:
        filters = {}
        if "q1" in texto_min: filters["target_key"] = "q1"
        elif "q2" in texto_min: filters["target_key"] = "q2"
        elif "walmart" in texto_min: filters["target_key"] = "walmart"
        elif "soriana" in texto_min: filters["target_key"] = "soriana"
        elif "costco" in texto_min: filters["target_key"] = "costco"
        elif "cdmx" in texto_min or "operaciones_cdmx" in texto_min: filters["target_key"] = "operaciones_cdmx"
        elif "alfa" in texto_min or "equipo_alfa" in texto_min: filters["target_key"] = "equipo_alfa"
        
        if "auditado" in texto_min: filters["estado"] = "Auditado"
        if "en progreso" in texto_min: filters["estado"] = "En Progreso"
        if "closed won" in texto_min or "cerrada ganada" in texto_min: filters["stage"] = "Closed Won"
        
        resultado["filters"] = filters

    if target_obj not in DICCIONARIOS_POR_OBJETO:
        resultado["audit_log"] = f"[ERROR]: Objeto objetivo '{target_obj}' no soportado por el motor local."
        await manager.send_json_to_web(resultado)
        return resultado

    db_actual = DICCIONARIOS_POR_OBJETO[target_obj]
    key = filters.get("target_key")

    if action == "UPDATE":
        if key and key in db_actual:
            for campo, nuevo_valor in filters.items():
                if campo != "target_key" and campo in db_actual[key]:
                    db_actual[key][campo] = nuevo_valor
            resultado["audit_log"] = f"[ÉXITO DATACLOUD]: Registro '{key.upper()}' actualizado en el objeto {target_obj}. Estado actual: {db_actual[key]}"
        else:
            resultado["audit_log"] = f"[ERROR CRM]: No se encontró el identificador '{key}' en el objeto {target_obj}."
            
    elif action == "CREATE":
        if key:
            if target_obj == "Opportunity":
                db_actual[key] = {"name": key.capitalize(), "stage": filters.get("stage", "Prospecting"), "amount": filters.get("amount", 0)}
            elif target_obj == "Ingreso__c":
                db_actual[key] = {"periodo": filters.get("periodo", "Nuevo Periodo"), "monto": filters.get("monto", 0), "estado": filters.get("estado", "Pendiente")}
            elif target_obj == "Reporte_Operativo__c":
                db_actual[key] = {"titulo": filters.get("titulo", "Nuevo Reporte"), "eficiencia": filters.get("eficiencia", "100%"), "alertas": filters.get("alertas", 0)}
            elif target_obj == "Evaluacion_Equipo__c":
                db_actual[key] = {"grupo": filters.get("grupo", "Nuevo Equipo"), "desempeno": filters.get("desempeno", "Regular"), "score": filters.get("score", 0.0)}
            
            resultado["audit_log"] = f"[ÉXITO DATACLOUD]: Nuevo registro '{key.upper()}' inyectado exitosamente en el objeto {target_obj}."
        else:
            resultado["audit_log"] = f"[ERROR]: Falta el parámetro 'target_key' para realizar la inserción."

    elif action == "READ":
        labels = []
        data_values = []
        
        for k, v in db_actual.items():
            if target_obj == "Opportunity":
                labels.append(v["name"])
                data_values.append(v["amount"])
            elif target_obj == "Ingreso__c":
                labels.append(v["periodo"])
                data_values.append(v["monto"])
            elif target_obj == "Reporte_Operativo__c":
                labels.append(v["titulo"])
                data_values.append(int(v["eficiencia"].replace("%", "")))
            elif target_obj == "Evaluacion_Equipo__c":
                labels.append(v["grupo"])
                data_values.append(v["score"])
            
        if resultado["visual_component"] != "none":
            resultado["graph_data"] = {
                "labels": labels,
                "datasets": [{
                    "label": f"Métricas de {target_obj}",
                    "data": data_values
                }]
            }
            resultado["audit_log"] = f"Lectura de Data Cloud completada. Inyectando estructura Chart.js para el objeto {target_obj}."

    print(f"\n[Estado actual del objeto {target_obj}]: {json.dumps(db_actual, indent=2, ensure_ascii=False)}")
    
    await manager.send_json_to_web(resultado)
    
    return resultado

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("agent_brain:app", host="0.0.0.0", port=8000, reload=True)