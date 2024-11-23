import { useState, useEffect, useRef } from 'react';
import "../index.css"

export default function WorkoutTracker() {
  const [time, setTime] = useState(0);
  const [benchRow, setBenchRow] = useState([5, 5, 5]);
  const [barbellRow, setBarbellRow] = useState([5, 5, 5]);
  const [squatRow, setSquatRow] = useState([5, 5, 5]);
  const [isRunning, setIsRunning] = useState(false);

  // Use useRef to store whether each button has been clicked at least once
  const clickedRef = useRef({
    bench: [false, false, false],
    barbell: [false, false, false],
    squat: [false, false, false],
  });

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  // Click handler that works for all exercise rows
  const handleClick = (exercise, index) => {
    // Check if it's the first click for the button
    if (!clickedRef.current[exercise][index]) {
      clickedRef.current[exercise][index] = true;
      setTime(0);
      setIsRunning(true);
      return; // Do nothing for the first click
    }

    // Update the row by decrementing the clicked value
    if (exercise === 'bench') {
      setBenchRow(prev => prev.map((val, i) => (i === index ? val - 1 : val)));
      setIsRunning(true);
    } else if (exercise === 'barbell') {
      setBarbellRow(prev => prev.map((val, i) => (i === index ? val - 1 : val)));
      setIsRunning(true);
    } else if (exercise === 'squat') {
      setSquatRow(prev => prev.map((val, i) => (i === index ? val - 1 : val)));
      setIsRunning(true);
    }
    setTime(0); // Reset time on button click
    setIsRunning(true); // Start the stopwatch
  };

  return (
    <div className='workout-body'>
      {/* Bench Press */}
      <div className='bench'>
        <div className='flex justify-between'>
          <h1>Bench Press</h1>
          <h2>3 x 5</h2>
        </div>
        <div className='w-full btn'>
          {benchRow.map((value, index) => (
            <button key={index} onClick={() => handleClick('bench', index)}>
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Barbell Row */}
      <div className='barbell-row'>
        <div className='flex justify-between'>
          <h1>Barbell Row</h1>
          <h2>3 x 5</h2>
        </div>
        <div className='w-full btn'>
          {barbellRow.map((value, index) => (
            <button key={index} onClick={() => handleClick('barbell', index)}>
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Squat */}
      <div className='squat'>
        <div className='flex justify-between'>
          <h1>Squat</h1>
          <h2>3 x 5</h2>
        </div>
        <div className='w-full btn'>
          {squatRow.map((value, index) => (
            <button key={index} onClick={() => handleClick('squat', index)}>
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
}
