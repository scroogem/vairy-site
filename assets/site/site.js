'use strict';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const still = new URLSearchParams(location.search).get('still') === '1';
let motion = !reducedMotion.matches && !still;
const easing = 'cubic-bezier(.16,1,.3,1)';
const animations = new Set();
function animate(element, frames, duration = 700, delay = 0) {
  if (!motion || !element) return;
  const animation = element.animate(frames, {duration, delay, easing});
  animations.add(animation);
  animation.finished.catch(() => {}).finally(() => animations.delete(animation));
}

// Finite entrances. Content remains visible if JavaScript or motion is disabled.
const main = document.querySelector('main');
const hero = main.firstElementChild;
animate(hero?.querySelector('h1'), [
  {clipPath:'inset(0 0 18% 0)', transform:'translateY(16px)', opacity:.75},
  {clipPath:'inset(0)', transform:'translateY(0)', opacity:1}
], 950);
animate(hero?.querySelector('.hero-device, .product-orbit'), [
  {translate:'0 28px', opacity:.65, filter:'blur(3px)'},
  {translate:'0 0', opacity:1, filter:'blur(0)'}
], 1100, 100);
hero?.querySelectorAll('.practice-plane, .match-plane, .chat-plane').forEach((plane,index)=>{
  animate(plane,[{clipPath:'inset(0 0 12% 0)',translate:'0 24px',opacity:.65},{clipPath:'inset(0)',translate:'0 0',opacity:1}],1000,index*100);
});

const entranceObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const element = entry.target;
    if (element.matches('.capability-line, .format-strip')) {
      [...element.children].forEach((child, i) => animate(child, [
        {translate:'12px 0', opacity:.55}, {translate:'0 0', opacity:1}
      ], 600, i * 60));
    } else if (element.matches('.work-row, .project-link, .release-facts>div')) {
      animate(element, [{clipPath:'inset(0 6% 0 0)', opacity:.7}, {clipPath:'inset(0)', opacity:1}], 800);
    } else {
      animate(element, [{translate:'0 14px', opacity:.7}, {translate:'0 0', opacity:1}], 850);
    }
    entranceObserver.unobserve(element);
  }
}, {threshold:.15});
document.querySelectorAll('.section-heading, .learn-copy, .capability-line, .format-strip, .work-row, .project-link, .release-facts>div, .beta h2, .contact h2').forEach(element => entranceObserver.observe(element));

// Scroll is the clock: no perpetual float loops or offscreen work.
const depthElements = [...document.querySelectorAll('[data-scroll-depth]')];
const progress = document.querySelector('.reading-progress');
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const range = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
  for (const element of depthElements) {
    const box = element.getBoundingClientRect();
    if (box.bottom < -100 || box.top > innerHeight + 100) continue;
    const delta = Math.max(-22, Math.min(22, (box.top + box.height / 2 - innerHeight / 2) * .045));
    element.style.translate = motion ? `0 ${delta}px` : '0 0';
  }
}
function scheduleScroll() {
  if (!scrollFrame && !document.hidden) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, {passive:true});
addEventListener('resize', scheduleScroll, {passive:true});
scheduleScroll();

const orbit = document.querySelector('.product-orbit');
if (orbit) {
  orbit.addEventListener('pointermove', event => {
    if (!motion || event.pointerType === 'touch') return;
    const box = orbit.getBoundingClientRect();
    orbit.style.setProperty('--orbit-x', `${(event.clientX - box.left - box.width / 2) * .025}px`);
    orbit.style.setProperty('--orbit-y', `${(event.clientY - box.top - box.height / 2) * .02}px`);
  });
  orbit.addEventListener('pointerleave', () => {
    orbit.style.setProperty('--orbit-x', '0px');
    orbit.style.setProperty('--orbit-y', '0px');
  });
}

