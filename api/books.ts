import axios from 'axios';

export const searchBooks = async (query: string) => {
    const KAKAO_API_KEY = '0ac8845c91a68f8d47aa54ea1fb40611';

    try {
        const { data } = await axios.get('https://dapi.kakao.com/v3/search/book', {
            params: { query, size: 30, sort: '' },
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                KA: 'sdk/1.0.0 os/javascript origin/http://localhost:8081',
            },
        });
        return data.documents;
    } catch (error: any) {
        console.error('카카오 에러 응답:', error.response?.data);
        throw error;
    }
};