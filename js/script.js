let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

toggleBtn.onclick = (e) => {
    darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
    profile.classList.toggle('active');
    search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
    search.classList.toggle('active');
    profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () => {
    sideBar.classList.remove('active');
    body.classList.remove('active');
}

window.onscroll = () => {
    profile.classList.remove('active');
    search.classList.remove('active');

    if (window.innerWidth < 1200) {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById('add-comment-form');
    const commentsContainer = document.getElementById('comments-container');

    let comments = [];

    const renderComments = () => {
        commentsContainer.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentBox = document.createElement('div');
            commentBox.className = 'box';

            commentBox.innerHTML = `
            <div class="user">
               <img src="images/profile1.png" alt="">
               <div>
                  <h3>maruf sikder</h3>
                  <span>${comment.date}</span>
               </div>
            </div>
            <div class="comment-box">${comment.text}</div>
            <form class="flex-btn" data-index="${index}">
               <input type="button" value="edit comment" class="inline-option-btn edit-comment">
               <input type="button" value="delete comment" class="inline-delete-btn delete-comment">
            </form>
         `;
            commentsContainer.appendChild(commentBox);
        });
    };

    const addComment = (text) => {
        const date = new Date().toLocaleDateString();
        comments.push({ text, date });
        renderComments();
    };

    const editComment = (index, newText) => {
        comments[index].text = newText;
        renderComments();
    };

    const deleteComment = (index) => {
        comments.splice(index, 1);
        renderComments();
    };

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = commentForm.comment_box.value;
        if (commentText) {
            addComment(commentText);
            commentForm.reset();
        }
    });

    commentsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-comment')) {
            const index = e.target.closest('form').dataset.index;
            const newText = prompt("Edit your comment:", comments[index].text);
            if (newText) {
                editComment(index, newText);
            }
        } else if (e.target.classList.contains('delete-comment')) {
            const index = e.target.closest('form').dataset.index;
            if (confirm("Are you sure you want to delete this comment?")) {
                deleteComment(index);
            }
        }
    });

    renderComments();
});


