(function(){
  // Mobile nav
  var toggle=document.querySelector('.menu-toggle');
  if(toggle){
    toggle.addEventListener('click',function(){
      var open=document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function(a){
      a.addEventListener('click',function(){document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');});
    });
  }
  // Header shadow on scroll
  var header=document.querySelector('.site-header');
  var onScroll=function(){if(header)header.classList.toggle('scrolled',window.scrollY>10);};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('in');});}

  // Year
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  // Contact form validation + submit
  var form=document.getElementById('enquiry-form');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var ok=true;
      form.querySelectorAll('[required]').forEach(function(input){
        var field=input.closest('.field');
        var valid=input.value.trim()!=='' && (input.type!=='email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        field.classList.toggle('invalid',!valid);
        if(!valid)ok=false;
      });
      if(!ok){var first=form.querySelector('.invalid input,.invalid select,.invalid textarea');if(first)first.focus();return;}
      var success=document.querySelector('.form-success');
      var btn=form.querySelector('button[type="submit"]');
      var endpoint=form.getAttribute('action');
      var done=function(){form.reset();if(success){success.style.display='block';success.focus();}btn.disabled=false;btn.textContent='Send enquiry';};
      btn.disabled=true;btn.textContent='Sending…';
      // If a form service endpoint (e.g. Formspree) is configured, post to it.
      if(endpoint && endpoint.indexOf('http')===0){
        fetch(endpoint,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
          .then(done).catch(function(){btn.disabled=false;btn.textContent='Send enquiry';alert('Sorry, something went wrong. Please call or email us directly.');});
      }else{
        // Fallback: open the visitor's email client with the enquiry pre-filled.
        var d=new FormData(form);
        var body='Name: '+d.get('name')+'\nCompany: '+(d.get('company')||'')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'')+'\nService: '+d.get('service')+'\n\n'+d.get('message');
        window.location.href='mailto:'+form.dataset.mailto+'?subject='+encodeURIComponent('Website enquiry — '+d.get('service'))+'&body='+encodeURIComponent(body);
        done();
      }
    });
    form.querySelectorAll('input,select,textarea').forEach(function(i){i.addEventListener('input',function(){i.closest('.field').classList.remove('invalid');});});
  }
})();
