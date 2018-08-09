function hex_to_RGB(hex) {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
      r: Math.round(parseInt(m[1], 16)/2.55)/100,
      g: Math.round(parseInt(m[2], 16)/2.55)/100,
      b: Math.round(parseInt(m[3], 16)/2.55)/100
  };
}

const input = document.getElementById('colorInput')
const div = document.getElementById('colorDiv')
input.addEventListener('change',(e)=>{
// console.log(e.target.value)
const rgb = hex_to_RGB(e.target.value)
console.log(rgb)

const network = new brain.NeuralNetwork();

network.train([
  {
    input: { r: 0.62, g: 0.72, b: 0.88 },
    output: { light: 1 }
  },{
    input: { r: 0.33, g: 0.24, b: 0.29 },
    output: { dark: 1 }
  },{
    input: { r: 0.1, g: 0.84, b: 0.72 },
    output: { light: 1 }
  },{
    input: { r: 0.31, g: 0.35, b: 0.41 },
    output: { dark: 1 }
  }
]);



let result = network.run(rgb);
let resultSelect = brain.likely(rgb,network)
console.log(result,resultSelect)

div.style.background = e.target.value
  if(resultSelect=='light'){
    div.style.color = 'black'
    div.innerHTML='背景是亮色'
  }else{
    div.style.color = 'white'
    div.innerHTML='背景是暗色'
  }
})


const input2 = document.getElementById('colorInput2')
const div2 = document.getElementById('colorDiv2')

const trainingData = []
var overTrainFlag = false

function light(){
  const rgb = hex_to_RGB(input2.value)
  trainingData.push({
    input: rgb,
    output:{light:1}
  })
  alert('訓練資料'+input2.value+'設為亮色')
}

function dark(){
  const rgb = hex_to_RGB(input2.value)
  trainingData.push({
    input: rgb,
    output:{dark:1}
  })
  alert('訓練資料'+input2.value+'設為暗色')
}

function overTraining(){
  overTrainFlag = true
  alert('訓練完畢，來亂調顏色看你訓練的結果吧:)')
}

input2.addEventListener('change',(e)=>{
  // console.log(e.target.value)
  const rgb = hex_to_RGB(e.target.value)
  console.log(rgb)

  const network = new brain.NeuralNetwork();

  if(overTrainFlag){
    network.train(trainingData);

    let result = network.run(rgb);
    let resultSelect = brain.likely(rgb,network)
    console.log(result,resultSelect)
    
    div2.style.background = e.target.value
    if(resultSelect=='light'){
      div2.style.color = 'black'
      div2.innerHTML='背景是亮色'
    }else{
      div2.style.color = 'white'
      div2.innerHTML='背景是暗色'
    }
  }else{
    div2.style.background = e.target.value
  }
})
