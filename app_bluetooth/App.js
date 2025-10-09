import React, { useState, useEffect, use } from 'react';
import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function App() {

  // Armazenar os dispositivos bluetooth que conseguir indentificar
  const [devices, setDevices] = useState([]);

  //Monitora o status do radio do Bluetooth (Ligado/Desligado)
  const [radioPowerOn, setRadioPowerOn] = useState(false);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        setRadioPowerOn(true);
        subscription.remove();
      }
    }, true);

    return () => {
      subscription.remove();
      manager.destroy(); // Limpa os recursos do BleManager ao desmontar o componente
    };
  }, []);

  const requestBlueToothPermission = async () => {
    if (Platform.OS === 'android') {
      // Para android < 12, a permissão de localização é suficiente
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Permissão de localização',
          message: 'O app precisa de acesso a sua localização para o bluetooth',
          buttonPositive: 'Ok',
        }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } else {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]);
        return (
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
          result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    return true;
  };

  const scanForDevices = async () => {
    const hasPermission = await requestBlueToothPermission();
    if (!hasPermission) {
      alert('Por favor, ligue o Bluetooth para iniciar o Scanner');
      return;
    }
  }

  // Limpar a lista de dispositivos já varridos
  setDevices([]);
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log('SCAN ERROR: ', error);
      if (error.errorCode == 601) {
        alert('ERRO DE PERMISSÃO');
        manager.stopDeviceScan();
        return;
      }
    }

    if (device && device.name) {
      setDevices(preDevices => {
        if (!preDevices.some(d => d.id == device.id)) {
          return [...preDevices, device];
        }
        return preDevices;
      });
    }
  });

  setTimeout(() => {
    manager.stopDeviceScan();
  }, 5000); // Para de escanerar apos 5 segundos

  return (
    <View style={styles.container}>
      <Text>Dispositivos bluetooth econtrados</Text>
      <Button
        title='Iniciar scanner'
        onPress={scanForDevices}
        disabled={!radioPowerOn}
      />
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.deviceText}>Nome: {item.name}</Text>
            <Text style={styles.deviceText}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  deviceText: {
    fontSize: 16,
    marginVertical: 8
  }
});
