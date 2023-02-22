const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const commentList = document.querySelector('.comments');
const formError = document.getElementById('form-error');
const apiAddressComments = 'https://project-1-api.herokuapp.com/comments?api_key=';
const apiKey = ('631ae958-2c1c-463d-8425-6e1fe9de5a66');



async function displayComments(reverse=false) {
  // Fetch comments from API
  const response = await fetch(`${apiAddressComments}${apiKey}`);
   comments = await response.json();
   
   if (reverse) {
    comments.reverse();
    
  }
  
<<<<<<< Updated upstream
  var avatarImg = document.createElement('img');
  //avatarImg.setAttribute('src', comment.avatarUrl);
  avatarImg.classList.add('comment__avatar');
  
  
  avatarImg.onerror = function() {
    // set gray background if image not found
=======
   console.log(comments);

  for (const comment of comments) {
    
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
    contentEl.classList.add('comment__content');

    const textEl = document.createElement('p');
    textEl.textContent = comment.comment;

    contentEl.appendChild(textEl);

    commentEl.appendChild(contentEl);

    const avatarEl = document.createElement('div');
    avatarEl.classList.add('comment__avatar');

    const avatarImg = document.createElement('img');
>>>>>>> Stashed changes
    avatarImg.style.backgroundColor = '#ccc';

    avatarEl.appendChild(avatarImg);

    const commentWrapperEl = document.createElement('div');
    commentWrapperEl.classList.add('comment__wrapper');

    commentWrapperEl.appendChild(avatarEl);
    commentWrapperEl.appendChild(commentEl);

    commentList.insertBefore(commentWrapperEl, commentList.firstChild);
  
  }
}

// submitting and display comments

async function submitComment(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const content = commentInput.value.trim();

  if (!name || !content) {
    formError.textContent = 'Please fill in both fields';

    if (!name) {
      nameInput.classList.add('comment__input-error');
      formError.classList.add('comment__input-error--message');
    } else {
      nameInput.classList.remove('comment__input-error');
      formError.classList.remove('comment__input-error--message');
    }

    if (!content) {
      commentInput.classList.add('comment__input-error');
      formError.classList.add('comment__input-error--message');
    } else {
      commentInput.classList.remove('comment__input-error');
      formError.classList.remove('comment__input-error--message');
    }

    return;
  }

  const timestamp = Date.now();

  const response = await fetch(`${apiAddressComments}${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      comment: content,
    })
  });

  if (response.ok) {
    const comment = await response.json();
    //clear previous loaded comments
    commentList.innerHTML = '';
    displayComments(true);
  
    nameInput.value = '';
    commentInput.value = '';
    formError.textContent = 'Thanks for your comment!';
  } else {
    formError.textContent = 'Error submitting comment. Please try again.';
  }  
}

function submitDetection() {
  if (response.ok == true) {
    var reverseComments = comments
    //console.log(reverseComments)
    const commentList = document.querySelector('.comments')
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

//load comments
function init() {
  displayComments(false);
 
  
  commentForm.addEventListener('submit', async (event) => {
    await submitComment(event);
    
    displayComments = true; // Only reverse comments after a successful submission
    
  });
}

init();