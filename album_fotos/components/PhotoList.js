import React from 'react';
import { View, FlatList, Text, Image, Button, StyleSheet } from 'react-native';

export default function PhotoList({ fotos, onDelete, onEdit }) {
    return (
        <FlatList
            data={fotos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image source={{ uri: item.uri }} style={styles.image} />
                    <Text style={styles.title}>{item.titulo_foto}</Text>
                    <Text>{item.descricao_foto}</Text>
                    <View style={styles.buttons}>
                        <Button title="Editar" onPress={() => onEdit(item)} />
                        <Button title="Deletar" onPress={() => onDelete(item.uri)} />
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    item: { margin: 10, borderWidth: 1, borderRadius: 5, padding: 10 },
    image: { width: '100%', height: 200 },
    title: { fontWeight: 'bold', fontSize: 16 },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});
