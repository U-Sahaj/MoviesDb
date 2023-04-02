"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const castSchema = new mongoose_1.default.Schema({
    castId: Number,
    name: String,
});
const crewSchema = new mongoose_1.default.Schema({
    crewId: Number,
    job: String,
    name: String,
});
exports.creditsSchema = new mongoose_1.default.Schema({
    movie_id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cast: {
        type: [castSchema],
        required: true,
    },
    crew: {
        type: [crewSchema],
        required: true,
    },
});
