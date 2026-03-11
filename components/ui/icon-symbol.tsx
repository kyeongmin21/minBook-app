import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {SymbolWeight} from 'expo-symbols';
import {ComponentProps} from 'react';
import {OpaqueColorValue, type StyleProp, type TextStyle} from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof SimpleLineIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
    'heart.fill': 'heart',
    'bookOpen.fill': 'book-open',
    'note.fill': 'note',
} as IconMapping;

export function IconSymbol({
                               name,
                               size = 24,
                               color,
                               style,
                           }: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
}) {
    return <SimpleLineIcons color={color} size={size} name={MAPPING[name]} style={style}/>;
}
