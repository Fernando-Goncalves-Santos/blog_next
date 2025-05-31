// User esse USE CLIENT faz com que meu componente vire um client component e me permite interatividade com o Onclick
// Mas essa é uma má pratica, devemos mover o trechinho que sera client side para um novo componente
// 'use client'
import PostFeatured from "@/components/PostFeatured";
import PostsList from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";

import { Suspense } from "react";

// Esse trecho "tenta" forçar a pagina a ser estatica
export const dynamic = 'force-static'

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader containerClasses="min-h-20 mb-16"/>}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}
