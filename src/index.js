import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import { RFValue } from "react-native-responsive-fontsize";
import Feather from "@expo/vector-icons/Feather";
import ConfirmPhoto from "./submit-photo";
import Instruction from "./instruction";
// import Onboarding from "./Onboarding";



export default function index() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState(
    Camera.Constants.FlashMode.off
  );
  const cameraRef = React.useRef(null);
  const width = useWindowDimensions;

  const [photoUri, setPhotoUri] = React.useState(null);
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [showInstruction, setShowInstruction] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const isFlashOn = Camera.Constants.FlashMode.off === flashMode;

  const onTakePhoto = async () => {
    try {
      setIsLoading(true);
      let photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo);
      setShowPhoto(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <View style={styles.container} >
      {/* <FlatList> */}
      {/* <Onboarding /> */}
      {!showPhoto ? (
        <>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flashMode}
          >
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: isLoading ? "rgba(0,0,0,.5)" : "transparent",
              }}
            >
              <View />
              <View>
                {isLoading ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: "#fff", marginTop: RFValue(10), fontWeight:'bold' }}>
                      Processing...
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.buttonContainer}>
                {isLoading ? null : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setFlashMode(
                          flashMode === Camera.Constants.FlashMode.on
                            ? Camera.Constants.FlashMode.off
                            : Camera.Constants.FlashMode.on
                        );
                      }}
                      style={{ marginRight: RFValue(30) }}
                    >
                      <Feather
                        name={isFlashOn ? "zap-off" : "zap"}
                        color={"#fff"}
                        size={RFValue(25)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onTakePhoto}
                      style={styles.button}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setShowInstruction(true);
                      }}
                      style={{ marginLeft: RFValue(30) }}
                    >
                      <Feather
                        name={"info"}
                        color={"#fff"}
                        size={RFValue(20)}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </SafeAreaView>
          </Camera>
        </>
      ) : null}
      <ConfirmPhoto
        show={showPhoto}
        setShow={() => {
          setPhotoUri(null);
          setShowPhoto(false);
        }}
        photo={photoUri}
      />
      <Instruction
        showModal={showInstruction}
        setshowModal={setShowInstruction}
      />
      {/* </FlatList> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: RFValue(20),
  },
  button: {
    borderWidth: 9,
    borderRadius: 50,
    borderColor: "#ffff",
    height: RFValue(80),
    width: RFValue(80),
  },
  text: {
    color: "#fff",
  },
});
