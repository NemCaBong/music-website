"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const system_1 = require("../../config/system");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const adminPath = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(`${adminPath}/songs`, song_route_1.songRoutes);
    app.use(`${adminPath}/topics`, topic_route_1.topicRoutes);
    app.use(`${adminPath}/upload`, upload_route_1.uploadRoutes);
    app.use(`${adminPath}/dashboard`, dashboard_route_1.dashboardRoutes);
};
exports.default = adminRoutes;
