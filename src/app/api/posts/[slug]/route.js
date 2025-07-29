// app/api/posts/[slug]/route.js
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';

export async function GET(req, { params }) {
  await connectToDatabase();
  const { slug } = params;

  const post = await Post.findOne({
    postTitle: { $regex: new RegExp('^' + slug.replace(/-/g, ' ') + '$', 'i') },
  });

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { slug } = params;

  const deleted = await Post.findOneAndDelete({
    postTitle: { $regex: new RegExp('^' + slug.replace(/-/g, ' ') + '$', 'i') },
  });

  if (!deleted) {
    return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
}
