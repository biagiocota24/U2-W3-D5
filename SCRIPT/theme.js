const themeSchalter = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("theme") || "dark";
document.getElementsByTagName("body")[0].setAttribute("data-bs-theme", currentTheme);
if (currentTheme === "dark") {
  themeSchalter.innerText = "☀️ Light";
} else {
  themeSchalter.innerText = "🌙 Dark";
}

themeSchalter.addEventListener("click", function () {
  const current = document.getElementsByTagName("body")[0].getAttribute("data-bs-theme");
  let nextTheme = "";
  if (current === "dark") {
    nextTheme = "light";
  } else {
    nextTheme = "dark";
  }
  document.getElementsByTagName("body")[0].setAttribute("data-bs-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeSchalter.textContent = nextTheme === "dark" ? "☀️ Light" : "🌙 Dark";
});

const fullDate = new Date();
const year = fullDate.getFullYear();
const day = fullDate.getDate();
const month = fullDate.getMonth() + 1;

let pad = function (n) {
  if (n < 10) {
    return (pad = `0${n}`);
  } else {
    return n;
  }
};
const today = `${pad(day)}/${pad(month)}/${year}`;
document.getElementById("data-footer").innerText = today;



const showToast = function (message) {
  document.getElementById("toast-message").innerText = message;
  const toast = new bootstrap.Toast(document.getElementById("myToast") ,{delay: 1500}) 
  toast.show();
};
