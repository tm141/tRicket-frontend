import TricketEvent from "./event";

export default interface Organizer{
    id: number;
    name: string;
    password: string;
    address: string;
    phone: string;
    email: string;
    displayPicture: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    events: TricketEvent[];
}