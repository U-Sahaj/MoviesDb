"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferencesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserPreferencesSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    preferred_languages: [String],
    favourite_actors: [String],
    favourite_directors: [String]
});
