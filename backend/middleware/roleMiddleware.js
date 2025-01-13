const roleAuthorization = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    // Check if the user's role is in the list of required roles
    if (!requiredRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // User has the required role
  };
};

module.exports = roleAuthorization;
