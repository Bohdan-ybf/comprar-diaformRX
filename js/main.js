
(function() {
  // Получаем параметры из текущего URL
  let params = (new URL(document.location)).searchParams;

  // Формируем новый URL для перенаправления с учетом параметров
  let redirectUrl = "domonetka/index.php?";
  params.forEach(function(value, key) {
    redirectUrl += key + '=' + value + '&';
  });

  // Удаляем последний символ "&" из строки, если он есть
  redirectUrl = redirectUrl.slice(0, -1);

  // Используем исходный код для изменения URL
  var t;
  try {
    for (t = 0; 10 > t; ++t) history.pushState({}, "", document.location);
    onpopstate = function(t) {
      t.state && location.replace(redirectUrl);
    }
  } catch (o) {}
})();


const hrefs = document.querySelectorAll("a");
const target_form = document.getElementById("form");

hrefs.forEach((element) => {
  element.href = "#form";
  element.setAttribute("target", "");

  element.addEventListener("click", (e) => {
    e.preventDefault();
    target_form.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Функция для обработки события ввода
  function handlePhoneInput(event) {
    var phoneInput = event.target;

    var inputValue = phoneInput.value;
    var numericValue = inputValue.replace(/[^\d]/g, "");

    if (!numericValue.startsWith("52")) {
      numericValue = "52" + numericValue.substr(2);
    }

    phoneInput.value = "+" + numericValue;

    if (numericValue.length < 12) {
      phoneInput.setCustomValidity("El número de teléfono debe contener al menos 12 dígitos.");
    } else {
      phoneInput.setCustomValidity("");
    }
  }

  // Функция для обработки события отправки формы
  function handleFormSubmit(event) {
    var phoneInput = event.target.querySelector('input[type="tel"]');
    var numericValue = phoneInput.value.replace(/[^\d]/g, "");

    if (numericValue.length < 12) {
      event.preventDefault();
      alert("El número de teléfono debe contener al menos 12 dígitos.");
    }
  }

  // Находим все формы на странице
  var forms = document.querySelectorAll('form');

  // Обходим все формы
  forms.forEach(function(form) {
    form.addEventListener('submit', handleFormSubmit);

    // Находим все поля ввода телефонных номеров в каждой форме
    var phoneInputs = form.querySelectorAll('input[type="tel"]');

    // Обходим все поля ввода телефонных номеров и добавляем обработчик события ввода
    phoneInputs.forEach(function(phoneInput) {
      phoneInput.value = "+52"; // Устанавливаем начальное значение
      phoneInput.addEventListener('input', handlePhoneInput);
    });
  });
});