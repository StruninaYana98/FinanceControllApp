import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../../theme/colors";
import CloseIcon from "../../assets/svg/close.svg";
import { getMonthName } from "../../parsers/MonthParser";

export function DatePicker({ date, isOpen, onCloseCalendar, onDateChanged }) {
  const [daysList, setDaysList] = useState([]);
  let weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  useEffect(() => {
    if (date) {
      let d = new Date(date.getFullYear(), date.getMonth(), 1);
      let days = [];
      while (d.getMonth() === date.getMonth()) {
        days.push({ date: new Date(d), day: d.getDay()==0? 7 : d.getDay()});
        d.setDate(d.getDate() + 1);
      }
      setDaysList(days);
    }
  }, []);

  function getRows() {
    let totalDays = [];
    let lastMonthDaysCount = daysList[0].day - 1;
    for (let i = 0; i < lastMonthDaysCount; i++) {
      totalDays.push(<View style={styles.cell}></View>);
    }
    daysList.forEach((day) => {
      totalDays.push(
        <TouchableHighlight
          style={[
            styles.cell,
            {
              backgroundColor:
                day.date.toDateString() === date.toDateString()
                  ? "#fff"
                  : Colors.prime_light,
            },
          ]}
          onPress={() => {
            onDateChanged(day.date);
            onCloseCalendar();
          }}
        >
          <Text>{day.date.getDate()}</Text>
        </TouchableHighlight>
      );
    });
    let nexMonthDays =
      daysList[daysList.length - 1].day < 7
        ? 7 - daysList[daysList.length - 1].day
        : 0;
    for (let i = 0; i < nexMonthDays; i++) {
      totalDays.push(<View style={styles.cell}></View>);
    }
    let rows = [];
    let cells = [];

    totalDays.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalDays.length - 1) {
        rows.push(cells);
      }
    });
    return rows;
  }
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      onRequestClose={onCloseCalendar}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[styles.calendarContainer, { position: "relative" }]}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity
            onPress={onCloseCalendar}
            style={[
              styles.navigationButton,
              { position: "absolute", right: 10, top: 10 },
            ]}
          >
            <CloseIcon style={styles.navigationIcon}></CloseIcon>
          </TouchableOpacity>
          <View>
            <Text style={styles.month}>{getMonthName(date)}</Text>
          </View>
          <View
            style={[
              styles.row,
              {
                borderBottomColor: Colors.prime_medium,
                borderBottomWidth: 1,
                marginBottom: 2,
              },
            ]}
          >
            {weekDays.map((weekDay) => (
              <View style={styles.cell}>
                <Text>{weekDay}</Text>
              </View>
            ))}
          </View>
          {daysList && daysList.length > 0
            ? getRows().map((row) => <View style={styles.row}>{row}</View>)
            : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.prime_light,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    paddingRight: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "14%",
    borderRadius: 8,
  },
  month: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    marginRight: 40,
    marginLeft: 40,
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
