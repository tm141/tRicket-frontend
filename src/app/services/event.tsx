import Tickets from './ticket';
import PromosDate from './promoDate';
import PromosReferral from './promoReferral';
import Feedbacks from './feedback';
import Organizer from './organizer';

export default interface TricketEvent {
    id: number;
    organizersId: number;
    organizer: Organizer
    name: string
    description: string
    showTime: Date
    location: string
    isPaidEvent: Boolean
    bannerPicture: string
    createdAt: Date
    updatedAt: Date
    archived: Boolean 
    tickets: Tickets[]
    promosDates: PromosDate[]
    promosReferrals: PromosReferral[]
    feedbacks: Feedbacks[]
}