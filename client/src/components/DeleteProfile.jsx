import { useNavigate } from 'react-router-dom';
import "../index.css"

export default function DeleteProfile() {
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const navigate = useNavigate()

    // Handle the form submit
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload on form submit

        try {
            const response = await fetch(`http://localhost:5050/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response)
          navigate('/login'); 
          alert(`User ${id} has been deleted`)
          localStorage.removeItem('token', `${token}`)
          localStorage.removeItem('id', `${id}`)
        } catch (error) {
          console.error(error.errorMessage)
        }
    };

    return (
    <div className="form-container">
      <h2>Delete Profile?</h2>
      <form onSubmit={handleSubmit} className="form">
        <button type="submit" className="login-btn">
          Delete Profile
        </button>
      </form>
    </div>
    )
}