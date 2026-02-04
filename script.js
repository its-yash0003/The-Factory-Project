// function showSection(sectionId) {

//     var sections = document.getElementsByClassName("content");

//     for (var i = 0; i < sections.length; i++) {
//         sections[i].style.display = "none";
//     }

//     document.getElementById(sectionId).style.display = "block";
// }


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const topOffset = 80; // height of header
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function scrollToContact() {
    const contactSection = document.querySelector('.contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}
