var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CRUD } from "./CRUD.js";
import { DataModel } from "./DataModel.js";
var tempName, tempEmail, tempPhone, tempLandline, tempWebsite, tempAddress;
var crudobj = new CRUD();
var globalID;
var isName = false, isEmail = false, isPhone = false;
var nameBox, emailBox, phoneBox;
document.querySelector("body").addEventListener('load', window.onload = function () {
    loadData();
});
document.getElementById('add-btn').addEventListener('click', function () {
    displayForm();
});
document.getElementById('contact-name').addEventListener('change', function () {
    validateName();
});
document.getElementById('contact-email').addEventListener('change', function () {
    validateEmail();
});
document.getElementById('contact-phone').addEventListener('change', function () {
    validatePhone();
});
document.getElementById('form-add-btn').addEventListener('click', function () {
    addRecord();
});
document.querySelector('.edit-img').addEventListener('click', function () {
    onEdit();
});
document.getElementById('form-save-btn').addEventListener('click', function () {
    updateChanges();
});
document.querySelector('.delete-img').addEventListener('click', function () {
    deleteRecord();
});
function loadData() {
    var detailsContainer = document.getElementById("contact-list");
    var localData = "";
    var currentData = "";
    let storedData = () => __awaiter(this, void 0, void 0, function* () {
        return crudobj.fetchData().then((data) => {
            data.map((val) => {
                // console.log(val.id);
                currentData = `<div class='contact-details-list' style="border:2px solid black " id='${val.id}'>
            <p class='namebox'>${val.name}</p>
            <p class='details'>${val.email}</p>
            <p class='details'>${val.phone}</p>
            </div>`;
                localData += currentData;
            });
            detailsContainer.innerHTML = localData;
            document.querySelectorAll('.contact-details-list').forEach(x => {
                x.addEventListener('click', function (e) {
                    document.querySelectorAll('.contact-details-list').forEach(y => {
                        y.style.backgroundColor = 'white';
                    });
                    x.style.backgroundColor = 'rgb(206,231,242)';
                    crudobj.fetchDataWithId(globalID = e.currentTarget.id).then(data => {
                        ondisplay(data.name, data.email, data.phone, data.landline, data.website, data.address);
                    });
                });
            });
        });
    });
    storedData();
}
function createContact(name, email, phone, landline, website, address) {
    crudobj.postData(new DataModel(name, email, phone, landline, website, address));
    loadData();
    var contactList = document.getElementById('contact-list');
    var contactDetails = document.createElement('div');
    contactDetails.setAttribute('class', 'contact-details-list');
    nameBox = document.createElement('p');
    nameBox.setAttribute('class', 'namebox');
    nameBox.innerText = name;
    emailBox = document.createElement('p');
    emailBox.setAttribute('class', 'details');
    emailBox.innerText = email;
    phoneBox = document.createElement('p');
    phoneBox.setAttribute('class', 'details');
    phoneBox.innerText = phone;
    contactDetails.appendChild(nameBox);
    contactDetails.appendChild(emailBox);
    contactDetails.appendChild(phoneBox);
    contactList === null || contactList === void 0 ? void 0 : contactList.appendChild(contactDetails);
    loadData();
}
function onEdit() {
    var userdetails = document.getElementById('details-title');
    userdetails.style.display = 'none';
    var getForm = document.getElementById('formdetails');
    getForm.style.display = 'block';
    var addBtn = document.getElementById('form-add-btn');
    addBtn.style.display = 'none';
    var saveBtn = document.getElementById('form-save-btn');
    saveBtn.style.display = 'block';
    crudobj.fetchDataWithId(globalID).then(data => {
        console.log(data);
        document.getElementById('contact-name').value = data.name;
        document.getElementById('contact-email').value = data.email;
        document.getElementById('contact-phone').value = data.phone;
        document.getElementById('contact-landline').value = data.landline;
        document.getElementById('contact-website').value = data.website;
        document.getElementById('contact-address').value = data.address;
    });
}
function ondisplay(name, email, phone, landline, website, address) {
    var userdetails = document.getElementById('details-title');
    userdetails.style.display = 'block';
    var getForm = document.getElementById('formdetails');
    getForm.style.display = 'none';
    tempName = document.getElementById('insertName');
    tempName.innerText = name;
    tempEmail = document.getElementById('user-email');
    tempEmail.innerText = "Email: " + email;
    tempPhone = document.getElementById('user-phone');
    tempPhone.innerText = "Phone: " + phone;
    tempLandline = document.getElementById('user-landline');
    tempLandline.innerText = "Landline: " + landline;
    tempWebsite = document.getElementById('user-website');
    tempWebsite.innerText = "Website: " + website;
    tempAddress = document.getElementById('user-address');
    tempAddress.innerText = address;
}
function displayForm() {
    document.getElementById('contact_form').reset();
    var userdetails = document.getElementById('details-title');
    userdetails.style.display = 'none';
    var getForm = document.getElementById('formdetails');
    getForm.style.display = 'block';
    var addBtn = document.getElementById('form-add-btn');
    addBtn.style.display = 'block';
    var saveBtn = document.getElementById('form-save-btn');
    saveBtn.style.display = 'none';
}
function validateName() {
    isName = false;
    var formName = document.getElementById('contact-name').value;
    if (formName.length === 0)
        document.getElementById("warning-name").innerText = '*Name is required';
    else if (formName.length > 0) {
        document.getElementById("warning-name").innerText = '';
        isName = true;
    }
}
function validateEmail() {
    isEmail = false;
    var formEmail = document.getElementById('contact-email').value;
    if (formEmail.length === 0)
        document.getElementById("warning-email").innerText = '*Email is required';
    else if (formEmail.length > 0) {
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formEmail)) {
            document.getElementById("warning-email").innerText = '';
            isEmail = true;
        }
        else {
            document.getElementById("warning-email").innerText = '* valid email is required';
        }
    }
}
//
function validatePhone() {
    isPhone = false;
    var formPhone = document.getElementById('contact-phone').value;
    if (formPhone.length === 0)
        document.getElementById("warning-phone").innerText = '*Phone is required';
    else if (formPhone.length > 0) {
        if (!isNaN(formPhone) && formPhone.split('+91').pop().length === 10) {
            isPhone = true;
            document.getElementById("warning-phone").innerText = '';
        }
        else {
            document.getElementById("warning-phone").innerText = '* valid phone is required';
        }
    }
}
function addRecord() {
    // console.log(isName,isEmail,isPhone);
    if (isName && isEmail && isPhone) {
        var formName = document.getElementById('contact-name').value;
        var formEmail = document.getElementById('contact-email').value;
        var formPhone = document.getElementById('contact-phone').value;
        var formLandline = document.getElementById('contact-landline').value;
        var formWebsite = document.getElementById('contact-website').value;
        var formAddress = document.getElementById('contact-address').value;
        createContact(formName, formEmail, formPhone, formLandline, formWebsite, formAddress);
        alert("successfully added");
        document.getElementById('contact_form').reset();
        var getForm = document.getElementById('formdetails');
        getForm.style.display = 'none';
    }
    else {
        if (!isPhone)
            document.getElementById("warning-phone").innerText = '*Phone is required';
        if (!isEmail)
            document.getElementById("warning-email").innerText = '*Email is required';
        if (!isName)
            document.getElementById("warning-name").innerText = '*Name is required';
    }
}
function updateChanges() {
    // // console.log(isName,isEmail,isPhone)
    if (isName && isEmail && isPhone) {
        var name = document.getElementById('contact-name').value;
        var email = document.getElementById('contact-email').value;
        var phone = document.getElementById('contact-phone').value;
        var landline = document.getElementById('contact-landline').value;
        var website = document.getElementById('contact-website').value;
        var address = document.getElementById('contact-address').value;
        //console.log("value sent "+ name,email,phone);
        crudobj.updateData(globalID, new DataModel(name, email, phone, landline, website, address));
        alert('saved changes successfully');
        document.getElementById('contact_form').reset();
        var getForm = document.getElementById('formdetails');
        getForm.style.display = 'none';
        loadData();
    }
    else {
        if (!isPhone)
            document.getElementById("warning-phone").innerText = '*Valid Phone is required';
        if (!isEmail)
            document.getElementById("warning-email").innerText = '*valid Email is required';
        if (!isName)
            document.getElementById("warning-name").innerText = '*Name is required';
    }
}
function deleteRecord() {
    crudobj.deleteData(globalID);
    alert("Item deleted with ID: " + globalID);
    loadData();
}
