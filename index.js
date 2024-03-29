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
    current_container.classList.remove("d-flex");
    next_container.classList.add("d-flex");
    selected.classList.remove("selected");
    this.classList.add("selected");
  }
}

function _handleListChange(ev) {
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
    page.querySelector("h3").innerHTML = ucfirst(
      event.target.dataset.type.replace("-", " ")
    );
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
  var html = `<ul id='${item.type
    .toLowerCase()
    .replace(" ", "-")}' class='data-list skill-list' ${style}>`;

  var response = item.list.map(function (data) {
    fav_class = "class='item-li'";
    if (data.favourite) {
      fav_class = "class='item-li favourite'";
    }

    if (data.href) {
      response = `<li ${fav_class}> <a href="${data.href}">${data.name}</a> <div class='item-details-list-holder'><ul>`;
    } else {
      response = `<li ${fav_class}> <span  class='item-span'>${data.name}</span><div class='item-details-list-holder'><ul>`;
    }
    Array.from(data.details).forEach(function (elem) {
      if (data.level !== undefined) {
        response += `<li>`;
        for (i = 0; i < 5; i++) {
          if (i < data.level) {
            response += `<div class='hexagon filled-hexagon'></div>`;
          } else {
            response += `<div class='hexagon'></div>`;
          }
        }
        response += `<span>${elem}</span>`;
        response += `</li>`;
      } else {
        response += `<li>${elem}</li>`;
      }
    });
    response += "</ul></div>";

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
    return `<li ${menu_class} data-type='${item.type.toLowerCase().replace(" ", "-")}'>${item.type}</li>`;
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

  var first_main = items.find((itm) => {
    if (itm.main !== undefined) {
      return itm;
    }
  });
  page_list_section.querySelector("h3").innerHTML = first_main.type;

  page_menu_section.innerHTML += create_menu_for_items(items);

  items.forEach(function (category) {
    page_list_section.innerHTML += create_list_for_item(category);
  });
}

async function get_about() {
  var content = await fetch_json("./data/about.json");
  let about_section = $("#about section:first-child");
  let info_section = $("#about section:last-child");
  content.forEach(function (item) {
    switch (item.type) {
      case "about":
        about_section.innerHTML += `<h2>${ucfirst(
          item.type.replace("-", " ")
        )}</h2>`;
        item.list.forEach(function (li) {
          about_section.innerHTML += `<p>${li}</p>`;
        });
        break;

      case "basic-info":
        info_section.innerHTML += `<h2>${ucfirst(
          item.type.replace("-", " ")
        )}</h2>`;
        var html = "<table><tbody>";

        for (var info in item.list) {
          var row = `<tr><td class="info-key">${ucfirst(
            info
          )}:</td><td class="info-value">${item.list[info]}</td></tr>`;
          html += row;
        }

        html += "</table></tbody>";
        info_section.innerHTML += html;
        break;

      case "social-platforms":
        info_section.innerHTML += `<h2>${ucfirst(
          item.type.replace("-", " ")
        )}</h2>`;

        var html = "<div class='social-buttons'>";
        item.list.forEach(function (itm) {
          html += `<a href='${itm.link}'> <i class='${itm.icon}'></i> ${itm.link}</a>`;
        });
        html += "</div>";
        info_section.innerHTML += html;
        break;
    }
  });
}

get_about();
get_from_json("skills");
get_from_json("projects");
get_from_json("languages");
get_from_json("education");
nav();
