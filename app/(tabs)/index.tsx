import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import FontLoader from "@/components/FontLoader";
import RangeIndicator from "@/components/RangeIndicator";
import { LinearGradient } from "expo-linear-gradient";
import SelectDropDown from "@/components/SelectDropDown";
import FeedingHistoryLine from "@/components/FeedingHistoryLine";
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const [feedHistory, setFeedHistory] = useState<Record<string, number>>({});
  const [isLow, setIsLow] = useState(true);

  const loadFeedData = () => {
    console.log(process.env.EXPO_PUBLIC_NGROK_URL);
    AsyncStorage.getItem("feedData")
      .then((data) => {
        if (data) {
          const parsedData = JSON.parse(data) as Record<string, number>;

          const sortedData = Object.entries(parsedData).sort((a, b) => {
            const dateA = new Date(a[0]).getTime();
            const dateB = new Date(b[0]).getTime();
            return dateB - dateA;
          });

          const sortedObject: Record<string, number> =
            Object.fromEntries(sortedData);
          setFeedHistory(sortedObject);
        }
      })
      .catch((error) => {
        console.error("Error loading feed data:", error);
      });
  };

  useEffect(() => {
    loadFeedData();
  }, []);

  useEffect(() => {
    console.log("Feed History Updated:", feedHistory);
  }, [feedHistory]);

  const handleFeed = () => {
    if (selectedSize) {
      fetch(`http://192.168.8.128?status=1&size=${selectedIndex}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            Alert.alert("Success", "Feeding successful");

            // Sending a request to the servlet to fetch distance
            fetch(
              `${process.env.EXPO_PUBLIC_NGROK_URL}/Feedo/CalculateDistance`
            )
              .then((response) => response.text())
              .then((responseText) => {
                console.log("Distance from servlet: " + responseText);
                if (responseText === "High") {
                  setIsLow(false);
                } else if (responseText === "Low") {
                  setIsLow(true);
                }
              })
              .catch((error) => {
                console.error("Error fetching distance from servlet:", error);
              });

            const now = new Date();
            const currentTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            const newFeed = { [currentTime]: selectedIndex };

            AsyncStorage.getItem("feedData")
              .then((existingData) => {
                let feedData = existingData ? JSON.parse(existingData) : {};
                feedData = { ...feedData, ...newFeed };
                return AsyncStorage.setItem(
                  "feedData",
                  JSON.stringify(feedData)
                );
              })
              .then(() => loadFeedData()) // Reload data after saving new feed
              .catch((error) => {
                console.error("Error saving feed data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error during feeding:", error);
        });
    } else {
      Alert.alert("Error", "Please select a size");
    }
  };

  // Handle deleting a feeding history entry
  const handleDelete = (key: string) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Delete from AsyncStorage
            AsyncStorage.getItem("feedData")
              .then((data) => {
                if (data) {
                  const parsedData = JSON.parse(data);
                  delete parsedData[key];
                  return AsyncStorage.setItem(
                    "feedData",
                    JSON.stringify(parsedData)
                  );
                }
              })
              .then(() => {
                loadFeedData();
              })
              .catch((error) => {
                console.error("Error deleting feed data:", error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      <StatusBar style="auto" backgroundColor={"#018383"} />
      <FontLoader>
        <SafeAreaView className="flex-1">
          <Header />
          <ScrollView className="px-8 mt-10">
            <Text
              style={{ fontFamily: "Raleway-SemiBold" }}
              className="text-2xl"
            >
              Food level in the feeder
            </Text>
            <View className="w-full bg-white flex-row justify-between items-center mt-8 border px-4 py-4 rounded-2xl border-gray-300">
              <Text
                style={{ fontFamily: "Raleway-SemiBold" }}
                className="text-lg text-red-700"
              >
                Low
              </Text>
              <RangeIndicator progress={isLow ? 25 : 75} />
              <Text
                style={{ fontFamily: "Raleway-SemiBold" }}
                className="text-lg text-green-700"
              >
                High
              </Text>
            </View>

            <LinearGradient
              colors={["#B16C4A", "#FEDADA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full h-[123px] mt-8 flex justify-center px-8"
              style={{ borderRadius: 15 }}
            >
              <Text
                style={{ fontFamily: "Raleway-SemiBold" }}
                className="text-2xl text-white"
              >
                Feed Your Pet
              </Text>
              <View className="flex-row justify-between items-center mt-4">
                <SelectDropDown
                  onValueChange={(selectedItem, index) => {
                    setSelectedSize(selectedItem);
                    setSelectedIndex(index);
                  }}
                />
                <LinearGradient
                  colors={["#FFF9D3", "#ABDFE6"]}
                  style={{ borderRadius: 9 }}
                >
                  <Pressable
                    className="flex justify-center items-center"
                    style={{ width: 143, height: 36, borderRadius: 9 }}
                    onPress={handleFeed}
                  >
                    <Text
                      style={{ fontFamily: "Raleway-SemiBold", fontSize: 15 }}
                    >
                      Feed Now
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </LinearGradient>

            <View className="mt-5">
              <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 20 }}>
                Feeding History
              </Text>
              <ScrollView
                className="bg-white border mt-5 rounded-lg mb-5"
                style={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
              >
                {Object.keys(feedHistory)
                  .reverse() // Reverses the order of the keys
                  .map((key) => (
                    <FeedingHistoryLine
                      key={key}
                      time={key}
                      text={
                        feedHistory[key] === 0
                          ? "Full Filling"
                          : feedHistory[key] === 1
                          ? "Medium Filling"
                          : "Small Filling"
                      }
                      onDelete={handleDelete}
                    />
                  ))}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </FontLoader>
    </View>
  );
}
