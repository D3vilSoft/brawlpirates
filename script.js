// Переменные
const userInput = document.getElementById('user-input');
const confirmButton = document.getElementById('confirm-button');
const signalButton = document.getElementById('signal-button');
const resetButton = document.getElementById('reset-button');
const imageContainer = document.getElementById('image-container');
const images = Array.from(document.querySelectorAll('.image'));
const startSound = document.getElementById('start-sound');
const winSound = document.getElementById('win-sound');
const originalOrder = Array.from(images); // Сохраняем изначальный порядок картинок

let isConfirmed = false;
let chosenImage = null; // Сохраняем выбранную картинку

// Блокировка поля после подтверждения
confirmButton.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        userInput.value = text;
        userInput.disabled = true;
        confirmButton.disabled = true;
        isConfirmed = true;
    }
});

// Функция для случайного перемешивания DOM-элементов
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Функция перемешивания картинок
// Функция перемешивания картинок
function shuffleImages() {
    if (!isConfirmed) {
        alert('Введите ваш ID!');
        return;
    }

    // Воспроизведение начального звука
    startSound.play();

    // Перемешивание с визуальным эффектом
    let interval = setInterval(() => {
        const positions = shuffleArray(images.map((_, index) => index));

        images.forEach((image, i) => {
            const targetPosition = positions[i] * 120;
            image.style.transform = `translateX(${targetPosition - i * 120}px)`;
        });
    }, 500);

    // Завершение анимации через 4 секунды
    setTimeout(() => {
        clearInterval(interval);

        // Убираем временные стили
        images.forEach(image => (image.style.transform = ''));

        // Выбор случайной картинки
        chosenImage = images[Math.floor(Math.random() * images.length)];
        chosenImage.style.transition = 'transform 0.5s ease'; // Плавная анимация
        chosenImage.style.transform = 'translateY(-50px)'; // Поднимаем выбранную картинку

        // Воспроизведение финального звука
        startSound.pause();
        winSound.play();
    }, 4000);
}

// Сброс всех эффектов
resetButton.addEventListener('click', () => {
    images.forEach((image) => {
        image.style.animation = '';
        image.style.transform = '';
    });

    // Сброс выбранной картинки
    chosenImage = null;

    // Сброс звуков
    winSound.pause();
    startSound.pause();

    // Возврат DOM-структуры в исходный порядок
    originalOrder.forEach(image => imageContainer.appendChild(image));
});
// Привязка функции к кнопке
signalButton.addEventListener('click', shuffleImages);

