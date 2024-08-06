/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext } from 'react';

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const BASE_URL = 'http://localhost:3000/api/v1';

  const getStudentById = async (id) => {
    let student = await axios.get(`${BASE_URL}/student/${id}`);
    if (student) {
      return student;
    } else {
      return 'No Student Found ';
    }
  };

  const fetchAllStudents = async () => {
    let response = await axios.get(`${BASE_URL}/student`);
    return response;
  };

  // Delete Student by Email

  const deleteStudent = async (email) => {
    let response = await axios.delete(`${BASE_URL}/student`, {
      data: { email },
    });
    return response;
  };

  let value = {
    deleteStudent,
    getStudentById,
    BASE_URL,
    fetchAllStudents,
  };

  return (
    <StudentContext.Provider value={value}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
