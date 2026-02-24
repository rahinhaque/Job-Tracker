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

// Empty state HTML
function getEmptyStateHTML() {
  return `
    <div class="flex flex-col items-center justify-center py-16 px-4">
      <div class="mb-4">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="40" height="48" rx="4" fill="#dbe6f6" stroke="#4c7de6" stroke-width="2"/>
          <rect x="16" y="16" width="24" height="3" rx="1.5" fill="#4c7de6"/>
          <rect x="16" y="23" width="24" height="3" rx="1.5" fill="#4c7de6"/>
          <rect x="16" y="30" width="24" height="3" rx="1.5" fill="#4c7de6"/>
          <rect x="16" y="37" width="16" height="3" rx="1.5" fill="#4c7de6"/>
        </svg>
      </div>
      <h3 class="text-[#1b2a4a] text-[18px] font-bold outfit mb-1">No jobs available</h3>
      <p class="text-gray-400 text-[14px]">Check back soon for new job opportunities</p>
    </div>
  `;
}

function calculateCount() {
  // Count only actual job cards (exclude empty state)
  const jobCards = allCardsSection.querySelectorAll(":scope > .bg-white");
  totalCount.innerText = jobCards.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // Show/hide empty state for allCards section
  const existingEmpty = allCardsSection.querySelector(".empty-state");
  if (jobCards.length === 0 && !existingEmpty) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className =
      "empty-state bg-white rounded-lg border border-gray-200 mb-4";
    emptyDiv.innerHTML = getEmptyStateHTML();
    allCardsSection.appendChild(emptyDiv);
  } else if (jobCards.length > 0 && existingEmpty) {
    existingEmpty.remove();
  }
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
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    allCardsSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderReject();
  }
}

//Main functionalities
mainContainer.addEventListener("click", function (event) {
  const target = event.target;

  // --- DELETE HANDLER ---
  if (
    target.classList.contains("btn-delete") ||
    target.closest(".btn-delete")
  ) {
    const parentNode = target.closest(".bg-white");
    if (!parentNode) return;
    const jobName = parentNode.querySelector(".jobName")?.innerText;

    // Check which section the card belongs to
    if (allCardsSection.contains(parentNode)) {
      // Delete from All Cards section
      parentNode.remove();
      // Also remove from interview/rejected lists if it exists there
      interviewList = interviewList.filter((item) => item.jobName !== jobName);
      rejectedList = rejectedList.filter((item) => item.jobName !== jobName);
    } else if (filterSection.contains(parentNode)) {
      // Check which filter is active and delete from the correct list
      if (interviewFilterButton.classList.contains("bg-[#4c7de6]")) {
        interviewList = interviewList.filter(
          (item) => item.jobName !== jobName,
        );
        renderInterview();
      } else if (rejectedFilterButton.classList.contains("bg-[#4c7de6]")) {
        rejectedList = rejectedList.filter((item) => item.jobName !== jobName);
        renderReject();
      }
    }
    calculateCount();
    return;
  }

  // --- INTERVIEW HANDLER ---
  if (target.classList.contains("interview-btn")) {
    const parentNode = target.parentNode.parentNode;
    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const jobArea = parentNode.querySelector(".area").innerText;
    const jobType = parentNode.querySelector(".type").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const cardInfo = {
      jobName,
      jobArea,
      jobTitle,
      jobType,
      status: "interviewed",
      notes,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }
    // Remove from rejected list if it was there
    rejectedList = rejectedList.filter((item) => item.jobName !== jobName);

    // Check where the click came from
    if (allCardsSection.contains(parentNode)) {
      // Clicked from All Cards — just update the badge, card stays
      const statusBadge = parentNode.querySelector(".job-status");
      statusBadge.innerText = "interviewed";
      statusBadge.classList.remove(
        "border-[#1b2a4a]",
        "bg-[#f0f4f8]",
        "text-[#1b2a4a]",
        "border-red-500",
        "bg-red-50",
        "text-red-600",
      );
      statusBadge.classList.add(
        "border-green-500",
        "bg-green-50",
        "text-green-600",
      );
    } else if (filterSection.contains(parentNode)) {
      // Clicked from Rejected filter — card disappears, re-render current view
      renderReject();
    }

    calculateCount();

    // --- REJECTED HANDLER ---
  } else if (target.classList.contains("rejected-btn")) {
    const parentNode = target.parentNode.parentNode;
    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const jobArea = parentNode.querySelector(".area").innerText;
    const jobType = parentNode.querySelector(".type").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const cardInfo = {
      jobName,
      jobArea,
      jobTitle,
      jobType,
      status: "Rejected",
      notes,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }
    // Remove from interview list if it was there
    interviewList = interviewList.filter((item) => item.jobName !== jobName);

    // Check where the click came from
    if (allCardsSection.contains(parentNode)) {
      // Clicked from All Cards — just update the badge, card stays
      const statusBadge = parentNode.querySelector(".job-status");
      statusBadge.innerText = "Rejected";
      statusBadge.classList.remove(
        "border-[#1b2a4a]",
        "bg-[#f0f4f8]",
        "text-[#1b2a4a]",
        "border-green-500",
        "bg-green-50",
        "text-green-600",
      );
      statusBadge.classList.add("border-red-500", "bg-red-50", "text-red-600");
    } else if (filterSection.contains(parentNode)) {
      // Clicked from Interview filter — card disappears, re-render current view
      renderInterview();
    }

    calculateCount();
  }
});

//Rendering interview Cards
function renderInterview() {
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className =
      "empty-state bg-white rounded-lg border border-gray-200 mb-4";
    emptyDiv.innerHTML = getEmptyStateHTML();
    filterSection.appendChild(emptyDiv);
    return;
  }

  for (let interview of interviewList) {
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

//rejected cards
function renderReject() {
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className =
      "empty-state bg-white rounded-lg border border-gray-200 mb-4";
    emptyDiv.innerHTML = getEmptyStateHTML();
    filterSection.appendChild(emptyDiv);
    return;
  }

  for (let reject of rejectedList) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-lg border border-gray-200 p-6 mb-4";
    div.innerHTML = `
      <div class="flex items-start justify-between mb-1">
            <h3 class="jobName text-[#1b2a4a] text-[16px] font-bold outfit">
              ${reject.jobName}
            </h3>
            <button
              class="btn-delete text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <i class="fa-regular fa-trash-can text-[16px]"></i>
            </button>
          </div>

          <!-- Job Title -->
          <p class="jobTitle text-gray-500 text-[14px] mb-3">
            ${reject.jobTitle}
          </p>

          <!-- Job Details Row -->
          <p class="text-gray-400 text-[13px] mb-4">
            <span class="area">${reject.jobArea}</span> &nbsp;•&nbsp;
            <span class="type">${reject.jobType}</span>
          </p>

          <!-- Status Badge -->
          <div class="mb-4">
            <span
              class="job-status inline-block border-l-[3px] border-red-500 bg-red-50 text-red-600 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-r-md uppercase"
            >
              ${reject.status}
            </span>
          </div>

          <!-- Description -->
          <p class="notes text-gray-500 text-[13px] leading-relaxed mb-5">
            ${reject.notes}
          </p>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button
              class="interview-btn border border-green-400 text-green-500 text-[12px] font-bold tracking-wider px-4 py-1.5 rounded-md uppercase cursor-pointer hover:bg-green-50 transition-colors"
            >
              Interview
            </button>
          </div>
    `;
    filterSection.appendChild(div);
  }
}
