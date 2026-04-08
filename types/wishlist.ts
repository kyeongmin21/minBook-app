import {Book} from './book'


export interface WishlistItem {
    isbn: string;
    thumbnail: string;
}

export interface WishlistStore {
    wishlist: Book[];
    fetchWishlist: () => Promise<void>;
    toggleWishlist: (book: Book) => Promise<void>;
}