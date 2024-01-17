import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fetchuser from "../middlewere/fetchuser.js";
const router = Router();

router.post("/create", async (req, res) => {
  try {
    const JWT_SECRET = "talk@xyz";
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      displayName: req.body.displayName,
      password: secPass,
      email: req.body.email,
      auth_id: req.body.auth_id,
      doc_id: req.body.doc_id,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user)
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/update", fetchuser, async (req, res) => {
  const { doc_id, auth_id, displayName } = req.body;
  try {
    // Create a newNote object
    const userData = {};
    if (doc_id) {
      userData.doc_id = doc_id;
    }
    if (auth_id) {
      userData.auth_id = auth_id;
    }
    if (displayName) {
      userData.displayName = displayName;
    }

    // Find the note to be updated and update it
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Not Found");
    }

    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userData },
      { new: true }
    );
    res.json({ updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/search/:searchParam", async (req, res) => {
  try {
    const query = {
      displayName: { $regex: new RegExp(req.params.searchParam, "i") },
    };
    // console.log(displayName);
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
export default router;
