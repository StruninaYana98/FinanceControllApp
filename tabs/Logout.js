import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {firebaseApp} from '../App';

export function Logout() {


  async function userLogout(){
    const auth = getAuth(firebaseApp);
   await signOut(auth).then(() => {
      // Sign-out successful.
      alert("success")
    }).catch((error) => {
      // An error happened.
      alert(error.message);
    });
    
  }
  return (
    <SafeAreaView>
      <Button title="Log Out" onPress={userLogout}></Button>
    </SafeAreaView>
  );
}
