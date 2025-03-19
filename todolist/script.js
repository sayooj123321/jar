window.onload = function() {
    startVoiceRecognition();
    document.getElementById('status').innerText = "Listening for commands...";
}

function addTask(taskName) {
    if (!taskName || taskName.length == 0) {
        alert("Please specify a task to add.");
    } else {
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${taskName}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        bindTaskButtons();
    }
}

function bindTaskButtons() {
    var deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function(button, index) {
        button.onclick = function() {
            this.parentNode.remove();
        }
    });

    var tasks = document.querySelectorAll(".task");
    tasks.forEach(function(task) {
        task.onclick = function() {
            this.classList.toggle('completed');
        }
    });
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;  // Keep listening continuously

    recognition.onstart = function() {
        console.log('Voice recognition activated.');
    }

    recognition.onspeechend = function() {
        recognition.stop();
        console.log('Speech recognition stopped.');
    }

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log('You said: ' + transcript);
        processVoiceCommand(transcript);
    }

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
    }

    recognition.onend = function() {
        // Restart recognition after it ends
        recognition.start();
    }

    recognition.start();
}

function processVoiceCommand(command) {
    console.log("Processing command: " + command);

    if (command.startsWith("add")) {
        let taskName = command.replace("add", "").trim();
        addTask(taskName);
    } else if (command.startsWith("delete")) {
        let taskName = command.replace("delete", "").trim();
        deleteTaskByName(taskName);
    } else if (command.startsWith("complete")) {
        let taskName = command.replace("complete", "").trim();
        completeTaskByName(taskName);
    } else {
        console.log("Command not recognized.");
    }
}

function deleteTaskByName(taskName) {
    let tasks = document.querySelectorAll(".task");
    let found = false;

    tasks.forEach(function(task) {
        if (task.querySelector("#taskname").innerText.toLowerCase().includes(taskName)) {
            task.remove();
            found = true;
        }
    });

    //if (!found) {
    //    alert(`Task "${taskName}" not found.`);
    //}
}

function completeTaskByName(taskName) {
    let tasks = document.querySelectorAll(".task");
    let found = false;

    tasks.forEach(function(task) {
        if (task.querySelector("#taskname").innerText.toLowerCase().includes(taskName)) {
           // if (!task.classList.contains('completed')) {
                task.classList.add('completed');
               // alert(`Task "${taskName}" marked as complete.`);
            //} else {
                //alert(`Task "${taskName}" is already completed.`);
            //}
            found = true;
        }
    });

    if (!found) {
       // alert(`Task "${taskName}" not found.`);
    }
}
