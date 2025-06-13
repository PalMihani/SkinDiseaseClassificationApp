// Camera.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState('off');
  const [type, setType] = useState('back');
  const cameraRef = useRef(null);

  // Request camera permission if not granted
  if (!permission) {
    requestPermission();
  }

  // Check if permission is denied
  if (permission && !permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
          exif: false,
        });
        
        if (photo?.uri) {
          console.log("Photo taken:", photo.uri);
          setImage(photo.uri);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const toggleFlash = () => {
    setFlash((prev) => {
      switch(prev) {
        case 'off':
          return 'on';
        case 'on':
          return 'auto';
        case 'auto':
        default:
          return 'off';
      }
    });
  };

  const flipCamera = () => {
    setType((prev) => prev === 'back' ? 'front' : 'back');
  };

  const retakePhoto = () => {
    setImage(null);
  };

  const proceedWithPhoto = async () => {
    if (image) {
      try {
        // Store image URI in AsyncStorage
        await AsyncStorage.setItem('capturedImageUri', image);
        console.log("Saved image URI to AsyncStorage");
        // Navigate to prediction screen without params
        router.push('/Prediction');
      } catch (error) {
        console.error("Error saving image URI:", error);
      }
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerBackTitle: 'Home' }} />
      <View style={{ flex: 1 }}>
        {!image ? (
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={type}
            flash={flash}
          >
            {/* Flip Camera Button (Top Left) */}
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, left: 20 }}
              onPress={flipCamera}
            >
              <Ionicons name="camera-reverse" size={28} color="white" />
            </TouchableOpacity>
            
            {/* Flash Toggle Button (Top Right) */}
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, right: 20 }}
              onPress={toggleFlash}
            >
              <Ionicons 
                name={
                  flash === 'off' 
                    ? "flash-off" 
                    : flash === 'on' 
                    ? "flash" 
                    : "bulb"  // Using "bulb" as an alternative for auto mode
                } 
                size={28} 
                color="white" 
              />
            </TouchableOpacity>
            
            {/* Black Background + Capture Button (Bottom) */}
            <View style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'black',
              paddingTop: 15,
              paddingBottom: 100,
              alignItems: 'center',
            }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={takePicture}
              >
                <Ionicons name="camera" size={30} color="white" />
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>
                  Take a picture
                </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          <View style={{ flex: 1 }}>
            <Image 
              source={{ uri: image }} 
              style={{ flex: 1 }} 
              resizeMode="cover"
            />
            <View style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'black',
              paddingTop: 15,
              paddingBottom: 100,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              {/* Retake Button (Left) */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={retakePhoto}
              >
                <Ionicons name="camera-reverse" size={30} color="white" />
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>
                  Retake
                </Text>
              </TouchableOpacity>

              {/* Proceed Button (Right) */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={proceedWithPhoto}
              >
                <Ionicons name="checkmark" size={30} color="white" />
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
}