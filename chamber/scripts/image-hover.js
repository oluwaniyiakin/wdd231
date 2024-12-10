// Select all images in the gallery
const images = document.querySelectorAll('.image-grid img');

// Define the hover effect class
const hoverEffectClass = 'hover-effect';

// Add event listeners for hover effects
images.forEach(image => {
  // Add hover effect on mouse enter
  image.addEventListener('mouseenter', () => {
    image.classList.add(hoverEffectClass);
  });

  // Remove hover effect on mouse leave
  image.addEventListener('mouseleave', () => {
    image.classList.remove(hoverEffectClass);
  });
});

// Optional: Log hover events for debugging
images.forEach(image => {
  image.addEventListener('mouseenter', () => {
    console.log(`Hovering over: ${image.alt}`);
  });
});
