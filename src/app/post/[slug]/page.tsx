import SinglePost from "@/components/SinglePost";
import { SpinLoader } from "@/components/SpinLoader";
import { findPostBySlugCached } from "@/lib/post/queries";
import { Metadata } from "next";
import { Suspense } from "react";


export const dynamic = 'force-static'

type PostSlugPageProps = {
  params: Promise<{slug: string}>
}

// Essa função obrigatoriamente deve se chamar generateMetadata
export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug)
  return {
    title: post.title,
    description: post.excerpt
  }
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  return (
    <div>
      <Suspense fallback={<SpinLoader containerClasses="mb-16 min-h-20"/>}>
      <SinglePost slug={slug}/>
      </Suspense>
    </div>
  );
}
