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
  Animated,
} from "react-native";
import { ref, onValue, push, child, update, set } from "firebase/database";
import { database } from "../../App";
import { useSelector } from "react-redux";
import { Colors } from "../../theme/colors";
import EditIcon from "../../assets/svg/edit.svg";
import AddIcon from "../../assets/svg/add.svg";
import { BottomModal } from "../shared/BottomModal";

export function Expenses() {
  const [expensesList, setExpensesList] = useState([]);
  const bottomSwipeValue = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.userReducer);

  async function addExpenses() {
    const ex = {
      date: "28.11.2021",
      title: "jberv",
      cost: "10",
    };

    const expensesListRef = ref(database, "expenses/" + user.uid + "/11-2021");
    const newExpensesRef = push(expensesListRef);

    set(newExpensesRef, ex)
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
      <View style={styles.listItem}>
        <Pressable title="" style={styles.editButton}>
          <EditIcon style={styles.editIcon}></EditIcon>
        </Pressable>
        <View style={styles.expInfo}>
          <View>
            <Text style={styles.expCategory}>{item.title}</Text>
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
        data={expensesList ? expensesList : []}
        renderItem={({ item }) => <ListItem item={item} />}
        style={styles.expensesList}
      />
      <View style={styles.bottomArea}>
        <TouchableHighlight
          style={styles.addButton}
          title="add expenses"
          onPress={()=>{setIsOpen(isOpen);}}
        >
          <AddIcon style={styles.addIcon}></AddIcon>
        </TouchableHighlight>
      </View>

      <BottomModal heightRange={['0%', '70%']} isOpen={isOpen}>
        <TouchableHighlight onPress={()=>{setIsOpen(false)}}>
          <AddIcon style={styles.addIcon}></AddIcon>
        </TouchableHighlight>
        <Text>SWIPE!!!</Text>
        <Text>SWIPE!!!</Text>
        <Text>SWIPE!!!</Text>
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
  editButton: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: Colors.prime_dark,
    marginRight: 15,
    shadowColor: Colors.prime_dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
    color: Colors.prime_light,
  },
  addButton: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: Colors.accent,
    shadowColor: "#6051F9",
    marginTop: -20,
    shadowColor: Colors.accent,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,

    elevation: 20,
    borderRadius: 15,
  },
  addIcon: {
    width: 20,
    height: 20,
    color: Colors.dark,
  },
  bottomArea: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
