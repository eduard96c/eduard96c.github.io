function $(selector) {
  return document.querySelector(selector);
}

active_page = "skills";
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

function list_select() {
  let lists = document.querySelectorAll(".list-select");
  lists.forEach(function (elem) {
    elem.addEventListener("click", function (ev) {
      var page = document.querySelector("#" + active_page);
      if (ev.target.nodeName.toLowerCase() == "li") {
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
        ev.target.classList.add("selected-list");
        page.querySelector("#" + ev.target.dataset.type).style.display =
          "block";
      }
    });
  });
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
  var page_section = $("#skills section:last-child");
  let skills = [];

  skills = await fetch_json("./skills.json");

  skills.forEach(function (category) {
    style = "";
    if (category.main !== undefined) {
      style = "style='display:block'";
    }
    html = `<ul id='${category.type.toLowerCase()}' class='data-list skill-list' ${style}><h3>${
      category.type
    } Skills</h3>`;
    var response = category.list.map(function (skill) {
      if (skill.favourite) {
        return (
          "<li class='favourite'>" +
          skill.name +
          "-<span>" +
          skill.details +
          "</span></li>"
        );
      } else {
        return "<li>" + skill.name + "-<span>" + skill.details + "</span></li>";
      }
    });
    // console.log(category);
    console.log(response);
    html += response.join("");
    html += "</ul>";
    page_section.innerHTML += html;
    page_section;
  });
}
showSkills();
nav();
list_select();
