import jwt from "jsonwebtoken";

const { verify } = jwt;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }
    
    try {
        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid token" });
    }
    };

    export const checkRole = (allowedRoles) => (req, res, next) => {
        verifyToken(req, res, () => {
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: `Require ${allowedRoles.join(' or ')} Role!` });
            }
            next();
        });
    };
    
    // Usage
    export const verifyAdmin = checkRole(['admin']);
    export const verifyLearner = checkRole(['learner']);
    