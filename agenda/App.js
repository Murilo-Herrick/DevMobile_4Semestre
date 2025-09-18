import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function Home() {
  const [compromissos, setCompromissos] = useState([
    {
      id: "1",
      title: "Reunião",
      anotations: "Discutir projeto",
      day: "18/09/2025",
      time: "14:00",
      status: "Pendente",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newAnotation, setNewAnotation] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [editId, setEditId] = useState(null);

  // Adicionar compromisso
  const addCompromisso = () => {
    if (!newTitle.trim()) return;

    const newItem = {
      id: String(Date.now()),
      title: newTitle,
      anotations: newAnotation,
      day: newDay,
      time: newTime,
      status: newStatus,
    };

    setCompromissos([...compromissos, newItem]);
    limparCampos();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setNewTitle(item.title);
    setNewAnotation(item.anotations);
    setNewDay(item.day);
    setNewTime(item.time);
    setNewStatus(item.status);
  };

  const updateCompromisso = () => {
    setCompromissos((prev) =>
      prev.map((item) =>
        item.id === editId
          ? {
            ...item,
            title: newTitle,
            anotations: newAnotation,
            day: newDay,
            time: newTime,
            status: newStatus,
          }
          : item
      )
    );
    setEditId(null);
    limparCampos();
  };

  const deleteCompromisso = (id) => {
    setCompromissos(compromissos.filter((item) => item.id !== id));
    if (id === editId) {
      setEditId(null);
      limparCampos();
    }
  };

  const limparCampos = () => {
    setNewTitle("");
    setNewAnotation("");
    setNewDay("");
    setNewTime("");
    setNewStatus("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    limparCampos();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Compromissos</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Anotações"
        value={newAnotation}
        onChangeText={setNewAnotation}
      />
      <TextInput
        style={styles.input}
        placeholder="Dia"
        value={newDay}
        onChangeText={setNewDay}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        value={newTime}
        onChangeText={setNewTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={newStatus}
        onChangeText={setNewStatus}
      />

      {editId ? (
        <Button title="Atualizar Compromisso" onPress={updateCompromisso} />
      ) : (
        <Button title="Adicionar Compromisso" onPress={addCompromisso} />
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={compromissos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>📌 {item.title}</Text>
            <Text style={styles.itemText}>📝 {item.anotations}</Text>
            <Text style={styles.itemText}>📅 {item.day}</Text>
            <Text style={styles.itemText}>⏰ {item.time}</Text>
            <Text style={styles.itemText}>📍 {item.status}</Text>

            <View style={styles.buttonsRow}>
              {editId ? (
                <Button title="Cancelar" onPress={() => cancelarEdicao()} />
              ) : (
                <Button title="Editar" onPress={() => startEdit(item)} />
              )}

              <Button
                title="Excluir"
                color="red"
                onPress={() => deleteCompromisso(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    backgroundColor: "#e6f0ff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 2,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
