//config.js
import dotenv from "dotenv"
import programa from "../process.js"

const {mode}  = programa.opts();

dotenv.config({
    path:mode==="prod"?"./.env.prod":"./.env.desa"
});

export default {
    port:process.env.PORT
}