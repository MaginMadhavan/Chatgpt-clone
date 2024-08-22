import errorHandler from "../Middleware/errorMiddleware.js";
import userModel from "../Models/userModel.js";
import errorResponse from "../Utils/errorResponse.js";

//JWT TOKEN
export const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({ success: true, token });
};

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //existing user
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already in use", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credential", 401));
    }

    const isMatch = await userModel.matchPassword(password);

    if (!isMatch) {
      return next(new errorHandler("Invalid Credential", 401));
    }

    //res
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout successfull",
  });
};
