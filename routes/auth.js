const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
    // Validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the databse
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email Already Exists");

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Log In
router.post("/login", async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Login credentials don't exists.");

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send("Login credentials aren't valid.");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("authToken", token).send(token);
});

router.get("/", async (req, res) => {
    // gets all users
    const users = await User.find({});
    // Transforms the database response
    const response = users.map((item) => {
        return {
            name: item.name,
            email: item.email,
        };
    });
    res.send(response);
});

module.exports = router;
