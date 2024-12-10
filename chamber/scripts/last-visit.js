document.addEventListener("DOMContentLoaded", () => {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceVisit === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceVisit} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
});
