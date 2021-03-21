import { query } from './index';

const getAll = async () => query("SELECT * FROM chirps")

const getOne = async (id: number) => query(`SELECT * FROM chirps WHERE id = ?`, [id])

const deleteMention = async (id: number) => query(`DELETE FROM mentions WHERE chirpid = ?`, [id])
const deleteChirp = async (id: number) => query(`DELETE FROM chirps WHERE id = ?`, [id])

const updateChirp = async (id: number, content: string, location: string) => query(`UPDATE chirps SET content = ?, location = ? WHERE id = ?`, [content, location, id])

const createChirp = async (userid: number, content: string, location: string) => query(`INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)`, [userid, content, location]);
const createMention = async (chirpid: number, mentionedUserid: number) => query(`INSERT INTO mentions VALUES (?, ?)`, [mentionedUserid, chirpid])
const getNewestChirpID = async () => query(`SELECT MAX(id) FROM chirps`)

export default {
    getAll,
    getOne,
    updateChirp,
    createMention,
    deleteMention,
    deleteChirp,
    createChirp,
    getNewestChirpID
}