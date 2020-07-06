
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let img = new Image();
img.src = "img2.png";  
let x;
let w;
let h;
let imageData;
img.onload = function() {
  canvas.width=img.width;
  canvas.height=img.height;
  context.drawImage(img, 0, 0);
  imageData = context.getImageData(0,0, img.width, img.height);
   x = imageData.data; 
  let p = 0;
   w = img.width*4;
   h = img.height;
};
 
  

 function func(){
  function NearlyBlack(pos){
    if(x[pos]<150 && x[pos+1]<150 && x[pos+2]<150) return true;
    return false;
  }
  function NearlyWhite(pos){
    return !NearlyBlack(pos);
  }
  function MakeBlack(pos){
    x[pos] = 0;
    x[pos+1] = 0;
    x[pos+2] = 0;
  }
  function MakeWhite(pos){
    x[pos] = 255;
    x[pos+1] = 255;
    x[pos+2] = 255;
  }
 
  /*for(let q=w*h-2*w; q<w*h;q+=4){
    MakeWhite(q);
  }*/
  
     let white = 0, black = 0;
    for(let t = 0; t<parseInt(x.length);t+=4){
     if(NearlyBlack(t) || ((NearlyBlack(t-w) + NearlyBlack(t+w) + NearlyBlack(t+4) + NearlyBlack(t-4)) >=3)) {MakeBlack(t); black++;}
      else  {MakeWhite(t); white++;}
    }
  if(white>black) console.log("white");
   else console.log("black");

  //находим первый черный пиксель

  /*
  0 - восток
  1 - юг 
  2 - запад
  3 - север
  */
  let direction = 0; 
  let i = 100000;
  let cont = [];
  let j = 0;
  for(let t=0; t<w*h;t+=4){
    let amountBlack = NearlyBlack(t - w- 4) + NearlyBlack(t - w + 4) + NearlyBlack(t + w - 4) + NearlyBlack(t + w + 4) + 
    NearlyBlack(t - w) + NearlyBlack(t + w) + NearlyBlack(t + 4) + NearlyBlack(t - 4);
    let amountWhite = NearlyWhite(t - w - 4) + NearlyWhite(t - w + 4) + NearlyWhite(t + w - 4) + NearlyWhite(t + w + 4)+ 
    NearlyWhite(t - w) + NearlyWhite(t + w) + NearlyWhite(t + 4) + NearlyWhite(t - 4);
    if((amountWhite >=2) && (amountWhite <=6) && (amountBlack >=2) && (amountBlack <=6) && (!(t<w && black>white)) && (!(t>=(h*w-w) && black>white))) cont [j++] = t;
  }
  //алгоритм жука
  /*if(NearlyBlack(0)){
  while(x[p]<100){
    p+=4;
  }
  while(i>0){
    i--;
  //  if(x[p]>=w)
    if(x[p]<100){  //попали на черную
      cont [j] = p;
      j++
      direction = (direction + 4 - 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } else {        // попали на белую        
      direction = (direction + 4 + 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } 
  }
}
else {
  while(x[p]>100){
    p+=4;
  }
  while(i>0){
    i--;
  //  if(x[p]>=w)
    if(x[p]>100){  //попали на черную
      cont [j] = p;
      j++
      direction = (direction + 4 - 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } else {        // попали на белую        
      direction = (direction + 4 + 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } 
  }

}*/
  //рисование контура 
  console.log(cont);
 
  for(let j = 0; j < cont.length; j ++){
    if((cont[j]+4)%(w)==0) cont[j]-=4;
    x[cont[j]] = 255;
    x[cont[j]+1] = 68;
    x[cont[j]+2] = 51;
    console.log((cont[j]%w) + " " + Math.floor(cont[j]/w));
   // console.log("-> "+(cont[j].toPrecision(3)%w)+ " " + cont[j]/w);
  }
  
  console.log("FINISH!!!");
   context.putImageData(imageData, 0, 0);
};



 

