/*
 **********************************************************************************************************************
 * Here are some things I thought could be used to show how talented I am when i'm bored
 **********************************************************************************************************************
 */
function cvInConsole()
{
	//fancy debug with color in console and clean characters : https://en.wikipedia.org/wiki/Block_Elements
	consoleSeparator();
	console.log('%c███','color:red;', 'hello there!');
	consoleSeparator();
}
function consoleSeparator()
{
	console.log('%c' + '▄'.repeat(120) , 'color:#FFB000;');
}

function DOManalyzer()
{
	let body = document.getElementsByTagName('body')[0];
	let domdiv = document.createElement('div');
	domdiv.setAttribute('id','domx')
	body.appendChild(domdiv);


	let domx = document.getElementById('domx')
	domx.innerHTML='<p>domx</p><ul>';
	recurDOM(document.documentElement, domx, 0, 0);
	domx.innerHTML='</ul>';
}

function recurDOM(elt, output, n, depth)
{
	console.log('	'.repeat(depth) + elt.tagName);
	//output.innerHTML += '<!--' + n + ' ' + elt.tagName + '-->';
	if(elt.hasAttribute('id') && elt.getAttribute('id').toUpperCase() == 'DOMX')
	{
		console.log('the end');
		return;
	}
	/*if(elt.tagName.toUpperCase() == 'HEAD')
	{
		return;
	}*/
	else if (elt.childElementCount == 0)
	{
		//output.innerHTML += 'coucou';
		return;
	}
	for(i=0; i<elt.childElementCount; i++)
	{
		depth++;
		//output.innerHTML += '<li>';
		//output.innerHTML += elt.tagName;
		recurDOM(elt.children[i], output, n+1, depth);
		//output.innerHTML += '</li>';
		depth--;
	}
}



putMailInDOM();
updateAge();
convertLastUpdateTime();/**/
//cvInConsole();
//DOManalyzer();