import jwt, { decode } from 'jsonwebtoken';
import "dotenv/config";


const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure payload contains id
    if (!decoded?.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    req.user = { docId: decoded.id };
   

    next();
  } catch (error) {
    console.error("Auth Doctor Error:", error.message);

    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};



export default authDoctor;