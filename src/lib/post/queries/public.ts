import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

// Função cache permite que eu faça apenas uma chamada no bd
export const findAllPublicPostsCached = cache(
  unstable_cache(
    async () => {
      return await postRepository.findAllPublic();
    },
    ["posts"],
    {
      tags: ["posts"],
    }
  )
);

// Aqui, para receber a slug dentro de unstable cache eu usei uma imediatly invoked function
// É uma função que é criada e executada imediatamente
// E ao final do corpo da função principal eu executo essa IE function com o argumento slug
export const findPublicPostBySlugCached = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => undefined);

      if (!post) notFound();

      return post;
    },
    [`post-${slug}`],
    { tags: [`post-${slug}`] }
  )(slug);
});
