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
import {
  ref,
  onValue,
  push,
  child,
  update,
  set,
  remove,
} from "firebase/database";
import { Colors } from "../../theme/colors";

import { CategoriesChart } from "./components/CategoriesChart";
import { BarChart, Grid, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { FinanceBarChart } from "./components/FinanceBarChart";
export function Statistics() {
  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.base, padding: 10 }}>
      <FinanceBarChart />
      <CategoriesChart />
    </ScrollView>
  );
}
