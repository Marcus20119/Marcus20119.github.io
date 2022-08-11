const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function addBodyScroll() {
   $('body').classList.add('modal-open');
}
function removeBodyScroll() {
   $('body').classList.remove('modal-open');
}

$('.trailer__arrow--next').onclick = function() {
   $('.trailer__carousel-main-next').click();
   $('.trailer__carousel-sub-next').click();
};
$('.trailer__arrow--prev').onclick = function() {
   $('.trailer__carousel-main-prev').click();
   $('.trailer__carousel-sub-prev').click();
};

for (let i = 1; i <= 3; i++) {
   $(`#trailer-${i}__close`).onclick = function() {
      const html = $(`#trailer-${i}__video`).innerHTML;
      $(`#trailer-${i}__video`).innerHTML = '';
      removeBodyScroll();
      setTimeout(function() {
         $(`#trailer-${i}__video`).innerHTML = html;
      }, 1000);
   };
}

let modalShows = $$('.modal__show-js');
Array.from(modalShows).forEach(function(modalShow) {
   modalShow.onclick = addBodyScroll;
});

let modalHides = $$('.modal__hide-js');
Array.from(modalHides).forEach(function(modalHide) {
   modalHide.onclick = removeBodyScroll;
});

const characters = [
   'argyle',
   'dustin',
   'eddie',
   'eleven',
   'erica',
   'hopper',
   'jonathan',
   'joyce',
   'lucas',
   'max',
   'mike',
   'murray',
   'nancy',
   'robin',
   'steve',
   'will'
];

const pages = Array(16).fill(0);


characters.forEach(function(character, index) {
   const modal = $(`#character-${character}__modal`);
   if (modal) {
      const nextBtn = modal.querySelector('.character__modal-next');
      const prevBtn = modal.querySelector('.character__modal-prev');
      const checkboxs = [...modal.querySelectorAll('.character__modal-checkbox')];
      const quantity = checkboxs.length;

      console.log(checkboxs);
      console.log(quantity);

      nextBtn.onclick = () => {
         pages[index]++;
         if(pages[index] > quantity) {
            pages[index] = quantity;
         } else {
            checkboxs[pages[index] - 1].checked = true;
         }
      };
      prevBtn.onclick = () => {
         pages[index]--;
         if(pages[index] < 0) {
            pages[index] = 0;
         } else {
            checkboxs[pages[index]].checked = false;
         }
      };
   }
});
