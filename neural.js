const tf = require('@tensorflow/tfjs');

module.exports =  class Neural {

  constructor(inputsCount,hiddenLayers, outputCounts) {
    this.neural = tf.sequential({
      layers: [tf.layers.dense({
          units: 10,
          activation: "sigmoid",
          inputShape: [inputsCount]}),
      ]});
      hiddenLayers.forEach((hiddenLayer) => {
        this.neural.add(tf.layers.dense({units:hiddenLayer}))
      })
      this.neural.add(tf.layers.dense({units: outputCounts}))

    this.neural.compile({loss: "categoricalCrossentropy", optimizer: tf.train.adam()})
  }

  think(inputsArray){
   return this.neural.predict(tf.tensor2d([inputsArray])).dataSync()
  }

}
