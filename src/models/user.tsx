interface UserProps {
    first_name : string;
    last_name : string;
    username : string;
    email : string;
}

export default class User{
    first_name : string;
    last_name : string;
    username : string;
    email : string;

    constructor({ first_name, last_name, username, email}: UserProps) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
    }

    static castToUser(u: UserProps): User {
        return new User({
            first_name : u.first_name,
            last_name : u.last_name,
            username : u.username,
            email : u.email
        });
    }
}