import { User } from './user.model';

export class Auth {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}