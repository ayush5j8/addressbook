var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CRUD {
    fetchData() {
        let fetchfn = () => __awaiter(this, void 0, void 0, function* () { return yield fetch('https://localhost:7113/api/My').then(response => response.json()).catch(err => console.log()); });
        return fetchfn();
    }
    fetchDataWithId(id) {
        let fetchfn = () => __awaiter(this, void 0, void 0, function* () { return yield fetch(`https://localhost:7113/api/My/${id}`).then(response => response.json()).catch(err => console.log()); });
        return fetchfn();
    }
    postData(item) {
        let pushObj = {
            Name: item.Name,
            email: item.email,
            phone: item.phone,
            landline: item.landline,
            website: item.website,
            address: item.address
        };
        let postfn = () => __awaiter(this, void 0, void 0, function* () {
            return yield fetch('https://localhost:7113/api/My', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(pushObj)
            });
        });
        postfn();
    }
    updateData(id, contact) {
        //console.log(`value received: ${contact.Name},${contact.email}, ${contact.phone}`);
        let putfn = () => __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`https://localhost:7113/api/My/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    // id:id,
                    name: contact.Name,
                    email: contact.email,
                    phone: contact.phone,
                    landline: contact.landline,
                    website: contact.website,
                    address: contact.address
                })
            }).then(res => res.json()).catch(err => console.log());
        });
        putfn();
    }
    deleteData(id) {
        let delRecord = () => __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`https://localhost:7113/api/My/${id}`, {
                method: 'DELETE'
            });
        });
        delRecord();
    }
}
