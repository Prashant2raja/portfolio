const form = document.querySelector('#contact form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
     
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch('https://prashant-cv-207c906be156.herokuapp.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
      } else {
        alert(result.error || 'Failed to send message');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    //================================================
    // 1. DYNAMIC TYPING EFFECT
    //================================================
    const subtitle = document.querySelector('.subtitle');
    const roles = ["Full-Stack MERN Developer", "DSA Enthusiast", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        const currentText = currentRole.substring(0, charIndex);

        subtitle.textContent = currentText;
        subtitle.classList.add('typing');

        if (!isDeleting && charIndex < currentRole.length) {
            // Typing forward
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // Switch to deleting or move to next role
            isDeleting = !isDeleting;
            if (!isDeleting) {
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(typeEffect, 1200); // Pause before start typing/deleting again
        }
    }

    typeEffect();


    //================================================
    // 2. REVEAL ON SCROLL ANIMATION
    //================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    //================================================
    // 3. ACTIVE NAVIGATION LINK HIGHLIGHTING
    //================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Highlight when section is in the middle of the screen
    });

    sections.forEach(section => navObserver.observe(section));

});
