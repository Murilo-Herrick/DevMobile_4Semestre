import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen({ onPhotoTaken }) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => { requestPermission(); }, []);

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Preciso da sua permissão para câmera</Text>
                <Button title='Conceder Permissão' onPress={requestPermission} />
            </View>
        );
    }

    const toggleCameraFacing = () => setFacing(facing === 'back' ? 'front' : 'back');

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedPhoto(photo);
            onPhotoTaken(photo.uri);
        }
    };

    if (capturedPhoto) {
        return (
            <View style={styles.container}>
                <Button title='Tirar outra foto' onPress={() => setCapturedPhoto(null)} />
                <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Virar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>📸</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 50,
        marginBottom: 80
    },
    button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
    text: { fontSize: 25, color: 'white', fontWeight: 'bold' },
    preview: { flex: 1, width: '100%', marginTop: 10 }
});
