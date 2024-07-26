import mongoose from 'mongoose';
import { Schema, Types, model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const staffSchema = new Schema({
  tempStaffId: { type: Number, unique: true, default: 1 }, // Temporary numeric field for auto-increment
  staffId: { type: String, unique: true },
  firstName: { type: String, required: true },
  image: { type: String, required: true },
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

// Apply the auto-increment plugin to the tempStaffId field
staffSchema.plugin(AutoIncrement, { inc_field: 'tempStaffId' });

// Pre-save middleware to format the staffId
staffSchema.pre('save', function (next) {
  if (this.isNew) {
    this.staffId = `SID_${String(this.tempStaffId).padStart(3, '0')}`;
  }
  next();
});

const staffModel = model('Staff', staffSchema);

export default staffModel;
