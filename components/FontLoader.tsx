import React, { ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

// FontLoader component
const FontLoader = ({ children }: { children: ReactNode }) => {
  const [fontsLoaded] = useFonts({
    'MontserratAlternates-Regular': require('@/assets/fonts/MontserratAlternates-Regular.ttf'),
    'MontserratAlternates-SemiBold': require('@/assets/fonts/MontserratAlternates-SemiBold.ttf'),
    'Raleway-SemiBold': require('@/assets/fonts/Raleway-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default FontLoader;
