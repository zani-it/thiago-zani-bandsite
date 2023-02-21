const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
var comments = JSON.parse(localStorage.getItem('comments')) || [];
const commentList = document.querySelector('.comments');
var firstSubmit = true;



function displayComment(comment) {
  const commentEl = document.createElement('article');
  commentEl.classList.add('comment__item');

  const titleEl = document.createElement('div');
  titleEl.classList.add('comment__item--title');

  const nameEl = document.createElement('h4');
  nameEl.classList.add('comment__name');
  nameEl.textContent = comment.name;

  const timestampEl = document.createElement('span');
  timestampEl.classList.add('comment__timestamp');
  timestampEl.textContent = timeSince(comment.timestamp);

  titleEl.appendChild(nameEl);
  titleEl.appendChild(timestampEl);

  commentEl.appendChild(titleEl);

  const contentEl = document.createElement('div');
  contentEl.classList.add('textc');

  const textEl = document.createElement('p');
  textEl.classList.add('comment__content');
  textEl.textContent = comment.content;

  contentEl.appendChild(textEl);

  commentEl.appendChild(contentEl);

  //will add images to avatar of last comments once assets are provided
  const avatarEl = document.createElement('div');
  //avatarEl.classList.add('comment__avatar');
  
  var avatarImg = document.createElement('img');
  //avatarImg.setAttribute('src', comment.avatarUrl);
  avatarImg.classList.add('comment__avatar');
  
  
  avatarImg.onerror = function() {
    // set gray background if image not found
    avatarImg.style.backgroundColor = '#ccc';
  };
  
  avatarEl.appendChild(avatarImg);
  
  const commentWrapperEl = document.createElement('div');
  commentWrapperEl.classList.add('comment__wrapper');
  
  commentWrapperEl.appendChild(avatarEl);
  commentWrapperEl.appendChild(commentEl);
  
  commentList.insertBefore(commentWrapperEl, commentList.firstChild);
}

function submitComment(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const content = commentInput.value.trim();

  if (!name || !content) {
    const formError = document.getElementById('form-error');
    formError.textContent = 'Please fill in both fields';

    if (!name) {
      nameInput.classList.add('comment__input-error');
    } else {
      nameInput.classList.remove('comment__input-error');
    }

    if (!content) {
      commentInput.classList.add('comment__input-error');
    } else {
      commentInput.classList.remove('comment__input-error');
    }

    return;
  }

  const timestamp = Date.now();

  const comment = { name, timestamp, content };
  comments.shift(comment);
  localStorage.setItem('comments', JSON.stringify(comments.slice(0, 3)));

  submitDetection();

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
          "name": "Miles Acosta",
          "timestamp": '02/17/2021',
          "content": "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
        },
        {
          "name": "Emilie Beach",
          "timestamp": '01/09/2021',
          "content": "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
        },
        {
          "name": "Connor Walton",
          "timestamp": '02/17/2021',
          "content": "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
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