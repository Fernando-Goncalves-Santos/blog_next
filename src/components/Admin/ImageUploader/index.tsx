"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import Button from "@/components/Button";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

type ImageUploaderProps = {
  disabled?: boolean
}

export function ImageUploader({disabled}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

  function handleClick() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) {
      setImgUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.dismiss();
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Imagem muito grande. MAX.: ${readableMaxSize}KB`);
      fileInput.value = ""; //Limpando o campo do input
      setImgUrl("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        setImgUrl("");
        return;
      }
      setImgUrl(result.url);
      toast.success("Imagem enviada com sucesso");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Button
        type="button"
        variant="ghost"
        className="self-start"
        onClick={handleClick}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          <img className="rounded-lg max-w-lg" src={imgUrl} />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
