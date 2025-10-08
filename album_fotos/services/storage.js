import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'fotos';

export const salvarFotos = async (fotos) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fotos));
    } catch (e) {
        console.log('Erro ao salvar fotos:', e);
    }
};

export const carregarFotos = async () => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json != null ? JSON.parse(json) : [];
    } catch (e) {
        console.log('Erro ao carregar fotos:', e);
        return [];
    }
};
