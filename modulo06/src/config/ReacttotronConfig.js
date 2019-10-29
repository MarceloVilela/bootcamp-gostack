import Reacttotron from 'reactotron-react-native';

if(__DEV__){
  const tron = Reacttotron
    .configure()
    .useReactNative()
    .connect(
      {
      host: '192.168.1.2',
      port: 9090,
      }
    );

  console.tron = tron;

  tron.clear();
}