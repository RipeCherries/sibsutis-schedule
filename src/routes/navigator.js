import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import StartPage from "../views/startPage/StartPage";
import GroupSearch from "../views/groupSearchPage/GroupSearch";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="StartPage" component={StartPage} />
                <Stack.Screen name="SearchGroupPage" component={GroupSearch} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;