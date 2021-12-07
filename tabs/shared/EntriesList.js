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
  SectionList,
  ActivityIndicator
} from "react-native";
import { Colors } from "../../theme/colors";
import EditIcon from "../../assets/svg/edit.svg";
import CloseIcon from "../../assets/svg/close.svg";
import { baseStyles } from "../../theme/baseStyles";

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
    const listItemBackgroundColor = animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.overlay, Colors.base_second],
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
         
          shadowColor: Colors.base_second,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 17,
        }}
      >
        <Animated.View
          style={[
            styles.listItem,
            { backgroundColor: listItemBackgroundColor },
          ]}
        >
          <TouchableOpacity
            style={[
              baseStyles.navigationButton,
              {marginRight:10}
            ]}
            onPress={toggleEditMode}
          >
            {editMode ? (
              <CloseIcon style={baseStyles.navigationContent} />
            ) : (
              <EditIcon style={baseStyles.navigationContent} />
            )}
          </TouchableOpacity>
          <View style={styles.entryInfo}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.entryCategory}>{item.category?.name}</Text>
              <Text style={styles.entryDate}>{item.date}</Text>
              <Animated.View
                style={{
                  height: boxHeight,
                  overflow: "hidden",
                  opacity: opacity,
                }}
              >
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
                    <Text style={{ color: Colors.contrast, fontSize: 16 }}>
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
                    <Text style={{ color: Colors.prime_dark, fontSize: 16 }}>
                      {" "}
                      Update
                    </Text>
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

  const [sectionDataList, setSectionDataList] = useState([])


  useEffect(()=>{
    if(dataList){
    let dates = [];
    dataList.forEach(item => {
         if(!dates.includes(item.date)){
           dates.push(item.date);
         }
    });
    
      dates.sort((date1, date2)=> {
          d1 = date1.split('.')[0];
          d2 = date2.split('.')[0];
          return Number(d2) - Number(d1)
      })
       
      let sectionDataList = []
      dates.forEach(date=>{
        sectionDataList.push({
          title: date,
          data: dataList.filter(item=>item.date===date).reverse()
        })
      })

      setSectionDataList(sectionDataList)
    }
    
    

  }, [dataList])

  return (
    <View style={{ flex: 1 }}>
      {dataList ? dataList.length > 0 ? (
        <SectionList
          sections={sectionDataList}
          inverted={true}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ListItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{marginBottom:30}}><Text style={{padding:10, color:Colors.accent}}>{title}</Text></View>
          )}
          ListHeaderComponent={()=><View style={{height:40}}></View>}
          ListFooterComponent={()=><View style={{height:40}}></View>}
          style={styles.dataList}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: Colors.prime_medium }}>No entries</Text>
        </View>
      ): <ActivityIndicator/>}
    </View>
  );
}
const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: Colors.overlay,
  },
  entryDate: {
    color: Colors.base_text_second,
    fontSize: 14,
    marginRight: 20,
  },
  entryCategory: {
    color: Colors.base_text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  entryInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  entrySum: {
    color: Colors.contrast,
    fontSize: 20,
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
    marginRight: 15,
    backgroundColor: Colors.overlay,
  },
  functionalIcon: {
    width: 20,
    height: 20,
    color: Colors.base_text_second,
  },
  sumInput: {
    backgroundColor: Colors.prime_light,
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
