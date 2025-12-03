const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../../database_md/db');

require('dotenv').config();
const auth = express.Router();

auth.post('/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'All Fields Are Mandatory' });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User Already Exists' });

        if (password.length < 8)
            return res.status(400).json({ message: 'Password must be 8 characters long' });

        if (!/[0-9]/.test(password))
            return res.status(400).json({ message: 'Password must contain a number' });

        if (!/[!@#$%^&*]/.test(password))
            return res.status(400).json({ message: 'Password must contain a special character' });

        

        const encryptedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: encryptedPass,
            role  :'user'
        });

        await newUser.save();
        return res.status(201).json({ message: `${role} registered successfully!` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error', error: err });
    }
});


auth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        if (email === "admin@library.com" && password === "Admin123!@#") {
            return res.json({
                message: "Admin Login Successful",
                token: "admin_token",
                user: {
                    username: "Admin",
                    email: email,
                    role: "admin"
                }
            });
        }

        // ⭐ Normal user login
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user._id, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: "user"
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});


module.exports = auth;
