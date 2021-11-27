import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import {
  getAuth,
signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../App";

export function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function loginUser() {
    const auth = getAuth(firebaseApp);
    console.log(email + " " + password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // loged in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
  return (
    <SafeAreaView>
      <Text>LogIn</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={loginUser}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 3,
  },
});
