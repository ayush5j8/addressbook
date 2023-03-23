export class DataModel{
    Name:string;
    email:string;
    phone:string;
    landline:string;
    website:string;
    address:string;
    /**
     *
     */
    constructor(Name:string,email:string,phone:string,landline:string,website:string,address:string) {
        this.Name=Name;
        this.email=email;
        this.phone=phone;
        this.landline=landline;
        this.website=website;
        this.address=address;        
    }
}