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
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from "react-native";
import { Colors } from "../../theme/colors";

export function BottomModal({ modalHeight, isOpen, onCloseModal, children }) {


  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onCloseModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.overlay,
          width: "100%",
          position:'relative'
        }}
      >
        <View
          style={[
            {
              position: "absolute",
              padding: 30,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
              height:  modalHeight,

            },
            styles.modalContainer,
          ]}
        >
  
            {children}
          
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: Colors.accent,
    shadowColor: Colors.prime_dark,
    shadowOffset: {
      width: 20,
      height: -20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20,
  },
});
