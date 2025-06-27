// Main function that runs when DOM is loaded
function main() {
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);

// Core Deliverable: Display all posts
function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';
            
            // Advanced Deliverable: Show first post details on load
            if (posts.length > 0) {
                handlePostClick(posts[0].id);
            }
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>By ${post.author} • ${post.date}</p>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width: 100px; height: 60px; object-fit: cover;">` : ''}
                `;
                postElement.addEventListener('click', () => handlePostClick(post.id));
                postList.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Core Deliverable: Handle post click to show details
function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <div class="post-header">
                    <div class="post-info">
                        <h2>${post.title}</h2>
                        <p>By ${post.author} • ${post.date}</p>
                    </div>
                    <div class="post-actions">
                        <button id="edit-btn">Edit</button>
                        <button id="delete-btn" style="background-color: #dc3545;">Delete</button>
                    </div>
                </div>
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                <p>${post.content}</p>
            `;
            
            // Advanced Deliverable: Add edit and delete functionality
            document.getElementById('edit-btn').addEventListener('click', () => showEditForm(post));
            document.getElementById('delete-btn').addEventListener('click', () => deletePost(post.id));
        })
        .catch(error => console.error('Error fetching post:', error));
}

// Core Deliverable: Add new post listener
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('post-title').value,
            author: document.getElementById('post-author').value,
            image: document.getElementById('post-image').value,
            content: document.getElementById('post-content').value,
            date: new Date().toISOString().split('T')[0]
        };
        
        // Extra Advanced Deliverable: Persist to backend
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            displayPosts(); // Refresh the list
            form.reset();
        })
        .catch(error => console.error('Error creating post:', error));
    });
    
    // Add cancel button functionality
    const cancelBtn = document.querySelector('.cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            form.reset();
        });
    }
}

// Advanced Deliverable: Show edit form
function showEditForm(post) {
    const postDetail = document.getElementById('post-detail');
    postDetail.innerHTML = `
        <form id="edit-post-form">
            <h4>Edit Post Details</h4>
            <div class="form-group">
                <input type="text" id="edit-title" value="${post.title}" placeholder="Title">
                <input type="text" id="edit-author" value="${post.author}" placeholder="Author">
                <input type="text" id="edit-image" value="${post.image || ''}" placeholder="Image URL">
                <textarea id="edit-content" placeholder="Content">${post.content}</textarea>
            </div>
            <div class="button-group">
                <button type="submit">Update Post</button>
                <button type="button" id="cancel-edit" class="cancel">Cancel</button>
            </div>
        </form>
    `;
    
    document.getElementById('edit-post-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updatePost(post.id);
    });
    
    document.getElementById('cancel-edit').addEventListener('click', () => handlePostClick(post.id));
}

// Extra Advanced Deliverable: Update post with PATCH
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
        displayPosts();
        handlePostClick(postId);
    })
    .catch(error => console.error('Error updating post:', error));
}

// Advanced/Extra Advanced Deliverable: Delete post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => {
            document.getElementById('post-detail').innerHTML = '<p>Select a post to view details</p>';
            displayPosts();
        })
        .catch(error => console.error('Error deleting post:', error));
    }
}