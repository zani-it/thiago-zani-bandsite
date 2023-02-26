const commentForm = document.getElementById('comment-form');
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const commentList = document.querySelector('.comments');
const formError = document.getElementById('form-error');
const apiAddressComments = 'https://project-1-api.herokuapp.com/comments?api_key=';
const apiLike = 'https://project-1-api.herokuapp.com/comments/';
const apiKey = 'd17ee7f2-34f4-4bae-b206-8af2fd2e6731';

async function displayComments() {
  // Fetch comments from API
  const response = await axios.get(`${apiAddressComments}${apiKey}`);
  comments = response.data;
  console.log(comments);

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
    commentEl.appendChild(contentEl);

    const textEl = document.createElement('p');
    textEl.textContent = comment.comment;
    contentEl.appendChild(textEl);

    const contentLike = document.createElement('div');
    contentLike.classList.add('comment__like');
    contentLike.classList.add('heart-shape');
    contentEl.appendChild(contentLike);

    const contentLikeButton = document.createElement('div');
    contentLikeButton.classList.add('comment__like-button');
    contentLike.appendChild(contentLikeButton);

    const contentLikeButtonLikes = document.createElement('span');
    contentLikeButtonLikes.classList.add('comment__like-button-likes');
    contentLikeButtonLikes.textContent = comment.likes;
    contentLikeButton.appendChild(contentLikeButtonLikes);

    const contentDeleteButton = document.createElement('button');
    contentDeleteButton.textContent = 'Delete';
    contentDeleteButton.classList.add('comment__delete-button');
    contentLike.appendChild(contentDeleteButton);


    const avatarEl = document.createElement('div');
    avatarEl.classList.add('comment__avatar');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('comment__avatar--img');

    avatarEl.appendChild(avatarImg);

    const commentWrapperEl = document.createElement('div');
    commentWrapperEl.classList.add('comment__wrapper');

    commentWrapperEl.appendChild(avatarEl);
    commentWrapperEl.appendChild(commentEl);

    commentList.insertBefore(commentWrapperEl, commentList.firstChild);

    // Add event listener to like button
    contentLikeButton.addEventListener('click', async () => {
      try {
        const response = await axios.put(`${apiLike}${comment.id}/like?api_key=${apiKey}`);
        const updatedComment = response.data;
        console.log(updatedComment);
        if (response.status === 200) {
          comment.likes = updatedComment.likes; // Update comment.likes
          contentLikeButton.textContent = comment.likes; // Update button text
        }
      } catch (error) {
        console.error(error);
      }
    });

    contentDeleteButton.addEventListener('click', async () => {
      try {
        console.log('Delete button clicked');

        const response = await axios.delete(`${apiLike}${comment.id}?api_key=${apiKey}`);
        if (response.status === 200) {
          // Remove the comment from the UI
          console.log('Comment removed from API');
          commentWrapperEl.remove();
        }
      } catch (error) {
        console.error(error);
      }
    });

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

  //USING AxIOS !!!
  try {
    const response = await axios.post(`${apiAddressComments}${apiKey}`, { name, comment: content, });
    // check if the server received all ok status 200
    if (response.status === 200) {
      const comment = response.data;
      //clear previous loaded comments
      commentList.innerHTML = '';
      //display comments 
      displayComments();
      // error submitting or empty fields messages
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

function timeSince(timestamp) {
  const options = {
    year: 'numeric',
    month: 'numeric',
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
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(timestamp).toLocaleString('en-US', options);
  }
}

//load comments after submit
function init() {
  displayComments();

  commentForm.addEventListener('submit', async (event) => {
    await submitComment(event);

  });
}
init();