import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useActiveCustomer } from "@/contexts/active";
import { genAvatar } from "@/constants/hooks";
import SvgComponent from "./svg";

const CustomerCard = ({
  name,
  id,
  mobile,
  amount,
}: {
  name: string;
  id: string;
  mobile: string;
  amount: number;
}) => {
  const { setActiveCustomer } = useActiveCustomer();

  return (
    <Pressable
      onPress={() => {
        setActiveCustomer(id);
        router.replace("/customerDetails");
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
        elevation: 2
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
        <View style={{ width: 48, height: 48, marginRight: 10, padding: 2 }}>
          <SvgComponent svgString={genAvatar()} />
        </View>
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>{name}</Text>
          <Text style={{ color: amount < 0 ? 'red' : 'green' }}>You {amount < 0 ? 'get' : 'pay'} : {Math.abs(amount)}</Text>
        </View>
      </View>
      <AntDesign name="right" size={18} color="white" style={{ backgroundColor: "blue", borderRadius: 99, padding: 5 }} />
    </Pressable>
  );
};

export default CustomerCard;
