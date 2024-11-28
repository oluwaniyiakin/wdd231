// 1. Modal Functionality
// Select all buttons to open modals and modals themselves
const modalButtons = document.querySelectorAll(".card button");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

// Function to open a modal
function openModal(event) {
    const targetModalId = event.target.dataset.modalTarget;
    const modal = document.getElementById(targetModalId);
    modal.style.display = "block";
}

// Function to close a modal
function closeModal(event) {
    const modal = event.target.closest(".modal");
    modal.style.display = "none";
}

// Add event listeners to modal open buttons
modalButtons.forEach((button) => {
    button.addEventListener("click", openModal);
});

// Add event listeners to close buttons
closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
});

// Add event listener to close modal when clicking outside of it
window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// 2. Form Submission Handling
// Add timestamp to the hidden field when the form is loaded
window.addEventListener("load", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});

// 3. Dynamic Card Animations
// Apply animation to cards on page load
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
            card.style.transition = "all 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200); // Stagger animations for each card
    });
});

// 4. Thank You Page Data Population
// Populate the thank you page dynamically with query parameters
if (window.location.pathname.includes("thankyou.html")) {
    const params = new URLSearchParams(window.location.search);

    // Populate the thank you fields with submitted data
    const fields = ["first-name", "last-name", "email", "phone", "organization", "timestamp"];
    fields.forEach((field) => {
        const element = document.getElementById(field);
        if (element && params.get(field)) {
            element.textContent = params.get(field);
        }
    });
}

// 5. Accessibility Improvements for Keyboard Users
// Ensure focus traps inside the modal
modals.forEach((modal) => {
    const focusableElements = modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }

        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });
});
