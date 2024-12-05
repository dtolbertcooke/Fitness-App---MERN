import express from "express";
import cors from "cors"

// cotroller functions
import userController from "../controllers/userController.js";

// authentication middleware
import authToken from "../utils/authMiddleware.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and 
// will take control of requests starting with path /record.
const router = express.Router();

router.use(cors());

// get(READ) all users
router.get('/', authToken, userController.getAllUsers) // replace authToken with admin authorization

// GET ALL workouts for ONE user by id
router.get('/:id/workouts',authToken, userController.getWorkouts)

// CREATE(signup) user 
router.post('/signup', userController.signUpUser)

// login user
router.post('/login', userController.loginUser)

router.route("/:id")
// GET ONE user by id
.get(authToken, userController.getUserById, userController.getUser)
// UPDATE ONE user by id
.patch(authToken, userController.getUserById, userController.updateUser)
// DELETE ONE user by
.delete(authToken, userController.getUserById, userController.deleteUser)


router.route("/:id/workouts")
// GET ALL workouts for ONE user by id
.get(authToken, userController.getWorkouts)
// UPDATE ALL workouts for ONE user by id
.patch(authToken, userController.getUserById, userController.updateWorkouts)

export default router;