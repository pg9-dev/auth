const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, async (req, res) => {
    let {name} = await User.findOne({_id: req.user._id});
    res.send(name);
});

module.exports = router;
