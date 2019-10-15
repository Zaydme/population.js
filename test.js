const Population = require('./population')

class Student {
  constructor(name,happy) {
    this.name = name;
    this.happy = happy;
  }
  bounce(){
    console.log("Hi! my Name is: " + this.name + ', i am ' + this.happy )
  }
}


//new Population(size, [neural network shape], Class, ...constructors for your class)
//Neural network shape: "[inputs,[array of hiddent layers],outputs]"
let pop = new Population(100, [2,[2],1], Student, 'James', "happy");


console.log("this example will create a population of students, the one that will get rewarded is who gets the closest number to 1, until we get a good neural network.")


function train(){

let thoughts = pop.think([1,1])
// each thought is {id: "id of the being",output: [array of outputs]}
//you can make every being think separately, pop.being[index].think(inputs_array)

let idOfBestOne= findtheBestOne(thoughts)
// findtheBestOne() is your function to pick the best member


//pop.reward(being_id)  id is a string.
pop.reward(idOfBestOne);
//after you find it, you reward it


//mutate(mutationRate)
pop.mutate(0.01)
//here every being on the population will get a mutated brain based on the ones you rewarded
}

//I will just do this 30 times
for (var i = 0; i < 30; i++) {
   train()
}







// This is where i pick the one i want to reward
// in this case i just check the closest to number 1

function findtheBestOne(vals, target=1) {
  let closest = Number.MAX_SAFE_INTEGER;
  let index = 0;

  vals.forEach((num, i) => {
    let dist = Math.abs(target - num.output);

    if (dist < closest) {
      index = i;
      closest = dist;
    }
  });
  console.log(vals[index].output)
  return vals[index].id;
}
