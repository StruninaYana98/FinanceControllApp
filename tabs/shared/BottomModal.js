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
  Animated,
} from "react-native";
import { Colors } from "../../theme/colors";

export function BottomModal({ heightRange, isOpen, children }) {
  const modalHeightValue = useRef(new Animated.Value(0)).current;
  const modalHeight = modalHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: heightRange,
  });

  useEffect(() => {
      console.log(isOpen)
    let toValue = 0;
    if (isOpen) {
      toValue = 1;
    }
    Animated.timing(modalHeightValue, {
      toValue: toValue,
      duration: 3000,

      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
            height: modalHeight,
          },
          styles.modalContainer,
        ]}
      >
        {children}
      </Animated.View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: Colors.dark,
    shadowColor: Colors.prime_dark,
    shadowOffset: {
      width: 20,
      height: -20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 100,
  },
});
