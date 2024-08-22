import errorResponse from "../Utils/errorResponse";

const errorHandler = (err, req, res, next) => {
  let err = { ...err };
  err.message = err.message;

  //mongoose cast Error
  if (err.name === "castError") {
    const message = "Resources Not Found";
    err = new errorResponse(message, 404);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate Field Value";
    err = new errorResponse(message, 400);
  }

  //mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new errorResponse(message, 400);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }
};

export default errorHandler;
