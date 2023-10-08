const modal = document.getElementById("modal");
const calculate_Icon = document.getElementById("calculate_Icon");
const blur_Box = document.getElementById("blur_Box");
const main = document.getElementById("main");
const cancel_button_container = document.getElementById("cancel_button_container");
const cancel_button = document.getElementById("cancel_button");
const modal_answer_section = document.getElementById("modal_answer_section");
const varCharLabel = document.getElementById("varCharLabel");
const holeLimit = document.getElementById("holeLimit");
const holeUpperLimitAnswer = document.getElementById("holeUpperLimitAnswer");
const holeLowerLimitAnswer = document.getElementById("holeLowerLimitAnswer");
const shaftupperLimitAnswer = document.getElementById("shaftupperLimitAnswer");
const shaftLowerLimitAnswer = document.getElementById("shaftLowerLimitAnswer");
const holetoleranceAnswer = document.getElementById("holetoleranceAnswer");
const shafttoleranceAnswer = document.getElementById("shafttoleranceAnswer");
const fitValueAnswer = document.getElementById("fitValueAnswer");
var flag = 0;
var holeMaxLimit;
var holeMinLimit;
var shaftMinSize;
var shaftMaxSize;
var fitType;
var zeroLine;
var submit_btn=document.getElementById("submit_btn");

var dropdown=document.getElementById("dropdown");
var number_input=document.getElementById("number_input");
var holeUpperLimitModalValue;
var holeUpperLimitModalValueTag = document.getElementById("holeUpperLimitModalValue");
var holeLowerLimitModalValue;
var holeLowerLimitModalValueTag = document.getElementById("holeLowerLimitModalValue");
var shaftUpperLimitModalValue;
var shaftUpperLimitModalValueTag = document.getElementById("shaftUpperLimitModalValue");
var shaftLowerLimitModalValue;
var shaftLowerLimitModalValueTag = document.getElementById("shaftLowerLimitModalValue");
// input element variable below
const varChar = document.getElementById("varChar");
const pattern = /^[0-9]{1,3}[ H/]{1,2}[0-9]{1,}[ A-Za-z]{1,2}[0-9]{1,}$/;

calculate_Icon.addEventListener('click', () => {
    modal.style.display = 'block';
    blur_Box.style.filter = "blur(3px)";
})
cancel_button_container.addEventListener('click', () => {
    var errorText = document.getElementById('errorText');
    modal.style.display = 'none';
    blur_Box.style.filter = "blur(0px)";
    modal_answer_section.style.transform = "translate(25%,80%)";
    modal_answer_section.style.borderRadius = "30% 10% 0 0";
    modal_answer_section.style.borderRadius = "30% 10% 0 0";
    // modal_answer_section.style.color = "#6528F7";
    holeLimit.style.color = " #885af3";
    cancel_button.style.color = "#6528F7";
    varCharLabel.style.transform = "translateX(-60px";
    varCharLabel.style.fontSize = "1.3rem";
    varChar.value = " ";
    errorText.innerHTML = " ";

})
submit_btn.addEventListener("click",function(e){
    // logic to code
    e.preventDefault();
    var errorText = document.getElementById('errorText');
    // let str1 = (varChar.value).replace(/\s/g, "");
    // let str = str1.replace("/", "");
    // if (str == "") {
    //     errorText.innerHTML = "* Enter the value";
    // }
    let str=(number_input.value).toString()+dropdown.value;
    if (pattern.test(str)) {
        modal_answer_section.style.transform = "translate(0%,0%)";
        modal_answer_section.style.borderRadius = "0%";
        cancel_button_container.style.color = "white";

        cancel_button_container.style.backgroundColor = "white";
        cancel_button.style.color = "#6528F7";

        holeLimit.style.color = "white";
        try {
            Main(str);
        }
        catch (e) {
            console.error(e)
        }
    } else {
        errorText.innerHTML = "* Enter valid input";
    }
})

function labelUP() {
    varCharLabel.style.transform = "translate(-55px,-20px)";
    varCharLabel.style.fontSize = "1.5rem";
}


// logic for the code added below

