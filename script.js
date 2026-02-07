// function showSection(sectionId) {

//     var sections = document.getElementsByClassName("content");

//     for (var i = 0; i < sections.length; i++) {
//         sections[i].style.display = "none";
//     }

//     document.getElementById(sectionId).style.display = "block";
// }


// function scrollToSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     if (section) {
//         const topOffset = 80; // height of header
//         const elementPosition = section.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - topOffset;

//         window.scrollTo({
//             top: offsetPosition,
//             behavior: "smooth"
//         });
//     }
// }

// function scrollToContact() {
//     const contactSection = document.querySelector('.contact');
//     contactSection.scrollIntoView({ behavior: 'smooth' });
// }

// Expose scroll helpers globally so inline onclick calls work reliably
window.scrollToSection = function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight : 0; // dynamic header height
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = sectionPosition - headerOffset - 10; // small extra spacing

    // Debugging help: will appear in DevTools Console
    console.debug('scrollToSection:', sectionId, 'headerOffset:', headerOffset, 'offsetPosition:', offsetPosition);

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

window.scrollToContact = function () {
    window.scrollToSection('contact');
};






document.addEventListener('DOMContentLoaded', function () {

    // FIX NAV BUTTONS
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            if (target) {
                window.scrollToSection(target);
            }
        });
    });

    // FIX HEADER CONTACT BUTTONS
    const headerButtons = document.querySelectorAll('.header-box');
    headerButtons.forEach(function (box) {
        box.addEventListener('click', function () {
            window.scrollToSection('contact');
        });
    });


    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.warn('contactForm element not found — form handling skipped');
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent default form submit

        const formData = new FormData(contactForm);

        // Send form data to FormSubmit
        fetch('https://formsubmit.co/ajax/mspolymers8@gmail.com', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(result => {
                // success response
                if (result && (result.success === true || result.success === 'true')) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message Sent Successfully!',
                        icon: 'success',
                        confirmButtonColor: '#0b3d91'
                    });
                    contactForm.reset(); // clear form
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Message could not be sent.',
                        icon: 'error',
                        confirmButtonColor: '#0b3d91'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: '❌ Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#0b3d91'
                });
                console.error('FormSubmit error:', error);
            });
    });
});
