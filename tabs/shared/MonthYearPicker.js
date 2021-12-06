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
import { getMonthName, monthsList } from "../../parsers/MonthParser";
import { Colors } from "../../theme/colors";
import BackIcon from "../../assets/svg/back.svg";
import NextIcon from "../../assets/svg/next.svg";

export function MonthYearPicker({ date, onDateChanged }) {
  const [currentDate, setCurrentDate] = useState(date);
  const [yearInputValue, setYearInputValue] = useState(
    String(date.getFullYear())
  );
  const [isMonthsOpen, setMonthsOpen] = useState(false);
  const monthsHeightValue = useRef(new Animated.Value(0)).current;
  const monthsHeight = monthsHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  useEffect(() => {
    let toValue = 0;
    if (isMonthsOpen) {
      toValue = 1;
    }
    Animated.timing(monthsHeightValue, {
      toValue: toValue,
      duration: 500,
      delay: 20,
      useNativeDriver: false,
    }).start();
  }, [isMonthsOpen]);

  function goBack() {
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setYearInputValue(String(newDate.getFullYear()));
    setCurrentDate(newDate);
    onDateChanged(newDate);
  }

  function goForward() {
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setYearInputValue(String(newDate.getFullYear()));
    setCurrentDate(newDate);
    onDateChanged(newDate);
  }

  function setMonth(item) {
    let newDate = new Date(currentDate.setMonth(item.id));
    setYearInputValue(String(newDate.getFullYear()));
    setCurrentDate(newDate);
    onDateChanged(newDate);
    setMonthsOpen(false);
  }

  function setYear() {
    let year = Number(yearInputValue);

    let newDate = year ? new Date(currentDate.setYear(year)) : null;
    if (newDate) {
      setYearInputValue(String(newDate.getFullYear()));
      setCurrentDate(newDate);
      onDateChanged(newDate);
    }
  }

  function MonthItem({ item }) {
    return (
      <TouchableOpacity style={styles.monthItem} onPress={() => setMonth(item)}>
        <Text
          style={{
            color: item.id == currentDate.getMonth() ? "#fff" : Colors.dark,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={goBack}>
        <BackIcon style={styles.navIcon} />
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <TouchableOpacity
            style={[styles.pickerButton, { minWidth: 100 }]}
            onPress={() => setMonthsOpen(!isMonthsOpen)}
          >
            <Text style={{ color: "#fff" }}>{getMonthName(currentDate)}</Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              height: monthsHeight,
              position: "absolute",
              zIndex: 1,
              top: 50,
              width: "100%",
            }}
          >
            <FlatList
              style={styles.monthsList}
              data={monthsList}
              renderItem={({ item }) => <MonthItem item={item} />}
            />
          </Animated.View>
        </View>
        <View>
          <View style={styles.pickerButton}>
            <TextInput
              style={{ color: "#fff", height: 21 }}
              keyboardType="number-pad"
              value={yearInputValue}
              onChangeText={setYearInputValue}
              onBlur={setYear}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.navButton} onPress={goForward}>
        <NextIcon style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  pickerButton: {
    backgroundColor: Colors.prime_light,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 3,
    display: "flex",
    alignItems: "center",
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    color: "#fff",
    width: 20,
    height: 20,
  },
  monthsList: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: Colors.prime_light,
    minWidth: 100,
  },
  monthItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
