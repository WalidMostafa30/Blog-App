const jwt = require("jsonwebtoken");

// verify token
const verifyToken = (req, res, next) => {
  const authHeaderToken = req.headers.authorization;
  if (authHeaderToken) {
    try {
      const token = authHeaderToken.split(" ")[1];
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token!, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided!, access denied" });
  }
};

// verify token and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed!, only admin and user himself" });
    }
  });
};

// verify token and admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed!, only admin" });
    }
  });
};

// verify token and only user himself
const verifyTokenAndOnlyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed!, only user himself" });
    }
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser
};
