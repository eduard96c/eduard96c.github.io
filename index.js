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

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function create_list_for_item(item) {
  var style = "";
  if (item.main !== undefined) {
    style = "style='display:block'";
  }

  var html = `<ul id='${item.type.toLowerCase()}' class='data-list skill-list' ${style}><h3>${
    item.type
  } </h3>`;

  var response = item.list.map(function (data) {
    fav_class = "";
    if (data.favourite) {
      fav_class = "class='favourite'";
    }
    if (data.href) {
      response = `<li ${fav_class}> <a href="${data.href}">${data.name}</a> - <span>${data.details}</span></li>`;
    } else {
      response = `<li ${fav_class}> <span>${data.name}</span> - <span>${data.details}</span></li>`;
    }
    return response;
  });

  html += response.join("");
  html += "</ul>";
  return html;
}

function create_menu_for_items(items) {
  var html = "<ul class='list-select' onclick='_handleListChange(this)'>";

  var response = items.map(function (item) {
    menu_class = "";
    if (item.main !== undefined) {
      menu_class = "class='selected-list'";
    }
    return `<li ${menu_class} data-type='${item.type.toLowerCase()}'>${item.type}</li>`;
  });
  html += response.join("") + "</ul>";
  return html;
}

async function get_from_json(object) {
  var page_list_section = $(`#${object} section:last-child`);
  var page_menu_section = $(`#${object} section:first-child`);
  let items = [];

  page_menu_section.querySelector("h2").innerHTML = ucfirst(object);
  items = await fetch_json("./data/" + object + ".json");

  page_menu_section.innerHTML += create_menu_for_list(items);

  items.forEach(function (category) {
    page_list_section.innerHTML += create_list_for_item(category);
  });
}

get_from_json("skills");
get_from_json("projects");
nav();
