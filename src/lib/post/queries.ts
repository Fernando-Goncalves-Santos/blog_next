import { postRepository } from "@/repositories/post";
import { notFound } from "next/navigation";
import { cache } from "react";

// Função cache permite que eu faça apenas uma chamada no bd
export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublic()
);

export const findPostBySlugCached = cache(
  async (slug: string) => {
    const post = await postRepository.findBySlug(slug).catch(() => undefined)
    if(!post) notFound() // Essa função vem do next e LANÇA UMA EXCEÇÃO que chama a page que eu criei pro 404
    
    return post 
  });
  

export const findPostByIdCached = cache(
  async (id: string) => {
    const post = await postRepository.findById(id).catch(() => undefined)
    if(!post) notFound() // Essa função vem do next e LANÇA UMA EXCEÇÃO que chama a page que eu criei pro 404
    
    return post 
  });

