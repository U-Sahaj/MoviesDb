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
const UserPreferences_model_1 = require("./UserPreferences.model");
vitest_1.describe.skip('UserPreferencesModel', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://localhost:27017/TestDb');
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield UserPreferences_model_1.UserPreferencesModel.deleteMany({});
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    (0, vitest_1.test)('should create and retrieve a user preference document', () => __awaiter(void 0, void 0, void 0, function* () {
        const userPreferencesData = {
            user_id: '100',
            preferred_languages: ['English', 'Spanish'],
            favourite_actors: ['Denzel Washington', 'Kate Winslet', 'Emma SuÃ¡rez', 'Tom Hanks'],
            favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Pedro AlmodÃ³var']
        };
        const createdUserPreference = yield UserPreferences_model_1.UserPreferencesModel.create(userPreferencesData);
        (0, vitest_1.expect)(createdUserPreference.user_id).toBe(userPreferencesData.user_id);
        const foundUserPreference = yield UserPreferences_model_1.UserPreferencesModel.findOne({ user_id: userPreferencesData.user_id });
        (0, vitest_1.expect)(foundUserPreference).toEqual(vitest_1.expect.objectContaining(userPreferencesData));
        console.log(`UserPreferences: ${foundUserPreference === null || foundUserPreference === void 0 ? void 0 : foundUserPreference.user_id}`);
        console.log(`UserPreferences: ${foundUserPreference === null || foundUserPreference === void 0 ? void 0 : foundUserPreference.preferred_languages}`);
    }));
});
