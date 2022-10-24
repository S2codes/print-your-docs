// genrate random 
const rand_str = (Math.random() + 1).toString(36).substring(7)
document.getElementById('uid').value = rand_str;

// upload documents  
document.getElementById('uploadDForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userFile = document.getElementById("file").files[0];
    const id = document.getElementById("uid").value;
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

    fetch('https://signupapi2.000webhostapp.com/fileuploader/api/post.php', {
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
    

    if (data.response) {
        document.getElementsByClassName("odd")[0].style.display = "none"

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
        document.getElementById("total_price_docs").innerText = gross_price;

        total_documents = total_documents + 1;
        document.getElementById("total_documents").value = total_documents;
        document.getElementById("total_num_docs").innerText = total_documents;

        document.getElementById("uploadDForm").reset();
        let myModalEl = document.getElementById('uploadModal')
        let modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();


    }


}

document.getElementById("main_form").addEventListener("submit", function (e) {
    e.preventDefault()
    console.log('main form....');
    let id= document.getElementById("uid").value;
    let user_name = document.getElementById("user_name").value;
    let user_contact = document.getElementById("user_phone").value;
    let user_address = document.getElementById("user_address").value;
    // let total_documents = total_documents;
    // let total_price = gross_price

    const infoForm = new FormData();
    infoForm.append("user_id", id)
    infoForm.append("user_name", user_name)
    infoForm.append("user_contact", user_contact)
    infoForm.append("user_address", user_address)
    infoForm.append("total_documents", total_documents)
    infoForm.append("total_price", gross_price)

    fetch('https://signupapi2.000webhostapp.com/fileuploader/api/details.php', {
        method: "POST",
        body: infoForm
    })
    .then(res => res.json())
    .then(data => checkOut(data))
    .catch(err => console.log(err))

})

// payment 
function checkOut(data) {
    if (data.response) {
        console.log("payment succcess");
        let description = "Hello user"
        razorPayCheckOut(data.name, data.contact, data.total_price, description) 
    }else{
        swal("Error", "Something Went Wrong", "error");
    }
    
}


function razorPayCheckOut(name, phone, amount, description) {
    console.log("razorpay call");
    var options = {
        "key": "rzp_test_6VMTphJLnYHj1A",
        "amount": amount * 100,
        "currency": "INR",
        "name": "Print Your Docs",
        "description": description,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnTicgjQiy-_VP9RLm46WumjNobIeSV52iGw&usqp=CAU",

        
        "handler": function (response) {
            const pid = response.razorpay_payment_id;
            paymentSucess(pid);
        },
        "prefill": {
            "name": name,
            "email": "",
            "contact": phone
        },
        "notes": {
            "address": "Print Your Docs"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    // rzp1.on('payment.failed', function(response) {
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
    // });
    // document.getElementById('rzp-button1').onclick = function(e) {
    rzp1.open();
    // e.preventDefault();
    // }



}


function paymentSucess(pid) {
    let id= document.getElementById("uid").value;
    const payStatus = new FormData();
    payStatus.append("user_id", id)
    payStatus.append("payment_id", pid)

    fetch('https://signupapi2.000webhostapp.com/fileuploader/api/paystatus.php', {
        method: "POST",
        body: payStatus
    })
    .then(res => res.json())
    .then(data => paymentSucessAlert(data))
    .catch(err => console.log(err))
}

function paymentSucessAlert(data){
    if (data.response) {
        document.getElementById("main_form").reset();
        swal("Thank You", `<p class="text-center">Your payment is success.</br? Within next day you get your delivery</p>`, "success");
    }else{
        swal("Error", `Something went wrong`, "error");
    }
}

