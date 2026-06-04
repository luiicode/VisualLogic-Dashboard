import json
import os
import requests
import time
import re
import jwt
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from google import genai
from google.genai import types
from typing import List, Dict, Tuple, Any, Optional
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from simple_salesforce import Salesforce
from difflib import SequenceMatcher
from datetime import datetime

load_dotenv(override=True)
API_KEY = os.getenv("GEMINI_API_KEY")
SF_USERNAME = os.getenv("SF_USERNAME")
SF_CLIENT_ID = os.getenv("SF_CLIENT_ID")

if API_KEY:
    print(f"\n[DIAGNÓSTICO]: Llave Gemini cargada: {API_KEY[:5]}... (Longitud: {len(API_KEY)})\n")
else:
    print("\n[DIAGNÓSTICO]: ERROR - API_KEY de Gemini está vacía.\n")

client = genai.Client(
    api_key="",
    http_options={"headers": {"x-goog-api-key": API_KEY}}
)

sf = None
try:
    with open("private.pem", "r") as f:
        private_key = f.read()

    payload = {
        "iss": SF_CLIENT_ID,
        "sub": SF_USERNAME,
        "aud": "https://login.salesforce.com",
        "exp": int(time.time()) + 300
    }

    encoded_jwt = jwt.encode(payload, private_key, algorithm="RS256")
    auth_url = 'https://login.salesforce.com/services/oauth2/token'

    token_data = {
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': encoded_jwt
    }

    res = requests.post(auth_url, data=token_data)

    if res.status_code == 200:
        auth_data = res.json()
        sf = Salesforce(
            instance_url=auth_data['instance_url'],
            session_id=auth_data['access_token']
        )
        print("\n[DIAGNÓSTICO]: ¡Conectado a Salesforce Data Cloud vía JWT exitosamente!\n")
    else:
        print(f"\n[ERROR CRÍTICO]: Salesforce rechazó el token JWT.\nDetalle: {res.text}\n")

except FileNotFoundError:
    print("\n[ERROR CRÍTICO]: No se encontró el archivo 'private.pem'.\n")
except Exception as e:
    print(f"\n[ERROR CRÍTICO]: Falla de red o encriptación: {e}\n")

