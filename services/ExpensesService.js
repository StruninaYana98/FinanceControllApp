import { parseDatetoMonthYearString } from "../parsers/MonthParser";
import {
  setCurrentPeriodDate,
  setExpensesList,
  setIsExpensesFetching,
} from "../store/slices/expensesSlice";
import {
  ref,
  push,
  child,
  update,
  set,
  get,
  remove,
} from "firebase/database";
import { database } from "../App";

export class ExpencesService {
  static fetchExpenses(userId, periodDate) {
    return async (dispatch) => {
      dispatch(setCurrentPeriodDate(periodDate));
      dispatch(setIsExpensesFetching(true));

      const expensesRef = child(
        ref(database),
        "expenses/" + userId + "/" + parseDatetoMonthYearString(periodDate)
      );

      get(expensesRef)
        .then((snapshot) => {
          let expList = [];
          snapshot.forEach((child) => {
            expList.push({ ...child.val(), key: child.key });
          });

          dispatch(setExpensesList(expList));
          dispatch(setIsExpensesFetching(false));
        })
        .catch((error) => {
          alert(error.message);
          dispatch(setIsExpensesFetching(false));
        });
    };
  }

  static addNewExpense(userId, periodDate, newExpense) {
    return async (dispatch) => {
      dispatch(setIsExpensesFetching(true));

      const expensesListRef = ref(
        database,
        "expenses/" + userId + "/" + parseDatetoMonthYearString(periodDate)
      );
      const newExpensesRef = push(expensesListRef);

      set(newExpensesRef, newExpense)
        .then(() => {
          dispatch(ExpencesService.fetchExpenses(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsExpensesFetching(false));
          alert(error.message);
        });
    };
  }

  static updateExpense(userId, periodDate, key, updatedExpense) {
    return async (dispatch) => {
      dispatch(setIsExpensesFetching(true));
      const updates = {
        ["expenses/" +
        userId +
        "/" +
        parseDatetoMonthYearString(periodDate) +
        "/" +
        key]: updatedExpense,
      };

      update(ref(database), updates)
        .then(() => {
          dispatch(ExpencesService.fetchExpenses(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsExpensesFetching(false));
          alert(error.message);
        });
    };
  }
  static deleteExpense(userId, periodDate, key) {
    return async (dispatch) => {
      dispatch(setIsExpensesFetching(true));
      const expenseRef = ref(
        database,
        "expenses/" +
          userId +
          "/" +
          parseDatetoMonthYearString(periodDate) +
          "/" +
          key
      );
      remove(expenseRef)
        .then(() => {
          dispatch(ExpencesService.fetchExpenses(userId, periodDate));
        })
        .catch((error) => {
          dispatch(setIsExpensesFetching(false));
          alert(error.message);
        });
    };
  }
}
