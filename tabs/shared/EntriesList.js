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
import { Colors } from "../../theme/colors";
import EditIcon from "../../assets/svg/edit.svg";

export function EntriesList({ dataList }) {
  function ListItem({ item }) {
    return (
      <View
        style={[
          styles.listItem,
          {
            marginBottom: item.index == 1 ? 80 : 15,
            marginTop: item.index == dataList.length ? 80 : 0,
          },
        ]}
      >
        <TouchableOpacity style={styles.functionalButton}>
          <EditIcon style={styles.functionalIcon}></EditIcon>
        </TouchableOpacity>
        <View style={styles.entryInfo}>
          <View>
            <Text style={styles.entryCategory}>{item.category?.name}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
          </View>
          <View>
            <Text style={styles.entrySum}>-{item.sum}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      {dataList && dataList.length > 0 ? (
        <FlatList
          inverted={true}
          data={dataList}
          renderItem={({ item }) => <ListItem item={item} />}
          style={styles.dataList}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: Colors.prime_medium }}>No entries</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
  },
  entryDate: {
    color: Colors.prime_dark,
    fontSize: 15,
    marginRight: 20,
  },
  entryCategory: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  entryInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  entrySum: {
    color: Colors.accent,
    fontSize: 24,
    fontWeight: "800",
  },
  dataList: {
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
});
