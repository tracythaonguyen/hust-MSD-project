import express from "express";
import videoController from "../controllers/video.controller.js";
import { verifyAdmin, verifyLearner } from "../middlewares/verifyToken.js";

const router = express.Router();

// get all categories
router.get("/", videoController.getAllVideos);

// search video by title
router.get("/search", videoController.searchVideoByTitle);

// get video by id
router.get("/:id", videoController.getVideoById);

// delete an video by id
router.delete("/:id", verifyAdmin, videoController.deleteVideo);

// update video
router.put("/:id", videoController.updateVideoTitle);

// create video with category
router.post(
  "/create",
  verifyAdmin,
  videoController.createVideoWithCategoryandTag
);

// get all tags of a video
router.get("/getTags/:id", videoController.getAllTagsOfVideo);

router.get(
  "/getRecentLearningVideo/:id",
  verifyLearner,
  videoController.getRecentLearningVideo
);

router.get(
  "/getFavouriteVideo/:id",
  verifyLearner,
  videoController.getFavouriteVideo
);
// get all videos by tag id
router.get("/getVideosByTag/:id", videoController.getAllVideosByTagId);

router.post("/view/:id", videoController.handleVideoView);

export default router;
