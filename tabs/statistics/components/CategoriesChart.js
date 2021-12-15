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
import {
  ref,
  onValue,
  push,
  child,
  update,
  set,
  remove,
} from "firebase/database";
import { PieChart } from "react-native-svg-charts";
import { Colors } from "../../../theme/colors";

export function CategoriesChart() {
  const categoriesStatistics = [
    {
      category: "food",
      id: 13532,
      total: 10000,
    },
    {
      category: "rent",
      id: 34976,
      total: 24000,
    },
    {
      category: "cloths",
      id: 647,
      total: 5000,
    },
    {
      category: "spotify",
      id: 198,
      total: 2000,
    },
    {
      category: "арендная плата",
      id: 98632,
      total: 3000,
    },
    {
      category: "аренднаu4hger  jrferg",
      id: 932,
      total: 9000,
    },
    {
      category: "drhvj",
      id: 6977,
      total: 2000,
    },
    {
      category: "drhj",
      id: 6970,
      total: 2000,
    },
  ];

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let dataList = [];
    for (let i = 0; i < categoriesStatistics.length; i++) {
      let data = categoriesStatistics.map((item, index) => {
        if (i === index) {
          return {
            category: item.category,
            total: item.total,
            key: item.id,
            value: item.total,
            svg: { fill: Colors.contrast },
            arc: { outerRadius: "110%", cornerRadius: 5 },
          };
        } else {
          return {
            category: item.category,
            total: item.total,
            key: item.id,
            value: item.total,
            svg: { fill: Colors.contrast, opacity: "0.3" },
            arc: { outerRadius: "100%", cornerRadius: 3 },
          };
        }
      });
      dataList.push(data);
    }
    setDataList(dataList)
  }, []);
 
  return (
    <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between"}}>
      {dataList.map((data, index) => (
        <View style={styles.chartWrapper} key={index}>
          <View style={{position:"relative"}}>
          <PieChart
            style={{ height: 80, width: 80, borderRadius: 80, }}
            outerRadius={"90%"}
            innerRadius={15}
            data={data}
          />
          <View style={{position:"absolute", top:0, bottom:0, left:0, right:0, display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:14,color:Colors.contrast, lineHeight:14}}>{"<1"}</Text>
          </View>

          </View>
          <View style={{flexShrink:1, padding:5}}>
            <Text style={styles.category}>{categoriesStatistics[index].category}</Text>
            <Text style={styles.total}>{categoriesStatistics[index].total}</Text>
            </View>
        </View>
      ))}
    </View>
  );
}
const styles=StyleSheet.create({
  chartWrapper:{
    backgroundColor:Colors.overlay,
    padding:5,
    borderRadius:15,
    margin:5,
    display:"flex",
    flexDirection:"row",
    flexGrow:1

  },
  category:{
    fontFamily:'Raleway_500Medium',
    color:Colors.base_text,
    marginBottom:3,
    fontSize:14,
    

  },
  total:{
    fontFamily:'Raleway_600SemiBold',
    color:Colors.base_text_second,
    fontSize:16
  }

})
