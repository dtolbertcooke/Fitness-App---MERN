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
    const { overheadPress, benchPress, chinups, barbellRows, squats, selectedWorkout } = location.state 

    const [overheadPressWeight, setOverheadPressWeight] = useState(overheadPress)
    const [benchPressWeight, setBenchPressWeight] = useState(benchPress)
    const [chinupsWeight, setChinupsWeight] = useState(chinups)
    const [barbellRowsWeight, setBarbellRowsWeight] = useState(barbellRows)
    const [squatsWeight, setSquatsWeight] = useState(squats)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the updated values back to WorkoutTracker.jsx
        navigate('/', {
          state: { overheadPress: overheadPressWeight,
            benchPress: benchPressWeight,
            chinups: chinupsWeight,
            barbellRows: barbellRowsWeight,
            squats: squatsWeight,
            selectedWorkout}
        });
      };

    return (
        <div className="edit-workout-container">
          <h2>Edit Workout</h2>

          {selectedWorkout == 'Workout A' && (
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="topWeight">Overhead Press weight:</label>
              <input id="overheadWeight" value={overheadPressWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setOverheadPressWeight(e.target.value)}/>

              <label htmlFor="midWeight">Chinups weight:</label>
              <input id="chinupsWeight" value={chinupsWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setChinupsWeight(e.target.value)}/>

              <label htmlFor="bottomWeight">Squat weight:</label>
              <input id="squatsWeight" value={squatsWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setSquatsWeight(e.target.value)}/>
      
              <button type="submit">Submit</button>
            </form>
          )}

          {selectedWorkout == 'Workout B' && (
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="topWeight">Bench Press weight:</label>
              <input id="benchPressWeight" value={benchPressWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setBenchPressWeight(e.target.value)}/>

              <label htmlFor="midWeight">Barbell Rows weight:</label>
              <input id="barbellRowsWeight" value={barbellRowsWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setBarbellRowsWeight(e.target.value)}/>

              <label htmlFor="bottomWeight">Squat weight:</label>
              <input id="squatsWeight" value={squatsWeight} min={45} max={1000} type="number" placeholder="New weight" 
              onChange={(e) => setSquatsWeight(e.target.value)}/>
      
              <button type="submit">Submit</button>
            </form>
          )}

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