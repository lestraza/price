const form = document.getElementById("form");
const adminAuth = {
    login: "admin",
    password: "123",
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const login = form.querySelector(".login").value;
    const password = form.querySelector(".password").value;
    if(login === adminAuth.login && password === adminAuth.password) {
        localStorage.setItem("token", "NHGFnjhfgfht75uhfy6RHNfHYRyt6r");
        window.location.href = "/js/price/index.html";
    } else {
        alert("Try again");
    }
})
