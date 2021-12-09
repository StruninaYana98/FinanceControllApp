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
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';

export function EntriesList({ dataList, updateEntry, deleteEntry }) {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold
  });
  function ListItem({ item }) {
    const [editMode, setEditMode] = useState(false);
    const [updatedSum, setUpdatedSum] = useState(item.sum);
    const [isSumVisible, setIsSumVisible] =useState(true)
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
        setIsSumVisible(false)
      }
      Animated.timing(animationState, {
        toValue: toValue,
        duration: 500,
        useNativeDriver: false,
      }).start(()=>{if( !editMode){
        setIsSumVisible(true)
      }});
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
                      setEditMode(false);
                      await deleteEntry({ ...item });
                    }}
                  >
                    <Text style={{ color: Colors.contrast, fontSize: 14, fontFamily:'Raleway_500Medium' }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={async () => {
                      setEditMode(false)
                      await updateEntry({ ...item, sum: updatedSum })
                       
                    }}
                  >
                    <Text style={{ color: Colors.prime_dark, fontSize: 14 , fontFamily:'Raleway_500Medium'}}>

                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
            {!isSumVisible ? null : (
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
    }else{
      setSectionDataList(null)
    }
    
    

  }, [dataList])

  return (
    <View style={{ flex: 1 }}>
      {dataList && dataList.length > 0 ? (
        <SectionList
         initialNumToRender={5}
          sections={sectionDataList}
          inverted={true}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ListItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{marginBottom:30}}><Text style={{padding:10, color:Colors.prime_medium, fontFamily:'Raleway_600SemiBold'}}>{title}</Text></View>
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
    marginBottom: 10,
    backgroundColor: Colors.overlay,
  },
  entryDate: {
    color: Colors.base_text_second,
    fontSize: 14,
    fontFamily:"Raleway_400Regular",
    marginRight: 20,
  },
  entryCategory: {
    color: Colors.base_text,
    fontSize: 16,
    fontFamily:"Raleway_400Regular",
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
    fontSize: 18,
    fontFamily:'Raleway_500Medium',
    marginLeft:10
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
    fontFamily:'Raleway_500Medium',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
