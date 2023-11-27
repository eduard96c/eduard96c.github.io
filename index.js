function nav() {
  var btns = document.querySelectorAll(".nav-item");
  btns.forEach(function (elem) {
    elem.addEventListener("click", _handleNavClick);
  });
}

function _handleNavClick() {
  selected = document.querySelector(".selected");
  current_conainer = document.querySelector("#main-" + selected.id);
  next_container = document.querySelector("#main-" + this.id);
  if (this !== selected) {
    current_conainer.classList.add("d-none");
    next_container.classList.remove("d-none");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

nav();
