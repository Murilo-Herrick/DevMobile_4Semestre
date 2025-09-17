import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

// Declaração do componente principal da aplicação
export default function App() {
  // usuarios como array de estado
  const [users, setUsers] = useState([]);
  // Definir a URL da API que será consumida
  const API = "http://10.110.12.15:3000/users"

  // Função assincrona para buscar a lista de usuario da API
  const fetchUsers = async () => {
    try {
      // Faz requisição GET paraa a URL API
      const response = await axios.get(API);
      // Atualização da variavel de estado users
      setUsers(response.data)
    } catch (error) {
      console.error("Error GET: ", error.message)
    }
  };

  const deleteUser = async (id) => {
    try {
      // Faz uma requisição de DELETE para a URL da PAI, incluindo o ID do usuario
      await axios.delete(`${API}/${id}`);
      // Filtra a lista de usuarios removendo o usuario do respectivo ID informado
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error DELETE: ", error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE - Remover Usúario</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id} - Nome: {item.name} - Email: {item.email}</Text>
            <Button title={"Excluir Usúario"} onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
