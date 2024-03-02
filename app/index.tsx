import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import CustomerList from "@/components/customerList";
import { useKhata } from "@/contexts/data";

const Index = () => {
  const [total, setTotal] = useState(0);
  const [ntotal, setnTotal] = useState(0);
  const [ptotal, setpTotal] = useState(0);
  const { khata } = useKhata();
  const calulate = (khata: any) => {
    let totalNegative = 0;
    let totalPositive = 0;
    let totalAll = 0;

    // Loop through the nested array and objects
    for (const key in khata) {
      // Check if the key is an array of objects
      if (Array.isArray(khata[key])) {
        for (const item of khata[key]) {
          // Check if the item has an "amount" property
          if (item.hasOwnProperty("amount")) {
            totalAll += item.amount;
            if (item.amount < 0) {
              totalNegative += item.amount;
            } else {
              totalPositive += item.amount;
            }
          }
        }
      }
    }
    setTotal(Math.abs(totalAll));
    setnTotal(Math.abs(totalNegative));
    setpTotal(totalPositive);
  };

  useEffect(() => {
    calulate(khata);
  }, [khata]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{}}>
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
              padding: 20,
              borderRadius: 20,
              height: 220,
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              Full Stop
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                width: "100%",
                borderTopWidth: 1,
                marginTop: 8,
              }}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Total You Gave</Text>
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  {ntotal}
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: 1,
                  maxWidth: 1,
                  borderRightWidth: 1,
                }}
              ></View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Total You Got</Text>
                <Text
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  {ptotal}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>
                Total you will get{"      "}
                <Text
                  style={{
                    marginHorizontal: 30,
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  {total}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <CustomerList />
      </View>
    </>
  );
};

export default Index;
