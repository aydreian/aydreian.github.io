
// DarkMode Function
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('darkModeToggle').checked = isDark;
}

// Set initial state
if (document.documentElement.classList.contains('dark')) {
    document.getElementById('darkModeToggle').checked = true;
}


// Scroll function to section with smooth behavior
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
    });
}

// Terminal hidden function
function outputTerminal(){
    const output = document.getElementById('container-output');
    output.classList.toggle('hidden');
}

// Greeting function
function greeting(){
    const now = new Date();
    const hour = now.getHours();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', options);

    if (hour >= 5 && hour  < 12) {
        document.getElementById('greeting').textContent = 'Good Morning! 👋';
    } else if (hour  >= 12 && hour  < 18) {
        document.getElementById('greeting').textContent = 'Good Afternoon! 🌞';
    } else {
        document.getElementById('greeting').textContent = 'Good Evening! 🌚';
    }
}

// Call For greeting to display and update
greeting()
setInterval(greeting, 1000);