function showSection(sectionId) {

    var sections = document.getElementsByClassName("content");

    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    document.getElementById(sectionId).style.display = "block";
}
