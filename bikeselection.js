// Mobile Menu (if needed)
const menuBtn = document.querySelector(".menu-btn");

// Bike Slider Data
const bikes = [
    {
        index: "01",
        name: "Continental",
        model: "GT",
        img: "continental-gt-650.avif"
    },
    {
        index: "02",
        name: "Interceptor",
        model: "650",
        img: "interceptor.avif"
    },
    {
        index: "03",
        name: "Himalayan",
        model: "450",
        img: "himalayan-450.avif"
    },
    {
        index: "04",
        name: "Bullet",
        model: "350",
        img: "bullet-350.avif"
    }
];

let current = 0;

// Update UI
function updateBike() {
    const bikeIndex = document.getElementById("bikeIndex");
    const bikeName = document.getElementById("bikeName");
    const bikeModel = document.getElementById("bikeModel");
    const bikeImg = document.getElementById("bikeImg");

    bikeIndex.textContent = bikes[current].index;
    bikeName.textContent = bikes[current].name;
    bikeModel.textContent = bikes[current].model;
    bikeImg.src = bikes[current].img;

    // Animation refresh
    bikeImg.classList.remove("zoom-in");
    void bikeImg.offsetWidth;
    bikeImg.classList.add("zoom-in");
}

// Buttons
document.querySelector(".left").addEventListener("click", () => {
    current = (current - 1 + bikes.length) % bikes.length;
    updateBike();
});

document.querySelector(".right").addEventListener("click", () => {
    current = (current + 1) % bikes.length;
    updateBike();
});
