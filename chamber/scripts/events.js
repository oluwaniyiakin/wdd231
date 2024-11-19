const events = [
    { title: "Networking Event", date: "2024-11-20", location: "123 Business St, Lagos" },
    { title: "Business Workshop", date: "2024-11-25", location: "456 Market Ave, Lagos" },
];

const eventsContainer = document.getElementById("events-container");
events.forEach(event => {
    eventsContainer.innerHTML += `
        <div class="event">
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
        </div>
    `;
});
