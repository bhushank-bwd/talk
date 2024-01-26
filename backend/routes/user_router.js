import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import fetchuser from "../middlewere/fetchuser.js";
const router = Router();

const JWT_SECRET = "talk@xyz";
router.post("/create", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        status: false,
        message: "Sorry a user with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email,
      doc_id: req.body.doc_id || null,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ status: true, authtoken, id: user.id, username });
  } catch (error) {
    console.error(error.message);
    res.json({ status: false, message: error.message });
  }
});

router.post("/update", fetchuser, async (req, res) => {
  const { doc_id } = req.body;
  try {
    const userData = {};
    userData.doc_id = doc_id;
    // Find the note to be updated and update it
    let user = await User.findById(req.user.id);
    if (!user) {
      res.json({ status: false, message: "user not found" });
    }

    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userData },
      { new: true }
    );
    res.json({ status: true, updatedUser });
  } catch (error) {
    console.error(error.message);
    res.json({ status: false, message: error.message });
  }
});
router.get("/search/:searchParam", async (req, res) => {
  try {
    const query = {
      displayName: { $regex: new RegExp(req.params.searchParam, "i") },
    };
    const users = await User.find(query);
    if (users.length) {
      res.json({ users });
    } else {
      res.json({ status: false, message: "no user found" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});
router.post("/get-user", async (req, res) => {
  try {
    const { user } = jwt.verify(req.body.authtoken, JWT_SECRET);

    if (user?.id) {
      let userData = await User.findById(user.id);
      if (userData) {
        const { id, username, email } = userData;
        res.json({
          status: true,
          message: "User Found",
          uid: id,
          username,
          email,
        });
      } else {
        res.json({ status: false, message: "User not found" });
      }
    } else {
      res.json({ status: false, message: "Provide valid user id" });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ status: false, message: error.message });
  }
});
router.post(
  "/login",
  [
    body("username", "Username required").notEmpty(),
    body("password", "Password required").notEmpty(),
  ],
  async (req, res) => {
    let status = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: status,
        errors: errors.array(),
        message: "Validation errors",
      });
    }
    try {
      let user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      });
      if (user) {
        const passwordCompare = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (passwordCompare) {
          const data = {
            user: {
              id: user.id,
            },
            Stack: {
              expiresIn: "1d", // expires in 1 day(s)
            },
          };

          const authtoken = jwt.sign(data, JWT_SECRET);
          let status = true;
          let message = "Login successfully";
          return res
            .status(200)
            .json({ status, authtoken, id: user.id, username: user.username });
        } else {
          return res.status(400).json({
            status: status,
            message: "Password not match",
          });
        }
      } else {
        return res.status(400).json({
          status: status,
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ status: false, message: "Something went wrong" });
    }
  }
);
export default router;
