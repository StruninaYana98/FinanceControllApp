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
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";

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

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
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
            fontFamily: "Raleway_500Medium",
            color:
              item.id == currentDate.getMonth()
                ? Colors.base_second
                : Colors.accent,
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
            <Text
              style={{ color: Colors.accent, fontFamily: "Raleway_500Medium" }}
            >
              {getMonthName(currentDate)}
            </Text>
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
          <TextInput
            style={[styles.pickerButton, { color: Colors.accent, height: 40 }]}
            keyboardType="number-pad"
            value={yearInputValue}
            onChangeText={setYearInputValue}
            onBlur={setYear}
          />
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
    backgroundColor: Colors.base_second,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    marginLeft: 3,
    marginRight: 3,
    display: "flex",
    alignItems: "center",
    fontFamily: "Raleway_500Medium",
    shadowColor: Colors.accent,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 16,
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: Colors.overlay,
    borderRadius: 10,
  },
  navIcon: {
    color: Colors.accent,
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  monthsList: {
    flex: 1,
    borderRadius: 15,
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
