import { StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as alertAction from "../store/visualizations.action";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

export default function VisualizationsScreen() {
  const dispatch = useDispatch();
  let alerts = useSelector((state) => state.alerts);
  const [currentLocation, setCurrentLocation] = useState();
  const navigation = useNavigation();

  const handlerGeoLocation = async () => {
    const isLocationOK = await verifyPermission();
    if (!isLocationOK) return;

    const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.002,
    });
  };
  const verifyPermission = async () => {
    const status = await Location.requestForegroundPermissionsAsync();
    
    if (status.status != "granted") {
      Alert.alert(
        "Permisos insuficientes.",
        "Necesita dar permisos de ubicacion para utilizar esta aplicacion.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const resetFilter = () => {
    console.log("RESET FILTER");
    dispatch(alertAction.setFilter({}, false));
  };

  useEffect(() => {
    handlerGeoLocation();
    dispatch(alertAction.loadVisualizations(alerts.filter));
  }, [alerts.filter]);
  
  return (
    <>
      <MapView initialRegion={currentLocation} style={styles.container}>
        {alerts.visualizations &&
          alerts.visualizations.map((item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.lat,
                longitude: item.lng,
              }}
              onPress={e => navigation.navigate('VisualizationDetail', item)}
            />
          ))}
      </MapView>
      {alerts.filter && alerts.filter.filtered && (
        <TouchableOpacity
          style={styles.buttonFiltered}
          onPress={() => resetFilter()}
        >
          <Text style={styles.textButton}>Borrar filtros</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NuevaVisualizacion")}
      >
        <Ionicons name="md-add" size={45} color="white" width={10} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    margin: 30,
  },
  buttonFiltered: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    position: "absolute",
    right: 5,
    height: 50,
    backgroundColor: "white",
    borderRadius: 100,
    margin: 10,
  },
  textButton: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
