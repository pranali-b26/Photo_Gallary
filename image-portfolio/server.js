const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Models
const Image = require("./models/Image");
const User = require("./models/User");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("Connection Error:", err);
});

// REGISTER API
app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = new User({
            name,
            email,
            phone,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "Account Created Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
});


// LOGIN API (FIXED + DEBUG READY)
app.post("/login", async (req, res) => {
    try {

        // 🔥 DEBUG LINES (IMPORTANT)
        console.log("LOGIN API HIT");
        console.log("REQUEST BODY:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        console.log("FOUND USER:", user);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        console.log("DB PASSWORD:", user.password);
        console.log("INPUT PASSWORD:", password);

        if (user.password !== password) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (err) {
        console.log("LOGIN ERROR:", err);
        res.status(500).json({
            message: "Server error"
        });
    }
});


// SERVER START
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});