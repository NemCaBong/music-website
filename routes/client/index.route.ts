import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { searchRoutes } from "./search.route";
import { favoriteSongsRoutes } from "./favorite-songs.route";

const clientRoutes = (app: Express): void => {
  app.use("/songs", songRoutes);
  app.use("/topics", topicRoutes);
  app.use("/search", searchRoutes);
  app.use("/favorite-songs", favoriteSongsRoutes);
};

export default clientRoutes;
