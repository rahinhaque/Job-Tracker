
let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
const allCardsSection = document.getElementById("allCards");
function calculateCount(){
   totalCount.innerText = allCardsSection.children.length;
}
calculateCount();

