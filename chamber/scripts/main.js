document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const toggleViewButton = document.getElementById("toggleView");

    let isGridView = true;

    toggleViewButton.addEventListener("click", () => {
        isGridView = !isGridView;
        directory.classList.toggle("list-view", !isGridView);
        directory.classList.toggle("grid-view", isGridView);
    });

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div class="member-info">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                </div>
            `;
            directory.appendChild(card);
        });
    }

    fetchMembers();
});