# ============ MAPEO COMPLETO DE CAMPOS Y TIPOS DE DATOS ============
SALESFORCE_SCHEMA = {
    "Ticket__c": {
        "label_singular": "Ticket",
        "label_plural": "Tickets",
        "fields": {
            "Correo__c": {
                "label": "Correo",
                "type": "email",
                "example": "user@domain.com",
                "required": False
            },
            "Fecha_de_emision__c": {
                "label": "Fecha de emisión",
                "type": "date",
                "format": "dd/mm/yyyy",
                "example": "25/12/2024",
                "required": False
            },
            "Name": {
                "label": "ID de Ticket",
                "type": "auto_number",
                "pattern": "TCK-{0000}",
                "required": False
            },
            "Status__c": {
                "label": "Status",
                "type": "picklist",
                "values": ["Resuelto", "Pendiente", "En progreso", "Cancelado"],
                "required": False
            },
            "Tiempo_Respuesta_Minutos__c": {
                "label": "Tiempo de respuesta",
                "type": "number",
                "precision": 18,
                "scale": 0,
                "required": False
            },
            "Tipo__c": {
                "label": "Tipo",
                "type": "picklist",
                "values": ["Soporte Técnico", "Facturación", "Quejas", "Interfaz"],
                "required": False
            },
            "Trabajador_encargado__c": {
                "label": "Trabajador encargado",
                "type": "text",
                "max_length": 255,
                "required": False
            }
        }
    },
    "Equipo__c": {
        "label_singular": "Equipo",
        "label_plural": "Equipos",
        "fields": {
            "Name": {
                "label": "Nombre del Proyecto",
                "type": "text",
                "max_length": 80,
                "required": True
            }
        }
    },
    "Integrante__c": {
        "label_singular": "Integrante",
        "label_plural": "Integrantes",
        "fields": {
            "Name": {
                "label": "Nombre del Integrante",
                "type": "text",
                "max_length": 80,
                "required": True
            },
            "Actividad__c": {
                "label": "Actividad",
                "type": "textarea",
                "max_length": 255,
                "required": False
            },
            "Correo__c": {
                "label": "Correo",
                "type": "email",
                "example": "user@domain.com",
                "required": False
            },
            "Equipo__c": {
                "label": "Equipo",
                "type": "lookup",
                "reference": "Equipo__c",
                "required": False
            },
            "Rol__c": {
                "label": "Rol",
                "type": "picklist",
                "values": ["Project Manager", "Frontend Lead", "Backend Developer", "QA Engineer", "Data Scientist", "DevOps"],
                "required": False
            },
            "Status__c": {
                "label": "Status",
                "type": "picklist",
                "values": ["Completado", "Pendiente", "En progreso", "Bloqueado"],
                "required": False
            }
        }
    },
    "Venta__c": {
        "label_singular": "Venta",
        "label_plural": "Ventas",
        "fields": {
            "Cliente__c": {
                "label": "Cliente",
                "type": "text",
                "max_length": 255,
                "required": False
            },
            "Estado__c": {
                "label": "Estado",
                "type": "picklist",
                "values": ["Pagado", "Pendiente", "Reembolsado", "Cancelado"],
                "required": False
            },
            "Fecha__c": {
                "label": "Fecha",
                "type": "date",
                "format": "dd/mm/yyyy",
                "example": "25/12/2024",
                "required": False
            },
            "Name": {
                "label": "ID de Venta",
                "type": "auto_number",
                "pattern": "VNT-{0000}",
                "required": False
            },
            "Ingresos__c": {
                "label": "Ingresos",
                "type": "currency",
                "precision": 16,
                "scale": 2,
                "required": False
            },
            "Monto__c": {
                "label": "Monto",
                "type": "currency",
                "precision": 16,
                "scale": 2,
                "required": False
            },
            "Producto__c": {
                "label": "Producto",
                "type": "text",
                "max_length": 255,
                "required": False
            },
            "Unidades__c": {
                "label": "Unidades",
                "type": "number",
                "precision": 18,
                "scale": 0,
                "required": False
            }
        }
    },
    "Evaluacion_Equipo__c": {
        "label_singular": "Evaluación de Equipo",
        "label_plural": "Evaluaciones de Equipo",
        "fields": {
            "Colaboracion__c": {
                "label": "Colaboración",
                "type": "number",
                "precision": 3,
                "scale": 0,
                "min": 0,
                "max": 100,
                "required": False
            },
            "Comunicacion__c": {
                "label": "Comunicación",
                "type": "number",
                "precision": 3,
                "scale": 0,
                "min": 0,
                "max": 100,
                "required": False
            },
            "Cumplimiento_Objetivos__c": {
                "label": "Cumplimiento de Objetivos",
                "type": "percent",
                "precision": 3,
                "scale": 0,
                "required": False
            },
            "Etica__c": {
                "label": "Ética",
                "type": "number",
                "precision": 3,
                "scale": 0,
                "min": 0,
                "max": 100,
                "required": False
            },
            "Name": {
                "label": "Evaluación de Equipo",
                "type": "auto_number",
                "pattern": "EV-{0000}",
                "required": False
            },
            "Fecha_Evaluacion__c": {
                "label": "Fecha de Evaluación",
                "type": "date",
                "format": "dd/mm/yyyy",
                "example": "25/12/2024",
                "required": False
            },
            "Iniciativa__c": {
                "label": "Iniciativa",
                "type": "number",
                "precision": 3,
                "scale": 0,
                "min": 0,
                "max": 100,
                "required": False
            },
            "Puntualidad__c": {
                "label": "Puntualidad",
                "type": "number",
                "precision": 3,
                "scale": 0,
                "min": 0,
                "max": 100,
                "required": False
            }
        }
    },
    "Reporte_Operativo__c": {
        "label_singular": "Reporte Operativo",
        "label_plural": "Reportes Operativos",
        "fields": {
            "Fecha_Entrega__c": {
                "label": "Fecha de Entrega",
                "type": "date",
                "format": "dd/mm/yyyy",
                "example": "25/12/2024",
                "required": False
            },
            "Name": {
                "label": "Reporte Operativo",
                "type": "auto_number",
                "pattern": "REP-{0000}",
                "required": False
            },
            "Status__c": {
                "label": "Status",
                "type": "picklist",
                "values": ["Entregado", "Pendiente"],
                "required": False
            }
        }
    },
    "Ingreso__c": {
        "label_singular": "Ingreso",
        "label_plural": "Ingresos",
        "fields": {
            "Fecha__c": {
                "label": "Fecha",
                "type": "date",
                "format": "dd/mm/yyyy",
                "example": "25/12/2024",
                "required": False
            },
            "Monto__c": {
                "label": "Monto",
                "type": "currency",
                "precision": 16,
                "scale": 2,
                "required": False
            },
            "Name": {
                "label": "Nombre de Ingreso",
                "type": "auto_number",
                "pattern": "ING-{0000}",
                "required": False
            }
        }
    }
}

