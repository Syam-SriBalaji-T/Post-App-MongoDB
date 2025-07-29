'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewPost({ params }) {
  const { slug } = use(params); // ✅ unwrap Promise safely

  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) {
          router.push('/not-found');
          return;
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError('Failed to load post');
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleDelete = async () => {
    if (!post) return;

    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete post');
        return;
      }

      router.push('/');
    } catch (err) {
      alert('Error deleting post');
    }
  };

  if (!post) return <p className="text-center p-6 text-gray-500">{error || 'Loading...'}</p>;

  return (
    <main>
      <div className="max-w-2xl mx-auto p-6">
        <img
          src={post.postPicUrl}
          alt={post.postTitle}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{post.postTitle}</h1>
        <p className="text-gray-700 text-lg">{post.postDetails}</p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Post
          </button>
        </div>
      </div>
    </main>
  );
}
