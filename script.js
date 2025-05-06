$(document).ready(function() {
    // Плавный скроллинг к секциям
    $('nav a').on('click', function(event) {
        event.preventDefault();

        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 800);
    });
});

$(document).ready(function() {
    let currentIndex = 0;
    const slides = $('.slides img');
    const totalSlides = slides.length;

    function updateSlides() {
        const offset = -currentIndex * 100;
        $('.slides').css('transform', 'translateX(' + offset + '%)');

        // Отключение кнопки "Назад", если на первом слайде
        $('.prev').prop('disabled', currentIndex === 0);
        // Отключение кнопки "Вперед", если на последнем слайде
        $('.next').prop('disabled', currentIndex === totalSlides - 1);
    }

    $('.next').on('click', function() {
        if (currentIndex < totalSlides - 1) { // Проверка на последний слайд
            currentIndex++;
            updateSlides();
        }
    });

    $('.prev').on('click', function() {
        if (currentIndex > 0) { // Проверка на первый слайд
            currentIndex--;
            updateSlides();
        }
    });

    // Инициализация слайдера
    updateSlides();
});

AOS.init({
    duration: 1000, // длительность анимации
});

//Карусель отзывов
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const cards = document.querySelectorAll('.review-card');

let currentIndex = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
               card.classList.add('active');
        }
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

updateCarousel();

//Карточки услуг
function toggleCard(clickedCard) {
    const allCards = document.querySelectorAll('.service-card');
    allCards.forEach(card => {
        if (card !== clickedCard) {
            card.classList.remove('expanded');
        }
    });
    clickedCard.classList.toggle('expanded');
}

//Калькулятор услуг
const services = {
    'Чистка зубов': 2000,
    'Пломбирование': 3500,
    'Удаление зуба': 5000,
    'Имплантация': 30000
};
let selectedServices = [];
function toggleServices() {
    const list = document.getElementById('serviceList');
    const button = document.getElementById('toggleButton');
    const isOpen = list.style.display === 'block';
    list.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
        button.classList.add('open');
    } else {
        button.classList.remove('open');
    }
}
function selectService(serviceName, price) {
    selectedServices.push({ name: serviceName, price: price });
    delete services[serviceName];
    updateUI();
}
function removeService(serviceName, price) {
    selectedServices = selectedServices.filter(s => s.name !== serviceName);
    services[serviceName] = price;
    updateUI();
}
function updateUI() {
    const serviceList = document.getElementById('serviceList');
    const selectedList = document.getElementById('selectedServices');
    const totalSum = document.getElementById('totalSum');
    serviceList.innerHTML = Object.entries(services)
        .map(([name, price]) => `<li onclick="selectService('${name}', ${price})">${name}</li>`)
        .join('');
    selectedList.innerHTML = selectedServices
        .map(s => `<li onclick="removeService('${s.name}', ${s.price})">${s.name} - ${s.price} руб.</li>`)
        .join('');
    const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
    totalSum.textContent = total;
}


document.addEventListener("DOMContentLoaded", function () {
    // Подписка на рассылку
    const subscribeBtn = document.getElementById("subscribe-btn");
    const modal = document.getElementById("subscription-modal");
    const emailInput = document.getElementById("email-input");
    const confirmBtn = document.getElementById("confirm-subscribe");

    subscribeBtn.addEventListener("click", () => {
        modal.classList.add("show");
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            modal.classList.remove("show");
        }
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    emailInput.addEventListener("input", () => {
        confirmBtn.disabled = !emailInput.value.includes("@");
    });

    confirmBtn.addEventListener("click", () => {
        alert("Вы подписались на рассылку!");
        modal.classList.remove("show");
    });

    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");

    // добавила проверку на существование элементов
    if (!cookieBanner || !acceptCookies) {
        console.error("Элементы баннера или кнопки не найдены!");
        return;
    }

    // Проверка localStorage и отображение баннера
    if (!localStorage.getItem("cookiesAccepted")) {
        setTimeout(() => {
            cookieBanner.classList.add("show"); // Добавляем класс для анимации
        }, 500); // Задержка для показа
    }

    // Обработчик клика по кнопке "Принять"
    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.remove("show"); // Скрываем баннер с анимацией
    });
});

