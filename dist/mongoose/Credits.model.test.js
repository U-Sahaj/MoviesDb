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
const Credits_model_1 = require("./Credits.model");
vitest_1.describe.skip('CreditsModel', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://localhost:27017/TestDb');
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Credits_model_1.CreditsModel.deleteMany({});
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    (0, vitest_1.it)('should create and save credits document successfully for Avatar', () => __awaiter(void 0, void 0, void 0, function* () {
        const creditsData = {
            movie_id: 19995,
            title: 'Avatar',
            cast: [
                {
                    castId: 242,
                    name: 'Sam Worthington',
                },
                {
                    castId: 3,
                    name: 'Zoe Saldana',
                },
            ],
            crew: [
                {
                    crewId: 1721,
                    job: 'Editor',
                    name: 'Stephen E. Rivkin',
                },
                {
                    crewId: 496,
                    job: 'Production Design',
                    name: 'Rick Carter',
                },
            ],
        };
        const credits = new Credits_model_1.CreditsModel(creditsData);
        const savedCredits = yield credits.save();
        (0, vitest_1.expect)(savedCredits._id).toBeDefined();
        (0, vitest_1.expect)(savedCredits.title).toBe(creditsData.title);
    }));
    (0, vitest_1.it)('should create and save credits document successfully for Pirates of the Caribbean', () => __awaiter(void 0, void 0, void 0, function* () {
        const creditsData = {
            movie_id: 285,
            title: "Pirates of the Caribbean: At World's End",
            cast: [
                {
                    castId: 4,
                    name: 'Johnny Depp',
                },
                {
                    castId: 5,
                    name: 'Orlando Bloom',
                },
            ],
            crew: [
                {
                    crewId: 120,
                    job: 'Director of Photography',
                    name: 'Dariusz Wolski',
                },
                {
                    crewId: 1704,
                    job: 'Director',
                    name: 'Gore Verbinski',
                },
            ],
        };
        const credits = new Credits_model_1.CreditsModel(creditsData);
        const savedCredits = yield credits.save();
        (0, vitest_1.expect)(savedCredits._id).toBeDefined();
        (0, vitest_1.expect)(savedCredits.title).toBe(creditsData.title);
    }));
});
