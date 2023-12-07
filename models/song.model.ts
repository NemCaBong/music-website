import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    // về sau chỉnh like thành 1 array các id của user
    // sau khi đã làm tính năng đăng nhập
    // số lượng like chính là số id
    like: Number,
    lyrics: String,
    audio: String,
    status: String,
    slug: String,
    listen: {
      type: Number,
      default: 0,
    },
    deleted: {
      default: false,
      type: Boolean,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema, "songs");
export default Song;
