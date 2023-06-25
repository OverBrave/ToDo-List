

const { Toast } = bootstrap;

let alertDOM = document.querySelector("#alert")
let listDOM = document.querySelector("#list")


// LocalStorage ile yapılacakları kaydettik.
let ToDo_List = localStorage.getItem("todo-list") ? BackupData() : onFirstStart()

function onFirstStart() {
    let ToDo_List = [
        `<li>3 Litre Su İç<button type="button" class="btn-close close" aria-label="Close"></button></li>`,
        `<li>Ödevleri Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>`,
        `<li>En Az 3 Saat Kodlama Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>`,
        `<li>Yemek Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>`,
        `<li>50 Sayfa Kitap Oku<button type="button" class="btn-close close" aria-label="Close"></button></li>`

    ]
    localStorage.setItem("todo-list", JSON.stringify(ToDo_List));

    listDOM.innerHTML = `
    <li>3 Litre Su İç<button type="button" class="btn-close close" aria-label="Close"></button></li>
    <li>Ödevleri Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>
    <li>En Az 3 Saat Kodlama Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>
    <li>Yemek Yap<button type="button" class="btn-close close" aria-label="Close"></button></li>
    <li>50 Sayfa Kitap Oku<button type="button" class="btn-close close" aria-label="Close"></button></li>
    `
    return ToDo_List
}

function BackupData() {
    let ToDo_List = localStorage.getItem("todo-list");
    
    ToDo_List = JSON.parse(ToDo_List)

    ToDo_List.forEach(element => {
        listDOM.innerHTML += element
    });

    return ToDo_List
}

// Uyarı mesajları için önayarlı kısım.
const alertMessage = (type, text) => `<div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
            ${text}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>`

const CloseButton = `<button type="button" class="btn-close close" aria-label="Close">`

// Listeye veri ekleme
function newElement(){
    let NewElementDom = document.getElementById("task").value
    if (StringConroller(NewElementDom) == false) {
        toast("danger", "Lütfen boş bırakmayınız.");
    }
    else {
        let liDOM = document.createElement("li")
        liDOM.innerHTML = NewElementDom + CloseButton;
        listDOM.append(liDOM);
        document.getElementById("task").value = "";
        ToDo_List.push(liDOM.outerHTML);
        localStorage.setItem("todo-list", JSON.stringify(ToDo_List));
        toast("success", "Yapılacaklara başarıyla eklendi!");
        // liDOM.classList.add("list")
        }
}

function StringConroller(text) {
    // if (TextLenght == 0) {
    //     return false;}
    // else {
    //     for (let index = 0; TextLenght > index; index++) {
    //         console.log(index, text[index])
    //         if (text[index] = " ") return false;
    //         }
    // }
    if (!text || text.length == 0 || text.trim().length == 0) {
        return false;
    }
}

// Bildirim baloncuğu oluşturma
function toast(type, text) {
    alertDOM.innerHTML = (alertMessage(type, text).trim())
    var ToastAlert = alertDOM.lastChild;
    window[type] = new Toast(ToastAlert);
    window[type].show();
}

// Listeyi düzenleme
function taskCompleted() {
    
    let listed = event.target;
    
    if (listed.classList.contains("close")) {

        const i = ToDo_List.indexOf(listed.parentElement.outerHTML)
        listed.parentElement.remove();
        
        ToDo_List.splice(i, 1);
    }
    else {
        const i = ToDo_List.indexOf(listed.outerHTML);
        listed.classList.contains("checked") ? listed.classList.remove("checked") : listed.classList.add("checked")
        ToDo_List[i] = listed.outerHTML;
    };

    localStorage.setItem("todo-list", JSON.stringify(ToDo_List));
}