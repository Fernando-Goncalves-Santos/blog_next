// User esse USE CLIENT faz com que meu componente vire um client component e me permite interatividade com o Onclick
// Mas essa é uma má pratica, devemos mover o trechinho que sera client side para um novo componente
// 'use client'
import PostFeatured from "@/components/PostFeatured";
import PostsList from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";

import { Suspense } from "react";

export default async function HomePage() {
  return (
    <>
      <PostFeatured />
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
