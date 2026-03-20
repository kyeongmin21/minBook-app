import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Book} from '@/types/book';


interface ReadStore {
    readList: Book[];
    toggleRead: (book: Book) => void;
}

export const useReadStore = create<ReadStore>()(
    persist(
        (set, get) => ({
            readList: [],
            toggleRead: (book) => {
                const exists = get().readList.some(r => r.isbn === book.isbn);
                set({
                    readList: exists
                        ? get().readList.filter(r => r.isbn !== book.isbn)
                        : [...get().readList, book],
                });
            },
        }),
        {
            name: 'read-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);