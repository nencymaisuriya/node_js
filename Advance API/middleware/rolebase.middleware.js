const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ status: false, error: "You don't have access to this route." });
    }
    next();
  };
};

module.exports=requireRole;