import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const StylesButton = ({
  text,
  icon,
  color,
  onPress,
}: {
  text: string;
  icon: any;
  color: string;
  onPress: any;
}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={{
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: color,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        paddingVertical: 4,
        padding: 12,
      }}
    >
      {icon()}
      <Text
        style={{
          padding: 12,
          color: color,
          fontWeight: "500",
          fontSize: 20,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default StylesButton;
