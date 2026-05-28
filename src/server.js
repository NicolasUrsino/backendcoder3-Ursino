import app from "./app.js";
import config from "./config/config.js";

const port = config.port || 8080;

app.listen(port, () => {
  console.log("Sv levantado en el puerto:", port);
});
