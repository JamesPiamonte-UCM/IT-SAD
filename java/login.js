document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            showMessage("Please fill in all fields.", "error");
            return;
        }

        // ✅ Fake login (you can replace with real backend later)
        if (username === "Admer" && password === "otenniolbido") {
            showMessage("Login successful! Redirecting...", "success");

            // ✅ Save session
            localStorage.setItem("loggedUser", username);

            setTimeout(() => {
                window.location.href = "Home.html";
            }, 1000);
        } else {
            showMessage("Incorrect username or password.", "error");
        }
    });
});

function showMessage(msg, type) {
    let msgBox = document.getElementById("message");

    if (!msgBox) {
        msgBox = document.createElement("p");
        msgBox.id = "message";
        document.querySelector(".login-box").appendChild(msgBox);
    }

    msgBox.textContent = msg;
    msgBox.style.color = type === "error" ? "red" : "green";
    msgBox.style.marginTop = "10px";
    msgBox.style.fontWeight = "bold";
}
