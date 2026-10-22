function calculateTotal() {
    let quantityInput = document.getElementById("calc-quantity");
    let resultDiv = document.getElementById("calc-result");
    let errorDiv = document.getElementById("calc-error");

    // Очищаем предыдущие сообщения
    resultDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    let quantityStr = quantityInput.value.trim();

    // Проверка правильности ввода регулярным выражением (только цифры)[cite: 3, 6]
    let matchResult = quantityStr.match(/^\d+$/);

    if (matchResult === null) {
        errorDiv.innerHTML = "Ошибка: введите корректное целое число (только цифры)!";
        return;
    }

    let quantity = parseInt(quantityStr, 10);
    if (quantity <= 0) {
        errorDiv.innerHTML = "Ошибка: количество должно быть больше нуля!";
        return;
    }

    // Получаем выбранный тип услуги (радиокнопки)
    let selectedRadio = document.querySelector('input[name="service-type"]:checked');
    if (!selectedRadio) {
        return;
    }

    let basePrice = parseInt(selectedRadio.value, 10);
    let typeValue = selectedRadio.dataset.type; // "1", "2" или "3"

    let optionModifier = 0;
    let propertyModifier = 0;

    let selectContainer = document.getElementById("calc-select-container");
    let checkboxContainer = document.getElementById("calc-checkbox-container");

    // Управление видимостью элементов в зависимости от типа товара
    if (typeValue === "1") {
        selectContainer.style.display = "none";
        checkboxContainer.style.display = "none";
    } else if (typeValue === "2") {
        selectContainer.style.display = "block";
        checkboxContainer.style.display = "none";
        
        let productSelect = document.getElementById("calc-product-select");
        optionModifier = parseInt(productSelect.value, 10);
    } else if (typeValue === "3") {
        selectContainer.style.display = "none";
        checkboxContainer.style.display = "block";
        
        let productCheckbox = document.getElementById("calc-product-checkbox");
        if (productCheckbox.checked) {
            propertyModifier = parseInt(productCheckbox.dataset.price, 10);
        }
    }

    // Итоговая стоимость: (базовая цена типа + опция + свойство) * количество
    let unitPrice = basePrice + optionModifier + propertyModifier;
    let total = quantity * unitPrice;

    resultDiv.innerHTML = "Стоимость заказа: " + total + " руб. (Цена за ед.: " + unitPrice + " руб.)";
}

window.addEventListener("DOMContentLoaded", function () {
    let quantityInput = document.getElementById("calc-quantity");
    let radios = document.querySelectorAll('input[name="service-type"]');
    let productSelect = document.getElementById("calc-product-select");
    let productCheckbox = document.getElementById("calc-product-checkbox");

    // Устанавливаем значение по умолчанию для количества, если пусто
    if (quantityInput.value === "") {
        quantityInput.value = "1";
    }

    // Вешаем обработчики событий на все элементы управления калькулятора
    quantityInput.addEventListener("input", calculateTotal);
    
    radios.forEach(function (radio) {
        radio.addEventListener("change", calculateTotal);
    });

    productSelect.addEventListener("change", calculateTotal);
    productCheckbox.addEventListener("change", calculateTotal);

    // Первичный расчет при загрузке страницы
    calculateTotal();
});