import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { INCOMES } from "../../../consts/Consts";
import { IncomesService } from "../../../services/IncomesService";
import { Colors } from "../../../theme/colors";
import { EntriesList } from "../../shared/EntriesList";

export function IncomesList() {
  const { incomesList, currentPeriodDate, isIncomesFetching } = useSelector(
    (state) => state.incomesReducer
  );
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  async function updateIncome(item) {
    const updatedExp = {
      date: item.date,
      category: item.category,
      sum: item.sum,
    };

    await dispatch(
      IncomesService.updateIncomes(
        user.uid,
        currentPeriodDate,
        item.key,
        updatedExp
      )
    );
  }

  async function deleteIncome(item) {
    await dispatch(
      IncomesService.deleteIncome(user.uid, currentPeriodDate, item.key)
    );
  }

  return (
    <View style={{ width: "100%", flex: 1 }}>
      {isIncomesFetching ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.base_second} />
        </View>
      ) : (
        <EntriesList
          type={INCOMES}
          dataList={incomesList}
          updateEntry={updateIncome}
          deleteEntry={deleteIncome}
        />
      )}
    </View>
  );
}
