
export default interface Feedback{
    id: number;
    userId: number;
    eventId: number;
    message: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;

}