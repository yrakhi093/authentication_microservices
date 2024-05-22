const  { Command } = require("commander");
const { registerUser, loginUser } = require("./lib/auth");
const { one} = require("./javasc");
const { test} = require("./test");

// const users = require('./data/users'); // Import the users array


const program = new Command();


program
  .version('1.0.0')
  .description('Authentication Microservice CLI');

program
  .command("register <username> <email> <password>")
  .description("Register a new user")
  .action((username, email, password) => {
    registerUser(username, email, password);
  });

program
  .command("javasc <name> <class> ")
  .description("javasc  new user")
  .action((name, email) => {
    one(name, email);
  });



//   consoleuser()

  program
  .command('login <username> <password>')
  .description('Login with username and password')
  .action((username, password) => {
    loginUser(username, password);
  });

  program
  .command("checking <name> <education>")
  .description("checking the feature")
  .action((name, education) => {
    test(name, education);
  });

  program.parse(process.argv);

 

//   console.log("second console" , users)