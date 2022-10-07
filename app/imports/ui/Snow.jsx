import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';


w = window.outerWidth;
h = window.outerHeight;
Particles=[]
bg = 0

function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

class Particle{
    constructor(){
        this.x=random(10,w-10);
        this.y=random(10,h-10);
        this.dist=random(20,50)
        this.ys=this.dist/10;
        this.r=this.dist/10;
    }
    update(){
        if(this.y>h){
            this.y=0;
            this.x=random(10,w-10);
        }
        this.y+=this.ys;
    }
    display(p5){
        p5.ellipse(this.x,this.y,this.r);
    }
}

class Snow extends React.Component {
  setup = (p5, parentRef) => {
    p5.createCanvas(w,h);
    p5.strokeWeight(0);
    for(let i=0;i<250;i++){
        Particles.push(new Particle());
    }
    bg = p5.createGraphics(w, h);
    bg.background(7,5,20);
    bg.noStroke();
    for(let i=0;i<=250;i++){
        bg.fill(random(150,255),200,random(150,255));
        bg.ellipse(random(0, w),random(0, h),random(1,3))
    }
  };
  
  draw = (p5) => {
    p5.image(bg,0,0);
    for(let i=0;i<Particles.length;i++){
        Particles[i].update()
        Particles[i].display(p5)
    }
  };
  

  render() {
    return (
      	<Sketch setup={this.setup} draw={this.draw} />
    );
  }
}


export default Snow;
