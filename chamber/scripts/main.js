async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    const directory = document.getElementById('directory');
    directory.innerHTML = '';

    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('member');

        memberElement.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;

        directory.appendChild(memberElement);
    });
}

document.getElementById('grid-view').addEventListener('click', () => {
    document.getElementById('directory').classList.add('grid-view');
    document.getElementById('directory').classList.remove('list-view');
});

document.getElementById('list-view').addEventListener('click', () => {
    document.getElementById('directory').classList.add('list-view');
    document.getElementById('directory').classList.remove('grid-view');
});

fetchMembers();
