function submitLogin() {
    // Step 1: Gather credentials from form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Step 2: Authenticate with the university API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU15155cbae9f02b0f01554634b97e2febe213f611858b5cf923a3655ba3c810466fb155600418f472fb7bd423c6c3e1fb'
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => response.json())
    .then(authData => {
        // Check if status is true or false
        if (authData.status) {
            // Authentication succeeded, prepare the payload
            const payload = {
                engName: authData.displayname_en,
                email: authData.email,
                faculty: authData.faculty,
                student: authData.type,
                userName: authData.username
            };

            console.log("Authenticated Data:", payload);

            // Step 3: Send data to local API to save in the database
            return fetch('http://localhost:8080/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } else {
            // Authentication failed, handle login error
            throw new Error('Login failed: Incorrect username or password');
        }
    })
    .then(response => {
        // Check if saving data to local API was successful
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to save student data');
        }
    })
    .then(data => {
        // Display success message with user details
        document.getElementById('message').innerText = `User: ${data.engName}`;
        alert("Login Complete");
    })
    .catch(error => {
        // Display error message in both console and UI
        console.error('Error:', error);
        document.getElementById('message').innerText = "Error: " + error.message;
        alert("Error: " + error.message);
    });
}
function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
      );
    
    fetch(url)
    .then(response => response.text())
    .then(text => {
        document.getElementById('message').innerText = text;
    })
    .catch(error => console.error('Error:', error));
}
