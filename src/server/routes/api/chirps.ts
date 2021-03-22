import * as express from "express";
import db from "../../db/index";

const router = express.Router();

router.get("/:chirpid", async (req, res) => {
  const chirpID = Number(req.params.chirpid);
  try {
    res.json((await db.chirpsDB.getOne(chirpID))[0]);
  } catch (error) {
    res.status(500).json({ msg: "It broke! look in console for error." });
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await db.chirpsDB.getAll());
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "It broke! look in console for error." });
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  const newChirp: {
      userid: number;
      content: string;
      location: string;
      mentionedUserid?: number[];
  } = req.body;
  try {
    db.chirpsDB.createChirp(newChirp.userid, newChirp.content, newChirp.location)
    if (newChirp.mentionedUserid) {
        db.chirpsDB.getNewestChirpID().then(chirpIDJSON => {
            newChirp.mentionedUserid.forEach(mention => db.chirpsDB.createMention(Object.values(chirpIDJSON[0])[0], mention))
        })
        // Fetching the largest ID in table chirps, it comes back as an array with a JSON object.
        // Taking it out of the array as it's the first and only thing in it.
        // Using Object.values takes out all values and puts it in an array. There's only one so I pull it out.
        // This is the ID of the chirp that was just posted. 
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "It broke! look in console for error." });
    console.log(error);
  }
});

router.put("/:chirpid", async (req, res) => {
  const chirpID = Number(req.params.chirpid);
  const editedChirp: {
    mentionedUserid?: number[];
    content: string;
    location: string;
  } = req.body;
  try {
    db.chirpsDB.updateChirp(chirpID, editedChirp.content, editedChirp.location);
    if (editedChirp.mentionedUserid) {
      db.chirpsDB.deleteMention(chirpID);
      editedChirp.mentionedUserid.forEach((mention) => {
        db.chirpsDB.createMention(chirpID, mention);
      });
    } else {
      db.chirpsDB.deleteMention(chirpID);
    }
    // mentions come in as an array in userid
    // If there are any, delete all, then loop through and make a new mention for each, if there are none, delete all and finish.
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "It broke! look in console for error." });
    console.log(error);
  }
});

router.delete("/:chirpid", async (req, res) => {
  const chirpID = Number(req.params.chirpid);
  try {
    db.chirpsDB.deleteMention(chirpID);
    db.chirpsDB.deleteChirp(chirpID);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "It broke! look in console for error." });
    console.log(error);
  }
});

export default router;