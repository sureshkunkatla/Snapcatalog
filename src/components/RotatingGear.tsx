import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '../utils/size';
import CustomText from './CustomText';

const RotatingGear = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <OverlayView>
        <CustomText text={"Please wait Generating PDF"} color='#fff'/>
    <AnimatedView style={{ transform: [{ rotate: spin }] }}>
      <Icon name="cog" size={50} color="#fff" />
    </AnimatedView>
    </OverlayView>
  );
};

export default RotatingGear;

const OverlayView = styled.View`
    height: ${hp('100%')}px;
    width: ${wp('100%')}px;
    background-color: rgba(0,0,0,0.8);
    justify-content: center;
    align-items: center;
    position:absolute;
    z-index:10;

`
const AnimatedView = styled(Animated.View)`
    margin-top: ${wp('5%')}px;
  justify-content: center;
  align-items: 'center';
`;
