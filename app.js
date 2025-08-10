// tüm elementleri seçmer
const form = document.querySelector("#todoAddForm");
const input = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const cardbody1 = document.querySelectorAll(".card-body")[0];
const cardbody2 = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const inputSearch = document.querySelector("#todoSearch");
let todos = [];

runEvents();

// elementlere event ekleriz ve bu fonksiyonla uygulamayı başlatır.
function runEvents() {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", LoadStorageTodos);
    cardbody2.addEventListener("click", removeTodo);
    clearButton.addEventListener("click", allTodoClear);
    inputSearch.addEventListener("keyup", filterTodos);
  

}
// todo ekleme fonksiyonu burdan iki fonksiyonuda kullanırız ve todoları hem uı a hemde local storage a ekleriz.
function addTodo(e) {

    const todoName = input.value.trim();

    if (todoName == "" || todoName == null) {
        ShowMessage("warning", "Lütfen bir değer giriniz!!");
    } else {
        addTodoToUI(todoName);
        addTodoToStorage(todoName);
        ShowMessage("success", "Todo başarıyla eklendi");
    }
    e.preventDefault();
}

// uı a element oluşturarak todo ekler
function addTodoToUI(todo) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = todo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);


    input.value = "";


}

// local storagea todo ekler
function addTodoToStorage(todo) {
    checkTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

// local storageden todoları kontrol eder
function checkTodos() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

}

// sayfa yüklenince uı a todoları getirir
function LoadStorageTodos() {
    checkTodos();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

// Geri Bildirim mesajı oluşturur
function ShowMessage(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    cardbody1.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2500);
}

// ana remove fonksiyonu burdan 2 fonksiyonada ulaşıyoruz hem uı dan hemde local storage dan todoları siler
function removeTodo(e) {

    const todo = removeTodoUI(e);
    if (todo === undefined || todo === null) {
        return;
    }
    else {
        const todoName = todo.textContent;
        removeTodoFromStorage(todoName);
        ShowMessage("success", "Todo başarıyla silindi");
    }
}

// Fonksiyon, todo'yu UI'dan siler ve geri döndürür
function removeTodoUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        return todo;
    }
}

// local storage'dan silme
function removeTodoFromStorage(todo) {
    checkTodos();
    todos.forEach(function (item, index) {
        if (item === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));


}

// tüm todoları uı dan ve local storagedan temizler
function allTodoClear() {
    const todolistesi = document.querySelectorAll(".list-group-item");
    // ekrandan silme
    if (todolistesi.length > 0) {
        todolistesi.forEach(function (todo) {
            todo.remove();
        });
        // Local Storage'dan silme
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        ShowMessage("success", "Tüm todo'lar başarıyla silindi");
    }

    else {
        ShowMessage("warning", "Silinecek herhangi bir todo bulunamadı!");
    }
}

// todo filtrelemek için kullanılır
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todos = document.querySelectorAll(".list-group-item");
    

   if (todos.length > 0) {
        todos.forEach(function (todo) {
            const TodoText = todo.textContent.toLowerCase().trim();
            if (TodoText.includes(filterValue)) {
                todo.setAttribute("style", "display:block");
        
            } else {
                todo.setAttribute("style", "display:none !important");
            }
        });
    }
    else {
      ShowMessage("warning", "Filtrelenecek herhangi bir todo bulunamadı!");
    }


}
