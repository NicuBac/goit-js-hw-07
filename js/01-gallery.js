import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Subtask 1
const galleryList = document.querySelector(".gallery");

function renderGalleryItem(item) {
  const listItem = document.createElement("li");
  listItem.classList.add("gallery__item");

  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.href = item.original;

  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.src = item.preview;
  image.setAttribute("data-source", item.original);
  image.alt = item.description;

  link.appendChild(image);
  listItem.appendChild(link);
  return listItem;
}

galleryItems.forEach((item) => {
  const galleryItem = renderGalleryItem(item);
  galleryList.appendChild(galleryItem);
});

// Subtask 2
galleryList.addEventListener("click", handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== "IMG") return;

  const largeImageUrl = target.dataset.source;
  openModal(largeImageUrl);
}

// Subtask 3
function openModal(imageUrl) {
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
  `);

  instance.show();

  document.addEventListener("keydown", handleKeyPress);
  function handleKeyPress(event) {
    if (event.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", handleKeyPress);
    }
  }
}
