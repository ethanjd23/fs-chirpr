import { query } from "./index";

const createUser = async (name: string, email: string, password: string) =>
  query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    password,
  ]);

const getUserID = async (name: string) => query("SELECT id FROM users WHERE name = ?", [name]);


  export default {
      createUser,
      getUserID
  }