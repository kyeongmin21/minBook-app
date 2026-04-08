import {DimensionValue} from "react-native";

export interface Book {
    isbn: string;
    title: string;
    thumbnail: string;
    authors: string[];
    price: number;
    datetime: string;
    contents: string;
    publisher: string;
}

export interface BookStore {
    selectedBook: Book | null;
    setSelectedBook: (book: Book) => void;
}

export interface BookItemProps {
    item: Book;
    isWished: boolean;
    onToggle: (item: Book) => void;
    itemWidth: DimensionValue;
}


export interface ReadBook {
    book: Book;
    readAt: string;
    rating: number;
    review: string;
    isPublic: boolean;
}

export interface ReadStore {
    readList: ReadBook[];
    fetchReadList: () => Promise<void>;
    toggleRead: (book: Book) => Promise<void>;
    updateReview: (isbn: string, rating: number, review: string, readAt: string) => Promise<void>;
    deleteBook: (isbn: string) => Promise<void>;
    clearReadList: () => void;
    togglePublic: (isbn: string) => Promise<void>;
}