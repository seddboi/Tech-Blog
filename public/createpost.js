// adjust query selctor
document.querySelector('#new-post-button').addEventListener('click', createPostHandler);

async function formHandler(event) {
    event.preventDefault();

    // adjust query selctors
    const post_title = document.querySelector().value.trim();
    const post_content = document.querySelector().value.trim();

    if (body) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                post_title, 
                post_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
  
};

