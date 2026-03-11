import axios from 'axios';

export const searchBooks = async (query: string) => {
    const key = process.env.EXPO_PUBLIC_KAKAO_API_KEY;

    try {
        const { data } = await axios.get('https://dapi.kakao.com/v3/search/book', {
            params: { query, size: 30, sort: '' },
            headers: {
                Authorization: `KakaoAK ${key}`,
                KA: 'sdk/1.0.0 os/javascript origin/http://localhost:8081',
            },
        });
        return data.documents;
    } catch (error: any) {
        console.error('카카오 에러 응답:', error.response?.data);
        throw error;
    }
};