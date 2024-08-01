import { createContext, useState } from 'react';

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const [data, setdata] = useState({});
  const BASE_URL = 'http://localhost:3000/api/v1/';

  let value = {
    BASE_URL,
    data,
  };

  return (
    <StudentContext.Provider value={value}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
