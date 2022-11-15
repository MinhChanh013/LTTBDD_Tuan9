import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'

import avatar from "../../assets/avatar.jpg"
import search from "../../assets/search.png"
import HomePromo from "../../assets/HomePromo.jpg"
import star from "../../assets/star.png"

// icon menu
import { Entypo, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { saveObjectOrder } from "../../asysn_storage/order_storage"
import { requestAllProduct } from "../../api/product.api"
const type_coffee = [
  { name: "Cappoccino" },
  { name: "Machiato" },
  { name: "Latte" },
  { name: "Americano" },
  { name: "Affogato" }
]

export default function Home({ navigation }) {
  const [activeMenu, setActiveMenu] = useState(0)
  const [activeMenuMain, setActiveMenuMain] = useState("home")
  const [dataProduct, setDataProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    requestAllProduct().then((product) => {
      setDataProduct(product.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <View style={{ backgroundColor: "#2D2D2D", flex: 0.4, width: "100%", paddingHorizontal: 30 }}>
          <View style={{ marginTop: 70, flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: "#939393" }}>Location</Text>
              <Text style={{ color: "#fff" }}>Blizen, Tanjungbalai</Text>
            </View>
            <View>
              <Image style={{ width: 50, height: 50, borderRadius: 15 }} source={avatar} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput placeholder='Search coffee' placeholderTextColor="#919191" style={{ width: "100%", height: 50, color: "#fff", borderRadius: 10, paddingHorizontal: 50, backgroundColor: "#313131" }} />
            <Image style={{ width: 30, height: 40, position: "absolute", left: 5, top: 3 }} resizeMode="contain" source={search} />
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, position: "absolute", right: 5, top: 5, borderRadius: 10, backgroundColor: "#C67C4E" }}>
              <Text style={{ color: "#fff", fontSize: 14 }}>--o-</Text>
              <Text style={{ color: "#fff", fontSize: 14 }}>-o--</Text>
            </TouchableOpacity>
          </View>
          <ImageBackground source={HomePromo} style={{ marginTop: 20, height: 140, borderRadius: 10, overflow: "hidden", padding: 15 }}>
            <Text style={{ padding: 10, backgroundColor: "#ED5151", color: "#fff", borderRadius: 10, overflow: "hidden", width: 65, fontWeight: "600" }}>Promo</Text>
            <Text style={{ marginTop: 5, color: "#fff", fontSize: 30, maxWidth: 200, fontWeight: "700" }}>Buy one get one FREE</Text>
          </ImageBackground>
        </View>
        <View style={{ flex: 0.65 }}>
          <View style={{ paddingTop: 80, height: "100%", paddingBottom: 30 }}>
            <View>
              <FlatList
                style={{ marginLeft: 30 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={type_coffee}
                renderItem={({ item, index }) =>
                (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveMenu(index)
                    }}
                    style={activeMenu === index ? styles.menu_active : styles.menu}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )
                } />
            </View>
            <View style={{ marginTop: 30 }}>
              {!isLoading && <FlatList
                style={{ paddingHorizontal: 30 }}
                numColumns={2}
                data={dataProduct}
                renderItem={({ item, index }) =>
                (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", { data_coffee: item })
                    }}
                    style={{ width: "47%", marginRight: "5%", marginBottom: 15 }}>
                    <View>
                      <Image style={{ width: "100%", height: 130, borderRadius: 10 }} source={{ uri: item.image }} />
                      <Text style={{ height: 20, width: 50, position: "absolute", top: 5, left: 5, color: "#fff", fontWeight: "600", fontSize: 13, justifyContent: "center", alignContent: "center" }}>
                        <Image style={{ width: 15, height: 15 }} resizeMode="contain" source={star} />{item.rate}</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
                    <Text style={{ marginTop: 2, fontSize: 13, color: "#A1A1A1" }}>{item.description}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 8, alignItems: "center" }}>
                      <Text style={{ fontSize: 17, fontWeight: "700" }}>$ {item.price}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          saveObjectOrder({ ...item, total: 1 })
                        }}
                        style={{ width: 23, height: 23, backgroundColor: "#C67C4E", justifyContent: "center", alignItems: "center", borderRadius: 4 }}>
                        <Text style={{ color: "#fff", fontWeight: "700" }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
                } />}
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setActiveMenuMain("home")
          }}
          style={{ marginBottom: 20, padding: 5 }}>
          <Entypo style={activeMenuMain === "home" ? styles.active_icon__menu : styles.default_icon__menu} name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveMenuMain("heart")
          }}
          style={{ marginBottom: 20, padding: 5 }}>
          <AntDesign style={activeMenuMain === "heart" ? styles.active_icon__menu : styles.default_icon__menu} name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveMenuMain("order")
            navigation.navigate("Order")
          }}
          style={{ marginBottom: 20, padding: 5 }}>
          <FontAwesome5 style={activeMenuMain === "order" ? styles.active_icon__menu : styles.default_icon__menu} name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveMenuMain("bell")
          }}
          style={{ marginBottom: 20, padding: 5 }}>
          <FontAwesome style={activeMenuMain === "bell" ? styles.active_icon__menu : styles.default_icon__menu} name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    padding: 7,
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 10
  },
  menu_active: {
    padding: 7,
    backgroundColor: "#C67C4E",
    marginRight: 15,
    borderRadius: 10
  },
  default_icon__menu: {
    color: "#8D8D8D"
  },
  active_icon__menu: {
    color: "#C2794C"
  }
})