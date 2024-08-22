import errorResponse from "../Utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //mongoose cast Error
  if (error.name === "castError") {
    const message = "Resources Not Found";
    error = new errorResponse(message, 404);
  }

  //duplicate key error
  if (error.code === 11000) {
    const message = "Duplicate Field Value";
    error = new errorResponse(message, 400);
  }

  //mongoose validation
  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

export default errorHandler;
