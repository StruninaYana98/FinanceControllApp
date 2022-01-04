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
import { useDispatch, useSelector } from "react-redux";
import { StatisticsService } from "../../services/StatisticsService";
import { MonthYearPicker } from "../shared/MonthYearPicker";
import { EXPENSES, INCOMES } from "../../consts/Consts";

export function Statistics() {
  const dispatch = useDispatch();
  const [currentPeriodDate, setCurrentPeriodDate] = useState(
    new Date(Date.now())
  );

  const { user } = useSelector((state) => state.userReducer);
  const {
    totalIncome,
    totalExpence,
    incomesMonthsStatistic,
    expensesMonthsStatistic,
    expensesCategoriesStatistic,
    incomesCategoriesStatistic,
  } = useSelector((state) => state.statisticsReducer);

  useEffect(() => {
    (async () => {
      if (user) {
        await dispatch(
          StatisticsService.fetchStatistics(user.uid, currentPeriodDate)
        );
      }
    })();
  }, [user]);

  async function changePeriod(date) {
    setCurrentPeriodDate(date);
    await dispatch(StatisticsService.fetchStatistics(user.uid, date));
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.base, padding: 10 }}>
      <MonthYearPicker date={currentPeriodDate} onDateChanged={changePeriod} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Raleway_600SemiBold",
              fontSize: 12,
              color: Colors.base_text_second,
              textTransform: "uppercase",
            }}
          >
            Total balance
          </Text>
          <Text
            style={{
              fontFamily: "Raleway_600SemiBold",
              fontSize: 22,
              color: Colors.base_text,
              padding: 10,
            }}
          >
            {Math.round(totalIncome - totalExpence)}{" "}
          </Text>
        </View>
        {!totalExpence && !totalIncome ? null : (
          <FinanceBarChart
            incomesMonthsStatistic={incomesMonthsStatistic}
            expensesMonthsStatistic={expensesMonthsStatistic}
          />
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.category}>Income</Text>
              <Text style={styles.total}>{totalIncome}</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.category}>Expense</Text>
              <Text style={styles.total}>{totalExpence}</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "Raleway_600SemiBold",
            fontSize: 18,
            color: Colors.base_text,
            margin: 10,
            marginTop: 20,
          }}
        >
          Expenses
        </Text>
        <CategoriesChart
          type={EXPENSES}
          total={totalExpence}
          categoriesStatistics={expensesCategoriesStatistic}
        />
        <Text
          style={{
            fontFamily: "Raleway_600SemiBold",
            fontSize: 18,
            color: Colors.base_text,
            margin: 10,
            marginTop: 20,
          }}
        >
          Incomes
        </Text>
        <CategoriesChart
          type={INCOMES}
          total={totalIncome}
          categoriesStatistics={incomesCategoriesStatistic}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.overlay,
    padding: 10,
    borderRadius: 15,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  category: {
    fontFamily: "Raleway_500Medium",
    color: Colors.base_text_second,
    marginBottom: 3,
    fontSize: 14,
  },
  total: {
    fontFamily: "Raleway_600SemiBold",
    color: Colors.base_text,
    fontSize: 16,
  },
});
