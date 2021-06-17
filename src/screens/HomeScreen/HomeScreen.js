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

  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 70 * 3;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/marvin.jpg')}
        blurRadius={20}
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          },
        ]}
      />
      <Animated.FlatList
        data={accounts}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={{transform: [{scale}], opacity}}>
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
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
