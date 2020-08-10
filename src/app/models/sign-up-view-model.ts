export class SignUpViewModel {
    personName: any;
    email: string;
    mobile: string;
    dateOfBirth: string;
    password: string;
    gender: string;
    countryID: number;
    receiveLetters: boolean;
    skills: any;

    constructor(personName: any = null,
    email: string= null,
    mobile: string= null,
    dateOfBirth: string= null,
    password: string= null,
    gender: string= null,
    countryID: number= null,
    receiveLetters: boolean= null,
    skills: any= null)
    {
        this.personName= personName;
        this.email= email;
        this.mobile= mobile;
        this.dateOfBirth= dateOfBirth;
        this.password= password;
        this.gender= gender;
        this.countryID= countryID;
        this.receiveLetters= receiveLetters
        this.skills= skills;
    }
}
