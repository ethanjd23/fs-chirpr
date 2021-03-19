import * as express from 'express';

const router = express.Router();

router.get("/:chirpid", async (req, res) => {
    const chirpID = Number(req.params.chirpid);
    try {
        res.send("You looking for chirp #" + chirpID);
    } catch (error) {
        res.status(500).json({msg: "It broke! look in console for error."});
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.send("got all chirps");
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
        res.send("You deleted chirp #" + chirpID);
    } catch (error) {
        res.status(500).json({msg: "It broke! look in console for error."});
    }
})

export default router;