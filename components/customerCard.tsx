import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useActiveCustomer } from "@/contexts/active";

const CustomerCard = ({
  name,
  id,
  mobile,
}: {
  name: string;
  id: string;
  mobile: string;
}) => {
  const { setActiveCustomer } = useActiveCustomer();
  return (
    <Pressable
      onPress={() => {
        setActiveCustomer(id);
        router.push("/customerDetails");
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: "white",
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
        <View
          style={{
            padding: 8,
            borderRadius: 99,
            marginRight: 28,
            backgroundColor: "blue",
          }}
        >
          <Text style={{ fontWeight: "500", color: "white", fontSize: 18 }}>
            {name.slice(0, 2).toLocaleUpperCase()}
          </Text>
          {/* <Ionicons name="person" size={24} color="black" /> */}
        </View>
        <View>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>{name}</Text>
          <Text>{mobile}</Text>
        </View>
      </View>
      <AntDesign name="right" size={24} color="black" />
    </Pressable>
  );
};

export default CustomerCard;
