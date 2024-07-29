let re = {
  report: [
    { studentId: 1, present: true },
    { studentId: 2, present: true },
    { studentId: 3, present: false },
  ],

  createdBy: 'anbamhkd9876876W',
  data: new Date().toLocaleDateString(),
};

console.log(re);
console.log('========');

let student3 = re.report.filter((student) => student.studentId == 3);

console.log(student3[0].present);
// Attendance
// Created by
// Date of Creation
// student
