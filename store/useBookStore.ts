import {create} from 'zustand';
import {BookStore} from '@/types/book';


export const useBookStore = create<BookStore>((set) => ({
    selectedBook: null,
    setSelectedBook: (book) => set({selectedBook: book}),
}));
