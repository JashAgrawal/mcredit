import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import CustomerCard from "./customerCard";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCustomer } from "@/contexts/customers";

const CustomerList = () => {
  const { customer } = useCustomer();
  return (
    <View
      style={{
        display: "flex",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 6 }}>
          Your Customers
        </Text>
        <Pressable onPress={() => router.push("/addCustomer")}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              backgroundColor: "blue",
              borderRadius: 16,
              paddingHorizontal: 16,
            }}
          >
            <AntDesign name="adduser" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 8 }}>Add Customer</Text>
          </View>
        </Pressable>
      </View>
        <ScrollView style={{ display: "flex",height: 500, marginVertical: 4 }}>
          {customer.map((customer: any, i: number) => (
            <CustomerCard
              key={i}
              name={customer.name}
              id={customer.id}
              mobile={customer.number}
              amount={10}
            />
          ))}
        </ScrollView>
    </View>
  );
};

export default CustomerList;
