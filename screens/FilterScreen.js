import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useLayoutEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import DropDownPicker from "react-native-dropdown-picker";
  import * as enums from "../constants/Enums";
  import { setFilter } from "../store/visualizations.action";
  import { COLORS } from "../constants";
  import { Ionicons } from "@expo/vector-icons";
  
  export default function NewVisualizationScreen({ navigation }) {
    const dispatch = useDispatch();
    let state = useSelector((state) => state.alerts);
    console.log("FILTER SCREEN")
    const [openType, setOpenType] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openGender, setOpenGender] = useState(false);
    const [openAge, setOpenAge] = useState(false);
    const [openHair, setOpenHair] = useState(false);
    const [openSize, setOpenSize] = useState(false);
    const [openCollar, setOpenCollar] = useState(false);
  
    const [type, setType] = useState(state && state.filter && state.filter.type ? state.filter.type : null);
    const [color, setColor] = useState(state && state.filter && state.filter.color && state.filter.color.length > 0 ? state.filter.color : []);
    const [gender, setGender] = useState(state && state.filter && state.filter.gender ? state.filter.gender : null);
    const [age, setAge] = useState(state && state.filter && state.filter.age ? state.filter.age : null);
    const [hair, setHair] = useState(state && state.filter && state.filter.hair ? state.filter.hair : null);
    const [size, setSize] = useState(state && state.filter && state.filter.size ? state.filter.size : null);
    const [collar, setCollar] = useState(state && state.filter && state.filter.collar ? state.filter.collar : null);
  
    const [typeItems, setTypeItems] = useState(enums.PetTypes);
    const [colorItems, setColorItems] = useState(enums.Color);
    const [genderItems, setGenderItems] = useState(enums.Gender);
    const [ageItems, setAgeItems] = useState(enums.Age);
    const [hairItems, setHairItems] = useState(enums.Pelaje);
    const [sizeItems, setSizeItems] = useState(enums.Size);
    const [collarItems, setCollarItems] = useState(enums.Correa);
  
    const [model, setModel] = useState({
      id: "",
      type: state && state.filter && state.filter.type ? state.filter.type : null,
      color: state && state.filter && state.filter.color && state.filter.color.length > 0 ? state.filter.color : null,
      gender: state && state.filter && state.filter.gender ? state.filter.gender : null,
      age: state && state.filter && state.filter.age ? state.filter.age : null,
      size: state && state.filter && state.filter.hair ? state.filter.hair : null,
      hair: state && state.filter && state.filter.size ? state.filter.size : null,
      collar: state && state.filter && state.filter.collar ? state.filter.collar : null
    });
  
    const handlerFilter = () => {
      console.log("Filter");
      dispatch(setFilter(model, true));
      navigation.navigate("Visualizaciones");
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={handlerFilter}>
            <Ionicons
              name="checkmark-sharp"
              color={COLORS.white}
              size={24}
            />
          </TouchableOpacity>
        ),
      });
    }, [navigation, handlerFilter]);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textLabel}>¿Qué animal estás buscando?</Text>
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
          <Text style={styles.textLabel}>¿De qué color es?</Text>
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
          <Text style={styles.textLabel}>¿Es macho o hembra?</Text>
          <DropDownPicker
            placeholder="Género"
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
          <Text style={styles.textLabel}>Tamaño</Text>
          <DropDownPicker
            placeholder="Tamaño"
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
          <Text style={styles.textLabel}>¿Tiene collar?</Text>
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
  