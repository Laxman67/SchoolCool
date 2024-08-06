import { useState, useContext, useEffect } from 'react';
import { StudentContext } from '../../context/StudentContext';
import './AllStudent.css';
function AllStudent() {
  const [students, setStudents] = useState(false);
  const { fetchAllStudents } = useContext(StudentContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllStudents();
      setStudents(response.data.result);
    }
    fetchData();
  }, []);

  return (
    <div className="student-container">
      <h4>All Students</h4>
      <div className="student-container">
        {students &&
          students.map((student) => {
            return (
              <div className="students" key={student._id}>
                <div className="student-card">
                  {/* Basic Details */}
                  <div className="basic-details">
                    <img
                      src={`${'http://localhost:3000/images/'}${student.image}`}
                      alt={`${student.firstName} ${student.lastName}`}
                    />
                    <h4>
                      {student.firstName} {student.lastName}
                    </h4>

                    <p>
                      <strong>Gender:</strong> {student.gender}
                    </p>
                    <p>
                      <strong>DOB:</strong>{' '}
                      {new Date(student.dob).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Contact and Address */}
                  <div className="contact-address">
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {student.phone}
                    </p>
                    <p>
                      <strong>Address:</strong>
                      {`${student.address.street} ${student.address.city}, ${student.address.state}, ${student.address.postalCode}`}
                    </p>
                  </div>

                  {/* Academic History */}
                  <div className="academic-details">
                    <h3>Academic History:</h3>
                    <p>
                      <strong>Enrollment Status:</strong>{' '}
                      {student.enrollmentStatus}
                    </p>
                    <ul>
                      {student.academicHistory.map((history, index) => (
                        <li key={index}>
                          <p>
                            <strong>Course:</strong> {history.course}
                          </p>
                          <p>
                            <strong>Grade:</strong> {history.grade}
                          </p>
                          <p>
                            <strong>Year:</strong> {history.year}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllStudent;
