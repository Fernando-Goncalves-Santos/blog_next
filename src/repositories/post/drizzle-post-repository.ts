import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/db/drizzle";
import { asyncDelay } from "@/utils/async-delay";
import { postsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";

const simulateWait = Number(process.env.SIMULATE_WAIT) || 0

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWait, true);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
    //   // Usando o QUERY BUILDER do drizzle
    // const query = drizzleDb.select().from(postsTable)
    // query.where(eq(postsTable.published, true))
    // query.orderBy(desc(postsTable.createdAt))

    // // A query só é utilizada quando eu uso o AWAIT
    // const result = await query
    // console.log(result)
    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWait, true);
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulateWait, true);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(simulateWait, true);
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error("Post com ID ou Slug já existe na base de dados");
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error("Post não existe");
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt">
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error("Post não existe");
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}


