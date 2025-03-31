import FontLoader from "@/components/FontLoader";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, Pressable, Button } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Timer() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleTimer = async () => {
    console.log("Handle Time");
    await fetch("http://192.168.8.128?status=2");
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] justify-center items-center">
      <StatusBar style="auto" backgroundColor={"#018383"} />
      <FontLoader>
        <SafeAreaView className="flex-1">
          {/* Header */}

          <Header />
          <View className="px-8 mt-8 text-center">
            <Text
              style={{
                fontFamily: "Raleway-SemiBold",
              }}
              className="text-2xl mb-4"
            >
              Feed Calender
            </Text>

            <View>
              <LinearGradient
                colors={["#FFF9D3", "#ABDFE6"]}
                style={{
                  borderRadius: 9,
                }}
                className="w-full flex justify-center items-center mb-6 mt-6 border border-gray-300 "
              >
                <Pressable
                  onPress={showDatepicker}
                  className="w-full flex justify-center items-center "
                  style={{ width: 143, height: 46, borderRadius: 9 }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway-SemiBold",
                    }}
                    className="text-lg"
                  >
                    Choose Date
                  </Text>
                </Pressable>
              </LinearGradient>

              <LinearGradient
                colors={["#FFF9D3", "#ABDFE6"]}
                style={{ borderRadius: 9 }}
                className="w-full flex justify-center items-center border border-gray-300"
              >
                <Pressable
                  onPress={showTimepicker}
                  className="w-full flex justify-center items-center"
                  style={{ width: 143, height: 46, borderRadius: 9 }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway-SemiBold",
                    }}
                    className="text-lg"
                  >
                    Choose Time
                  </Text>
                </Pressable>
              </LinearGradient>

              <LinearGradient
                colors={["#018383", "#38A3A5"]}
                style={{
                  borderRadius: 9,
                }}
                className="w-full flex justify-center items-center border border-gray-400 mt-6"
              >
                <Pressable
                  onPress={handleTimer}
                  className="w-full flex justify-center items-center"
                  style={{ width: 143, height: 50, borderRadius: 9 }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway-SemiBold",
                    }}
                    className="text-2xl text-white"
                  >
                    Set Timer
                  </Text>
                </Pressable>
              </LinearGradient>
              <Text
                className="mt-6 text-center text-lg"
                style={{
                  fontFamily: "Raleway-SemiBold",
                }}
              >
                selected: {date.toLocaleString()}
              </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode as "date" | "time"}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <Text
              style={{
                fontFamily: "Raleway-SemiBold",
                color: "rgba(0, 0, 0, 0.56)",
                textAlign: "center",
              }}
              className="text-2xl mt-6"
            >
              Set the date and time to feed automatically
            </Text>
          </View>

          {/* Header */}
        </SafeAreaView>
      </FontLoader>
    </View>
  );
}
