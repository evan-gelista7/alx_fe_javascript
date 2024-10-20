let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
  { text: "In the middle of difficulty lies opportunity.", category: "Motivation" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText !== "" && newQuoteCategory !== "") {
    
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.style.marginTop = "20px";

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.id = "addQuoteBtn";
  addButton.textContent = "Add Quote";

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);

  addButton.addEventListener("click", addQuote);
}

document.addEventListener("DOMContentLoaded", function() {
  createAddQuoteForm();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
