

var link = document.querySelector(".feedback-button");
var popup = document.querySelector(".feedback-wrapper");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector("form");
var feedbackName = popup.querySelector("[name=feedback-name]");
var feedbackEmail = popup.querySelector("[name=feedback-email]");
var feedbackField = popup.querySelector("[name=feedback-field]");
var storageName = localStorage.getItem("name");
var storageEmail = localStorage.getItem("email");

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("search-show");

	if (storageName) {
      feedbackName.value = storageName;
      if (storageEmail) {
      	feedbackEmail.value = storageEmail;
      	feedbackField.focus();
      } else
      feedbackEmail.focus();
    } else {
      feedbackName.focus();
  }
  });

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("search-show");
    popup.classList.remove("search-error");
  });

form.addEventListener("submit", function (evt) {
	if (!feedbackName.value || !feedbackEmail.value || !feedbackField.value) {
    evt.preventDefault();
    popup.classList.remove("search-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("search-error");
    console.log("Нужно заполнить поля");
    } else {
      localStorage.setItem("name", feedbackName.value);
      localStorage.setItem("email", feedbackEmail.value);
    }
  });

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("search-show")) {
        popup.classList.remove("search-show");
        popup.classList.remove("search-error");
      }
    }
  });