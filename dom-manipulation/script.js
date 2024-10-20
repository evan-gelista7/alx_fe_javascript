const API_URL = "https://jsonplaceholder.typicode.com/posts";

let quotes = [];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        category: "Inspiration",
      },
      {
        text: "Success is not the key to happiness. Happiness is the key to success.",
        category: "Happiness",
      },
      {
        text: "In the middle of difficulty lies opportunity.",
        category: "Motivation",
      },
    ];
    saveQuotes();
  }
}

function notifyUser(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.backgroundColor = "#f9c2c2";
  notification.style.padding = "10px";
  notification.style.margin = "10px 0";
  notification.style.border = "1px solid #d9534f";
  document.body.prepend(notification);
  setTimeout(() => notification.remove(), 5000);
}

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
  } else {
    quoteDisplay.innerHTML = "No quotes available for this category.";
  }
  localStorage.setItem("lastSelectedCategory", selectedCategory);
}

function loadLastSelectedCategory() {
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    document.getElementById("categoryFilter").value = lastSelectedCategory;
    filterQuotes();
  }
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText !== "" && newQuoteCategory !== "") {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };

    quotes.push(newQuote);
    saveQuotes();
    populateCategories();

    postQuoteToServer(newQuote);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    if (!response.ok) {
      throw new Error("Failed to post quote to server.");
    }

    const data = await response.json();
    console.log("Quote posted to server:", data);
    return data;
  } catch (error) {
    console.error("Error posting quote:", error);
    return null;
  }
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const serverQuotes = data.map(item => ({
      text: item.title,
      category: "General",
    }));
    return serverQuotes;
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes && serverQuotes.length > 0) {
    let hasConflict = false;
    const updatedQuotes = [...quotes];

    serverQuotes.forEach(serverQuote => {
      const existingQuote = quotes.find(q => q.text === serverQuote.text);
      if (!existingQuote) {
        updatedQuotes.push(serverQuote);
      } else {
        hasConflict = true;
      }
    });

    quotes = updatedQuotes;
    saveQuotes();
    populateCategories();

    if (hasConflict) {
      notifyUser("Data has been updated from the server. Conflicts resolved.");
    }
  }
}

setInterval(syncWithServer, 10000);

function showRandomQuote() {
  filterQuotes();
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuotes();
  populateCategories();
  loadLastSelectedCategory();

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document
    .getElementById("exportQuotes")
    .addEventListener("click", exportQuotesToJson);
  document
    .getElementById("importFile")
    .addEventListener("change", importFromJsonFile);
});
