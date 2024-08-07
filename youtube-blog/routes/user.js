const express = require("express");
const { Router } = express;
const User = require('../models/user');

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async(req, res) => {
    const { email, password } = req.body;

    try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    
    return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error: "Incorrect Email or Password",
        })
    }

});

router.post('/signup', async(req, res) => {
    const { fullName, email, password } = req.body; // Extract values from req.body

    try {
        await User.create({
            fullName,
            email,
            password,
        });
          res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});


module.exports = router;