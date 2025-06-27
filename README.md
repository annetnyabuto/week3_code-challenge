# Post Pulse - Blog Management App

A modern blog post management application built with JavaScript, HTML, and CSS. This application allows users to view, create, edit, and delete blog posts with a clean and responsive interface.

## Features

View Posts: Display all blog posts in a list format

Post Details: Click on any post to view full details including images

Add New Posts: Create new blog posts with title, author, image URL, and content

Edit Posts: Modify existing posts with an inline editing form

Delete Posts: Remove posts with confirmation dialog

Responsive Design: Mobile-friendly layout that adapts to different screen sizes

Image Support: Display images from URLs with fallback for broken links

## Setup Instructions
1. Install json-server globally:
   npm install -g json-server@0.17.4
2. Start the backend API by running:
   json-server db.json
   This will start the API server at http://localhost:3000
3. Start the frontend by running:
   live-server
   This will open the application in your browser


## Project Structure
/
├──images          
├── db.json        
├── index.html     
├── index.js            
├── README.md           
└── Styles.css         


## API Endpoints
GET /posts - Retrieve all blog posts.

GET /posts/:id - Retrieve a single blog post.

POST /posts - Create a new blog post.

PATCH /posts/:id - Update an existing blog post.

DELETE /posts/:id - Delete a blog post.


## Technologies Used
Frontend: HTML5, CSS3,JavaScript
Backend: JSON Server (mock REST API)
HTTP Client: Fetch API

## Usage
Viewing Posts: All posts are displayed on the left side. Click any post title to view details.
Adding Posts: Use the form at the top to create new posts. All fields are required.
Editing Posts: Click the "Edit" button in post details to modify the post.
Deleting Posts: Click the "Delete" button and confirm to remove a post.

## Responsive Features
The application is fully responsive and includes:
Touch-friendly buttons and form elements
Optimized images that scale properly
Browser Support
Chrome (recommended)
Firefox
Safari
Edge

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Copyright (c) 2025 Annet Nyabuto