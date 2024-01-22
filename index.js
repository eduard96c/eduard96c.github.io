function $(selector) {
  return document.querySelector(selector);
}

active_page = "about";
current_container = document.getElementById(active_page);
selected = $("[data-page='" + active_page + "']");

function nav() {
  current_container.classList.add("d-block");
  selected.classList.add("selected");

  var btns = document.querySelectorAll(".nav-item");
  btns.forEach(function (elem) {
    elem.addEventListener("click", _handleNavClick);
  });
}

function _handleNavClick(e) {
  current_container = document.getElementById(active_page);

  active_page = e.target.dataset.page;

  selected = $(".selected");

  next_container = document.getElementById(active_page);

  if (e.target !== selected) {
    console.log(current_container);
    current_container.classList.remove("d-block");
    next_container.classList.add("d-block");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

function showSkills() {
  var ul = $("#skills ul");
  var skills = [];
  var response = skills.map(function (skill) {
    if (skill.favourite) {
      return (
        "<li class='favourite'>" +
        skill.name +
        "-<span>" +
        skill.endorsments +
        "</span></li>"
      );
    } else {
      return (
        "<li>" + skill.name + "-<span>" + skill.endorsments + "</span></li>"
      );
    }
  });
  console.log(response);
  ul.innerHTML = response.join("");
}
showSkills();
nav();
