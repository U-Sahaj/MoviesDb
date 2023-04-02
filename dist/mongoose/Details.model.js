"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Details_schema_1 = require("./Details.schema");
exports.DetailsModel = mongoose_1.default.model('MoviesDetails', Details_schema_1.detailsSchema);
