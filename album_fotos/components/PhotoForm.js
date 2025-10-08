import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text } from 'react-native';

export default function PhotoForm({ onSubmit, initialData = {} }) {
    const [titulo, setTitulo] = useState(initialData.titulo_foto || '');
    const [descricao, setDescricao] = useState(initialData.descricao_foto || '');

    const handleSubmit = () => {
        if (!titulo.trim() || !descricao.trim()) {
            alert("Preencha título e descrição!");
            return;
        }

        onSubmit({
            ...initialData,
            titulo_foto: titulo,
            descricao_foto: descricao,
            data_foto: new Date().toISOString(),
            uri: initialData.uri
        });
    };

    return (
        <View style={styles.container}>
            {initialData.uri && (
                <>
                    <Text style={styles.previewLabel}>Pré-visualização da Foto:</Text>
                    <Image source={{ uri: initialData.uri }} style={styles.preview} />
                </>
            )}
            <TextInput
                placeholder="Título da Foto"
                value={titulo}
                onChangeText={setTitulo}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <Button title="Salvar" onPress={handleSubmit} color="#1e90ff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    previewLabel: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
    preview: { width: '100%', height: 250, marginBottom: 20, borderRadius: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 }
});
