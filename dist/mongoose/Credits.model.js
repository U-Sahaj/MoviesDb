"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Credits_schema_1 = require("./Credits.schema");
const CreditsModel = mongoose_1.default.model('MoviesCredits', Credits_schema_1.creditsSchema);
exports.CreditsModel = CreditsModel;
