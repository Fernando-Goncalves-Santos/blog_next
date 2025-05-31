'use server';

import { revalidateTag } from "next/cache";

export async function revalidateCache(){
    revalidateTag('posts') // para os posts da home
    revalidateTag('posts-slug') // para os no geral
}