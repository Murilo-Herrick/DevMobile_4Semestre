import axios from "axios";
import React, {use, useState, useEffect} from "react";
import {View, Text, Button, FlatList, StyleSheet, TextInput} from "react-native";
import api from "./src/devices/api.js";

// Definir o componente principal 'App'
export default function App(){

  // Define lista de usuarios users
  const [users, setUsers] = useState([])

  // Declarar a URL da API = 'http://localhost:3000/users'
  const API = "http://10.110.12.26:3000/users"

  const fetchUsers = async () => {
    const response = await api.get(API)
    // Atualizar a lista de users com os dados recebidos do response
    setUsers(response.data)
  }

  const updateUser = async (id) => {
    try {
      // Usaremos axios.put e a URL sera criada dinamicamente com o id do usuario
      const response = axios.put('${API/${id}}',{name : "Nome atualizado", email : "Email atualizado"})
      
      // Após a atualização do usuario os dados do usuario antigo é substituido pelo novo
      setUsers(users.map((u) => (u.id === id ? response.data : u)));
    } catch (error) {
      console.error("Erro PUT", error.message)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>PUT - Atualiza Usúario</Text>
      <FlatList 
        // 'data' recebe o array de usuarios que sera exibido
        data={users}
        // 'KeyExtractor' extrai chave unica para cada componete
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text style={styles.usersItem}>{item.name} - {item.email}</Text>
            <Button title="Atualizar" onPress={() => updateUser(item.id)}/>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, marginTop: 50, marginBottom: 50},
  title: {fontSize: 22, fontWeight: "bold", marginBottom: 50},
  input: {borderWidth: 1, borderColor: "#ccc", padding: 15, marginTop: 10 ,marginBottom: 18},
  usersItem: {marginTop: 20, fontSize: 16}
});
