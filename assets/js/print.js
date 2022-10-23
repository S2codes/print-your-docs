// genrate random 
const rand_str = (Math.random() + 1).toString(36).substring(7)
document.getElementById('uid').value = rand_str;

// upload documents  
document.getElementById('uploadDForm').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('from submit');
    const userFile = document.getElementById("file").files[0];
    console.log('file data');
    // console.log(userFile);
    // console.log(userFile.name);

    const id = document.getElementById("uid").value;
    // const color = document.getElementById("colorType").value;
    const paper = document.getElementById("paperType").value;
    const start_page = document.getElementById("startpage").value;
    const end_page = document.getElementById("endpage").value;
    const num_copies = document.getElementById("copiesNo").value;
    console.log('this is id', id);

    // let Filedata = [userFile.name, color, paper, num_copies];

    const formData = new FormData();

    formData.append('user-File', userFile);
    formData.append('paper', paper)
    formData.append('start_page', start_page)
    formData.append('end_page', end_page)
    formData.append('number_copies', num_copies)
    formData.append('id', id)

    console.log("form data: ");
    // console.log(formData.values());
    console.log(formData);

    fetch('http://localhost/fileuploader/api/post.php', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => appendFileData(data))
        .catch(err => console.log(err))


})

let gross_price = 0;
let total_documents = 0;

// append item 
function appendFileData(data) {
    console.log(data);
    console.log(data.response);

    if (data.response) {
        document.getElementsByClassName("odd")[0].style.display="none"  

        document.getElementById('documentList').innerHTML += 
        `<tr>
        <td>${data.file_name}</td>
        <td>${data.paper}</td>
        <td>${data.total_page}</td>
        <td>${data.no_copies}</td>
        <td>${data.price}</td>
    </tr>`

        gross_price = gross_price + data.price;
        document.getElementById("gross_price").value = gross_price;

        total_documents = total_documents + 1;
        document.getElementById("total_documents").value = total_documents;
       
        document.getElementById("uploadDForm").reset();
        let myModalEl = document.getElementById('uploadModal')
        let modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();


    }


}