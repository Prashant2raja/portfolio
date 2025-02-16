const form = document.querySelector('#contact form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
     
    const formData = {
      name :form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try{
      const response = await fetch('https://portfolio-cv-42ef80e01032.herokuapp.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if(result.success){
        alert(result.message);
      }
      else{
        alert(result.error || 'Failed to send message');
      }
    }
    catch(err){
      console.error(err);
      console.log('Error',err)
      alert('Server error. Please try again later.');
    }
});
