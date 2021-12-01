import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../../theme/colors";
export function DatePicker({ date, isOpen, onCloseCalendar, onDateChanged }) {
  const [daysList, setDaysList] = useState([]);
  let weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  useEffect(() => {
    if (date) {
      let d = new Date(date.getFullYear(), date.getMonth(), 1);
      let days = [];
      while (d.getMonth() === date.getMonth()) {
        days.push({ date: new Date(d), day: d.getDay() });
        d.setDate(d.getDate() + 1);
      }
      setDaysList(days);
    }
  }, []);

  function getRows() {
    let totalDays = [];
    let lastMonthDaysCount = daysList[0].day;
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
      daysList[daysList.length - 1].day < 6
        ? 6 - daysList[daysList.length - 1].day
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
    <Modal visible={isOpen} transparent={true} onRequestClose={onCloseCalendar}>
      
      
          <View  style={{
          flex: 1,
          backgroundColor: Colors.overlay,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <View
          style={styles.calendarContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <View>
            <Text style={styles.month}>December</Text>
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
  },
});