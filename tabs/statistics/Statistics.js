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
  const [currentPeriodDate, setCurrentPeriodDate] = useState(new Date(Date.now()));

  const { user } = useSelector((state)=>state.userReducer);
  const {expensesCategoriesStatistic,incomesCategoriesStatistic } =useSelector((state)=>state.statisticsReducer)

  useEffect(() => {
    (async () => {
      if (user) {

        await dispatch(StatisticsService.fetchStatistics(user.uid, currentPeriodDate))
        
      }
    })();
  }, [user]);

  async function changePeriod(date){
   setCurrentPeriodDate(date);
   await dispatch(StatisticsService.fetchStatistics(user.uid, date))
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.base, padding: 10 }}>
      <MonthYearPicker date={currentPeriodDate} onDateChanged={changePeriod}/>
      <FinanceBarChart />
      <CategoriesChart type={EXPENSES} categoriesStatistics={expensesCategoriesStatistic}/>
      <CategoriesChart type={INCOMES} categoriesStatistics={incomesCategoriesStatistic}/>
    </ScrollView>
  );
}
