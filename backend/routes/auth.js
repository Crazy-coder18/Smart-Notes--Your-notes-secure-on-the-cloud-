const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "HarryisagoodBoy";
//Route 1: CREATED AN END POINT FOR  OF USER CREATOIN IT DOESNT REQUIRE ANY AUTHENTICATION
router.post('/createuser', [

  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "enter a valid password ").isLength({ min: 5 })
], async (req, res) => {
  let sucess=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucess,errors: errors.array() });

  }
  let user = await User.findOne({ sucess,email: req.body.email });
  try {

    if (user) {
      return res.status(400).json({ error: "user with the email already exits" });
    }
    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
  
    sucess=true
    res.json({ sucess,authtoken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured");
  }

})
//Route 2: creating an endpoint for login
router.post('/login', [
  body("email", "enter a valid email").isEmail(),
  body("password", " password cannnot be blank ").isLength({ min: 5 })
], async (req, res) => {
  let sucess = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({sucess,  error: "please login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({sucess,  error: "please login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    sucess = true;
    res.json({ sucess, authtoken });

  } catch (error) {

    console.error(error.message);
    res.status(500).send("internal server error occured")
  }

})


router.post('/getuser', fetchuser, async (req, res) => {


  //Route 3: Getting logged in details of user login required;
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("internal server error occured")

  }
})
module.exports = router;