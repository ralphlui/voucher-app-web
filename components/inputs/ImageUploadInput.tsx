import { View, Text, Image, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploadInputProps {
  onChange: (result: ImagePicker.ImagePickerResult) => void;
}

const ImageUploadInput = ({ onChange }: ImageUploadInputProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImageUri(imageUri);
      onChange(result);
    }
  };
  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 10
  },
});


export default ImageUploadInput;