import * as express from "express";
import db from "../../db/index";

const router = express.Router();

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