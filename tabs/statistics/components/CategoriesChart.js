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
import { PieChart } from "react-native-svg-charts";
import { Colors } from "../../../theme/colors";
import { EXPENSES, INCOMES } from "../../../consts/Consts";

export function CategoriesChart({ type, categoriesStatistics, total }) {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let dataList = [];

    if (categoriesStatistics) {
      for (let i = 0; i < categoriesStatistics.length; i++) {
        let data = categoriesStatistics.map((item, index) => {
          const color =
            type == INCOMES
              ? Colors.prime_dark
              : type == EXPENSES
              ? Colors.contrast
              : Colors.accent;

          return {
            category: item.name,
            total: item.total,
            key: item.id,
            value: item.total,
            svg: { fill: color, opacity: i === index ? "1" : "0.3" },
            arc: {
              outerRadius: i === index ? "110%" : "100%",
              cornerRadius: i === index ? 5 : 3,
            },
          };
        });
        dataList.push(data);
      }
    }
    setDataList(dataList);
  }, [categoriesStatistics]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {dataList.map((data, index) => (
        <View style={styles.chartWrapper} key={index}>
          <View style={{ position: "relative" }}>
            <PieChart
              style={{ height: 80, width: 80, borderRadius: 80 }}
              outerRadius={"90%"}
              innerRadius={15}
              data={data}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Raleway_600SemiBold",
                  fontSize: 14,
                  color: type== INCOMES
                    ? Colors.prime_dark
                    : type == EXPENSES
                    ? Colors.contrast
                    : Colors.accent,
                  lineHeight: 14,
                }}
              >
                {"<1"}
              </Text>
            </View>
          </View>
          <View style={{ flexShrink: 1, padding: 5 }}>
            <Text style={styles.category}>
              {categoriesStatistics[index].name}
            </Text>
            <Text style={styles.total}>
              {categoriesStatistics[index].total}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  chartWrapper: {
    backgroundColor: Colors.overlay,
    padding: 5,
    borderRadius: 15,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  category: {
    fontFamily: "Raleway_500Medium",
    color: Colors.base_text,
    marginBottom: 3,
    fontSize: 14,
  },
  total: {
    fontFamily: "Raleway_600SemiBold",
    color: Colors.base_text_second,
    fontSize: 16,
  },
});
