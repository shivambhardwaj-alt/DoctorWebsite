import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    req.user = { id: decoded.id };
    if(!req.user){
        return res.json({success:false,message:'Login Again!'});
    }

    next(); // don't forget this!
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
