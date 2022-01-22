// const router = require('express').Router();
// const User = require('../models/User');
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// router.post('/register', async (req, res) => {

//     //Register
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         // password: req.body.password,
//         password: CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASS_SEC
//         ).toString(),
//     });

//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//         // console.log("user has saved",savedUser);
//     }
//     catch (err) {
//         res.status(500).json(err);
//         console.log(err);
//     }

// })

// // login 
// router.post('/login', async (req, res) => {

//     try {
//         const user = await User.findOne(
//             {
//                 username: req.body.user_name
//             }
//         );

//         !user && res.status(401).json("wrong credentials!"); /// !user means - if there is no user then return status 401 and wrong credentials 

//         const hashedPassword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC
//         ); ////decrypting the password by using crypto aes


//         const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);  //// hashedPassword will decrypt into the string by using toString

//         const inputPassword = req.body.password;

//         OriginalPassword !== inputPassword &&
//             res.status(401).json("wrong credentials"); //// if the password is incorrect then it will be returned status "wrong credentials"


//         const accessToken = jwt.sign(
//             {
//                 id: user._id,
//                 isAdmin: user.isAdmin,
//             },
//             process.env.JWT_SEC,
//             { expiresIn:"3d"}
//         );

//         const { password, ...others } = user._doc;

//         res.status(200).json({ ...others, accessToken });
   
//     }catch(err) {
//         res.status(500).json(err);
//     }

// });

// module.exports = router;



const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } 
  catch (err) {
    res.status(500).json(err);
  }

});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username,
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // const inputPassword = req.body.password;
        
        originalPassword !==req.body.password && 
            res.status(401).json("Wrong credential");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        ); 
  
        const { ...others } = user._doc;  
        // res.status(200).json({...others, accessToken});
        res.status(200).json({...others, accessToken})

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;