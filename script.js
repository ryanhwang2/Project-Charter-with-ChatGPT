// Collapsible Sections
document.querySelectorAll(".collapsible").forEach(header => {
  header.addEventListener("click", () => {
    const section = header.parentElement;
    const content = section.querySelector(".section-content");
    section.classList.toggle("open");
    if (section.classList.contains("open")) {
      content.style.display = "block";
      header.querySelector(".toggle-icon").textContent = "−";
    } else {
      content.style.display = "none";
      header.querySelector(".toggle-icon").textContent = "+";
    }
  });
});

// Sidebar Active Link Highlight + Smooth Scroll
const navLinks = document.querySelectorAll("#nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      document.getElementById("breadcrumb").innerHTML =
        `<i class="fas fa-home"></i> You are in: ${link.textContent}`;
    }
  });

  // Progress bar update
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

// Sidebar Search
document.querySelector(".sidebar-search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  navLinks.forEach(link => {
    if (link.textContent.toLowerCase().includes(query)) {
      link.parentElement.style.display = "block";
    } else {
      link.parentElement.style.display = "none";
    }
  });
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Charts
document.addEventListener("DOMContentLoaded", () => {
  const budgetCtx = document.getElementById("budgetChart");
  if (budgetCtx) {
    new Chart(budgetCtx, {
      type: "pie",
      data: {
        labels: ["Labor", "Software/Equipment", "Materials", "Services"],
        datasets: [{
          data: [0, 370, 75, 0],
          backgroundColor: ["#81c784", "#4caf50", "#66bb6a", "#388e3c"]
        }]
      }
    });
  }

  const riskCtx = document.getElementById("riskChart");
  if (riskCtx) {
    new Chart(riskCtx, {
      type: "bar",
      data: {
        labels: ["Exam Scheduling", "Workload", "Budget", "Delays"],
        datasets: [{
          label: "Risk Level",
          data: [3, 4, 2, 3],
          backgroundColor: "#4caf50"
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 5 }
        }
      }
    });
  }
});
