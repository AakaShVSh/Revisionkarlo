const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const router = express.Router();
// const cookies = require("cookie-parser")
const mailjet = require("node-mailjet").apiConnect(
  "daeaed556b3ccf5afdfdac33268e3f8d",
  "f8d1e680a42bb498eec9e19aa9e6a379"
);

const generateToken = (user) => {
  return jwt.sign({ user }, "jakjsdgskasjbsabdjsd");
};
router.get("/", async (req, res) => {
  try {
    const Question = await User.find({}).lean().exec();
    return res.send({ status: 200, data: Question });
  } catch (error) {
    return res.send({ err: error });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { Email } = req.body;
    const alreadyuser = await User.findOne({ Email });
    console.log("h", alreadyuser, Email);
    if (!alreadyuser && Email != null) {
      const user = await User.create(req.body);
      const token = generateToken(req.body);

      req.cookies.Token = token;
      return res.send({ message: "registration success", token });
    } else if (alreadyuser) {
      return res.send({ message: "Email is already register" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const alreadyuser = await User.findOne({ Email });
    // console.log(req.body);
    //because we are finding in already user variable and below we are checking its password
    const match = alreadyuser.checkPassword(Password);
  console.log("h", alreadyuser, Email);
    if (alreadyuser && Email != null) {
      if (!match) {
        return res.send({ message: "Wrong Email or Password" });
      } else if (match) {
        let token = generateToken(req.body);
        return res.send({ message: "login success", data: alreadyuser, token });
      }
    }else if(!alreadyuser){
      return res.send({ message: "Email is not Register" });
    }
  } catch (error) {
    return res.send({ message: "Wrong Email or Password", err: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { Email } = req.body;

    // ✅ Validate input
    if (!Email) {
      return res.status(400).send({ message: "Email is required" });
    }

    // ✅ Check user
    const userEmail = await User.findOne({ Email });

    if (!userEmail) {
      return res.status(404).send({ message: "Email is not registered" });
    }

    // ✅ Generate OTP
    const randomOtp = Math.floor(1000 + Math.random() * 9000);

    // ✅ Send email using Mailjet
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "akvish052@gmail.com",
            Name: "Revision Karlo",
          },
          To: [
            {
              Email: Email,
              Name: userEmail.name || "User",
            },
          ],
          Subject: "OTP for Password Reset",
          TextPart: `Your OTP for password reset is ${randomOtp}. Do not share it with anyone.`,
          HTMLPart: `<h3>Your OTP for password reset is <b>${randomOtp}</b></h3>`,
        },
      ],
    });

    // ✅ Log safe response
    console.log("Mailjet response:", request.body);

    // ⚠️ In production: store OTP in DB with expiry
    // await OTP.create({ userId: userEmail._id, otp: randomOtp, expiresAt: Date.now() + 10*60*1000 })

    return res.status(200).send({
      status: "OTP sent successfully",
      method: "email",
      // ⚠️ REMOVE OTP in production
      otp: randomOtp,
      user: {
        id: userEmail._id,
        email: userEmail.Email,
      },
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.patch("/change-password/:id", async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.Password, 10);
    req.body.Password = hash;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.send({ message: "Password Updated Successfully", data: user });
  } catch (error) {
    return res.send({ message: error.message });
  }
});
module.exports = router;
