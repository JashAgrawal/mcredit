import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { amount } from "@/constants/data";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import StylesButton from "./button";
import { useKhata } from "@/contexts/data";
import { useActiveCustomer } from "@/contexts/active";
import * as SMS from 'expo-sms';

const Entry = ({
  amount,
  date,
  note,
}: {
  amount: number;
  date: any;
  note: string;
}) => {
  const isCredit = amount > 0;
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: isCredit ? "flex-end" : "flex-start",
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <View
        style={{
          backgroundColor: isCredit ? "green" : "red",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 13, color: "white" }}>
          Amount {isCredit ? "Received" : "Gave"} on {date}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 6 }}>
          <MaterialIcons name="currency-rupee" size={22} color="white" />
          <Text style={{ fontSize: 24, fontWeight: "700", color: "white", paddingHorizontal: 2 }}>{Math.abs(amount)}</Text>
        </View>
        <Text style={{ color: "white", fontSize: 17 }}>{note}</Text>
      </View>
    </View>
  );
};
const Account = () => {
  const { khata } = useKhata();
  const { activeCustomer } = useActiveCustomer();
  const totalAmount = khata[activeCustomer].reduce(
    (accumulator: number, current: any) => accumulator + current.amount,
    0
  );
  const isMore = totalAmount > 0;
  const headingMessage = "You " + (isMore ? "Collect" : "Pay");
  const color = isMore ? "green" : "red";

  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const result = await SMS.sendSMSAsync(["", ""], "hi there");
      console.log('SMS sending result:', result);
    } else {
      console.log('SMS sending is not available on this device.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex:0.3,
            // height: 200,
            backgroundColor: "blue",
            borderRadius: 20,
            // display: "flex",
            paddingHorizontal: 30,
            paddingTop: 50,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", paddingVertical: 8 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ display: 'flex', padding: 8, backgroundColor: "white", borderRadius: 18, alignItems: 'center', justifyContent: 'center', height: 36, width: 36, marginRight: 8 }} onPress={() => router.replace('/')} />
              <Text style={{ fontSize: 20, color: 'white', paddingVertical: 8 }}>Alpha</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="phone-call" size={24} color="white" onPress={() => { }} />
              <Feather name="message-square" size={24} color="white" style={{ marginHorizontal: 12 }} onPress={() => sendSMS()} />
              <Feather name="share" size={24} color="white" onPress={() => { }} />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: color }}>
              {headingMessage}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: "500", color: color }}>
              <FontAwesome name="rupee" size={20} color={color} />{" "}
              {Math.abs(totalAmount)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: "800", paddingVertical: 8 }}>Entries</Text> */}
          <ScrollView>
            {khata[activeCustomer].map((transaction: any, i: number) => (
              <Entry
                key={i}
                amount={transaction.amount}
                note={transaction.note}
                date={transaction.date}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <StylesButton
            onPress={() => {
              router.replace("/addAmount/0");
            }}
            text="You Got"
            icon={() => (
              <FontAwesome5 name="money-bill-wave" size={24} color="green" />
            )}
            color="green"
          />

          <StylesButton
            onPress={() => {
              router.replace("/addAmount/1");
            }}
            text="You Gave"
            icon={() => (
              <FontAwesome5 name="money-bill-wave" size={24} color="red" />
            )}
            color="red"
          />
        </View>
      </View>
    </>
  );
};

export default Account;
