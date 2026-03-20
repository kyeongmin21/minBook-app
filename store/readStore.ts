import {create} from 'zustand';
import {supabase} from '@/lib/supabase';
import {Book} from '@/types/book';

export interface ReadBook {
    book: Book;
    readAt: string;
    rating: number;
    review: string;
}

interface ReadStore {
    readList: ReadBook[];
    fetchReadList: () => Promise<void>;
    toggleRead: (book: Book) => Promise<void>;
    updateReview: (isbn: string, rating: number, review: string, readAt: string) => Promise<void>;
    clearReadList: () => void;
}

export const useReadStore = create<ReadStore>((set, get) => ({
    readList: [],

    // DB에서 읽은책 불러오기
    fetchReadList: async () => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        const {data} = await supabase
            .from('read_books')
            .select('*')
            .eq('user_id', user.id);

        if (data) {
            set({
                readList: data.map(item => ({
                    book: {
                        isbn: item.book_isbn,
                        title: item.book_title,
                        thumbnail: item.book_thumbnail,
                        authors: item.book_authors ? item.book_authors.split(', ') : [],
                        price: item.book_price ?? 0,
                        datetime: item.book_datetime ?? '',
                        contents: item.book_contents ?? '',
                        publisher: item.book_publisher ?? '',
                    },
                    readAt: item.read_at,
                    rating: item.rating ?? 0,
                    review: item.review ?? '',
                }))
            });
        }
    },

    // 읽은책 추가/삭제
    toggleRead: async (book: Book) => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        const exists = get().readList.some(r => r.book.isbn === book.isbn);

        if (exists) {
            // 삭제
            await supabase
                .from('read_books')
                .delete()
                .eq('user_id', user.id)
                .eq('book_isbn', book.isbn);

            set({readList: get().readList.filter(r => r.book.isbn !== book.isbn)});
        } else {
            // 추가
            await supabase
                .from('read_books')
                .insert({
                    user_id: user.id,
                    book_isbn: book.isbn,
                    book_title: book.title,
                    book_thumbnail: book.thumbnail,
                    book_authors: book.authors.join(', '),
                    book_price: book.price,
                    book_datetime: book.datetime,
                    read_at: new Date().toISOString().split('T')[0],
                    rating: 0,
                    review: '',
                });

            set({
                readList: [...get().readList, {
                    book,
                    readAt: new Date().toISOString().split('T')[0],
                    rating: 0,
                    review: '',
                }]
            });
        }
    },

    // 리뷰 업데이트
    updateReview: async (isbn, rating, review, readAt) => {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        await supabase
            .from('read_books')
            .update({rating, review, read_at: readAt})
            .eq('user_id', user.id)
            .eq('book_isbn', isbn);

        set({
            readList: get().readList.map(r =>
                r.book.isbn === isbn ? {...r, rating, review, readAt} : r
            ),
        });
    },

    // 로그아웃 시 상태 초기화
    clearReadList: () => set({readList: []}),
}));