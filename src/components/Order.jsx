import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'

// storage
import { saveObjectOrder, getAllOrder, decreaseOrder } from "../../asysn_storage/order_storage"

import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';


export default function Order({ navigation, route }) {
  const [arrOrder, setArrOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [priceOrder, setPriceOrder] = React.useState(0)

  React.useEffect(() => {
    renderOrder()
  }, [])

  React.useEffect(() => {
    if (route.params) {
      const value_order = route.params.data_order;
      saveObjectOrder({ ...value_order, total: 1 }).then((coure) => {
        setIsLoading(true)
        renderOrder()
      }
      )
    }
  }, [route.params]);

  const renderOrder = () => {
    getAllOrder(["Cappucino", "Espresso", "Frappe", "Mocha"]).then((list_order => {
      let new_listOrder = []
      let amount = 0
      list_order.forEach((list) => {
        list.forEach((item, index) => {
          if (index === 1 && item !== null) {
            new_listOrder.push(JSON.parse(item))
            amount = amount + priceOrder + JSON.parse(item).total * JSON.parse(item).price
          }
        })
      })
      setPriceOrder(amount)
      setArrOrder(new_listOrder)
      setIsLoading(false)
    }))
  }

  // !isLoading && console.log(arrOrder);

  const handelAgumentOrder = (index) => {
    arrOrder[index].total = arrOrder[index].total + 1
    setPriceOrder(priceOrder + arrOrder[index].price)
    setArrOrder([...arrOrder])
  }

  const handelDecreaseOrder = (index) => {
    arrOrder[index].total = arrOrder[index].total - 1
    setPriceOrder(priceOrder - arrOrder[index].price)
    setArrOrder([...arrOrder])
  }
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
          <Text style={{ textAlign: "center", width: "100%", fontSize: 20, fontWeight: "700" }}>Order</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", width: "100%", backgroundColor: "#F2F2F2", borderRadius: 10, overflow: "hidden" }}>
          <TouchableOpacity style={{ borderRadius: 10, width: "50%", height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "#C67C4E" }}>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>Deliver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "50%", height: 40, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#000", fontWeight: "600", fontSize: 15 }}>Pick Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 15, fontSize: 15, fontWeight: "600" }}>Delivery Address</Text>
        <Text style={{ marginTop: 10, fontSize: 14, fontWeight: "600", color: "#303336" }}>JI.Kpg Sutoyo</Text>
        <Text style={{ marginTop: 2, fontSize: 13, fontWeight: "600", color: "#878787" }}>Kpg.Sutoyo No.620, Bilzen, Tanjungbalai</Text>
        <View style={{ marginTop: 15, flexDirection: "row", paddingBottom: 20, borderBottomColor: "#EAEAEA", borderBottomWidth: 1 }}>
          <TouchableOpacity style={{ color: "#303336", flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: 20, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderColor: "#DEDEDE", borderWidth: 1 }}>
            <Feather style={{ color: "#303336", fontSize: 12, marginRight: 5 }} name="edit" size={24} color="black" /><Text>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ color: "#303336", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderColor: "#DEDEDE", borderWidth: 1 }}>
            <FontAwesome style={{ color: "#303336", fontSize: 12, marginRight: 5 }} name="list-alt" size={24} color="black" /><Text>Edit Address</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, paddingBottom: 15, borderBottomColor: "#F4F4F4", borderBottomWidth: 4, maxHeight: 165 }}>
          {<FlatList
            data={!isLoading && arrOrder}
            renderItem={({ item, index }) =>
            (item.total !== 0 && !isLoading &&
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Image style={{ width: 80, height: 80, borderRadius: 10 }} resizeMode="cover" source={{ uri: item.image }} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ marginBottom: 3, fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
                    <Text style={{ marginTop: 3, color: "#A8A8A8" }}>{item.description}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity
                    disabled={item.total === 0 ? true : false}
                    onPress={() => {
                      decreaseOrder(item)
                      handelDecreaseOrder(index)
                    }}
                    style={{ padding: 2, width: 30, justifyContent: "center", alignItems: "center", height: 30, borderRadius: "50%", borderWidth: 1, borderColor: "#EAEAEA" }}>
                    <Text style={{ fontSize: 20 }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{item.total}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      saveObjectOrder(item)
                      handelAgumentOrder(index)
                    }}
                    style={{ padding: 2, width: 30, justifyContent: "center", alignItems: "center", height: 30, borderRadius: "50%", borderWidth: 1, borderColor: "#EAEAEA" }}>
                    <Text style={{ fontSize: 18 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />}
        </View>
        <TouchableOpacity style={{ marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 2, borderColor: "#F1F1F1", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <AntDesign name="staro" size={24} color="#C67C4E" />
            <Text style={{ marginLeft: 15, fontWeight: "500" }}>1 Discount is applied</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}>Payment Summary</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
          <Text style={{ color: "#494746" }}>Price</Text>
          <Text>$ {!isLoading && priceOrder.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingBottom: 15, borderBottomColor: "#EAEAEA", borderBottomWidth: 1 }}>
          <Text style={{ color: "#494746" }}>Delivery Fee</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Text >$ 2.00</Text>
              <Text style={{ position: "absolute", height: 1, width: "100%", backgroundColor: "#979695", top: "50%" }}></Text>
            </View>
            <Text>$ 1.00</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, marginBottom: 15 }}>
          <Text style={{ color: "#494746" }}>Total Payment</Text>
          <Text>$ {!isLoading && (priceOrder + 1).toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="money" size={24} color="#C67C4E" />
            <Text style={{ marginHorizontal: 12, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#C67C4E", color: "#fff", borderRadius: 10, overflow: "hidden" }}>Cash</Text>
            <Text>$ {!isLoading && (priceOrder + 1).toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={{ padding: 2, borderRadius: "50%", backgroundColor: "#838383" }}>
            <Feather name="more-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ position: "absolute", bottom: 50, width: "100%", left: 30, padding: 20, backgroundColor: "#C67C4E", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})