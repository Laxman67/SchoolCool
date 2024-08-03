import { useContext, useState } from 'react';
import './Find.css';
import '../Add/Add.css';
import { StudentContext } from '../../context/StudentContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.string().required('id is Required'),
});

const Find = () => {
  const { getStudentById } = useContext(StudentContext);
  const [student, setStudent] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { id } = data;
  };
  return (
    <div>
      <div className="form-container flex-col">
        <h4>Search Student</h4>
        <form onSubmit={onSubmit} method="post">
          <div>
            <label htmlFor="id">Enter Student Id:</label>
            <input type="text" id="id" name="id" />
          </div>
          <div className="submit-btn">
            <button type="submit">Search</button>
          </div>
        </form>
        <hr />
        <div className="view-student">
          {student &&
            student.map((item, index) => {
              return (
                <div key={index}>
                  <p>Student</p>
                  <p>{item.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Find;
