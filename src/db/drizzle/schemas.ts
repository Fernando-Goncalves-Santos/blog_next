import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postsTable = sqliteTable('posts', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    coverImageUrl: text('cover_image_url').notNull(), // esse _ para separar as palavras é a forma como a coluna aparecerá no banco de dados
    published: integer('published', {mode: 'boolean'}).notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(), 
});


// Isso me ajuda a selecionar e inserir os dados com a tipagem correta
export type PostsTableSelectModel = InferSelectModel<typeof postsTable>
export type PostsTableInsertModel = InferInsertModel<typeof postsTable>
