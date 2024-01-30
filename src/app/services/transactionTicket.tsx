import Ticket from "./ticket";
import PromoDate from "./promoDate";
import PromoReferral from "./promoReferral";

export default interface TransactionTicket{
    id: number;
    ticketId: number;
    ticket: Ticket;
    amount: number;
    promosDate: PromoDate;
    promosReferral: PromoReferral;
    promosDateId: number;
    promosReferralId: number;
    referralCode: string;
    usePoints: boolean;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
}