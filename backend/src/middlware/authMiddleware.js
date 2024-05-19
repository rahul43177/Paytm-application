const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "../../.env",
});

//authentication
module.exports.authenticate = (req, res, next) => {
  console.log("inside the authenticate")
  const token = req.cookies.token;
  console.log("token",token)
  if (!token) {
    console.log("Inside middleware , the token is not present.");
    return res.status(400).json({
      status: false,
      message: "Access Denied.",
    });
  }

  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRETCODE);
    console.log("🚀 ~ process.env.JWT_SECRETCODE:", process.env.JWT_SECRETCODE)
    console.log("🚀 ~ decodedToken:", decodedToken)
    req.user = decodedToken;
    next();
  } catch (error) {
    res.staus(500).json({
      status: false,
      error: error,
      errorMessage: error.message,
    });
  }
};

//authorisation
module.exports.authorization = (req,res,next) => {
    let userDetails = req.user
    let role = userDetails.role
    console.log("🚀 ~ role:", role)

    if(role == 'admin') {
        console.log("bade log")
        next()
    }else {
        console.log("chhote log")
        next()
    }    
}
