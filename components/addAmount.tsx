import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import {
  Stack,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useKhata } from "@/contexts/data";
import { useActiveCustomer } from "@/contexts/active";
const AddAmountComp = () => {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState<any>("");
  const [date, setDate] = useState("" + new Date());
  const [dateExpanded, setDateExpanded] = useState(false);
  const handleDateChange = (val: any) => {
    setDate("" + val);
    setDateExpanded(false);
  };
  const { isGive } = useLocalSearchParams();
  const isCredit = isGive === "0";
  const color = isCredit ? "green" : "red";
  const { addAmount } = useKhata();
  const { activeCustomer } = useActiveCustomer();
  const addAmountLocal = () => {
    const f = isCredit ? amount : 0 - amount;
    addAmount(activeCustomer, f, note, moment(date).format("DD-MM-YYYY"));
    router.replace("/customerDetails");
  };
  return (
    <>
      <Stack.Screen options={{ title: "Add Transaction" }} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: color }}>
            Amount {!isCredit ? "Given" : "Recived"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <FontAwesome name="rupee" size={45} color={color} />
            {/* <FontAwesome name="money" size={40} color={color} /> */}
            <TextInput
              autoFocus
              value={amount}
              onChangeText={(text) => setAmount(parseInt(text))}
              placeholder="Amount"
              keyboardType="numeric"
              style={{
                width: 180,
                height: 90,
                borderBottomWidth: 1,
                marginLeft: 20,
                paddingHorizontal: 10,
                fontSize: 32,
              }}
            />
          </View>
          {dateExpanded ? (
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 16,
              }}
            >
              <CalendarPicker
                selectedDayStyle={{ backgroundColor: "blue" }}
                initialDate={new Date()}
                maxDate={new Date()}
                onDateChange={(date: any) => handleDateChange(date)}
              />
            </View>
          ) : (
            <Pressable
              onPress={() => setDateExpanded(true)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
                width: "100%",
                borderRadius: 12,
                marginVertical: 16,
              }}
            >
              <Fontisto name="date" size={24} color="black" />
              <Text style={{ fontSize: 18, marginLeft: 16 }}>
                {moment(date).format("DD-MM-YYYY")} {"   "}|{"   "}
                {moment(date).format("dddd")}
              </Text>
            </Pressable>
          )}
          <View
            style={{
              display: "flex",
              width: "100%",
              marginVertical: 16,
              backgroundColor: "white",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Foundation name="clipboard-notes" size={24} color={color} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 10,
                  color: color,
                }}
              >
                Add extra notes/remark here ..
              </Text>
            </View>
            <TextInput
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline
              numberOfLines={5}
              placeholder="Write here ...."
              style={{
                marginTop: 10,
                // height: 70,
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                fontSize: 16,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Pressable
            disabled={amount === "" || amount <= 0}
            onPress={() => addAmountLocal()}
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "blue",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                padding: 12,
                color: "white",
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              Save
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default AddAmountComp;
