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
const filterSection = document.getElementById("filtered-section");

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

  if (id === "all-filter-btn") {
    allCardsSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id === "interview-filter-btn") {
    allCardsSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
  } else if (id === "rejected-filter-btn") {
    allCardsSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
  }
}

//Main functionalities
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const jobArea = parentNode.querySelector(".area").innerText;
    const jobType = parentNode.querySelector(".type").innerText;
    const status = parentNode.querySelector(".job-status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const cardInfo = {
      jobName,
      jobArea,
      jobTitle,
      jobType,
      status,
      notes,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );
    parentNode.querySelector(".job-status").innerText = "interviewed";
    if (!jobExist) {
      interviewList.push(cardInfo);
    }
    renderInterview();
  }
});

//Rendering interview Cards
function renderInterview() {
  filterSection.innerHTML = "";

  for (let interview of interviewList) {
    console.log(interview);
    let div = document.createElement("div");
    div.className = "bg-white rounded-lg border border-gray-200 p-6 mb-4";
    div.innerHTML = `
      <div class="flex items-start justify-between mb-1">
            <h3 class="jobName text-[#1b2a4a] text-[16px] font-bold outfit">
              ${interview.jobName}
            </h3>
            <button
              class="btn-delete text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <i class="fa-regular fa-trash-can text-[16px]"></i>
            </button>
          </div>

          <!-- Job Title -->
          <p class="jobTitle text-gray-500 text-[14px] mb-3">
            ${interview.jobTitle}
          </p>

          <!-- Job Details Row -->
          <p class="text-gray-400 text-[13px] mb-4">
            <span class="area">${interview.jobArea}</span> &nbsp;•&nbsp;
            <span class="type">${interview.jobType}</span>
          </p>

          <!-- Status Badge -->
          <div class="mb-4">
            <span
              class="job-status inline-block border-l-[3px] border-green-500 bg-green-50 text-green-600 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-r-md uppercase"
            >
              ${interview.status}
            </span>
          </div>

          <!-- Description -->
          <p class="notes text-gray-500 text-[13px] leading-relaxed mb-5">
            ${interview.notes}
          </p>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button
              class="rejected-btn border border-red-300 text-red-400 text-[12px] font-bold tracking-wider px-4 py-1.5 rounded-md uppercase cursor-pointer hover:bg-red-50 transition-colors"
            >
              Rejected
            </button>
          </div>
    `;
    filterSection.appendChild(div);
  }
}
