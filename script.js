var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var settingsButton = document.querySelector("#settingsButton");
var settingsPanel = document.querySelector("#settingsPanel");
var settingsClose = document.querySelector("#settingsclose");
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

var calcIcon = document.querySelector(".calculator");
var calcApp = document.querySelector("#calculatorApp");
var calcDisplay = document.querySelector("#calcDisplay");
var calcValue = "0";
var calcStored = null;
var calcOp = null;
var calcNewNumber = true;

var galleryIcon = document.querySelector(".gallery");
var galleryApp = document.querySelector("#galleryApp");
var galleryAppClose = document.querySelector("#galleryAppclose");

var finderIcon = document.querySelector(".finder");
var finderApp = document.querySelector("#finderApp");
var finderAppClose = document.querySelector("#finderAppclose");

var safariIcon = document.querySelector(".safari");
var safariApp = document.querySelector("#safariApp");
var safariAppClose = document.querySelector("#safariAppclose");
var safariUrl = document.querySelector("#safariUrl");
var safariFrame = document.querySelector("#safariFrame");

var mailIcon = document.querySelector(".mail");
var mailApp = document.querySelector("#mailApp");
var mailAppClose = document.querySelector("#mailAppclose");

var notesIcon = document.querySelector(".notes");
var notesApp = document.querySelector("#notesApp");
var notesAppClose = document.querySelector("#notesAppclose");
var notesArea = document.querySelector("#notesArea");

var quotes = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Small steps every day lead to big changes.", author: "Polo OS" },
  { text: "A calm mind can build extraordinary things.", author: "Kermit" },
  { text: "Design is not just what it looks like, but how it works.", author: "Steve Jobs" },
  { text: "Be more polo", author: "Polo" }
];

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  if (element.id === "kermitAiApp") {
    element.style.display = "flex";
  } else {
    element.style.display = "block";
  }
}

function updateCalc() {
  if (calcDisplay) calcDisplay.textContent = calcValue;
}
function performCalc() {
  if (calcStored === null || calcOp === null) return;
  var a = parseFloat(calcStored);
  var b = parseFloat(calcValue);
  var res = 0;
  if (calcOp === "+") res = a + b;
  if (calcOp === "-") res = a - b;
  if (calcOp === "*") res = a * b;
  if (calcOp === "/") res = b !== 0 ? a / b : "Error";
  calcValue = String(res);
  calcStored = null;
  calcOp = null;
  calcNewNumber = true;
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
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

  var todayStr = now.toDateString();
  var savedQuoteDate = localStorage.getItem("poloOS_quoteDate");
  var savedQuoteIndex = localStorage.getItem("poloOS_quoteIndex");

  var quoteIndex;
  if (savedQuoteDate !== todayStr) {
    if (!savedQuoteDate) {
      quoteIndex = 4; // "Be more polo"
    } else {
      quoteIndex = Math.floor(Math.random() * quotes.length);
    }
    localStorage.setItem("poloOS_quoteDate", todayStr);
    localStorage.setItem("poloOS_quoteIndex", quoteIndex);
  } else {
    quoteIndex = parseInt(savedQuoteIndex, 10);
  }

  var dailyQuote = quotes[quoteIndex];
  if (quoteText.textContent !== '"' + dailyQuote.text + '"') {
    quoteText.textContent = '"' + dailyQuote.text + '"';
    quoteAuthor.textContent = "— " + dailyQuote.author;
  }

  if (ytPlayer && ytPlayer.getCurrentTime && widgetCurrentTime && widgetDuration) {
    var currentTime = ytPlayer.getCurrentTime();
    var duration = ytPlayer.getDuration();
    if (duration > 0) {
      widgetCurrentTime.textContent = formatTime(currentTime);
      widgetDuration.textContent = "-" + formatTime(duration - currentTime);
      var progress = (currentTime / duration) * 100;
      widgetProgressBar.style.width = progress + "%";
    }
  }
}



if (galleryIcon) { galleryIcon.addEventListener("click", function() { openWindow(galleryApp); }); }
if (finderIcon) { finderIcon.addEventListener("click", function() { openWindow(finderApp); }); }
if (safariIcon) { safariIcon.addEventListener("click", function() { openWindow(safariApp); }); }
if (mailIcon) { mailIcon.addEventListener("click", function() { openWindow(mailApp); }); }
if (notesIcon) { notesIcon.addEventListener("click", function() { openWindow(notesApp); }); }

if (calcIcon) {
  calcIcon.addEventListener("click", function() {
    openWindow(calcApp);
  });
}

document.querySelectorAll(".calc-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var val = btn.getAttribute("data-val");
    if (val === "C") {
      calcValue = "0";
      calcStored = null;
      calcOp = null;
      calcNewNumber = true;
    } else if (val === "+/-") {
      calcValue = String(parseFloat(calcValue) * -1);
    } else if (val === "%") {
      calcValue = String(parseFloat(calcValue) / 100);
    } else if (["+", "-", "*", "/"].includes(val)) {
      if (calcOp !== null && !calcNewNumber) performCalc();
      calcStored = calcValue;
      calcOp = val;
      calcNewNumber = true;
    } else if (val === "=") {
      performCalc();
    } else {
      if (calcNewNumber) {
        calcValue = val === "." ? "0." : val;
        calcNewNumber = false;
      } else {
        if (val === "." && calcValue.includes(".")) return;
        calcValue += val;
      }
    }
    updateCalc();
  });
});



