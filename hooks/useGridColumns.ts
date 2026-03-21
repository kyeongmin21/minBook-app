import {useWindowDimensions, DimensionValue} from 'react-native';

export const useGridColumns = () => {
    const {width} = useWindowDimensions();
    const numColumns = width >= 768 ? 4 : 2;
    const itemWidth: DimensionValue = width >= 768 ? '25%' : '50%';

    return {numColumns, itemWidth};
};