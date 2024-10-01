import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  projectDetails: String,
  quoteAmount: Number,
  description: String,
  projectDuration: String,
  revisions: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
