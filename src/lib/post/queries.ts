import { postRepository } from "@/repositories/post";
import { cache } from "react";

// Função cache permite que eu faça apenas uma chamada no bd
export const findAllPublicPosts = cache(
  async () => await postRepository.findAllPublic()
);
