import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const RangeIndicator: React.FC<{ progress: number }> = ({ progress }) => {
  const progressValue = progress / 100;

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progressValue}
        width={220}
        color="#3b82f6"
        unfilledColor="#d1d5db"
        borderWidth={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
});

export default RangeIndicator;
