import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    // **********ATENÇÃO**************
    await drizzleDb.delete(postsTable); // limpando a base de dados
    // **********ATENÇÃO**************
    // await drizzleDb.insert(postsTable).values(posts); //criando a tabela posts a partir da seed
    console.log(`\n\n${posts.length} posts foram salvos na base de dados\n\n`)
  } catch (e) {
    console.log("\n\nErro\n", e,"\n\n");
  }
})();