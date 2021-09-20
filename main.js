Webcam.set({
  width:250 ,
  height:200 ,
    image_format: 'png' ,
    png_quality:90 
});

camera = document.getElementById("camera") ;

Webcam.attach('#camera');

function take_snapshot(){
  console.log("hi");
  Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>' ; 
  });
}

console.log("ml5",ml5.version);

recognize = ml5.imageClassifier("https://storage.googleapis.com/tm-model/Fm-Icpq5L/model.json",ModelLoaded);

function ModelLoaded() {
    console.log("LOADED !!")
}

function verify(){
  img = document.getElementById("captured_img");
  recognize.classify(img, gotresult);
}

function gotresult(error, results){
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    document.getElementById("object_name").innerHTML = results[0].label
    document.getElementById("object_accuracy").innerHTML = results[0].confidence ;
  }
}