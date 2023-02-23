const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const commentList = document.querySelector('.comments');
const formError = document.getElementById('form-error');
const apiAddressComments = 'https://project-1-api.herokuapp.com/comments?api_key=';
const apiKey = 'd17ee7f2-34f4-4bae-b206-8af2fd2e6731';



async function displayComments() {
  // Fetch comments from API
  const response = await fetch(`${apiAddressComments}${apiKey}`);
  comments = await response.json();

  comments.sort(function (x, y) {
    return x.timestamp - y.timestamp;
  });

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
    nameInput.classList.toggle('comment__input-error', !name);
    commentInput.classList.toggle('comment__input-error', !content);
    formError.classList.toggle('comment__input-error--message', !name || !content);
    return;
  }

  const timestamp = Date.now();

  try {
    const response = await axios.post(`${apiAddressComments}${apiKey}`, {
      name,
      comment: content,
    });

    if (response.status === 200) {
      const comment = response.data;
      //clear previous loaded comments
      commentList.innerHTML = '';
      displayComments();

      nameInput.value = '';
      commentInput.value = '';
      commentInput.classList.remove('comment__input-error');
      nameInput.classList.remove('comment__input-error');
      formError.classList.remove('comment__input-error--message');
      formError.classList.add('comment__input-error--message-none');
      formError.textContent = 'Thanks for your comment!';
    } else {
      formError.textContent = 'Error submitting comment. Please try again.';
    }
  } catch (error) {
    console.error(error);
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

function timeSince(timestamp) {

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;

  const now = new Date().getTime();
  const diffTime = now - timestamp;

  if (diffTime < minute) {
    return 'just now';
  }
  else if (diffTime < hour) {
    const num = Math.floor(diffTime / minute);
    return `${num} minute${num === 1 ? '' : 's'} ago`;
  }
  else if (diffTime < day) {
    const num = Math.floor(diffTime / hour);
    return `${num} hour${num === 1 ? '' : 's'} ago`;
  }
  else if (diffTime < week) {
    const num = Math.floor(diffTime / day);
    return `${num} day${num === 1 ? '' : 's'} ago`;
  }
  else if (diffTime < month) {
    const num = Math.floor(diffTime / month);
    return `${num} month${num === 1 ? '' : 's'} ago`;
  }

  else {
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
}

//load comments
function init() {
  displayComments();


  commentForm.addEventListener('submit', async (event) => {
    await submitComment(event);

  });
}

init();