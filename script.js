var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var settingsButton = document.querySelector("#settingsButton");
var settingsPanel = document.querySelector("#settingsPanel");
var wallpaperSelect = document.querySelector("#wallpaperSelect");
var widgetToggle = document.querySelector("#widgetToggle");
var accentButtons = Array.from(document.querySelectorAll(".settings-color"));
var widgetsPanel = document.querySelector("#widgetsPanel");
var clockDisplay = document.querySelector("#clockDisplay");
var dateDisplay = document.querySelector("#dateDisplay");
var calendarGrid = document.querySelector("#calendarGrid");
var calendarMonth = document.querySelector("#calendarMonth");
var calendarYear = document.querySelector("#calendarYear");
var quoteText = document.querySelector("#quoteText");
var quoteAuthor = document.querySelector("#quoteAuthor");
var body = document.body;

var quotes = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Small steps every day lead to big changes.", author: "Polo OS" },
  { text: "A calm mind can build extraordinary things.", author: "Kermit" },
  { text: "Design is not just what it looks like, but how it works.", author: "Steve Jobs" }
];

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "block";
}

function updateWidgets() {
  var now = new Date();
  clockDisplay.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  dateDisplay.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  calendarMonth.textContent = now.toLocaleDateString([], { month: "long" });
  calendarYear.textContent = now.getFullYear();

  var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  var firstDay = monthStart.getDay();
  var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  calendarGrid.innerHTML = "";

  var weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  weekdays.forEach(function(day) {
    var weekday = document.createElement("span");
    weekday.className = "calendar-weekday";
    weekday.textContent = day;
    calendarGrid.appendChild(weekday);
  });

  for (var i = 0; i < firstDay; i++) {
    var empty = document.createElement("span");
    empty.className = "calendar-day";
    empty.textContent = "";
    calendarGrid.appendChild(empty);
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var dateCell = document.createElement("span");
    dateCell.className = "calendar-day" + (d === now.getDate() ? " today" : "");
    dateCell.textContent = d;
    calendarGrid.appendChild(dateCell);
  }

  var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = '"' + randomQuote.text + '"';
  quoteAuthor.textContent = "— " + randomQuote.author;
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

settingsButton.addEventListener("click", function() {
  settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
});

wallpaperSelect.addEventListener("change", function() {
  var selected = wallpaperSelect.value;
  if (selected.startsWith("linear-gradient")) {
    body.style.backgroundImage = selected;
  } else {
    body.style.backgroundImage = "url('" + selected + "')";
  }
});

widgetToggle.addEventListener("change", function() {
  widgetsPanel.style.display = widgetToggle.value === "show" ? "flex" : "none";
});

accentButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var accent = button.getAttribute("data-accent");
    document.documentElement.style.setProperty("--accent", accent);
    document.querySelector("#topbar").style.borderBottomColor = accent;
    document.querySelector("#welcome").style.borderColor = accent;
    document.querySelector("#welcome h1").style.color = accent;
    document.querySelector("#welcome p").style.color = accent;
  });
});

updateWidgets();
setInterval(updateWidgets, 1000);

dragElement(document.getElementById("welcome"));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = drag;
  }

  function drag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function updateTime() {
  var currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  var timeText = document.querySelector("#timeElement");
  if (timeText) {
    timeText.innerHTML = currentTime;
  }
}

setInterval(updateTime, 1000);
