import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Authuntifitation } from "../authentication-tabs/Authuntification";
import { setUser } from "../store/slices/userSlice";
import { Expenses } from "./expenses/Expenses";
import { Logout } from "./Logout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../App";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../theme/colors";
import MenuIcon from "../assets/svg/menu.svg";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
  Raleway_400Regular,
  Raleway_500Medium
} from '@expo-google-fonts/raleway';
import { Incomes } from "./incomes/Incomes";
import { Statistics } from "./statistics/Statistics";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_700Bold,
    Raleway_600SemiBold,
    Raleway_400Regular,
    Raleway_500Medium
  });


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
      {user && fontsLoaded? (
        <Drawer.Navigator
          screenOptions={{
            header: ({ navigation, route, options }) => {
              const title = getHeaderTitle(options, route.name);

              return (
                <View
                  style={{
                    height: 80,
                    width: "100%",
                    backgroundColor: Colors.base,
                    paddingTop: StatusBar.currentHeight,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.openDrawer()}
                      style={{
                        backgroundColor: Colors.overlay,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <MenuIcon
                        style={{
                          width: 25,
                          height: 25,
                          color: Colors.base_text,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        marginLeft: 30,
                        marginRight: 20,
                        color: Colors.base_text,
                        fontFamily: "Raleway_700Bold",
                      }}
                    >
                      {title}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
          initialRouteName="Expenses"
        >
          <Drawer.Screen
            name="Expenses"
            component={Expenses}
          />
          <Drawer.Screen name="Incomes" component={Incomes}/>
          <Drawer.Screen name="Statistics" component={Statistics}/>
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
      ) : (
        <Authuntifitation />
      )}
    </NavigationContainer>
  );
}
