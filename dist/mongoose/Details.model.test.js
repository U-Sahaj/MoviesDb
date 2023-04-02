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
const mongoose_1 = __importDefault(require("mongoose"));
const vitest_1 = require("vitest");
const Details_model_1 = require("./Details.model");
vitest_1.describe.skip('MoviesModel', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://localhost:27017/TestDb');
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Details_model_1.DetailsModel.deleteMany({});
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    (0, vitest_1.it)('should create a new movie document', () => __awaiter(void 0, void 0, void 0, function* () {
        const newMovie = {
            id: '19995',
            original_language: 'en',
        };
        const createdMovie = yield Details_model_1.DetailsModel.create(newMovie);
        (0, vitest_1.expect)(createdMovie.id).toBe(newMovie.id);
        (0, vitest_1.expect)(createdMovie.original_language).toBe(newMovie.original_language);
    }));
    (0, vitest_1.it)('should retrieve a previously created movie document', () => __awaiter(void 0, void 0, void 0, function* () {
        const newMovie = {
            id: '19995',
            original_language: 'en',
        };
        yield Details_model_1.DetailsModel.create(newMovie);
        const retrievedMovie = yield Details_model_1.DetailsModel.findOne({ id: newMovie.id });
        (0, vitest_1.expect)(retrievedMovie === null || retrievedMovie === void 0 ? void 0 : retrievedMovie.id).toBe(newMovie.id);
        (0, vitest_1.expect)(retrievedMovie === null || retrievedMovie === void 0 ? void 0 : retrievedMovie.original_language).toBe(newMovie.original_language);
    }));
});
