const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('YOUR_ENDPOINT_HERE', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error uploading file:', error));
  };
  