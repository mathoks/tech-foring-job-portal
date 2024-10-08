const express = require("express");
const { addJobs, deleteJobs, getAllCategory, updateJobs, getJobsByCategory, getAllJob } = require("../controllers/jobController");
const { checkJobDataInputIsEmpty } = require("../middlewares/validators/jobDataValidators");
const { authorization } = require("../middlewares/authorization");


const Router = express.Router();
Router.get('/views', authorization, getAllCategory);
Router.post("/add-job", authorization, checkJobDataInputIsEmpty, addJobs);
Router.delete("/delete-job", authorization, deleteJobs);
Router.patch("/update-job",  updateJobs);
Router.get("/get-job-by-category", getJobsByCategory);

module.exports = Router;