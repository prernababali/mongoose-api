🏋️‍♀️ Exercise Tracker API (MongoDB + Mongoose)

This is a RESTful API built using Node.js, Express, MongoDB, and Mongoose that allows users to log exercises and retrieve workout history. It was developed as part of the freeCodeCamp Back End Development and APIs Certification.


📦 Features

---> Create new users

---> Add exercises for a user

---> View all users

---> Get exercise logs with optional filters: from, to, and limit

📁 API Endpoints

1] Create a New User
Method: POST
Endpoint: /api/users
Body: username=prerana
Response:
{
"username": "prerana",
"_id": "662dd1cf135a4f6c60e4b332"
}


2] Get All Users
Method: GET
Endpoint: /api/users
Response:
[
{
"username": "prerana",
"_id": "662dd1cf135a4f6c60e4b332"
}
]


3] Add an Exercise
Method: POST
Endpoint: /api/users/:_id/exercises
Body:
description=Running
duration=30
date=2025-07-03 (optional)
Response:
{
"_id": "662dd1cf135a4f6c60e4b332",
"username": "prerana",
"description": "Running",
"duration": 30,
"date": "Thu Jul 03 2025"
}


4] Get User’s Exercise Log
Method: GET
Endpoint: /api/users/:_id/logs
Optional Query Parameters: from, to, limit
Example: /api/users/662dd1cf135a4f6c60e4b332/logs?from=2025-01-01&to=2025-12-31&limit=2
Response:
{
"_id": "662dd1cf135a4f6c60e4b332",
"username": "prerana",
"count": 2,
"log": [
{
"description": "Running",
"duration": 30,
"date": "Thu Jul 03 2025"
},
{
"description": "Yoga",
"duration": 45,
"date": "Fri Jul 04 2025"
}
]
}


⚙️ Tech Stack

* Node.js

* Express.js

* MongoDB

* Mongoose


📌 How to Run Locally

# step1 
Clone the repo
git clone https://github.com/your-username/your-repo
cd your-repo
npm install

# step2
Create a .env file and add your MongoDB URI:
MONGO_URI=your-mongodb-connection-string

# step 3
Start the server:
node server.js

🧑‍💻 Author
Made by Prerana Bubbly (https://github.com/preranababali)
