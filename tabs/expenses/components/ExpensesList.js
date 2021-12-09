import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ExpencesService } from "../../../services/ExpensesService";
import { Colors } from "../../../theme/colors";
import { EntriesList } from "../../shared/EntriesList";

export function ExpensesList() {
  const {
    expensesList,
    expensesMonth,
    currentPeriodDate,
    isExpensesFetching,
  } = useSelector((state) => state.expensesReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  async function updateExpense(item) {
    const updatedExp = {
      date: item.date,
      category: item.category,
      sum: item.sum,
    };

    await dispatch(
      ExpencesService.updateExpense(
        user.uid,
        currentPeriodDate,
        item.key,
        updatedExp
      )
    );
  }

  async function deleteExpense(item) {
    await dispatch(
      ExpencesService.deleteExpense(user.uid, currentPeriodDate, item.key)
    );
  }
  return (
    <View style={{ width: "100%", flex: 1 }}>
      {isExpensesFetching ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.base_second} />
        </View>
      ) : (
        <EntriesList
          dataList={expensesList}
          updateEntry={updateExpense}
          deleteEntry={deleteExpense}
        />
      )}
    </View>
  );
}