import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";

connectDB();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
