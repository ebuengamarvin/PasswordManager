import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import CustomCard from '../../components/CustomCard';

const db = SQLite.openDatabase({
  name: 'PasswordManager',
  createFromLocation: '~mrx.db',
});

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({navigation}) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM apps ORDER BY id DESC',
        [],
        (tx, results) => {
          let count = results.rows.length;

          if (count > 0) {
            let accountsArray = [];
            for (let i = 0; i < count; i++) {
              accountsArray.push(results.rows.item(i));
            }
            setAccounts(accountsArray);
          }
        },
      );
    });
  }, []);

  const deleteAccount = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM apps WHERE id=?', [id], (tx, results) => {
        if (results.rowsAffected > 0) {
          navigation.replace('Home');
        }
      });
    });

    ToastAndroid.showWithGravityAndOffset(
      'Deleted Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      20,
    );
  };

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y: y}}}], {
    useNativeDriver: true,
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/marvin.jpg')}
        blurRadius={10}
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          },
        ]}
      />
      <AnimatedFlatlist
        data={accounts}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        {...{onScroll}}
        renderItem={({item, index}) => {
          const position = Animated.subtract(index * 220, y);
          const isDisappearing = -220;
          const isTop = 0;
          const isBottom = 550 - 220;
          const isAppearing = 550;
          const scale = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: 'clamp',
          });
          const opacity = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.1, 1, 0.9, 0.1],
          });
          const translateY = Animated.add(
            y,
            y.interpolate({
              inputRange: [0, 0.00001 + index * 220],
              outputRange: [0, -index * 220],
              extrapolateRight: 'clamp',
            }),
          );

          return (
            <Animated.View
              style={{opacity, transform: [{translateY}, {scale}]}}>
              <CustomCard
                id={item.id}
                name={item.name}
                website={item.website}
                username={item.username}
                password={item.password}
                deleteAccount={deleteAccount}
              />
            </Animated.View>
          );
        }}
      />
      <View style={{height: 17}}></View>
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
