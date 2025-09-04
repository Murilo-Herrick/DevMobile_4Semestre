import React, {useEffect, useState} from "react";
import {  View, Text, ScrollView, StyleSheet, Button} from "react-native";
import api from "./src/devices/api.js";
import axios from "axios";

// npx json-server db.json --port 3000

export default function App(){
  // 'Users' e 'setUsers' são a variavel e a função de atualização respectivamente
  const[users, setUsers] = useState([]);

  // ip da maquina que roda a API
  const API = "http://10.110.12.15:3000/users";

  // Função assincrona para buscar os usuarios da API
  // 'async/await' - simplifica o acesso ao serviço de API 
  async function fetchUsers() {
    try{
      // Faz uma requisição GET para a URL da API
      const response = await api.get(API);

      // Se bem sucedida a requisição da API, carrega a lista dos dados
      setUsers(response.data);
    } catch(error){
      // Se ocorrer erro (ex: falha de conexão), exibe no console
      console.log("error GET:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const _render = () => {
    const vet = [];

    users.map((item, index) => {
      vet.push(
        <View key={index}>
          <Text style={styles.item}>ID: {item.id} Nome: {item.name} email: {item.email}</Text>
        </View>
      )
    })
    return vet;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GET - Listar usuarios</Text>
      <Button title="Recarregar Lista" onPress={fetchUsers } />
      <ScrollView>
        {_render()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    fontSize: 12, 
    marginTop: 10, 
  }
});