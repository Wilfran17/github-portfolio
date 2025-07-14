const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

  
   // Write a JavaScript program to create a dropdown menu that shows and hides its options when clicked.
    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Optional: close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const slides = document.getElementById("slides");
        const totalSlides = slides.children.length;
        let currentSlide = 0;
    
        document.getElementById("next").addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    
        document.getElementById("prev").addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    });