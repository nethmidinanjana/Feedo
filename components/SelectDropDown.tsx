import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SelectDropDownProps {
  onValueChange: (selectedItem: string, index: number) => void; // Pass both selectedItem and index
}

export default function SelectDropDown({ onValueChange }: SelectDropDownProps) {
  const sizes = ["Large", "Medium", "Small"];

  return (
    <SelectDropdown
      data={sizes}
      onSelect={(selectedItem, index) => {
        onValueChange(selectedItem, index); // Pass both selectedItem and index to parent
        console.log(selectedItem + " " + index);
      }}
      renderButton={(selectedItem, isOpened) => (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {selectedItem || "Select size"}
          </Text>
          <Icon
            name={isOpened ? "chevron-up" : "chevron-down"}
            style={styles.dropdownButtonArrowStyle}
          />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View
          style={[
            styles.dropdownItemStyle,
            isSelected && { backgroundColor: "#D2D9DF" },
          ]}
        >
          <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 145,
    height: 36,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.76)",
  },
  dropdownButtonArrowStyle: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.76)",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
