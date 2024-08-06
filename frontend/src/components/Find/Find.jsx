import { useContext, useEffect, useState } from 'react';
import './Find.css';
import { StudentContext } from '../../context/StudentContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

// Validation schema
const schema = yup.object().shape({
  id: yup.string().max(24).required('ID is required'),
});

const Find = () => {
  const { getStudentById } = useContext(StudentContext);
  const [student, setStudent] = useState(null); // Changed to null to handle no data state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { id } = data;
    try {
      const response = await getStudentById(id);
      const studentData = response.data.data;
      setStudent(studentData);
      if (studentData) {
        toast.success(' Found Success');
      } else {
        toast.error('Not Found');
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
      setStudent(null); // Clear student state on error
      toast.error('No student with this ID');
    }
    reset();
  };

  useEffect(() => {
    console.log(student);
  }, [student]);

  return (
    <div className="flex-col">
      <div className="find-title">
        <h3>Find Student By ID</h3>
      </div>

      <div className="form-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="find-form"
        >
          <div className="flex-col id-input">
            <label htmlFor="id">Enter ID:</label>
            <input type="text" name="id" id="id" {...register('id')} />
            {errors.id && <p className="error">{errors.id.message}</p>}
          </div>

          <div className="">
            <button type="submit" className="btn">
              Find
            </button>
          </div>
        </form>
      </div>

      {/* Displaying student data */}
      <div className="student-views">
        {student ? (
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
                <strong>Enrollment Status:</strong> {student.enrollmentStatus}
              </p>
              <ul>
                {student.academicHistory &&
                student.academicHistory.length > 0 ? (
                  student.academicHistory.map((history, index) => (
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
                  ))
                ) : (
                  <p>No academic history available</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p>No student data available</p>
        )}
      </div>
    </div>
  );
};

export default Find;
