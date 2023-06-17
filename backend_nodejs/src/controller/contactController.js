const Contact = require('../models/contactModel');
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");


const createContact = asyncHandler(async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.json(newContact);
  } catch (error) {
    throw new Error(error);
  }

});

const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    throw new Error(error);
  }
});

const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const contact = await Contact.findById(id);
    res.json(contact);
  } catch (error) {
    throw new Error(error);
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const contact = await Contact.findByIdAndDelete(id);
    res.json(contact);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact
}