// vercel-server.js
const app = require(".");

module.exports = (req, res) => {
  app(req, res); // ✅ don't use app.listen()
};