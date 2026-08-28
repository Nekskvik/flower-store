/* АККОРДИОН */
document.querySelectorAll('.accordion').forEach((accordion) => {
  const headers = accordion.querySelectorAll('.accordion-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement; // .accordion-item
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Закрыть все элементы внутри текущего аккордеона
      accordion.querySelectorAll('.accordion-item').forEach((otherItem) => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        otherContent.style.maxHeight = null;
      });

      // Если кликнутый элемент не был активен — открыть его
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});



/* СЛАЙДЕР */
let sliderImages = document.querySelectorAll(".slide"),
    arrowLeft = document.querySelector("#arrow-left"),
    arrowRight = document.querySelector("#arrow-right"),
    current = 0;

// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
    }
}

// Initial slide
function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

// Show previous
function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = "block";
    current--;
}

// Show next
function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

startSlide();


/* ПОПАП */
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
