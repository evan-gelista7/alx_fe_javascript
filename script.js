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

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  