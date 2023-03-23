
import {CRUD} from "./CRUD.js";
import { DataModel } from "./DataModel.js";
var tempName:any,tempEmail:any,tempPhone:any,tempLandline:any,tempWebsite:any,tempAddress:any
var crudobj=new CRUD();

var globalID:any;
var isName:boolean=false,isEmail:boolean=false,isPhone:boolean=false
var nameBox:any,emailBox:any,phoneBox:any;
document.querySelector("body").addEventListener('load',window.onload=function(){
   loadData();
})
document.getElementById('add-btn').addEventListener('click',function(){
    displayForm();
})
document.getElementById('contact-name').addEventListener('change',function(){
    validateName();
})
document.getElementById('contact-email').addEventListener('change',function(){
    validateEmail();
})
document.getElementById('contact-phone').addEventListener('change',function(){
    validatePhone();
})
document.getElementById('form-add-btn').addEventListener('click',function(){
    addRecord();
})
document.querySelector('.edit-img').addEventListener('click',function(){
    onEdit();
})
document.getElementById('form-save-btn').addEventListener('click',function(){
    updateChanges();
})
document.querySelector('.delete-img').addEventListener('click',function(){
    deleteRecord();
})

function loadData(){
    
    var detailsContainer:any=document.getElementById("contact-list");
    var localData:any="";
    var currentData:any="";
    let storedData=async ()=>crudobj.fetchData().then((data)=>{
        data.map((val:any)=>{
            // console.log(val.id);
            currentData=`<div class='contact-details-list' style="border:2px solid black " id='${val.id}'>
            <p class='namebox'>${val.name}</p>
            <p class='details'>${val.email}</p>
            <p class='details'>${val.phone}</p>
            </div>`
        
            localData+=currentData
        })
        
        detailsContainer.innerHTML = localData;
        document.querySelectorAll('.contact-details-list').forEach(x=>{
            x.addEventListener('click',function(e:Event){
                document.querySelectorAll('.contact-details-list').forEach(y=>{
                    (y as any).style.backgroundColor='white'
                });
                (x as any).style.backgroundColor='rgb(206,231,242)'
                crudobj.fetchDataWithId(globalID=(e.currentTarget as any).id).then(data=>{
                     ondisplay(data.name,data.email,data.phone,data.landline,data.website,data.address);
                                                                            
                })
                
            })
        });
    })
     storedData();                                                   
     
     
}



function createContact(name:string,email:string,phone:string,landline:string,website:string,address:string){
       crudobj.postData(new DataModel(name,email,phone,landline,website,address));
       loadData();

    var contactList:any=document.getElementById('contact-list')
    var contactDetails:any=document.createElement('div')
    contactDetails.setAttribute('class','contact-details-list')
    nameBox=document.createElement('p')
    nameBox.setAttribute('class','namebox')
    nameBox.innerText=name;
    emailBox=document.createElement('p')
    emailBox.setAttribute('class','details')
    emailBox.innerText=email;
    phoneBox=document.createElement('p')
    phoneBox.setAttribute('class','details')
    phoneBox.innerText=phone;
    
    contactDetails.appendChild(nameBox)
    contactDetails.appendChild(emailBox)
    contactDetails.appendChild(phoneBox)

    contactList?.appendChild(contactDetails)
    loadData();
    
}
function onEdit(){
    var userdetails:any=document.getElementById('details-title')
    userdetails.style.display='none'
    var getForm:any=document.getElementById('formdetails')
    getForm.style.display='block';
    var addBtn:any=document.getElementById('form-add-btn');
    addBtn.style.display='none';
    var saveBtn:any=document.getElementById('form-save-btn');
    saveBtn.style.display='block';
    crudobj.fetchDataWithId(globalID).then(data=>{
        console.log(data);
        
         (<HTMLInputElement>document.getElementById('contact-name')).value=data.name;
         (<HTMLInputElement>document.getElementById('contact-email')).value=data.email;
         (<HTMLInputElement>document.getElementById('contact-phone')).value=data.phone;
         (<HTMLInputElement>document.getElementById('contact-landline')).value=data.landline;
         (<HTMLInputElement>document.getElementById('contact-website')).value=data.website;
         (<HTMLInputElement>document.getElementById('contact-address')).value=data.address;
    })
       
}
function ondisplay(name:string,email:string,phone:string,landline:string,website:string,address:string){
    var userdetails:any=document.getElementById('details-title')
    userdetails.style.display='block'
    var getForm:any=document.getElementById('formdetails')
    getForm.style.display='none';
    tempName=document.getElementById('insertName')
    tempName.innerText=name
    tempEmail=document.getElementById('user-email')
    tempEmail.innerText="Email: "+email
    tempPhone=document.getElementById('user-phone')
    tempPhone.innerText="Phone: "+phone
    tempLandline=document.getElementById('user-landline')
    tempLandline.innerText="Landline: "+landline
    tempWebsite=document.getElementById('user-website')
    tempWebsite.innerText="Website: "+website
    tempAddress=document.getElementById('user-address')
    tempAddress.innerText=address
    
}


