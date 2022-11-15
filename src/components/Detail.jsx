import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';

export default function Detail({ navigation, route }) {
  const [value, setValue] = React.useState({})

  React.useEffect(() => {
    if (route.params) {
      const value = route.params.data_coffee;
      setValue(value);
    }
  }, [route.params]);
  return (
    <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <View style={{ marginTop: 50, flexDirection: "row", width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home")
            }}
            style={{ position: "absolute", top: 0, zIndex: "9" }}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center", width: "100%", fontSize: 20, fontWeight: "700" }}>Detail</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 0, zIndex: "9" }}>
            <AntDesign name="hearto" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image style={{ marginTop: 25, width: "100%", height: 230, borderRadius: 15, overflow: 'hidden' }} source={{ uri: value.image }} />
        <Text style={{ marginTop: 20, fontSize: 22, fontWeight: "700" }}>{value.name}</Text>
        <View style={{ marginTop: 10, justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingBottom: 15, borderBottomColor: "#EAEAEA", borderBottomWidth: 1 }}>
          <View >
            <Text style={{ fontSize: 13, color: "#AEAEAE" }}>{value.description}</Text>
            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="staro" size={24} color="#FBBE21" />
              <Text style={{ fontSize: 16, fontWeight: "700" }}>{value.rate}</Text>
              <Text style={{ color: "#7F7F7F" }}>(230)</Text>
            </View>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
            <View style={{ padding: 8, borderRadius: 10, backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
              <Feather name="coffee" size={24} color="#C67C4E" /></View>
            <View style={{ padding: 8, borderRadius: 10, backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center" }}>
              <FontAwesome5 name="cloudsmith" size={24} color="#C67C4E" /></View>
          </View>
        </View>
        <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "700" }}>Description</Text>
        <Text style={{ marginTop: 15, color: "#9B9B9B" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi praesentium
          numquam dolorum omnis dicta, ducimus perferendis sequi erro.. <Text style={{ fontWeight: "600", color: "#C67C4E" }}>Read More</Text>
        </Text>
        <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "700" }}>Size</Text>
        <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={{ borderRadius: 10, paddingHorizontal: 40, paddingVertical: 15, borderWidth: 1, borderColor: "#DADADA" }}>
            <Text>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 10, paddingHorizontal: 40, paddingVertical: 15, borderWidth: 1, borderColor: "#C67C4E" }}>
            <Text style={{ color: "#C67C4E" }}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 10, paddingHorizontal: 40, paddingVertical: 15, borderWidth: 1, borderColor: "#DADADA" }}>
            <Text>L</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 50, justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 15, color: "#A8A8A8", marginBottom: 10 }}>Price</Text>
            <Text style={{ fontSize: 17, color: "#C67C4E" }}>$ {value.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order", { data_order: value })
            }}
            style={{ width: 220, height: 60, backgroundColor: "#C67C4E", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
            <Text style={{ fontSize: 17, color: "#fff", fontWeight: "600" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})