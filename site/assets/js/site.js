/* FinancesHome, interactions du site public */
(function(){
  var doc=document.documentElement;
  // Menu mobile
  var btn=document.querySelector('.menu-btn');
  if(btn){btn.addEventListener('click',function(){var open=doc.classList.toggle('menu-open');btn.setAttribute('aria-expanded',open?'true':'false');});
    document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){doc.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');});});}
  // Année
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  // Simulateur indicatif (page Financement)
  var sim=document.getElementById('sim');
  if(sim){
    var sites=document.getElementById('sim-sites'),budget=document.getElementById('sim-budget'),type=document.getElementById('sim-type');
    var out=function(){
      document.getElementById('sim-sites-out').textContent=sites.value;
      var lc={fr:'fr-FR',en:'en-GB',es:'es-ES'}[(doc.lang||'fr').slice(0,2)]||'fr-FR';document.getElementById('sim-budget-out').textContent=(lc==='en-GB'?'€'+Number(budget.value).toLocaleString(lc):Number(budget.value).toLocaleString(lc)+' €');
      var score=(+sites.value)*Math.sqrt(+budget.value/50000)*(+type.value);
      var SL={fr:[['Très élevé','Plusieurs opérations valorisables probables. Une étude de gisement multisites est recommandée.'],['Élevé','Le projet présente un potentiel CEE significatif à confirmer par l\'étude.'],['À qualifier','Le potentiel dépend des équipements retenus et des fiches applicables.'],['Exploratoire','Une première analyse permettra de savoir si les CEE sont mobilisables.']],
        en:[['Very high','Several measures are likely to qualify. A multi-site potential study is recommended.'],['High','The project shows significant certificate potential, to be confirmed by the study.'],['To be assessed','The potential depends on the equipment chosen and the applicable measures.'],['Exploratory','A first review will show whether certificates can be claimed.']],
        es:[['Muy alto','Varias actuaciones podrían ser valorizables. Se recomienda un estudio de potencial multisede.'],['Alto','El proyecto presenta un potencial CAE significativo, a confirmar con el estudio.'],['Por calificar','El potencial depende de los equipos elegidos y de las fichas aplicables.'],['Exploratorio','Un primer análisis indicará si los CAE son movilizables.']]}[(doc.lang||'fr').slice(0,2)]||[];
      var lvl=SL[score>45?0:score>20?1:score>8?2:3];
      document.getElementById('sim-level').textContent=lvl[0];document.getElementById('sim-text').textContent=lvl[1];
    };
    [sites,budget,type].forEach(function(e){e.addEventListener('input',out);});out();
  }

  // Formulaires
  var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var LG=(doc.lang||'fr').slice(0,2);
  var M={fr:{req:'Ce champ est obligatoire.',chk:'Cochez cette case pour continuer.',email:'Indiquez une adresse email valide.',siren:'Le SIREN doit comporter 9 chiffres.',nif:'Indiquez un NIF ou CIF valide.',sending:'Envoi en cours',fail:"L'envoi n'a pas abouti. Réessayez dans un instant ou écrivez-nous à contact@financeshome.com."},
         en:{req:'This field is required.',chk:'Please tick this box to continue.',email:'Please enter a valid email address.',siren:'The SIREN number must have 9 digits.',nif:'Please enter a valid tax ID.',sending:'Sending',fail:'Your request could not be sent. Please try again shortly or email contact@financeshome.com.'},
         es:{req:'Este campo es obligatorio.',chk:'Marque esta casilla para continuar.',email:'Introduzca un correo electrónico válido.',siren:'El SIREN debe tener 9 cifras.',nif:'Introduzca un NIF o CIF válido.',sending:'Enviando',fail:'No se ha podido enviar. Inténtelo de nuevo o escríbanos a contact@financeshome.com.'}}[LG]||null;
  if(!M)M={req:'Ce champ est obligatoire.',chk:'Cochez cette case pour continuer.',email:'Indiquez une adresse email valide.',siren:'Le SIREN doit comporter 9 chiffres.',nif:'NIF',sending:'Envoi en cours',fail:'Erreur.'};
  document.querySelectorAll('form[data-form]').forEach(function(form){
    var err=form.querySelector('.form-error'),done=form.querySelector('.form-done'),submit=form.querySelector('button[type=submit]'),label=submit?submit.textContent:'';
    var started=Date.now();
    var ts=form.querySelector('input[name=_ts]');if(ts)ts.value=String(started);
    function fail(msg,el){if(el){el.setAttribute('aria-invalid','true');el.focus();}err.textContent=msg;err.hidden=false;}
    form.addEventListener('submit',function(ev){
      ev.preventDefault();err.hidden=true;
      form.querySelectorAll('[aria-invalid]').forEach(function(e){e.removeAttribute('aria-invalid');});
      var req=form.querySelectorAll('[required]');
      for(var i=0;i<req.length;i++){var f=req[i];
        if(f.type==='checkbox'&&!f.checked)return fail(f.getAttribute('data-msg')||M.chk,f);
        if(f.type!=='checkbox'&&!String(f.value).trim())return fail(f.getAttribute('data-msg')||M.req,f);
        if(f.type==='email'&&!EMAIL.test(f.value.trim()))return fail(M.email,f);
        if(f.name==='siren'&&!/^\d{9}$/.test(f.value.replace(/\s/g,'')))return fail(M.siren,f);
        if(f.name==='nif'&&!/^[A-Za-z0-9]{8,10}$/.test(f.value.replace(/[\s.-]/g,'')))return fail(M.nif,f);
      }
      var data={};
      new FormData(form).forEach(function(v,k){if(data[k]!==undefined){data[k]=[].concat(data[k],v);}else{data[k]=v;}});
      data._form=form.getAttribute('data-form');data._lang=LG;
      submit.disabled=true;submit.textContent=M.sending;
      fetch(form.getAttribute('action')||'api/form.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {ok:false};}).then(function(j){if(!r.ok||!j.ok)throw new Error(j.error||'send');});})
        .then(function(){
          form.querySelectorAll('input,select,textarea').forEach(function(e){e.disabled=true;});
          submit.hidden=true;var n=form.querySelector('.form-note');if(n)n.hidden=true;done.hidden=false;done.focus&&done.focus();
        })
        .catch(function(e){
          submit.disabled=false;submit.textContent=label;
          fail(e&&e.message&&e.message!=='send'&&e.message!=='Failed to fetch'?e.message:M.fail);
        });
    });
  });
})();

/* ===== Animations ===== */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vh=window.innerHeight||800;
  function below(el){return el.getBoundingClientRect().top>vh*0.92;}
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;io.unobserve(el);el.classList.remove('pre');el.classList.add('on');if(el.__run)el.__run();}});},{threshold:.18,rootMargin:'0px 0px -6% 0px'}):null;
  function watch(el,run){el.__run=run;if(!io||reduce||!below(el)){el.classList.add('on');run&&run();return;}if(el.matches('.journey'))el.classList.add('pre');io.observe(el);}

  // Apparition décalée des blocs
  var groups='.section-head,.grid,.journey,.roles,.pt-flow,.split>div,.split>.dash,.split>.hp-visual,.form-shell,.sim,.page-hero .wrap>*,.steps,.flow-right,.actors,.actors-cta,.stats-grid,.plans,.cta-final .wrap>*,.mob-visual';
  document.querySelectorAll(groups).forEach(function(g){
    var kids=g.matches('.grid,.pt-flow,.steps,.stats-grid,.plans')?g.children:[g];
    Array.prototype.forEach.call(kids,function(k,i){
      if(k.matches('.journey')||g.matches('.journey'))return;
      k.classList.add('anim');k.style.setProperty('--d',(Math.min(i,6)*0.08)+'s');
      if(!reduce&&io&&below(k)){k.classList.add('pre');io.observe(k);}
    });
  });

  // Étapes numérotées
  document.querySelectorAll('.journey,.pt-flow,.roles').forEach(function(l){
    Array.prototype.forEach.call(l.children,function(li,i){li.style.setProperty('--i',i);li.style.setProperty('--d',(i*0.15)+'s');});
    watch(l);
  });

  // Barres du tableau de bord
  document.querySelectorAll('.bars').forEach(function(b){
    b.querySelectorAll('.bar-row').forEach(function(r,i){r.querySelector('.fill').style.setProperty('--i',i);});
    if(!reduce&&io&&below(b)){b.classList.add('wait');watch(b,function(){b.classList.remove('wait');});}
    else if(!reduce){b.classList.add('wait');requestAnimationFrame(function(){requestAnimationFrame(function(){b.classList.remove('wait');});});}
  });

  // Compteurs
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),suffix=el.getAttribute('data-suffix')||'';
    watch(el,function(){
      if(reduce){el.textContent=target.toLocaleString('fr-FR')+suffix;return;}
      var t0=null,dur=target>20?1400:900;
      function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);var e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e).toLocaleString(document.documentElement.lang||'fr')+suffix;if(p<1)requestAnimationFrame(step);}
      el.textContent='0'+suffix;requestAnimationFrame(step);
    });
  });

  // Mot qui change dans le titre
  document.querySelectorAll('.rotator[data-words]').forEach(function(el){
    if(reduce)return;
    var words=el.getAttribute('data-words').split('|'),i=0;
    setInterval(function(){
      el.classList.add('out');
      setTimeout(function(){i=(i+1)%words.length;el.textContent=words[i];el.classList.remove('out');el.classList.add('in-start');void el.offsetWidth;el.classList.remove('in-start');},450);
    },3200);
  });
})();

