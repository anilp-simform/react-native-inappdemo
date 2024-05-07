/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useIAPHelper} from './useIAPHelper';
import moment from 'moment';

const Button = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const SingleItem = ({item, onPress}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>Title: {item.title}</Text>
      <Text numberOfLines={1}>Desc : {item.description}</Text>
      <Text>
        Amt : {item.currency} {item.price}
      </Text>
      <Text>Type : {item.type.toUpperCase()}</Text>
      <Button title="Purchase" onPress={onPress} />
    </View>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    products,
    purchaseHistory,
    availablePurchases,
    subscriptions,
    subscribe,
    onPurchase,
  } = useIAPHelper();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log({availablePurchases})
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.title}>IAP</Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {purchaseHistory?.length > 0 && (
            <Text style={styles.subTitle}>Purchase History:</Text>
          )}
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {purchaseHistory?.map(item => {
                return (
                  <View key={item.transactionId} style={styles.itemContainer}>
                    <Text>TransID: {item.transactionId}</Text>
                    <Text>Product ID : {item.productId}</Text>
                    <Text>Quantity : {item.quantityIOS}</Text>
                    <Text>
                      Date :{' '}
                      {moment(
                        item.transactionDate.toString().replace('.0', ''),
                        'x',
                      ).format('DD MMM YYYY hh:mm a')}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <Text style={styles.subTitle}>Products:</Text>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {products?.map(item => {
                return (
                  <SingleItem
                    item={item}
                    key={item.productId}
                    onPress={() => onPurchase(item)}
                  />
                );
              })}
            </View>
          </ScrollView>
          <Text style={styles.subTitle}>Subscriptions:</Text>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {subscriptions?.map(item => {
                return (
                  <SingleItem
                    item={item}
                    key={item.productId}
                    onPress={() => subscribe(item)}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    padding: 20,
  },
  subTitle: {
    fontSize: 14,
    padding: 10,
  },
  itemContainer: {
    width: 150,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    gap: 10,
    justifyContent: 'space-between',
  },
});

export default App;
