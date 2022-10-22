$(document).ready(function () {

    // preloader 
    window.onload = function () {
        document.getElementById('preloader').style.display = "none";
    }

    // sticky Nav 
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 20) {
            $("#navbar").addClass("sticky");
        } else {
            $("#navbar").removeClass("sticky");
        }
    });

    function appendFileData(data) {
        $('#documentList').append(`
        <div class="item">
        <p class="m-0"><strong>FileName :</strong> ${data[0]}</p>
        <p class="m-0">${data[1]} x ${data[2]} x ${data[3]}</p>
    </div>`);
    }


})


// upload documents  
document.getElementById('uploadDForm').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('from submit');
    const userFile = document.getElementById("file").files[0];
    console.log('file data');
    console.log(userFile);
    console.log(userFile.name);

    const color = document.getElementById("colorType").value;
    const paper = document.getElementById("paperType").value;
    const num_copies = document.getElementById("copiesNo").value;

    let Filedata = [userFile.name, color, paper, num_copies];

    const formData = new FormData();

    formData.append('user-File', userFile);
    formData.append('color', color)
    formData.append('paper', paper)
    formData.append('number_copies', num_copies)
    formData.append('id', 1245)

    console.log(formData.values());

    fetch('http://localhost/fileuploader/api/post.php', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => appendFileData(Filedata))
        .catch(err => console.log(err))


})


function appendFileData(data) {
    // document.getElementById('documentList').appendChild(`
    //     <div class="item">
    //         <p class="m-0"><strong>FileName :</strong> ${data[0]}</p>
    //         <p class="m-0">${data[1]} x ${data[2]} x ${data[3]}</p>
    //     </div>
    // `);

    document.getElementById('documentList').innerHTML += `  <div class="item">
    <p class="m-0"><strong>FileName :</strong> ${data[0]}</p>
    <p class="m-0">${data[1]} x ${data[2]} x ${data[3]}</p>
</div>`;

}