function displayForm(){
    (<any>document.getElementById('contact_form')).reset()
    var userdetails:any=document.getElementById('details-title')
    userdetails.style.display='none'
    var getForm:any=document.getElementById('formdetails')
    getForm.style.display='block';
    var addBtn:any=document.getElementById('form-add-btn');
    addBtn.style.display='block';
    var saveBtn:any=document.getElementById('form-save-btn');
    saveBtn.style.display='none';
    
}

function validateName(){
    isName=false
    var formName=(<HTMLInputElement>document.getElementById('contact-name')).value;
        if(formName.length===0)
        (<any>document.getElementById("warning-name")).innerText='*Name is required';
        else if(formName.length>0){
            (<any>document.getElementById("warning-name")).innerText='';
            isName=true;
        }
        
}
function validateEmail(){
    isEmail=false
    var formEmail=(<HTMLInputElement>document.getElementById('contact-email')).value;
        if(formEmail.length===0)
        (<any>document.getElementById("warning-email")).innerText='*Email is required';
        else if(formEmail.length>0)
        {
            if(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formEmail)){
                (<any>document.getElementById("warning-email")).innerText='';
                isEmail=true;
            }
            else{
                (<any>document.getElementById("warning-email")).innerText='* valid email is required';
            }
        }
}
//
function validatePhone(){
    isPhone=false
    var formPhone:any=(<HTMLInputElement>document.getElementById('contact-phone')).value;
        if(formPhone.length===0)
        (<any>document.getElementById("warning-phone")).innerText='*Phone is required';
        else if(formPhone.length>0)
        {
        
            if(!isNaN(formPhone)&&formPhone.split('+91').pop().length===10){
                isPhone=true;
                (<any>document.getElementById("warning-phone")).innerText='';
            }
            else{
                (<any>document.getElementById("warning-phone")).innerText='* valid phone is required';
               }
        }
}
function addRecord(){
    // console.log(isName,isEmail,isPhone);
    if(isName&&isEmail&&isPhone){
    var formName=(<HTMLInputElement>document.getElementById('contact-name')).value
    var formEmail=(<HTMLInputElement>document.getElementById('contact-email')).value
    var formPhone=(<HTMLInputElement>document.getElementById('contact-phone')).value
    var formLandline=(<HTMLInputElement>document.getElementById('contact-landline')).value
    var formWebsite=(<HTMLInputElement>document.getElementById('contact-website')).value
    var formAddress=(<HTMLInputElement>document.getElementById('contact-address')).value
        createContact(formName,formEmail,formPhone,formLandline,formWebsite,formAddress)
        alert("successfully added");
        (<any>document.getElementById('contact_form')).reset()
        var getForm:any=document.getElementById('formdetails')
        getForm.style.display='none';
    }
    else{
        if(!isPhone)
        (<any>document.getElementById("warning-phone")).innerText='*Phone is required';
        if(!isEmail)
        (<any>document.getElementById("warning-email")).innerText='*Email is required';
        if(!isName)
        (<any>document.getElementById("warning-name")).innerText='*Name is required';
    }
       
}


function updateChanges(){
    
    // // console.log(isName,isEmail,isPhone)
    if(isName&&isEmail&&isPhone){
        var name=(<HTMLInputElement>document.getElementById('contact-name')).value
        var email=(<HTMLInputElement>document.getElementById('contact-email')).value
        var phone=(<HTMLInputElement>document.getElementById('contact-phone')).value
        var landline=(<HTMLInputElement>document.getElementById('contact-landline')).value
        var website=(<HTMLInputElement>document.getElementById('contact-website')).value
        var address=(<HTMLInputElement>document.getElementById('contact-address')).value
        //console.log("value sent "+ name,email,phone);
        
        crudobj.updateData(globalID,new DataModel(name,email,phone,landline,website,address))

        
        alert('saved changes successfully');
        (<any>document.getElementById('contact_form')).reset()
        var getForm:any=document.getElementById('formdetails')
        getForm.style.display='none';
        loadData();
    }
    else{
        if(!isPhone)
        (<any>document.getElementById("warning-phone")).innerText='*Valid Phone is required';
        if(!isEmail)
        (<any>document.getElementById("warning-email")).innerText='*valid Email is required';
        if(!isName)
        (<any>document.getElementById("warning-name")).innerText='*Name is required';
    }
    

}
function deleteRecord(){
    
    crudobj.deleteData(globalID);
    alert("Item deleted with ID: "+globalID)
    loadData();
}
