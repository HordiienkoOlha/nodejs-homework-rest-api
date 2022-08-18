const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
  // try {

  // } catch (error) {
  //       next(error);
  // }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  // try {
  // } catch (error) {
  //   next(error);
  // }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  // try {
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;
