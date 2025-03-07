Office Login Management System

Overview

The Office Login Management System is a React-based application that allows administrators to manage office login credentials. The system supports adding, editing, searching, and deleting login credentials using REST API calls (GET, POST, PUT, DELETE). The UI is built with Material-UI for a modern and user-friendly experience.

Features

Fetch office login details from an API.

Add new login credentials.

Edit existing office login details.

Delete login records.

Search functionality to filter logins.

Smooth scrolling to the form section when editing an entry.

Secure handling of passwords (masked by default).

Uses separate CSS for styling.

Technologies Used

React (Functional Components, Hooks)

TypeScript

Material-UI for UI components

Fetch API for handling API calls

CSS for styling

Installation

Clone the repository:

git clone https://github.com/ramapanakala/CRUD_OPERATION
Demo video : https://drive.google.com/file/d/1a86-LTchEx9NbSlpWtxeXj4sz05FHQYz/view?usp=sharing

Navigate to the project folder:

cd CRUD_OPERATION

Install dependencies:

npm install

npm list react-scripts

npm install react-scripts --save

npm install @mui/icons-material

Running the Application

To start the development server, run:

npm start

This will launch the application in the browser at http://localhost:3000/.

API Endpoints

The application interacts with a mock API using JSONPlaceholder for demonstration purposes.

GET /users – Fetch all office login records.

POST /users – Add a new login entry.

PUT /users/:id – Update an existing login entry.

DELETE /users/:id – Remove a login entry.

Usage

Adding an Entry: Fill in the form and click Add.

Editing an Entry: Click the Edit button in the table, modify the details, and click Update.

Deleting an Entry: Click the Delete button.

Searching: Use the search bar to find specific login details.
