import axios from "axios";
import React, {use, useState, useEffect} from "react";
import {View, Text, Button, FlatList, StyleSheet, TextInput} from "react-native";
import api from "./src/devices/api.js";

// Declarar a função do componente principal 'App'
export default function App(){
  // Declarar a varaivel de estado users
  const [users, setUsers] = useState([]);
  // Declarar 'newName' e a 'newEmail' como vars de estado
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Declarar const 'API' = 'http://localhost:3000/users'
  const API = "http://10.110.12.26:3000/users"

  /// Declarar função assincrona para fazer chamada do POST
  const addUser = async () => {
    try {
      // Faça uma requisição do tipo POST para a url API
      // Com o objetivo de enviar os dados do novo usuario
      const response = await api.post(API,
        {name : newName, email : newEmail}
      );
      // Se não houver erro então o comando abaixo sera executado
      setUsers([...users, response.data]);
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error("Erro POST" , error.message)
    }
  };

    useEffect(() => {
        fetchUsers();
      },[]);

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

  // Define o return do 'App'
  return (
    <View style={styles.container}>
      {/* Exibir texto */}
      <Text style={styles.title}>POST - Adicionar Usúario</Text>
      
      {/* Inserir campo para inserção do nome de usúario */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
      />

      {/* Campo para inserção do email do usúario */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
      />

      {/* Criação do Button para adição de novo usúario */}
      <Button 
        title="Adicionar usúario"
        onPress={addUser}
      />

      <FlatList 
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Text style={styles.users}>{item.name} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, marginTop: 230},
  title: {fontSize: 22, fontWeight: "bold", marginBottom: 10},
  input: {borderWidth: 1, borderColor: "#ccc", padding: 15, marginTop: 10 ,marginBottom: 18},
  users: {marginBottom: 15}
});