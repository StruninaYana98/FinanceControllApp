import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import { Colors } from "../../theme/colors";

export function Categories({ onCheck , checkedCategory}) {
  const [categories, setCategories] = useState([
    {
      name: "khvehvb jfge kejryfger",
      id: "1",
    },
    {
      name: "melfve",
      id: "2",
    },
    {
      name: "kvefv",
      id: "3",
    },
    {
      name: "lbbfbdngkjer elne",
      id: "4",
    },
    {
      name: "32rekhe2  hf 2 3j2hfb",
      id: "5",
    },
    {
      name: "bvebr ekrfr",
      id: "6",
    },
  ]);


  useEffect(() => {
    getRows();
  }, []);
  function CategoryItem({ item }) {
    return (
      <TouchableHighlight
        style={checkedCategory && item.id===checkedCategory.id ? styles.checkedCategory: styles.category}
        onPress={() => {
          onCheck(item)
        }}
      >
        <Text style={checkedCategory && item.id===checkedCategory.id ? styles.checkedCategoryName:styles.categoryName}>{item.name}</Text>
      </TouchableHighlight>
    );
  }
  function getRows() {
    let row1 = [];
    let row2 = [];
    let row3 = [];

    categories.forEach((item, index) => {
      if (index % 3 === 0) {
        row3.push(item);
      } else if (index % 2 === 0) {
        row2.push(item);
      } else {
        row1.push(item);
      }
    });
    let rows = [];
    rows.push(row1);

    rows.push(row2);
    rows.push(row3);

    return rows;
  }
  return (
      <ScrollView horizontal={true}>
        <View>
          {getRows().map((row) => (
            <View style={styles.categoriesWrapper}>
              {row.map((item) => (
                <CategoryItem item={item} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  checkedCategory:{
    backgroundColor:Colors.base_second,
    color:Colors.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
  },

  category: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.overlay,

    borderRadius: 20,
    color: "#fff",
    marginRight: 10,
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  categoryName: {
    color: Colors.base_second,
    fontSize: 15,
  },
  checkedCategoryName:{
    color: Colors.base_text,
    fontSize: 15,
  }
});
