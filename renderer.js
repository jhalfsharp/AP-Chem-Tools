console.log(PeriodicTable[0].name);
var pressure;
var pAssign = false;
var volume;
var vAssign = false;
var moles;
var mAssign = false;
var temperature;
var tAssign = false;
var pUnits;
var vUnits;
var tUnits;
var idealGasConstant;
var getElementFromString = (name) => {
	console.log('finding element ' + name);
	let output;
	PeriodicTable.forEach((val) => {
		if (val.name.toLowerCase() == name.toLowerCase()) {
			output = val;
			return;
		}
		if (val.symbol.toLowerCase() == name.toLowerCase()) {
			output = val;
			return;
		}
	});
	return output;
};
console.log(getElementFromString('hydrogen').name);
$('#IGL-P').change(() => {
	pAssign = true;
	if ($('#IGL-P').val() == '') {
		pAssign = false;
	}
	updateIGLButton();
});
$('#IGL-V').change(() => {
	vAssign = true;
	if ($('#IGL-V').val() == '') {
		vAssign = false;
	}
	updateIGLButton();
});
$('#IGL-n').change(() => {
	mAssign = true;
	if ($('#IGL-n').val() == '') {
		mAssign = false;
	}
	updateIGLButton();
});
$('#IGL-T').change(() => {
	tAssign = true;
	if ($('#IGL-T').val() == '') {
		tAssign = false;
	}
	updateIGLButton();
});
var updateIGLButton = () => {
	let values = [pAssign, vAssign, mAssign, tAssign];
	$('#IGL-btn').prop('disabled', values.filter(Boolean).length !== 3);
	console.log(values.filter(Boolean).length);
};
$('#IGL-btn').click(() => {
	console.log('button pressed');
	pUnits = $('#IGL-P-U').val();
	vUnits = $('#IGL-V-U').val();
	tUnits = $('#IGL-T-U').val();
	pressure = parseFloat($('#IGL-P').val());
	volume = parseFloat($('#IGL-V').val());
	moles = parseFloat($('#IGL-n').val());
	temperature = parseFloat($('#IGL-T').val());
	if (pUnits == 'atm') {
		idealGasConstant = 0.08206;
	} else {
		idealGasConstant = 62.36;
	}
	if (vUnits == 'mL') {
		idealGasConstant *= 1000;
	}
	temperature = parseFloat($('#IGL-T').val());
	if (tUnits == 'C') {
		temperature += 273.15;
	}
	if (!pAssign) {
		pressure = (moles * idealGasConstant * temperature) / volume;
		$('#IGL-P').val(pressure);
		$('#IGL-btn').prop('disabled', true);
		pAssign = true;
	}
	if (!vAssign) {
		volume = (moles * idealGasConstant * temperature) / pressure;
		$('#IGL-V').val(volume);
		$('#IGL-btn').prop('disabled', true);
		vAssign = true;
	}
	if (!mAssign) {
		moles = (pressure * volume) / (idealGasConstant * temperature);
		$('#IGL-n').val(moles);
		$('#IGL-btn').prop('disabled', true);
		mAssign = true;
	}
	if (!tAssign) {
		temperature = (pressure * volume) / (idealGasConstant * moles);
		if (tUnits == 'C') {
			temperature -= 273.15;
		}
		$('#IGL-T').val(temperature);
		$('#IGL-btn').prop('disabled', true);
		tAssign = true;
	}
});
$('#IGL-clr').click(() => {
	pAssign = false;
	vAssign = false;
	mAssign = false;
	tAssign = false;
	$('#IGL-P').val('');
	$('#IGL-V').val('');
	$('#IGL-n').val('');
	$('#IGL-T').val('');
	$('#IGL-btn').prop('disabled', true);
});
var absorbance;
var aAssign;
var molarAbsorbtivity;
var eAssign;
var pathLength;
var bAssign;
var concentration;
var cAssign;
var bUnits;
var cUnits;
$('#BL-A').change(() => {
	aAssign = true;
	if ($('#BL-A').val() == '') {
		aAssign = false;
	}
	updateBLButton();
});
$('#BL-e').change(() => {
	eAssign = true;
	if ($('#BL-e').val() == '') {
		eAssign = false;
	}
	updateBLButton();
});
$('#BL-B').change(() => {
	bAssign = true;
	if ($('#BL-B').val() == '') {
		bAssign = false;
	}
	updateBLButton();
});
$('#BL-C').change(() => {
	cAssign = true;
	if ($('#BL-C').val() == '') {
		cAssign = false;
	}
	updateBLButton();
});
var updateBLButton = () => {
	let values = [aAssign, eAssign, bAssign, cAssign];
	$('#BL-btn').prop('disabled', values.filter(Boolean).length !== 3);
	console.log(values.filter(Boolean).length);
};
$('#BL-btn').click(() => {
	console.log('button pressed');
	bUnits = $('#BL-B-U').val();
	cUnits = $('#BL-C-U').val();
	absorbance = parseFloat($('#BL-A').val());
	molarAbsorbtivity = parseFloat($('#BL-e').val());
	pathLength = parseFloat($('#BL-B').val());
	concentration = parseFloat($('#BL-C').val());
	switch (bUnits) {
		case 'm':
			pathLength *= 100;
			break;
		case 'mm':
			pathLength /= 10;
			break;
		default:
			break;
	}
	switch (cUnits) {
		case 'mM':
			concentration /= 1000;
			break;
		case 'uM':
			concentration /= 1000000;
			break;
		default:
			break;
	}
	if (!aAssign) {
		absorbance = molarAbsorbtivity * pathLength * concentration;
		$('#BL-A').val(absorbance);
		$('#BL-btn').prop('disabled', true);
		aAssign = true;
	}
	if (!eAssign) {
		molarAbsorbtivity = absorbance / (pathLength * concentration);
		$('#BL-e').val(molarAbsorbtivity);
		$('#BL-btn').prop('disabled', true);
		eAssign = true;
	}
	if (!bAssign) {
		pathLength = absorbance / (molarAbsorbtivity * concentration);
		switch (bUnits) {
			case 'm':
				pathLength /= 100;
				break;
			case 'mm':
				pathLength *= 10;
				break;
			default:
				break;
		}
		$('#BL-B').val(pathLength);
		$('#BL-btn').prop('disabled', true);
		bAssign = true;
	}
	if (!cAssign) {
		concentration = absorbance / (molarAbsorbtivity * pathLength);
		switch (cUnits) {
			case 'mM':
				concentration *= 1000;
				break;
			case 'uM':
				concentration *= 1000000;
				break;
			default:
				break;
		}
		$('#BL-C').val(concentration);
		$('#BL-btn').prop('disabled', true);
		cAssign = true;
	}
});
$('#BL-clr').click(() => {
	aAssign = false;
	eAssign = false;
	bAssign = false;
	cAssign = false;
	$('#BL-A').val('');
	$('#BL-e').val('');
	$('#BL-B').val('');
	$('#BL-C').val('');
	$('#BL-btn').prop('disabled', true);
});
var TQ1ASSIGN = false;
var TQ2ASSIGN = false;
$('#TQ-1').change(() => {
	TQ1ASSIGN = $('#TQ-1').val() !== '';
	$('#TQ-btn').prop('disabled', !(TQ1ASSIGN && TQ2ASSIGN));
	console.log('' + TQ1ASSIGN + ', ' + TQ2ASSIGN);
});
$('#TQ-2').change(() => {
	TQ2ASSIGN = $('#TQ-2').val() !== '';
	$('#TQ-btn').prop('disabled', !(TQ1ASSIGN && TQ2ASSIGN));
	console.log('' + TQ1ASSIGN + ', ' + TQ2ASSIGN);
});
$('#TQ-btn').click(() => {
	let atom1 = getElementFromString($('#TQ-1').val());
	let atom2 = getElementFromString($('#TQ-2').val());
	let greaterZeff;
	let smallerZeff;
	let greaterCA;
	let smallerCA;
	let greaterBE;
	let smallerBE;
	let greaterRadius;
	let smallerRadius;
	let work1 =
		atom1.name +
		': ' +
		atom1.electron_configuration +
		'; Zeff = ' +
		atom1.number +
		'-' +
		(atom1.number - atom1.shells[atom1.shells.length - 1]) +
		' = ' +
		atom1.shells[atom1.shells.length - 1];
	let work2 =
		atom2.name +
		': ' +
		atom2.electron_configuration +
		'; Zeff = ' +
		atom2.number +
		'-' +
		(atom2.number - atom2.shells[atom2.shells.length - 1]) +
		' = ' +
		atom2.shells[atom2.shells.length - 1];
	let line1;
	let line2;
	let line3;
	let line4;
	let tempAtoms;
	console.log([atom1.xpos, atom2.xpos, atom1.ypos, atom2.ypos].join(', '));
	if (atom1.ypos == atom2.ypos) {
		console.log('same row.');
		if (atom1.xpos > atom2.xpos) {
			tempAtoms = [atom1, atom2];
		} else {
			tempAtoms = [atom2, atom1];
		}
		[greaterZeff, smallerZeff] = tempAtoms;
		[greaterCA, smallerCA] = tempAtoms;
		[greaterBE, smallerBE] = tempAtoms;
		[smallerRadius, greaterRadius] = tempAtoms;
		line1 = greaterZeff.name + ' has a greater Zeff than ' + smallerZeff.name + '.';
		line2 = 'Therefore, ' + greaterCA.name + ' has a greater coulombic attraction than ' + smallerCA.name + '.';
		line3 = 'Therefore, ' + greaterBE.name + ' has a greater binding energy than ' + smallerBE.name + '.';
		line4 = 'Therefore, ' + greaterRadius.name + ' has a greater radius than ' + smallerRadius.name + '.';
	} else if (atom1.xpos == atom2.xpos) {
		console.log('same column.');
		if (atom1.ypos < atom2.ypos) {
			tempAtoms = [atom1, atom2];
		} else {
			tempAtoms = [atom2, atom1];
		}
		[greaterZeff, smallerZeff] = tempAtoms;
		[greaterCA, smallerCA] = tempAtoms;
		[greaterBE, smallerBE] = tempAtoms;
		[smallerRadius, greaterRadius] = tempAtoms;
		line1 =
			greaterZeff.name +
			' and ' +
			smallerZeff.name +
			' have the same Zeff, but ' +
			greaterZeff.name +
			' has fewer shielding electrons and electrons in a higher energy level.';
		line2 = 'Therefore, ' + greaterCA.name + ' has a greater coulombic attraction than ' + smallerCA.name + '.';
		line3 = 'Therefore, ' + greaterBE.name + ' has a greater binding energy than ' + smallerBE.name + '.';
		line4 = 'Therefore, ' + greaterRadius.name + ' has a greater radius than ' + smallerRadius.name + '.';
	}
	$('#TQ-A').val([work1, work2, line1, line2, line3, line4].join('\n'));
});
$('#TQ-clr').click(() => {
	TQ1Assign = false;
	tQ2Assign = false;
	$('#TQ-1').val('');
	$('#TQ-2').val('');
	$('#TQ-A').val('');
	$('#TQ-btn').prop('disabled', true);
});
var mmCompound;
$('#MM-btn').click(() => {
	mmCompound = $('#MM-in').val();
	let molarMass = 0;
	while (mmCompound.length > 0) {
		let symbol;
		if ('abcdefghijklmnopqrstuvwxyz'.includes(mmCompound.charAt(1))) {
			symbol = mmCompound.slice(0, 2);
			mmCompound = mmCompound.slice(2);
		} else {
			symbol = mmCompound.slice(0, 1);
			mmCompound = mmCompound.slice(1);
		}
		let count = 1;
		if ('1234567890'.includes(mmCompound[0])) {
			count = mmCompound.match(/^\d+/);
			count = count[0];
			mmCompound = mmCompound.slice(count.length);
			count = parseInt(count);
		}
		let element = getElementFromString(symbol);
		molarMass += element.atomic_mass * count;
	}
	$('#MM-out').val(molarMass + ' g / mol');
});
$('#MM-clr').click(() => {
	$('#MM-in').val('');
	$('#MM-out').val('');
});
var heat;
var qAssign;
var mass;
var m2Assign;
var specificHeat;
var c2Assign;
var deltaT;
var dtAssign;
var qUnits;
var m2Units;
$('#MCAT-q').change(() => {
	qAssign = true;
	if ($('#MCAT-q').val() == '') {
		qAssign = false;
	}
	updateMCATButton();
});
$('#MCAT-m').change(() => {
	m2Assign = true;
	if ($('#MCAT-m').val() == '') {
		m2Assign = false;
	}
	updateMCATButton();
});
$('#MCAT-c').change(() => {
	c2Assign = true;
	if ($('#MCAT-c').val() == '') {
		c2Assign = false;
	}
	updateMCATButton();
});
$('#MCAT-t').change(() => {
	dtAssign = true;
	if ($('#MCAT-t').val() == '') {
		dtAssign = false;
	}
	updateMCATButton();
});
var updateMCATButton = () => {
	let values = [qAssign, m2Assign, c2Assign, dtAssign];
	$('#MCAT-btn').prop('disabled', values.filter(Boolean).length !== 3);
	console.log(values.filter(Boolean).length);
};
$('#MCAT-btn').click(() => {
	console.log('button pressed');
	qUnits = $('#MCAT-q-U').val();
	m2Units = $('#MCAT-m-U').val();
	heat = parseFloat($('#MCAT-q').val());
	mass = parseFloat($('#MCAT-m').val());
	specificHeat = parseFloat($('#MCAT-c').val());
	deltaT = parseFloat($('#MCAT-t').val());
	if (qUnits == 'kJ') {
		heat *= 1000;
	}
	if (m2Units == 'kg') {
		mass *= 1000;
	}
	if (!qAssign) {
		heat = mass * specificHeat * deltaT;
		if (qUnits == 'kJ') {
			heat /= 1000;
		}
		$('#MCAT-q').val(heat);
		$('#MCAT-btn').prop('disabled', true);
		qAssign = true;
	}
	if (!m2Assign) {
		mass = heat / (specificHeat * deltaT);
		if (m2Units == 'kg') {
			mass /= 1000;
		}
		$('#MCAT-m').val(mass);
		$('#MCAT-btn').prop('disabled', true);
		m2Assign = true;
	}
	if (!c2Assign) {
		specificHeat = heat / (mass * deltaT);
		$('#MCAT-c').val(specificHeat);
		$('#MCAT-btn').prop('disabled', true);
		c2Assign = true;
	}
	if (!dtAssign) {
		deltaT = heat / (mass * specificHeat);
		$('#MCAT-t').val(deltaT);
		$('#MCAT-btn').prop('disabled', true);
		dtAssign = true;
	}
});
$('#MCAT-clr').click(() => {
	qAssign = false;
	m2Assign = false;
	c2Assign = false;
	dtAssign = false;
	$('#MCAT-q').val('');
	$('#MCAT-m').val('');
	$('#MCAT-c').val('');
	$('#MCAT-t').val('');
});
