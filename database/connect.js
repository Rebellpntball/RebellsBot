const mongoose = require('mongoose');

async function connectDatabase(uri) {
  if (!uri) throw new Error('MONGO_URI is not set in .env');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('[RebellsBot] MongoDB connected');
  return mongoose.connection;
}

module.exports = { connectDatabase };
