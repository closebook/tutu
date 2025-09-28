// typewriter effect (simple loop)
    const lines = [
      'you make my ordinary days shine. Thank you for being you.',
      'i fall for you a little more every day.',
      'your smile is my favourite sunrise.'
    ];
    let idx = 0, pos = 0, forward = true;
    const tw = document.getElementById('type');
    function tick(){
      const line = lines[idx];
      if(forward){
        pos++;
        tw.textContent = line.slice(0,pos);
        if(pos===line.length){forward=false;setTimeout(tick,1400);return}
      } else {
        pos--;
        tw.textContent = line.slice(0,pos);
        if(pos===0){forward=true;idx=(idx+1)%lines.length}
      }
      setTimeout(tick, forward?80:30);
    }
    tick();

    // surprise: confetti animation
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let W, H, pieces=[];
    function R(n){return Math.random()*n}
    function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
    window.addEventListener('resize',resize);resize();
    function resetConfetti(){pieces=[];for(let i=0;i<160;i++){pieces.push({x:R(W),y:R(H)-H,w:6+R(10),h:8+R(10),vx:-2+R(4),vy:1+R(3),r:R(360),c:["#ff6b9a","#ffd166","#ff9fb3","#ff87b7"][~~(R(4))]})}}
    function draw(){ctx.clearRect(0,0,W,H);for(const p of pieces){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r*Math.PI/180);ctx.fillStyle=p.c;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();p.x+=p.vx;p.y+=p.vy;p.r+=p.vx*2;if(p.y>H+20){p.y=-20;p.x=R(W)}}requestAnimationFrame(draw)}
    draw();

    document.getElementById('surprise').addEventListener('click',()=>{resetConfetti();
      // quick pulse animation
      document.querySelector('.card').animate([{transform:'scale(1)'},{transform:'scale(1.02)'},{transform:'scale(1)'}],{duration:550,easing:'ease-out'});
    });

    // play song (user should replace audio src attribute with a valid URL or local path)
    const song = document.getElementById('song');
    document.getElementById('play').addEventListener('click',()=>{
      if(!song.src){alert('No song selected. Replace the audio src in the HTML with a file or a URL to an mp3.');return}
      if(song.paused) {song.play();document.getElementById('play').textContent='Pause song'} else {song.pause();document.getElementById('play').textContent='Play song'}
    });

    // download as PDF - uses browser print (works nicely for Chrome/Edge/Firefox)
    document.getElementById('download').addEventListener('click',()=>{
      window.print();
    });

    // edit message quick prompt
    document.getElementById('edit').addEventListener('click',()=>{
      const newMsg = prompt('Write a short message for Tutu:', tw.textContent);
      if(newMsg!==null){tw.textContent=newMsg}
    });

    // small accessibility focus: pressing 'T' triggers surprise
    window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='t')document.getElementById('surprise').click()});