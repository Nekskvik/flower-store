// АВТОМАТИЧЕСКИЙ ВЫВОД ДАТЫ И ВРЕМЕНИ
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date();
    dateElement.textContent = currentDate.toLocaleString();
}
setInterval(updateDate, 1000);



// САМО-ПЕЧАТАЮЩИЙСЯ ТЕКСТ
let typeText = document.querySelector("#output")
let textToBeTyped = "ОБУЧЕНИЕ ПИЛАТЕС"
let index = 0, isAdding = true
function playAnim() {
  setTimeout(function () {
    // set the text of typeText to a substring of
    // the textToBeTyped using index.
    typeText.innerText = textToBeTyped.slice(0, index)
    if (isAdding) {
      // adding text
      if (index > textToBeTyped.length) {
        // no more text to add
        isAdding = false
        //break: wait 2s before playing again
        setTimeout( function () {
          playAnim()
        }, 2000)
        return
      } else {
        // increment index by 1
        index++
      }
    } else {
      // removing text
      if (index === 0) {
        // no more text to remove
        isAdding = true
      } else {
        // decrement index by 1
        index--
      }
    }
    // call itself
    playAnim()
  }, 120)
}
// start animation
playAnim()



// БУРГЕР МЕНЮ
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  // Переключение меню по клику на бургер
  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Закрываем меню при клике на любой пункт (удобно на мобильных)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Открыть меню');
      }
    });
  });

  // Закрываем меню при клике вне шапки
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.header__inner')) {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});



//ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЭЛЕМЕНТА

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);

if (targetElement) {
// Получаем позицию элемента относительно верха страницы
const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

// Текущая позиция скролла
const startPosition = window.pageYOffset;

// Расстояние, которое нужно прокрутить
const distance = targetPosition - startPosition;

// Продолжительность анимации в миллисекундах
const duration = 800;

let startTimestamp = null;

function animation(timestamp) {
if (!startTimestamp) startTimestamp = timestamp;

// Прошедшее время
const elapsed = timestamp - startTimestamp;

// Функция сглаживания (ease-in-out)
const progress = Math.min(elapsed / duration, 1);
const easeInOut = progress < 0.5
? 2 * progress * progress
: -1 + (4 - 2 * progress) * progress;

// Применяем прокрутку
window.scrollTo(0, startPosition + distance * easeInOut);

// Продолжаем анимацию, если она не закончилась
if (elapsed < duration) {
window.requestAnimationFrame(animation);
}
}

// Запускаем анимацию
window.requestAnimationFrame(animation);
}
});
});



// ПОПАП
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeFormBtn');
    const popup = document.getElementById('formPopup');
    const form = document.getElementById('callbackForm');
    const successMessage = document.getElementById('successMessage');

    // Открыть блок
    openBtn.addEventListener('click', function () {
        popup.classList.add('open');
    });

    // Закрыть по крестику
    closeBtn.addEventListener('click', function () {
        popup.classList.remove('open');
    });

    // Закрыть по клику на затемнённую область (вне содержательной части)
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
        popup.classList.remove('open');
        }
    });

    // Закрыть по клавише Esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('open')) {
        popup.classList.remove('open');
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // не перезагружаем страницу

        // Скрываем форму и показываем сообщение об успехе
        form.style.display = 'none';
        successMessage.hidden = false;

        // Через 3 секунды закрыть блок и вернуть форму в исходное состояние
        setTimeout(function () {
        popup.classList.remove('open');
        form.reset();
        form.style.display = '';
        successMessage.hidden = true;
        }, 3000);
    });
});
