function nav() {
  var btns = document.querySelectorAll(".nav-item");
  btns.forEach(function (elem) {
    elem.addEventListener("click", _handleNavClick);
  });
}

function _handleNavClick() {
  //current selected nav-item
  selected = document.querySelector(".selected");
  //current container that is displayed
  current_container = document.getElementById("main-" + selected.id);
  //next container to be displayed
  next_container = document.getElementById("main-" + this.id);

  if (this !== selected) {
    //hide the current container
    current_container.classList.add("d-none");
    //display the next container
    next_container.classList.remove("d-none");
    //remove the "selected" class from the nav-item
    selected.classList.remove("selected");
    //add the "selected" class to the clicked nav-item
    this.classList.add("selected");
  }
}

nav();
