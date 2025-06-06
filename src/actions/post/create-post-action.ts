"use server";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import {v4 as uuidV4} from 'uuid'

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData): Promise<CreatePostActionState> {


  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries())
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)

  if(!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format())
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj)
    }
  }
  const validPostData = zodParsedObj.data
  const now = new Date().toISOString()
  const newPost: PostModel = {
    ...validPostData,
    createdAt: now,
    updatedAt: now,
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title)
  }
  return {
    formState: newPost,
    errors: [],
  };
}
