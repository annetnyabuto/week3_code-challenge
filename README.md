# Post Pulse - Blog Management App

A modern blog post management application that allows users to create, read, update, and delete blog posts.

## Features

- **View Posts**: Display all blog posts in a clean list format
- **Post Details**: Click on any post to view full details with image
- **Add Posts**: Create new blog posts with title, author, image, and content
- **Edit Posts**: Update existing post information
- **Delete Posts**: Remove posts from the system
- **Responsive Layout**: Two-column layout with posts on left, details on right

## Setup Instructions

1. **Install JSON Server** (if not already installed):
   ```bash
   npm install -g json-server
   ```

2. **Start the API Server**:
   ```bash
   json-server --watch db.json --port 3000
   ```

3. **Open the Application**:
   - Open `index.html` in your web browser
   - The app will connect to the API at `http://localhost:3000`

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── index..js           # JavaScript functionality
├── db.json            # JSON database file
├── images/            # Image assets folder
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
│   └── image4.jpg
└── README.md          # This file
```

## API Endpoints

- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Retrieve single post
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update existing post
- `DELETE /posts/:id` - Delete post

## Usage

1. **Viewing Posts**: All posts are listed in the left column
2. **Post Details**: Click any post title to view details on the right
3. **Adding Posts**: Fill out the form in the left column and click "Add Post"
4. **Editing**: Click "Edit" button in post details, modify fields, then "Update Post"
5. **Deleting**: Click "Delete" button in post details to remove a post

## Technologies Used

- HTML5
- CSS3 (Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- JSON Server (REST API)
- Fetch API for HTTP requests