import Role from './role';
import Transaction from './transaction';
import Feedback from './feedback';

export default interface User{
    id: number;
    fName: string;
    lName: string;
    password: string;
    referralCode: string;
    address: string;
    phone: string;
    email: string;
    points: number;
    pointsExpDate: Date;
    displayPicture: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    roles: Role[];
    transactions: Transaction[];
    feedbacks: Feedback[];
}