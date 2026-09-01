const deadline = new Date("2026-08-31T23:59:59+05:30");

function updateCountdown(){
  const now = new Date();
  let diff = deadline - now;
  const message = document.getElementById("deadlineMessage");

  if(diff <= 0){
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    message.innerHTML = "<strong>The 31 August 2026 standard deadline has passed.</strong> Check the applicable late-filing rules or contact a tax professional.";
    return;
  }

  const s = Math.floor(diff/1000);
  document.getElementById("days").textContent = String(Math.floor(s/86400)).padStart(2,"0");
  document.getElementById("hours").textContent = String(Math.floor((s%86400)/3600)).padStart(2,"0");
  document.getElementById("minutes").textContent = String(Math.floor((s%3600)/60)).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s%60).padStart(2,"0");
  message.textContent = "Time remaining until the displayed due date:";
}
updateCountdown();
setInterval(updateCountdown,1000);

document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".form-panel").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const checks = [...document.querySelectorAll('.checklist-card input[type="checkbox"]')];
function updateProgress(){
  const done = checks.filter(c=>c.checked).length;
  const pct = Math.round(done/checks.length*100);
  document.getElementById("progress").style.width = pct+"%";
  document.getElementById("progressText").textContent = pct+"% complete";
}
checks.forEach(c=>c.addEventListener("change",updateProgress));

document.querySelectorAll(".compare-row-label").forEach(button=>{
  button.addEventListener("click",()=>{
    const rowStart = button;
    const rowIndex = [...button.parentElement.children].indexOf(rowStart);
    const grid = button.parentElement;
    const cells = grid.children;
    for(let i=0;i<cells.length;i++) cells[i].classList.remove("selected");
    button.classList.add("selected");
    if(cells[rowIndex+1]) cells[rowIndex+1].classList.add("selected");
    if(cells[rowIndex+2]) cells[rowIndex+2].classList.add("selected");
  });
});
