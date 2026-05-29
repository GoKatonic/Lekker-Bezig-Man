async function loadIncludes() {
  const includeElements = document.querySelectorAll("[data-include]");

  for (const element of includeElements) {
    const file = element.getAttribute("data-include");

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }

      const html = await response.text();
      element.innerHTML = html;
    } catch (error) {
      console.error(error);

      element.innerHTML = `
        <div style="padding:20px;color:red;border:1px solid red;">
          Could not load ${file}
        </div>
      `;
    }
  }
}