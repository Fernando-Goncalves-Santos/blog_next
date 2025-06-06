import ErrorMessage from "@/components/ErrorMessage";
import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import clsx from "clsx";
import Link from "next/link";
import DeletePostButton from "../DeletePostButton";


export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();
  if(posts.length <= 0 ) return <ErrorMessage content={'Vamos criar nosso primeiro post?'} contentTitle="Ei 👨‍💻"/>
  return (
    <div className="mb-16">
      {posts.map((post) => (
        <div
          className={clsx(
            "py-2",
            "px-2",
            !post.published && "bg-slate-300",
            "flex",
            "gap-2",
            "items-center",
            "justify-between"
          )}
          key={post.id}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
          {!post.published && (
            <span className="text-xs text-slate-600 italic">
              (Não publicado)
            </span>
          )}
          <DeletePostButton title={post.title} id={post.id} />
        </div>
      ))}
    </div>
  );
}
