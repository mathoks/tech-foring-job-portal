

const checkJobDataInputIsEmpty = async (req, res, next) => {
    try {
      const { title, description,  categoryId, } = req.body;
      console.log(req.body)
      if (
        !title ||
        !description ||
        !categoryId ||
        title.trim().length === 0 ||
        description?.trim().length === 0 ||
        categoryId.trim().length === 0
      ) {
        throw new Error("all input fields are required");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  
  


module.exports = {checkJobDataInputIsEmpty}