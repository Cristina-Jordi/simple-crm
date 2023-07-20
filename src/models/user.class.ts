export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    address: string;
    no: number;
    city: string;
    zipCode: number;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.no = obj ? obj.no : '';
        this.city = obj ? obj.city : '';
        this.zipCode = obj ? obj.zipCode : '';
    }

}