const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
var comments = JSON.parse(localStorage.getItem('comments')) || [];
const commentList = document.querySelector('.comments');
var firstSubmit = true;



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
  comments.shift(comment);
  localStorage.setItem('comments', JSON.stringify(comments.slice(0, 3)));

  submitDetection()

  displayComment(comment);
  nameInput.value = '';
  commentInput.value = '';
}

function submitDetection() {
  if (firstSubmit == true) {

    const elementList = document.querySelector('.comments')
    console.log(elementList)
    const childNodes = Array.from(elementList.childNodes);
    childNodes.reverse();
    elementList.append(...childNodes);

    firstSubmit = false

  }
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

function clearComments() {
  commentList.innerHTML = '';
}

function loadComments() {
  if (comments.length < 3) {
    let list =
      [
        {
          "name": "01",
          "timestamp": 1176866415791,
          "content": "dasda"
        },
        {
          "name": "02",
          "timestamp": 1276866415791,
          "content": "dasda"
        },
        {
          "name": "03",
          "timestamp": 1576866415791,
          "content": "dasda"
        },
      ]

    comments = list

    console.log(comments)
  }


  //comments.reverse();
  comments.forEach((comment) => displayComment(comment));


}
function init() {
  loadComments()


  commentForm.addEventListener('submit', submitComment);
}


init();