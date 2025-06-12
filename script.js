function addNote() {
  const container = document.getElementById("notes-container");

  // Create a new note box
  const noteBox = document.createElement("div");
  noteBox.className = "note";

  // Add textarea to the note
  noteBox.innerHTML = `
    <textarea placeholder="Write your note..."></textarea>
  `;

  // Insert new note before the last element (which is the + box)
  container.insertBefore(noteBox, container.lastElementChild);
}
