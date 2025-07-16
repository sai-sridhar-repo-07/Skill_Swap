import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    skillsToTeach: [String],
    skillsToLearn: [String],
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
