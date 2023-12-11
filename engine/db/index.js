import { is } from "@electron-toolkit/utils";

const knex = require("knex");
const knexfile = require("./knexfile");

const db = is.dev ? knex(knexfile.development) : knex(knexfile.production);
module.exports = db;
