import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dummy-user-avatar/image/upload/v1710000000/default_avatar.png',
    },

    skillsToTeach: {
      type: [String],
      default: [],
    },

    skillsToLearn: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    sessionHistory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Session',
      default: [],
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)

