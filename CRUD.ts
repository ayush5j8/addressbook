import { DataModel } from "./DataModel.js";
export class CRUD{
    fetchData():any{
        let fetchfn=async ()=> await fetch('https://localhost:7113/api/My').then(response=>response.json()).catch(err=> console.log());
        return fetchfn();
    }
    fetchDataWithId(id:any):any{
        let fetchfn=async ()=> await fetch(`https://localhost:7113/api/My/${id}`).then(response=>response.json()).catch(err=>console.log());
        
        return fetchfn();
    }
    postData(item:DataModel):void{
        let pushObj={
            Name:item.Name,
            email:item.email,
            phone:item.phone,
            landline:item.landline,
            website:item.website,
            address:item.address
        }
        let postfn= async() => await fetch('https://localhost:7113/api/My',{
            method:'POST',
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify(pushObj)
        })
        postfn();
        
    }
    updateData(id:number,contact:DataModel):void{
        
      //console.log(`value received: ${contact.Name},${contact.email}, ${contact.phone}`);
        
     let putfn= async ()=> await fetch(`https://localhost:7113/api/My/${id}`,{
         method:'PUT',
         headers:{
            'Content-type':'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
           // id:id,
            name:contact.Name,
            email:contact.email,
            phone:contact.phone,
            landline:contact.landline,
            website:contact.website,
            address:contact.address
        })
     }).then(res=>res.json()).catch(err=>console.log());
     
     putfn();
     
     
    }
    deleteData(id:number):void{
        let delRecord=async ()=>await fetch(`https://localhost:7113/api/My/${id}`,{
        method:'DELETE'
    })
    delRecord();
    }
}
