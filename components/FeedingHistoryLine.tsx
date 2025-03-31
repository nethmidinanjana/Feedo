import React from "react";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface FeedingHistoryLineProps {
  time: string;
  text: string;
  onDelete: (key: string) => void; // Add onDelete handler
}

const FeedingHistoryLine: React.FC<FeedingHistoryLineProps> = ({
  time,
  text,
  onDelete,
}) => {
  return (
    <View
      className="w-full h-auto flex-row justify-between items-center"
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0, 0, 0, 0.12)",
      }}
    >
      <Text>{time}</Text>
      <Text>{text}</Text>
      <Pressable onPress={() => onDelete(time)}>
        <AntDesign name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
};
export default FeedingHistoryLine;
