const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addJob = async (
  jobTitle,
  jobDescription,
  categoryId
) => {
  try {
    const items = await prisma.jobs.findUnique({
      where: {
        title: jobTitle,

      },
    });

    if (items) {
        throw new Error("Job already exist");
    }

    const newJob = await prisma.jobs.create({
      data: {
        title: jobTitle,
        description: jobDescription,
        categoryId: categoryId,
      },
    });

    if (!newJob) {
      throw new Error("job not created");
    }

    return newJob;
    
  } catch (error) {
    throw new Error(error);
  }
};



const getAllJobs = async () => {
  const jobs = await prisma.jobs.findMany();
  console.log("here", jobs);
  if (!jobs) {
    throw new Error("jobs not found");
  }
  return jobs;
};

const getAllCategories = async () => {
  const jobs = await prisma.category.findMany({include: {
    Jobs: true }
  });
  if (!jobs) {
    throw new Error("category not found");
  }
  return jobs;
};

const deleteJob = async (jobId) => {
  console.log("here", jobId);
    const jobs = await prisma.jobs.findUnique({
        where: {
            id: jobId,
        },
    });
    if (!jobs) {
      throw new Error("jobs not found");
    }
    const deletedJob = await prisma.jobs.delete({
        where: {
            id: jobId,
        },
    });
    return deletedJob.title;
  };

  const updateJob = async (jobId, jobData) => {
    const jobs = await prisma.jobs.findUnique(
      {
        where: {
          id: jobId,
        },
      }
    );
    if (!jobs) {
      throw new Error("jobs not found");
    }
    const updatedJob = await prisma.jobs.update({
        where: {
            id: jobId,
        },
        data: jobData,
    });
    return updatedJob;
  };

const getJobByCategory = async(categoryId)=>{
const jobDetails = await prisma.category.findUnique({
    where: {
        id : categoryId
    },
    include : {
        Jobs : true
    }
})
if (!jobDetails){
    throw new Error("no details for this job")
}
return jobDetails
}

module.exports = {getJobByCategory, getAllCategories, addJob, getAllJobs, deleteJob, updateJob};