function initializePhotoStudy() {
  const stage = document.querySelector('.optical-stage');
  if (!stage) return () => {};
  const canvas = stage.querySelector('canvas');
  const context = canvas.getContext('2d', {alpha:false});
  const shutter = stage.querySelector('#shutter');
  const caption = stage.querySelector('#shutter-caption');
  if (!context) {shutter.hidden = true; caption.textContent = 'Aperto photo study'; return () => {};}
  const photoLayer = document.createElement('canvas');
  const asciiLayer = document.createElement('canvas');
  const sampling = document.createElement('canvas');
  const photo = new Image();
  const reticle = document.createElement('div');
  reticle.className = 'focus-reticle'; reticle.setAttribute('aria-hidden','true');
  for (let i=0;i<4;i++) reticle.append(document.createElement('i'));
  stage.append(reticle);
  const wash = document.createElement('div');
  wash.className = 'shutter-wash'; wash.setAttribute('aria-hidden','true'); stage.append(wash);
  let width=1, height=1, ratio=1, ready=false, inView=false, frameId=0;
  let lastTime=0, reveal=.34, target=.34, hovering=false, focus=0;
  let pointer={x:.61,y:.48}, current={...pointer};
  const start=performance.now();
  let lens=null, lensStarted=false;
  const lensCanvas=document.createElement('canvas');
  lensCanvas.className='optical-lens';lensCanvas.setAttribute('aria-hidden','true');lensCanvas.hidden=true;
  canvas.after(lensCanvas);stage.dataset.lensRenderer='canvas';
  function startLens() {
    if (lensStarted || !motion) return;
    lensStarted=true;
    import('./optical-lens.js').then(module=>module.createOpticalLens(lensCanvas,photoLayer,()=>{lens=null;lensCanvas.hidden=true;stage.dataset.lensRenderer='canvas';schedule();})).then(result=>{
      lens=result;
      if (lens) stage.dataset.lensRenderer='webgpu';
      schedule();
    }).catch(()=>{});
  }
  shutter.disabled = true;

  function build() {
    if (!ready) return;
    const box=stage.getBoundingClientRect();
    if (box.width < 1) return;
    width=box.width; height=box.height; ratio=Math.min(devicePixelRatio || 1, 1.5);
    for (const layer of [canvas,photoLayer,asciiLayer]) {
      layer.width=Math.round(width*ratio); layer.height=Math.round(height*ratio);
    }
    const picture=photoLayer.getContext('2d');
    const scale=Math.max(photoLayer.width/photo.width,photoLayer.height/photo.height);
    picture.drawImage(photo,(photoLayer.width-photo.width*scale)/2,(photoLayer.height-photo.height*scale)*.43,photo.width*scale,photo.height*scale);
    const cell=width<600 ? 8 : 10;
    const cols=Math.ceil(width/cell), rows=Math.ceil(height/(cell*1.23));
    sampling.width=cols; sampling.height=rows;
    const sample=sampling.getContext('2d',{willReadFrequently:true});
    sample.drawImage(photoLayer,0,0,cols,rows);
    const pixels=sample.getImageData(0,0,cols,rows).data;
    const glyphs=' .,:;i+=xo*#%@';
    const paint=asciiLayer.getContext('2d');
    paint.fillStyle='#14182f'; paint.fillRect(0,0,asciiLayer.width,asciiLayer.height);
    paint.font=`${cell*ratio}px monospace`; paint.textAlign='center'; paint.textBaseline='middle';
    for(let y=0;y<rows;y++) for(let x=0;x<cols;x++) {
      const offset=(y*cols+x)*4;
      const light=(pixels[offset]*.2126+pixels[offset+1]*.7152+pixels[offset+2]*.0722)/255;
      const index=Math.min(glyphs.length-1,Math.floor(Math.pow(light,.72)*(glyphs.length-1)));
      paint.fillStyle=`rgb(${Math.round(85+light*126)},${Math.round(117+light*123)},${Math.round(158+light*81)})`;
      paint.fillText(glyphs[index],(x+.5)*width/cols*ratio,(y+.5)*height/rows*ratio);
    }
    lens?.resize();
    draw(performance.now()); schedule();
  }
  function draw(time) {
    if (!ready) return;
    context.drawImage(asciiLayer,0,0);
    const cx=current.x*canvas.width, cy=current.y*canvas.height;
    const farthest=Math.hypot(Math.max(cx,canvas.width-cx),Math.max(cy,canvas.height-cy));
    const radius=reveal*farthest*1.16;
    if (radius>1) {
      context.save(); context.beginPath();
      for (let blade=0;blade<6;blade++) {
        const angle=blade*Math.PI/3+Math.PI/6+(1-reveal)*.3;
        const x=cx+Math.cos(angle)*radius,y=cy+Math.sin(angle)*radius;
        blade ? context.lineTo(x,y) : context.moveTo(x,y);
      }
      context.closePath();context.clip();
      context.drawImage(photoLayer,0,0); context.restore();
      if (reveal>.01 && reveal<.98) {
        context.strokeStyle='#d7e8fc77'; context.lineWidth=ratio; context.stroke();
      }
    }
    const inspect=hovering && motion && focus>1;
    lensCanvas.hidden=!inspect || !lens;
    if (inspect && lens) lens.draw(current.x,current.y,focus*ratio);
    else if (inspect) {
      const size=focus*ratio;
      context.save();context.beginPath();context.arc(cx,cy,size,0,Math.PI*2);context.clip();
      context.drawImage(photoLayer,cx-size/1.3,cy-size/1.3,size*2/1.3,size*2/1.3,cx-size,cy-size,size*2,size*2);
      context.restore();
    }
    const age=time-start;
    if (motion && age<1800 && reveal<.95) {
      const scan=(age/1800)*canvas.height;
      context.save(); context.globalAlpha=.1;
      context.drawImage(photoLayer,0,scan,canvas.width,14*ratio,0,scan,canvas.width,14*ratio);
      context.restore();
    }
  }
  function frame(time) {
    frameId=0;
    if (!ready || !inView || document.hidden) {lastTime=0;return;}
    const dt=Math.min(40,lastTime ? time-lastTime : 16.7); lastTime=time;
    const openRate=motion ? 1-Math.exp(-dt/155) : 1;
    const pointerRate=motion ? 1-Math.exp(-dt/28) : 1;
    reveal+=(target-reveal)*openRate;
    current.x+=(pointer.x-current.x)*pointerRate; current.y+=(pointer.y-current.y)*pointerRate;
    focus+=((hovering && motion ? 82 : 0)-focus)*(1-Math.exp(-dt/60));
    if (Math.abs(target-reveal)<.001) reveal=target;
    draw(time);
    const moving=Math.abs(pointer.x-current.x)+Math.abs(pointer.y-current.y)>.0001;
    const focusing=Math.abs((hovering && motion ? 82 : 0)-focus)>.1;
    if (reveal!==target || moving || focusing || (motion && time-start<1800)) schedule();
  }
  function schedule() {if(!frameId && ready && inView && !document.hidden) frameId=requestAnimationFrame(frame);}
  photo.onload=()=>{ready=true;shutter.disabled=false;build();};
  photo.onerror=()=>{shutter.disabled=true;caption.textContent='Photo study unavailable. Reload to retry.';};
  photo.src='/assets/site/mountain.jpg';
  new ResizeObserver(build).observe(stage);
  new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;
    if (!inView && frameId) {cancelAnimationFrame(frameId);frameId=0;lastTime=0;}
    if (!inView) {hovering=false;lensCanvas.hidden=true;reticle.style.opacity='0';}
    schedule();
  },{threshold:.01}).observe(stage);
  document.addEventListener('visibilitychange',schedule);
  shutter.addEventListener('click',()=>{
    target=target===1 ? .34 : 1;
    if (!motion) reveal=target;
    shutter.setAttribute('aria-pressed',String(target===1));
    shutter.setAttribute('aria-label',target===1 ? 'Return to the photo aperture' : 'Reveal the color photograph');
    caption.textContent=target===1 ? 'Back to aperture' : 'Open the image';
    animate(wash,[{opacity:0},{opacity:.12,offset:.25},{opacity:0}],250);
    draw(performance.now());schedule();
  });
  stage.addEventListener('pointermove',event=>{
    if (!motion || event.pointerType==='touch') return;
    const box=stage.getBoundingClientRect();
    pointer={x:(event.clientX-box.left)/width,y:(event.clientY-box.top)/height}; hovering=true;
    startLens();
    // The focus frame follows the pointer immediately; the photo aperture eases over 28ms.
    reticle.style.transform=`translate(${pointer.x*width-25}px,${pointer.y*height-25}px)`;
    reticle.style.opacity='1';
    stage.querySelector('.phone-plane').style.transform=`rotateY(${-13+(pointer.x-.5)*8}deg) rotateZ(${5+(pointer.y-.5)*3}deg)`;
    schedule();
  });
  stage.addEventListener('pointerleave',()=>{
    hovering=false;lensCanvas.hidden=true;reticle.style.opacity='0';stage.querySelector('.phone-plane').style.transform='';schedule();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){hovering=false;lensCanvas.hidden=true;reticle.style.opacity='0';if(frameId)cancelAnimationFrame(frameId);frameId=0;}});
  addEventListener('pagehide',()=>lens?.destroy(),{once:true});
  return ()=>{reveal=target;hovering=false;focus=0;reticle.style.opacity='0';stage.querySelector('.phone-plane').style.transform='';draw(performance.now());schedule();};
}
const resetPhotoMotion=initializePhotoStudy();
reducedMotion.addEventListener('change',()=>{
  motion=!reducedMotion.matches && !still;
  if (!motion) {
    for (const animation of animations) animation.cancel();
    orbit?.style.setProperty('--orbit-x','0px');orbit?.style.setProperty('--orbit-y','0px');
  }
  resetPhotoMotion();scheduleScroll();
});

