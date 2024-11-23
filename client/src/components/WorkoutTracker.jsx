import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css'

const WorkoutTracker = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access passed state

  // Get initial state or fallback to defaults if no state is passed
  const [selectedTopOption] = useState(location.state?.selectedTopOption || 'Overhead Press');
  const [selectedMidOption] = useState(location.state?.selectedMidOption || 'Chinups');

  const [topStartWeight] = useState(location.state?.topStartWeight || 45)
  const [midStartWeight] = useState(location.state?.midStartWeight || 45)
  const [bottomStartWeight] = useState(location.state?.bottomStartWeight || 45)

  // Initialize button values (all set to 5)
  const [buttonValues, setButtonValues] = useState(Array(9).fill(5));
  // Initialize button activation states (all set to false, meaning gray background)
  const [activated, setActivated] = useState(Array(9).fill(false));
  // init stopwatch running
  const [isRunning, setIsRunning] = useState(false);
  // init state of time
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const handleButtonClick = (index) => {
    setTime(0);
    setIsRunning(true);
    setButtonValues((prevValues) => {
      const newValues = [...prevValues];
      
      if (newValues[index] === 0) {
        // If the value is 0, reset the value to 5 and activate the button
        newValues[index] = 5;
      } else if (activated[index]) {
        // If the button is already activated, decrement the value
        newValues[index] -= 1;
      }
      return newValues;
    });

    setActivated((prevActivated) => {
      const newActivated = [...prevActivated];
      
      // If it's the first click, activate the button (turn it red)
      if (!prevActivated[index] && buttonValues[index] > 0) {
        newActivated[index] = true;
      } else if (buttonValues[index] === 0) {
        // If the value reaches 0, deactivate (turn button gray)
        newActivated[index] = false;
      }
      return newActivated;
    });
  };

  // Function to apply the correct class based on button state
  const getButtonClass = (index) => {
    return activated[index] && buttonValues[index] > 0 ? 'active-btn' : 'inactive-btn';
  };

  // Navigate to EditWorkout with current options as state
  const editWorkout = () => {
    navigate('/edit', {
      state: {
        selectedTopOption,
        selectedMidOption,
        topStartWeight,
        midStartWeight,
        bottomStartWeight
      }
    });
  };

  return (
    <div className="workout-body">
      {/* Top Row */}
      <div className="bench">
        <div className="bench-header">
          <label className="bench-label">
            {selectedTopOption}
          </label>
          <label onClick={editWorkout}>
            3 x 5 {topStartWeight}lb
            <button style={{'color':'red'}} onClick={editWorkout}>{'>'}</button>
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
          <label className="bench-label">
            {selectedMidOption}
          </label>
          <label onClick={editWorkout}>
            3 x 5 {midStartWeight}lb
            <button style={{'color':'red'}} onClick={editWorkout}>{'>'}</button>
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
            3 x 5 {bottomStartWeight}lb
            <button style={{'color':'red'}} onClick={editWorkout}>{'>'}</button>
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
      <h1 className="flex justify-end pr-28">Stopwatch</h1>
      <p className="stopwatch-time pr-28">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default WorkoutTracker;
