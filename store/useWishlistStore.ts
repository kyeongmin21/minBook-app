import {create} from 'zustand';
import {supabase} from '@/lib/supabase';
import {Book} from "@/types/book";


interface WishlistStore {
    wishlist: Book[];
    fetchWishlist: () => Promise<void>;
    toggleWishlist: (book: Book) => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>((
    set,
    get
) => ({
    wishlist: [],

    // 위시리스트 불러오기
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
                    isbn: item.book_isbn,
                    title: item.book_title,
                    thumbnail: item.book_thumbnail,
                    authors: item.book_authors ? item.book_authors.split(', ') : [],
                    price: item.book_price ?? 0,
                    datetime: item.book_datetime ?? '',
                    contents: item.book_contents ?? '',
                    publisher: item.book_publisher ?? '',
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
                .eq('book_isbn', book.isbn);

            set({wishlist: get().wishlist.filter(w => w.isbn !== book.isbn)});
        } else {
            // 찜 추가
            await supabase
                .from('wishlists')
                .insert({
                    user_id: user.id,
                    book_isbn: book.isbn,
                    book_title: book.title,
                    book_thumbnail: book.thumbnail,
                    book_authors: book.authors.join(', '),
                    book_price: book.price,
                    book_datetime: book.datetime,
                    book_contents: book.contents,
                    book_publisher: book.publisher,
                });

            set({wishlist: [...get().wishlist, book]});
        }
    },
}));