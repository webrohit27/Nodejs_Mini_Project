const { Router } = require("express");

const router = Router();

router.get("/signin", (req, res) => {
    return 
    res.render("signin");
});

router.get("/signup", (req, res) => {
    return 
    res.render("signup");
});

router.post('/signup', async(req, res) => {
    await User.create({
        fullName,
        email,
        password,
    });
    return 
    res.redirect("/");
})