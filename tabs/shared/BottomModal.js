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

export function BottomModal({ heightRange, isOpen, onCloseModal, children }) {
  const modalHeightValue = useRef(new Animated.Value(0)).current;
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalHeight = modalHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: heightRange,
  });

  useEffect(() => {
    (async () => {
      let toValue = 0;
      if (isOpen) {
        toValue = 1;
        setIsModalOpen(true);
      }
      Animated.timing(modalHeightValue, {
        toValue: toValue,
        duration: 500,
        delay: 5,

        useNativeDriver: false,
      }).start(() => {
        if (!isOpen) {
          setIsModalOpen(false);
        }
      });
    })();
  }, [isOpen]);

  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={onCloseModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.overlay,
          width: "100%",
        }}
      >
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
          <View style={{ width: "100%", height: "100%", padding: 30}}>
            {children}
          </View>
        </Animated.View>
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
