let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterButton = document.getElementById("all-filter-btn");
const interviewFilterButton = document.getElementById("interview-filter-btn");
const rejectedFilterButton = document.getElementById("rejected-filter-btn");

const allCardsSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
console.log(mainContainer);

function calculateCount() {
  totalCount.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// btn toggleing
function toggleStyle(id) {
  allFilterButton.classList.remove("bg-[#4c7de6]", "text-white");
  interviewFilterButton.classList.remove("bg-[#4c7de6]", "text-white");
  rejectedFilterButton.classList.remove("bg-[#4c7de6]", "text-white");

  allFilterButton.classList.add("bg-white", "text-gray-500");
  interviewFilterButton.classList.add("bg-white", "text-gray-500");
  rejectedFilterButton.classList.add("bg-white", "text-gray-500");

  // Apply active style to the clicked button
  const activeButton = document.getElementById(id);
  activeButton.classList.remove("bg-white", "text-gray-500");
  activeButton.classList.add("bg-[#4c7de6]", "text-white");
}
