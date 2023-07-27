const modal = document.getElementById("modal");
const calculate_Icon = document.getElementById("calculate_Icon");
const blur_Box = document.getElementById("blur_Box");
const main = document.getElementById("main");
const cancel_button_container = document.getElementById("cancel_button_container");
const cancel_button = document.getElementById("cancel_button");
const modal_answer_section = document.getElementById("modal_answer_section");
const varCharLabel = document.getElementById("varCharLabel");
const holeLimit = document.getElementById("holeLimit");


// input element variable below
const varChar = document.getElementById("varChar");
const pattern = /^[0-9]{1,3}[ A-Za-z]{1,2}[0-9]{1,}[ A-Za-z]{1,2}[0-9]{1,}$/;

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
    modal_answer_section.style.color = "#6528F7";
    cancel_button.style.color = "#6528F7";
    varCharLabel.style.transform = "translateX(-60px";
    varCharLabel.style.fontSize = "1.3rem";
    varChar.value = " ";
    errorText.innerHTML=" ";
    
})

function upAndValidate() {
    // logic to code
    var errorText = document.getElementById('errorText');
    let str = (varChar.value).replace(/\s/g, "");
    if (str == "") {
        errorText.innerHTML = "* Enter the value";
    }
    else if (pattern.test(str)) {
        modal_answer_section.style.transform = "translate(0%,0%)";
        modal_answer_section.style.borderRadius = "0%";
        cancel_button_container.style.color = "white";
        cancel_button_container.style.backgroundColor = "white";
        cancel_button.style.color = "#6528F7";
        holeLimit.style.color="white";
        try {
            Main(str);
        }
        catch (e) {
            console.error(e)
        }
    } else {
        errorText.innerHTML = "* Enter valid value in specified form";
        console.log("did'nt execute")
    }
}

function labelUP() {
    varCharLabel.style.transform = "translate(-55px,-30px)";
    varCharLabel.style.fontSize = "1.5rem";
}


// logic for the code added below

// function to get fundamental deviation
function fundamental(val, D) {
    console.log(val, D)
    const b = val.toLowerCase();
    const dic = {
        "a": (D <= 120) ? -(265 + 1.3 * D) : -3.5 * D,
        "b": -12 * Math.pow(D, 0.56),
        "c": -6 * Math.pow(D, 0.44),
        "d": -16 * Math.pow(D, 0.44),
        "e": -8 * Math.pow(D, 0.34),
        "f": -2.5 * Math.pow(D, 0.34),
        "g": -2.5 * Math.pow(D, 0.34),
        "h": 0,
        "i": -0.6 * Math.pow(D, 0.5),
        "j": -0.4 * Math.pow(D, 0.4),
        "k": -0.2 * Math.pow(D, 0.3),
        "l": -0.1 * Math.pow(D, 0.2),
        "m": -0.08 * D,
        "n": -0.04 * D,
        "o": 0,
        "p": 0,
        "q": 0,
        "r": 0,
        "s": 0,
        "t": 0,
        "u": 0,
        "v": 0,
        "w": 0,
        "x": 0,
        "y": 0,
        "z": 0,
        "cd": (D <= 120) ? -(12 + 0.8 * D) : -2 * D,
        "ef": -6 * Math.pow(D, 0.44),
        "fg": -2.5 * Math.pow(D, 0.34),
        "js": -0.8 * Math.pow(D, 0.5),
    };
    // console.log(dic[b])
    // console.log("Checking",parseFloat(dic[b]).toFixed(4));
    return parseFloat(dic[b]).toFixed(4);
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
    // console.log(extracted_num)
    const extracted_char = str.match(/(\D+)/g);
    // console.log(extracted_char)
    // console.log(extracted_char)
    const zeroLine = parseFloat(extracted_num[0]).toFixed(4); // or basic size ,i removed parsefloat which was out
    const D = getDiameterValue(extracted_num[0]);
    // console.log(D, "D", typeof (D));
    const i = ((0.45 * Math.cbrt(D)) + (0.001 * D)).toFixed(4);
    let hole_var = parseFloat(fundamental(extracted_char[0], D));
    // console.log("fundamental", hole_var)//values are returned num,ber
    // console.log(hole_var, "checking", typeof (hole_var));
    let shaft_var = parseFloat(fundamental(extracted_char[1], D));
    const i_holeToleranceForm = "IT" + extracted_num[1]; // convert to string of error
    const i_holeToleranceValue = parseFloat(getItToleranceValues(i_holeToleranceForm)).toFixed(4);
    const holeTolerance = parseFloat((parseFloat(i) * parseFloat(i_holeToleranceValue)).toFixed(4));
    const i_shaftToleranceForm = "IT" + extracted_num[2];
    const i_shaftToleranceValue = getItToleranceValues(i_shaftToleranceForm);
    const shaftTolerance = parseFloat((parseFloat(i) * parseFloat(i_shaftToleranceValue)).toFixed(4));

    // calculation of limits
    // console.log(typeof (zeroLine), "zeroLine", zeroLine)
    // console.log(typeof (holeTolerance), "holeTolerance", holeTolerance)
    const holeMaxLimit = parseFloat(zeroLine+ holeTolerance);  // as 1 mm is 1000 micro meter , the result of this multiplication will be micrometer
    // console.log("holeMaxLimit", typeof (holeMaxLimit))
    const holeMinLimit = (zeroLine + hole_var); //  + hole_var was removed zero line and fundamental deviation are in mm so converted in micro meter

    // i need to confirm this
    const shaftMinSize = parseFloat((zeroLine - (shaftTolerance - shaft_var) * 1e-3, 3).toFixed(4));
    const shaftMaxSize = parseFloat((zeroLine + shaft_var * 1e-3, 3).toFixed(4));

    // calculation clearance
    const maxClearance = holeMaxLimit - shaftMinSize;
    const minClearance = holeMinLimit - shaftMaxSize;

    // finding fit type
    let fitType;
    if (maxClearance > 0 && minClearance > 0) {
        fitType = "Clearance Fit";
    } else if (maxClearance <= 0 && minClearance <= 0) {
        fitType = "Interference Fit";
    } else {
        fitType = "Transition Fit";


    }
    
    console.log(`Limits for the hole: ${holeMinLimit} mm - ${holeMaxLimit} mm`);

    console.log(`Limits for the shaft: ${shaftMinSize} mm - ${shaftMaxSize} mm`);

    console.log(`Fit type: ${fitType}`);

    console.log(`Tolerance for hole  is ${holeTolerance} μm`);

    console.log(`Tolerance for shaft  is ${shaftTolerance} μm`);
}