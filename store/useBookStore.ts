import {create} from 'zustand';
import {Book} from '@/types/book';

interface BookStore {
    selectedBook: Book | null;
    setSelectedBook: (book: Book) => void;
}

export const useBookStore = create<BookStore>((set) => ({
    selectedBook: null,
    setSelectedBook: (book) => set({selectedBook: book}),
}));