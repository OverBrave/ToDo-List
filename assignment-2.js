

const { Toast } = bootstrap;

let alertDOM = document.querySelector("#alert")
let listDOM = document.querySelector("#list")


const alertMessage = (type, text) => `<div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
            ${text}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>`

const CloseButton = `<button type="button" class="btn-close close" aria-label="Close">`

function newElement(){
    let NewElementDom = document.getElementById("task").value
    if (StringConroller(NewElementDom) == false) {
        toast("danger", "Lütfen boş bırakmayınız.");
    }
    else {
        let liDOM = document.createElement("li")
        liDOM.innerHTML = NewElementDom + CloseButton;
        listDOM.append(liDOM);
        document.getElementById("task").value = ""
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

function taskCompleted() {
    
    let listed = event.target;
    listed.classList.contains("checked") ? listed.classList.remove("checked") : listed.classList.add("checked");
    if (listed.classList.contains("close")) listed.parentElement.remove();
}
