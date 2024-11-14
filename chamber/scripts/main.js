async function fetchMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const directory = document.getElementById('directory');
    directory.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('card');
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        `;
        directory.appendChild(memberCard);
    });
}

document.getElementById('toggleView').addEventListener('click', () => {
    const directory = document.getElementById('directory');
    directory.classList.toggle('list-view');
});

fetchMembers();
