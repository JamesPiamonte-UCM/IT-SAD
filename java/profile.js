// ===== LOGIN CHECK =====
const loggedUser = localStorage.getItem("loggedUser");
if (!loggedUser) {
  window.location.href = "login.html";
}

// ===== Populate form with saved data =====
document.addEventListener("DOMContentLoaded", () => {
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const avatarPreview = document.getElementById("avatar-preview");

  // Load saved profile
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  if (profile.username) usernameField.value = profile.username;
  if (profile.email) emailField.value = profile.email;
  if (profile.password) passwordField.value = profile.password;
  if (profile.avatar) {
    avatarPreview.src = profile.avatar;
    avatarPreview.style.display = "block";
  }

  // Handle avatar preview
  document.getElementById("avatar").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarPreview.src = reader.result;
        avatarPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form save
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const profileData = {
      username: usernameField.value,
      email: emailField.value,
      password: passwordField.value,
      avatar: avatarPreview.src
    };

    localStorage.setItem("profile", JSON.stringify(profileData));
    document.getElementById("message").textContent = "✅ Profile updated successfully!";
    document.getElementById("message").style.color = "green";
  });
});

// ===== LOGOUT =====
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});
