import {
  setCurrentPeriodDate,
  setExpensesCategoriesStatistics,
  setIncomesCategoriesStatistics,
  setIsStatisticsFetching,
  setMonthsExpensesStatistic,
  setMonthsIncomesStatistic,
  setTotalExpence,
  setTotalIncome,
} from "../store/slices/statisticsSlice";
import { ref, push, child, update, set, get, remove } from "firebase/database";
import { database } from "../App";
import { parseDatetoMonthYearString } from "../parsers/MonthParser";

export class StatisticsService {
  static fetchStatistics(userId, periodDate) {
    return async (dispatch) => {
      //dispatch(setIsStatisticsFetching(true));
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
      let monthsExpensesStatistic = [];
      let monthsIncomesStatistic = [];

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

      function setTotalExp(totalExp) {
        dispatch(setTotalExpence(totalExp));
      }

      function setTotalInc(totalInc) {
        dispatch(setTotalIncome(totalInc));
      }
      function setExpensesStatistics(expensesCategories) {
        dispatch(setExpensesCategoriesStatistics(expensesCategories));
      }
      function setIncomesStatistics(incomesCategories) {
        dispatch(setIncomesCategoriesStatistics(incomesCategories));
      }

      function setExpensesMonthsStatistic(monthsExpensesStatistic) {
        dispatch(setMonthsExpensesStatistic(monthsExpensesStatistic));
      }

      function setIncomesMonthsStatistics(monthsIncomesStatistic) {
        dispatch(setMonthsIncomesStatistic(monthsIncomesStatistic));
      }

      StatisticsService.getEntries(
        getExpenseRefFunction,
        userId,
        periodsList,
        0,
        expensesTotal,
        monthsExpensesStatistic,
        expensesCategories,
        setTotalExp,
        setExpensesMonthsStatistic,
        setExpensesStatistics
      );
      StatisticsService.getEntries(
        getIncomeRefFunction,
        userId,
        periodsList,
        0,
        incomesTotal,
        monthsIncomesStatistic,
        incomesCategories,
        setTotalInc,
        setIncomesMonthsStatistics,
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
    monthsStatistic,
    categoriesStatistics,
    setTotal,
    setMonthsStatistic,
    setCategoriesStatistics
  ) {
    if (i < periodsList.length) {
      let entryRef = getRefFunction(userId, periodsList, i);

      get(entryRef)
        .then((snapshot) => {
          let monthTotal = 0;
          snapshot.forEach((child) => {
            let entry = child?.val();

            if (entry) {
              total += Number(entry.sum) ? Number(entry.sum) : 0;
              monthTotal += Number(entry.sum) ? Number(entry.sum) : 0;

              for (let i = 0; i < categoriesStatistics.length; i++) {
                if (entry.category.id == categoriesStatistics[i].id) {
                  categoriesStatistics[i].total =
                    categoriesStatistics[i].total +
                    (Number(entry.sum) ? Number(entry.sum) : 0);
                }
              }
            }
          });
          monthsStatistic[i] = monthTotal;

          StatisticsService.getEntries(
            getRefFunction,
            userId,
            periodsList,
            i + 1,
            total,
            monthsStatistic,
            categoriesStatistics,
            setTotal,
            setMonthsStatistic,
            setCategoriesStatistics
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      setTotal(total);
      setMonthsStatistic(monthsStatistic);
      setCategoriesStatistics(categoriesStatistics);
    }
  }
}
