import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import coffeeBg from "../../assets/coffeeBg.png"
export default function Onboarding({ navigation }) {
  return (
    <View style={{ backgroundColor: "#000", flex: 1, width: "100%", height: "100%" }}>
      <View style={{ flex: 0.65, justifyContent: "center", alignItems: "center" }}>
        <Image style={{ width: "80%", height: "100%", marginRight: 30 }} resizeMode="contain" source={coffeeBg} />
      </View>
      <View style={{ flex: 0.35, alignItems: "center", marginBottom: 30 }}>
        <Text style={{ color: "#fff", fontSize: 35, maxWidth: 280, textAlign: "center", fontWeight: "700" }}>Coffee so good, your staste buds will love it.</Text>
        <Text style={{ color: "#fff", marginTop: 20, color: "#A7A7A7", fontSize: 16, maxWidth: 300, textAlign: "center" }}>The best grain, the finest roast, the powerful flavor.</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home")
          }}
          style={{ marginTop: 30, padding: 23, backgroundColor: "#C67C4E", width: 300, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>



  )
}

const styles = StyleSheet.create({})