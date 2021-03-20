import { query } from './index';

const getAll = async () => query("SELECT * FROM chirps")

const getOne = async (id: number) => query(`SELECT * FROM chirps WHERE id = ?`, [id])

const deleteOne = async (id: number) => query(`DELETE FROM chirps WHERE id = ?`, [id])

const updateOne = async (id: number, userid: number, content: string, location: string) => query(`UPDATE chirps SET userid = ?, content = ?, lcocation = ? WHERE id = ?`, [id, userid, content, location])

export default {
    getAll,
    getOne,
    deleteOne,
    updateOne
}