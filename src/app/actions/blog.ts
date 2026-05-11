'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getBlogPosts(publishedOnly = true) {
  return await prisma.blog_posts.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: { published_at: 'desc' },
    select: {
      post_id: true,
      slug: true,
      title: true,
      excerpt: true,
      tags: true,
      published: true,
      published_at: true,
      created_at: true,
    }
  });
}

export async function getBlogPost(slug: string) {
  return await prisma.blog_posts.findUnique({
    where: { slug }
  });
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
}) {
  const post = await prisma.blog_posts.create({
    data: {
      ...data,
      published_at: data.published ? new Date() : null,
      updated_at: new Date(),
    }
  });
  revalidatePath('/vector/blog');
  return post;
}

export async function updateBlogPost(id: number, data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
}) {
  const post = await prisma.blog_posts.update({
    where: { post_id: id },
    data: {
      ...data,
      published_at: data.published ? new Date() : null,
      updated_at: new Date(),
    }
  });
  revalidatePath('/vector/blog');
  return post;
}

export async function deleteBlogPost(id: number) {
  await prisma.blog_posts.delete({ where: { post_id: id } });
  revalidatePath('/vector/blog');
}
