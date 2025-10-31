import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface MediaOption {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

interface MediaSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function MediaSelector({
  visible,
  onClose,
}: MediaSelectorProps) {
  const options: MediaOption[] = [
    {
      icon: <Entypo name="camera" size={30} color="#007AFF" />,
      label: "Camera",
      onPress: () => console.log("Camera pressed"),
    },
    {
      icon: <MaterialIcons name="photo" size={30} color="#34A853" />,
      label: "Gallery",
      onPress: () => console.log("Gallery pressed"),
    },
    {
      icon: <FontAwesome5 name="file-alt" size={26} color="#F4B400" />,
      label: "Document",
      onPress: () => console.log("Document pressed"),
    },
    {
      icon: <Entypo name="location-pin" size={30} color="#EA4335" />,
      label: "Location",
      onPress: () => console.log("Location pressed"),
    },
  ];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >

          <View style={styles.container}>
            {options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={styles.option}
                onPress={opt.onPress}
              >
                <View style={styles.iconWrapper}>{opt.icon}</View>
                <Text style={styles.label}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    width: "100%",
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    padding: 14,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: "#999",
  },
});