// Authored examples show the product loop; they do not call an AI service.
const replies = {
  hello: {human:'How’s your day going?', partner:'Hey.', coach:'Give them a detail to respond to. Try sharing something about your day, then asking about theirs.'},
  detail: {human:'I tried a new climbing place today. It was harder than I expected.', partner:'Oh, nice. I’ve never tried climbing.', coach:'A specific detail gives your partner something to pick up on. Now connect your next question to their reply.'},
  followup: {human:'Would you give climbing a try, or is there something else you like doing after work?', partner:'I usually go for a run. Trying climbing could be fun.', coach:'The question follows the shared topic and leaves room for their own interest. Listen for a detail you can explore next.'}
};
const replyChoices=document.querySelector('.reply-choices');
const practiceSpread=document.querySelector('.practice-spread');
const practiceViews=document.querySelector('.practice-views');
if(practiceViews) {
  practiceViews.hidden=false;
  practiceViews.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    practiceSpread.dataset.activeScreen=button.dataset.practiceView;
    practiceViews.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
}
if (replyChoices) {
  replyChoices.hidden=false;
  replyChoices.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    const reply=replies[button.dataset.reply];
    document.querySelector('.human-message').textContent=reply.human;
    document.querySelector('.partner-message').textContent=reply.partner;
    document.querySelector('.coach-message p').textContent=reply.coach;
    const messages=document.querySelector('#conversation-messages');
    const human=messages.querySelector('.human-message'),partner=messages.querySelector('.partner-message');
    messages.prepend(...(button.dataset.reply==='hello'?[partner,human]:[human,partner]));
    replyChoices.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    animate(document.querySelector('#conversation-messages'),[{translate:'0 8px',opacity:.6},{translate:'0 0',opacity:1}],330);
  }));
}

