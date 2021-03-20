import * as express from 'express';
import db from "../../db/index";

const router = express.Router();

router.get("/:chirpid", async (req, res) => {
    const chirpID = Number(req.params.chirpid);
    try {
        res.json((await db.chirpsDB.getOne(chirpID))[0]);
    } catch (error) {
        res.status(500).json({msg: "It broke! look in console for error."});
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(await db.chirpsDB.getAll());
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "It broke! look in console for error."});
    }
});

router.post('/', async (req, res, next) => {
    const newChirp = req.body
    try {
        res.json(newChirp);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "It broke! look in console for error."});
    }
});

router.put("/:chirpid", async (req, res) => {
    const chirpID = Number(req.params.chirpid);
    const editedChirp = req.body;
    try {
        res.send("You edited chirp #" + chirpID + "to" + editedChirp);
    } catch (error) {
        res.status(500).json({msg: "It broke! look in console for error."});
    }
})

router.delete("/:chirpid", async (req, res) => {
    const chirpID = Number(req.params.chirpid);
    try {
        res.json(db.chirpsDB.deleteOne(chirpID));
        res.sendStatus(200).json({"msg": "deleted " + chirpID})
    } catch (error) {
        res.status(500).json({msg: "It broke! look in console for error."});
    }
})

export default router;