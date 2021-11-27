import { SafeAreaView, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "./SignUp";
import React from "react";
import { Login } from "./Login";

const Stack = createStackNavigator();

export function Authuntifitation({ navigation }) {
  function SignUpOrLogIn({ navigation }) {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    return (
      <SafeAreaView style={styles.container}>
        <Text>Welcome!</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        ></Button>
         <Text>or</Text>
        <Button
          title="Log In"
          onPress={() => navigation.navigate("LogIn")}
        ></Button>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SignUporLogIn">
      <Stack.Screen name="SignUporLogIn" component={SignUpOrLogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={Login}/>
    </Stack.Navigator>
  );
}
