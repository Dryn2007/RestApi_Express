const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

// Middleware untuk memastikan user sudah login
const requireAuth = ClerkExpressRequireAuth();

module.exports = requireAuth;
