import { query } from './index';

const getAll = async () => query("SELECT * FROM chirps")

const getOne = async (id: number) => query(`SELECT * FROM chirps WHERE id = ?`, [id])

const deleteMention = async (id: number) => query(`DELETE FROM mentions WHERE chirpid = ?`, [id])
const deleteChirp = async (id: number) => query(`DELETE FROM chirps WHERE id = ?`, [id])

const updateChirp = async (id: number, content: string, location: string) => query(`UPDATE chirps SET content = ?, location = ? WHERE id = ?`, [content, location, id])

const createMention = async (chirpid: number, userid: number) => query(`INSERT INTO mentions VALUES (?, ?)`, [userid, chirpid])


export default {
    getAll,
    getOne,
    updateChirp,
    createMention,
    deleteMention,
    deleteChirp
}