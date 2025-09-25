import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function App() {

  const [users, setUsers] = useState([]); // Armazenara lista de usuarios 
  const [loading, setLoading] = useState(false); // Armazenara estado de carga de usuarios

  // Função para buscar a lista de usuarios (GET)
  const fetchUsers = async () => {
    try {
      setLoading(true); // Ativa o indicador de carregamento

      // Faz a requisição GET ao json-server      
      const response = await fetch("http://10.110.12.17:3000/users", { method: "GET" });

      // Converte a resposta em JSON
      const data = await response.json();

      // Atualiza a variavel de estado 'users' com a lista de usuarios
      setUsers(data);
    } catch (error) {
      console.error("Erro GET", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD com fetch</Text>
      <UserForm onUserAdded={fetchUsers} />
      <ScrollView>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <UserList users={users} onUserChanged={fetchUsers} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
});
