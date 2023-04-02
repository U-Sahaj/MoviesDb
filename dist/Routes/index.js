"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MovieRecommendationHTTPController_1 = require("../Controllers/MovieRecommendationHTTPController");
const MovieRecommendationRouter = (0, express_1.Router)({ strict: false });
MovieRecommendationRouter.get('/movies/users', MovieRecommendationHTTPController_1.getMovieRecommendationsForAllUsers);
exports.default = MovieRecommendationRouter;
