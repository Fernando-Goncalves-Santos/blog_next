"use server";

import cloudinary from "@/lib/images/cloudinary-config";
import { verifyLoginSession } from "@/lib/login/manage-login";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

const uploadMaxSize = Number(process.env.IMAGE_UPLOAD_MAX_SIZE) || 921600;

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {
  const isAuthenticated = await verifyLoginSession();
  const makeResult = ({ url = "", error = "" }) => {
    return { url, error };
  };

  if (!isAuthenticated) {
    return makeResult({ error: "Usuário deslogado. Faça login novamente" });
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
  try {
    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const uploadResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "theblog",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error as UploadApiErrorResponse);
            }
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Upload failed without error response"));
            }
          }
        );

        stream.end(buffer);
      }
    );

    const url = uploadResponse.secure_url;

    return makeResult({ url });
  } catch (error) {
    console.error("Erro no upload do Cloudinary:", error);
    return makeResult({ error: "Falha no upload da imagem" });
  }
}
