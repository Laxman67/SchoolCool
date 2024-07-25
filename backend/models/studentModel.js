import { model, Schema } from 'mongoose';

// Student Scema
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image:{type:String,required:true},
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

const studentModel = model('Student', studentSchema);

export default studentModel;
