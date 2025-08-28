import { useState } from "react";
import api from "./src/services/api.js";
import { Button, StyleSheet, View, Image, ScrollView } from "react-native";

export default function app(){

  const[cat, setCat] = useState([])

  async function buscar(){
    try {
      const result = await api.get('https://api.thecatapi.com/v1/images/search?limit=1')
      console.log(result.data)
      setCat(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const _render=()=> {
    const vet = [];
    cat.map((item, index) => {
      vet.push(
        <View style={styles.card} key={index}>
          <Image 
              source={{uri:item.url}}
              height={400}
              width={400}
          />
        </View>
      )
    })
    return vet
  }

  return(
      <View style={styles.container}>
        <Button title="Clique aqui!" onPress={() => buscar()} />
        <ScrollView>
          {_render()}
        </ScrollView>
      </View>

  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  card: {
    marginTop: 80,
  }
})
