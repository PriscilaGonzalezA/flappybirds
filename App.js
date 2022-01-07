import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Bird from "./components/Bird";
import React, {useEffect, useState} from "react";
import Obstacles from "./components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const gravity = 3
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  let gameTimerId
  let obstaclesLeftTimerId

  //start bird falling
  useEffect(() => {
    if(birdBottom > 0){
      gameTimerId = setInterval(()=>{
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  },[birdBottom])

  //start first obstacles
  useEffect(()=> {
    if(obstaclesLeft > -obstacleWidth){
      obstaclesLeftTimerId = setInterval(()=> {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      },30)

      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    }else{
      setObstaclesLeft(screenWidth)
    }


  },[obstaclesLeft])


  return (
    <View style={styles.container}>
      <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
      />
      <Obstacles
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstacleLeft={obstaclesLeft}
          gap={gap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
