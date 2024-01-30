import TransactionTicket from "./transactionTicket";

export default interface PromoReferral{
    id: number;
    eventId: number;
    name: string;
    description: string;
    amount: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    transactionsTickets: TransactionTicket[];
}