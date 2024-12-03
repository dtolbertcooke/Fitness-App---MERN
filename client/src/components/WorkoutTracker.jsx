import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css'

const WorkoutTracker = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access passed state

  // Get initial state or fallback to defaults if no state is passed
  const [selectedTopOption] = useState(location.state?.selectedTopOption || 'Overhead Press');
  const [selectedMidOption] = useState(location.state?.selectedMidOption || 'Chinups');
  const [topStartWeight] = useState(location.state?.topStartWeight || 45);
  const [midStartWeight] = useState(location.state?.midStartWeight || 45);
  const [bottomStartWeight] = useState(location.state?.bottomStartWeight || 45);

  // Initialize button values (all set to 5)
  const [buttonValues, setButtonValues] = useState(Array(9).fill(5));
  // Initialize button activation states (all set to false, meaning gray background)
  const [activated, setActivated] = useState(Array(9).fill(false));
  // init stopwatch running
  const [isRunning, setIsRunning] = useState(false);
  // init state of time
  const [time, setTime] = useState(0);

  // State to track the selected workout option from dropdown
  const [selectedWorkout, setSelectedWorkout] = useState('Workout A');

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
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
        topStartWeight,
        midStartWeight,
        bottomStartWeight,
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
                  3 x 5 {topStartWeight}lb
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
                  3 x 5 {midStartWeight}lb
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
                  3 x 5 {bottomStartWeight}lb
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
                  3 x 5 {topStartWeight}lb
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
                  3 x 5 {midStartWeight}lb
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
                  3 x 5 {bottomStartWeight}lb
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
