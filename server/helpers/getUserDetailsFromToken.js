const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
    try {
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded?.id) return null;

        const user = await UserModel.findById(decoded.id).select("-password");
        return user || null;
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null;
    }
};

module.exports = getUserDetailsFromToken;
