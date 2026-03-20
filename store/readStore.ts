import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Book} from '@/types/book';


export interface ReadBook {
    book: Book;
    readAt: string;
    rating: number;
    review: string;
}

interface ReadStore {
    readList: ReadBook[];
    toggleRead: (book: Book) => void;
    updateReview: (isbn: string, rating: number, review: string, readAt: string) => void;
}

export const useReadStore = create<ReadStore>()(
    persist(
        (set, get) => ({
            readList: [],
            toggleRead: (book) => {
                const exists = get().readList.some(r => r.book.isbn === book.isbn);
                set({
                    readList: exists
                        ? get().readList.filter(r => r.book.isbn !== book.isbn)
                        : [...get().readList, {
                            book,
                            readAt: new Date().toISOString().split('T')[0],
                            rating: 0,
                            review: '',
                        }],
                });
            },
            updateReview: (isbn, rating, review, readAt) => {
                set({
                    readList: get().readList.map(r =>
                        r.book.isbn === isbn ? {...r, rating, review, readAt} : r
                    ),
                });
            },
        }),
        {
            name: 'read-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);