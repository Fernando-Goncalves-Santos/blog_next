import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

// Função cache permite que eu faça apenas uma chamada no bd
export const findAllPublicPostsCached = unstable_cache(
  cache(async () => {
    return await postRepository.findAllPublic();
  }),
  ["posts"],
  {
    tags: ["posts"],
  }
);

// Aqui, para receber a slug dentro de unstable cache eu usei uma imediatly invoked function
// É uma função que é criada e executada imediatamente
// E ao final do corpo da função principal eu executo essa IE function com o argumento slug
export const findPostBySlugCached = (slug: string) => unstable_cache(
  cache(async (slug: string) => {
    const post = await postRepository
      .findBySlugPublic(slug)
      .catch(() => undefined);
    if (!post) notFound(); // Essa função vem do next e LANÇA UMA EXCEÇÃO que chama a page que eu criei pro 404

    return post;
  }),
  ["posts"],
  {
    tags: [`post-${slug}`],
  }
)(slug);

export const findPostByIdCached = cache(async (id: string) => {
  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post) notFound(); // Essa função vem do next e LANÇA UMA EXCEÇÃO que chama a page que eu criei pro 404

  return post;
});
