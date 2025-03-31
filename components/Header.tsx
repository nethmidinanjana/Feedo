import { Pressable, StyleSheet, Text, View } from "react-native";
import dpimg from "@/assets/images/dpimg.png";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  const handleNotifications = () => {
    console.log("Handle Notifications");
  };
  return (
    <View>
      {/* Header: Start */}

      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Image source={dpimg} style={styles.dpImg} />

          <View className="flex-col" style={{ gap: 1 }}>
            <Text
              className="text-white font-semibold text-2xl"
              style={{
                fontFamily: "MontserratAlternates-SemiBold",
              }}
            >
              Hello! Jorgia
            </Text>
            <Text
              className="text-white font-semibold"
              style={{
                fontFamily: "MontserratAlternates-SemiBold",
              }}
            >
              Online
            </Text>
          </View>
        </View>

        <Pressable onPress={handleNotifications} style={styles.notification}>
          <Feather name="bell" size={22} color="black" />
        </Pressable>
      </View>

      {/* Header: End */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#018383",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dpImg: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 90 / 2,
  },
  nameRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  notification: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
