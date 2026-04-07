import {supabase} from '@/lib/supabase';


export const fetchPublicReviews = async (isbn: string) => {
    const {data: reviews, error} = await supabase
        .from('read_books')
        .select('user_id, rating, review, read_at')
        .ilike('book_isbn', `%${isbn}%`)
        .eq('is_public', true)
        .not('review', 'eq', 'EMPTY')
        .not('review', 'is', null)
        .order('read_at', {ascending: false});

    if (error) throw error;
    if (!reviews?.length) return [];

    const userIds = reviews.map(r => r.user_id);

    const {data: profiles} = await supabase
        .from('profiles')
        .select('id, nickname, avatar_url, user_id')
        .in('id', userIds);

    return reviews.map(r => ({
        ...r,
        profiles: profiles?.find(p => p.id === r.user_id) ?? null,
    }));
};