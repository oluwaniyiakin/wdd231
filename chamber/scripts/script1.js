document.addEventListener("DOMContentLoaded", function () {
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach((image) => observer.observe(image));
  
    // Visitor Message Using localStorage
    const messageContainer = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();
  
    if (!lastVisit) {
      messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysElapsed = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysElapsed < 1) {
        messageContainer.textContent = "Back so soon! Awesome!";
      } else {
        messageContainer.textContent = `You last visited ${daysElapsed} day${daysElapsed > 1 ? "s" : ""} ago.`;
      }
    }
  
    localStorage.setItem("lastVisit", currentTime);
  });
  