import { postRepository } from "@/repositories/post";
import prisma from "./prisma";

async function main() {
  const posts = await postRepository.findAllPublic();
  console.log(posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });