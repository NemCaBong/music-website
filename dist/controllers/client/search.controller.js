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
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = `${req.params.type}`;
        const keyword = `${req.query.keyword}`;
        let result = [];
        if (keyword) {
            const regex = new RegExp(keyword, "i");
            const unidecodeKeyword = (0, convertToSlug_1.converToSlug)(keyword);
            const slugRegex = new RegExp(unidecodeKeyword, "i");
            const songs = yield song_model_1.default.find({
                $or: [{ title: regex }, { slug: slugRegex }],
                deleted: false,
            });
            if (songs.length > 0) {
                for (const song of songs) {
                    const infoSinger = yield singer_model_1.default.findOne({
                        _id: song.singerId,
                    });
                    result.push({
                        id: song.id,
                        title: song.title,
                        avatar: song.avatar,
                        slug: song.slug,
                        like: song.like,
                        infoSinger: {
                            fullName: infoSinger.fullName,
                        },
                    });
                }
            }
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `Kết quả: ${keyword}`,
                    keyword: keyword,
                    songs: result,
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "Thành công!",
                    songs: result,
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Lỗi",
                });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.result = result;
