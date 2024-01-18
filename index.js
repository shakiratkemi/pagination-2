const names = [];
let namesPerPage = 5;
let currentPage = 1;
updatePagination();

function showNames() {
  const showInput = document.querySelector("#page");
  let textInput = showInput.value.trim();
  if (textInput !== "") {
    names.push(textInput);
    showInput.value = "";
    renderNames();
  }
}

const addName = document.querySelector(".addName");
addName.addEventListener("click", showNames);

function renderNames() {
  let nameList = document.querySelector("ul");
  let pageInfoParagraph = document.querySelector(".page-info");
  if (!pageInfoParagraph) {
    pageInfoParagraph = document.createElement("p");
    pageInfoParagraph.className = "page-info";
    document.body.insertBefore(pageInfoParagraph, nameList);
  }

  pageInfoParagraph.innerHTML = `Showing Page ${currentPage} of ${Math.ceil(
    names.length / namesPerPage
  )}`;

  nameList.innerHTML = "";

  const startIndex = (currentPage - 1) * namesPerPage;
  const endIndex = startIndex + namesPerPage;
  const displayedNames = names.slice(startIndex, endIndex);

  for (let i = 0; i < displayedNames.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = displayedNames[i];
    nameList.appendChild(listItem);
  }
  updatePagination();
}

function nextPage() {
  currentPage++;
  renderNames();
}

function prevPage() {
  currentPage--;
  renderNames();
}

function updatePagination() {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  if (currentPage > 1) {
    prev.style.display = "inline-block";
  } else {
    prev.style.display = "none";
  }

  if (currentPage * namesPerPage < names.length) {
    next.style.display = "inline-block";
  } else {
    next.style.display = "none";
  }
}

const prev = document.querySelector(".prev");
prev.addEventListener("click", prevPage);
const next = document.querySelector(".next");
next.addEventListener("click", nextPage);
