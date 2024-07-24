import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  description: String,
  classTimings: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        required: true,
      },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  roomAssignments: [
    {
      room: String,
      building: String,
    },
  ],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const courseModel = model('Course', courseSchema);

export default courseModel;
