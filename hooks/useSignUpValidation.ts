export const useSignupValidation = () => {

    const validateUserId = (value: string) => {
        if (!value) return '';
        if (!/^[a-z0-9]+$/.test(value)) return '영문 소문자, 숫자만 사용할 수 있어요';
        return '';
    };

    const validateEmail = (value: string) => {
        if (!value) return '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '이메일 형식이 올바르지 않아요';
        return '';
    };

    const validateAll = (fields: {
        userId: string;
        name: string;
        nickname: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }) => {
        if (!fields.userId || !fields.name || !fields.nickname || !fields.email || !fields.password || !fields.passwordConfirm)
            return '모든 항목을 입력해주세요.';
        if (validateUserId(fields.userId)) return validateUserId(fields.userId);
        if (validateEmail(fields.email)) return validateEmail(fields.email);
        if (fields.password.length < 6) return '비밀번호는 6자 이상이어야 해요.';
        if (fields.password !== fields.passwordConfirm) return '비밀번호가 일치하지 않아요.';
        return '';
    };

    return {validateUserId, validateEmail, validateAll};
};