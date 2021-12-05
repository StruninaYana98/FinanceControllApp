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
import { ref, onValue, push, child, update, set } from "firebase/database";
import { database } from "../../App";
import { useSelector } from "react-redux";
import { Colors } from "../../theme/colors";
import AddIcon from "../../assets/svg/add.svg";
import CloseIcon from "../../assets/svg/close.svg";
import { BottomModal } from "../shared/BottomModal";
import { parseToFullDateString } from "../../parsers/FullDateParser";
import { NewEntry } from "../shared/NewEntry";
import { EntriesList } from "../shared/EntriesList";
import { useDispatch } from "react-redux";
import { setExpensesList } from "../../store/slices/expensesSlice";
import { parseDatetoMonthYearString } from "../../parsers/MonthParser";

export function Expenses() {
  const {expensesList} = useSelector((state) =>state.expensesReducer);
  const dispatch = useDispatch();

  const [isNewExpModalOpen, setIsNewExpModalOpen] = useState(false);
  const [newExpSum, setNewExpSum] = useState(null);
  const [newExpDate, setNewExpDate] = useState(new Date(Date.now()));
  const [newExpCategory, setNewExpCategory] = useState(null);

  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      if (user) {
        let month  =  parseDatetoMonthYearString(new Date(Date.now()));
        dispatch(setExpensesMonth(month))
        const expensesRef = ref(database, "expenses/" + user.uid + "/" + month);

        onValue(expensesRef, (snapshot) => {
          let expList = [];
          snapshot.forEach((child) => {
            expList.push(child.val());
          });

          expList.forEach((item, index) => {
            item.index = index + 1;
          });
          console.log(expList);
          dispatch(setExpensesList(expList));
        }).catch((error) => {
          alert(error.message);
        });
      }
    })();
  }, [user]);

  async function addNewExpense() {
    if (!newExpDate || !newExpCategory || !newExpSum) {
      return;
    }
    const newExpense = {
      date: parseToFullDateString(newExpDate),
      category: newExpCategory,
      sum: newExpSum,
    };

    const expensesListRef = ref(database, "expenses/" + user.uid + "/11-2021");
    const newExpensesRef = push(expensesListRef);

    set(newExpensesRef, newExpense)
      .then(() => {
        setIsNewExpModalOpen(false);
        clearNewExpenseEntry();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function clearNewExpenseEntry() {
    setNewExpDate(new Date(Date.now()));
    setNewExpCategory(null);
    setNewExpSum(null);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <EntriesList dataList={expensesList} />
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            setIsNewExpModalOpen(true);
          }}
        >
          <AddIcon style={styles.addIcon}></AddIcon>
        </TouchableOpacity>
      </View>

      <BottomModal
        heightRange={["0%", "70%"]}
        isOpen={isNewExpModalOpen}
        onCloseModal={() => setIsNewExpModalOpen(false)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={[styles.navigationButton, { marginRight: 0 }]}
            onPress={() => {
              setIsNewExpModalOpen(false);
            }}
          >
            <CloseIcon style={styles.navigationIcon}></CloseIcon>
          </TouchableOpacity>
        </View>
        <NewEntry
          newDate={newExpDate}
          setNewDate={setNewExpDate}
          newCategory={newExpCategory}
          setNewCategory={setNewExpCategory}
          newSum={newExpSum}
          setNewSum={setNewExpSum}
        />
        <TouchableOpacity
          disabled={!newExpDate || !newExpCategory || !newExpSum}
          style={[
            styles.addButton,
            {
              width: "100%",
              marginLeft: 30,
              marginRight: 30,
              opacity: !newExpDate || !newExpCategory || !newExpSum ? 0.3 : 1,
            },
          ]}
          onPress={addNewExpense}
        >
          <Text>Add Expense</Text>
        </TouchableOpacity>
      </BottomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.dark,
    flex: 1,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
  },
  expDate: {
    color: Colors.prime_dark,
    fontSize: 15,
    marginRight: 20,
  },
  expCategory: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  expInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  expCost: {
    color: Colors.accent,
    fontSize: 24,
    fontWeight: "800",
  },
  expensesList: {
    padding: 15,
  },
  functionalButton: {
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: Colors.prime_dark,
    marginRight: 15,
  },
  functionalIcon: {
    width: 20,
    height: 20,
    color: Colors.prime_light,
  },
  addButton: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: Colors.accent,

    position: "absolute",
    bottom: 10,
    zIndex: 1,
    borderRadius: 15,
  },
  addIcon: {
    width: 20,
    height: 20,
    color: Colors.dark,
  },
  bottomArea: {
    height: 80,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigationButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.overlay,
  },
  navigationIcon: {
    color: "#fff",
    width: 20,
    height: 20,
  },
});
