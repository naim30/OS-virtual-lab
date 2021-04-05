
var lock=0;
var i0=0;
var i1=0;

//$(".box1 .P0").hide();
//$(".box3 .P1").hide();
//(".box1 .P1").hide();

async function verify(val){
  if(val=="P0"){
    if(i0==0 && lock==0){
      var inp=document.getElementById("Pn").value=val;
      movebottom1(val);
      lock=1;

    }
    else if(i0==1 && lock==1){
    }
    else if(i0==1 && lock==0){
      var inp=document.getElementById("Pn").value=val;
      movebottom(val);
      lock=1; 
    }
    else if(lock==1 && i0==0){
      movebottom(val);    }
    else if(lock==1){
    }
    else{
      movebottom(val);
      lock=1;
    }
  } 
  else if(val=="P1"){
    if(i1==0 && lock==0){
      var inp=document.getElementById("Pn").value=val;
      movebottom1(val);
      lock=1;

    }
    else if(i1==1 && lock==1){
    }
    else if(i1==1 && lock==0){
      var inp=document.getElementById("Pn").value=val;
      movebottom(val);
      lock=1; 
    }
    else if(lock==1 && i1==0){
      movebottom(val);    }
    else if(lock==1){
    }
    else{
      movebottom(val);
      lock=1;
    }
   }
  else if(lock==0){
    var inp=document.getElementById("Pn").value=null;
  }   
  
  /*if(i0==1||i1==1){
    if(lock==1){}
    }
    else {
    movebottom(val);
    var inp=document.getElementById("Pn").value=val;
    }
  }*/
}
// in critical
  async function movebottom1(val) {
      const img = document.getElementById(val);
      img.style.top = `${img.offsetTop + 390}px`;
      await sleep(2000);    
     
}
// in while loop
async function movebottom(val) {
   
  const img = document.getElementById(val);
  img.style.top = `${img.offsetTop + 195 }px`;
  await sleep(2000);
  
    
 
}
async function moveup(val) {
   
  const img = document.getElementById(val);
  img.style.top = `${img.offsetTop - 390}px`;
  lock=0;  
  await sleep(2000);
    
}
/*async function moveleft(val) {
   
  const img = document.getElementById(val);
  img.style.left = `${img.offsetLeft - 170}px`;
  await sleep(2000);
}*/



$(".Process0").on("click",function(){
  var a=document.getElementById("Pn").value;
  if(a=="P1" && i1==0){
    alert("Turn is for process 1");
  }
  else{
  verify("P0");
  i0++;}
});



$(".Process1").on("click",function(){
  var a=document.getElementById("Pn").value;
  if(a=="P0" && i0==0){
    alert("Turn is for process 0");
  }
  else{
  verify("P1");
  i1++;}
});

$(".End-process0").on("click",function(){
  if(i0==0){}
  else{
  moveup("P0");
  i0=0;
  var inp=document.getElementById("Pn").value="P1";
}
});

$(".End-process1").on("click",function(){
  if(i1==0){}
  else{
  moveup("P1");
  i1=0;
  var inp=document.getElementById("Pn").value="P0";
}
});


$(".Reset").on("click",function(){
  location.reload();
});