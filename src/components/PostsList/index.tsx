import ErrorMessage from "../ErrorMessage";
import PostCoverImage from "../PostCoverImage/Index";
import PostSummary from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export default async function PostsList() {
  const posts = await findAllPublicPostsCached()
  if(posts.length <= 1 ) return null
  return (
    <div className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group h-full" key={post.id}>
            <PostCoverImage
              linkProps={{ href: postLink }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />
            
            <PostSummary
              postHeading="h2"
              postLink={postLink}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
