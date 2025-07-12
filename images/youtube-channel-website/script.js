document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = 'red';
        return;
    }

    // Simple email format validation
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.text();

        if (response.ok) {
            formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            formMessage.style.color = 'green';
            this.reset();
        } else {
            formMessage.textContent = 'Error: ' + result;
            formMessage.style.color = 'red';
        }
    } catch (error) {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.style.color = 'red';
    }
});

const events = [
    {
        name: "Poster Release",
        datetime: new Date("July 1, 2025 00:00:00")
    },
    {
        name: "Next Event",
        datetime: new Date("July 12, 2025 11:15:00")
    },
    {
        name: "Glimpse",
        datetime: new Date("July 25, 2025 00:00:00")
    },
    {
        name: "Trailer",
        datetime: new Date("August 14, 2025 17:45:00")
    },
    {
        name: "Film Release",
        datetime: new Date("August 25, 2025 17:45:00")
    },
    {
        name: "Video Song",
        datetime: new Date("August 28, 2025 07:30:00")
    }
];

function updateEventTracker() {
    const now = new Date();
    let currentEventIndex = -1;

    for (let i = 0; i < events.length; i++) {
        if (now >= events[i].datetime) {
            currentEventIndex = i;
        } else {
            break;
        }
    }

    const eventTrackerDiv = document.getElementById("current-event");

    // Clear previous content
    eventTrackerDiv.innerHTML = "";

    // Create step container
    const stepContainer = document.createElement("div");
    stepContainer.className = "step-container";

    events.forEach((event, index) => {
        const step = document.createElement("div");
        step.className = "step";

        if (index < currentEventIndex) {
            step.classList.add("completed");
        } else if (index === currentEventIndex) {
            step.classList.add("current");
        } else {
            step.classList.add("upcoming");
        }

        const stepLabel = document.createElement("div");
        stepLabel.className = "step-label";
        stepLabel.textContent = `${event.name} - ${event.datetime.toLocaleString()}`;

        step.appendChild(stepLabel);
        stepContainer.appendChild(step);
    });

    eventTrackerDiv.appendChild(stepContainer);
}

// Initial update
updateEventTracker();

// Update every 10 seconds for more live tracking
setInterval(updateEventTracker, 10000);