# ============ FUNCIONES UTILITARIAS ============

def normalize_field_name(user_input: str) -> str:
    """Normaliza el nombre del campo del usuario a formato de búsqueda."""
    return user_input.lower().strip().replace(" ", "_").replace("ó", "o").replace("á", "a").replace("é", "e").replace("í", "i").replace("ú", "u")

def find_best_field_match(user_input: str, object_api_name: str) -> Tuple[Optional[str], float]:
    """
    Encuentra el campo más similar usando fuzzy matching.
    Retorna (nombre_api_del_campo, similitud)
    """
    if object_api_name not in SALESFORCE_SCHEMA:
        return None, 0.0

    fields = SALESFORCE_SCHEMA[object_api_name]["fields"]
    normalized_input = normalize_field_name(user_input)

    best_match = None
    best_score = 0.0

    for api_name, field_info in fields.items():
        label = field_info.get("label", "").lower()
        normalized_label = normalize_field_name(label)

        # Buscar coincidencia en label y en api_name
        label_ratio = SequenceMatcher(None, normalized_input, normalized_label).ratio()
        api_ratio = SequenceMatcher(None, normalized_input, normalize_field_name(api_name)).ratio()

        max_ratio = max(label_ratio, api_ratio)

        if max_ratio > best_score:
            best_score = max_ratio
            best_match = api_name

    return best_match, best_score

def validate_field_value(value: Any, field_info: Dict) -> Tuple[bool, Optional[str], Any]:
    """
    Valida que el valor sea del tipo correcto para el campo.
    Retorna (es_válido, mensaje_error, valor_convertido)
    """
    field_type = field_info.get("type")

    try:
        if field_type == "email":
            if "@" not in str(value):
                return False, f"El email '{value}' no es válido. Esperado formato: user@domain.com", None
            return True, None, str(value)

        elif field_type == "date":
            date_formats = ["%d/%m/%Y", "%d-%m-%Y", "%Y-%m-%d", "%d/%m/%y"]
            for fmt in date_formats:
                try:
                    parsed_date = datetime.strptime(str(value), fmt)
                    return True, None, parsed_date.strftime("%d/%m/%Y")
                except ValueError:
                    continue
            return False, f"La fecha '{value}' no es válida. Esperado formato: {field_info.get('format', 'dd/mm/yyyy')}", None

        elif field_type == "number":
            try:
                num_value = float(value)
                if "min" in field_info and num_value < field_info["min"]:
                    return False, f"El número {num_value} es menor que el mínimo permitido ({field_info['min']})", None
                if "max" in field_info and num_value > field_info["max"]:
                    return False, f"El número {num_value} es mayor que el máximo permitido ({field_info['max']})", None
                return True, None, int(num_value) if field_info.get("scale", 0) == 0 else num_value
            except ValueError:
                return False, f"'{value}' no es un número válido", None

        elif field_type == "currency":
            try:
                clean_value = str(value).replace("$", "").replace(",", ".").strip()
                num_value = float(clean_value)
                return True, None, round(num_value, 2)
            except ValueError:
                return False, f"'{value}' no es una cantidad válida", None

        elif field_type == "percent":
            try:
                num_value = float(str(value).replace("%", "").strip())
                if num_value < 0 or num_value > 100:
                    return False, f"El porcentaje debe estar entre 0 y 100, recibido: {num_value}", None
                return True, None, int(num_value)
            except ValueError:
                return False, f"'{value}' no es un porcentaje válido", None

        elif field_type == "picklist":
            allowed_values = field_info.get("values", [])
            if value in allowed_values:
                return True, None, value
            for allowed in allowed_values:
                if allowed.lower() == str(value).lower():
                    return True, None, allowed
            suggestions = ", ".join(allowed_values)
            return False, f"'{value}' no es válido. Valores permitidos: {suggestions}", None

        elif field_type in ["text", "textarea"]:
            str_value = str(value)
            max_length = field_info.get("max_length")
            if max_length and len(str_value) > max_length:
                return False, f"El texto excede {max_length} caracteres (actual: {len(str_value)})", None
            return True, None, str_value

        else:
            return True, None, value

    except Exception as e:
        return False, f"Error validando valor: {str(e)}", None

