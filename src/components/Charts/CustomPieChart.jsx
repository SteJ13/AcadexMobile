import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import useStyles from '@hooks/useStyles';

const CustomPieChart = ({ data, size = 120 }) => {
    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            chart: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            legend: {
                marginTop: 10,
                alignItems: 'center',
            },
            legendItem: {
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 2,
            },
            legendDot: {
                width: 12,
                height: 12,
                borderRadius: 6,
                marginRight: 8,
            },
            legendText: {
                color: theme.light,
                fontSize: 12,
                fontWeight: '500',
            },
        })
    );

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = size / 2;
    const center = radius;

    const createPieSlice = (startAngle, endAngle, color) => {
        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);

        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

        const path = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        return { path, color };
    };

    let currentAngle = -Math.PI / 2; // Start from top
    const slices = data.map((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        const slice = createPieSlice(startAngle, endAngle, item.color);
        currentAngle = endAngle;
        return { ...slice, label: item.label, percentage: Math.round((item.value / total) * 100) };
    });

    return (
        <View style={[styles.container, { width: size, height: size + 60 }]}>
            <View style={[styles.chart, { width: size, height: size }]}>
                <Svg width={size} height={size}>
                    <G>
                        {slices.map((slice, index) => (
                            <Path
                                key={index}
                                d={slice.path}
                                fill={slice.color}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </G>
                </Svg>
            </View>
            <View style={styles.legend}>
                {slices.map((slice, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: slice.color }]} />
                        <Text style={styles.legendText}>{slice.label} {slice.percentage}%</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CustomPieChart;