const decisions = {
  context:{title:'A situation comes first.',description:'A contextual first question leads straight into a short practice session with an opening already in place.',purpose:'A concrete start. Immediate experience of the product.',question:'What feels difficult?',items:['Starting a conversation','Keeping it going','Connecting deeper']},
  partner:{title:'The user does the work.',description:'The partner starts with short, guarded replies. The user has to build rapport and keep the exchange going.',purpose:'Practice creating a conversation and earning engagement.',question:'The conversation starts small.',items:['Partner: “Hey.”','User: makes the next move','Rapport develops through the exchange']},
  coach:{title:'Two roles. One learning loop.',description:'The partner responds naturally. The coach evaluates the user’s own reply with a specific tip and a concrete example.',purpose:'The next attempt has something useful to work with.',question:'Practice with or without live tips.',items:['Coach & Partner','Only Partner','Specific feedback on the user’s message']},
  value:{title:'Completed practice is the unit.',description:'Finishing a session advances the streak and updates skill feedback. The main metric tracks completed sessions per weekly active user.',purpose:'The habit and measurement follow the same useful activity.',question:'A session completed.',items:['Streak advances','Skill feedback updates','Completed sessions / weekly active users']},
};
document.querySelectorAll('[data-decision]').forEach(button => button.addEventListener('click',() => {
  const data = decisions[button.dataset.decision];
  document.querySelectorAll('[data-decision]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
  document.querySelector('#decision-title').textContent = data.title;
  document.querySelector('#decision-description').textContent = data.description;
  document.querySelector('#decision-purpose').textContent = data.purpose;
  document.querySelector('#decision-art>span').textContent = data.question;
  const holder = document.querySelector('#decision-art>div');
  holder.replaceChildren(...data.items.map(text => {const item = document.createElement('span');item.textContent = text;return item;}));
  if (motion) document.querySelector('.decision-art').animate(
    [{opacity:.45,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],
    {duration:320,easing:'cubic-bezier(.16,1,.3,1)'});
}));

// A visual studio companion. No AI request, account or external script.
const companion = document.querySelector('.site-companion');
if (companion) {
  const button = companion.querySelector('button');
  const note = companion.querySelector('.companion-note');
  const closeNote = () => {note.hidden=true;button.setAttribute('aria-expanded','false');};
  button.addEventListener('click', () => {
    note.hidden = !note.hidden;
    button.setAttribute('aria-expanded',String(!note.hidden));
    if (!note.hidden) animate(button.querySelector('svg'),[{rotate:'0deg'},{rotate:'-12deg',offset:.25},{rotate:'10deg',offset:.6},{rotate:'0deg'}],360);
    animate(note,[{opacity:.5,translate:'0 6px'},{opacity:1,translate:'0 0'}],230);
  });
  document.addEventListener('keydown', event => {if (event.key === 'Escape') closeNote();});
  document.addEventListener('pointerdown', event => {if (!companion.contains(event.target)) closeNote();});
  document.addEventListener('pointermove', event => {
    if (!motion || event.pointerType === 'touch') return;
    const box = button.getBoundingClientRect();
    button.style.setProperty('--eye-x',`${Math.max(-1,Math.min(1,(event.clientX-box.left-box.width/2)/200))}px`);
    button.style.setProperty('--eye-y',`${Math.max(-.5,Math.min(.5,(event.clientY-box.top-box.height/2)/300))}px`);
  },{passive:true});
  function walk() {
    if (!motion || document.hidden) return;
    button.classList.add('is-walking');
    const journey = button.querySelector('svg').animate([{translate:'-8px 0'},{translate:'0 0'}],{duration:1800,easing});
    animations.add(journey);
    journey.finished.catch(()=>{}).finally(()=>{button.classList.remove('is-walking');animations.delete(journey);});
  }
  walk();
  document.addEventListener('visibilitychange',()=>{if (document.hidden) {for (const animation of animations) animation.cancel();closeNote();}});
  reducedMotion.addEventListener('change',()=>{button.style.setProperty('--eye-x','0px');button.style.setProperty('--eye-y','0px');});
}

const reel = document.querySelector('.screen-reel');
reel?.addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const stride = reel.children[1].offsetLeft - reel.children[0].offsetLeft;
  const next = Math.round(reel.scrollLeft / stride) + (event.key === 'ArrowRight' ? 1 : -1);
  // Immediate keyboard steps remain deterministic even with repeated keys and Reduce Motion.
  reel.scrollTo({left:next * stride,behavior:'auto'});
});