def get_field_suggestions(user_input: str, object_api_name: str, threshold: float = 0.5) -> List[Dict]:
    """
    Obtiene sugerencias de campos similares cuando hay discrepancia.
    """
    if object_api_name not in SALESFORCE_SCHEMA:
        return []

    fields = SALESFORCE_SCHEMA[object_api_name]["fields"]
    normalized_input = normalize_field_name(user_input)

    suggestions = []
    for api_name, field_info in fields.items():
        label = field_info.get("label", "")
        normalized_label = normalize_field_name(label)

        label_ratio = SequenceMatcher(None, normalized_input, normalized_label).ratio()
        api_ratio = SequenceMatcher(None, normalized_input, normalize_field_name(api_name)).ratio()

        max_ratio = max(label_ratio, api_ratio)

        if max_ratio > threshold:
            suggestions.append({
                "api_name": api_name,
                "label": label,
                "type": field_info.get("type"),
                "similarity": max_ratio
            })

    return sorted(suggestions, key=lambda x: x["similarity"], reverse=True)

class UserCommand(BaseModel):
    TextoUsuario: str

app = FastAPI(title="VisualLogic AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

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

def interpretar_comando_visual(comando_usuario: str) -> dict:
    """
    Interpreta comandos del usuario usando Gemini con esquema mejorado.
    """
    schema_description = "ESQUEMA DE BASE DE DATOS SALESFORCE:\n\n"
    for obj_name, obj_info in SALESFORCE_SCHEMA.items():
        schema_description += f"{obj_info['label_singular']} ({obj_name}):\n"
        for field_api, field_info in obj_info['fields'].items():
            field_label = field_info.get('label', '')
            field_type = field_info.get('type', '')
            if field_type == 'picklist':
                values = ", ".join(field_info.get('values', []))
                schema_description += f"  - {field_label} ({field_api}): {field_type} -> [{values}]\n"
            else:
                schema_description += f"  - {field_label} ({field_api}): {field_type}\n"
        schema_description += "\n"

    prompt_sistema = f"""
    Eres el motor de IA universal de VisualLogic Dashboards. Tu tarea es extraer información del comando del usuario y estructurarla en JSON.

    {schema_description}

    PREFIJOS DE OBJETOS (CRÍTICO):
    - TCK-#### → Ticket__c
    - VNT-#### → Venta__c
    - EV-#### → Evaluacion_Equipo__c
    - REP-#### → Reporte_Operativo__c
    - ING-#### → Ingreso__c

    INSTRUCCIONES CRÍTICAS:
    1. SIEMPRE identifica el 'target_object'.
    2. Extrae TODOS los campos mencionados por el usuario.
    3. 'intent': SIEMPRE una de: 'update_record', 'create_record'
    4. 'target_object': NUNCA "None". SIEMPRE uno de: Ticket__c, Venta__c, Equipo__c, Integrante__c, Evaluacion_Equipo__c, Reporte_Operativo__c, Ingreso__c
    5. 'action': 'UPDATE' o 'CREATE'
    6. 'target_key': El ID (TCK-0001, EV-0004, etc.) si es UPDATE. Si es CREATE, pon "".
    7. 'fields_mentioned': Lista de objetos extrayendo la información solicitada.
    """

    # ESQUEMA REPARADO CON REQUIRED INTERNOS Y TARGET_KEY OBLIGATORIO
    gemini_schema = types.Schema(
        type=types.Type.OBJECT,
        properties={
            "intent": types.Schema(type=types.Type.STRING),
            "target_object": types.Schema(type=types.Type.STRING),
            "action": types.Schema(type=types.Type.STRING),
            "target_key": types.Schema(type=types.Type.STRING),
            "fields_mentioned": types.Schema(
                type=types.Type.ARRAY,
                items=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        "user_field": types.Schema(type=types.Type.STRING),
                        "value": types.Schema(type=types.Type.STRING),
                        "api_field": types.Schema(type=types.Type.STRING)
                    },
                    required=["user_field", "value", "api_field"]  # <-- REGLA VITAL
                )
            ),
            "audit_log": types.Schema(type=types.Type.STRING),
        },
        required=["intent", "target_object", "action", "target_key", "fields_mentioned", "audit_log"] # <-- TARGET_KEY AHORA ES OBLIGATORIO
    )

    for intento in range(3):
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
            texto_respuesta = response.text.strip()
            if texto_respuesta.startswith("```"):
                texto_respuesta = texto_respuesta.replace("```json", "").replace("```", "").strip()

            print(f"\n[DEBUG IA - RESPUESTA CRUDA]: {texto_respuesta}\n")
            return json.loads(texto_respuesta)

        except Exception as e:
            if "503" in str(e) and intento < 2:
                time.sleep(1)
                continue
            return {
                "intent": "error",
                "target_object": "None",
                "action": "UNSUPPORTED",
                "fields_mentioned": [],
                "audit_log": f"Error interno de IA: {str(e)}"  # <-- AHORA VERÁS EL ERROR REAL
            }

    return {
        "intent": "error",
        "target_object": "None",
        "action": "UNSUPPORTED",
        "fields_mentioned": [],
        "audit_log": "Timeout"
    }

