import {Text} from 'react-native';

interface Props {
    value: string;
    isValid: boolean;
    validMsg: string;
    invalidMsg: string;
}

export default function ValidationText({value, isValid, validMsg, invalidMsg}: Props) {
    if (!value.length) return null;

    return (
        <Text style={{fontSize: 12, marginTop: 4, color: isValid ? '#4CAF50' : '#FF5252'}}>
            {isValid ? `✓ ${validMsg}` : `✗ ${invalidMsg}`}
        </Text>
    );
}