import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css'

const WorkoutTracker = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access passed state

  // Get initial state or fallback to defaults if no state is passed
  const [overheadPress, setOverheadPress] = useState(location.state?.overheadPress || 45);
  const [benchPress, setBenchPress] = useState(location.state?.benchPress || 45);
  const [chinups, setChinups] = useState(location.state?.chinups || 45);
  const [barbellRows, setBarbellRows] = useState(location.state?.barbellRows || 45);
  const [squats, setSquats] = useState(location.state?.squats || 45);

  // Initialize button values (all set to 5)
  const [buttonValues, setButtonValues] = useState(Array(9).fill(5));
  // Initialize button activation states (all set to false, meaning gray background)
  const [activated, setActivated] = useState(Array(9).fill(false));
  // init stopwatch running
  const [isRunning, setIsRunning] = useState(false);
  // init state of time
  const [time, setTime] = useState(0);

  // State to track the selected workout option from dropdown
  const [selectedWorkout, setSelectedWorkout] = useState(location.state?.selectedWorkout || "Workout A");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5050/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const result = await response.json();
        console.log(result.workouts);
  
        // Set state with the fetched data
        if (result.workouts) {
          setOverheadPress(result.workouts.overheadPress || 45);
          setBenchPress(result.workouts.benchPress || 45);
          setChinups(result.workouts.chinups || 45);
          setBarbellRows(result.workouts.barbellRows || 45);
          setSquats(result.workouts.squats || 45);
          setSelectedWorkout(location.state?.selectedWorkout || "Workout A");
        }
      } catch (error) {
        console.error(error);
        // Navigate to login if fetch fails
        navigate('/login');
      }
    };
  
    if (token && id) {
      fetchUser();
    } else {
      navigate('/');
    }
  
    // Initialize workout state from location if available
    if (!token || !id) {
      if (location.state) {
        setOverheadPress(location.state.overheadPress || 45);
        setBenchPress(location.state.benchPress || 45);
        setChinups(location.state.chinups || 45);
        setBarbellRows(location.state.barbellRows || 45);
        setSquats(location.state.squats || 45);
        setSelectedWorkout(location.state.selectedWorkout || "Workout A");
      }
    }
  
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(interval);
  }, [location.state, isRunning, navigate, token, id]);
  

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const handleButtonClick = (index) => {
    setTime(0);
    setIsRunning(true);
    setButtonValues((prevValues) => {
      const newValues = [...prevValues];

      if (newValues[index] === 0) {
        newValues[index] = 5;
      } else if (activated[index]) {
        newValues[index] -= 1;
      }
      return newValues;
    });

    setActivated((prevActivated) => {
      const newActivated = [...prevActivated];
      if (!prevActivated[index] && buttonValues[index] > 0) {
        newActivated[index] = true;
      } else if (buttonValues[index] === 0) {
        newActivated[index] = false;
      }
      return newActivated;
    });
  };

  const getButtonClass = (index) => {
    return activated[index] && buttonValues[index] > 0 ? 'active-btn' : 'inactive-btn';
  };

  const editWorkout = () => {
    navigate('/edit', {
      state: {
        overheadPress,
        benchPress,
        chinups,
        barbellRows,
        squats,
        selectedWorkout
      },
    });
  };

  // Handle change for dropdown selection
  const handleWorkoutChange = (e) => {
    setSelectedWorkout(e.target.value);
  };

  return (
    <>
      {/* WORKOUT A/B DROPDOWN */}
      <div className="workout-dropdown flex justify-center pb-4">
        <select
          id="workout"
          className="border rounded p-2"
          value={selectedWorkout} // bind the selected value to state
          onChange={handleWorkoutChange} // handle change event
        >
          <option value="Workout A">Workout A</option>
          <option value="Workout B">Workout B</option>
        </select>
      </div>

      {/* Conditionally render workout based on selectedWorkout state */}
      {selectedWorkout === 'Workout A' && (
        <div className="workout-a">
          <div className="workout-body">
            {/* Top Row */}
            <div className="overhead">
              <div className="overhead-header">
                <label className="overhead-label">Overhead Press</label>
                <label onClick={editWorkout}>
                  3 x 5 {overheadPress}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(0, 3).map((value, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={getButtonClass(index)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* Mid Row */}
            <div className="chinups">
              <div className="chinups-header">
                <label className="chinups-label">Chinups</label>
                <label onClick={editWorkout}>
                  3 x 5 {chinups}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(3, 6).map((value, index) => (
                  <button
                    key={index + 3}
                    onClick={() => handleButtonClick(index + 3)}
                    className={getButtonClass(index + 3)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* Bottom Row */}
            <div className="squat">
              <div className="squat-header">
                <h2>Squat</h2>
                <label onClick={editWorkout}>
                  3 x 5 {squats}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(6, 9).map((value, index) => (
                  <button
                    key={index + 6}
                    onClick={() => handleButtonClick(index + 6)}
                    className={getButtonClass(index + 6)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* STOPWATCH */}
            <h1 className="flex justify-end pr-28">Stopwatch</h1>
            <p className="stopwatch-time pr-28">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      )}

      {selectedWorkout === 'Workout B' && (
        <div className="workout-b">
          <div className="workout-body">
            {/* Top Row */}
            <div className="bench">
              <div className="bench-header">
                <label className="bench-label">Bench Press</label>
                <label onClick={editWorkout}>
                  3 x 5 {benchPress}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(0, 3).map((value, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={getButtonClass(index)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* Mid Row */}
            <div className="barbell">
              <div className="barbell-header">
                <label className="barbell-label">Barbell Rows</label>
                <label onClick={editWorkout}>
                  3 x 5 {barbellRows}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(3, 6).map((value, index) => (
                  <button
                    key={index + 3}
                    onClick={() => handleButtonClick(index + 3)}
                    className={getButtonClass(index + 3)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* Bottom Row */}
            <div className="squat">
              <div className="squat-header">
                <h2>Squat</h2>
                <label onClick={editWorkout}>
                  3 x 5 {squats}lb
                  <button style={{ color: 'red' }} onClick={editWorkout}>
                    {'>'}
                  </button>
                </label>
              </div>
              <div className="btn">
                {buttonValues.slice(6, 9).map((value, index) => (
                  <button
                    key={index + 6}
                    onClick={() => handleButtonClick(index + 6)}
                    className={getButtonClass(index + 6)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            {/* STOPWATCH */}
            <h1 className="flex justify-end pr-28">Stopwatch</h1>
            <p className="stopwatch-time pr-28">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutTracker;
