(async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch members');
        const members = await response.json();

        const filtered = members.filter(
            member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );

        const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
        displaySpotlights(selected);
    } catch (error) {
        console.error('Error fetching spotlights:', error);
    }
})();

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector('.spotlight-container');
    spotlightContainer.innerHTML = members
        .map(
            member => `
        <div class="member-card">
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        </div>
    `
        )
        .join('');
}
