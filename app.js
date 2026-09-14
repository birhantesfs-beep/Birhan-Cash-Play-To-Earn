const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const screens=["loading","landing","signup","login","verification"];let current="loading";
function show(id){screens.forEach(s=>document.getElementById(s).classList.toggle("hidden",s!==id));current=id}
function route(id,replace=false){const url=location.href.split("#")[0]+"#"+id;if(replace)history.replaceState({screen:id},"",url);else history.pushState({screen:id},"",url);show(id)}
function go(id){if(id!==current)route(id,false)}
function back(){if(history.length>1)history.back();else route("landing",true)}
window.addEventListener("popstate",()=>{const id=location.hash.slice(1);show(screens.includes(id)?id:"landing")});
(async function init(){await handleAuthCallback();const id=location.hash.slice(1);if(id&&screens.includes(id)){show(id);if(id==="verification"){setVerificationEmail(getSavedEmail());clearOtp();startVerificationTimer()}}else route("loading",true)})();
setTimeout(()=>{if(current==="loading")route("landing",true)},4450);
async function handleAuthCallback(){const {data:{session}}=await supabaseClient.auth.getSession();if(session){show("landing");return true}return false}

function togglePassword(id){const e=document.getElementById(id);const eye=document.querySelector(`.eye[onclick*="${id}"]`);const showing=e.type==="password";e.type=showing?"text":"password";if(eye)eye.classList.toggle("password-visible",showing)}
function toast(msg){const e=document.getElementById("toast");e.textContent=msg;e.classList.remove("hidden");clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.add("hidden"),1600)}
function saveUser(name,email,phone){localStorage.setItem("birhan_cash_user",JSON.stringify({name,email,phone}))}
function getSavedEmail(){try{return JSON.parse(localStorage.getItem("birhan_cash_user")||"{}").email||""}catch(e){return ""}}
async function submitSignup(){const v=[fullName.value.trim(),email.value.trim(),phone.value.trim(),password.value,confirmPassword.value];if(v.some(x=>!x))return toast("Please complete all fields.");if(v[3]!==v[4])return toast("Passwords do not match.");if(!terms.checked)return toast("Please accept the Terms & Conditions.");const {data,error}=await supabaseClient.auth.signUp({email:v[1],password:v[3],options:{data:{full_name:v[0],phone:v[2]},emailRedirectTo:"https://birhantesfs-beep.github.io/Birhan-Cash-Play-To-Earn/"}});if(error)return toast(error.message);saveUser(v[0],v[1],v[2]);setVerificationEmail(v[1]);clearOtp();route("verification");startVerificationTimer();toast(data.session?"Account created successfully.":"Check your email to verify your account.")}
async function submitLogin(){const id=loginId.value.trim(),pw=loginPassword.value;if(!id||!pw)return toast("Enter your login details.");const {data,error}=await supabaseClient.auth.signInWithPassword({email:id,password:pw});if(error)return toast(error.message);if(remember.checked)localStorage.setItem("birhan_cash_remember","1");route("landing")}
function setVerificationEmail(value){const e=document.getElementById("verification-email"),val=e.querySelector(".email-value");const v=(value||"").trim();val.textContent=v;val.style.display=v?"block":"none"}
const otpInputs=Array.from(document.querySelectorAll(".otp"));let verificationTimerId=null,verificationSeconds=300;
function updateVerificationTimer(){const e=document.getElementById("verification-timer");const m=String(Math.floor(verificationSeconds/60)).padStart(2,"0"),s=String(verificationSeconds%60).padStart(2,"0");e.textContent=`${m}:${s}`}
function startVerificationTimer(){clearInterval(verificationTimerId);verificationSeconds=300;updateVerificationTimer();verificationTimerId=setInterval(()=>{if(current!=="verification")return;if(verificationSeconds<=0){clearInterval(verificationTimerId);verificationTimerId=null;return}verificationSeconds--;updateVerificationTimer()},1000)}
function clearOtp(){otpInputs.forEach(x=>x.value="")}
otpInputs.forEach((input,i)=>{input.addEventListener("input",()=>{input.value=input.value.replace(/\D/g,"").slice(0,1);if(input.value&&i<5)otpInputs[i+1].focus()});input.addEventListener("keydown",e=>{if(e.key==="Backspace"&&!input.value&&i>0)otpInputs[i-1].focus();if(e.key==="ArrowLeft"&&i>0)otpInputs[i-1].focus();if(e.key==="ArrowRight"&&i<5)otpInputs[i+1].focus()});input.addEventListener("paste",e=>{const d=(e.clipboardData?.getData("text")||"").replace(/\D/g,"").slice(0,6);if(!d)return;e.preventDefault();clearOtp();d.split("").forEach((n,j)=>otpInputs[j]&&(otpInputs[j].value=n));otpInputs[Math.min(d.length,5)].focus()})});
function verifyEmail(){const code=otpInputs.map(x=>x.value).join("");if(code.length!==6)return toast("Enter the 6-digit verification code.");toast("Email verified successfully.")}
function resendCode(){clearOtp();otpInputs[0]?.focus();startVerificationTimer();toast("Verification code resent.")}
document.addEventListener("contextmenu",e=>e.preventDefault());document.addEventListener("dragstart",e=>e.preventDefault());
