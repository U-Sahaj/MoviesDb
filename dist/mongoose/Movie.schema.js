"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MovieSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    cast: [{ castId: Number, name: String }],
    crew: [{ crewId: Number, job: String, name: String }],
    original_language: { type: String, required: true },
});
