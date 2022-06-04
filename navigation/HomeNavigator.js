import React from 'react'
import { TouchableOpacity } from 'react-native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS } from '../constants' 
import { Ionicons } from '@expo/vector-icons'
// screens
import VisualizationsScreen from '../screens/VisualizationsScreen'
import NewVisualizationScreen from '../screens/NewVisualizationScreen'
import FilterScreen from '../screens/FilterScreen'
import VisualizationDetailScreen from '../screens/VisualizationDetailScreen'

const HomeStack = createNativeStackNavigator()

export default HomeNavigator = () => (
    <HomeStack.Navigator
        initialRoute='Visualizaciones'
        screenOptions={{
            headerStyle: {
                backgroundColor: COLORS.primary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >
        <HomeStack.Screen
            name="Visualizaciones"
            component={VisualizationsScreen}
            options={({navigation}) => ({
                title: 'Alertas Cargadas',
                headerRight: () => (
                    <TouchableOpacity onPress={ () => navigation.navigate('Filter')}>
                        <Ionicons 
                            name="filter"
                            size={24}
                            color={COLORS.white}    
                        />
                    </TouchableOpacity>
                )
            })}
        />
        <HomeStack.Screen
            name="NuevaVisualizacion"
            component={NewVisualizationScreen}
            options={{title: 'Nueva Alerta'}} 
        />
        <HomeStack.Screen
            name="Filter"
            component={FilterScreen}
            options={{title: 'Filtrar Alertas'}} 
        />
        <HomeStack.Screen
            name="VisualizationDetail"
            component={VisualizationDetailScreen}
            options={{title: 'Detalle'}} 
        />
    </HomeStack.Navigator>
)