// The original interest prompt fills an illustrative composer; it never sends a message.
const openingChoices=document.querySelector('.opening-choices');
if(openingChoices) {
  openingChoices.hidden=false;
  const prompts={books:'Currently reading what?',gaming:'What are you playing?'};
  openingChoices.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    document.querySelector('#opening-message').textContent=prompts[button.dataset.opening];
    openingChoices.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    animate(document.querySelector('.opening-composer'),[{clipPath:'inset(0 8% 0 0)',opacity:.6},{clipPath:'inset(0)',opacity:1}],350);
    animate(document.querySelector('.match-connection'),[{strokeDasharray:'1000',strokeDashoffset:'1000'},{strokeDasharray:'1000',strokeDashoffset:'0'}],700);
  }));
}

// Explore complete original captures; loading is resolved before a screen is switched.
const cameraViews=document.querySelector('.camera-views');
if (cameraViews) {
  const screen=document.querySelector('#camera-screen'), caption=document.querySelector('#camera-caption');
  const screens={manual:['manual.png','Original Aperto manual-camera interface','Manual camera'],editor:['editor.png','Original Aperto editor with light and color controls','Light & color editor'],school:['school.png','Original Aperto Pro School with seven practical photography lessons','7 practical lessons']};
  let request=0;
  cameraViews.hidden=false;
  cameraViews.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    const ticket=++request,[file,alt,label]=screens[button.dataset.cameraView],image=new Image();
    caption.textContent='Loading screen…';
    image.onload=()=>{
      if(ticket!==request)return;
      screen.src=image.src;screen.alt=alt;screen.closest("button").setAttribute("aria-label",`Inspect original screen: ${alt}`);caption.textContent=label;
      cameraViews.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      animate(screen,[{opacity:.45,filter:'blur(2px)'},{opacity:1,filter:'blur(0)'}],280);
    };
    image.onerror=()=>{if(ticket===request)caption.textContent='Screen unavailable. Select a view to retry.';};
    image.src='/assets/site/'+file;
  }));
}

