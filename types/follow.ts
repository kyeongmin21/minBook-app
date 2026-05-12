export type Follower = {
    id: string;
    nickname: string;
    avatar_url?: string;
    bio?: string;
};

export type FollowerProps = {
    followers: Follower[];
    onPressUser: (userId: string) => void;
    backButton?: React.ReactNode;
};
