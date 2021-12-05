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
import CalendarIcon from "../../assets/svg/calendar.svg";
import { parseToFullDateString } from "../../parsers/FullDateParser";
import { Colors } from "../../theme/colors";
import { DatePicker } from "./DatePicker";
import { Categories } from "./Сategories";

export function NewEntry({newDate, setNewDate, newCategory, setNewCategory, newSum, setNewSum }) {

    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.newDate}>
          {parseToFullDateString(newDate)}
        </Text>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => setDatePickerOpen(true)}
        >
          <CalendarIcon style={styles.navigationIcon}></CalendarIcon>
        </TouchableOpacity>
      </View>
      <DatePicker
        date={newDate}
        onDateChanged={setNewDate}
        onCloseCalendar={() => {
          setDatePickerOpen(false);

        }}
        isOpen={isDatePickerOpen}
      />
      <Categories
        checkedCategory={newCategory}
        onCheck={setNewCategory}
      />
      <TextInput
        style={styles.sumInput}
        onChangeText={setNewSum}
        value={newSum}
        keyboardType="number-pad"
      ></TextInput>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sumInput: {
    backgroundColor: Colors.overlay,
    color: "#fff",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 70,
  },
  newDate: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
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
