import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera"

export default function App() {
  // Define se a camera usada será a frontal "front" ou a traseira "back"
  const [facing, setFacing] = useState('back');
  // Hook do Expo para lidar com premissões da camera
  // permission = estado da permissão
  // requestPermission = Função para pedir permissão ao usuario
  const [permission, requestPermission] = useCameraPermissions();
  // Estado para guardar a foto capturada
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  // Referencia para acessar os metodos da camera
  const cameraRef = useRef(null);

  // useEffect para solicitar permissão de acesso á camera no momento que o App iniciar
  useEffect(() => {
    requestPermission();
  });

  // Caso o hook de permissão ainda não tenha dado retorno 
  if (!permission) {
    return <View />
  }

  // Caso o hook não tenha obitido permissão
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisso da sua permissão para acesso a camera</Text>
        <Button title='Conceder Permissão' onPress={requestPermission} />
      </View>
    )
  }

  // Função para alterar entre camera frontal e traseira
  function toggleCameraFacing() {
    setFacing(current => (current === "back" ? "front" : "back"))
  }

  async function takePicture() {
    if (cameraRef.current) {
      // usa a referencia da camera para capturar a foto
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
      console.log(photo.uri);
    };
  }

  if (capturedPhoto) {
    return (
      <View>
        <View>
          <Button title='Tirar outra foto' onPress={() => setCapturedPhoto(null)} />
        </View>
        <Image source={{ uri = capturedPhoto.uri }} style={styles.preview} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
