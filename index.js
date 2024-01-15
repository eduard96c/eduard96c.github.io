active_page = "home";
current_container = document.getElementById(active_page);
selected = document.querySelector("[data-page='" + active_page + "']");

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

  selected = document.querySelector(".selected");

  next_container = document.getElementById(active_page);

  if (e.target !== selected) {
    current_container.classList.remove("d-block");
    next_container.classList.add("d-block");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

function showSkills() {
  var ul = document.querySelector("#skills ul");
  var skills = [
    { name: "HTML", endorsments: 3 },
    { name: "CSS", endorsments: 4 },
    { name: "JS", endorsments: 6 },
  ];
  var response = skills.map(function (skill) {
    return "<li>" + skill.name + "-<span>" + skill.endorsments + "</span></li>";
  });
  console.log(response);
  ul.innerHTML = response.join("");
}
showSkills();
nav();
