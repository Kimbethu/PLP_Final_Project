// middleware/roleMiddleware.js
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      // Check if the user is authenticated and has a role
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Access denied. No role provided.' });
      }
  
      // Check if the user's role matches the required role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
      }
  
      // If the user has the required role, proceed to the next middleware or route handler
      next();
    };
  };
  
  module.exports = roleMiddleware;
  