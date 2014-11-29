/**
 * Created by Ben on 19/09/2014.
 */

function Game()
{
	this.elmFlag=document.querySelector(".flag");
	this.elmScore=document.querySelector(".score");
	this.elmTimer=document.querySelector(".timer");
	this.elmFirstDiv=document.querySelector(".divList1");
	this.elmSecondDiv=document.querySelector(".divList2");
	var buttons=document.querySelectorAll(".buttons");
	for (var i=0; i<buttons.length; i++)
	{
		var button=buttons[i];
		button.addEventListener("click",this.buttonClicked.bind(this));
	}
	this.randomCountries=Game.sample(Game.countries,20);
	this.currentCountry=0;
	this.elmFlag.src=this.randomCountries[this.currentCountry].imageName;
	this.score=0;
	this.timer=setInterval(this.timer.bind(this), 1000);

	this.endTime= new Date();
	this.endTime.setSeconds(this.endTime.getSeconds()+this.randomCountries.length*10);
};

Game.prototype.buttonClicked=function (event)
{
	var button=event.target;
	var value=button.getAttribute("data-letter");
	var countriesToShow=[];
	for (var i=0; i<Game.countries.length; i++)
	{
		var name=Game.countries[i].countryName;
		if (name[0].toUpperCase()===value)
		{
			countriesToShow.push(name)
		}

	}
	console.log(countriesToShow);

	Game.removeAllElements(this.elmFirstDiv);
	Game.removeAllElements(this.elmSecondDiv);

	var numberInFirstBox=Math.ceil(countriesToShow.length/2);
	var numberInSecondBox=countriesToShow.length-numberInFirstBox;
	for (var i=0;i<numberInFirstBox; i++)
	{
		this.createListItem(this.elmFirstDiv, i, countriesToShow );

	}
	for (var i=0;i<numberInSecondBox; i++)
	{
		this.createListItem(this.elmSecondDiv, i+numberInFirstBox, countriesToShow );

	}

}

Game.prototype.gameOver= function()
{
	clearInterval(this.timer);
	alert ("Game Over");
}

Game.prototype.createListItem= function(placeToAdd, countryIndex, countriesToShow)
{
	var element=document.createElement("li");
	element.innerHTML=countriesToShow[countryIndex];
	element.className="listItems";
	placeToAdd.appendChild(element);
	element.addEventListener("click", this.nameClicked.bind(this));
	element.setAttribute("data-countryName",countriesToShow[countryIndex]);
}

Game.prototype.nameClicked= function (event)
{
	console.log(event.target.getAttribute("data-countryName"));
	var countryNameSelected=event.target.getAttribute("data-countryName");
	var currentCountryName=this.randomCountries[this.currentCountry].countryName;
	if(currentCountryName===countryNameSelected)
	{
		console.log("correct!");
		this.score=this.score+1;
		this.elmScore.innerHTML=this.score+"/"+ this.randomCountries.length;
	}
	if (this.currentCountry===this.randomCountries.length-1)
	{
		this.gameOver();
	}
	else
	{
		this.currentCountry=this.currentCountry+1;
		this.elmFlag.src=this.randomCountries[this.currentCountry].imageName;
	}

}

Game.prototype.timer=function()
{
	var now=new Date();
	var nowMilli=now.getTime();
	var endTimeMilli=this.endTime.getTime();
	var difference= endTimeMilli-nowMilli;
	var secondsDiff=Math.floor(difference/1000);
	var minutes=Math.floor(secondsDiff/60);
	var seconds=secondsDiff%60;
	console.log(minutes,seconds);
	this.elmTimer.innerHTML=minutes+":"+seconds;
	if (secondsDiff<=0)
	{
		this.gameOver();
	}
}


Game.removeAllElements= function (parent)
{
	var firstChild=parent.firstChild;
	while (firstChild!=null)
	{
		parent.removeChild(firstChild);
		firstChild=parent.firstChild;
	}
}

