function $(selector) {
  return document.querySelector(selector);
}

active_page = "about";
current_container = document.getElementById(active_page);
selected = $("[data-page='" + active_page + "']");

function nav() {
  current_container.classList.add("d-flex");
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
    current_container.classList.remove("d-flex");
    next_container.classList.add("d-flex");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

function _handleListChange(ev) {
  console.log(event);
  var page = document.querySelector("#" + active_page);
  if (event.target.nodeName.toLowerCase() == "li") {
    page_lists = page.querySelectorAll(".data-list");
    list_selectors = page.querySelectorAll(".list-select li");
    //remove selected class
    list_selectors.forEach(function (sl) {
      sl.classList.remove("selected-list");
    });
    //hide other lists
    page_lists.forEach(function (pg) {
      pg.style.display = "none";
    });
    event.target.classList.add("selected-list");
    page.querySelector("#" + event.target.dataset.type).style.display = "block";
  }
}

async function fetch_json(path) {
  let response;
  await fetch(path)
    .then((response) => response.json())
    .then((json) => {
      response = json;
    });

  return response;
}
async function showSkills() {
  var page_list_section = $("#skills section:last-child");
  var page_menu_section = $("#skills section:first-child");
  menu_html = "<ul class='list-select' onclick='_handleListChange(this)'>";

  let skills = [];

  skills = await fetch_json("./skills.json");

  skills.forEach(function (category) {
    style = "";
    menu_class = "";
    if (category.main !== undefined) {
      style = "style='display:block'";
      menu_class = "class='selected-list'";
    }

    menu_html += `<li ${menu_class} data-type='${category.type.toLowerCase()}'>${
      category.type
    }</li>`;

    html = `<ul id='${category.type.toLowerCase()}' class='data-list skill-list' ${style}><h3>${
      category.type
    } Skills</h3>`;

    var response = category.list.map(function (skill) {
      fav_class = "";
      if (skill.favourite) {
        fav_class = "class='favourite'";
      }
      response = `<li ${fav_class}> <span>${skill.name}</span> - <span>${skill.details}</span></li>`;
      return response;
    });

    html += response.join("");
    console.log(response);
    html += "</ul>";

    page_list_section.innerHTML += html;
  });
  menu_html += "</ul>";
  page_menu_section.innerHTML += menu_html;
}
showSkills();
nav();
