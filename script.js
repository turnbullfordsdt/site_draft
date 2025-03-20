document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const contactInfo = {
    name: name,
    email: email,
    message: message
  };

  const newContent = btoa(JSON.stringify(contactInfo)); // Convert contact info to Base64

  const token = "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";
  const repo = "files_to_access_repo";
  const owner = "turnbullfordsdt";
  const filePath = "stuff.txt";
  const commitMessage = "Update file via API";

  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  })
    .then(response => response.json())
    .then(fileData => {
      const sha = fileData.sha;

      return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          message: commitMessage,
          content: newContent,
          sha: sha
        })
      });
    })
    .then(response => response.json())
    .then(data => console.log("File updated:", data))
    .catch(error => console.error("Error:", error));
});
