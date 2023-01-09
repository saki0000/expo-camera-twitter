import { Camera, CameraType } from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import SearchTweet from "./SearchTweet";
const API_KEY = "AIzaSyCSjg-5gB6AfcusutCwL_PrYPXzd9tAly0";

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

const MyCamera = () => {
  let cameraRef = useRef<any>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const sendVisionAPI = async (image: string) => {
    const body = {
      requests: [
        {
          // ここに送る画像を定義
          image: {
            content: image,
          },
          // ここにAPIの種類を定義
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // APIから帰ってきたデータを受け取る
    const result = await response.json();
    const detectedText = result.responses[0].fullTextAnnotation;
    return detectedText || { text: "This image doesn't contain any text!" };
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const image = await cameraRef.current.takePictureAsync({ base64: true });
      const imageText = await sendVisionAPI(image.base64);
      console.log(imageText.text);
      setText(imageText.text);
      setOpen(true);
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.picutureButton}
            onPress={takePicture}
          />
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={open} style={styles.modalContainer}>
          <View style={styles.modal}>
            <SearchTweet text={text} />
            <Button
              title="close"
              onPress={() => {
                setOpen(false);
              }}
            />
          </View>
        </Modal>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  picutureButton: {
    alignSelf: "flex-end",
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "white",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  modal: {
    borderRadius: 10,
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default MyCamera;
