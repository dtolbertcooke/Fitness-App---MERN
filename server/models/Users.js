import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    feet: {
      type: Number,
      required: false,
    },
    inches: {
      type: Number,
      required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    email: {
      type: String,
      required: true,
      email: true, // ensure it's an email? verify this
      unique: true, // ensure the email is unique
    },
    password: {
        type: String,
        password: true,
        required: true,
    },
  });

  // static signup method
  userSchema.statics.signup = async function (name, age, feet, inches, weight, email, password) {
    
    // validation
    if (!name || !email || !password) {
      throw Error('Name, email and password are required')
    }
    if (!validator.isEmail(email)) {
      throw Error('Invalid email address')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not unique enough')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('User already exists in DB')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({ name, age, feet, inches, weight, email, password: hash })
    return user
  }

  // static login method
  userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
      throw Error('All fields required')
    }

    const existingUser = await this.findOne({ email })
    if (!existingUser) {
      throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, existingUser.password)
    if (!match) {
      throw Error('Password incorrect')
    }

    return existingUser
  }
  
  // Create the model based on the schema
  const Users = mongoose.model('Users', userSchema);
  
export default Users;