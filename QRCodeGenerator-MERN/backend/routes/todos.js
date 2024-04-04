const express = require('express');
const { TodoSchema } = require('../models/Todo');
const { QRCodeSchema } = require('../models/QRCode');
const router = express.Router();
const { generateQRCode, saveQRCodeToDB, updateQRCodeInDB, deleteQRCodeFromDB } = require('../utils/qrCodeUtils');

// GET all todos with QR code images
router.get('/', async (req, res) => {
  try {
    const todos = await TodoSchema.find().populate('qrCode');
    const todosWithQRImages = todos.map(todo => ({
      _id: todo._id,
      title: todo.title,
      completed: todo.completed,
      qrCodeImage: todo.qrCode ? todo.qrCode.qrCodeImage : null
    }));
    res.json(todosWithQRImages);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// Post a new TodoSchema
router.post('/', async (req, res) => {
  const { title, completed } = req.body;
  try {
    // Convert todo data to string to use as QR code data
    const qrCodeData = JSON.stringify({ title, completed });

    // Generate QR Code
    const qrCodeBuffer = await generateQRCode(qrCodeData);

    // Save QR Code in QRCode schema
    const qrCodeId = await saveQRCodeToDB(qrCodeBuffer);

    // Create new TodoSchema with QR Code reference
    const todo = new TodoSchema({ title, completed, qrCode: qrCodeId });
    await todo.save();

    // Sending the QR code image along with the todo in the response
    const todoWithQRImage = {
      _id: todo._id,
      title: todo.title,
      completed: todo.completed,
      qrCodeImage: qrCodeBuffer // Sending QR code image
    };
    res.status(201).json(todoWithQRImage); // HTTP 201 Created
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
});

// PUT update a todo by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed, qrCode } = req.body;

  try {
    let updatedTodo;

    // Check if qrCode is provided in the request body
    if (qrCode) {
      // Generate a new QR code
      const qrCodeData = JSON.stringify({ title, completed });
      const qrCodeBuffer = await generateQRCode(qrCodeData);

      // Save the new QR code in QRCode schema
      const newQRCodeId = await saveQRCodeToDB(qrCodeBuffer);

      // Find the existing QR code associated with the Todo item
      const existingQRCodeId = (await TodoSchema.findById(id)).qrCode;

      // If there's an existing QR code associated with the Todo item, delete it
      if (existingQRCodeId) {
        await deleteQRCodeFromDB(existingQRCodeId);
      }

      // Update the Todo item with the new QR code ID
      updatedTodo = await TodoSchema.findByIdAndUpdate(id, { title, completed, qrCode: newQRCodeId }, { new: true });

      // Include the updated QR code image in the response
      updatedTodo.qrCodeImage = qrCodeBuffer;
    } else {
      // If qrCode is not provided, only update the title and completed fields
      updatedTodo = await TodoSchema.findByIdAndUpdate(id, { title, completed }, { new: true });

      // Regenerate QR code if title is modified
      const qrCodeData = JSON.stringify({ title: updatedTodo.title, completed });
      const qrCodeBuffer = await generateQRCode(qrCodeData);

      // Update the QR code associated with the Todo item
      await updateQRCodeInDB(updatedTodo.qrCode, qrCodeBuffer);

      // Include the updated QR code image in the response
      updatedTodo.qrCodeImage = qrCodeBuffer;
    }

    // Check if the Todo item exists
    if (!updatedTodo) {
      return res.status(404).json({ message: 'TodoSchema not found' }); // HTTP 404 Not Found
    }

    // Construct the response object with QR code image included
    const response = {
      _id: updatedTodo._id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
      qrCodeImage: updatedTodo.qrCodeImage
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoSchema.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'TodoSchema not found' });
    }
    
    // Delete the associated QR code if it exists
    if (todo.qrCode) {
      await deleteQRCodeFromDB(todo.qrCode);
    }

    // Delete the todo item
    const deletedTodo = await TodoSchema.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'TodoSchema not found' });
    }
    res.json({ message: 'TodoSchema deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

module.exports = router;
