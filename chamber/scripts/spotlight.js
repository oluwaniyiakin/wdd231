async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    const spotlightContainer = document.getElementById("spotlights");

    // Filter Gold and Silver members
    const spotlightMembers = members.filter(member =>
        ["Gold", "Silver"].includes(member.membershipLevel)
    );

    // Randomize and select 3 members
    const selected = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    selected.forEach(member => {
        spotlightContainer.innerHTML += `
            <div class="member-card">
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${member.membershipLevel}</p>
            </div>
        `;
    });
}

loadSpotlights();
