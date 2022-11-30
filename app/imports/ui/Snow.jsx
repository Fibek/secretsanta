import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import { useState } from 'react';


// w = window.innerWidth;
// h = window.innerHeight;
Particles=[]
bg = 0

function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

class Particle{
  constructor(w,h){
      this.x=random(10,w-10);
      this.y=random(10,h-10);
      this.dist=random(20,50)
      this.ys=this.dist/10;
      this.r=this.dist/10;
  }
  update(w,h){
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
  state = {w: window.innerWidth, h: window.innerHeight, P5: null, BG: null};

  drawbg = (p5) => {
    if(this.state.BG)
      this.state.BG.remove();
    bg = p5.createGraphics(this.state.w, this.state.h);
    this.setState({ w: window.innerWidth, h: window.innerHeight, P5: p5, BG: bg });
    bg.background(7,5,20);
    bg.noStroke();
    for(let i=0;i<=250;i++){
        bg.fill(random(150,255),200,random(150,255));
        bg.ellipse(random(0, this.state.w),random(0, this.state.h),random(1,3))
    }
  };

  setup = (p5, parentRef) => {
    let cnv = p5.createCanvas(this.state.w,this.state.h);
    this.setState({ w: window.innerWidth, h: window.innerHeight, P5: p5, BG: this.state.bg});
    cnv.position(0,0);
    cnv.style('z-index', '-1');
    p5.strokeWeight(0);
    for(let i=0;i<250;i++){
        Particles.push(new Particle(this.state.w, this.state.h));
    }
    this.drawbg(p5);
  };
  
  draw = (p5) => {
    p5.image(bg,0,0);
    for(let i=0;i<Particles.length;i++){
        Particles[i].update(this.state.w, this.state.h)
        Particles[i].display(p5)
    }
  };

  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} />
    );
  };

  updateDimensions = () => {
    this.setState({ w: window.innerWidth, h: window.innerHeight}, );
    this.drawbg(this.state.P5);
    this.state.P5.resizeCanvas(this.state.w, this.state.h);
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
}


export default Snow;
