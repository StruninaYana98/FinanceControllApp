import {
  setCurrentPeriodDate,
  setExpensesCategoriesStatistics,
  setIncomesCategoriesStatistics,
  setIsStatisticsFetching,
} from "../store/slices/statisticsSlice";
import { ref, push, child, update, set, get, remove } from "firebase/database";
import { database } from "../App";
import { parseDatetoMonthYearString } from "../parsers/MonthParser";

export class StatisticsService {
  static fetchStatistics(userId, periodDate) {
    return async (dispatch) => {
      dispatch(setIsStatisticsFetching(true));
      dispatch(setCurrentPeriodDate(periodDate));

      let expensesCategories = [
        {
          name: "khvehvb jfge kejryfger",
          id: "1",
          total: 0,
        },
        {
          name: "melfve",
          id: "2",
          total: 0,
        },
        {
          name: "kvefv",
          id: "3",
          total: 0,
        },
        {
          name: "lbbfbdngkjer elne",
          id: "4",
          total: 0,
        },
        {
          name: "32rekhe2  hf 2 3j2hfb",
          id: "5",
          total: 0,
        },
        {
          name: "bvebr ekrfr",
          id: "6",
          total: 0,
        },
      ];

      let incomesCategories = [
        {
          name: "khvehvb jfge kejryfger",
          id: "1",
          total: 0,
        },
        {
          name: "melfve",
          id: "2",
          total: 0,
        },
        {
          name: "kvefv",
          id: "3",
          total: 0,
        },
        {
          name: "lbbfbdngkjer elne",
          id: "4",
          total: 0,
        },
        {
          name: "32rekhe2  hf 2 3j2hfb",
          id: "5",
          total: 0,
        },
        {
          name: "bvebr ekrfr",
          id: "6",
          total: 0,
        },
      ];

      let periodsList = [];
      let expensesTotal = 0;
      let incomesTotal = 0;

      periodsList.push(parseDatetoMonthYearString(periodDate));

      function getExpenseRefFunction(userId, periodsList, i) {
        return child(
          ref(database),
          "expenses/" + userId + "/" + periodsList[i]
        );
      }

      function getIncomeRefFunction(userId, periodsList, i) {
        return child(ref(database), "incomes/" + userId + "/" + periodsList[i]);
      }

      function setExpensesStatistics(expensesCategories) {
        dispatch(setExpensesCategoriesStatistics(expensesCategories));
      }
      function setIncomesStatistics(incomesCategories) {
        dispatch(setIncomesCategoriesStatistics(incomesCategories));
      }

      StatisticsService.getEntries(
        getExpenseRefFunction,
        userId,
        periodsList,
        0,
        expensesTotal,
        expensesCategories,
        setExpensesStatistics
      );
      StatisticsService.getEntries(
        getIncomeRefFunction,
        userId,
        periodsList,
        0,
        incomesTotal,
        incomesCategories,
        setIncomesStatistics
      );
    };
  }

  static getEntries(
    getRefFunction,
    userId,
    periodsList,
    i,
    total,
    categoriesStatistics,
    setCategoriesStatistics
  ) {
    if (i < periodsList.length) {
      let entryRef = getRefFunction(userId, periodsList, i);

      get(entryRef)
        .then((snapshot) => {
          snapshot.forEach((child) => {
            let entry = child?.val();

            if (entry) {
              total += Number(entry.sum) ? Number(entry.sum) : 0;

              for (let i = 0; i < categoriesStatistics.length; i++) {
                if (entry.category.id == categoriesStatistics[i].id) {
                  categoriesStatistics[i].total =
                    categoriesStatistics[i].total +
                    (Number(entry.sum) ? Number(entry.sum) : 0);
                }
              }
            }
          });
          StatisticsService.getEntries(
            getRefFunction,
            userId,
            periodsList,
            i + 1,
            total,
            categoriesStatistics,
            setCategoriesStatistics
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      setCategoriesStatistics(categoriesStatistics);
    }
  }
}
