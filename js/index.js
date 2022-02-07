const botonNumeros = document.getElementsByName('number');
const botonOpera= document.getElementsByName('opera');
const botonIgual= document.getElementsByName('igual')[0];
const botondelete= document.getElementsByName('delete')[0];



var result = document.getElementById('result');
var opeActual='';
var opeAnterior='';
var operacion= undefined;

botonNumeros.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerHTML);
    })
});

botonOpera.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerHTML);
    })
});

botonIgual.addEventListener('click', function(){
    calcular();
    actualizarDisplay();
});

botondelete.addEventListener('click', function(){
    clear();
    actualizarDisplay();
});
function selectOperacion(op){
    if(opeActual==='') return;
    if(opeAnterior!=''){
        calcular();
    }
    operacion=op.toString();
    opeAnterior=opeActual;
    opeActual='';
}
function calcular(){
    
    var calculo;
    const anterior= parseFloat(opeAnterior);
    const actual= parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
    switch(operacion){
        case '+':
            calculo= anterior+actual;
            break;
        case '-':
            calculo= anterior-actual;
            break;
        case 'x':
            calculo= anterior*actual;
            break;
        case '/':
            calculo= anterior/actual;
            break;
        default:
            return;
    }
    opeActual= calculo;
    operacion=undefined;
    opeAnterior='';

    //*localStorage.setItem("Calculo", JSON.stringify(newcalculo));
    const newresultado={
        num1:anterior,
        num2:actual,
        operacion:operacion,
        calculo:calculo
    }
    localStorage.setItem('nuevoc', JSON.stringify(newresultado));
    console.log(localStorage.getItem('nuevoc'));
    document.getElementById('prueba').innerHTML=localStorage.getItem('nuevoc');
    //console.log(localStorage.getItem("Calculo"));
}
function agregarNumero(num){
    opeActual=opeActual.toString() + num.toString();
    actualizarDisplay();
}

function actualizarDisplay(){
    result.value=opeActual;
}

function clear(){
    opeActual='';
    opeAnterior='';
    operacion=undefined;
}

clear();
