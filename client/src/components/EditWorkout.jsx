import "../index.css"
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";


export default function EditWorkout() {

    // const token = localStorage.getItem("token")
    // const id = localStorage.getItem("id")
    // const [user, setUser] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    // Extract current workout options from state passed by navigate
    const { topStartWeight, midStartWeight, bottomStartWeight } = location.state 

    const [topWeight, setTopWeight] = useState(topStartWeight)
    const [midWeight, setMidWeight] = useState(midStartWeight)
    const [bottomWeight, setBottomWeight] = useState(bottomStartWeight)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the updated values back to WorkoutTracker.jsx
        navigate('/', {
          state: { topStartWeight: topWeight,
            midStartWeight: midWeight,
            bottomStartWeight: bottomWeight }
        });
      };

    return (
        <div className="edit-workout-container">
          <h2>Edit Workout</h2>

          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="topWeight">Top weight:</label>
            <input id="topWeight" value={topWeight} min={45} max={1000} type="number" placeholder="New weight" 
            onChange={(e) => setTopWeight(e.target.value)}/>

            <label htmlFor="midWeight">Mid weight:</label>
            <input id="midWeight" value={midWeight} min={45} max={1000} type="number" placeholder="New weight" 
            onChange={(e) => setMidWeight(e.target.value)}/>

            <label htmlFor="bottomWeight">Squat weight:</label>
            <input id="bottomWeight" value={bottomWeight} min={45} max={1000} type="number" placeholder="New weight" 
            onChange={(e) => setBottomWeight(e.target.value)}/>
    
            <button type="submit">Submit</button>
          </form>

        </div>
      );
    
    
    
    // (
    //     <div className="edit-workout-container">
    //         <h2>Edit Workout</h2>
    //         <form onSubmit={handleSubmit} className="form">
    //             <label htmlFor='exercises'>Exercise:</label>
    //             <select name='exercises'>
    //                 <option value='Overhead Press'>Overhead Press</option>
    //                 <option value='Bench Press'>Bench Press</option>
    //             </select>
    //             <label>Exercise weight</label>
    //             <input type="number" min={45} max={1000} placeholder="Enter weight"/>
    //             <button onClick={handleSubmit}>Submit</button>
    //         </form>
    //     </div>
    // )
}