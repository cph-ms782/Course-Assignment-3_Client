# Course-Assignment-3_Client

This is a client for login in or out of REST endpoint and for fetching data when logged in.  
Set REST endpoint URL in file **src/settings.js**  

## Deployment instructions
First clone project.  
In cloned folder using a terminal enter:  
#### `npm install`  
and
#### `npm install react-router-dom`  
to install prerequisites

When all is ready to deploy:

#### `npm run build`


##Deploy via Surge

1)
I et færdigt react projekt kan man vælge at deploye via surge. Det foregår alt sammen via terminalen(git bash). For at komme i gang, skal man navigere til roden af selve ens projekt. Højre klik i din projektfolder og find "git bash here". I terminalen skal du skrive "npm run build" (uden citationstegn), hvilket opretter en build mappe, lidt ligesom når man i Java får en target folder, efter man har builded. 

2) 
Hvis man ikke tidligere har benyttet sig af surge, så skal man igen i en terminal (git bash) skrive “npm install -g surge” (uden citationstegn). Det installerer interfacet man skal bruge for at hoste via surge.
Dernæst skal man skrive  
#### `surge --project ./build --domain DITDOMÆNENAVN.surge.sh`  
Man skal IKKE skrive hverken .dk eller .com, da .surge.sh er et topdomæne. DITDOMÆNENAVN skal erstattes af hvad du gerne vil have som navn på dit projekt. 
Hvis du ikke har benyttet dig af Surge før, vil du blive promptet til at indtaste først en email og dernæst et password. I nogle terminaler er der IKKE noget grafisk der fortæller dig at det er det du skal. 

Sådan her ser det f.eks. ud i git bash. 

Her skal man bare indtaste email først og så trykke enter. Dernæst er det tid til et password og så enter. 
Det vil se sådan her ud hvis det er lykkedes 

Du kan herefter tilgå dit react projekt via DITDOMÆNENAVN.surge.sh




