// vercel-server.js
const app = require("./server");

module.exports = (req, res) => {
  app(req, res); // ✅ don't use app.listen()
};