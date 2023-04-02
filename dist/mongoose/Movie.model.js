"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Movie_schema_1 = require("./Movie.schema");
const MovieModel = mongoose_1.default.model("Movie", Movie_schema_1.MovieSchema);
exports.default = MovieModel;
