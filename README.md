# Tutor Project

UTDesign Project - An online tutoring scheduler application.

## Local development

**Prerequisites**: Install NodeJS on your computer if you don't already have it. [Download it here](https://nodejs.org/en/). The LTS version will be sufficient. NPM will be automatically installed.

Note: Technically, there are two npm projects in this repository. When both are running they can interact with each other and exchange data. On your local machine, the frontend application will run on `localhost:3000` and the backend server will run on `localhost:5000`

### Running the backend server

1. Clone the project if you haven't already by running `git clone https://github.com/zsim314/Tutor_Project`
2. Enter into the directory by running `cd Tutor_Project`
3. Run `npm install`
4. Make sure `nodemon` is installed by running `npm install -g nodemon`.
5. Run `npm test`. If you don't get any errors, then the backend is running.
6. Navigate to `localhost:5000` in your favorite web browser.

### Running the frontend application

1. Clone the project if you haven't already by running `git clone https://github.com/zsim314/Tutor_Project`
2. Enter into the directory by running `cd Tutor_Project`
3. Enter into the frontend project by running `cd frontend`
4. Run `npm install`
5. Run `npm start`
6. Run `npm start`. If you don't get any errors, then the frontend is running.
7. Navigate to `localhost:3000` in your favorite web browser.

## Building the project for production

1. Open a command line in the server project (`path/to/Tutor_Project/`)
2. Run `npm run www`. This script deletes the `www/` folder, builds the frontend project, then copies the built project files into `www/`
