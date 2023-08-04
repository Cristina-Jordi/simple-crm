export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    address: string;
    no: string;
    city: string;
    zipCode: string;
    userID?: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.no = obj ? obj.no : '';
        this.city = obj ? obj.city : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.userID = obj ? obj.userID : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            address: this.address,
            no: this.no,
            city: this.city,
            zipCode: this.zipCode,
            userID: this.userID
        };
    }
}