// function to get fundamental deviation
function fundamental(val, D) {
    console.log(val, D)
    const b = val.toLowerCase();
    const dic = {
        "a": (D <= 120) ? -(265 + 1.3 * D) : -3.5 * D,
        "b": (D <= 160) ? -(140 + 0.85 * D) : -1.8 * D,
        "c": (D <= 40) ? -(52 * Math.pow(D, 0.2)) : -(9.5 + 0.8 * D),
        "d": -16 * Math.pow(D, 0.41),
        "e": -11 * Math.pow(D, 0.41),
        "f": -5.5 * Math.pow(D, 0.41),
        "g": -2.5 * Math.pow(D, 0.34),
        "h": 0,
        "i": -0.6 * Math.pow(D, 0.5),
        "j": -0.4 * Math.pow(D, 0.4),
        "k": -0.2 * Math.pow(D, 0.3),
        "l": -0.1 * Math.pow(D, 0.2),
        "m": (16 * ((0.45 * Math.cbrt(D)) + (0.001 * D)) - 10 * ((0.45 * Math.cbrt(D)) + (0.001 * D))),
        "n": 5 * Math.pow(D, 0.34),
        "o": 0,
        "p": 0,
        "q": 0,
        "r": 0,
        "s": 0,
        "t": 16 * (((0.45 * Math.cbrt(D)) + (0.001 * D))) + 0.63 * D,
        "u": 0,
        "v": 0,
        "w": 0,
        "x": 177 + 1.6 * D,
        "y": 0,
        "z": 0,
        "za": (D <= 120) ? -(12 + 0.8 * D) : -2 * D,
        "ef": -6 * Math.pow(D, 0.44),
        "fg": -2.5 * Math.pow(D, 0.34),
        "js": -0.8 * Math.pow(D, 0.5),
    };
    // console.log(dic[b])
    // console.log("Checking",parseFloat(dic[b]) );
    return parseFloat(dic[b]);
}

// function to get geometric mean for D
function getDiameterValue(n) {
    n = parseInt(n)
    const ItRange = [
        [1, 3],
        [3, 6],
        [6, 10],
        [10, 18],
        [18, 30],
        [30, 50],
        [50, 80],
        [80, 120],
        [120, 180],
        [180, 250],
        [250, 315],
        [315, 400],
        [400, 500]
    ];
    try {
        for (let i of ItRange) {
            if (i[0] < n && n <= i[1]) {
                return Math.sqrt(i[0] * i[1]);
            }
        }
    }
    catch (e) {
        console.error("array out of bound: in function getToleranceValues", e)
    }
}


// function to calculate IT_Tolerance values
function getItToleranceValues(it_number) {
    const ItRange = new Map([
        ["IT5", 7],
        ["IT6", 10],
        ["IT7", 16],
        ["IT8", 25],
        ["IT9", 40],
        ["IT10", 64],
        ["IT11", 100],
        ["IT12", 160],
        ["IT13", 250],
        ["IT14", 400],
        ["IT15", 640],
        ["IT16", 1000],
    ]);

    if (ItRange.has(it_number)) {
        return ItRange.get(it_number);
    } else {
        console.log("please enter the tolerance values between 6-16");
    }

}

