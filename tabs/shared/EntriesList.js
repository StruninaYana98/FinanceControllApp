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
import CloseIcon from "../../assets/svg/close.svg";

export function EntriesList({ dataList, updateEntry, deleteEntry }) {
  function ListItem({ item }) {
    const [editMode, setEditMode] = useState(false);
    const [updatedSum, setUpdatedSum] = useState(item.sum);
    const animationState = useRef(new Animated.Value(0)).current;

    const boxHeight = animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 110],
    });
    const opacity = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
    const listItemBorderColor = 
    animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.dark, Colors.prime_dark],
      });
    async function toggleEditMode() {
      setEditMode(!editMode);
    }
    useEffect(() => {
      let toValue = 0;
      if (editMode) {
        toValue = 1;
      }
      Animated.timing(animationState, {
        toValue: toValue,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, [editMode]);
    return (
      <View
        style={{
          marginBottom: item.index == 1 ? 70 : 0,
          marginTop: item.index == dataList.length ? 20 : 0,
        }}
      >
        <Animated.View
          style={[
            styles.listItem,
            { borderColor: listItemBorderColor},
          ]}
        >
          <TouchableOpacity
            style={[
              styles.functionalButton,
              { borderColor: !editMode ? Colors.prime_dark : Colors.dark },
            ]}
            onPress={toggleEditMode}
          >
            {editMode ? (
              <CloseIcon style={styles.functionalIcon} />
            ) : (
              <EditIcon style={styles.functionalIcon} />
            )}
          </TouchableOpacity>
          <View style={styles.entryInfo}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.entryCategory}>{item.category?.name}</Text>
              <Text style={styles.entryDate}>{item.date}</Text>
              < Animated.View style={{ height: boxHeight, overflow: "hidden" , opacity:opacity}}>
                <TextInput
                  style={styles.sumInput}
                  keyboardType="number-pad"
                  value={updatedSum}
                  onChangeText={setUpdatedSum}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={async () => {
                      await deleteEntry({ ...item })
                        .then(() => setEditMode(false))
                        .catch((error) => {
                          alert(error.message);
                        });
                    }}
                  >
                    <Text style={{ color: Colors.accent, fontSize: 18 }}>
                      {" "}
                      Delete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={async () => {
                      await updateEntry({ ...item, sum: updatedSum })
                        .then(() => setEditMode(false))
                        .catch((error) => {
                          alert(error.message);
                        });
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 18 }}> Update</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
            {editMode ? null : (
              <View>
                <Text style={styles.entrySum}>-{item.sum}</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
    borderRadius: 20,
    borderWidth: 1,
    marginBottom:10
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
    marginBottom: 10,
  },
});
