# Notes

A simple notes web app built with React.  
This project demonstrates basic **CRUD operations** (Create, Read, Update, Delete) and **login/signup operations** with a UI.

## Features
- Create notes
- Edit existing notes
- Delete note
- View notes

## Tech Stack
- **Frontend:** React
- **Styling:** CSS
- **Backend:** Nest.js, MySQL, XAMPP

## Prerequisites
- **Node.js**
- **Nest.js**
- **React**
- **MySQL Server** (or XAMPP)
- **Git** (for cloning the repository)
- **Postman** (optional, for testing APIs)

## Installation

Clone the repository:
```bash
git clone https://github.com/slricta/act2-notes
```

## Install backend dependencies
```
cd notes-backend
npm install
```

## Install frontend dependencies
```
cd ../notes-frontend
npm install
```

## Environment setup
This project requires a .env file in order to run.
Copy the example env file
```
cp .env.example .env
```

## Database Setup

This project uses **MySQL** as the database.  
Make sure MySQL is installed and running (you can use **phpMyAdmin** to manage it).

### Create a Database
In phpMyAdmin, create a new database: **notes_db**

## Run the backend
```
cd notes-backend
npm run start:dev
```

## Run the frontend
```
cd ../notes-frontend
npm start
```






