// Toggle responsive navigation
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('show');
});

// Display last modified date
document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;

// Course List Array
const courses = [
    { name: "CSE 110", credits: 3, completed: true },
    { name: "WDD 130", credits: 3, completed: true },
    { name: "CSE 111", credits: 3, completed: false },
    { name: "CSE 210", credits: 3, completed: false },
    { name: "WDD 131", credits: 3, completed: true },
    { name: "WDD 231", credits: 3, completed: false }
];

// Filter courses and display
function filterCourses(type) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    courses
        .filter(course => type === 'all' || course.name.startsWith(type))
        .forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-card';
            courseItem.style.backgroundColor = course.completed ? '#d4edda' : '#f8d7da';
            courseItem.textContent = `${course.name}`;
            courseList.appendChild(courseItem);
        });
}

// Initialize with all courses displayed
filterCourses('all');
