import TransactionTicket from "./transactionTicket";
import Event from "./event";

export default interface Ticket{
    id: number;
    eventId: number;
    event: Event;
    name: string;
    description: string;
    price: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    transactionsTickets: TransactionTicket[];
}