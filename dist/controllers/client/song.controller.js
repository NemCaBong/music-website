"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_songs_model_1 = __importDefault(require("../../models/favorite-songs.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            deleted: false,
            slug: req.params.slugTopic,
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id,
            status: "active",
            deleted: false,
        }).select("title avatar singerId like createdAt slug");
        for (const song of songs) {
            const singerInfo = yield singer_model_1.default.findOne({
                _id: song.singerId,
                deleted: false,
            }).select("fullName");
            song["infoSinger"] = singerInfo;
        }
        res.render("client/pages/songs/list", {
            pageTitle: "Danh sách bài hát",
            songs: songs,
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect("back");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            deleted: false,
            status: "active",
            slug: slugSong,
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        }).select("fullName");
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            status: "active",
            deleted: false,
        }).select("title");
        const isFavorite = yield favorite_songs_model_1.default.findOne({
            songId: song.id,
        });
        song["isFavorite"] = isFavorite ? true : false;
        res.render("client/pages/songs/detail", {
            pageTitle: song.title,
            song: song,
            singer: singer,
            topic: topic,
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect("back");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeLike = req.params.typeLike;
        const id = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: "active",
        });
        const newLike = typeLike === "like" ? song.like + 1 : song.like - 1;
        yield song_model_1.default.updateOne({
            _id: id,
        }, {
            like: newLike,
        });
        res.json({
            code: 200,
            message: "Thành công",
            like: newLike,
        });
    }
    catch (error) {
        res.json({
            code: 500,
            message: "Lỗi " + error.message,
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavSong = yield favorite_songs_model_1.default.findOne({
                songId: idSong,
            });
            if (!existFavSong) {
                const favSong = new favorite_songs_model_1.default({
                    songId: idSong,
                });
                yield favSong.save();
            }
            break;
        case "unfavorite":
            yield favorite_songs_model_1.default.deleteOne({
                songId: idSong,
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        result: "Ok",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
        });
        const newListen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            listen: newListen,
        });
        res.json({
            code: 200,
            message: "Thành công",
            listen: newListen,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            code: 400,
            message: "Lỗi " + error.message,
        });
    }
});
exports.listen = listen;
