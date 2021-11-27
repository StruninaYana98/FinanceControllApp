import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../App";

export function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function createUser() {
    console.log(firebaseApp);
    const auth = getAuth(firebaseApp);
  console.log(email + " "+ password)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
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
      <Text>SignUp</Text>
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
      <Button title="Sign Up" onPress={createUser}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 3,
  },
});