// A clearly labelled photographic study, independent of the app's processing.
const lightStudy=document.querySelector('.light-study');
if(lightStudy) {
  const exposure=lightStudy.querySelector('#study-exposure'),warmth=lightStudy.querySelector('#study-warmth');
  const picture=lightStudy.querySelector('.light-picture'),temperature=lightStudy.querySelector('.light-temperature');
  function updateLight() {
    const ev=Number(exposure.value),warm=Number(warmth.value);
    const tone=warm===0?'Neutral':`${Math.abs(warm)}% ${warm>0?'warm':'cool'}`;
    picture.style.setProperty('--brightness',String(2**ev));
    temperature.style.background=warm>0?'#ffab58':'#78bcff';
    temperature.style.opacity=String(Math.abs(warm)/100*.32);
    lightStudy.querySelector('#exposure-value').textContent=`${ev>0?'+':''}${ev.toFixed(1)} EV`;
    lightStudy.querySelector('#warmth-value').textContent=tone;
    exposure.setAttribute('aria-valuetext',`${ev.toFixed(1)} exposure stops`);warmth.setAttribute('aria-valuetext',tone);
    lightStudy.querySelector('.study-reset').disabled=ev===0&&warm===0;
  }
  lightStudy.hidden=false;
  exposure.addEventListener('input',updateLight);warmth.addEventListener('input',updateLight);
  lightStudy.querySelector('.study-reset').addEventListener('click',()=>{exposure.value='0';warmth.value='0';updateLight();});
  updateLight();
}

