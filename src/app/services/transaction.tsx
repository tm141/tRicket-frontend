import TransactionTicket from "./transactionTicket";

export default interface Transaction{
    id: number;
    userId: number;
    paymentTypeId: number;
    total: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    transactionsTickets: TransactionTicket[];
}