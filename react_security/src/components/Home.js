import React from "react";

function Home() {
    console.log("Home");
    return (
        <div>
            <p>Master<br />
                <a href="https://travis-ci.org/cph-ms782/Course-Assignment-3_Backend"><img alt="Build Status" src="https://travis-ci.org/cph-ms782/Course-Assignment-3_Backend.svg?branch=master" /></a>  </p>
            <p>Dev<br />
                <a href="https://travis-ci.org/cph-ms782/Course-Assignment-3_Backend"><img alt="Build Status" src="https://travis-ci.org/cph-ms782/Course-Assignment-3_Backend.svg?branch=dev" /></a>  </p>
            <h1>Course-Assignment-3</h1>
            <h3>endpoints</h3>
            <p><strong>All</strong>  </p>
            <ul>
                <li>/api/info  </li>
                <li>/api/info/all  </li>
                <li>/api/sw  </li>
                <li>/api/login  </li>
            </ul>
            <p><strong>User</strong>  </p>
            <ul>
                <li>/api/sw/data  </li>
                <li>/api/info/user  </li>
            </ul>
            <p><strong>Admin</strong>  </p>
            <ul>
                <li>/api/sw/data  </li>
                <li>/api/info/user  </li>
                <li>/api/info/admin  </li>
                <li>/api/info/fill  </li>
            </ul>
            <hr />
            <h1>Backend</h1>
            <h2>Nedenstående er en minimalistisk guide til opsætning i forbindelse med deployment igennem travis.</h2>
            <ol>
                <li>
                    <p>MySql
    opret lokal(xxx + xxx_test) og droplet(xxx) database.</p>
                </li>
                <li>
                    <p>Netbeans Backend Projekt. (Project Files -&gt; pom.xml).
                        kontrollér pom.xml linie 18(remote.server).
    Husk at kontrollér at der bruges https og ikke http.</p>
                </li>
                <li>
                    <p>Netbeans Backend Projekt.
                    (Source packages -&gt; utils -&gt; EMF_Creator.java)
    sørg for at connection i EMF_Creator linie 121  "CONNECTION" er unik.</p>
                </li>
                <li>
                    <p>Droplet(Terminal/GitBash)
    ssh ind i dropletten, og brug</p>
                    <ul>
                        <li>sudo nano /opt/tomcat/bin/setenv.sh -
opret ny export med værdien fra "CONNECTION" i step 3.</li>
                    </ul>
                </li>
                <li>
                    <p>Netbeans Backend Projekt
                    (Other sources -&gt; src/main/resources -&gt; default package -&gt; config.properties)
    kontrollér database navne i config.properties.</p>
                </li>
                <li>
                    <p>Travis.yml fil i rod mappen.
    Ændre database navn i linie 40(CREATE DATABASE ??) til database navnet valgt i step 1.</p>
                </li>
                <li>
                    <p>https://travis-ci.org/
    på travis sæt REMOTE_USER til "script_user" og REMOTE_PW til script_user's password.</p>
                    <p>-- brug følgende kommando for at finde password til brugeren hvis nødvendigt.
sudo nano /opt/tomcat/conf/tomcat-users.xml</p>
                </li>
            </ol>
            <p>HUSK AT CLEAN AND BUILD HVIS DER ER ERRORS I IMPORTS.</p>
            <hr />
            <h1>Frontend</h1>
            <p>This is a client for login in or out of REST endpoint and for fetching data when logged in.<br />
                Set REST endpoint URL in file <strong>src/settings.js</strong>  </p>
            <h2>Deployment instructions</h2>
            <p>First clone project.<br />
                In cloned folder using a terminal enter:  </p>
            <h4><code>npm install</code></h4>
            <p>and</p>
            <h4><code>npm install react-router-dom</code></h4>
            <p>to install prerequisites</p>
            <p>When all is ready to deploy:</p>
            <h4><code>npm run build</code></h4>
            <h2>Deploy via Surge</h2>
            <p>1
I et færdigt react projekt kan man vælge at deploye via surge. Det foregår alt sammen via terminalen(git bash). For at komme i gang, skal man navigere til roden af selve ens projekt. Højre klik i din projektfolder og find "git bash here". I terminalen skal du skrive "npm run build" (uden citationstegn), hvilket opretter en build mappe, lidt ligesom når man i Java får en target folder, efter man har builded. </p>
            <p>2
            Hvis man ikke tidligere har benyttet sig af surge, så skal man igen i en terminal (git bash) skrive “npm install -g surge” (uden citationstegn). Det installerer interfacet man skal br /uge for at hoste via surge.
Dernæst skal man skrive  </p>
            <h4><code>surge --project ./build --domain DITDOMÆNENAVN.surge.sh</code></h4>
            <p>Man skal IKKE skrive hverken .dk eller .com, da .surge.sh er et topdomæne. DITDOMÆNENAVN skal erstattes af hvad du gerne vil have som navn på dit projekt.
Hvis du ikke har benyttet dig af Surge før, vil du blive promptet til at indtaste først en email og dernæst et password. I nogle terminaler er der IKKE noget grafisk der fortæller dig at det er det du skal. </p>
            <p>Sådan her ser det f.eks. ud i git bash. </p>
            <p>Her skal man bare indtaste email først og så trykke enter. Dernæst er det tid til et password og så enter.
Det vil se sådan her ud hvis det er lykkedes </p>
            <p>Du kan herefter tilgå dit react projekt via DITDOMÆNENAVN.surge.sh</p>
        </div>
    )
}

export default Home;