import { query } from "./index";

const getNameFromUserID = async (id: number) =>
  query(
    `SELECT users.name
        FROM chirps
        INNER JOIN users ON chirps.userid = users.id
        WHERE chirps.id = ?
        ORDER BY chirps.id;`,
    [id]
  );

const getIDFromName = async (name: string) =>
  query(
    `SELECT chirps.userid
        FROM users
        INNER JOIN chirps ON users.id = chirps.userid
        WHERE users.name = '?'`,
    [name]
  );

const getAll = async () =>
  query(`SELECT chirps.id, users.name, chirps.content, chirps.location, GROUP_CONCAT(mentions.userid) AS mentionedUsersIDs
            FROM chirps
            INNER JOIN users ON chirps.userid=users.id
            LEFT JOIN mentions ON chirps.id = mentions.chirpid
            GROUP BY chirps.id
            ORDER BY chirps.id`);

const getOne = async (id: number) =>
  query(
    `SELECT chirps.id, users.name, chirps.content, chirps.location, GROUP_CONCAT(mentions.userid) AS mentionedUsersIDs
        FROM chirps
        INNER JOIN users ON chirps.userid=users.id
        LEFT JOIN mentions ON chirps.id = mentions.chirpid
        WHERE chirps.id = ?
        ORDER BY chirps.id`,
    [id]
  );

const deleteMention = async (id: number) =>
  query(`DELETE FROM mentions WHERE chirpid = ?`, [id]);
const deleteChirp = async (id: number) =>
  query(`DELETE FROM chirps WHERE id = ?`, [id]);

const updateChirp = async (id: number, content: string, location: string) =>
  query(`UPDATE chirps SET content = ?, location = ? WHERE id = ?`, [
    content,
    location,
    id,
  ]);

const createChirp = async (userid: number, content: string, location: string) =>
  query(`INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)`, [
    userid,
    content,
    location,
  ]);
const createMention = async (chirpid: number, mentionedUserid: number) =>
  query(`INSERT INTO mentions VALUES (?, ?)`, [mentionedUserid, chirpid]);

const getNewestChirpID = async () => query(`SELECT MAX(id) FROM chirps`);

export default {
  getAll,
  getOne,
  updateChirp,
  createMention,
  deleteMention,
  deleteChirp,
  createChirp,
  getNewestChirpID,
  getNameFromUserID,
  getIDFromName,
};
