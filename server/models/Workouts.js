import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    overheadPress: {
        type: Number,
        required: false,
    },
    benchPress: {
        type: Number,
        required: false,
    },
    chinups: {
        type: Number,
        required: false,
    },
    barbellRows: {
        type: Number,
        required: false,
    },
    squats: {
        type: Number,
        required: false,
    },
  });
  
  // Create the model based on the schema
  const Workouts = mongoose.model('Workouts', workoutSchema);
  
export default Workouts;