function Main(str) {
    const extracted_num = str.match(/(\d+)/g);
    console.log(extracted_num)
    const extracted_char = str.match(/(\D+)/g);
    console.log(extracted_char)
    console.log(extracted_char)
    zeroLine = parseFloat(extracted_num[0]); // or basic size ,i removed parsefloat which was out
    const D = getDiameterValue(extracted_num[0]);
    const i = ((0.45 * Math.cbrt(D)) + (0.001 * D));
    hole_var = parseFloat(fundamental(extracted_char[0], D)) / 1000;
    shaft_var = parseFloat(fundamental(extracted_char[1], D)) / 1000;
    const i_holeToleranceForm = "IT" + extracted_num[1]; // convert to string of error
    const i_holeToleranceValue = parseFloat(getItToleranceValues(i_holeToleranceForm));
    const holeTolerance = parseFloat(((parseFloat(i) * parseFloat(i_holeToleranceValue)) / 1000));
    const i_shaftToleranceForm = "IT" + extracted_num[2];
    const i_shaftToleranceValue = getItToleranceValues(i_shaftToleranceForm);
    const shaftTolerance = parseFloat(((parseFloat(i) * parseFloat(i_shaftToleranceValue)) / 1000));

    // calculation of limits
    holeMaxLimit = parseFloat(zeroLine) + holeTolerance + hole_var;  // as 1 mm is 1000 micro meter , the result of this multiplication will be micrometer
    holeMinLimit = parseFloat(zeroLine) + hole_var; //  + hole_var was removed zero line and fundamental deviation are in mm so converted in micro meter


    // calculation for shaft
    // var shaftMinSize;
    // var shaftMaxSize;
    if ("a" <= extracted_char[1] && extracted_char[1] <= "h") {
        shaftMinSize = (parseFloat(zeroLine) - shaftTolerance + shaft_var);
        console.log("min shaft", shaftMinSize);
        console.log(" shaftTolerance", shaftTolerance);
        console.log(" shaft_var", shaft_var);
        shaftMaxSize = (parseFloat(zeroLine) + shaft_var);
        console.log("max shaft", shaftMaxSize);
    }
    else {
        shaftMaxSize = (parseFloat(zeroLine) + shaftTolerance + shaft_var);
        console.log(" shaftTolerance", shaftTolerance);
        console.log(" shaft_var", shaft_var);
        shaftMinSize = (parseFloat(zeroLine) + shaft_var);
        console.log("max shaft", shaftMaxSize);
        console.log("min shaft", shaftMinSize);
    }


    // calculation clearance
    const maxClearance = holeMaxLimit - shaftMinSize;
    const minClearance = holeMinLimit - shaftMaxSize;

    // finding fit type
    // var fitType;
    if (holeMinLimit >= shaftMaxSize) {
        fitType = "Clearance Fit";
    } else if (shaftMinSize >= holeMaxLimit) {
        fitType = "Interference Fit";
    } else {
        fitType = "Transition Fit";
    }
    holeUpperLimitModalValue = holeUpperLimitAnswer.innerHTML = extracted_char[0].toUpperCase() + extracted_num[1] + ": " + holeMaxLimit.toFixed(3);
    holeLowerLimitModalValue = holeLowerLimitAnswer.innerHTML = extracted_char[0].toUpperCase() + extracted_num[1] + ": " + holeMinLimit.toFixed(3);
    shaftUpperLimitModalValue = shaftupperLimitAnswer.innerHTML = extracted_char[1] + extracted_num[2] + ": " + shaftMaxSize.toFixed(3);
    shaftLowerLimitModalValue = shaftLowerLimitAnswer.innerHTML = extracted_char[1] + extracted_num[2] + ": " + shaftMinSize.toFixed(3);

    holetoleranceAnswer.innerHTML = Math.round(holeTolerance * 1000);
    // holetoleranceAnswer.innerHTML = Math.ceil(holeTolerance * 1000);
    shafttoleranceAnswer.innerHTML = Math.round(shaftTolerance * 1000);
    // shafttoleranceAnswer.innerHTML = Math.ceil(shaftTolerance * 1000);
    fitValueAnswer.innerHTML = fitType;

    // graphic js
    console.log("shft var is", shaft_var)


}
var modalTwo = document.getElementById("modalTwo");
var moveShaft = document.getElementById("moveShaft");
var line1 = document.getElementById("line1");
var shaftUpperDeviate;
var shaftLowerDeviate;
var notify = document.getElementById("notify");
function DisplayTwo() {
    notify.innerText = "";
    line1.style.display = "block";
    shaftUpperDeviate = zeroLine - shaftMaxSize;
    shaftLowerDeviate = zeroLine - shaftMinSize;
    modalTwo.style.display = "block";
    holeUpperLimitModalValueTag.innerHTML = holeUpperLimitModalValue;
    holeLowerLimitModalValueTag.innerHTML = holeLowerLimitModalValue;
    shaftUpperLimitModalValueTag.innerHTML = shaftUpperLimitModalValue;
    shaftLowerLimitModalValueTag.innerHTML = shaftLowerLimitModalValue;
    moveShaft.style.height = "50px";
    if ((shaftUpperDeviate) >= 0) {
        // moveShaft.style.transform=`translate(30%,${shaftUpperDeviate*1000}px)`;
        // line1.style.height=`${shaftUpperDeviate*1000}px`
        moveShaft.style.transform = `translate(30%,${50}px)`;
        line1.style.height = `${50}px`
    }
    else {
        console.log("else part excecuted")
        if (shaftMinSize >= holeMaxLimit) {
            console.log("interferences fit")
            console.log(shaftLowerDeviate);
            // moveShaft.style.transform=`translate(30%,${(shaftUpperDeviate*1000)}px)`;
            // line1.style.transform="translate(30%,-100%)"
            // line1.style.height=`calc(${Math.abs(shaftUpperDeviate)*1000}px - 50px)`

            moveShaft.style.transform = `translate(30%,-100px)`;
            line1.style.transform = "translate(30%,-100%)"
            line1.style.height = `calc(100px - 50px)`
        }
        else {
            line1.style.display = "none";
            console.log("transistion fit");
            notify.innerText = "*The shaft limit closer to the zero line is selected as fundamental deviation";
            // moveShaft.style.transform=`translate(30%,${(shaftUpperDeviate*1000)}px)`;
            moveShaft.style.transform = `translate(30%,-102%)`;
            moveShaft.style.height = "30px";
            line1.style.transform = "translate(30%,-100%)";
            // line1.style.height=`calc(${(Math.min(Math.abs(shaftLowerDeviate),Math.abs(shaftUpperDeviate)))*1000}px - 50 px)`
        }
    }
}
function modalTwoClose() {
    modalTwo.style.display = "none";
}

// take input as type of fit.
// drop down menu.
// form.(submit)
// ll / ul H7t5