@app.post("/api/v1/chat")
async def procesar_agente(command: UserCommand):
    resultado = interpretar_comando_visual(command.TextoUsuario)

    intent = resultado.get("intent", "")
    target_obj = resultado.get("target_object")
    action = resultado.get("action", "").upper()
    fields_mentioned = resultado.get("fields_mentioned", [])
    target_key = resultado.get("target_key")

    texto_usuario_lower = command.TextoUsuario.lower()

    if target_obj == "None" or target_obj not in SALESFORCE_SCHEMA:
        target_obj = None

        patron_id = re.search(r'([a-zA-Z]{2,3})-(\d{4})', command.TextoUsuario, re.IGNORECASE)
        if patron_id:
            prefijo = patron_id.group(1).upper()
            if prefijo == "TCK":
                target_obj = "Ticket__c"
                if not target_key:
                    target_key = patron_id.group(0).upper()
            elif prefijo == "VNT":
                target_obj = "Venta__c"
                if not target_key:
                    target_key = patron_id.group(0).upper()
            elif prefijo == "EV":
                target_obj = "Evaluacion_Equipo__c"
                if not target_key:
                    target_key = patron_id.group(0).upper()
            elif prefijo == "REP":
                target_obj = "Reporte_Operativo__c"
                if not target_key:
                    target_key = patron_id.group(0).upper()
            elif prefijo == "ING":
                target_obj = "Ingreso__c"
                if not target_key:
                    target_key = patron_id.group(0).upper()

        if not target_obj:
            if any(palabra in texto_usuario_lower for palabra in ["ticket", "tck"]):
                target_obj = "Ticket__c"
            elif any(palabra in texto_usuario_lower for palabra in ["venta", "vnt"]):
                target_obj = "Venta__c"
            elif any(palabra in texto_usuario_lower for palabra in ["equipo"]):
                target_obj = "Equipo__c"
            elif any(palabra in texto_usuario_lower for palabra in ["integrante", "miembro", "empleado", "trabajador"]):
                target_obj = "Integrante__c"
            elif any(palabra in texto_usuario_lower for palabra in ["evaluacion", "evaluación", "ev"]):
                target_obj = "Evaluacion_Equipo__c"
            elif any(palabra in texto_usuario_lower for palabra in ["reporte", "report", "rep"]):
                target_obj = "Reporte_Operativo__c"
            elif any(palabra in texto_usuario_lower for palabra in ["ingreso", "ing"]):
                target_obj = "Ingreso__c"

    if not target_obj or target_obj not in SALESFORCE_SCHEMA:
        resultado["audit_log"] = "❌ No pude identificar el tipo de registro. Por favor especifica: Ticket, Venta, Equipo, Integrante, Evaluación, Reporte o Ingreso."
        await manager.send_json_to_web(resultado)
        return resultado

    resultado["target_object"] = target_obj
    resultado["target_key"] = target_key

    resolved_fields = {}
    field_issues = []

    for field_mention in fields_mentioned:
        user_field = field_mention.get("user_field", "")
        value = field_mention.get("value")
        suggested_api = field_mention.get("api_field", "")

        best_match, score = find_best_field_match(user_field, target_obj)

        if suggested_api in SALESFORCE_SCHEMA[target_obj]["fields"]:
            best_match = suggested_api
            score = 1.0

        if best_match and score > 0.6:
            field_info = SALESFORCE_SCHEMA[target_obj]["fields"][best_match]
            is_valid, error_msg, converted_value = validate_field_value(value, field_info)

            if is_valid:
                resolved_fields[best_match] = converted_value
            else:
                field_issues.append({
                    "user_field": user_field,
                    "value": value,
                    "api_field": best_match,
                    "error": error_msg,
                    "field_type": field_info.get("type")
                })
        else:
            suggestions = get_field_suggestions(user_field, target_obj)
            field_issues.append({
                "user_field": user_field,
                "value": value,
                "error": f"Campo no encontrado en {SALESFORCE_SCHEMA[target_obj]['label_singular']}",
                "suggestions": suggestions[:3]
            })

    if field_issues and not resolved_fields:
        resultado["audit_log"] = "Encontré problemas validando los campos. Por favor revisa:"
        resultado["field_issues"] = field_issues
        resultado["action_required"] = "field_correction"
        await manager.send_json_to_web(resultado)
        return resultado

    if not sf:
        resultado["audit_log"] = "Error: El servidor no está conectado a Salesforce."
        await manager.send_json_to_web(resultado)
        return resultado

    if action == "UPDATE":
        if not target_key:
            resultado["audit_log"] = "No se proporcionó un identificador válido para actualizar (ej: TCK-0001)."
            await manager.send_json_to_web(resultado)
            return resultado

        try:
            formatted_key = target_key.upper()
            soql = f"SELECT Id FROM {target_obj} WHERE Name = '{formatted_key}' LIMIT 1"
            query_result = sf.query(soql)

            if query_result['totalSize'] > 0:
                record_id = query_result['records'][0]['Id']
                sf_obj = getattr(sf, target_obj)

                if resolved_fields:
                    sf_obj.update(record_id, resolved_fields)
                    campos_actualizados = ", ".join([f"{SALESFORCE_SCHEMA[target_obj]['fields'][k].get('label', k)}" for k in resolved_fields.keys()])
                    resultado["audit_log"] = f"✓ Se actualizaron exitosamente: {campos_actualizados} en {formatted_key}"
                    resultado["success"] = True
                else:
                    resultado["audit_log"] = "No hay campos válidos para actualizar."
                    if field_issues:
                        resultado["field_issues"] = field_issues
            else:
                resultado["audit_log"] = f"✗ No encontré el registro {formatted_key} en la base de datos."
        except Exception as e:
            error_msg = str(e)
            if "INVALID_FIELD" in error_msg:
                resultado["audit_log"] = "✗ Error: Un campo no corresponde al objeto."
            elif "INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST" in error_msg:
                resultado["audit_log"] = "✗ Error: El valor no es válido para ese campo."
            else:
                resultado["audit_log"] = f"✗ Error Salesforce: {error_msg[:200]}"

    elif action == "CREATE":
        try:
            sf_obj = getattr(sf, target_obj)
            datos_crear = resolved_fields.copy()

            if target_key and "Name" not in datos_crear:
                datos_crear["Name"] = target_key

            if not datos_crear:
                resultado["audit_log"] = "Faltan datos para crear el registro. Por favor proporciona al menos los campos requeridos."
                if field_issues:
                    resultado["field_issues"] = field_issues
                await manager.send_json_to_web(resultado)
                return resultado

            created_record = sf_obj.create(datos_crear)
            resultado["audit_log"] = f"✓ Se creó exitosamente el nuevo registro."
            resultado["success"] = True
            resultado["new_record_id"] = created_record

        except Exception as e:
            error_msg = str(e)
            if "REQUIRED_FIELD_MISSING" in error_msg:
                resultado["audit_log"] = "✗ Error: Faltan campos obligatorios."
            elif "INVALID_FIELD" in error_msg:
                resultado["audit_log"] = "✗ Error: Uno de los campos no pertenece a este objeto."
            else:
                resultado["audit_log"] = f"✗ Error Salesforce: {error_msg[:200]}"

    await manager.send_json_to_web(resultado)
    return resultado

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("agent_brain:app", host="0.0.0.0", port=8000, reload=True)