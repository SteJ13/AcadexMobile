import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useStyles from '@hooks/useStyles';

const CustomBarChart = ({ data, width = 200, height = 120, colors = ['#FF4500', '#32CD32', '#4169E1'] }) => {
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
            barContainer: {
                alignItems: 'center',
                flex: 1,
            },
            barWrapper: {
                alignItems: 'center',
                marginBottom: 8,
            },
            bar: {
                borderRadius: 4,
                marginBottom: 4,
            },
            valueText: {
                color: theme.light,
                fontSize: 10,
                fontWeight: 'bold',
            },
            labelText: {
                color: theme.light,
                fontSize: 10,
                textAlign: 'center',
            },
        })
    );

    const maxValue = Math.max(...data.values);
    const barWidth = (width - 40) / data.labels.length;
    const maxBarHeight = height - 60; // Leave space for labels and values

    return (
        <View style={[styles.container, { width, height }]}>
            <View style={[styles.chart, { width, height }]}>
                {data.labels.map((label, index) => {
                    const value = data.values[index];
                    const barHeight = (value / maxValue) * maxBarHeight;
                    const color = colors[index % colors.length];

                    return (
                        <View key={index} style={styles.barContainer}>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        {
                                            height: barHeight,
                                            backgroundColor: color,
                                            width: barWidth - 4,
                                        },
                                    ]}
                                />
                                <Text style={styles.valueText}>{value}</Text>
                            </View>
                            <Text style={styles.labelText}>{label}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};



export default CustomBarChart;
