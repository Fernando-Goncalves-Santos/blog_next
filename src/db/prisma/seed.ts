// import { JsonPostRepository } from "@/repositories/post/json-post-repository";
// import prisma from "./prisma";






// (async () => {
//   const jsonPostRepository = new JsonPostRepository();
//   const posts = await jsonPostRepository.findAll();
//   const formatedPosts = posts.map((post) => ({
//     ...post,
//     createdAt: new Date(post.createdAt),
//     updatedAt: new Date(post.updatedAt),
//   }));

//   try {
//     // **********ATENÇÃO**************
//     await prisma.post.deleteMany({}); // deleta todos os dados da tabela
//     // **********ATENÇÃO**************
//     await prisma.post.createMany({ data: formatedPosts }); //criando a tabela posts a partir da seed
//     console.log(`\n\n${posts.length} posts foram salvos na base de dados\n\n`);
//   } catch (e) {
//     console.log("\n\nErro\n", e, "\n\n");
//   } finally {
//     prisma.$disconnect()
//   }
// })();



