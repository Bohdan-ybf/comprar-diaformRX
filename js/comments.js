(function () {
  var config = JSON.parse(
    '{"defaultAvatar":"./img/default-avatar.jpg","rtl":false,"headless":false,"commLang":"ID"}'
  );
  var commentTranslations = JSON.parse(
    '{"defaultName":"Tamu","defaultDate":"at that time"}'
  );
  var commentsContainer = document.querySelector('#comment-component-text');
  var firstComment = document.querySelector('#comment-component-text .comment');
  var lastComment = document.querySelector(
    '#comment-component-text .comment:last-of-type'
  );
  var commentBtn = document.querySelector(
    '#comment-component-text .add-comment-button'
  );
  var textArea = document.querySelector('#comment-component-text .txt-content');
  var yourName = document.querySelector('#comment-component-text #yourName');

  //var likesBtns = document.querySelectorAll('.comment__details button');
  //comment

  function addComment(
    msg,
    yourNameValue = commentTranslations.defaultName,
    img = config.defaultAvatar,
    time = commentTranslations.defaultDate
  ) {
    var firstComment = commentsContainer.querySelector('.comment');
    var newComment;
    if (lastComment !== null) {
      var timestamp = new Date().getTime();
      newComment = lastComment.cloneNode(true);
      newComment.classList.remove('reply');
      newComment.removeAttribute('style');
      newComment.classList.add('newComment', 'date' + timestamp);
      newComment.querySelectorAll('.comment__name').forEach(function (elem) {
        elem.innerHTML = yourNameValue;
      });
      newComment.querySelectorAll('.comment__text').forEach(function (elem) {
        elem.innerHTML = msg;
      });
      newComment.querySelectorAll('.comment__image').forEach(function (elem) {
        elem.setAttribute('src', img);
      });
      newComment.querySelectorAll('.likes').forEach(function (elem) {
        elem.innerHTML = 0;
      });
      newComment.querySelectorAll('.comment__time').forEach(function (elem) {
        elem.innerHTML = time;
      });
      toggleLike(newComment);
    }
    commentsContainer.insertBefore(newComment, firstComment);
    fadeInComment(document.querySelector('.date' + timestamp));
  }

  //add comment on click
  if (commentBtn !== null) {
    commentBtn.addEventListener('click', function () {
      console.log(13);
      var msg = textArea.value;
      var yourNameValue = yourName.value || commentTranslations.defaultName;

      if (msg.trim().length > 0 && yourNameValue.trim().length > 0) {
        textArea.value = '';
        yourName.value = '';

        addComment(msg, yourNameValue);
      }
    });
  }

  // show new comment after scroll
  var scrollCount = 0;
  if (document.querySelectorAll('.firstComment').length > 0) {
    window.addEventListener('scroll', function () {
      var scrollValue = window.pageYOffset + window.innerHeight;
      var commentsOffsetY = firstComment.offsetTop;
      if (scrollValue > commentsOffsetY && scrollCount === 0) {
        setTimeout(function () {
          var firstComment = document.querySelector('.firstComment');
          fadeInComment(firstComment);
        }, 2000);
        scrollCount = 1;
      }
    });
  } // /end firstComment

  function fadeInComment(elem) {
    elem.style.display = 'flex';
    setTimeout(function () {
      elem.style.opacity = '1';
      elem.style.maxHeight = '1000px';
    }, 25);
  }

  commentsContainer.querySelectorAll('.comment').forEach(function (elem) {
    toggleLike(elem);
    toggleDislike(elem);
  });

  function toggleLike(comment) {
    let likeBtn = comment.querySelector('.comments__like');
    let likeNum = comment.querySelector('.likes');
    // checking if current theme has like buttons;
    if (likeBtn !== null && likeNum !== null) {
      if (/^\d*$/gi.test(likeNum.innerHTML)) {
        likeBtn.addEventListener('click', function () {
          if (likeBtn.style.fontWeight == '700') {
            likeNum.innerHTML -= 1;
            likeBtn.style.fontWeight = '400';
          } else {
            likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1;
            likeBtn.style.fontWeight = '700';
          }
          this.classList.add('events-stop');
          this.nextElementSibling.classList.add('events-stop');
        });
      }
    }
  }

  function toggleDislike(comment) {
    let dislikeBtn = comment.querySelector('.comments__dislike');
    let dislikeNum = comment.querySelector('.dislikes');
    // checking if current theme has like buttons;
    if (dislikeBtn !== null && dislikeNum !== null) {
      if (/^\d*$/gi.test(dislikeNum.innerHTML)) {
        dislikeBtn.addEventListener('click', function () {
          if (dislikeBtn.style.fontWeight == '700') {
            dislikeNum.innerHTML -= 1;
            dislikeBtn.style.fontWeight = '400';
          } else {
            dislikeNum.innerHTML = parseInt(dislikeNum.innerHTML) + 1;
            dislikeBtn.style.fontWeight = '700';
          }
          this.classList.add('events-stop');
          this.previousElementSibling.classList.add('events-stop');
        });
      }
    }
  }
})();

/* **************************************************** */

// /////     SCROLL ////

window.addEventListener('DOMContentLoaded', () => {
  document
  .querySelectorAll('a, .to-link, .comment__img, .comments, .search-button')
    .forEach((el) => {
      el.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector('#comment-component-text');
        console.log(targetElement);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('error');
        }
      });
    });
});

////// SCROLL ADD COMENTAR //////

const commentWrite = document.querySelector('.comment-write');
const newComment = document.querySelector('#scroll-new-comment');

const showComment = () => {
  commentWrite.style.display = 'none';
  newComment.style.display = 'flex';

  newComment.style.display = 'flex';
  newComment.classList.add('comment-appear');
};

let isCommentVisible = false;

const savedComment = sessionStorage.getItem('savedComment');
if (savedComment) {
  newComment.innerHTML = savedComment;
  showComment();
}

window.addEventListener('scroll', () => {
  if (
    !isCommentVisible &&
    commentWrite.getBoundingClientRect().top < window.innerHeight
  ) {
    isCommentVisible = true;
    setTimeout(() => {
      showComment();

      sessionStorage.setItem('savedComment', newComment.innerHTML);
    }, 3000);
  }
});
