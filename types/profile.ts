
export type Profile = {
    avatar_url: string | null;
    nickname: string;
    bio: string | null;
    wishlist: {isbn: string; thumbnail: string}[];
    followerCount: number;
    followingCount: number;
    isMyProfile: boolean;
    isFollowing?: boolean;
    onToggleFollow?: () => void;
    onEditProfile?: () => void;
    onPressFollowers: () => void;
    onPressFollowings: () => void;
    backButton?: React.ReactNode;  // 뒤로가기 버튼 (있을 때만)
};
