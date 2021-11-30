import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Authuntifitation } from "../authentication-tabs/Authuntification";
import { setUser } from "../store/slices/userSlice";
import { Expenses } from "./expenses/Expenses";
import { Logout } from "./Logout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../App";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  });

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator initialRouteName="Expenses">
          <Drawer.Screen
            name="Expenses"
            component={() => <Expenses user={user} />}
          />
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
      ) : (
        <Authuntifitation />
      )}
    </NavigationContainer>
  );
}
