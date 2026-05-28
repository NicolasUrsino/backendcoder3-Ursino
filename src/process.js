//process.js
import { Command } from "commander";

const programa = new Command();

programa.option("-m --mode <mode>","Entorno de trabajo", "desarrollo");
programa.parse();


console.log("options: ",programa.opts())
export default programa;