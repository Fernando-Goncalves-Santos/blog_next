// User esse USE CLIENT faz com que meu componente vire um client component e me permite interatividade com o Onclick
// Mas essa é uma má pratica, devemos mover o trechinho que sera client side para um novo componente
// 'use client'
import Container from "@/components/container";
import { Header } from "@/components/Header";
import PostFeatured from "@/components/PostFeatured";
import PostsList from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";

import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer>
        <h1 className="text-6xl font-bold text-center py-8">Footer</h1>
      </footer>
    </Container>
  );
}
