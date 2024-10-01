import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  projectDetails: String,
  quoteAmount: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
