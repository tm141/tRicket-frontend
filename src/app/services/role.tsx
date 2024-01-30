import UserRole from './userRole';

export default interface Role{
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    usersRoles: UserRole[];
}