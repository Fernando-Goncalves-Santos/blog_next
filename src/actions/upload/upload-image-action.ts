"use server";

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_DIRECTORY, IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { fi } from "date-fns/locale";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => {
    return { url, error };
  };

  // Verificações de segurança
  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
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
    IMAGE_UPLOAD_DIRECTORY
  );

  // Cria a pasta uploads caso não exista
  await mkdir(uploadFullPath, { recursive: true }); 

// Criação do buffer para o upload através do Node
  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)

//   Salvando o buffer no caminho criado com o nome unico
  const fileFullPath = resolve(uploadFullPath, uniqueImageName)
  await writeFile(fileFullPath, buffer)

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`
  
  return makeResult({ url });
}
