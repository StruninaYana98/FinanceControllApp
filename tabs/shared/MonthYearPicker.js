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
  function MonthItem({ item }) {
    return (
      <View>
        <Text style={{ color: "#fff" }}>{item.name}</Text>
      </View>
    );
  }

  function goBack() {
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(newDate);
    onDateChanged(newDate);
  }

  function goForward() {
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(newDate);
    onDateChanged(newDate);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={goBack}>
        <BackIcon style={styles.navIcon} />
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <TouchableOpacity style={styles.pickerButton}>
            <Text style={{ color: "#fff" }}>{getMonthName(currentDate)}</Text>
          </TouchableOpacity>
          <FlatList
            style={{ display: "none" }}
            data={monthsList}
            renderItem={({ item }) => <MonthItem item={item} />}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.pickerButton}>
            <Text style={{ color: "#fff" }}>{currentDate.getFullYear()}</Text>
          </TouchableOpacity>
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
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    color: "#fff",
    width: 20,
    height: 20,
  },
});
