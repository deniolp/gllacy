

var link = document.querySelector(".feedback-button");
var popup = document.querySelector(".feedback-wrapper");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector("form");
var feedbackName = popup.querySelector("[name=feedback-name]");
var feedbackEmail = popup.querySelector("[name=feedback-email]");
var feedbackField = popup.querySelector("[name=feedback-field]");
var storageName = localStorage.getItem("name");
var storageEmail = localStorage.getItem("email");

var slide1 = document.querySelector(".slide-btn-1");
var slide2 = document.querySelector(".slide-btn-2");
var slide3 = document.querySelector(".slide-btn-3");
var slideDescription1 = document.querySelector(".slide1");
var slideDescription2 = document.querySelector(".slide2");
var slideDescription3 = document.querySelector(".slide3");
var body = document.querySelector("body");

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

slide1.addEventListener("click", function(evt) {
	evt.preventDefault();
	if (body.classList.contains("body-2")) {
		body.classList.remove("body-2");
	} else if (body.classList.contains("body-3")) {
		body.classList.remove("body-3");
	};
	body.classList.add("body-1");
	if (slideDescription2.classList.contains("slide-active")) {
		slideDescription2.classList.remove("slide-active");
	} else if (slideDescription3.classList.contains("slide-active")) {
		slideDescription3.classList.remove("slide-active");
	};
	slideDescription1.classList.add("slide-active");
	if (slide2.classList.contains("slide-btn-active")) {
		slide2.classList.remove("slide-btn-active");
	} else if (slide3.classList.contains("slide-btn-active")) {
		slide3.classList.remove("slide-btn-active");
	};
	slide1.classList.add("slide-btn-active");
	})

slide2.addEventListener("click", function(evt) {
	evt.preventDefault();
	if (body.classList.contains("body-1")) {
		body.classList.remove("body-1");
	} else if (body.classList.contains("body-3")) {
		body.classList.remove("body-3");
	};
	body.classList.add("body-2");
	if (slideDescription1.classList.contains("slide-active")) {
		slideDescription1.classList.remove("slide-active");
	} else if (slideDescription3.classList.contains("slide-active")) {
		slideDescription3.classList.remove("slide-active");
	};
	slideDescription2.classList.add("slide-active");
	if (slide1.classList.contains("slide-btn-active")) {
		slide1.classList.remove("slide-btn-active");
	} else if (slide3.classList.contains("slide-btn-active")) {
		slide3.classList.remove("slide-btn-active");
	};
	slide2.classList.add("slide-btn-active");
	})

slide3.addEventListener("click", function(evt) {
	evt.preventDefault();
	if (body.classList.contains("body-1")) {
		body.classList.remove("body-1");
	} else if (body.classList.contains("body-2")) {
		body.classList.remove("body-2");
	};
	body.classList.add("body-3");
	if (slideDescription1.classList.contains("slide-active")) {
		slideDescription1.classList.remove("slide-active");
	} else if (slideDescription2.classList.contains("slide-active")) {
		slideDescription2.classList.remove("slide-active");
	};
	slideDescription3.classList.add("slide-active");
	if (slide1.classList.contains("slide-btn-active")) {
		slide1.classList.remove("slide-btn-active");
	} else if (slide2.classList.contains("slide-btn-active")) {
		slide2.classList.remove("slide-btn-active");
	};
	slide3.classList.add("slide-btn-active");
	})