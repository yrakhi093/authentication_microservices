

import bcrypt from 'bcrypt';
import User from '../schema/User.js';

export async function registerUser(username, email, password) {
  try {
    console.log("Checking if user already exists...");
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      console.log("User already exists");
      return;
    }

    console.log("Hashing the password...");
    const hash = await bcrypt.hash(password, 10);

    console.log("Creating new user object...");
    user = new User({
      username,
      email,
      password: hash,
    });

    console.log("Saving the user to the database...");
    await user.save();
    console.log("User registered successfully:", user);
  } catch (err) {
    console.error("Error in registerUser:", err.message);
  }
}

export async function loginUser( username, password) {
  try {

    if(!username || !password){
      console.log("Both username and password are required")
      return
    }
    console.log("Checking if user  exists then login can done");
    let user = await User.findOne({username});
    if(!user){
      console.log("user not found");
      return
    }

    console.log("comparing password...");

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
      console.log('Login successful:', user)
    }else{
      console.log("invalid password")
    }

  } catch (err) {
    console.error("Error in registerUser:", err.message);
  }
}
// module.exports = { registerUser };

