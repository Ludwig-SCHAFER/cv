/*
 **********************************************************************************************************************
 * Here are some useful lines of code that are used to scramble sensitive data like :
 * - my email address
 * - my phone number
 * By default they are in a format that any human can read. If JS is disabled then it works. If JS is enabled, then the
 * data are made clearer and clickable.
 **********************************************************************************************************************
 */

/*
 * Returns an email from lots of obfuscation operations (made to lure bots and crawlers).
 * Obfuscation process :
 * - take an email address
 * - write it from right to left
 * - encode result in base64
 * - write result from right to left
 * - paste result
 */
function deobfuscateMail()
{
	let reversedBase64edReversedEmail = 'sVHZ3l2ZuM3YoFmZlJHQ5FGav9mLj9Wb'; //that's a cool f#%$@ing variable name
	let reversebase64email = reverseString(reversedBase64edReversedEmail);
	let base64email = atob(reversebase64email);
	let vanillaMail = reverseString(base64email);
	return vanillaMail;
}

/*
 * Returns a string in reverse order of characters.
 */
function reverseString(string)
{
	return string.split('').reverse().join(''); //basic, i did not invent this.
}

/*
 * Updates DOM with correct e-mail address put in a <a> link.
 */
function putMailInDOM()
{
	let elt = document.getElementById('status_mail');
	let newLink = document.createElement('a');
	let vanillaMail = deobfuscateMail();

	newLink.setAttribute('href', 'mailto:' + vanillaMail);
	newLink.textContent = vanillaMail;

	elt.textContent = ''; //faster that innerHTML since no parsing is involved for raw text.
	elt.appendChild(newLink);
}

/*
 * Updates DOM with correct phone number put in a <a> link.
 * Also I'm an electronic engineer so obfuscating the number in binary was like an appetizer.
 * Mobile phone number in France is 0[6-7][0-9]{4} without visual separators.
 * We usually replace the 1st didigt 0 by +33 (international prefix) so any number can be called from any line outside of the country.
 * Here we have a 10-digits phone number written AB CD EF GH IJ
 * It will be decoded and the A digit will be replaced by +33 later.
 * Digits are encoded in little-endian (MSB -> LSB).
 */
function putPhoneInDOM()
{
	let elt = document.getElementById('phone_value');
	let newLink = document.createElement('a');
	let completePhoneNumber = '';
	let hrefPhoneNumber = '';
	let phoneNumber_AB = binaryToString([false, false, false, false, false, true,  true,  false]);
	let phoneNumber_CD = binaryToString([false, true,  false, false, false, false, true,  true ]);
	let phoneNumber_EF = binaryToString([false, true,  false, true,  true,  false, true,  false]);
	let phoneNumber_GH = binaryToString([false, false, true,  true,  true,  true,  false, false]);
	let phoneNumber_IJ = binaryToString([false, false, false, true,  true,  true,  true,  false]);

	completePhoneNumber = [                   ['+', '3', '3'].join(''), phoneNumber_AB[1], phoneNumber_CD,phoneNumber_EF,phoneNumber_GH,phoneNumber_IJ].join(' ');
	hrefPhoneNumber     = [['t', 'e', 'l', ':','+', '3', '3'].join(''), phoneNumber_AB[1], phoneNumber_CD,phoneNumber_EF,phoneNumber_GH,phoneNumber_IJ].join('');

	newLink.setAttribute('href', 'href:' + hrefPhoneNumber);
	newLink.textContent = completePhoneNumber;

	elt.textContent = ''; //faster that innerHTML since no parsing is involved for raw text.
	elt.appendChild(newLink);
}
function binaryToString(array)
{
	array = array.reverse(); //because big-endian is more convenient (why not set the original array big-endian ? good question)
	let sum = 0;
	for (var i = 0; i < array.length; i++) {
		sum += array[i] * Math.pow(2,i);
	}
	if(sum<10)
	{
		return '0' + (sum.toString());
	}
	return sum.toString();
}

/*
 * Updates the 'age' field in the CV with my current ages calculated from my birthday.
 * This way i do not have to do it manually every year.
 */
function updateAge()
{
	let myBday = new Date(1984, 10, 15); //Months are 0-indexed. This is a not a good design choice.
	let myAge = new Date(Date.now() - myBday.getTime());
	let myAgeInHumanYears = myAge.getFullYear() - 1970; //dates are 1970-indexed, start of Unix time.
	document.getElementById('age_value').textContent = myAgeInHumanYears.toString();
}

/*
 * Updates the 'last modified' field in the CV with a human readable date.
 */
function convertLastUpdateTime()
{
	let elt = document.getElementById('meta_update_time')
	let lastUpdateTime = new Date(elt.textContent);
	elt.textContent = lastUpdateTime.toLocaleDateString() + ' ' + lastUpdateTime.toLocaleTimeString();
}

putPhoneInDOM();
putMailInDOM();
updateAge();
convertLastUpdateTime();