(function() {

    // Initialize the default app
    var defaultApp = firebase.initializeApp(defaultAppConfig);
    console.log(defaultApp.name);

    var defaultStorage = firebase.database();




    class fly {
        constructor(name, str) {
            this.name = name;
            this.str = str;
        }
    }

    const f1 = new fly("test_name", "test_string");
    const f2 = new fly("test_name", "test_string");

    var lst = [f1, f2];

    // alert(lst[0].name)

    document.getElementById('button').addEventListener('click', function () {
        document.getElementById("textTop").innerHTML = "CHANGED";
    });

    var html = '';
    lst.forEach(element => {
        html += `<div class="card">
                <img src="/img_avatar.png" alt="Avatar" style="width:100%">
                <div class="container">
                    <div class="name"><b>` + element.name + `</b></div>
                    <div class="string">` + element.str + `</div>
                </div>
            </div>`
    });
    document.getElementById('cardContainer').innerHTML += html;



})();

