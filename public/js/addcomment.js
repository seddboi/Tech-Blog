// this selects the comment button and triggers the addComment function
document.querySelector('#comment-button').addEventListener('click', addComment);

async function addComment(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 
    ];
    // grabs content entered from comment form
    const comment_content = document.querySelector('#comment-content').value.trim();

    // if comment was entered, then it is posted and marked in json
    if (comment_content) {
        const response = await fetch('/api/comments',  {
            method: 'POST',
            body: JSON.stringify({
                comment_content,
                post_id,
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Error posting comment...')
        }
    }
}