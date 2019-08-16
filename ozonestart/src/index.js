'use strict';

// чексбокс АКЦИЯ
function toggleCheckbox() {

    const checkbox = document.getElementById('discount-checkbox'); // чекбокс input АКЦИЯ

    checkbox.addEventListener('change', function () {

        if (this.checked) {

            // следующий элемент по верстке
            this.nextElementSibling.classList.add('checked'); // добавляем сласс для птички
        } else {
            this.nextElementSibling.classList.remove('checked'); // удаляем класс для птички
        }

    });

}
// end чекбокс АКЦИЯ





    //корзина
     
    // появление и исчезание корзины
    function toggleCart() {
    const btnCart = document.getElementById('cart');  // рисунок корзины вверху (виден)
    const modalCart = document.querySelector('.cart');  // корзина внизу (скрыта)
    const closeBtn = document.querySelector('.cart-close'); // крестик закрытия корзины


    //вешаем слушателя на появление корзины
    btnCart.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // вешаем слушателя на исчезание корзны
    closeBtn.addEventListener('click', function () {
        modalCart.style.display = 'none';
        document.body.style.overflow = 'none';
    });
    }

//end корзина





//работа с корзиной
    

// создание карточек-клонов в корзине
    function addCart() {

    const cards = document.querySelectorAll('.goods .card');  // все карточки
    const CartWrapper = document.querySelector('.cart-wrapper'); //место в корзине под карточки-клоны
    const CartEmpty = document.getElementById('cart-empty');  //текст с пустой корзиной
    const countGoots = document.querySelector('.counter'); // число карточек-клонов в корзине
    


    //  вешаем слушателя на кнопки всех карточек  
    cards.forEach(function (card) {
        const btn = card.querySelector('button');
        btn.addEventListener('click', function () {
          
            // создание карточки-клона в корзине, 
            const cardClone = card.cloneNode(true);
            CartWrapper.appendChild(cardClone);
            showData();

            //переопределяем кнопку карточки-клона  в корзине
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
            cardClone.remove();
            showData();
            });
        });
    });



    // подсчет  карточек-клонов в корзине
    function showData() {
        const cardsCard = CartWrapper.querySelectorAll('.card'); // массив из карточек-клонов
        const cardsPrice = CartWrapper.querySelectorAll('.card-price'); //  массив цен всех карточек-клонов 
        const cardTotal = document.querySelector('.cart-total span'); // общая стоимость карточек-клонов
        let sum = 0; //  переменная общей цены в  корзине
        countGoots.textContent = cardsCard.length; //длина массива с карточками-клонами


        // сложение стоимости всех карточек-клонов в массиве
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
            });

        cardTotal.textContent = sum; //запись в переменную с ценой


         // появление и удаление текста в пустой корзине
                if (cardsCard.length !== 0) {
                        CartEmpty.remove();
                    } 
                else {   CartWrapper.appendChild(CartEmpty);
                    }
       
    }
}
//end работа с корзиной






//фильтр акции и поиск

    // сортировка карточек товара
    function actionPage() {
    
    const cards = document.querySelectorAll('.goods .card'); // все карточки страницы
    const discountCheckbox = document.getElementById('discount-checkbox'); // чекбокс АКЦИЯ
    const goods = document.querySelector('.goods');
    let min = document.getElementById('min');  // input минимальной цены
    let max = document.getElementById('max'); //input максимальной цены
     
    const search = document.querySelector('.search-wrapper_input'); // строка поиска
    const searchBtn = document.querySelector('.search-btn');  // кнопка поиска





    // фильтр по акции
    discountCheckbox.addEventListener('click', () => {

        // перебираем все карточки
        cards.forEach((card) => {
           
                if(discountCheckbox.checked) {

                    // проверяем есть ли card-sale в карточке
                    if(!card.querySelector('.card-sale')) {
                            card.parentNode.style.display = 'none'; // скрываем карточку родителя
                        }

                }
                else { 
                    card.parentNode.style.display = ''; // появляются карточки все
               
                }
        });

    });


      // фильтр по цене
      min.addEventListener('change', filterPrice);
      max.addEventListener('change', filterPrice);

        function filterPrice(){
                cards.forEach((card) =>{
                    const cardPrice = card.querySelector('.card-price'); // находим цену всех карточек
                    const price = parseFloat(cardPrice.textContent); // отсеиваем все символы и пробелы

                    if (( min.value && price < min.value) || ( max.value && price > max.value))
                
                     {
                        card.parentNode.remove();
                    } 
                    else { 
                        goods.appendChild(card.parentNode); 
                    }
                });
        }

      
        // поиск
        searchBtn.addEventListener('click', function(){
            
            const searchText =  new RegExp(search.value.trim(), 'i' );// конструктор регулярного выражения + убираем пробелы
            cards.forEach((card) => {
                const title = card.querySelector('.card-title');
                if(!searchText.test(title.textContent)) {
                    card.parentNode.style.display = 'none' ;
                }
                else {
                    card.parentNode.style.display = '' ;
                }
                search.value = '';
            });
            // console.log(searchText);

        });
    
}
//end фильтр акции

// получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
            return fetch('../db/db.json')
            .then((response)=> {
        
            if(response.ok){
                return response.json();
            }
            else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })

        .then((data) => {
            return data;
        })

        .catch((err) => {
            // console.warn(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 5rem;">Урс что-то пошло не так</div>';
        });


}
// выводим карточки товара
function renderCards(data) {
    const goodsWrapper  = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
                      
                       <div class="card" data-category="${good.category}">
                       ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                       
                           <div class="card-img-wrapper">
                             <span class="card-img-top"
                                 style="background-image: url('${good.img}')"></span>
                         </div>
                         <div class="card-body justify-content-between">
                             <div class="card-price" style="${good.sale ? 'color: red' : '  '}">${good.price } ₽ </div>
                             <h5 class="card-title">${good.title}</h5>
                             <button class="btn btn-primary">В корзину</button>
                         </div>
                        </div>
                
        `;
        goodsWrapper.appendChild(card);
    });
}
//-- end  получение данных с сервера


function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card'); // карточки товаром
    const catalogList = document.querySelector('.catalog-list'); // ul кнопки каталог
    const catalogWrapper = document.querySelector('.catalog'); //  сам каталог в нем лежит ul
    const catalogBtn = document.querySelector('.catalog-button'); //  сама кнопка каталог
    const categories = new Set(); // хранит массив уникальных имен
    cards.forEach((card) =>{
        categories.add(card.dataset.category);
    });
    categories.forEach((item)=> {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });
   

    catalogBtn.addEventListener('click', (event)=> {

        
        if(catalogWrapper.style.display ){
            catalogWrapper.style.display =  '' ; 
            console.log(true);
        }
        else { 
            console.log(false);
            catalogWrapper.style.display = 'block';
    }
      
        if(event.target.tagName === 'LI') {
              cards.forEach((card)=>{

                if(card.dataset.category  === event.target.textContent) {
                    card.parentNode.style.display = '';
                }
                else {
                    card.parentNode.style.display = ' none ';
                }
        });
         }

    });

      
    // console.log(categories);
}



getData().then((data) =>{
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});

