import TransactionTicket from "./transactionTicket";

export default interface PromoDate {
    id: number;
    eventId: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    transactionsTickets: TransactionTicket[];
}