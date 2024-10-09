var url = require("url");

const { getUserDataFromToken } = require("../helpers/jwtHelpers");
const {
  getAllJobs,
  getAllCategories,
  getJobByCategory,
  addJob,
  deleteJob,
  updateJob,
} = require("../services/jobServices");

const getAllJob = async (req, res, next) => {
  console.log("here");
  try {
    const allJobs = await getAllJobs();
    if (!allJobs) {
      throw new Error("cant pull products");
    }
    res.status(200).json({ allJobs, message: "Jobs retrived successfully" });
  } catch (error) {
    next(error.message);
  }
};

const getJobsByCategory = async (req, res, next) => {
  var url_parts = await url.parse(req.url, true);
  var query = url_parts.query;
  const categoryId = query.categoryId;
  console.log(query);
  try {
    const Jobs = await getJobByCategory(categoryId);
    if (!Jobs) {
      throw new Error("cant pull products");
    }
    res.status(200).json({ Jobs, message: "Jobs retrived successfully" });
  } catch (error) {
    next(error.message);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const Jobs = await getAllCategories();
    if (!Jobs) {
      throw new Error("no entry");
    }
    res.status(200).json({ Jobs, message: "Jobs retrived successfully" });
  } catch (error) {
    next(error.message);
  }
};

const addJobs = async (req, res, next) => {
  const { title, description, categoryId } = req.body;
  const token = await req.cookies.token;
  const userInfo = await getUserDataFromToken(token);
  const { payload } = userInfo.payload;

  try {
    if (payload[0] !== null) {
      try {
        const newJobAdded = await addJob(title, description, categoryId);
        if (!newJobAdded) {
          throw new Error("adding product failed");
        }

        res
          .status(200)
          .json({ newJobAdded, message: "Job added successfully" });
      } catch (error) {
        next(error.message);
        // res.status(400).json({error: error.message});
      }
    } else throw new Error("you are not permited to add only admins");
  } catch (error) {
    next(error.message);
  }
};

const deleteJobs = async (req, res, next) => {
  var url_parts = await url.parse(req.url, true);
  var query = url_parts.query;
  const jobId = query.prodId;
  const token = req.cookies.token;
  const userInfo = await getUserDataFromToken(token);
  console.log(jobId);
  try {
    if (userInfo[0] !== null) {
      try {
        const jobRem = await deleteJob(jobId);
        if (!jobRem) {
          throw new Error("deleting product failed");
        }
        res
          .status(200)
          .json({ jobRem, message: "Product deleted successfully" }).redirect('/');
      } catch (error) {
        next(error.message);
      }
    } else throw new Error("you are not permited to add only admins");
  } catch (error) {
    next(error.message);
  }
};

const updateJobs = async (req, res, next) => {
  const token = req.cookies.token;
  const userInfo = getUserDataFromToken(token);
  const { job_id, ...jobData } = await req.body;
  const filteredObj = Object.entries(jobData).reduce((acc, a) => {
    console.log(a);
     if (a[1] !== null && a[1] !== undefined && a[1] !== "") {
      acc[a[0]] = a[1];
 }
    return acc;
  }, {});
  console.log(filteredObj, job_id);
  try {
    if (userInfo[0] !== null) {
      try {
        const jobUpdated = await updateJob(job_id, jobData);
        if (!jobUpdated) {
          throw new Error("updating product failed");
        }
        res
          .status(200)
          .json({ jobUpdated, message: "Product updated successfully" });
      } catch (error) {
        next(error.message);
      }
    } else throw new Error("you are not permited to add only admins");
  } catch (error) {
    next(error.message);
  }
};
module.exports = {
  addJobs,
  getAllCategory,
  deleteJobs,
  getJobsByCategory,
  updateJobs,
  getAllJob,
};
