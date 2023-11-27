function nav() {
  var btns = document.querySelectorAll(".nav-item");
  btns.forEach(function (elem) {
    elem.addEventListener("click", _handleNavClick);
  });
}

function _handleNavClick() {
  selected = document.querySelector(".selected");
  current_container = document.getElementById("main-" + selected.id);
  next_container = document.getElementById("main-" + this.id);
  if (this !== selected) {
    current_container.classList.add("d-none");
    next_container.classList.remove("d-none");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

nav();
