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

nav();
