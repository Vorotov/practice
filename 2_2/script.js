let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
class Graphics2d{
   constructor(xmin,xmax,ymin,ymax,W,H,f){
     this.xmin=xmin;this.xmax=xmax;
     this.ymin=ymin;this.ymax=ymax;
     this.W=W;this.H=H;
     this.f=f;
     this. res=[];
   }
  
  draw(){
    let  imgData = ctx.getImageData(0,0, this.W,this.H);
    let  RGBA =  imgData.data;
    
             let X = 0; //Screen X 
             let Y = 0; //Screen Y 
               for(let p=0; p<this.W*this.H*4; p+=4)  // for all pixels of canvas 
                { 
                  let dx = this.W/(this.xmax-this.xmin);
                  let dy = this.H/(this.ymax-this.ymin);
                  // computing math x and math y from screen X and screen Y
                    let x =  X/dx;  // scaling to  math x
                    let y = -Y/dy;  // scaling to  math y
                         x -= this.W/(2*dx);      //  translating to math x0=0 
                         y += this.H/(2*dy);      //  translating to math y0=0 
                           
                           // compute axes
                           const thx=dx/256;  
                           const thy=dy/256;  
                           let axis_x =  Math.abs(y) < thx ;
                           let axis_y =  Math.abs(x) < thy ;
                             //combine them
                            let axes =  (axis_x+axis_y)*64;
                  
                           // compute grids
                           let grid_vertical   =  Math.abs(x%1) < thx
                           let grid_horizontal =  Math.abs(y%1) < thy
                             //combine them 
                             let grid = (grid_vertical+grid_horizontal)*64 
                             
                              // combine them all
                              let axes_and_grid = axes+grid
                           
                            // computing  picture functions 
                         let F= this.f(x,y); // F=-Infinity;
                                          // F = Math.max(F, A);
                  
                             F *= 1024*1024;  // F - intensity of picture pixels (variant1)
                            // F = 1024/F;  // F - intensity of picture pixels (variant2)
                           
               
                               if(F>0) RGBA[p+0]=F;               // red if F>0
                                       RGBA[p+1]=axes_and_grid;   // green axes_and_grid
                               if(F<0) RGBA[p+2]=-F;              // blue if F<0
                                       RGBA[p+3]=255;             // opacity
                  
                  // computing new screen X and screen Y
                     X++; 
                      if(X==this.W)
                        { 
                         X=0; //Screen X 
                         Y++; //Screen Y 
                        }  
                }  
    ctx.putImageData(imgData, 0, 0); 
  }
/*  evaluate(){
    let dx = (this.xmax-this.xmin)/this.W;
    let dy = (this.xmax-this.xmin)/this.W;
    for(let i = this.xmin; i < this.xmax; i++){
      for(let j = this.ymin; j < this.ymax; j ++){
        this.res[i][j]=this.f()
      }
    }
    
    //console.log(this.null.x.length);
  }*/
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
  let inf = document.getElementById("function");
  let inF = inf.value;
  let s1="";
  if(inF!=""){
    for(let i = 0; i < inF.length;i++){
      if(inF[i]!='x' && inF[i]!='y' && inF[i]!='+' && inF[i]!='-' && inF[i]!=' ' && inF[i]!='/' && inF[i]!='.' 
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
  }else{s1="x*x-y*y";}
  console.log(s1);
  let f=function(x,y){
    return eval(s1);
  }
  let d = new Graphics2d(xmin,xmax,ymin,ymax,W,H,f);
//  d.evaluate();
  d.draw();
}
