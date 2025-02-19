const adminAuthenticate = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return res.status(403).json({
      message: "Access Denied: Admins only!",
      error: true,
    });
  }
  next();
};

export default adminAuthenticate;
