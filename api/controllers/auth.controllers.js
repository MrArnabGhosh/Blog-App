import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeller } from "../utils/error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandeller(400, "All fields are required"));  // ✅ Added return
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json("Signup successful");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandeller(400, "All fields are required"));  // ✅ Fixed status code
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandeller(404, "User not found"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandeller(401, "Invalid password"));  // ✅ Changed to 401
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,  // ✅ true only Secure only in production
            sameSite: "lax",
            maxAge: 3600000
        });

        const { password: pass, ...rest } = validUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            const { password, ...rest } = user._doc;
            return res.status(200).json(rest);
        }

        // Generate a random password for Google auth users
        const generatePassword =
            Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

        const newUser = new User({
            username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: googlePhotoUrl,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookies("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        const { password, ...rest } = newUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
