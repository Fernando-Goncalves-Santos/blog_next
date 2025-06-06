import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import PostCoverImage from "../PostCoverImage/Index";
import PostSummary from "../PostSummary";
import ErrorMessage from "../ErrorMessage";

export default async function PostFeatured() {
  const posts = await findAllPublicPostsCached()
  if(posts.length <= 0 ) return <ErrorMessage content={'Ainda não criamos nenhum post.'} contentTitle="Ops! 😅"/>
  const post = posts[0]
  const postLink = `/post/${post.slug}`;
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />
      <PostSummary
        postLink={postLink}
        postHeading="h1"
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
