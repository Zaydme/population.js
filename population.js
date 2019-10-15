const tf = require('@tensorflow/tfjs');

const Neural = require('./neural')
module.exports = class Population {

  constructor(size,neuralShape,_object,...params) {
    this.generation = 0;
    this.size = size;
    this.nShape = neuralShape
    this.beings = new Array(size);
    for (var i = 0; i < this.size; i++) {
    this.beings[i] = new _object(...params)
    this.beings[i].brain = new Neural(neuralShape[0],neuralShape[1],neuralShape[2]);
    this.beings[i].age = 0;
    this.beings[i].score = 0;
    this.beings[i].id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }
  }

  think(inputsArray){
    let thoughts = []
    this.beings.forEach((being) => {
      thoughts.push({id:being.id,output:being.brain.think(inputsArray)});
    });
    return thoughts;
  }

  getBestBeing(){
    this.beings.sort((a, b) => (a.score < b.score) ? 1 : -1)
    return this.beings[0]
  }
  get(id){
    return this.beings.find(being => being.id == id)
  }
  reward(id){
    this.beings.find(being => being.id == id).score++
  }
  addAge(id){
    this.beings.find(being => being.id == id).age++
  }
  mutate(mutationRate){

    let bestBrain = this.getBestBeing().brain
    const bestWeights = bestBrain.neural.getWeights()


    for (var i = 0; i < this.size; i++) {
      //reseting the being
      this.beings[i].brain = new Neural(this.nShape[0],this.nShape[1],this.nShape[2]);
      this.beings[i].age = 0;
      this.beings[i].score = 0;

      const mutatedWeights = []
      for (let i = 0; i < bestWeights.length; i++) {
          let tensor = bestWeights[i];
          let tensorShape = tensor.shape;
          let tensorValues = tensor.dataSync().slice();
          for (let j = 0; j < tensorValues.length; j++) {
              if (Math.random() < mutationRate) {
                  let value = tensorValues[j];
                  tensorValues[j] = value + Math.random() - 0.5;
              }
          }
          let mutatedTensor = tf.tensor(tensorValues,tensorShape)
          mutatedWeights[i] = mutatedTensor;
      }
      this.beings[i].brain.neural.setWeights(mutatedWeights)
    }

  }
  newBeing(_object,...params){
    let newBing = new _object(...params)
    newBing.brain = new Neural(this.nShape[0],this.nShape[1],this.nShape[2]);
    newBing.age = 0;
    newBing.score = 0;
    newBing.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    this.beings.push(newBing)
    return true
  }
}
