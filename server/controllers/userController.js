import Users from "../models/Users.js";
import generateToken from "../utils/jwtUtils.js";

// get one user by id and proceed to next functional step
const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await Users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

// get all users users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.statusCode(500).json({ message: err.message });
  }
};

// get one user by id
const getUser = async (req, res) => {
  try {
    res.send(res.user);
  } catch (err) {
    res.statusCode(500).json({ message: err.message });
  }
};

// signup(create) user
const signUpUser = async (req, res) => {
  const { name, age, feet, inches, weight, email, password } = req.body;
  try {
    const user = await Users.signup(
      name,
      age,
      feet,
      inches,
      weight,
      email,
      password
    );

    // create a token
    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update user
const updateUser = async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  if (req.body.feet != null) {
    res.user.feet = req.body.feet;
  }
  if (req.body.inches != null) {
    res.user.inches = req.body.inches;
  }
  if (req.body.weight != null) {
    res.user.weight = req.body.weight;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: `Deleted user [${res.user.name} , ${res.user.id}]` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.login(email, password);

    // create a token
    const token = generateToken(user);
    const id = user._id;

    res.status(201).json({ token, id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { overheadPress, benchPress, chinups, barbellRows, squats } =
      user.workouts;
    res.json({ overheadPress, benchPress, chinups, barbellRows, squats });
  } catch (err) {
    res.statusCode(500).json({ message: "Error fetching workouts", err });
  }
};

const updateWorkouts = async (req, res) => {
  if (req.body.overheadPress != null) {
    res.user.workouts.overheadPress = req.body.overheadPress;
  }
  if (req.body.benchPress != null) {
    res.user.workouts.benchPress = req.body.benchPress;
  }
  if (req.body.chinups != null) {
    res.user.workouts.chinups = req.body.chinups;
  }
  if (req.body.barbellRows != null) {
    res.user.workouts.barbellRows = req.body.barbellRows;
  }
  if (req.body.squats != null) {
    res.user.workouts.squats = req.body.squats;
  }
  try {
    const updatedWorkouts = await res.user.save();
    res.json(updatedWorkouts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  getUserById,
  getAllUsers,
  getUser,
  signUpUser,
  updateUser,
  deleteUser,
  loginUser,
  getWorkouts,
  updateWorkouts,
};
