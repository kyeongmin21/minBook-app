import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {Book, WishlistState} from '@/types/wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlist: [],
            toggleWishlist: (book: Book) => set((state) => {
                const isExist = state.wishlist.some((item) => item.isbn === book.isbn);
                if (isExist) {
                    return {wishlist: state.wishlist.filter((item) => item.isbn !== book.isbn)};
                }
                return {wishlist: [...state.wishlist, book]};
            }),
        }),
        {
            name: 'book-wishlist-storage', // 저장소에 저장될 이름 (고유해야 함)
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);