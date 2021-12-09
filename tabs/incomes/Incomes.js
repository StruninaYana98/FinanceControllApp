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
import { useSelector } from "react-redux";
import { Colors } from "../../theme/colors";
import AddIcon from "../../assets/svg/add.svg";
import CloseIcon from "../../assets/svg/close.svg";
import { BottomModal } from "../shared/BottomModal";
import { parseToFullDateString } from "../../parsers/FullDateParser";
import { NewEntry } from "../shared/NewEntry";

import { useDispatch } from "react-redux";

import { MonthYearPicker } from "../shared/MonthYearPicker";
import { baseStyles } from "../../theme/baseStyles";
import { IncomesService } from "../../services/IncomesService";
import { IncomesList } from "./components/IncomesList";

export function Incomes() {
  const dispatch = useDispatch();

  const [currentPeriodDate, setCurrentPeriodDate] = useState(
    new Date(Date.now())
  );

  const [isNewIncomeModalOpen, setIsNewIncomeModalOpen] = useState(false);
  const [newIncomeSum, setNewIncomeSum] = useState(null);
  const [newIncomeDate, setNewIncomeDate] = useState(new Date(Date.now()));
  const [newIncomeCategory, setNewIncomeCategory] = useState(null);

  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      if (user) {
        await dispatch(
          IncomesService.fetchIncomes(user.uid, currentPeriodDate)
        );
      }
    })();
  }, [user]);

  async function addNewIncome() {
    if (!newIncomeDate || !newIncomeCategory || !newIncomeSum) {
      return;
    }
    setIsNewIncomeModalOpen(false);
    clearNewIncomeEntry();

    const newIncome = {
      date: parseToFullDateString(newIncomeDate),
      category: newIncomeCategory,
      sum: newIncomeSum,
    };

    await dispatch(
      IncomesService.addNewIncome(user.uid, currentPeriodDate, newIncome)
    );
  }

  function clearNewIncomeEntry() {
    setNewIncomeDate(new Date(Date.now()));
    setNewIncomeCategory(null);
    setNewIncomeSum(null);
  }

  async function changePeriod(date) {
    setCurrentPeriodDate(date);
    setNewIncomeDate(date);
    await dispatch(IncomesService.fetchIncomes(user.uid, date));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <MonthYearPicker date={currentPeriodDate} onDateChanged={changePeriod} />
      <IncomesList />
      <View style={styles.bottomArea}>
        <View
          style={{
            position: "absolute",
            backgroundColor: Colors.overlay,
            height: 50,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></View>
        <TouchableOpacity
          style={[
            { backgroundColor: Colors.accent, padding: 20, borderRadius: 30 },
            styles.addButton,
          ]}
          onPress={(e) => {
            setIsNewIncomeModalOpen(true);
          }}
        >
          <AddIcon
            style={[baseStyles.accentButtonContent, { width: 20, height: 20 }]}
          ></AddIcon>
        </TouchableOpacity>
      </View>

      <BottomModal
        modalHeight={"70%"}
        isOpen={isNewIncomeModalOpen}
        onCloseModal={() => {
          setIsNewIncomeModalOpen(false);
          clearNewIncomeEntry();
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            style={[baseStyles.navigationButton, { marginRight: 0 }]}
            onPress={() => {
              setIsNewIncomeModalOpen(false);
              clearNewIncomeEntry();
            }}
          >
            <CloseIcon style={baseStyles.navigationContentSecond}></CloseIcon>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <NewEntry
            newDate={newIncomeDate}
            setNewDate={setNewIncomeDate}
            newCategory={newIncomeCategory}
            setNewCategory={setNewIncomeCategory}
            newSum={newIncomeSum}
            setNewSum={setNewIncomeSum}
          />

          <TouchableOpacity
            disabled={!newIncomeDate || !newIncomeCategory || !newIncomeSum}
            style={[
              baseStyles.buttonInverted,
              {
                width: "100%",
                marginTop: 30,
                opacity:
                  !newIncomeDate || !newIncomeCategory || !newIncomeSum
                    ? 0.3
                    : 1,
              },
            ]}
            onPress={addNewIncome}
          >
            <Text style={[baseStyles.buttonInvertedContent]}>Add Income</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.base,
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
    position: "absolute",
    bottom: 10,
    zIndex: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
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
