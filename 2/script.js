let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
class Graphics1d{
   constructor(xmin,xmax,ymin,ymax,W,H,f){
     this.xmin=xmin;this.xmax=xmax;
     this.ymin=ymin;this.ymax=ymax;
     this.W=W;this.H=H;
     this.f=f;
     this.y = [];
     this.nulls={
       x:[],
       y:[]
     };
     this.k=0;
   }
  
  draw(){
    ctx.beginPath();
    let Sx=this.W/(this.xmax-this.xmin);
    let Sy = this.H/(this.ymax-this.ymin)
 /*   for(let i = -this.W; i < this.W; i++){
      ctx.lineTo(i+this.W/2,-this.f(i)+this.H/2);
      ctx.strokeStyle="red";
      ctx.stroke();      
      if(this.f(i)*this.f(i-1)<=0){
        ctx.ellipse(i+this.W/2,this.H/2,2,2,0,0,2*Math.PI);
      }
    }*/
    let i= 0;
    let dx = (this.xmax-this.xmin)/this.W;
    ctx.strokeStyle="red";
    for(let x = this.xmin; x <= this.xmax; x+=dx){
      ctx.lineTo((x-this.xmin)*Sx, -(this.y[i]-this.ymin)*Sy+this.H);
      //if(this.y[i]<0.005 && this.y[i]>-0.005){
      //  ctx.ellipse((x-this.xmin)*Sx, -(this.y[i]-this.ymin)*Sy+this.H, 2,2,0,0,2*Math.PI);
       
      i++;
    }
    ctx.lineWidth=1;
    ctx.stroke();
    ctx.closePath();
    
    
    for(let i = 0; i < this.k; i++){
      ctx.beginPath();
      ctx.arc((this.nulls.x[i]-this.xmin)*Sx, -(this.nulls.y[i]-this.ymin)*Sy+this.H,2,0,2*Math.PI);
      ctx.fillStyle="indigo";
      ctx.fill();
      ctx.strokeStyle="indigo";
      ctx.stroke();  
      ctx.closePath();
    }  
  }
  evaluate(){
    let j = 0;
    let dx = (this.xmax-this.xmin)/this.W;
    for(let i = this.xmin; i < this.xmax; i+=dx){
      this.y[j] = this.f(i);
      
      if(this.y[j]<0.005 && this.y[j]>-0.005){
        this.nulls.x[this.k] = i;
        this.nulls.y[this.k] = this.y[j];
        this.k++;
      }
      j++;
    }
    
    //console.log(this.null.x.length);
  }
}


function InFunc(){
  let W = Number(document.getElementById("W").value);
  let H = Number(document.getElementById("H").value);
  let xmax = Number(document.getElementById("xmax").value);
  let ymax = Number(document.getElementById("ymax").value);
  let xmin = Number(document.getElementById("xmin").value);
  let ymin = Number(document.getElementById("ymin").value);
  console.log(H);
  canvas.width = W;  
  canvas.height = H;
  ctx.beginPath();
  ctx.moveTo(W/2,0);
  ctx.lineTo(W/2,H);
  ctx.moveTo(W,H/2);
  ctx.lineTo(0,H/2);
  ctx.strokeStyle="green";
  ctx.stroke();
  for(let i=0; i<=W;i+=10){
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(i,0)
      ctx.lineTo(i,H);
      ctx.stroke();
      ctx.lineWidth= 0.5;
  }
  for(let i=0; i<=H;i+=10){
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(0,i)
      ctx.lineTo(W,i);
      ctx.lineWidth=0.5;
      ctx.stroke();

  }
  ctx.closePath();

  let inf = document.getElementById("function");
  let inF = inf.value;
  let s1="";
  if(inF!=""){
    for(let i = 0; i < inF.length;i++){
      if(inF[i]!='x' && inF[i]!='+' && inF[i]!='-' && inF[i]!='/' && inF[i]!='.' 
           && inF[i]!='*'&& inF[i]!='('&& inF[i]!=')' && !(inF[i]>='0' && inF[i]<='9')){
        s1+="Math."
        while(inF[i]!=')'&& i < inF.length){
          s1+=inF[i];
          i++;
        }
        s1+=inF[i];
      }else{
          s1+=inF[i];
      }
    }
  }else{s1="Math.sin(x)";}
  console.log(s1);
  let f=function(x){
    return eval(s1);
  }
  let d = new Graphics1d(xmin,xmax,ymin,ymax,W,H,f);
  d.evaluate();
  d.draw();
}



