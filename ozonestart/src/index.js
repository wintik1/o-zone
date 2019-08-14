'use strict';

// чексбокс
 const checkbox = document.getElementById('discount-checkbox');

 checkbox.addEventListener('change', function(){
     
   if(this.checked) {
       // следующий элемент по верстке
       this.nextElementSibling.classList.add('checked');
   }
   else {
    this.nextElementSibling.classList.remove('checked');
   }

 });
 
// end чекбокс


//корзину
 const btnCart = document.getElementById('cart');
 const modalCart =  document.querySelector('.cart');
 const closeBtn = document.querySelector('.cart-close');

 btnCart.addEventListener('click', function(){
     modalCart.style.display = 'flex';
     document.body.style.overflow = 'hidden';
 });

 closeBtn.addEventListener('click', function(){
    modalCart.style.display = 'none';
    document.body.style.overflow = 'none';
});

// end корзина




//работа с корзиной

    const cards = document.querySelectorAll('.goods .card');
    const CartWrapper = document.querySelector('.cart-wrapper');
    const CartEmpty  = document.getElementById('cart-empty');
    const countGoots = document.querySelector('.counter');


    cards.forEach(function(card){
        const btn = card.querySelector('button');
        btn.addEventListener('click', function(){
            CartEmpty.remove();
            const cardClone = card.cloneNode(true);
            CartWrapper.appendChild(cardClone);
            showData();
        });
    });


    function showData() {
        const cardsCard = CartWrapper.querySelectorAll('.card');
        countGoots.textContent = cardsCard.length;
        console.log(cardsCard.length);
    }





//end работа с корзиной