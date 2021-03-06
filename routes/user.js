const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");

const userDataController = require("../controllers/todoController");

const addBookmark = require("../middlewares/user");

router.options("/course/all/:name", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
});

router.get("/course/all/:name", courseController.getAllCourses);

router.get("/course/:id", courseController.getCourse);

router.options("/status/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
});

router.post("/status/:id", addBookmark, courseController.setStatus);

router.post("/update/:id", userDataController.update_user);
module.exports = router;
