import { Secret } from "../Auth/config";

const mongoose = require("mongoose");

let db = null;
const uri =
  "mongodb+srv://ize8:csirkecomb@wordplay-bcqd7.azure.mongodb.net/WordPlay?retryWrites=true&w=majority";

export const CORS = fn => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another option
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  last_login: Date,
  created: Date
});

export const User = mongoose.model("User", userSchema);

const entrySchema = new mongoose.Schema({
  simp: String,
  trad: String,
  pinyin: String,
  eng: String
});

export const Entry = mongoose.model("Entry", entrySchema);

const wordListSchema = new mongoose.Schema({
  editors: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
  public: Boolean,
  label: String,
  created: Date,
  updated: Date,
  list: [entrySchema]
});

export const WordList = mongoose.model("WordList", wordListSchema);

export const getMongooseConnection = () => {
  if (db == null) {
    mongoose.connect(uri, { useNewUrlParser: true });
    db = mongoose.connection;
    return db;
  } else return db;
};