Game.getName = function (imageName)
{
	var startPosition = imageName.indexOf("of");
	var lastPosition = imageName.indexOf(".png");
	var countryName = imageName.substring(startPosition + 3, lastPosition);
	countryName = this.replaceAll(countryName, "_", " ");
	countryName=countryName.replace("the ", "");
	return countryName;
};

Game.replaceAll = function (nameString, toReplace, toEnter) //goes all string and replaces toReplace with toEnter character.
{
	var newString = "";

	for (var i = 0; i < nameString.length; i++)
	{
		if (nameString[i] === toReplace)
		{
			newString = newString + toEnter;
		}
		else
		{
			newString = newString + nameString[i];
		}
	}

	return newString;
};

Game.compareNames = function (country1, country2)
{
	var rtn=0;
	var name1=country1.countryName;
	var name2=country2.countryName;

	if (name1===name2)
	{
		rtn=0;
	}
	else if(name1<name2)
	{
		rtn=-1;
	}
	else
	{
		rtn=1;
	}

	return rtn;
}

Game.randomInt= function(maxNumber)
{
	return Math.floor(Math.random()*maxNumber);

}

Game.sample= function(array, number)
{
	var sampleArray=[];
	for(var i=0;i<number;i++)
	{
		sampleArray.push(Game.countries[Game.randomInt(Game.countries.length)]);
	}
	return sampleArray;


}


function Country(countryName, imageName)
{
	this.countryName=countryName;
	this.imageName=imageName;
}

