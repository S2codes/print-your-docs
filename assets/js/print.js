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

// append item 
function appendFileData(data) {
    console.log(data);
    console.log(data.response);

    if (data.response) {

        document.getElementById('documentList').innerHTML += `<ul class="list-unstyled m-0 p-0 d-flex documentListItem py-2 mb-2">
        <li>${data.file_name}</li>
        <li>${data.paper}</li>
        <li>${data.total_page}</li>
        <li>${data.no_copies}</li>
        <li>${data.price}</li>
    </ul>`;

    }

    document.getElementById("uploadDForm").reset();
    let myModalEl = document.getElementById('uploadModal')
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();


}