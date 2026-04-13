const express = require('express');
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router.get('/entries', entriesController.getEntries);
router.post('/entries', entriesController.createEntry);
router.delete('/entries', entriesController.deleteEntry)
router.put('/entries', entriesController.updateEntry);


module.exports = router;