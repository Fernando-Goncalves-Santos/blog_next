import PostCoverImage from "../PostCoverImage/Index";
import PostSummary from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries";

export default async function PostsList() {
  const posts = await findAllPublicPostsCached()
  return (
    <div className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
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
