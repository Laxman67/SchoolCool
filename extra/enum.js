// The `enrollmentStatus` field in the`studentSchema` uses the `enum` validator to ensure that only specific string values can be assigned to it.This validator checks that the value of `enrollmentStatus` is one of the allowed options: `'Enrolled'` or`'Withdrawn'`.

//   Here's how you can use this field in different operations:

// ### Creating a New Student
// When creating a new student, you must specify the`enrollmentStatus` as either `'Enrolled'` or`'Withdrawn'`.If you try to set it to a value outside these options, Mongoose will throw a validation error.


const Student = require('./models/studentModel');

// Example of creating a new student
const newStudent = new Student({
  firstName: 'John',
  lastName: 'Doe',
  dob: '2005-01-01',
  gender: 'Male',
  email: 'john.doe@example.com',
  enrollmentStatus: 'Enrolled', // Must be 'Enrolled' or 'Withdrawn'
});

newStudent.save()
  .then(student => {
    console.log('Student created:', student);
  })
  .catch(error => {
    console.error('Error creating student:', error);
  });


// ### Updating a Student's Enrollment Status
// You can update a student's `enrollmentStatus` to `'Enrolled'` or `'Withdrawn'`. Again, any value outside these options will result in a validation error.


const Student = require('./models/studentModel');

const studentId = '60c72b2f9b1d8b8b8c8d1234'; // Replace with the actual student ID

Student.findByIdAndUpdate(
  studentId,
  { enrollmentStatus: 'Withdrawn' }, // Change to 'Enrolled' or 'Withdrawn'
  { new: true, runValidators: true } // Ensure validators run on update
)
  .then(student => {
    console.log('Updated student:', student);
  })
  .catch(error => {
    console.error('Error updating student:', error);
  });


// ### Querying Students by Enrollment Status
// You can query students based on their `enrollmentStatus` to filter results.


const Student = require('./models/studentModel');

// Find all enrolled students
Student.find({ enrollmentStatus: 'Enrolled' })
  .then(students => {
    console.log('Enrolled students:', students);
  })
  .catch(error => {
    console.error('Error finding students:', error);
  });


// ### Full Example: Student Model

// Here is the full `studentModel.js` for reference:


const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  enrollmentStatus: { type: String, enum: ['Enrolled', 'Withdrawn'], required: true },
  academicHistory: [
    {
      course: String,
      grade: String,
      year: Number,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);


// This schema ensures that any operation involving the `enrollmentStatus` field will only accept the specified enum values, maintaining data integrity within your application.