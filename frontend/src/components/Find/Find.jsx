import { useContext, useState } from "react";
import "./Find.css";
import { StudentContext } from "../../context/StudentContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
     id: yup.string().required("id is Required"),
});

const Find = () => {
     const { getStudentById } = useContext(StudentContext);
     const [student, setStudent] = useState([
          {
               firstName: "John",
               lastName: "Doe",
               age: 20,
               qualification: "High School Diploma",
               statusOfGraduation: "Graduated",
          },
          {
               firstName: "Jane",
               lastName: "Smith",
               age: 22,
               qualification: "Associate's Degree",
               statusOfGraduation: "Graduated",
          },
          {
               firstName: "Alice",
               lastName: "Johnson",
               age: 19,
               qualification: "High School Diploma",
               statusOfGraduation: "Not Graduated",
          },
          {
               firstName: "Bob",
               lastName: "Brown",
               age: 21,
               qualification: "Bachelor's Degree",
               statusOfGraduation: "Graduated",
          },
          {
               firstName: "Charlie",
               lastName: "Davis",
               age: 23,
               qualification: "Bachelor's Degree",
               statusOfGraduation: "Not Graduated",
          },
     ]);
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
          alert(id);
          reset();
     };
     return (
          <div>
               <div className="form-container flex-col">
                    <h4>Search Student</h4>
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                         <div>
                              <label htmlFor="id">Enter Student Id:</label>
                              <input
                                   type="text"
                                   name="id"
                                   {...register("id")}
                              />
                         </div>

                         <div>
                              <button type="submit">Search</button>
                         </div>
                    </form>
                    <hr />
                    <div className="view-student">
                         {student &&
                              student.map((item, index) => {
                                   return (
                                        <div key={index}>
                                             <div>{item.firstName}</div>
                                        </div>
                                   );
                              })}
                    </div>
               </div>
          </div>
     );
};

export default Find;
