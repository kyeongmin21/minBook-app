export interface Book {
    isbn: string;
    thumbnail: string;
    title: string;
    authors: string[];
    price: number;
    datetime: string;
    contents: string;
    publisher: string;
}

export interface WishlistState {
    wishlist: Book[];
    toggleWishlist: (book: Book) => void;
}