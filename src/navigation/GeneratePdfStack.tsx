import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GeneratePdf from "../screens/GeneratePdf";
import PdfPreviewScreen from "../screens/PdfPreviewScreen";

const Stack = createNativeStackNavigator();

const GeneratePdfStack = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Generate Pdf" component={GeneratePdf}></Stack.Screen>
            <Stack.Screen name="Pdf View" component={PdfPreviewScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default GeneratePdfStack