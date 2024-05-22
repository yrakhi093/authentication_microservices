

import inquirer from 'inquirer';
import express from 'express';
import dotenv from 'dotenv';
import { registerUser } from './lib/auth2.js';
import { loginUser } from './lib/auth2.js';
import mongoose from 'mongoose';

dotenv.config()
let url = process.env.MONGO_URL

const app = express()

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });



async function promptUser() {
  try {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ['Register', 'Login'],
        
      },
    ]);

    if(action.action === "Register"){
        const registerAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: "username",
                message: "Enter your username:",
                validate: function(value){
                    if(value.length){
                        return true
                    }else{
                        return "Please enter your username."
                    }
                },

            },
            {
                type:"input",
                name:"email",
                type:"Enter your email",
                validate: function(value){
                    const pass = value.match(
                        /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/
                    );

                    if (pass) {
                        return true
                    } else {
                        return "Please enter a valid email address."
                    }
                },
            },

            {
                type: "password",
                name: "password",
                message: "Enter your password:",
                mask: "*",
                validate:function(value){
                    if (value.length) {
                        return true
                    } else {
                        return "Please enter your password."
                    }

                }
            }
        ]);

        const {username, email, password  } = registerAnswers;

        await registerUser(username, email, password)
    }else if(action.action === "Login"){
        const loginAnswers = await inquirer.prompt([
            {
                type:"input",
                name:"username",
                message:"Enter your username:",
                validate:function(value){
                    if (value.length) {
                        return true;
                    } else {
                        return  "Please enter your username."
                    }
                },

            },
            {
                type: "password",
                name: "password",
                message: "Enter your password:",
                mask: "*",
                validate: function(value){
                    if (value.length) {
                        return true
                    } else {
                        return "Please enter your password."
                    }
                },
            },
        ])
        const{username, password} = loginAnswers;

        await loginUser(username, password)
    }
}catch(error){
    console.log('Error prompting user:', error.message)
}
      
}

promptUser();

