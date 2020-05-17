export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface IUsers {
    [id: string]: IUser
}