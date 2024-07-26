import { model, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);


const courseSchema = new Schema({
  courseId: { type: Number, unique: true, default: 101 },
  courseName: { type: String, required: true },
  courseBanner: { type: String, required: true },
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
    type: Types.ObjectId,
    ref: 'Staff',
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

courseSchema.plugin(AutoIncrement, { inc_field: 'courseId' });

const courseModel = model('Course', courseSchema);

export default courseModel;
