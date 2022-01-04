import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { BarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { Colors } from "../../../theme/colors";

export function FinanceBarChart({
  incomesMonthsStatistic,
  expensesMonthsStatistic,
}) {
  const [barData, setBarData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [yMin, setYMin] = useState(0);

  useEffect(() => {
    if (
      incomesMonthsStatistic &&
      expensesMonthsStatistic &&
      incomesMonthsStatistic.length == expensesMonthsStatistic.length
    ) {
      const barData = [
        {
          data: incomesMonthsStatistic.map((value) => ({ value })),
          svg: {
            fill: Colors.accent,
            opacity: "0.8",
          },
        },
        {
          data: expensesMonthsStatistic.map((value) => ({ value })),
          svg: {
            fill: Colors.contrast,
            opacity: "0.8",
          },
        },
        {
          data: incomesMonthsStatistic.map((income, index) => ({
            value: Math.round(income - expensesMonthsStatistic[index]),
          })),
          svg: {
            fill: Colors.base_second,
            opacity: "0.8",
          },
        },
      ];

      let yAxisData = incomesMonthsStatistic.concat(
        expensesMonthsStatistic,
        incomesMonthsStatistic.map((income, index) =>
          Math.round(income - expensesMonthsStatistic[index])
        )
      );

      setBarData(barData);
      setYAxisData(yAxisData);

      let min = yAxisData.reduce((minVal, item) => {
        return item < minVal ? item : minVal;
      }, 0);

      setYMin(min);
    }
  }, [incomesMonthsStatistic, expensesMonthsStatistic]);

  return (
    <View
      style={{
        height: 250,
        flexDirection: "row",
        width: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <BarChart
        style={{ height: 240, marginBottom: 30, flexGrow: 1 }}
        data={barData}
        yAccessor={({ item }) => item.value}
        yMin={yMin}
      >
       
      </BarChart>
      <YAxis
        style={{ position: "absolute", top: 0, bottom: 10 }}
        data={yAxisData}
        svg={{
          fontSize: 10,
          fill: Colors.base_text,
          alignmentBaseline: "baseline",
          baselineShift: "3",
        }}
      />
    </View>
  );
}
