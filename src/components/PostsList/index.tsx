import { postRepository } from "@/repositories/post";
import PostCoverImage from "../PostCoverImage/Index";
import PostHeading from "../PostHeading";
import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";

export default async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const postLink = `/post/${post.slug}`
        return(
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
          <div className="flex flex-col gap-4 sm:justify-center">
            <time
              dateTime={post.createdAt}
              className="text-slate-600 block text-sm/tight dark:text-slate-50"
              title= {formatRelativeDate(post.createdAt)}
            >
              {formatDateTime(post.createdAt)}
            </time>
            <PostHeading url={postLink} as="h2">
              {post.title}
            </PostHeading>
            <p>{post.excerpt}</p>
          </div>
        </div>
        )
})}
    </div>
  );
}
