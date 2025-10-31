import MediaSelector from "@/components/media-selector";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function WhatsAppNotesApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to your personal notes!", timestamp: "10:00 AM" },
  ]);
  const [inputText, setInputText] = useState("");
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  const toggleShowMediaSelector = () => setShowMediaSelector(!showMediaSelector);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: inputText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInputText("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Only ONE KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Notes</Text>
          <Text style={styles.headerSubtitle}>Personal chat notes</Text>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageWrapper}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />

        {/* ✅ Input Area */}
        <ScrollView
          style={{ flexGrow: 0 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputArea}>
            <Pressable onPress={toggleShowMediaSelector}>
              <FontAwesome6
                color={"#fff"}
                name="add"
                size={24}
                style={styles.attachment}
              />
            </Pressable>

            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a note..."
              multiline
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim()
                  ? styles.sendButtonActive
                  : styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Feather name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Media Selector */}
        <MediaSelector
          onClose={toggleShowMediaSelector}
          visible={showMediaSelector}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#292828" },
  container: { flex: 1 },
  header: {
    backgroundColor: "#128C7E",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  headerSubtitle: { color: "#d7f8ef", fontSize: 13 },
  messagesContainer: { padding: 10 },
  messageWrapper: { alignItems: "flex-end", marginVertical: 4 },
  messageBubble: {
    backgroundColor: "#dcf8c6",
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  messageText: { color: "#222", fontSize: 16 },
  timestamp: { color: "#666", fontSize: 10, textAlign: "right", marginTop: 3 },
  inputArea: {
    flexDirection: "row",
    backgroundColor: "#292828",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#555",
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: { borderRadius: 50, padding: 12, marginLeft: 6 },
  sendButtonActive: { backgroundColor: "#128C7E" },
  sendButtonDisabled: { backgroundColor: "#bbb" },
  attachment: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
