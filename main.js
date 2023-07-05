timer_counter=30;
timer_check="";
answer_holder="";
score="";
function setup(){
    canvas=createCanvas(280, 280)
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
    choose();
}
function choose(){
    things= ["apple", "banana", "clock", "cloud", "flower", "hat", "strawberry", "moon", "butterfly", "key", "sun", "shirt", "fish", "circle"];
thing= things[Math.floor(Math.random()*things.length)];
document.getElementById('sketch').innerHTML='Sketch to be drawn: '+thing;
}
function time(){
    setInterval(1000);

    document.getElementById('time').innerHTML=timer_counter;
}
time();
function clearCanvas(){
    background("white");
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
if(error){
    console.error(error);

}
console.log(results);
document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
document.getElementById('confidence').innerHTML = 'Confidence: '+ Math.round(results[0].confidence*100)+"%";
utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);

}

function check(){
if(results[0].label==thing){
    utterThis = new SpeechSynthesisUtterance("correct");
synth.speak(utterThis);
}}
