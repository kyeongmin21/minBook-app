import {Image} from 'expo-image';
import {View, Pressable} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Header() {
    const navigation = useNavigation();
    const router = useRouter()
    // 기기마다 상태바 높이를 자동으로 계산
    const insets = useSafeAreaInsets();


    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={[commonStyles.header, {paddingTop: insets.top}]}>
            <View style={commonStyles.headerSide}>
                <Pressable onPress={openMenu} hitSlop={10}>
                    <AntDesign name='holder' size={24} color='black'/>
                </Pressable>
            </View>
            <View style={commonStyles.headerCenter}>
                <Pressable onPress={() => router.push('/(tabs)')} hitSlop={10}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={commonStyles.logo}
                        contentFit="contain"
                    />
                </Pressable>
            </View>
            <View style={commonStyles.headerSide}/>
        </View>
    )
}