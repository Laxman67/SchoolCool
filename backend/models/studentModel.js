import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

// Student Scema
const studentSchema = new Schema({
  studentId: { type: Number, unique: true, default: 1 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String, required: false },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  email: { type: String, required: true, unique: true },
  phone: String,
  enrollmentStatus: {
    type: String,
    enum: ['Enrolled', 'Withdrawn', 'Completed'],
    required: true,
  },
  academicHistory: [
    {
      course: String,
      grade: String,
      year: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
studentSchema.plugin(AutoIncrement, { inc_field: 'studentId' });

const studentModel = model('Student', studentSchema);

export default studentModel;
