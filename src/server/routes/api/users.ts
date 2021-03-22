import * as express from "express";
import db from "../../db/index";

const router = express.Router();

router.get("/:name", async (req, res) => {
    try {
        res.json( (await db.usersDB.getUserID(req.params.name))[0].id );
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
})

router.post('/', (req, res) => {
    const newUser: {
        name: string;
        email: string;
        password: string;
    } = req.body;
    try {
        db.usersDB.createUser(newUser.name, newUser.email, newUser.password);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
})

export default router;