import TransactionTicket from "./transactionTicket";

export default interface OrganizerEventDetail {
    attendeeCount: number;
    total: number;
    transactionsTickets: TransactionTicket[];
}