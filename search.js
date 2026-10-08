document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsBox = document.getElementById("searchResults");

  if (!searchInput || !resultsBox) return;

  const headings = [...document.querySelectorAll("h3, h4")];

  const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  headings.forEach((heading) => {
    const text = heading.textContent.trim();
    if (!text) return;
    if (!heading.id) {
      heading.id = slugify(text);
    }
  });

  const entries = headings
    .map((heading) => {
      const text = heading.textContent.trim();
      if (!text) return null;
      return { text, href: `#${heading.id}` };
    })
    .filter(Boolean);

  const doSearch = (query) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      resultsBox.classList.remove("visible");
      resultsBox.innerHTML = "";
      return;
    }

    const matches = entries.filter((entry) => entry.text.toLowerCase().includes(cleanQuery));

    if (!matches.length) {
      resultsBox.innerHTML = "<span>No matches found.</span>";
      resultsBox.classList.add("visible");
      return;
    }

    resultsBox.innerHTML = matches
      .slice(0, 8)
      .map((entry) => `<a href="${entry.href}">${entry.text}</a>`)
      .join("");
    resultsBox.classList.add("visible");
  };

  searchInput.addEventListener("input", (event) => doSearch(event.target.value));
});
