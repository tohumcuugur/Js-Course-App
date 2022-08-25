//Es5 constructor yapısını kavramak amacıyla yapıldı fakat html iskeletinde script dosyası olarak yanlızca ES6 versiyonu bulunuyor.
//Course contructor
function Course(title, instructor, image) { // fonksiyon isminin büyük harfle başlaması tavsiye edilir.
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI contructor
function UI() {

}
UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById('course-list');

    var html = ` 
        <tr>
            <td><img src = "img/${course.image}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `; //Doom fonksiyonları ile yapılabilir fakat daha basit yol olan template string kullanacağız.
    list.innerHTML += html;
}
UI.prototype.clearControls = function () {
    const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
}

UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}
UI.prototype.showAlert = function (message, className) {
    var alert = `
        <div class="alert alert-${className}">
        ${message}
        </div>
    `;
    //Bu şekilde template string oluşturduğumuzda aşağıdaki gibi insertadjacentHtml kullanabiliriz.
    const row = document.querySelector('.row');
    //beforeBegin , afterBegin , beforeEnd , afterEnd
    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000)
}

document.getElementById("new-course").addEventListener("submit", function (e) {
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    // console.log(title, instructor, image);

    //create couse object
    const course = new Course(title, instructor, image);
    // console.log(course);

    //create UI
    const ui = new UI();
    console.log(ui);

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert("Please Complete The Form!", "warning"); // ilk parametre mesaj ikinci paremetre ise bootsrap class'ı olacak
    } else {
        //add course to list
        ui.addCourseToList(course);

        // clear controls
        ui.clearControls();

        ui.showAlert("The course has been added", "success")
    }

    //save to database

    e.preventDefault();
});

document.getElementById("course-list").addEventListener('click', function (e) {
    // console.log(e.target);
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert("The Course Has Been Deleted!", "danger") // ilk parametre mesaj ikinci paremetre ise bootsrap class'ı olacak
});