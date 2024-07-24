// Sure, here are the Mongoose schemas for Student Records, Staff, Course, Attendance, Resource Management, Dashboard, and Reporting. These schemas can be used to define the structure of documents stored in MongoDB.

// ### Student Schema

// ### Staff Schema

// *demo***

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Staff = require('./models/staffModel');
const Course = require('./models/courseModel');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/schoolcool', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Endpoint to create a new course
app.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to create a new staff member
app.post('/staff', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to assign a course to a staff member
app.post('/assign-course', async (req, res) => {
  try {
    const { staffId, courseId, period } = req.body;

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).send('Staff member not found');
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    staff.teachingAssignments.push({ course: courseId, period });
    await staff.save();

    course.instructor = staffId;
    await course.save();

    res.send({ staff, course });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/**
 * const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Staff = require('./models/staffModel');
const Course = require('./models/courseModel');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/schoolcool', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Endpoint to create a new course
app.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to create a new staff member
app.post('/staff', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to assign a course to a staff member
app.post('/assign-course', async (req, res) => {
  try {
    const { staffId, courseId, period } = req.body;

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).send('Staff member not found');
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    staff.teachingAssignments.push({ course: courseId, period });
    await staff.save();

    course.instructor = staffId;
    await course.save();

    res.send({ staff, course });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

 * 
 * 
*/

// Couse Scehma

// ### Attendance Schema

// ### Resource Schema

// ### Dashboard and Reporting Schema

// These schemas should cover the main aspects of your application. You can extend and customize them based on additional requirements and relationships between different entities in your application.
