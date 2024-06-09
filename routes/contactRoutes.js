import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all contacts for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const contacts = await Contact.find({ userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new contact for a user
router.post('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const contactData = { ...req.body, userId };
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update a contact
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
