import { model, Schema } from 'mongoose';

const staffSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
  employmentStatus: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
  },
  role: {
    type: String,
    enum: ['Administrator', 'Teacher', 'Support Staff'],
    required: true,
  },
  teachingAssignments: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      period: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const staffModel = model('Staff', staffSchema);

export default staffModel;
