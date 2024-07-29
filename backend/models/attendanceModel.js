import { model, Schema } from 'mongoose';

const attendanceSchema = new Schema({
  records: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Excused'],
        required: true,
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    enum: ['Teacher'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const attendanceModel = model('Attendance', attendanceSchema);

export default attendanceModel;
