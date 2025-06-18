import { postRepository } from "@/repositories/post";
import prisma from "./prisma";

async function main() {
  const posts = await postRepository.findAllPublic();
  posts.forEach(post => console.log(post.title))
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });