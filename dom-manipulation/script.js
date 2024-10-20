function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();
  URL.revokeObjectURL(url); 
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes); 
    saveQuotes(); 
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

document.addEventListener("DOMContentLoaded", function() {
  loadQuotes();
  createAddQuoteForm();

  loadLastViewedQuote();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportQuotesToJson);
  document.body.appendChild(exportButton);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  document.body.appendChild(importInput);
});
