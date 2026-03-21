import {View, Text, Dimensions} from 'react-native';
import Svg, {Rect, Text as SvgText, Line} from 'react-native-svg';
import {readStyles} from '@/styles/readStyles';
import {ReadBook} from '@/store/readStore';
import React from 'react';

type Props = {
    selectedYear: string;
    totalCount: number;
    readList: ReadBook[];
}

export default function MonthlyBarChart({selectedYear, totalCount, readList}: Props) {
    const monthlyData = Array.from({length: 12}, (_, i) => {
        const month = String(i + 1).padStart(2, '0');
        return readList.filter(item =>
            item.readAt?.startsWith(selectedYear) &&
            item.readAt?.slice(5, 7) === month
        ).length;
    });

    const width = Dimensions.get('window').width - 32;
    const height = 200;
    const paddingLeft = 36;
    const paddingBottom = 26;
    const paddingTop = 16;
    const chartWidth = width - paddingLeft;
    const chartHeight = height - paddingBottom - paddingTop;
    const maxVal = Math.max(...monthlyData, 1);
    const barWidth = chartWidth / 12 * 0.6;
    const barGap = chartWidth / 12;

    return (
        <View style={readStyles.chartContainer}>
            <Text style={readStyles.chartTitle}>
                {selectedYear}년 월별 독서 현황 · 총 {totalCount}권
            </Text>


            <Svg width={width} height={height}>
                {/* y축 눈금 */}
                {Array.from({length: maxVal + 1}, (_, i) => {
                    const y = paddingTop + chartHeight - (i / maxVal) * chartHeight;
                    return (
                        <React.Fragment key={i}>
                            <Line
                                x1={paddingLeft} y1={y}
                                x2={width} y2={y}
                                stroke="#eee" strokeWidth={1}
                            />
                            <SvgText
                                x={paddingLeft - 4} y={y + 4}
                                fontSize={10} fill="#999"
                                textAnchor="end"
                            >
                                {i}
                            </SvgText>
                        </React.Fragment>
                    );
                })}

                {/* 막대 + x축 라벨 */}
                {monthlyData.map((val, i) => {
                    const barHeight = (val / maxVal) * chartHeight;
                    const x = paddingLeft + i * barGap + (barGap - barWidth) / 2;
                    const y = paddingTop + chartHeight - barHeight;
                    return (
                        <React.Fragment key={i}>
                            {val > 0 && (
                                <Rect
                                    x={x} y={y}
                                    width={barWidth} height={barHeight}
                                    fill="#f3ff3e" rx={3}
                                />
                            )}
                            <SvgText
                                x={x + barWidth / 2}
                                y={height - 6}
                                fontSize={10} fill="#999"
                                textAnchor="middle"
                            >
                                {i + 1}
                            </SvgText>
                        </React.Fragment>
                    );
                })}

                <SvgText
                    x={paddingLeft-15} y={height - 6}
                    fontSize={10} fill="#999"
                    textAnchor="start"
                >
                    권/월
                </SvgText>
            </Svg>
        </View>
    );
}