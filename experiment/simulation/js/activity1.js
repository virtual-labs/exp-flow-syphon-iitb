let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `
    <div class='divide'>
        <div style='margin-top: 2vw;'>
            <br>
            <h4 class="center-text fs-20px fw-600">Fluid Mechanics: Flow through Syphon</h4>
            <br>
            <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
        </div>
    </div>`;
    maindiv.innerHTML = text;
    setTimeout(() => {
        MathJax.typeset();
    }, 300);
    internal_calculation1();
}
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text('Activity 1', 'act1-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' style='margin-top: 2vw; margin: auto;' id='act1-div'>
      <img src="./images/fig1.png" style="width:45%">
      <br>
      <br>
      <p style="text-align:left">
         A Syphon of diameter ${d}mm connects two reservoirs having a difference in elevation of h<sub>2</sub> = ${h2}m.
      </p>
      <p style="text-align:left">
         The length of the Syphon is ${L}m and the summit is h<sub>1</sub> = ${h1}m above the water level in the upper reservoir.
      </p>
      <p style="text-align:left">
         The length of the pipe from upper reservoir is L<sub>1</sub> = ${L1}m.
      </p>
      <p style="text-align:left">
         Determine the discharge and pressure at the summit. Consider only frcition loss, take f = ${f}.
      </p>
      <p style="text-align:left;">
         By applying Bernoullis equation A & B

         $$
            \\frac{P_A}{\\rho_g} + \\frac{v_A^2}{2g} + Z_A = \\frac{P_B}{\\rho_g} + \\frac{v_B^2}{2g} + Z_B + h_f
         $$\
         <br>
         $$ \\text{Find  } v_B$$
      </p>
      <div id="act1-vb-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-2">
               $$v_B = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='vb-inp' class='form-control fs-16px' /><span style="display:contents;"> m/s</span>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='verify_vb();' id='act1-vf-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function internal_calculation1() {
    d = random1(50, 101);
    h1 = parseFloat(random(1, 2).toFixed(1));
    h2 = random1(15, 21);
    L = random1(350, 401);
    L1 = random1(70, 91);
    v_B = parseFloat(Math.sqrt(h2 * ((2 * g * (d / 1000)) / (4 * f * L))).toFixed(3));
    Q_ms = parseFloat(((Math.PI / 4) * Math.pow((d / 1000), 2) * v_B).toFixed(3));
    Q_ls = Q_ms * 1000;
    p_C = parseFloat((-(Math.pow(v_B, 2) / (2 * g)) -
        h1 -
        (4 * f * L1 * Math.pow(v_B, 2)) / (2 * g * (d / 1000))).toFixed(3));
    console.log(p_C);
}
function verify_vb() {
    let vb_inp = (document.getElementById('vb-inp'));
    console.log(v_B);
    if (!verify_values(parseFloat(vb_inp.value), v_B)) {
        vb_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        vb_inp.style.border = '1px solid #ced4da';
        vb_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let btn = (document.getElementById('act1-vf-btn1'));
    let div = (document.getElementById('act1-vb-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$ v_B = ${v_B} m/s $$
      </p>
      <br>
      <button class='btn btn-info btn-sm std-btn' id="act1-btn1" onclick='load_discharge();'>Next</button>
   `;
    btn && btn.remove();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function load_discharge() {
    let btn = (document.getElementById('act1-btn1'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
      <p style="text-align:left">
         Discharge 
      </p>
      <div>
         $$Q = Av_B$$
      </div>
      <div id="act1-q-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-2">
               $$Q = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='q-ms-inp' class='form-control fs-16px' /><span style="display:contents;"> m<sup>3</sup>/s</span>
            </div>
         </div>
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-2">
               $$Q = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='q-ls-inp' class='form-control fs-16px' /><span style="display:contents;"> lit/s</span>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='verify_discharge();' id='act1-vf-btn2'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_discharge() {
    let q_ms_inp = (document.getElementById('q-ms-inp'));
    let q_ls_inp = (document.getElementById('q-ls-inp'));
    console.log(Q_ms, Q_ls);
    if (!verify_values(parseFloat(q_ms_inp.value), Q_ms)) {
        q_ms_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        q_ms_inp.style.border = '1px solid #ced4da';
        q_ms_inp.disabled = true;
    }
    if (!verify_values(parseFloat(q_ls_inp.value), Q_ls)) {
        q_ls_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        q_ls_inp.style.border = '1px solid #ced4da';
        q_ls_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let btn = (document.getElementById('act1-vf-btn2'));
    let div = (document.getElementById('act1-q-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$ Q = ${Q_ms}m^3/s $$
         $$ Q = ${Q_ls}lit/s $$
      </p>
      <br>
      <button class='btn btn-info btn-sm std-btn' id="act1-btn2" onclick='load_rho_c();'>Next</button>
   `;
    btn && btn.remove();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function load_rho_c() {
    let btn = (document.getElementById('act1-btn2'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
      <p style="text-align:left">
         By applying Bernoullis equation A & C
      </p>
      <div>
         $$
             \\frac{P_A}{\\rho_g} + \\frac{v_A^2}{2g} + Z_A = \\frac{P_C}{\\rho_g} + \\frac{v_C^2}{2g} + Z_C + h_f \\qquad \\qquad (v_C = v_B)
         $$
      </div>
      <div id="act1-rho-c-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-2">
               $$\\frac{P_C}{\\rho_g} = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='rho-c-inp' class='form-control fs-16px' /><span style="display:contents;"> m</span>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='verify_rho_c();' id='act1-vf-btn3'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_rho_c() {
    let rho_c_inp = (document.getElementById('rho-c-inp'));
    console.log(p_C);
    if (!verify_values(parseFloat(rho_c_inp.value), p_C)) {
        rho_c_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        rho_c_inp.style.border = '1px solid #ced4da';
        rho_c_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let btn = (document.getElementById('act1-vf-btn3'));
    let div = (document.getElementById('act1-rho-c-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$ \\frac{P_C}{\\rho_g} = ${p_C}m $$
      </p>
      <br>
      <button class='btn btn-info btn-sm std-btn' id="act1-btn3" onclick='activity_completed();'>Next</button>
   `;
    btn && btn.remove();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function activity_completed() {
    let btn = (document.getElementById('act1-btn3'));
    btn && btn.remove();
    alert('Experiment Completed');
}
activity1();
//# sourceMappingURL=activity1.js.map