Game.FLAGS = [
	"100px-Flag_of_Switzerland.png",
	"100px-Flag_of_the_Vatican_City.png",
	"117px-Flag_of_Niger.png",
	"125px-Flag_of_Monaco.png",
	"132px-Flag_of_Denmark.png",
	"133px-Flag_of_Gabon.png",
	"133px-Flag_of_Papua_New_Guinea.png",
	"133px-Flag_of_San_Marino.png",
	"133px-Flag_of_Congo_Democratic_Republic_of.png",
	"138px-Flag_of_Israel.png",
	"138px-Flag_of_Norway.png",
	"139px-Flag_of_Iceland.png",
	"140px-Flag_of_Albania.png",
	"140px-Flag_of_Kosovo.png",
	"143px-Flag_of_Andorra.png",
	"143px-Flag_of_Brazil.png",
	"147px-Flag_of_Bolivia.png",
	"150px-Flag_of_Afghanistan.png",
	"150px-Flag_of_Algeria.png",
	"150px-Flag_of_Angola.png",
	"150px-Flag_of_Antigua_and_Barbuda.png",
	"150px-Flag_of_Austria.png",
	"150px-Flag_of_Barbados.png",
	"150px-Flag_of_Belgium.png",
	"150px-Flag_of_Belize.png",
	"150px-Flag_of_Benin.png",
	"150px-Flag_of_Bhutan.png",
	"150px-Flag_of_Botswana.png",
	"150px-Flag_of_Burkina_Faso.png",
	"150px-Flag_of_Cameroon.png",
	"150px-Flag_of_Chad.png",
	"150px-Flag_of_Chile.png",
	"150px-Flag_of_Colombia.png",
	"150px-Flag_of_Cte_dIvoire.png",
	"150px-Flag_of_Cyprus.png",
	"150px-Flag_of_Djibouti.png",
	"150px-Flag_of_Ecuador.png",
	"150px-Flag_of_Egypt.png",
	"150px-Flag_of_Equatorial_Guinea.png",
	"150px-Flag_of_France.png",
	"150px-Flag_of_Georgia.png",
	"150px-Flag_of_Ghana.png",
	"150px-Flag_of_Greece.png",
	"150px-Flag_of_Guinea.png",
	"150px-Flag_of_India.png",
	"150px-Flag_of_Indonesia.png",
	"150px-Flag_of_Iraq.png",
	"150px-Flag_of_Italy.png",
	"150px-Flag_of_Japan.png",
	"150px-Flag_of_Kenya.png",
	"150px-Flag_of_Laos.png",
	"150px-Flag_of_Lebanon.png",
	"150px-Flag_of_Lesotho.png",
	"150px-Flag_of_Madagascar.png",
	"150px-Flag_of_Malawi.png",
	"150px-Flag_of_Maldives.png",
	"150px-Flag_of_Mali.png",
	"150px-Flag_of_Malta.png",
	"150px-Flag_of_Mauritania.png",
	"150px-Flag_of_Mauritius.png",
	"150px-Flag_of_Morocco.png",
	"150px-Flag_of_Mozambique.png",
	"150px-Flag_of_Myanmar.png",
	"150px-Flag_of_Namibia.png",
	"150px-Flag_of_Pakistan.png",
	"150px-Flag_of_Panama.png",
	"150px-Flag_of_Peru_state.png",
	"150px-Flag_of_Portugal.png",
	"150px-Flag_of_Romania.png",
	"150px-Flag_of_Russia.png",
	"150px-Flag_of_Rwanda.png",
	"150px-Flag_of_Saint_Kitts_and_Nevis.png",
	"150px-Flag_of_Saint_Vincent_and_the_Grenadines.png",
	"150px-Flag_of_Saudi_Arabia.png",
	"150px-Flag_of_Senegal.png",
	"150px-Flag_of_Serbia.png",
	"150px-Flag_of_Sierra_Leone.png",
	"150px-Flag_of_Singapore.png",
	"150px-Flag_of_Slovakia.png",
	"150px-Flag_of_Somalia.png",
	"150px-Flag_of_South_Africa.png",
	"150px-Flag_of_South_Korea.png",
	"150px-Flag_of_Spain.png",
	"150px-Flag_of_Suriname.png",
	"150px-Flag_of_Swaziland.png",
	"150px-Flag_of_Syria.png",
	"150px-Flag_of_Tanzania.png",
	"150px-Flag_of_Thailand.png",
	"150px-Flag_of_the_Central_African_Republic.png",
	"150px-Flag_of_the_Czech_Republic.png",
	"150px-Flag_of_The_Gambia.png",
	"150px-Flag_of_the_Netherlands.png",
	"150px-Flag_of_China.png",
	"150px-Flag_of_Taiwan.png",
	"150px-Flag_of_Congo_Republic_of.png",
	"150px-Flag_of_Tunisia.png",
	"150px-Flag_of_Turkey.png",
	"150px-Flag_of_Turkmenistan.png",
	"150px-Flag_of_Uganda.png",
	"150px-Flag_of_Ukraine.png",
	"150px-Flag_of_Uruguay.png",
	"150px-Flag_of_Venezuela.png",
	"150px-Flag_of_Vietnam.png",
	"150px-Flag_of_Yemen.png",
	"150px-Flag_of_Zambia.png",
	"157px-Flag_of_Cambodia.png",
	"157px-Flag_of_Estonia.png",
	"160px-Flag_of_Argentina.png",
	"160px-Flag_of_Guatemala.png",
	"160px-Flag_of_Palau.png",
	"160px-Flag_of_Poland.png",
	"160px-Flag_of_Sweden.png",
	"160px-Flag_of_the_Dominican_Republic.png",
	"162px-Flag_of_Togo.png",
	"164px-Flag_of_Finland.png",
	"167px-Flag_of_Bahrain.png",
	"167px-Flag_of_Bangladesh.png",
	"167px-Flag_of_Bulgaria.png",
	"167px-Flag_of_Burundi.png",
	"167px-Flag_of_Costa_Rica.png",
	"167px-Flag_of_Germany.png",
	"167px-Flag_of_Grenada.png",
	"167px-Flag_of_Guyana.png",
	"167px-Flag_of_Haiti.png",
	"167px-Flag_of_Kyrgyzstan.png",
	"167px-Flag_of_Liechtenstein.png",
	"167px-Flag_of_Lithuania.png",
	"167px-Flag_of_Luxembourg.png",
	"167px-Flag_of_Nicaragua.png",
	"167px-Flag_of_the_Comoros.png",
	"167px-Flag_of_Trinidad_and_Tobago.png",
	"167px-Flag_of_Vanuatu.png",
	"170px-Flag_of_Cape_Verde.png",
	"175px-Flag_of_Iran.png",
	"175px-Flag_of_Mexico.png",
	"178px-Flag_of_El_Salvador.png",
	"182px-Flag_of_Paraguay.png",
	"190px-Flag_of_Liberia.png",
	"190px-Flag_of_Micronesia.png",
	"190px-Flag_of_the_Marshall_Islands.png",
	"190px-Flag_of_the_United_States.png",
	"200px-Flag_of_Armenia.png",
	"200px-Flag_of_Australia.png",
	"200px-Flag_of_Azerbaijan.png",
	"200px-Flag_of_Belarus.png",
	"200px-Flag_of_Bosnia_and_Herzegovina.png",
	"200px-Flag_of_Brunei.png",
	"200px-Flag_of_Canada.png",
	"200px-Flag_of_Croatia.png",
	"200px-Flag_of_Cuba.png",
	"200px-Flag_of_Dominica.png",
	"200px-Flag_of_East_Timor.png",
	"200px-Flag_of_Eritrea.png",
	"200px-Flag_of_Ethiopia.png",
	"200px-Flag_of_Fiji.png",
	"200px-Flag_of_Guinea-Bissau.png",
	"200px-Flag_of_Honduras.png",
	"200px-Flag_of_Hungary.png",
	"200px-Flag_of_Ireland.png",
	"200px-Flag_of_Jamaica.png",
	"200px-Flag_of_Jordan.png",
	"200px-Flag_of_Kazakhstan.png",
	"200px-Flag_of_Kiribati.png",
	"200px-Flag_of_Kuwait.png",
	"200px-Flag_of_Latvia.png",
	"200px-Flag_of_Libya.png",
	"200px-Flag_of_Macedonia.png",
	"200px-Flag_of_Malaysia.png",
	"200px-Flag_of_Moldova.png",
	"200px-Flag_of_Mongolia.png",
	"200px-Flag_of_Montenegro.png",
	"200px-Flag_of_Nauru.png",
	"200px-Flag_of_New_Zealand.png",
	"200px-Flag_of_Nigeria.png",
	"200px-Flag_of_North_Korea.png",
	"200px-Flag_of_Oman.png",
	"200px-Flag_of_Palestine.png",
	"200px-Flag_of_Saint_Lucia.png",
	"200px-Flag_of_Samoa.png",
	"200px-Flag_of_Sao_Tome_and_Principe.png",
	"200px-Flag_of_Seychelles.png",
	"200px-Flag_of_Slovenia.png",
	"200px-Flag_of_South_Sudan.png",
	"200px-Flag_of_Sri_Lanka.png",
	"200px-Flag_of_Sudan.png",
	"200px-Flag_of_Tajikistan.png",
	"200px-Flag_of_the_Bahamas.png",
	"200px-Flag_of_the_Philippines.png",
	"200px-Flag_of_the_Solomon_Islands.png",
	"200px-Flag_of_the_United_Arab_Emirates.png",
	"200px-Flag_of_the_United_Kingdom.png",
	"200px-Flag_of_Tonga.png",
	"200px-Flag_of_Tuvalu.png",
	"200px-Flag_of_Uzbekistan.png",
	"200px-Flag_of_Zimbabwe.png",
	"254px-Flag_of_Qatar.png",
	"82px-Flag_of_Nepal.png"

];
Game.countries= [];
for (var i=0; i<Game.FLAGS.length; i++)
{
	var countryName=Game.getName(Game.FLAGS[i]);
	Game.countries.push(new Country(countryName,"images/"+Game.FLAGS[i]));
}
Game.countries.sort(Game.compareNames);
console.log(Game.countries);
console.log (Game.sample(Game.countries, 20));

window.onload=function(){
	new Game();
}


