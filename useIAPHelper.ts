import {useEffect} from 'react';
import {
  Product,
  Purchase,
  PurchaseError,
  Subscription,
  purchaseErrorListener,
  requestPurchase,
  requestSubscription,
  useIAP,
} from 'react-native-iap';

const consumableSkus = [
  'com.simformllc.iapdemo.month',
  'com.simformllc.iapdemo.yearsallaccess',
  'com.simformllc.iapdemo.nonconsumable',
  'com.simformLLC.iapdemo.newavatar',
  'com.simformLLC.iapdemo.extralives',
];

const subSkus = [
  'com.simformLLC.iapdemo.monthlyprimeuser',
  'com.simformllc.iapdemo.years',
];

export const useIAPHelper = () => {
  const {
    connected,
    products,
    subscriptions,
    purchaseHistory,
    availablePurchases,
    currentPurchase,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistory,
  } = useIAP();

  console.log({products, subscriptions});
  useEffect(() => {
    const subscription = purchaseErrorListener((error: PurchaseError) => {
      console.log(error);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (connected) {
      getProducts({skus: consumableSkus});
      getSubscriptions({skus: subSkus});
      getPurchaseHistory();
      getAvailablePurchases();
    }
  }, [
    connected,
    getAvailablePurchases,
    getProducts,
    getPurchaseHistory,
    getSubscriptions,
  ]);

  const purchase = (item: Product): void => {
    if (item.type === 'iap') {
      requestPurchase({sku: item.productId});
    }
  };

  const subscribe = (item: Subscription): void => {
    requestSubscription({sku: item.productId});
  };

  useEffect(() => {
    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            const ackResult = await finishTransaction({purchase});
            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);
console.log({data:purchaseHistory?.map(item=>item.transactionDate.toString().replace(".0",""))})
  return {
    products,
    subscriptions,
    onPurchase: purchase,
    subscribe,
    purchaseHistory,
    availablePurchases,
  };
};
