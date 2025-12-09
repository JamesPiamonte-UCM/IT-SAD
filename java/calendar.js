// DOM references
const calendarDay = document.getElementById("calendar-day");
const calendarDate = document.getElementById("calendar-date");
const miniCalendar = document.getElementById("mini-calendar");

// Today's date
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Show today's info
calendarDay.textContent = dayNames[today.getDay()];
calendarDate.textContent = `${monthNames[month]} ${date}, ${year}`;

// Generate mini calendar
function generateCalendar(year, month) {
    miniCalendar.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty squares before day 1
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("empty");
        miniCalendar.appendChild(empty);
    }

    // Add days of the month
    for (let d = 1; d <= daysInMonth; d++) {
        const dayBox = document.createElement("div");
        dayBox.textContent = d;

        if (d === date) {
            dayBox.classList.add("today");
        }

        miniCalendar.appendChild(dayBox);
    }
}

generateCalendar(year, month);
document.getElementById("user-name").textContent = "John Doe"; // Sample dynamic name

