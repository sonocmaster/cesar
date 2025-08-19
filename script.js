// ?????? ?????? ??????? ?????? ??????
const cvs = document.getElementById('fx');
const ctx = cvs.getContext('2d');
let W,H,parts=[];

function size(){
  W=cvs.width=innerWidth;
  H=cvs.height=innerHeight;
  const n = Math.min(160, Math.floor(W*H/13000));
  parts = Array.from({length:n},()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*1.8 + 0.5,
    vx:(Math.random()-.5)*.35,
    vy:-(Math.random()*.7+.2),
    a: Math.random()*6.283
  }));
}
size();
addEventListener('resize', size, {passive:true});

let mx=-9999,my=-9999;
addEventListener('mousemove',e=>{mx=e.clientX; my=e.clientY;},{passive:true});
addEventListener('touchmove',e=>{const t=e.touches[0]; if(t){mx=t.clientX; my=t.clientY;}},{passive:true});

function tick(){
  ctx.clearRect(0,0,W,H);

  // ???? ?????? ??? ??????
  const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)/1.1);
  g.addColorStop(0,'rgba(0,234,255,.08)');
  g.addColorStop(1,'rgba(0,234,255,0)');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

  parts.forEach(p=>{
    const dx=p.x-mx, dy=p.y-my, d2=dx*dx+dy*dy;
    if(d2<140*140){
      const force=(140-Math.sqrt(d2))/140*.6;
      p.vx+=(dx/Math.sqrt(d2+.001))*force*.04;
      p.vy+=(dy/Math.sqrt(d2+.001))*force*.04;
    }
    p.x+=p.vx; p.y+=p.vy; p.a+=.02;
    if(p.y<-20 || p.x<-20 || p.x>W+20){p.x=Math.random()*W; p.y=H+20;}
    ctx.beginPath();
    ctx.fillStyle='#00eaff';
    ctx.shadowColor='#0077ff';
    ctx.shadowBlur=18;
    ctx.arc(p.x+Math.cos(p.a)*.6,p.y+Math.sin(p.a)*.6,p.r,0,6.283);
    ctx.fill();
    ctx.shadowBlur=0;
  });

  requestAnimationFrame(tick);
}
tick();