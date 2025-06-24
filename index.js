// Main function that runs when DOM is loaded
function main() {
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);

// Display all posts and show first post on page load
function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';
            
            if (posts.length > 0) {
                // Show first post details
                handlePostClick(posts[0].id);
            }
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'mb-4 p-3 border-b cursor-pointer hover:bg-gray-50';
                postElement.innerHTML = `
                    <h3 class="font-medium">${post.title}</h3>
                    <p class="text-sm text-gray-500">${post.author} • ${post.date}</p>
                `;
                postElement.addEventListener('click', () => handlePostClick(post.id));
                postList.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Handle post click to show details
function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
                <p class="text-gray-600 mb-4">By ${post.author} • ${post.date}</p>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="mb-4 rounded-md" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><div style="display:none; padding:20px; background:#f3f4f6; border-radius:8px; text-align:center; color:#6b7280;">Image not available</div>` : ''}
                <p class="mb-4">${post.content}</p>
                <div class="flex space-x-2">
                    <button id="edit-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md text-sm">Edit</button>
                    <button id="delete-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm">Delete</button>
                </div>
            `;
            
            // Add event listeners for edit and delete buttons
            document.getElementById('edit-btn').addEventListener('click', () => showEditForm(post));
            document.getElementById('delete-btn').addEventListener('click', () => deletePost(post.id));
        })
        .catch(error => console.error('Error fetching post:', error));
}

// Add new post listener with backend persistence
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('post-title').value,
            author: document.getElementById('post-author').value,
            image: document.getElementById('post-image').value,
            content: document.getElementById('post-content').value,
            date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
        };
        
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            addPostToUI(post);
            form.reset();
        })
        .catch(error => console.error('Error creating post:', error));
    });
}

// Helper function to add post to UI
function addPostToUI(post) {
    const postList = document.getElementById('post-list');
    const postElement = document.createElement('div');
    postElement.className = 'mb-4 p-3 border-b cursor-pointer hover:bg-gray-50';
    postElement.innerHTML = `
        <h3 class="font-medium">${post.title}</h3>
        <p class="text-sm text-gray-500">${post.author} • ${post.date}</p>
    `;
    postElement.addEventListener('click', () => handlePostClick(post.id));
    postList.prepend(postElement); // Add to top of list
}
// Add these functions to your index.js

// Show edit form
function showEditForm(post) {
    const postDetail = document.getElementById('post-detail');
    postDetail.innerHTML = `
        <form id="edit-post-form">
            <h4 class="text-lg font-semibold mb-4">Edit Post Details</h4>
            <label for="edit-title" class="block mb-1">Title:</label>
            <input type="text" name="title" id="edit-title" value="${post.title}" class="p-2 border rounded-md w-full mb-2">
            
            <label for="edit-author" class="block mb-1">Author:</label>
            <input type="text" name="author" id="edit-author" value="${post.author}" class="p-2 border rounded-md w-full mb-2">
            
            <label for="edit-image" class="block mb-1">Image URL:</label>
            <input type="text" name="image" id="edit-image" value="${post.image || ''}" class="p-2 border rounded-md w-full mb-2">
            
            <label for="edit-content" class="block mb-1">Content:</label>
            <textarea name="content" id="edit-content" rows="5" class="p-2 border rounded-md w-full mb-4">${post.content}</textarea>
            
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Update Post</button>
            <button type="button" id="cancel-edit" class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md ml-2">Cancel</button>
        </form>
    `;
    
    document.getElementById('edit-post-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updatePost(post.id);
    });
    
    document.getElementById('cancel-edit').addEventListener('click', () => handlePostClick(post.id));
}

// Update post
function updatePost(postId) {
    const updatedPost = {
        title: document.getElementById('edit-title').value,
        author: document.getElementById('edit-author').value,
        image: document.getElementById('edit-image').value,
        content: document.getElementById('edit-content').value
    };
    
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(() => {
        displayPosts(); // Refresh the post list
        handlePostClick(postId); // Show the updated post
    })
    .catch(error => console.error('Error updating post:', error));
}

// Delete post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete the post?')) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => {
            document.getElementById('post-detail').innerHTML = '<p class="text-gray-500">Select a post to view details</p>';
            displayPosts(); // Refresh the post list
        })
        .catch(error => console.error('Error deleting post:', error));
    }
}



