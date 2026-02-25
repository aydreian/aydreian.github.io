function toggleDarkMode(button) {
    document.documentElement.classList.toggle('dark');

    button.textContent = document.documentElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';

    if(document.documentElement.classList.contains('dark')){
        localStorage.setItem('theme', 'dark'); 
    }
    else{
        localStorage.setItem('theme', 'light');
    }

}

if(localStorage.getItem('theme') === 'dark'){
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
    });
}

function outputTerminal(){
    const output = document.getElementById('container-output');
    output.classList.toggle('hidden');
}

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

greeting()
setInterval(greeting, 1000);