import {create} from 'zustand';
import {supabase} from '@/lib/supabase';
import {Book} from "@/types/book";


interface WishlistStore {
    wishlist: Book[];
    fetchWishlist: () => Promise<void>;
    toggleWishlist: (book: Book) => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    wishlist: [],

    // 위시리스트 불러오기 - DB에서 바로 가져오기
    fetchWishlist: async () => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        const {data} = await supabase
            .from('wishlists')
            .select('*')
            .eq('user_id', user.id);

        if (data) {
            set({
                wishlist: data.map(item => ({
                    isbn: item.isbn,
                    title: item.title,
                    thumbnail: item.thumbnail,
                    authors: item.authors ?? [],
                    price: item.price ?? 0,
                    datetime: item.datetime ?? '',
                    contents: item.contents ?? '',
                    publisher: item.publisher ?? '',
                }))
            });
        }
    },

    // 찜하기/취소
    toggleWishlist: async (book: Book) => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        const isWished = get().wishlist.some(w => w.isbn === book.isbn);

        if (isWished) {
            // 찜 취소
            await supabase
                .from('wishlists')
                .delete()
                .eq('user_id', user.id)
                .eq('isbn', book.isbn);

            set({wishlist: get().wishlist.filter(w => w.isbn !== book.isbn)});
        } else {
            // 찜 추가
            await supabase
                .from('wishlists')
                .insert({
                    user_id: user.id,
                    isbn: book.isbn,
                    title: book.title,
                    thumbnail: book.thumbnail,
                    authors: book.authors,
                    price: book.price,
                    datetime: book.datetime,
                    contents: book.contents,
                    publisher: book.publisher,
                });

            set({wishlist: [...get().wishlist, book]});
        }
    },
}));