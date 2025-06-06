"use client";
import Button from "@/components/Button";
import InputCheckbox from "@/components/InputCheckbox";
import InputText from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor/indext";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";

type ManagePostForm = {
  publicPost?: PublicPost
}

export default function ManagePostForm({publicPost}: ManagePostForm) {
  const [contentValue, setContentValue] = useState(publicPost?.content || "");
  
  
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: []
  }

  const [state, action, isPending] = useActionState(createPostAction, initialState)

  const {formState} = state

  useEffect(() => {
    if(state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error))
    }
  }, [state.errors])


  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="ID gerado automaticamente"
          type="text"
          defaultValue={formState.id}
          readOnly
        />
        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug gerada automaticamente"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />
        <InputText
          labelText="Autor"
          name="author"
          placeholder="Nome do autor"
          type="text"
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          placeholder="Título do post"
          type="text"
          defaultValue={formState.title}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Um resumo do post"
          type="text"
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue || ""}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />
        <ImageUploader />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          placeholder="cole aqui a URL da imagem da capa"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox labelText="Publicar?" name="published" type="checkbox" defaultChecked={formState.published} />

        <div className="mt-4">
          <Button size="md">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
