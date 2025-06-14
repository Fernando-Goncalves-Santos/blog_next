import { PostRepository } from "./post-repository";
import { PrismaPostRepository } from "./prisma-post-repository";

export const postRepository: PostRepository = new PrismaPostRepository()