import { useContext, useState } from 'react';
import { StudentContext } from '../../context/StudentContext';
import './Add.css';
import assets from '../../assets/assets';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//  3
// Schema for Form Error Handling
const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(5, 'First name must be at least 5 characters')
    .max(10, 'First name must be at most 10 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(5, 'Last name must be at least 5 characters')
    .max(10, 'Last name must be at most 10 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  dob: yup.date().required('Date of Birth is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Pincode is required'),
  state: yup.string().required('State is required'),
  street: yup.string().required('Street is required'),
  course: yup.string().required('Course is required'),
  year: yup.number().required('Year is required').positive().integer(),
  enrollmentStatus: yup
    .string()
    .oneOf(['Completed', 'Withdrawn', 'Enrolled'], 'Invalid Parameter')
    .required('Status is required'),
  image: yup.mixed().required('Image is required'),
});

function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { BASE_URL } = useContext(StudentContext);
  const [imageSrc, setImageSrc] = useState(false);

  const onSubmit = async (data) => {
    const image = imageSrc.name;
    const {
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      street,
      postalCode,
      city,
      state,
      enrollmentStatus,
      course,
      year,
      grade,
    } = data;

    let newData = {
      firstName,
      image,
      lastName,
      dob,
      gender,
      email,
      phone,
      address: { street, city, state, postalCode },
      enrollmentStatus,
      academicHistory: {
        course,
        grade,
        year,
      },
    };

    // Make Request
    let response = await axios.post(`${BASE_URL}student/add`, newData);
    console.log(response);

    reset();
    setImageSrc(null);
  };

  return (
    <div className="form-container">
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        <div className="basic-details">
          <div className="image flex-col">
            <label htmlFor="image">
              <img
                src={
                  imageSrc ? URL.createObjectURL(imageSrc) : assets.ProfileImage
                }
                alt="Image"
              />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image')}
              hidden
              onChange={(e) => {
                setImageSrc(e.target.files[0]);
              }}
            />

            {errors.image && <p className="error">{errors.image.message}</p>}
          </div>
          <div className="name flex-col">
            <h4 className="input-title">Basic Details</h4>
            <div>
              <label htmlFor="firstName">First Name :</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                placeholder="First Name"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name :</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                placeholder="Last Name"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="dob-gender flex-col">
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                id="dob"
                required
                {...register('dob')}
              />
              {errors.dob && <p className="error">{errors.dob.message}</p>}
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                id="gender"
                required
                {...register('gender')}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="error">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="contact flex-col">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                {...register('email')}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                required
                {...register('phone')}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Address and Academic History */}
        <div className="address-details flex-col">
          {/* Address */}
          <div className="flex-col">
            <h4 className="input-title">Address Details</h4>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                name="street"
                id="street"
                required
                {...register('street')}
              />
              {errors.street && (
                <p className="error">{errors.street.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                {...register('city')}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>
            <div className="state">
              <label htmlFor="state">State:</label>
              <select name="state" id="state" {...register('state')}>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
              </select>
              {errors.state && <p className="error">{errors.state.message}</p>}
            </div>
            <div>
              <label htmlFor="postalCode">PinCode:</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                {...register('postalCode')}
              />
              {errors.postalCode && (
                <p className="error">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
          {/* Academic History */}
          <div className="flex-col">
            <h4 className="input-title">Academic History</h4>
            <div>
              <label htmlFor="course">Course:</label>
              <input
                type="text"
                name="course"
                required
                placeholder="Course"
                {...register('course')}
              />
              {errors.course && (
                <p className="error">{errors.course.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                name="grade"
                required
                placeholder="A+"
                {...register('grade')}
              />
              {errors.grade && <p className="error">{errors.grade.message}</p>}
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                name="year"
                required
                placeholder="Year of Completion"
                {...register('year')}
              />
              {errors.year && <p className="error">{errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="enrollmentStatus">Status:</label>
              <select
                name="enrollmentStatus"
                id="enrollmentStatus"
                required
                {...register('enrollmentStatus')}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.enrollmentStatus && (
                <p className="error">{errors.enrollmentStatus.message}</p>
              )}
            </div>
          </div>
          <div className="flex-col btn">
            {/* Submit */}
            <button type="submit">Add Student</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
