function e(e,a,r,o){Object.defineProperty(e,a,{get:r,set:o,enumerable:!0,configurable:!0})}(0,globalThis.parcelRequire554f.register)("7LLBD",function(a,r){e(a.exports,"uniqueNamesGenerator",()=>n),e(a.exports,"animals",()=>l),e(a.exports,"colors",()=>s);let o=e=>{let a=Math.imul((e=1831565813+(e|=0)|0)^e>>>15,1|e);return(((a=a+Math.imul(a^a>>>7,61|a)^a)^a>>>14)>>>0)/4294967296};class i{constructor(e){this.dictionaries=void 0,this.length=void 0,this.separator=void 0,this.style=void 0,this.seed=void 0;let{length:a,separator:r,dictionaries:o,style:i,seed:t}=e;this.dictionaries=o,this.separator=r,this.length=a,this.style=i,this.seed=t}generate(){if(!this.dictionaries)throw Error('Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object');if(this.length<=0)throw Error("Invalid length provided");if(this.length>this.dictionaries.length)throw Error(`The length cannot be bigger than the number of dictionaries.
Length provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);let e=this.seed;return this.dictionaries.slice(0,this.length).reduce((a,r)=>{var i;let t;e?e=4294967296*(t="string"==typeof(i=e)?o(Math.floor(Number(i.split("").map(e=>e.charCodeAt(0)).reduce((e,a)=>e+a,1)))):o(i)):t=Math.random();let n=r[Math.floor(t*r.length)]||"";if("lowerCase"===this.style)n=n.toLowerCase();else if("capital"===this.style){let[e,...a]=n.split("");n=e.toUpperCase()+a.join("")}else"upperCase"===this.style&&(n=n.toUpperCase());return a?`${a}${this.separator}${n}`:`${n}`},"")}}let t={separator:"_",dictionaries:[]},n=e=>{let a=[...e&&e.dictionaries||t.dictionaries],r={...t,...e,length:e&&e.length||a.length,dictionaries:a};if(!e||!e.dictionaries||!e.dictionaries.length)throw Error('A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide');return new i(r).generate()};var l=["aardvark","aardwolf","albatross","alligator","alpaca","amphibian","anaconda","angelfish","anglerfish","ant","anteater","antelope","antlion","ape","aphid","armadillo","asp","baboon","badger","bandicoot","barnacle","barracuda","basilisk","bass","bat","bear","beaver","bedbug","bee","beetle","bird","bison","blackbird","boa","boar","bobcat","bobolink","bonobo","booby","bovid","bug","butterfly","buzzard","camel","canid","canidae","capybara","cardinal","caribou","carp","cat","caterpillar","catfish","catshark","cattle","centipede","cephalopod","chameleon","cheetah","chickadee","chicken","chimpanzee","chinchilla","chipmunk","cicada","clam","clownfish","cobra","cockroach","cod","condor","constrictor","coral","cougar","cow","coyote","crab","crane","crawdad","crayfish","cricket","crocodile","crow","cuckoo","damselfly","deer","dingo","dinosaur","dog","dolphin","donkey","dormouse","dove","dragon","dragonfly","duck","eagle","earthworm","earwig","echidna","eel","egret","elephant","elk","emu","ermine","falcon","felidae","ferret","finch","firefly","fish","flamingo","flea","fly","flyingfish","fowl","fox","frog","galliform","gamefowl","gayal","gazelle","gecko","gerbil","gibbon","giraffe","goat","goldfish","goose","gopher","gorilla","grasshopper","grouse","guan","guanaco","guineafowl","gull","guppy","haddock","halibut","hamster","hare","harrier","hawk","hedgehog","heron","herring","hippopotamus","hookworm","hornet","horse","hoverfly","hummingbird","hyena","iguana","impala","jackal","jaguar","jay","jellyfish","junglefowl","kangaroo","kingfisher","kite","kiwi","koala","koi","krill","ladybug","lamprey","landfowl","lark","leech","lemming","lemur","leopard","leopon","limpet","lion","lizard","llama","lobster","locust","loon","louse","lungfish","lynx","macaw","mackerel","magpie","mammal","manatee","mandrill","marlin","marmoset","marmot","marsupial","marten","mastodon","meadowlark","meerkat","mink","minnow","mite","mockingbird","mole","mollusk","mongoose","monkey","moose","mosquito","moth","mouse","mule","muskox","narwhal","newt","nightingale","ocelot","octopus","opossum","orangutan","orca","ostrich","otter","owl","ox","panda","panther","parakeet","parrot","parrotfish","partridge","peacock","peafowl","pelican","penguin","perch","pheasant","pig","pigeon","pike","pinniped","piranha","planarian","platypus","pony","porcupine","porpoise","possum","prawn","primate","ptarmigan","puffin","puma","python","quail","quelea","quokka","rabbit","raccoon","rat","rattlesnake","raven","reindeer","reptile","rhinoceros","roadrunner","rodent","rook","rooster","roundworm","sailfish","salamander","salmon","sawfish","scallop","scorpion","seahorse","shark","sheep","shrew","shrimp","silkworm","silverfish","skink","skunk","sloth","slug","smelt","snail","snake","snipe","sole","sparrow","spider","spoonbill","squid","squirrel","starfish","stingray","stoat","stork","sturgeon","swallow","swan","swift","swordfish","swordtail","tahr","takin","tapir","tarantula","tarsier","termite","tern","thrush","tick","tiger","tiglon","toad","tortoise","toucan","trout","tuna","turkey","turtle","tyrannosaurus","unicorn","urial","vicuna","viper","vole","vulture","wallaby","walrus","warbler","wasp","weasel","whale","whippet","whitefish","wildcat","wildebeest","wildfowl","wolf","wolverine","wombat","woodpecker","worm","wren","xerinae","yak","zebra"],s=["amaranth","amber","amethyst","apricot","aqua","aquamarine","azure","beige","black","blue","blush","bronze","brown","chocolate","coffee","copper","coral","crimson","cyan","emerald","fuchsia","gold","gray","green","harlequin","indigo","ivory","jade","lavender","lime","magenta","maroon","moccasin","olive","orange","peach","pink","plum","purple","red","rose","salmon","sapphire","scarlet","silver","tan","teal","tomato","turquoise","violet","white","yellow"]});
//# sourceMappingURL=index.m.6637100c.js.map
