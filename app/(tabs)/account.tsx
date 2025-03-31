import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import FontLoader from "@/components/FontLoader";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";

export default function Account() {
  return (
    <View className="flex-1 bg-[#F7F7F7] justify-center items-center">
      <StatusBar style="auto" backgroundColor={"#018383"} />
      <FontLoader>
        <SafeAreaView className="flex-1">
          {/* Header */}

          <Header />

          {/* Header */}
        </SafeAreaView>
      </FontLoader>

      <Text className="text-red-700">Timer</Text>
    </View>
  );
}
