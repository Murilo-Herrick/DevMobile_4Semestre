import { View, TextInput, Button, StyleSheet, Text } from "react-native"

export default function UserList({ users, onUserChanged }) {

    // Função para atualização de usúario (PUT)
    const updateUser = async (id) => {
        try {
            // IP local
            const response = await fetch(`http://10.110.12.17:3000/users/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: "Nome atualizado",
                        email: "atualizado@email.com"
                    })
                }
            )
            await response.json(); // Converte a resposta em foramto json
            onUserChanged(); // Atualiza a lista de usuarios
        } catch (error) {
            console.error("Erro PUT: ", error.message);
        }
    };

    // Função para remover usuario (DELETE)
    const deleteUser = async (id) => {
        try {
            // IP local
            const response = await fetch(`http://10.110.12.17:3000/users/${id}`, { method: 'DELETE' });
            onUserChanged(); // Atualiza a lista de usuarios
        } catch (error) {
            console.error("Erro DELETE: ", error.message);
        }
    };

    return (
        <View>
            {
                users.map((u) => (
                    <View key={u.id} style={styles.card}>
                        <Text style={styles.text}>{u.name} - {u.email}</Text>
                        <View style={styles.buttons}>
                            <Button title="Editar" onPress={() => updateUser(u.id)}></Button>
                            <Button title="Deletar" onPress={() => deleteUser(u.id)}></Button>
                        </View>
                    </View>
                ))
            }
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})