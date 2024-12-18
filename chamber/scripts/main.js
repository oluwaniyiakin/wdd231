async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Failed to fetch members:", error);
    }
}

function displayMembers(members) {
    const membersContainer = document.getElementById('members');
    membersContainer.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        </div>
    `).join('');
}

document.getElementById('toggleView').addEventListener('click', () => {
    document.getElementById('members').classList.toggle('grid-view');
    document.getElementById('members').classList.toggle('list-view');
});

fetchMembers();
