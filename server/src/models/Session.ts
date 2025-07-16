import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  hostId: { type: String, required: true },
  learnerId: { type: String, default: null },
  topic: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'booked', 'completed'], default: 'pending' },
  meetingLink: { type: String, default: '' },
}, { timestamps: true })

export const Session = mongoose.model('Session', sessionSchema)