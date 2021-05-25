// attaches to edit button and calls edit function
document.querySelector('#edit-button').addEventListener('click', editPost);
// attaches to deleet button and calls delete function
document.querySelector('#delete-button').addEventListener('click', deletePost);

// this is meant to update the post
async function editPost(event) {
    event.preventDefault();

    const post_title = document.querySelector('post-title').innerHTML;
    const post_body = document.querySelector('post-body').innerHTML;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(post_title, post_body);
    document.location.replace(`/edit/${post_id}`);


};

async function deletePost(event) {
    event.preventDefault();
    //make request to post route delete with the current post id in nav bar
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    const selected = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (selected.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(selected.statusText);
    }
};