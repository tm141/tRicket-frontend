export default interface PaymentType{
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
}