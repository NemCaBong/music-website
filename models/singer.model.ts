import mongoose from "mongoose";

const singerSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String,
    slug: String,
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

const Singer = mongoose.model("Singer", singerSchema, "singers");

export default Singer;
