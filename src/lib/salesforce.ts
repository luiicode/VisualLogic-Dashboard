import jwt from "jsonwebtoken";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function getSalesforceAccessToken() {
  const pemPath = path.join(process.cwd(), "private.pem");

  if (!fs.existsSync(pemPath)) {
    throw new Error(
      `No se encontró el archivo private.pem en la raíz del proyecto: ${pemPath}`,
    );
  }

  // Leemos el archivo directamente con sus saltos de línea originales de tipo RSA
  const privateKey = fs.readFileSync(pemPath, "utf8");

  // Firmamos el token JWT de forma segura usando el archivo físico
  const token = jwt.sign(
    {
      iss: process.env.SF_CLIENT_ID,
      sub: process.env.SF_USERNAME,
      aud: process.env.SF_LOGIN_URL,
      exp: Math.floor(Date.now() / 1000) + 300, // Válido por 5 minutos
    },
    privateKey,
    { algorithm: "RS256" },
  );

  // Intercambio de JWT por token de acceso
  const response = await axios.post(
    `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    }).toString(),
  );

  return {
    accessToken: response.data.access_token,
    instanceUrl: response.data.instance_url,
  };
}

export async function queryDataCloud(sql: string) {
  const { accessToken, instanceUrl } = await getSalesforceAccessToken();

  // Usamos axios.get y pasamos la consulta SQL en la URL
  const response = await axios.get(
    `${instanceUrl}/services/data/v60.0/query?q=${encodeURIComponent(sql)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.records;
}
