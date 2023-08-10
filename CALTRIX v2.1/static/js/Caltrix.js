// Toggle for responsivo menu
document.querySelector('.toggle').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
});

// show more text
document.querySelector("a#btnText").addEventListener('click', function showtext() {
    var points = document.getElementById("points");
    var moreText = document.getElementById("moreText");

    if (points.style.display === "none") {
        points.style.display = "inline";
        moreText.style.display = "none";
        btnText.innerHTML = "Descubre +";
    } else {
        points.style.display = "none";
        moreText.style.display = "inline";
        btnText.innerHTML = "Descubre -";
    }
});

window.addEventListener('scroll', function () {
    if (window.pageYOffset <= 200) {
        document.querySelector('.go-down').style.display = 'block';
    } else {
        document.querySelector('.go-down').style.display = 'none';
    }
});

//autoresize textarea
const textarea = document.querySelector('.solution');
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

//Download pdf
document.getElementById('form-submit').addEventListener("click", function () {
    var path = 'static/pdf/Caltrix-form.pdf';
    var link = document.createElement('a');
    link.href = path;
    link.target = '_blank';
    link.download = "Caltrix-form.pdf";
    link.click();
})

// Scroll suave al hacer click en el botón "Bajar"
document.querySelector('.go-down a').addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    const scrollToTarget = document.querySelector(target).offsetTop;

    window.scrollTo({
        top: scrollToTarget,
        behavior: 'smooth'
    });
});


// Mostrar/ocultar el botón "Volver Arriba" al hacer scroll
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 200) {
        document.querySelector('.back-to-top').style.display = 'block';
    } else {
        document.querySelector('.back-to-top').style.display = 'none';
    }
});

// Scroll suave al hacer click en el botón "Volver Arriba"
document.querySelector('.back-to-top a').addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    const scrollToTarget = document.querySelector(target).offsetTop;

    window.scrollTo({
        top: scrollToTarget,
        behavior: 'smooth'
    });
});

