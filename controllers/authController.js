const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = require("../services/createUser");
const checkUserExists = require("../services/checkUserExists");

const userRegistration = async (request, response) => {
  const { username, password, email } = request.body;

  //Input validation
  if (!username || !password || !email) {
    return response.status(400).json({
      error: "Bad Request",
      message: "All fields are required",
    });
  }

  try {
    //Check users exists
    const isUserExists = await checkUserExists(request);
    if (isUserExists) {
      return response.status(409).json({
        error: "Conflict",
        message: "User already exists",
      });
    }

    //Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(request, hashedPassword);
    return response.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(`Failed to register user: ${error.message}`);
    return response.status(500).json({
      error: "Internal Server Error",
      message: "Registration failed!",
    });
  }
};

const userLogin = async (request, response) => {
  const { email, password } = request.body;

  //Input validation
  if (!email || !password) {
    return response.status(400).json({
      error: "Bad Request",
      message: "Email and password are required",
    });
  }

  try {
    //Check user exists
    const user = await checkUserExists(request);

    if (!user) {
      return response.status(404).json({
        error: "Not Found",
        message: "User not found!",
      });
    }

    //user found
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(401).json({
        error: "Unauthorized",
        message: "Incorrect password",
      });
    }
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return response.status(200).json({
      message: "Login Successful!",
      accessToken,
    });
  } catch (error) {
    console.log(`Login Failed due to:${error.message}`);
    return response.status(500).json({
      error: "Internal Server Error",
      message: "Login Failed, Please try again later",
    });
  }
};

module.exports = { userRegistration, userLogin };
