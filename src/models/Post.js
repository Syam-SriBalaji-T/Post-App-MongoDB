// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  postTitle: String,
  postDetails: String,
  postPicUrl: String
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