settingsButton.addEventListener("click", function() {
  if (settingsPanel.style.display === "none") {
    openWindow(settingsPanel);
  } else {
    closeWindow(settingsPanel);
  }
});

var wallpaperButtons = document.querySelectorAll(".wallpaper-item");
wallpaperButtons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    var selected = btn.getAttribute("data-wallpaper");
    if (selected.startsWith("linear-gradient")) {
      body.style.backgroundImage = selected;
    } else {
      body.style.backgroundImage = "url('" + selected + "')";
    }
    
    // Update active border
    wallpaperButtons.forEach(function(b) { b.style.borderColor = "transparent"; });
    btn.style.borderColor = "var(--accent)";
  });
});

var widgetShowBtn = document.querySelector("#widgetShowBtn");
var widgetHideBtn = document.querySelector("#widgetHideBtn");
if (widgetShowBtn && widgetHideBtn) {
  widgetShowBtn.addEventListener("click", function() {
    widgetsPanel.style.display = "flex";
    widgetShowBtn.style.background = "#eee";
    widgetHideBtn.style.background = "transparent";
  });
  widgetHideBtn.addEventListener("click", function() {
    widgetsPanel.style.display = "none";
    widgetHideBtn.style.background = "#eee";
    widgetShowBtn.style.background = "transparent";
  });
}

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
if (document.getElementById("calculatorApp")) dragElement(document.getElementById("calculatorApp"));
if (document.getElementById("settingsPanel")) dragElement(document.getElementById("settingsPanel"));
if (document.getElementById("galleryApp")) dragElement(document.getElementById("galleryApp"));
if (document.getElementById("finderApp")) dragElement(document.getElementById("finderApp"));
if (document.getElementById("safariApp")) dragElement(document.getElementById("safariApp"));
if (document.getElementById("mailApp")) dragElement(document.getElementById("mailApp"));
if (document.getElementById("notesApp")) dragElement(document.getElementById("notesApp"));


// Finder Easter Eggs
var fileSecretPlan = document.getElementById("fileSecretPlan");
var fileTodo = document.getElementById("fileTodo");
var finderEasterEgg = document.getElementById("finderEasterEgg");
var closeEasterEgg = document.getElementById("closeEasterEgg");

if (fileSecretPlan && finderEasterEgg) {
  fileSecretPlan.addEventListener("click", function() {
    finderEasterEgg.style.display = "flex";
  });
}
if (fileTodo && finderEasterEgg) {
  fileTodo.addEventListener("click", function() {
    finderEasterEgg.style.display = "flex";
  });
}
if (closeEasterEgg) {
  closeEasterEgg.addEventListener("click", function() {
    finderEasterEgg.style.display = "none";
  });
}

// Gallery Context Menu
var galleryGrid = document.getElementById("galleryGrid");
var contextMenu = document.getElementById("contextMenu");
var setWallpaperBtn = document.getElementById("setWallpaperBtn");
var selectedImgSrc = "";

if (galleryGrid) {
  var galleryImgs = galleryGrid.querySelectorAll("img");
  galleryImgs.forEach(function(img) {
    img.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      selectedImgSrc = img.src;
      contextMenu.style.display = "block";
      contextMenu.style.left = e.pageX + "px";
      contextMenu.style.top = e.pageY + "px";
    });
  });
}

document.addEventListener("click", function() {
  if (contextMenu) contextMenu.style.display = "none";
});

if (setWallpaperBtn) {
  setWallpaperBtn.addEventListener("click", function() {
    body.style.backgroundImage = "url('" + selectedImgSrc + "')";
  });
}

// Mail App Logic
var mailItems = document.querySelectorAll(".mail-item");
var mailSubject = document.getElementById("mailSubject");
var mailSender = document.getElementById("mailSender");
var mailBody = document.getElementById("mailBody");

var emails = {
  piggy: {
    subject: "Where are you?!",
    sender: "From: Miss Piggy <miss.piggy@muppets.com>",
    body: "Kermie,<br><br>I've been waiting at the restaurant for 45 minutes! You better have a good excuse this time or else! Hiiii-yah!<br><br>Love,<br>Miss Piggy"
  },
  fozzie: {
    subject: "Waka Waka!",
    sender: "From: Fozzie Bear <fozzie@muppets.com>",
    body: "Hey Kermit!<br><br>Why did the frog take the bus to work today?<br><br>His car got toad!<br><br>Waka Waka!"
  },
  gonzo: {
    subject: "Need chickens",
    sender: "From: Gonzo <gonzo.the.great@muppets.com>",
    body: "Kermit, <br><br>The cannon is ready. I just need 12 more chickens for the finale. Can you approve the budget?<br><br>Gonzo"
  },
  lipton: {
    subject: "Ad Opportunity",
    sender: "From: Lipton Tea <marketing@lipton.com>",
    body: "Hi Kermit,<br><br>We'd like you to come over and film a commercial with us! Let us know if you're interested.<br><br>Best,<br>Lipton"
  }
};

