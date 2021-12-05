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
import EditIcon from "../../assets/svg/edit.svg";
import AddIcon from "../../assets/svg/add.svg";
import CloseIcon from "../../assets/svg/close.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import { BottomModal } from "../shared/BottomModal";
import { parseToFullDateString } from "../../parsers/FullDateParser";
import { DatePicker } from "../shared/DatePicker";
import { Categories } from "../shared/Сategories";
import { NewEntry } from "../shared/NewEntry";

export function Expenses() {
  const [expensesList, setExpensesList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newExpSum, setNewExpSum] = useState(null);
  const [newExpDate, setNewExpDate] = useState(new Date(Date.now()));
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [newExpCategory, setNewExpCategory] = useState(null);

  const { user } = useSelector((state) => state.userReducer);

  async function addNewExpense() {
    if (!newExpDate || !newExpCategory || !newExpSum) {
      return;
    }
    const newExpense = {
      date: parseToFullDateString(newExpDate),
      category: newExpCategory,
      cost: newExpSum,
    };

    const expensesListRef = ref(database, "expenses/" + user.uid + "/11-2021");
    const newExpensesRef = push(expensesListRef);

    set(newExpensesRef, newExpense)
      .then(() => {
        alert("success");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    (async () => {
      if (user) {
        const expensesRef = ref(database, "expenses/" + user.uid + "/11-2021");

        onValue(expensesRef, (snapshot) => {
          let expList = [];
          snapshot.forEach((child) => {
            expList.push(child.val());
          });

          expList.forEach((item, index) => {
            item.index = index + 1;
          });
          console.log(expList);
          setExpensesList(expList);
        }).catch((error) => {
          alert(error.message);
        });
      }
    })();
  }, [user]);

  function toggleSwipe() {
    setIsOpen(!isOpen);
  }

  function ListItem({ item }) {
    return (
      <View
        style={[
          styles.listItem,
          {
            marginBottom: item.index == 1 ? 80 : 15,
            marginTop: item.index == expensesList.length ? 80 : 0,
          },
        ]}
      >
        <TouchableOpacity style={styles.functionalButton}>
          <EditIcon style={styles.functionalIcon}></EditIcon>
        </TouchableOpacity>
        <View style={styles.expInfo}>
          <View>
            <Text style={styles.expCategory}>{item.category?.name}</Text>
            <Text style={styles.expDate}>{item.date}</Text>
          </View>
          <View>
            <Text style={styles.expCost}>-{item.cost}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        inverted={true}
        data={expensesList ? expensesList : []}
        renderItem={({ item }) => <ListItem item={item} />}
        style={styles.expensesList}
      />
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            setIsOpen(true);
          }}
        >
          <AddIcon style={styles.addIcon}></AddIcon>
        </TouchableOpacity>
      </View>

      <BottomModal
        heightRange={["0%", "70%"]}
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
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
              setIsOpen(false);
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
          style={[
            styles.addButton,
            { width: "100%", marginLeft: 30, marginRight: 30 },
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
    bottom: 20,
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
