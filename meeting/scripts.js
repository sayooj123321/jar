document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schedule-form');
    const schedulesList = document.getElementById('schedules-list');
    const startRecordingButton = document.getElementById('start-recording');

    // Load schedules from the server
    function loadSchedules() {
        fetch('schedule.php')
            .then(response => response.json())
            .then(data => {
                schedulesList.innerHTML = '';
                data.forEach(schedule => {
                    const li = document.createElement('li');
                    li.textContent = `${schedule.type} on ${schedule.date} at ${schedule.time} (Alarm: ${schedule.alarm_time || 'None'})`;
                    schedulesList.appendChild(li);
                });
            });
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);

        fetch('schedule.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            loadSchedules(); // Refresh the schedule list
            form.reset();
        });
    });

    // Voice command functionality
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Voice recognition started. Speak now.');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command:', transcript);

            if (transcript.includes('add schedule')) {
                const [ , , type, , date, , time, , alarm_time] = transcript.split(' ');
                document.getElementById('type').value = type;
                document.getElementById('date').value = date;
                document.getElementById('time').value = time;
                document.getElementById('alarm_time').value = alarm_time;

                form.requestSubmit();
            }
        };

        startRecordingButton.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        console.log('Speech Recognition API not supported.');
    }

    // Check for upcoming alarms every minute
    function checkAlarms() {
        fetch('schedule.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'check_alarms=true',
        })
        .then(response => response.text())
        .then(result => {
            if (result.includes('Alarm triggered')) {
                console.log('Alarm email sent.');
            } else {
                console.log('No alarms due.');
            }
        });
    }

    // Request notification permission on page load
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Load schedules and start checking alarms
    loadSchedules();
    setInterval(checkAlarms, 30000); // Check every minute
});
