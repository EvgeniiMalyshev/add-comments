let comments = [];
let blockComments = document.querySelector('.block-comments');
let id = 0;
let inputName = document.querySelector('.input-name');
let inputDate = document.querySelector('.input-date');
let inputText = document.querySelector('.input-text');

createComment()

document.querySelector('.form').addEventListener('submit', (e)=>{

    e.preventDefault();

    if (inputName.value === '') {
        inputName.parentElement.classList.add('form_error');
        return
    }

    if (inputText.value === '') {
        inputText.parentElement.classList.add('form_error');
        return
    }

    let comment = {
        id: ++id,
        name: inputName.value,
        date: Date.parse(inputDate.value) || Date.now(),
        text: inputText.value,
        like: false
    }

    inputName.value = '';
    inputDate.value = '';
    inputText.value = '';

    comments.push(comment);

    createComment();

})


blockComments.addEventListener('click', (e)=>{
    if (e.target.classList.contains('bi-heart-fill')) {
        const idComment = e.target.parentElement.parentElement.getAttribute('key');
        const index = comments.findIndex(item=>item.id==idComment);
        const newItem = {...comments[index], like: !comments[index].like};
        comments = [...comments.slice(0, index),newItem, ...comments.slice(index+1)]
        createComment()
    }
})

blockComments.addEventListener('click', (e)=>{
    if (e.target.classList.contains('bi-trash')) {
        const idComment = e.target.parentElement.parentElement.getAttribute('key');
        comments = [...comments.filter(item => item.id != idComment)]
        createComment()
    }
})

inputName.addEventListener('input', ()=>{
    if (inputName.value.length >= 1) {
        inputName.value = inputName.value[0].toUpperCase() + inputName.value.slice(1);
    }
    inputName.parentElement.classList.remove('form_error');
})

inputText.addEventListener('input', ()=>{
    inputText.parentElement.classList.remove('form_error');
})

function createComment() {
    
    let newComment = '';

    if (comments.length < 1) {
        return blockComments.innerHTML = `<div class="comment_empty">Комментарий нет...</div>`
    }
    
    comments.forEach((item)=>{

        newComment += 
        `<div class="comment" key="${item.id}">
            <div class="comment_heart ${item.like? "like": ""}">
                <i class="bi bi-heart-fill"></i>
            </div>

            <div class="comment_trash">
                <i class="bi bi-trash"></i>
            </div>

            <div class="comment_wrapper">
                <div class="comment_name">${item.name}</div>
                <div class="comment_date">${timeConverter(item.date)}</div>
            </div>
            <div class="comment_text">${item.text}</div>
        </div>`
    })

    blockComments.innerHTML = newComment;
}

function timeConverter(timeFromInput){
    let a = new Date(timeFromInput);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = new Date(Date.now()).getHours();
    let min = new Date(Date.now()).getMinutes();

    let quantityDays = Math.floor((Date.now() - timeFromInput) / (1000 * 60 * 60 * 24));

    if (quantityDays < 1 && quantityDays >= 0) {
        return `Сегодня ${addZero(hour)}:${addZero(min)}`
    } else if (1 <= quantityDays && quantityDays < 2) {
        return `Вчера ${addZero(hour)}:${addZero(min)}`
    } else {
        return `${date} ${month} ${year} ${addZero(hour)}:${addZero(min)}`;
    }
}

function addZero(num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}