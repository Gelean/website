var quotesArray = [
	["Honor is simply the morality of superior men.", "H.L. Mencken"],
	["The urge to save humanity is almost always a false front for the urge to rule.", "H. L. Mencken"],
	["Never interrupt your enemy when they are making a mistake.", "Napoleon Bonaparte"],
	["The tree of liberty must be refreshed from time to time with the blood of patriots and tyrants.", "Thomas Jefferson"],
	["Live free or die: Death is not the worst of evils.", "John Stark"],
	["What you most want to find will be found where you least want to look.", "Carl Jung"],
	["No tree, it is said, can grow to heaven unless its roots reach down to hell.", "Carl Jung"],
	["Be peaceful, be courteous, obey the law, respect everyone; but if someone puts his hand on you, send him to the cemetery.", "Malcolm X"],
	["Give a man a mask and he will show his true face.", "Oscar Wilde"],
	["Of all tyrannies, a tyranny sincerely exercised for the good of its victims may be the most oppressive. It would be better to live under robber barons than under omnipotent moral busybodies. The robber baron's cruelty may sometimes sleep, his cupidity may at some point be satiated; but those who torment us for our own good will torment us without end for they do so with the approval of their own conscience.", "C. S. Lewis"],
	["Treade a worme on the tayle, and it must turne agayne.", "John Heywood"],
	["We hang the petty thieves and appoint the great ones to public office.", "Aesop"],
	["After all is said and done, more is said than done.", "Aesop"],
	["Don't fight a battle if you don't gain anything by winning.", "Erwin Rommel"],
	["It is well that war is so terrible, otherwise we should grow too fond of it.", "Robert E. Lee"],
	["War is cruelty. There is no use trying to reform it. The crueler it is, the sooner it will be over.", "William Tecumseh Sherman"],
	["A man is no less a slave because he is allowed to choose a new master once in a term of years.", "Lysander Spooner"],
	["Don't ever take a fence down until you know the reason it was put up.", "G. K. Chesterton"],
	["No-one is equal to anything. Even the same man is not equal to himself on different days.", "Thomas Sowell"],
	["‘We need’ is always code for ‘I want.’", "Michael Malice"],
	["I'll never be frightened of shepherds. It's the sheep who trouble me.", "Petyr Baelish, A Clash of Kings"],
	["Loyal service means telling hard truths.", "Davos, Game of Thrones"],
	["A good act does not wash out the bad, nor a bad act the good. Each should have its own reward.", "Stannis Baratheon, A Clash of Kings"],
	["Always keep your foes confused. If they are never certain who you are or what you want, they cannot know what you are like to do next. Sometimes the best way to baffle them is to make moves that have no purpose, or even seem to work against you.", "Petyr Baelish, A Storm of Swords,"],
	["Rules are for children. This is war, and in war the only crime is to lose.", "Bayaz, Last Argument of Kings"]
];
function displayQuote() {
	var rand = Math.floor(Math.random() * (quotesArray.length));
	document.getElementById('quote').innerHTML = "<h2>\"" + quotesArray[rand][0] + "\"</h2>" + "-" + quotesArray[rand][1];
}