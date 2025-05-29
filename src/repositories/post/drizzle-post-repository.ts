import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { eq, desc } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {


  async findAllPublic(): Promise<PostModel[]> {

    const posts = drizzleDb.query.posts.findMany({
        orderBy: (posts, {desc}) => desc(posts.createdAt),
        where: (posts, {eq}) => eq(posts.published, true)
    })

    return posts


    //   // Usando o QUERY BUILDER do drizzle
    // const query = drizzleDb.select().from(postsTable)
    // query.where(eq(postsTable.published, true))
    // query.orderBy(desc(postsTable.createdAt))

    // // A query só é utilizada quando eu uso o AWAIT
    // const result = await query
    // console.log(result)
  }
  async findAll(): Promise<PostModel[]> {

  }
  async findById(id: string): Promise<PostModel> {
    
  }
  async findBySlugPublic(slug: string): Promise<PostModel>{
    
  }
}


(async () => {
    const repo = new DrizzlePostRepository()
    const posts = await repo.findAllPublic()
    posts.forEach(post => console.log(post.slug, post.published))
})()