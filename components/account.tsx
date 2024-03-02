import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { amount } from "@/constants/data";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import StylesButton from "./button";
import { useKhata } from "@/contexts/data";
import { useActiveCustomer } from "@/contexts/active";
const OptionButton = ({ icon, text }: { icon: any; text: string }) => (
  <View
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    }}
  >
    <View
      style={{
        borderRadius: 99,
        padding: 12,
        borderWidth: 1,
        borderColor: "blue",
        marginBottom: 4,
      }}
    >
      {icon()}
    </View>
    <Text style={{ fontWeight: "500" }}>{text}</Text>
  </View>
);
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
        <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
          {Math.abs(amount)}
        </Text>
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
  const isMore = totalAmount >= 0;
  const headingMessage = "You have to " + (isMore ? "Collect" : "Pay");
  const color = isMore ? "green" : "red";
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <View
          style={{
            height: 220,
            backgroundColor: "blue",
            borderRadius: 20,
            display: "flex",
            paddingHorizontal: 30,
            paddingTop: 90,
          }}
        >
          <View
            style={{
              display: "flex",
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
              <FontAwesome name="rupee" size={16} color={color} />{" "}
              {Math.abs(totalAmount)}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <OptionButton
            text="PDF"
            icon={() => <AntDesign name="pdffile1" size={24} color="black" />}
          />

          <OptionButton
            text="Call"
            icon={() => <Feather name="phone-call" size={24} color="black" />}
          />
          <OptionButton
            text="SMS"
            icon={() => <AntDesign name="message1" size={24} color="black" />}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Entries</Text>
          <ScrollView>
            {khata[activeCustomer].map((transaction: any) => (
              <Entry
                amount={transaction.amount}
                note={transaction.note}
                date={transaction.date}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            display: "flex",
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
