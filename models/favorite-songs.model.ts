import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
  {
    // có tính năng login thì thêm userId vào
    // userId: String,
    songId: String,
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

const FavoriteSong = mongoose.model(
  "FavoriteSong",
  favoriteSongSchema,
  "favorite-songs"
);
export default FavoriteSong;
