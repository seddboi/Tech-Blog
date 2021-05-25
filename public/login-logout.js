document.querySelector('#login-button').addEventListener('click', selectLogin);
document.querySelector('#logout-button').addEventListener('click', selectLogout);
document.querySelector('#signup-button').addEventListener('click', selectSignup);

async function selectLogin(event) {
    // these grab onto login values
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    // tests is email and pass were entered
    if (email && password) {
        // submits reponse to json
        const response = await fetch('/api/users/login/', {
            method: 'POST',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in... please try again.')
        }
    }
};

async function selectLogout(event) {

};

// this controls the signup and login feature
async function selectSignup(event) {
    event.preventDefault();

    // these attach to the sign up form handles and grab the values of each
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();

    if (email && password && username) {
        const signupResponse = fetch('/api/users', {
            method: 'POST', 
            body: {
                email, 
                password,
                username
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const loginResponse = await fetch('/api/users/login/', {
            method: 'POST',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(signupResponse.ok) {
            console.log('signed up');
        } else {
            alert('Failed to sign up... please try again.');
        };

        if(loginResponse.ok) {
            alert('Welcome in!');
            document.location.replace('/');
        } else {
            alert('Failed to log in... please try again.')
        };

    }
}