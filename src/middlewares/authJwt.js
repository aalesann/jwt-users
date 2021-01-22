import User from '../models/User'
import Role from "../models/Role";
import config from "../config";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {


    try {
        const token = req.headers["x-access-token"];

        if (!token) res.status(403).json({ message: 'No token provided' })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 })
        console.log(user)
        if (!user) res.status(404).json({ message: 'no user found' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }

    res.status(403).json({ message: 'Require moderator role' });
}


export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    // console.log('USUARIO ECONTRADO: ', user)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    res.status(403).json({ message: 'Require admin role' });
}