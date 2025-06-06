import { postRepository } from "@/repositories/post";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findPostByIdAdmin = cache(async (id: string) => {
  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post) notFound(); // Essa função vem do next e LANÇA UMA EXCEÇÃO que chama a page que eu criei pro 404

  return post;
});

export const findAllPostsAdmin = cache(async () => {
    return postRepository.findAll()
})