"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

const uploadMaxSize = Number(process.env.IMAGE_UPLOAD_MAX_SIZE) || 921600
const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || "uploads"
const uploadServerURL = process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads"

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {

  const isAuthenticated = await verifyLoginSession()
  const makeResult = ({ url = "", error = "" }) => {
    return { url, error };
  };

  if(!isAuthenticated) {
    return makeResult({error: 'Usuário deslogado. Faça login novamente'})
  }

  // Verificações de segurança
  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  if (file.size > uploadMaxSize) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Imagem inválida" });
  }

  // Salvando a imagem
  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(
    process.cwd(),
    "public",
    uploadDir
  );

  // Cria a pasta uploads caso não exista
  await mkdir(uploadFullPath, { recursive: true }); 

// Criação do buffer para o upload através do Node
  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)

//   Salvando o buffer no caminho criado com o nome unico
  const fileFullPath = resolve(uploadFullPath, uniqueImageName)
  await writeFile(fileFullPath, buffer)

  const url = `${uploadServerURL}/${uniqueImageName}`
  
  return makeResult({ url });
}
