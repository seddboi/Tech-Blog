// adjust query selctor
document.querySelector('#submit-new-post').addEventListener('click', createNewPost);

async function createNewPost(event) {
    event.preventDefault();

    // adjust query selctors
    const post_title = document.querySelector('#new-title').value.trim();
    const post_content = document.querySelector('new-content').value.trim();

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

