// script.js

// URL для отримання даних про курси валют з API НБУ
const apiURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

// Функція для отримання даних з API та оновлення контейнера
async function fetchExchangeRates() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Отримуємо посилання на контейнер
        const ratesContainer = document.getElementById('exchangeRates');
        ratesContainer.innerHTML = '';

        // Проходимо по кожному елементу та додаємо картки до контейнера
        data.forEach(rate => {
            const rateCard = document.createElement('div');
            rateCard.classList.add('rate-card');

            const currencyDiv = document.createElement('div');
            currencyDiv.classList.add('currency');
            currencyDiv.textContent = rate.txt;

            const rateDiv = document.createElement('div');
            rateDiv.classList.add('rate');
            rateDiv.textContent = rate.rate;

            const conversionRateDiv = document.createElement('div');
            conversionRateDiv.classList.add('conversion-rate');
            conversionRateDiv.textContent = `1 ${rate.cc} = ${rate.rate} UAH`;

            rateCard.appendChild(currencyDiv);
            rateCard.appendChild(rateDiv);
            rateCard.appendChild(conversionRateDiv);
            ratesContainer.appendChild(rateCard);
        });
    } catch (error) {
        console.error('Помилка при отриманні даних:', error);
    }
}

// Викликаємо функцію для отримання даних одразу після завантаження сторінки
fetchExchangeRates();

// Оновлюємо дані кожні 10 хвилин (600000 мілісекунд)
setInterval(fetchExchangeRates, 600000);
