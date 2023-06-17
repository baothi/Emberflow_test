const express = require('express');
const { createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact

} = require("../controller/contactController");

const router = express.Router();

router.post("/create", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;

