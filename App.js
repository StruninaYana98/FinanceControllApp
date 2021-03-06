import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Authuntifitation } from "./authentication-tabs/Authuntification";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Logout } from "./tabs/Logout";

const firebaseConfig = {
  apiKey: "AIzaSyC8f3ethZ1I0CRiJDPlK_JEE1ctuASqzdc",
  authDomain: "financecontroll-902fa.firebaseapp.com",
  projectId: "financecontroll-902fa",
  storageBucket: "financecontroll-902fa.appspot.com",
  messagingSenderId: "552043678232",
  appId: "1:552043678232:web:1ef73a4ddd141ca4c4116d",
  measurementId: "G-WDQ0MHS3V7",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}



const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setIsAuth(true);
      const uid = user.uid;
      // ...
    } else {
      setIsAuth(false);
    }
  });
  return (
    <NavigationContainer>
      {isAuth ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
      ) : (
        <Authuntifitation />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
