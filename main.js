var dataApi = 'http://localhost:3000/filmsData';

runWeb();

function runWeb() {
    getData(renderData);
    handleCreateFilm();
}


function handleReplaceFilm(id) {
    var sectionLabel = document.querySelector('.edit-header');
    var currentBtnRep = document.querySelector('.btn-rep-' + id);
    var submitBtnRep = document.getElementById('edit-form__btn-rep');
    var submitBtnCre = document.getElementById('edit-form__btn-cre');
    if(!currentBtnRep.classList.contains('film-footer__btn-rep--checked')) {
        addDataReplace(id);
        resetOtherBtnReps();
        currentBtnRep.classList.add('film-footer__btn-rep--checked');
        sectionLabel.innerHTML = 'REPLACE SECTION';
        submitBtnCre.classList.add('hidden');
        submitBtnRep.classList.remove('hidden');
    } else {
        removeDataReplace()
        currentBtnRep.classList.remove('film-footer__btn-rep--checked');
        sectionLabel.innerHTML = 'CREATE SECTION';
        submitBtnCre.classList.remove('hidden');
        submitBtnRep.classList.add('hidden');
    }
    submitBtnRep.onclick = function() {
        var nameVn = document.querySelector('input[name="nameVn"]');
        var nameEn = document.querySelector('input[name="nameEn"]');
        var linkImg = document.querySelector('input[name="linkImg"]');
        var newData = {
            img: linkImg.value,
            nameVn: nameVn.value,
            nameEn: nameEn.value,
        }
        replaceFilm(newData, id);
        removeDataReplace()
        currentBtnRep.classList.remove('film-footer__btn-rep--checked');
        sectionLabel.innerHTML = 'CREATE SECTION';
        submitBtnCre.classList.remove('hidden');
        submitBtnRep.classList.add('hidden');
    }
}

    function replaceFilm(data, id) {
        var methodFetch = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        fetch(`${dataApi}/${id}`, methodFetch)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                document.querySelector('.film-header__img-' + id).src = data.img;
                document.querySelector('.film-content__nameVn-' + id).innerHTML = data.nameVn;
                document.querySelector('.film-content__nameEn-' + id).innerHTML = data.nameEn;
            });
    }

    function resetOtherBtnReps() {
        var btnReps = document.querySelectorAll('[class*=btn-rep-]');
        for (var btnRep of btnReps) {
            btnRep.classList.remove('film-footer__btn-rep--checked');
        }
    }

    function addDataReplace(id) {
        var linkImgData = document.querySelector('.film-header__img-' + id).src;
        var nameVnData = document.querySelector('.film-content__nameVn-' + id).innerHTML;
        var nameEnData = document.querySelector('.film-content__nameEn-' + id).innerHTML;
        var nameVn = document.querySelector('input[name="nameVn"]');
        var nameEn = document.querySelector('input[name="nameEn"]');
        var linkImg = document.querySelector('input[name="linkImg"]');

        nameVn.value = nameVnData;
        nameEn.value = nameEnData;
        linkImg.value = linkImgData;
    }

    function removeDataReplace() {
        var nameVn = document.querySelector('input[name="nameVn"]');
        var nameEn = document.querySelector('input[name="nameEn"]');
        var linkImg = document.querySelector('input[name="linkImg"]');

        nameVn.value = '';
        nameEn.value = '';
        linkImg.value = '';
    }

function handleDeleteFilm(id) {
    var methodFetch = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    fetch(`${dataApi}/${id}`, methodFetch)
        .then(function() {
            var deleteItem = document.querySelector('.film-' + id);
            if (deleteItem) {
                deleteItem.remove();
            }
        })
}

function handleCreateFilm() {
    var createBtn = document.getElementById('edit-form__btn-cre');
    createBtn.onclick = function() {
        var nameVn = document.querySelector('input[name="nameVn"]');
        var nameEn = document.querySelector('input[name="nameEn"]');
        var linkImg = document.querySelector('input[name="linkImg"]');
        var newData = {
            img: linkImg.value,
            nameVn: nameVn.value,
            nameEn: nameEn.value,
        }
        // Xóa ô input sau khi nhập
        nameVn.value = '';
        nameEn.value = '';
        linkImg.value = '';
        createFilm(newData);
    }
}

    function createFilm(data) {
        var methodFetch = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        fetch(dataApi, methodFetch)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                renderData([data]);
            });
    }

function renderData(films) {
    var htmls = films.map(function(film) {
        return `
        <div class="col c-3 pc-c-4 tb-c-6 mb-c-6 film-${film.id}">
            <div class="film">
                <div class="film-header">
                    <img class="film-header__img-${film.id}" src="${film.img}"></img>
                </div>
                <div class="film-content">
                    <h2 class="film-content__nameVn-${film.id}">${film.nameVn}</h2>
                    <h3 class="film-content__nameEn-${film.id}">${film.nameEn}</h3>
                </div>
                <div class="film-footer">
                    <button onclick="handleDeleteFilm(${film.id})" class="film-footer__btn-del">Delete</button>
                    <button onclick="handleReplaceFilm(${film.id})" type="checkbox" class="btn-rep-${film.id}">Replace</button>
                </div>
            </div>
        </div>
        `;
    });
    var html = htmls.join('');
    //Nối vào giá trị hiện tại của phần cần nhập
    var currentList = document.querySelector('.list-films').innerHTML;
    document.querySelector('.list-films').innerHTML = currentList + html;
}

function getData(callback) {
    fetch(dataApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}
