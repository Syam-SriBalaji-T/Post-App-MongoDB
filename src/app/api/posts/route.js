
// app/api/posts/route.js
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({});
  return Response.json(posts);
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Check if a post with same title exists
    const existing = await Post.findOne({
      postTitle: { $regex: new RegExp('^' + data.postTitle + '$', 'i') },
    });
    if (existing) {
      return new Response(JSON.stringify({ message: 'Post title already exists' }), {
        status: 400,
      });
    }

    const newPost = new Post(data);
    await newPost.save();

    return new Response(JSON.stringify({ message: 'Post created' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500,
    });
  }
}
