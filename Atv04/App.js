import { useState, useEffect } from "react";
import { View, Button, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import api from "./src/services/api.js";

export default function App() {
  const [dogs, setDogs] = useState([]); 
  const [quantidade, setQuantidade] = useState("1");

  useEffect(()=>{
    buscar()
  }, [])

  async function buscar() {
    try {
      const result = await api.get(`https://dog.ceo/api/breeds/image/random/${quantidade}`);
      console.log("Resposta da API: ", result.data);

      if (Array.isArray(result.data.message)) {
        setDogs(result.data.message);
      } else {
        // @ts-ignore
        setDogs([result.data.message]);
      }
    } catch (error) {
      console.log("Erro ao buscar imagem:", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
      />
      <Button title="Buscar cachorros" onPress={buscar}/>

      <ScrollView contentContainerStyle={styles.scroll}>
        {dogs.map((url, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: url }}
              style={{ width: 280, height: 280, borderRadius: 2 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#fff",
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: 130,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 30,
    width: "50%",
    textAlign: "center",
  },
  scroll: {
    alignItems: "center",
    paddingBottom: 20,
  },
  card: {
    marginTop: 75,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
});