// A local reflection follows input on physical artifacts, then rests.
const reflectiveSurfaces=[...document.querySelectorAll('.app-screen, .tryio-artifact, .connection-artifacts figure')];
reflectiveSurfaces.forEach(surface=>{
  surface.classList.add('reflective-surface');
  surface.addEventListener('pointermove',event=>{
    if(!motion||event.pointerType==='touch')return;
    const box=surface.getBoundingClientRect();
    surface.style.setProperty('--shine-x',`${(event.clientX-box.left)/box.width*100}%`);
    surface.style.setProperty('--shine-y',`${(event.clientY-box.top)/box.height*100}%`);
    surface.classList.add('is-reflecting');
  },{passive:true});
  surface.addEventListener('pointerleave',()=>surface.classList.remove('is-reflecting'));
});
function resetReflections(){reflectiveSurfaces.forEach(surface=>surface.classList.remove('is-reflecting'));}
reducedMotion.addEventListener('change',resetReflections);
document.addEventListener('visibilitychange',()=>{if(document.hidden)resetReflections();});

// Native dialog protects focus while inspecting complete, unmodified originals.
const originalScreens=[...document.querySelectorAll('.hero-device img, .editor-phone img, .lesson-phone img, .screen-reel img, .tryio-artifact img, .connection-artifacts img, .practice-plane img, .match-spread img')];
if(originalScreens.length) {
  const dialog=document.createElement('dialog');dialog.className='screen-viewer';dialog.setAttribute('aria-labelledby','viewer-caption');
  dialog.innerHTML='<div class="viewer-panel"><div class="viewer-toolbar"><h2 id="viewer-caption"></h2><button class="viewer-close" aria-label="Close screen viewer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="viewer-navigation"><button class="viewer-prev" aria-label="Previous original screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m5-5-5 5 5 5"/></svg></button><span class="viewer-count"></span><button class="viewer-next" aria-label="Next original screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></button></div></div>';
  document.body.append(dialog);
  const image=document.createElement('img'),prev=dialog.querySelector('.viewer-prev'),next=dialog.querySelector('.viewer-next');
  image.className='viewer-image';dialog.querySelector('.viewer-navigation').before(image);
  let selected=0,trigger;
  function show(index) {
    selected=Math.max(0,Math.min(originalScreens.length-1,index));
    const original=originalScreens[selected];
    image.src=original.currentSrc||original.src;image.alt=original.alt;
    dialog.querySelector('h2').textContent=original.alt;
    dialog.querySelector('.viewer-count').textContent=`${selected+1} / ${originalScreens.length}`;
    prev.disabled=selected===0;next.disabled=selected===originalScreens.length-1;
  }
  originalScreens.forEach((original,index)=>{
    if(original.closest('a,button'))return;
    const button=document.createElement('button');button.className='screen-expand';button.type='button';
    button.setAttribute('aria-label',`Inspect original screen: ${original.alt}`);button.setAttribute('aria-haspopup','dialog');
    original.before(button);button.append(original);
    button.addEventListener('click',()=>{trigger=button;show(index);dialog.showModal();document.body.classList.add('viewing-screen');});
  });
  prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
  dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();show(selected+(event.key==='ArrowRight'?1:-1));
  });
  dialog.addEventListener('close',()=>{document.body.classList.remove('viewing-screen');trigger?.focus({preventScroll:true});});
  image.addEventListener('error',()=>{dialog.querySelector('h2').textContent='Screen unavailable. Close and select it again to retry.';});
}
