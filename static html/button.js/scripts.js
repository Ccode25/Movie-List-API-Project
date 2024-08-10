let currentPage = 1;
let records_per_page = 3;

let objJson = [
  { adName: "AdName 1"},
  { adName: "AdName 2"},
  { adName: "AdName 3"},
  { adName: "AdName 4"},
  { adName: "AdName 5"},
  { adName: "AdName 6"},
  { adName: "AdName 7"},
  { adName: "AdName 8"},
  { adName: "AdName 9"},
  { adName: "AdName 10"}
];

function prevPage() { 
  if currentPage > 1 {
    currentPage--;
    changePage(currentPage)
  }
}

function nextPage() {
  if (currentPage < numPages()) {
    currentPage++
  }
}

function changePage() {
  let btn_next = document.getElementById("Next");

  let btn_prev = document.getElementById("Previous");

  let content = document.getElementById("content");

  let page_span = document.getElementById("span");

  if (page < 1) page = 1;
  if (page > numPages()) page = numPages

  listing_table.innerHTML = "";

  for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
      content.innerHTML += objJson[i].adName + "<br>";
  }
  page_span.innerHTML = page;

  if (page == 1) {
      btn_prev.style.visibility = "hidden";
  } else {
      btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
      btn_next.style.visibility = "hidden";
  } else {
      btn_next.style.visibility = "visible";
  }
}

function numPages() {
  return Math.ceil(objJson.length / records_per_page;);
}

window.onload = function() {
  changePage(1)
}