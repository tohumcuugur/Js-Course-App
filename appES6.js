//course class
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 10000); //Course {courseId: 8018, title: 'qweqwe', instructor: 'Uğur Tohumcu', image: '1.jpg'} çıktı bu şekilde verir.Rastgele id numarası üretsin ve silerken id numarası üzerinden silelim diye yapılıyor.title üzerinden yapmak isteseydik aynı title'a sahip başka bir kurs açılınca oda silinirdi. nb 
        this.title = title
        this.instructor = instructor
        this.image = image
    }
}

//UI class
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');

        var html =
            ` 
        <tr>
            <td><img src = "img/${course.image}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `; //Doom fonksiyonları ile yapılabilir fakat daha basit yol olan template string kullanacağız.
        list.innerHTML += html;
    }
    clearControls() {
        const title = document.getElementById("title").value = "";
        const instructor = document.getElementById("instructor").value = "";
        const image = document.getElementById("image").value = "";
    }
    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    showAlert(message, className) {
        var alert =
            `
            <div class="alert alert-${className}">
            ${message}
            </div>
        `;
        //Bu şekilde template string oluşturduğumuzda aşağıdaki gibi insertadjacentHtml kullanabiliriz.
        const row = document.querySelector('.row');
        //beforeBegin , afterBegin , beforeEnd , afterEnd
        row.insertAdjacentHTML('beforeBegin', alert);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }

}
//Storage
class Storage {
    static getCourses() {
        let courses;

        if (localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses')); //JSON tarafında işlem yapmak için JSON tarzında string ifade olarak saklayabiliriz. Uygulama tarafında JSON stringinden JSON objesine çevirmemiz gerekiyor. 
        }

        return courses;
    }
    static displayCourses() {
        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }
    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }
    static deleteCourse(element) {
        if (element.classList.contains("delete")) {
            const id = element.getAttribute('data-id');
            // console.log(id);
            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1); // hangi index'te ise o indexten itibaren 1 elemanı sil.
                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}
document.addEventListener('DOMContentLoaded', Storage.displayCourses);

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
    // console.log(ui);

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert("Please Complete The Form!", "warning"); // ilk parametre mesaj ikinci paremetre ise bootsrap class'ı olacak
    } else {
        //add course to list
        ui.addCourseToList(course);

        //save to local storage
        Storage.addCourse(course);

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

    //delete course
    if (ui.deleteCourse(e.target) == true) {
        ui.deleteCourse(e.target);
        //delete from local storage
        Storage.deleteCourse(e.target);
        ui.showAlert("The Course Has Been Deleted!", "danger") // ilk parametre mesaj ikinci paremetre ise bootsrap class'ı olacak
    }

});