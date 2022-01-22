// const jwt = require('jsonwebtoken');


// const verifyToken = (req, res,next) => {
//     const authHeader = req.headers.token;

//     if(authHeader){
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//             if(err) res.status(403).json("Token is not valid")
//             req.user = user;
//             next();
//         });
//     } else {
//         return res.status(401).json("you are not authorized to access this");
//     }
// };

// // verifying admin and user credentials is ok then allowed to next.

// const verifyTokenAnsAuthentication = (req, res,next) => {

//     verifyToken(req,res, ()=> {
//         if(req.user.id === req.params.id || req.user.isAdmin){
//             next();
//         } else {
//             res.status(403).json("you are not allowed to that");
//         }
//     });

// };


const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAnsAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

//   verify is admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
    verifyToken, 
    verifyTokenAnsAuthentication, 
    verifyTokenAndAdmin
};