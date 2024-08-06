import { useState, useContext, useEffect } from 'react';
import { StudentContext } from '../../context/StudentContext';
import axios from 'axios';
import './Delete.css';
import { FcDeleteDatabase } from 'react-icons/fc';
import { toast } from 'react-toastify';
function Delete() {
  const [students, setStudents] = useState(false);
  const [message, setMessage] = useState('');
  const { fetchAllStudents, deleteStudent, BASE_URL } =
    useContext(StudentContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllStudents();
      setStudents(response.data.result);
    }
    fetchData();
  }, [message]);

  const handleDelete = async (email) => {
    console.log(email);
    let response = await deleteStudent(email);
    setMessage(response.data.message);
    toast.success(message);
  };
  return (
    <div className="delete-student-container flex-col">
      <h3>Delete Student </h3>

      <table>
        <thead>
          <th>Photo</th>
          <th>Name</th>
          <th>Email</th>
          <th>DoB</th>
          <th>Delete</th>
        </thead>
        {students ? (
          students.map((student, index) => {
            return (
              <>
                <tbody key={index} className="student-delete-item">
                  <tr>
                    <td>
                      <img
                        className=""
                        src={`${'http://localhost:3000/images/'}${
                          student.image
                        }`}
                        alt=""
                      />
                    </td>
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                    <td>{student.email}</td>
                    <td>{new Date(student.dob).toLocaleDateString()}</td>
                    <td
                      className="delete-btn"
                      onClick={() => {
                        // deleteStudent(student.email);
                        handleDelete(student.email);
                      }}
                    >
                      <FcDeleteDatabase />
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td>No Data Available</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Delete;