mailItems.forEach(function(item) {
  item.addEventListener("click", function() {
    mailItems.forEach(function(i) {
      i.style.background = "transparent";
      i.querySelector("div").style.color = "#333";
    });
    item.style.background = "#f0fdf4";
    item.querySelector("div").style.color = "#166534";
    
    var id = item.getAttribute("data-id");
    if (emails[id]) {
      mailSubject.textContent = emails[id].subject;
      mailSender.textContent = emails[id].sender;
      mailBody.innerHTML = emails[id].body;
    }
  });
});

if (safariUrl && safariFrame) {
  safariUrl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      var url = safariUrl.value;
      if (!url.startsWith("http")) url = "https://" + url;
      safariFrame.src = url;
    }
  });
}

if (notesArea) {
  var savedNotes = localStorage.getItem("poloOS_notes");
  if (savedNotes) {
    notesArea.value = savedNotes;
  }
  notesArea.addEventListener("input", function() {
    localStorage.setItem("poloOS_notes", notesArea.value);
  });
}

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  var header = element.querySelector('.drag-handle');
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.id.endsWith('close') || e.target.id.endsWith('minimize') || e.target.id.endsWith('maximize')) return;
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

setInterval(function() {
  updateTime();
  updateWidgets();
}, 1000);
updateWidgets();

// Initialize dragging for all glass windows and widget cards
document.querySelectorAll(".glass-window, .widget-card").forEach(function(win) {
  dragElement(win);
  if (win.classList.contains("glass-window")) {
    var closeBtn = win.querySelector("div[id$='close']");
    var minBtn = win.querySelector("div[id$='minimize']");
    var maxBtn = win.querySelector("div[id$='maximize']");
    
    if (closeBtn) {
      closeBtn.addEventListener("click", function() {
        closeWindow(win);
      });
    }
    if (minBtn) {
      minBtn.addEventListener("click", function() {
        closeWindow(win);
      });
    }
    if (maxBtn) {
      maxBtn.addEventListener("click", function() {
        if (win.dataset.maximized === "true") {
          win.dataset.maximized = "false";
          win.style.top = win.dataset.origTop;
          win.style.left = win.dataset.origLeft;
          win.style.width = win.dataset.origWidth;
          win.style.height = win.dataset.origHeight;
        } else {
          win.dataset.origTop = win.style.top;
          win.dataset.origLeft = win.style.left;
          win.dataset.origWidth = win.style.width;
          win.dataset.origHeight = win.style.height;
          win.dataset.maximized = "true";
          win.style.top = "28px";
          win.style.left = "0";
          win.style.width = "100%";
          win.style.height = "calc(100vh - 28px)";
        }
      });
    }
  }
});

// Kermit AI Logic
var kermitAiIcon = document.querySelector(".kermit-ai");
var kermitAiApp = document.querySelector("#kermitAiApp");
var kermitAiAppClose = document.querySelector("#kermitAiAppclose");
var kermitAiInput = document.querySelector("#kermitAiInput");
var kermitAiSendBtn = document.querySelector("#kermitAiSendBtn");
var kermitAiHistory = document.querySelector("#kermitAiHistory");

if(kermitAiIcon && kermitAiApp) {
  var siriGlow = document.querySelector("#siriGlow");
  kermitAiIcon.addEventListener("click", function() {
    if (kermitAiApp.style.display === "none") {
      kermitAiApp.style.display = "block";
      if (siriGlow) siriGlow.style.display = "block";
      kermitAiHistory.style.display = "block";
      kermitAiHistory.innerText = "Hi ho! Kermit the Frog here! What can I help you with?";
    } else {
      kermitAiApp.style.display = "none";
      if (siriGlow) siriGlow.style.display = "none";
    }
  });
  
  function setSpeechText(text) {
    kermitAiHistory.style.display = "block";
    kermitAiHistory.innerText = text;
    // Retrigger animation
    kermitAiHistory.style.animation = 'none';
    kermitAiHistory.offsetHeight; /* trigger reflow */
    kermitAiHistory.style.animation = null; 
  }

  async function handleSend() {
    var val = kermitAiInput.value.trim();
    if (!val) return;
    
    kermitAiInput.value = "";
    setSpeechText("Hmm, let me think about that...");

    try {
      var prompt = "respond as kermit the frog from the muppets: " + val;
      var response = await fetch("/api/chat?prompt=" + encodeURIComponent(prompt));
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      var text = await response.text();
      setSpeechText(text);
    } catch (e) {
      setSpeechText("Sorry, my connection to the swamp is a bit weak right now. Try again later!");
    }
  }

  kermitAiSendBtn.addEventListener("click", handleSend);
  kermitAiInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleSend();
  });
}
