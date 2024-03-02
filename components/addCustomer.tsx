import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useCustomer } from "@/contexts/customers";
const LabeledInput = ({
  label,
  isNumberOnly,
  value,
  setVal,
}: {
  label: string;
  isNumberOnly?: boolean;
  value: any;
  setVal: any;
}) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "500" }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => setVal(text)}
        keyboardType={isNumberOnly ? "numeric" : "default"}
        placeholder={label}
        style={{
          borderWidth: 1,
          padding: 14,
          marginVertical: 10,
          borderRadius: 12,
          fontSize: 16,
        }}
      />
    </View>
  );
};
const AddCustomerComp = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const { addCustomer } = useCustomer();
  const handleClick = () => {
    addCustomer(name, mobile);
    router.push("/");
  };
  return (
    <>
      <Stack.Screen options={{ title: "Add New Customer" }} />
      <View
        style={{
          padding: 24,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <LabeledInput label="Customer Name" value={name} setVal={setName} />
          <LabeledInput
            label="Customer Mobile No."
            isNumberOnly
            value={mobile}
            setVal={setMobile}
          />
        </View>
        <Pressable
          onPress={() => handleClick()}
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
          <AntDesign name="adduser" size={24} color="white" />
          <Text
            style={{
              padding: 12,
              color: "white",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Add Customer
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddCustomerComp;
