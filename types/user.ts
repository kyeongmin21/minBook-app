
export interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    nickname: string;
    avatar_url: string;
    bio: string;
}


export interface UserProfile {
    id: string;
    nickname: string;
    avatar_url: string | null;
    bio: string | null;
}
