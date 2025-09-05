import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useStyles from '@hooks/useStyles';

const CustomGroupedBarChart = ({ data, width = 300, height = 200 }) => {
    const styles = useStyles((theme) =>
        StyleSheet.create({
            container: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            chart: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                paddingHorizontal: 20,
            },
            groupContainer: {
                alignItems: 'center',
                flex: 1,
            },
            barsContainer: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginBottom: 8,
            },
            barContainer: {
                alignItems: 'center',
                marginHorizontal: 2,
            },
            bar: {
                borderRadius: 2,
                marginBottom: 4,
            },
            valueText: {
                color: theme.light,
                fontSize: 8,
                fontWeight: 'bold',
            },
            labelText: {
                color: theme.light,
                fontSize: 10,
                textAlign: 'center',
            },
        })
    );

    const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
    const groupWidth = (width - 40) / data.labels.length;
    const barWidth = (groupWidth - 8) / data.datasets.length;
    const maxBarHeight = height - 80; // Leave space for labels and legends

    return (
        <View style={[styles.container, { width, height }]}>
            <View style={[styles.chart, { width, height }]}>
                {data.labels.map((label, labelIndex) => (
                    <View key={labelIndex} style={styles.groupContainer}>
                        <View style={styles.barsContainer}>
                            {data.datasets.map((dataset, datasetIndex) => {
                                const value = dataset.data[labelIndex];
                                const barHeight = (value / maxValue) * maxBarHeight;
                                const color = dataset.color;

                                return (
                                    <View key={datasetIndex} style={styles.barContainer}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    height: barHeight,
                                                    backgroundColor: color,
                                                    width: barWidth,
                                                },
                                            ]}
                                        />
                                        <Text style={styles.valueText}>{value}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Text style={styles.labelText}>{label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};



export default CustomGroupedBarChart;
