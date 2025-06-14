import prisma from "@/db/prisma/prisma";
import { PostRepository } from "./post-repository";
import { PostModel } from "@/models/post/post-model";


export class PrismaPostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true },
    });
    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    
    const post = await prisma.post.findFirst({
      where: { slug: slug, published: true },
    });

    if (!post) {
      throw new Error("Post não encontrado");
    }

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    
    const post = await prisma.post.findFirst({ where: { id: id } });
    if (!post) {
      throw new Error("Post não encontrado");
    }
    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    
    const postExists = await prisma.post.findFirst({
      where: { OR: [{ id: post.id }, { slug: post.slug }] },
    });
    if (!!postExists) {
      throw new Error("Post com ID ou Slug já existe na base de dados");
    }

    await prisma.post.create({ data: post });
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    
    const post = await prisma.post.findFirst({ where: { id: id } });
    if (!post) {
      throw new Error("Post não existe");
    }
    await prisma.post.delete({ where: { id: id } });
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt">
  ): Promise<PostModel> {
    const oldPost = await prisma.post.findFirst({ where: { id: id } });
    if (!oldPost) {
      throw new Error("Post não encontrado");
    }

    const updatedAt = new Date();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await prisma.post.update({ where: { id: id }, data: postData });

    return { ...oldPost, ...postData };
  }
}

// (async () => {
//     try {
//         const repository = new PrismaPostRepository()
//         const posts = await repository.findAllPublic()
//         posts.forEach(post => console.log(post.title))
//     } catch (e) {
//         console.log(e)
//     } finally {
//         await prisma.$disconnect()
//     }
// })()

