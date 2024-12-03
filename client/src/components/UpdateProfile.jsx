import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css"

export default function UpdateProfile() {
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      age: '',
      feet: '',
      inches: '',
      weight: '',
      email: '',
      password: ''
    });

    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData({
        ...formData,
        [id]: value
      });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload on form submit

        // Construct the body to update only the fields that have been modified
        const dataToUpdate = {};
        for (let key in formData) {
          if (formData[key]) {
            dataToUpdate[key] = formData[key];
          }
        }

        try {
          const response = await fetch(`http://localhost:5050/users/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate)  // Send only updated fields
          });

          if (!response.ok) {
            throw new Error("Failed to update profile");
          }

          const result = await response.json();
          console.log(result);

        } catch (error) {
          console.error("Error updating profile:", error);
        } finally {
          // Clear the form and navigate back to the profile page
          setFormData({
            name: '',
            age: '',
            feet: '',
            inches: '',
            weight: '',
            email: '',
            password: ''
          });
          navigate('/profile');
        }
    };

    return (
    <div className="form-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          
          {/* NAME */}
            <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="New first name"
            />

          {/* AGE */}
            <label htmlFor="age">Age</label>
            <input
            type="number"
            min="13"
            max="100"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="How old are you?"
            />

          {/* HEIGHT */}
            <label htmlFor="height">Height</label>
            <span className="height-span">
              <input
              type="number"
              min="3"
              max="8"
              id="feet"
              value={formData.feet}
              onChange={handleInputChange}
              placeholder="feet"
              />
              <input
              type="number"
              min="0"
              max="11"
              id="inches"
              value={formData.inches}
              onChange={handleInputChange}
              placeholder="inches"
              />
            </span>

          {/* WEIGHT */}
            <label htmlFor="weight">Weight</label>
            <input
            type="number"
            min="75"
            max="800"
            id="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="New weight"
            />

          {/* EMAIL */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="New email"
          />

          {/* PASSWORD */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="New password"
          />

        </div>

        <button type="submit" className="login-btn">
          Update
        </button>
      </form>
    </div>
    );
}
