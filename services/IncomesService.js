import { parseDatetoMonthYearString } from "../parsers/MonthParser";
import { ref, push, child, update, set, get, remove } from "firebase/database";
import { database } from "../App";
import {
  setCurrentPeriodDate,
  setIncomesList,
  setIsIncomesFetching,
} from "../store/slices/incomesSlice";

export class IncomesService {
  static fetchIncomes(userId, periodDate) {
    return async (dispatch) => {
      dispatch(setCurrentPeriodDate(periodDate));
      dispatch(setIsIncomesFetching(true));

      const incomesRef = child(
        ref(database),
        "incomes/" + userId + "/" + parseDatetoMonthYearString(periodDate)
      );

      get(incomesRef)
        .then((snapshot) => {
          let incomesList = [];
          snapshot.forEach((child) => {
            incomesList.push({ ...child.val(), key: child.key });
          });

          dispatch(setIncomesList(incomesList));
          dispatch(setIsIncomesFetching(false));
        })
        .catch((error) => {
          alert(error.message);
          dispatch(setIsIncomesFetching(false));
        });
    };
  }

  static addNewIncome(userId, periodDate, newIncome) {
    return async (dispatch) => {
      dispatch(setIsIncomesFetching(true));

      const incomesListRef = ref(
        database,
        "incomes/" + userId + "/" + parseDatetoMonthYearString(periodDate)
      );
      const newIncomeRef = push(incomesListRef);

      set(newIncomeRef, newIncome)
        .then(() => {
          dispatch(IncomesService.fetchIncomes(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsIncomesFetching(false));
          alert(error.message);
        });
    };
  }

  static updateIncomes(userId, periodDate, key, updatedIncome) {
    return async (dispatch) => {
      dispatch(setIsIncomesFetching(true));

      const updates = {
        ["incomes/" +
        userId +
        "/" +
        parseDatetoMonthYearString(periodDate) +
        "/" +
        key]: updatedIncome,
      };

      update(ref(database), updates)
        .then(() => {
          dispatch(IncomesService.fetchIncomes(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsIncomesFetching(false));
          alert(error.message);
        });
    };
  }
  static deleteIncome(userId, periodDate, key) {
    return async (dispatch) => {
      dispatch(setIsIncomesFetching(true));

      const incomeRef = ref(
        database,
        "incomes/" +
          userId +
          "/" +
          parseDatetoMonthYearString(periodDate) +
          "/" +
          key
      );

      remove(incomeRef)
        .then(() => {
          dispatch(IncomesService.fetchIncomes(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsIncomesFetching(false));
          alert(error.message);
        });
    };
  }
}
