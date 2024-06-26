const mongoose = require('mongoose');

// Define QRCode Schema
const qrCodeSchema = new mongoose.Schema({
  // Autogenerated ID will be added by default
  qrCodeImage: Buffer
});

const QRCodeSchema = mongoose.model('QRCode', qrCodeSchema);

module.exports = { QRCodeSchema };