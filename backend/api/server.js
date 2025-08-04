import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";

connectDB();
app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${config.port}`);
});
