export type PostModel = {
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  content: string,
  coverImageUrl: string,
  published: boolean,
  createdAt: string | Date,
  updatedAt: string | Date,
  author: string,
};
