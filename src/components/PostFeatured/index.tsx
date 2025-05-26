import PostCoverImage from "../PostCoverImage/Index";
import PostHeading from "../PostHeading";

export default function PostFeatured() {
    const slug = 'qualquer'
    const postLink = `/post/${slug}`
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          width: 1200,
          height: 720,
          src: "/images/bryen_8.png",
          alt: "Mudei meu alt",
          priority: true,
        }}
      />
      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          dateTime="2025-04-20"
          className="text-slate-600 block text-sm/tight dark:text-slate-50"
        >
          26/05/2025 10:00
        </time>
        <PostHeading url={postLink} as="h1">
          Título do Post
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro vel
          repellendus, maxime dolorem natus quo aliquid quis aspernatur error
          repudiandae odio iusto ullam, placeat quaerat fugiat facilis veniam
          inventore asperiores.
        </p>
      </div>
    </section>
  );
}
