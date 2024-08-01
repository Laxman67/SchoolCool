import { useContext, useState } from 'react';
import { StudentContext } from '../../context/StudentContext';
import './Add.css';
import assets from '../../assets/assets';
import axios from 'axios';

function Add() {
  const { BASE_URL } = useContext(StudentContext);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    firstName: '',
    lastName: '',
    image: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    enrollmentStatus: '',
    academicHistory: {
      course: '',
      grade: '',
      year: '',
    },
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // Handle nested address and academic history updates
    if (name in data.address) {
      setData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else if (name in data.academicHistory) {
      setData((prevData) => ({
        ...prevData,
        academicHistory: {
          ...prevData.academicHistory,
          [name]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('image', image);
    formData.append('address', JSON.stringify(data.address));
    formData.append('academicHistory', JSON.stringify(data.academicHistory));
    formData.append('enrollmentStatus', data.enrollmentStatus);

    console.log('Submitting form data:', formData);

    const response = await axios.post(`${BASE_URL}student/add`, formData);

    if (response.data.success) {
      setImage(false);
      console.log(formData);
    } else {
      alert('Error');
    }
  };

  return (
    <div className="form-container">
      <h3>Add Student</h3>
      <form onSubmit={onSubmitHandler}>
        {/* Basic Information */}
        <div className="basic-details">
          <div className="image flex-col">
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.ProfileImage}
              />
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              name="image"
              id="image"
              hidden
            />
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
                onChange={onChangeHandler}
                value={data.firstName}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name :</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                placeholder="Last Name"
                onChange={onChangeHandler}
                value={data.lastName}
              />
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
                onChange={onChangeHandler}
                value={data.dob}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                id="gender"
                required
                onChange={onChangeHandler}
                value={data.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                required
                onChange={onChangeHandler}
                value={data.phone}
              />
            </div>
          </div>
        </div>

        {/* Address and Academic History */}
        <div className="address-details">
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
                onChange={onChangeHandler}
                value={data.address.street}
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                onChange={onChangeHandler}
                value={data.address.city}
              />
            </div>
            <div className="state">
              <label htmlFor="state">State:</label>
              <select
                name="state"
                id="state"
                onChange={onChangeHandler}
                value={data.address.state}
              >
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div>
              <label htmlFor="postalCode">PinCode:</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                onChange={onChangeHandler}
                value={data.address.postalCode}
              />
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
                onChange={onChangeHandler}
                value={data.academicHistory.course}
              />
            </div>
            <div>
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                name="grade"
                required
                placeholder="A+"
                onChange={onChangeHandler}
                value={data.academicHistory.grade}
              />
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                name="year"
                required
                placeholder="Year of Completion"
                onChange={onChangeHandler}
                value={data.academicHistory.year}
              />
            </div>
            <div>
              <label htmlFor="enrollmentStatus">Status:</label>
              <select
                name="enrollmentStatus"
                id="enrollmentStatus"
                required
                onChange={onChangeHandler}
                value={data.enrollmentStatus}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex-col">
            {/* Submit */}
            <button type="submit">Add Student</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
