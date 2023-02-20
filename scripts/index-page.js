const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const comments = JSON.parse(localStorage.getItem('comments')) || [];
const commentList = document.querySelector('.comments');



function displayComment(comment) {
  const commentEl = document.createElement('article');
  commentEl.classList.add('comment');

  const nameEl = document.createElement('h4');
  nameEl.classList.add('comment__name');
  nameEl.textContent = comment.name;
  commentEl.appendChild(nameEl);

  const timestampEl = document.createElement('span');
  timestampEl.classList.add('comment__timestamp');
  timestampEl.textContent = timeSince(comment.timestamp);
  commentEl.appendChild(timestampEl);

  const contentEl = document.createElement('p');
  contentEl.classList.add('comment__content');
  contentEl.textContent = comment.content;
  commentEl.appendChild(contentEl);

  commentList.insertBefore(commentEl, commentList.firstChild);
}

function submitComment(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const content = commentInput.value.trim();

  if (!name || !content) {
    const formError = document.getElementById('form-error');
    formError.textContent = 'Please fill in both fields';
    return;
  }

  const timestamp = Date.now();

  const comment = { name, timestamp, content };
  comments.unshift(comment);
  localStorage.setItem('comments', JSON.stringify(comments.slice(0, 3)));

  displayComment(comment);
  nameInput.value = '';
  commentInput.value = '';
}

function timeSince(timestamp) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return new Date(timestamp).toLocaleString('en-US', options);
}

// function timeSince(timestamp) {
//   const minute = 60 * 1000;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const week = day * 7;

//   const now = new Date().getTime();
//   const diffTime = now - timestamp;

//   if (diffTime < minute) {
//     return 'just now';
//   } else if (diffTime < hour) {
//     const num = Math.floor(diffTime / minute);
//     return `${num} minute${num === 1 ? '' : 's'} ago`;
//   } else if (diffTime < day) {
//     const num = Math.floor(diffTime / hour);
//     return `${num} hour${num === 1 ? '' : 's'} ago`;
//   } else if (diffTime < week) {
//     const num = Math.floor(diffTime / day);
//     return `${num} day${num === 1 ? '' : 's'} ago`;
//   } else {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true
//     };
//     return new Date(timestamp).toLocaleString('en-US', options);
//   }
// }




// function formatTimestamp(timestamp) {
//   const currentTime = Date.now();
//   const diffTime = currentTime - timestamp;

//   const minute = 60 * 1000;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const week = day * 7;

//   if (diffTime < minute) {
//     return 'just now';
//   } else if (diffTime < hour) {
//     const num = Math.floor(diffTime / minute);
//     return `${num} minute${num === 1 ? '' : 's'} ago`;
//   } else if (diffTime < day) {
//     const num = Math.floor(diffTime / hour);
//     return `${num} hour${num === 1 ? '' : 's'} ago`;
//   } else if (diffTime < week) {
//     const num = Math.floor(diffTime / day);
//     return `${num} day${num === 1 ? '' : 's'} ago`;
//   } else {
//     return new Date(timestamp).toLocaleDateString();
//   }
// }

function clearComments() {
  commentList.innerHTML = '';
}

function init() {
  comments.forEach((comment) => displayComment(comment));

  commentForm.addEventListener('submit', submitComment);
}

init();