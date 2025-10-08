import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CameraScreen from './components/CameraScreen';
import PhotoForm from './components/PhotoForm';
import PhotoList from './components/PhotoList';
import { salvarFotos, carregarFotos } from './services/storage';

export default function App() {
  const [fotos, setFotos] = useState([]);
  const [addingPhoto, setAddingPhoto] = useState(false);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);

  const loadFotos = async () => {
    const fotosCarregadas = await carregarFotos();
    setFotos(fotosCarregadas);
  };

  useEffect(() => { loadFotos(); }, []);

  const handleAdd = async (foto) => {
    const novaLista = [...fotos, foto];
    setFotos(novaLista);
    await salvarFotos(novaLista);
    setSelectedPhotoUri(null);
    setAddingPhoto(false);
  };

  const handleEdit = async (fotoAtualizada) => {
    const novaLista = fotos.map(f => f.uri === fotoAtualizada.uri ? fotoAtualizada : f);
    setFotos(novaLista);
    await salvarFotos(novaLista);
    setEditingPhoto(null);
  };

  const handleDelete = async (uri) => {
    const novaLista = fotos.filter(f => f.uri !== uri);
    setFotos(novaLista);
    await salvarFotos(novaLista);
  };

  if (addingPhoto) {
    if (!selectedPhotoUri) return <CameraScreen onPhotoTaken={setSelectedPhotoUri} />;
    return <PhotoForm onSubmit={handleAdd} initialData={{ uri: selectedPhotoUri }} />;
  }

  if (editingPhoto) return <PhotoForm onSubmit={handleEdit} initialData={editingPhoto} />;

  return (
    <View style={styles.container}>
      <Button title="Tirar Nova Foto" onPress={() => setAddingPhoto(true)} />
      {fotos.length > 0 && (
        <PhotoList fotos={fotos} onDelete={handleDelete} onEdit={setEditingPhoto} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 10, marginTop: 50 } });
