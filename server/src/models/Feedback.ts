import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true })

export const Feedback = mongoose.model('Feedback', feedbackSchema)
