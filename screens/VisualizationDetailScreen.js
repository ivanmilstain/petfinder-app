import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../constants";
import { deleteVisualization } from "../store/visualizations.action";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function VisualizationDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const item = route.params;
  let count = 0;
  let keys = item.color ? Object.keys(item.color) : [];
  const date = new Date(item.date);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerDelete}>
          <Ionicons name="trash" color={COLORS.white} size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handlerDelete]);

  const handlerDelete = () => {
    Alert.alert(
        "Confirmar",
        "¿Estás seguro que deseas eliminar la alerta?",
        [
            { 
                text: "Cancelar",
            },
            { 
                text: "Aceptar", 
                onPress: () => {
                    console.log("Delete");
                    dispatch(deleteVisualization(item.id));
                    navigation.navigate("Visualizaciones");
                }
            }
        ]
    );
  };

  return (
    <View style={styles.content}>
      <Text style={styles.textLabel}>Animal</Text>
      <Text style={styles.text}>
        {item.type +
          (item.gender ? " " + item.gender : "") +
          (item.age ? " [" + item.age + "]" : "")}
      </Text>
      <Text style={styles.text}>
        Visto: {date.getDay()}/{date.getMonth()}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}hs.
      </Text>
      {(item.hair || item.size || item.collar) && (
        <>
          <Text style={styles.textLabel}>Características</Text>
          <Text style={styles.text}>
            {item.hair ? "Pelo " + item.hair : ""}
          </Text>
          <Text style={styles.text}>
            {item.size ? "Tamaño: " + item.size : ""}
          </Text>
          <Text style={styles.text}>{item.collar ? item.collar : ""}</Text>
        </>
      )}
      {item.color && (
        <>
          <Text style={styles.textLabel}>Color</Text>
          {keys &&
            keys.length > 0 &&
            keys.map(() => {
              let text = item.color[count];
              count++;
              return <Text style={styles.text}>{text}</Text>;
            })}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 18,
  },
  textLabel: {
    fontSize: 18,
    marginBottom: 12,
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
