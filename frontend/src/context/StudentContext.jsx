import axios from 'axios';
import { createContext } from 'react';

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const BASE_URL = 'http://localhost:3000/api/v1/';

  const getStudentById = async (id) => {
    let student = await axios.get(`${BASE_URL}student/${id}`);
    if (student) {
      return student;
    } else {
      return 'No Student Found ';
    }
  };

  let value = {
    getStudentById,
    BASE_URL,
  };

  return (
    <StudentContext.Provider value={value}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
