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
import { Colors } from "./colors";

export const baseStyles = StyleSheet.create({
  accentButton: {
    backgroundColor: Colors.accent,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  accentButtonContent: {
    color: Colors.base_second,
    borderRadius:10,
    fontSize: 18,
  },
  buttonInverted:{
    backgroundColor: Colors.base_second,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  buttonInvertedContent:{
    color: Colors.base_text,
    borderRadius:10,
    fontSize: 18,
  },
 
  navigationButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width:35,
    height:35,
    borderRadius: 10,
    backgroundColor: Colors.overlay,
  

  },
  navigationContent: {
    color: Colors.base_text_second,
    width: 20,
    height: 20,
    borderRadius:10,
   

  },
  navigationContentSecond: {
    color: Colors.base_second,
    width: 20,
    height: 20,
    borderRadius:10,
   
  },
});
