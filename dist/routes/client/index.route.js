"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const search_route_1 = require("./search.route");
const favorite_songs_route_1 = require("./favorite-songs.route");
const clientRoutes = (app) => {
    app.use("/songs", song_route_1.songRoutes);
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/search", search_route_1.searchRoutes);
    app.use("/favorite-songs", favorite_songs_route_1.favoriteSongsRoutes);
};
exports.default = clientRoutes;
