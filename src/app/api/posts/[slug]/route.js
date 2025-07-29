import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { slug } = params;

    const post = await Post.findOne({
      postTitle: { $regex: new RegExp('^' + slug.replace(/-/g, ' ') + '$', 'i') },
    });

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json(post, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to fetch post' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { slug } = params;

    const deleted = await Post.findOneAndDelete({
      postTitle: { $regex: new RegExp('^' + slug.replace(/-/g, ' ') + '$', 'i') },
    });

    if (!deleted) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to delete post' }, { status: 500 });
  }
}
