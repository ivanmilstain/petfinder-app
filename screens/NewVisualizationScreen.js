import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import * as enums from "../constants/Enums";
import { addVisualization } from "../store/visualizations.action";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function NewVisualizationScreen({ navigation }) {
  const dispatch = useDispatch();

  const [openType, setOpenType] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [openHair, setOpenHair] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openCollar, setOpenCollar] = useState(false);

  const [type, setType] = useState(null);
  const [color, setColor] = useState([]);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [hair, setHair] = useState(null);
  const [size, setSize] = useState(null);
  const [collar, setCollar] = useState(null);

  const [typeItems, setTypeItems] = useState(enums.PetTypes);
  const [colorItems, setColorItems] = useState(enums.Color);
  const [genderItems, setGenderItems] = useState(enums.Gender);
  const [ageItems, setAgeItems] = useState(enums.Age);
  const [hairItems, setHairItems] = useState(enums.Pelaje);
  const [sizeItems, setSizeItems] = useState(enums.Size);
  const [collarItems, setCollarItems] = useState(enums.Correa);

  const [model, setModel] = useState({
    id: "",
    type: null,
    color: [],
    gender: null,
    age: null,
    size: null,
    hair: null,
    collar: null,
    lat: 0,
    lng: 0,
    date: new Date(),
  });

  const handlerSave = () => {
    console.log("Add");
    if (type) {
      setModel({
        ...model,
        date: new Date(),
      });
      dispatch(addVisualization(model));
      navigation.navigate("Visualizaciones");
    } else {
      Alert.alert("Error", "Debe indicar, por lo menos, qu?? animal vio.");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerSave}>
          <Ionicons
            name="save"
            color={COLORS.white}
            size={24}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handlerSave]);

  useEffect(() => {
    Location.getCurrentPositionAsync({ timeout: 5000 }).then((location) => {
      setModel({
        ...model,
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textLabel}>??Qu?? animal viste?</Text>
        <DropDownPicker
          placeholder="Seleccionar"
          items={typeItems}
          open={openType}
          value={type}
          setOpen={setOpenType}
          setValue={setType}
          setItems={setTypeItems}
          onChangeValue={(item) => {
            setOpenType(false);
            setModel({
              ...model,
              type: item,
            });
          }}
          zIndex={7000}
          zIndexInverse={1000}
        />
        <Text style={styles.textLabel}>??De qu?? color es?</Text>
        <DropDownPicker
          placeholder="Seleccionar"
          multiple={true}
          mode="BADGE"
          showBadgeDot={false}
          items={colorItems}
          open={openColor}
          value={color}
          setOpen={setOpenColor}
          setValue={setColor}
          setItems={setColorItems}
          onChangeValue={(items) => {
            setModel({
              ...model,
              color: items,
            });
          }}
          zIndex={6000}
          zIndexInverse={2000}
        />
        <Text style={styles.textLabel}>??Es macho o hembra?</Text>
        <DropDownPicker
          placeholder="G??nero"
          items={genderItems}
          open={openGender}
          value={gender}
          setOpen={setOpenGender}
          setValue={setGender}
          setItems={setGenderItems}
          onChangeValue={(item) => {
            setOpenGender(false);
            setModel({
              ...model,
              gender: item,
            });
          }}
          zIndex={5000}
          zIndexInverse={3000}
        />
        <Text style={styles.textLabel}>Edad aproximada</Text>
        <DropDownPicker
          placeholder="Edad"
          items={ageItems}
          open={openAge}
          value={age}
          setOpen={setOpenAge}
          setValue={setAge}
          setItems={setAgeItems}
          onChangeValue={(item) => {
            setOpenAge(false);
            setModel({
              ...model,
              age: item,
            });
          }}
          zIndex={4000}
          zIndexInverse={4000}
        />
        <Text style={styles.textLabel}>Tama??o</Text>
        <DropDownPicker
          placeholder="Tama??o"
          items={sizeItems}
          open={openSize}
          value={size}
          setOpen={setOpenSize}
          setValue={setSize}
          setItems={setSizeItems}
          onChangeValue={(item) => {
            setOpenSize(false);
            setModel({
              ...model,
              size: item,
            });
          }}
          zIndex={3000}
          zIndexInverse={5000}
        />
        <Text style={styles.textLabel}>Pelaje</Text>
        <DropDownPicker
          placeholder="Pelaje"
          items={hairItems}
          open={openHair}
          value={hair}
          setOpen={setOpenHair}
          setValue={setHair}
          setItems={setHairItems}
          onChangeValue={(item) => {
            setOpenHair(false);
            setModel({
              ...model,
              hair: item,
            });
          }}
          zIndex={2000}
          zIndexInverse={6000}
        />
        <Text style={styles.textLabel}>??Tiene collar?</Text>
        <DropDownPicker
          placeholder="Collar"
          items={collarItems}
          open={openCollar}
          value={collar}
          setOpen={setOpenCollar}
          setValue={setCollar}
          setItems={setCollarItems}
          onChangeValue={(item) => {
            setOpenCollar(false);
            setModel({
              ...model,
              collar: item,
            });
          }}
          zIndex={1000}
          zIndexInverse={7000}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  textLabel: {
    fontSize: 18,
    marginBottom: 12,
    marginTop: 15,
    color: COLORS.primary,
    fontWeight: 'bold'
  },
});
