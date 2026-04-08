import {User} from "@/types/user";

export interface AuthStore {
    user: User | null;
    isLoggedIn: boolean;
    isInitialized: boolean;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}
