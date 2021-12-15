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
import { BarChart, Grid, YAxis , XAxis} from "react-native-svg-charts";
import { Colors } from "../../../theme/colors";
import * as shape from "d3-shape";
import * as scale from 'd3-scale'
export function FinanceBarChart() {
  const data1 = [
    14,
    -1,
    100,
    -95,
    -94,
    -24,
    -8,
    85,
    -91,
    35,
    -53,
    53,
  
  ];
  const data2 = [
    24,
    28,
    93,
    77,
    -42,
    -62,
    52,
    -87,
    21,
    53,
    -78,
    -62,
  
  ];
  const data3 = [
    24,
    28,
    93,
    77,
    -42,
    -62,
    52,
    -87,
    21,
    53,
    -78,
    -62,
  
  ];

  const barData = [
    {
      data: data1.map((value) => ({ value })),
      svg: {
        fill: Colors.prime_medium
      },
    },
    {
      data: data2.map((value) => ({ value })),
      svg: {
        fill: Colors.contrast
      },
    },
    {
        data: data3.map((value) => ({ value })),
        svg: {
          fill: Colors.base_second
        },
      },
  ];
  return (
    <View
      style={{
        height: 300,
        flexDirection: "row",
        width: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <BarChart
        style={{ height: 290,marginBottom:10, flexGrow: 1 }}
        data={barData}
        yAccessor={({ item }) => item.value}
        svg={{
          fill: "green",
        }}
      >
        <Grid />
       
      </BarChart>
      <YAxis
        style={{ position: "absolute", top: 0, bottom: 10 }}
        data={data1}
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
