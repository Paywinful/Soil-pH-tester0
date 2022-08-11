import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Animated, useWindowDimensions, Dimensions} from 'react-native';
import Test from './index';


import Onboardingitem from './Onboardingitem';
import Slides from './slides'


export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 0}).current;
  const slidesRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;

  const viewableItemsChanged = useRef(({ viewableItems}) => {
    setCurrentIndex( viewableItems[0].index);
  }).current;


  return (
    <View style={ {flex: 3,}}>
      <View style={styles.container}>
          <FlatList
            data={Slides}
            renderItem={({ item,index })=> index == 5? <Test /> :<OnboardingItem item={item} />} 
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: {x: scrollX}}}],{
              useNativeDriver: false,
            })}
            scrollEventThrottle= {32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref= {slidesRef}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
