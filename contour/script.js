let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
                 
let img = new Image();
img.src = "img.jpg";
canvas.width=img.width+2;
canvas.height=img.height+2;
img.onload = function() {
                 
    context.drawImage(img, 0, 0);
    let imageData = context.getImageData(0,0, 1989, 1409);
    console.log(imageData.data);
  
  let x = imageData.data; 

  for(let p = 0; p < parseInt(x.length); p +=4){
    if(x[p]<10){
//    x[p]=255;
 //   x[p+1] = 255;
  //  x[p+2] = 255;
    } 
  }
  let p = 0;
  while(x[p]>100){
    p+=4;
  }
  console.log(p);
  let finish = p;
  let w = 1989*4; 
    x[p]=255;
    x[p+1]=0;
    x[p+2]=0;
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
  for(let j = 0; j < cont.length; j ++){
    x[cont[j]] = 0;
    x[cont[j]+1] = 255;
    x[cont[j]+2] = 0;
  /*  
    x[cont[j]-w] = 0;
    x[cont[j]-w+1] = 255;
    x[cont[j]-w+2] = 0;
    
    x[cont[j]-w+4] = 0;
    x[cont[j]-w+5] = 255;
    x[cont[j]-w+6] = 0;
    
    x[cont[j]+4] = 0;
    x[cont[j]+5] = 255;
    x[cont[j]+6] = 0; */
  }
  console.log("FINISH!!!");
   context.putImageData(imageData, 0, 0);
};


 

