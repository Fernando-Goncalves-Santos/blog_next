import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { logColor } from "@/utils/log-color";
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_WAIT } from "@/lib/constants";
import { postsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { postRepository } from ".";


export class DrizzlePostRepository implements PostRepository {


  async findAllPublic(): Promise<PostModel[]> {
    logColor('FindAllPublic', Date.now())
    await asyncDelay(SIMULATE_WAIT, true)
    const posts = await drizzleDb.query.posts.findMany({
        orderBy: (posts, {desc}) => desc(posts.createdAt),
        where: (posts, {eq}) => eq(posts.published, true)
    })
    //   // Usando o QUERY BUILDER do drizzle
    // const query = drizzleDb.select().from(postsTable)
    // query.where(eq(postsTable.published, true))
    // query.orderBy(desc(postsTable.createdAt))

    // // A query só é utilizada quando eu uso o AWAIT
    // const result = await query
    // console.log(result)
    return posts
  }

  async findBySlugPublic(slug: string): Promise<PostModel>{
    await asyncDelay(SIMULATE_WAIT, true)
    logColor('FindSlugPublic', Date.now())
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, {eq, and}) => and(eq(posts.published, true), eq(posts.slug, slug))
    })

    if(!post) throw new Error('Post não encontrado')

    return post
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT, true)
    logColor('FindAll', Date.now())
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, {desc}) => desc(posts.createdAt)
    })
    return posts

  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT, true)
    logColor('FindById', Date.now())
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, {eq}) => eq(posts.id, id)
    })

    if(!post) throw new Error('Post não encontrado')

    return post
  }

}



// Testes
// (async () => {
//     const repo = new DrizzlePostRepository()
//     // const posts = await repo.findAll()
//     // posts.forEach(post => console.log(post.slug, post.published))
//     const post = await repo.findById('afa086e4-53e4-492d-acf2-7c2966d83fcd')
//     console.log(post.title)
// })()