/* ===== Design de la maquette : en-tête, fonds animés, machine à écrire, cartes acteurs ===== */
(function(){
  var doc=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  // En-tête : fond de verre dès que l'on défile
  var onScroll=function(){doc.classList.toggle('scrolled',(window.scrollY||0)>24);};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  // Fonds animés en WebGL (repli : dégradés CSS)
  var VS='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS="precision mediump float;uniform vec2 r;uniform float t;uniform float v;\nvoid main(){\n vec2 p=(gl_FragCoord.xy-.5*r)/r.y;\n float a=v<.5?.35:(v<1.5?-.5:.25);float ca=cos(a),sa=sin(a);\n vec2 o=v<.5?vec2(-.1,.05):(v<1.5?vec2(.35,-.02):vec2(.25,.05));\n vec2 q=mat2(ca,-sa,sa,ca)*(p-o);float tt=t*.11;\n q.x+=.18*sin(q.y*2.3+tt*1.7);q.y+=.12*sin(q.x*1.7-tt*1.3);\n float c=.2*sin(q.x*1.8+tt)+.09*sin(q.x*3.4-tt*1.4);float d=q.y-c;\n float lit=.45+.55*sin(q.x*2.2-tt*1.6+1.);\n float edge=exp(-pow(d*16.,2.))*lit;\n float glow=exp(-d*d*10.)*(.4+.6*lit);\n float sheet=smoothstep(.02,-.12,d)*smoothstep(-.75,-.2,d);\n float c2=c-.32+.06*sin(q.x*2.7+tt*1.2);float d2=q.y-c2;\n float edge2=exp(-pow(d2*12.,2.))*(.35+.65*sin(q.x*1.6+tt*1.3+2.));\n vec3 bg=vec3(.039,.039,.071);\n vec3 col=bg;\n col+=sheet*vec3(.04,.05,.2)*(.6+.4*lit);\n col+=glow*vec3(.30,.12,.72)*.45;\n col+=edge*vec3(.82,.66,1.)*.8;\n col+=edge2*vec3(.22,.20,.85)*.4;\n col+=exp(-d2*d2*14.)*vec3(.10,.08,.45)*.4;\n col*=smoothstep(1.4,.25,length(p*vec2(.75,1.)));\n col=mix(bg,col,smoothstep(0.,.3,gl_FragCoord.y/r.y));\n col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)*.02;\n gl_FragColor=vec4(col,1.);}\n";
  function sh(gl,type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
  document.querySelectorAll('.hero,.page-hero,.hp-sec').forEach(function(sec){
    var fx=document.createElement('div');fx.className='fx';fx.setAttribute('aria-hidden','true');
    sec.insertBefore(fx,sec.firstChild);
    var cv=document.createElement('canvas');var gl=null;
    try{gl=cv.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});}catch(e){}
    if(!gl)return;
    var vs=sh(gl,gl.VERTEX_SHADER,VS),fs=sh(gl,gl.FRAGMENT_SHADER,FS);if(!vs||!fs)return;
    var pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;
    gl.useProgram(pr);
    var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    var uR=gl.getUniformLocation(pr,'r'),uT=gl.getUniformLocation(pr,'t'),uV=gl.getUniformLocation(pr,'v');
    gl.uniform1f(uV,sec.classList.contains('hero')?0:(sec.classList.contains('hp-sec')?1:2));
    fx.appendChild(cv);fx.classList.add('gl');
    var k=Math.min(window.devicePixelRatio||1,1.5)*.5,w=0,h=0,on=true,t0=performance.now()-Math.random()*20000;
    function size(){var nw=Math.max(2,Math.round(fx.clientWidth*k)),nh=Math.max(2,Math.round(fx.clientHeight*k));if(nw!==w||nh!==h){w=cv.width=nw;h=cv.height=nh;gl.viewport(0,0,w,h);gl.uniform2f(uR,w,h);}}
    function draw(now){size();gl.uniform1f(uT,(now-t0)/1000);gl.drawArrays(gl.TRIANGLES,0,3);}
    function loop(now){if(!on)return;draw(now);requestAnimationFrame(loop);}
    if(reduce){draw(t0+8000);window.addEventListener('resize',function(){draw(t0+8000);});return;}
    if('IntersectionObserver' in window){new IntersectionObserver(function(es){var vis=es[0].isIntersecting;if(vis&&!on){on=true;requestAnimationFrame(loop);}else if(!vis){on=false;}}).observe(sec);}
    document.addEventListener('visibilitychange',function(){if(document.hidden){on=false;}else if(!on){on=true;requestAnimationFrame(loop);}});
    requestAnimationFrame(loop);
  });

  // Machine à écrire
  document.querySelectorAll('.typer[data-words]').forEach(function(el){
    var tw=el.querySelector('.tw');if(!tw||reduce)return;
    var words=el.getAttribute('data-words').split('|'),wi=0,ci=words[0].length,dir=-1;
    tw.textContent=words[0];
    function tick(){
      var w=words[wi];
      if(dir<0){ci--;tw.textContent=w.slice(0,ci);if(ci<=0){dir=1;wi=(wi+1)%words.length;return setTimeout(tick,350);}return setTimeout(tick,32);}
      w=words[wi];ci++;tw.textContent=w.slice(0,ci);
      if(ci>=w.length){dir=-1;return setTimeout(tick,2400);}
      setTimeout(tick,68);
    }
    setTimeout(tick,2600);
  });

  // Cartes acteurs : ouverture au toucher
  document.querySelectorAll('.actors').forEach(function(box){
    box.querySelectorAll('.actor').forEach(function(a){
      a.addEventListener('click',function(e){if(e.target.closest('a'))return;var was=a.classList.contains('on');box.querySelectorAll('.actor.on').forEach(function(x){x.classList.remove('on');});if(!was)a.classList.add('on');});
      a.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target===a){var l=a.querySelector('a');if(l)l.click();}});
    });
  });

  // Barre de progression de la carte projet
  var vh=window.innerHeight||800;
  document.querySelectorAll('.proj').forEach(function(p){
    if(reduce||!('IntersectionObserver' in window)||p.getBoundingClientRect().top<vh*.9)return;
    p.classList.add('wait');
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();setTimeout(function(){p.classList.remove('wait');},250);}},{threshold:.3});io.observe(p);
  });
})();
