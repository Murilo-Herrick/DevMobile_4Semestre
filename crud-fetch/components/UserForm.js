import { use, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native"

export default function UserForm({ onUserAdded }) {

    const [name, setName] = useState("") // var estado nome
    const [email, setEmail] = useState(""); // var estado email

    const addUser = async () => {
        // garantir em NÃO fazer post com as variaves de estado em branco
        if (!name || !email) return;

        // Inicio do POST
        try {
            // IP local
            const response = await fetch("http://10.110.12.17:3000/users",
                {
                    method: "POST", // inserir registro novo
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email })
                })
            setName(""); // Limpa o campo nome
            setEmail(""); // Limpa o campo email
            onUserAdded(); // Recarrega a lista de usuarios
        } catch (error) {
            console.error("Erro ao adicionar usúario!", error.message);
        }
    }

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder={"Nome"}
                value={name}
                onChangeText={setName} // Atualiza a var 'nome' com o conteudo digitado
            />

            <TextInput
                style={styles.input}
                placeholder={"Email"}
                value={email}
                onChangeText={setEmail} // Atualiza a var 'email' com o conteudo digitado
            />

            <Button title="Adicionar Usúario" onPress={addUser} />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 10,
        borderRadius: 5
    },
});