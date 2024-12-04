import express from "express";
import {
    getMatch,
    getMatches,
    createMatch,
    updateMatch,
    deleteMatch,
} from "../controllers/matches.js";

const router = express.Router();

router.route("/").get(getMatches).post(createMatch);

router.route("/:id").get(getMatch).put(updateMatch).delete(deleteMatch);

export default router;
