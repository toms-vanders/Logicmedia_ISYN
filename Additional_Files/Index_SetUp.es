// Queries to Set up a new Elasticsaerch index

//Create new IndexPUT /my-index-000001

PUT /notes
{
  "settings": {
    "index": {
      "number_of_shards": 1,  
      "number_of_replicas": 1 
    }
  }
}

//Close Index before updating analyzer
POST notes/_close

//Add New Analyer to Index. Need to POST index/_close before
PUT notes/_settings
{
  "analysis": {
      "analyzer": {
          "default": {
              "type": "custom",
              "tokenizer": "standard",
              "filter": [
                  "lowercase",
                  "danish_snowball",
                  "asciifolding"
              ]
          }
      },
      "normalizer": {
        "default_normalizer":{
          "type": "custom",
          "filter": [
              "lowercase",
              "asciifolding"
          ]
        }
      },
      "filter": {
          "danish_snowball": {
              "type": "snowball",
              "language": "Danish"
          }
      }
    }
}

//Add New field mapping to Index
PUT notes/_mapping
{
    "properties":{
      "content":{
        "type": "text",
        "analyzer": "default",
        "fields": {
          "raw": {
            "type": "keyword",
            "normalizer": "default_normalizer"
          }
        }
      },
      "rank":{
        "type": "rank_feature"
      }
    }
}

// Check if mapping is correct
GET /notes/_mapping

// Check if settings are correct
GET /notes/_settings

// Test teh analyzers

GET /notes/_analyze
{
  "analyzer": "default",
  "text" : "Pga. at HULLER i væg skal spartles - skønnet pris..."
}

//Test search after Inserting notes
GET /notes/_count
{
  "query": {
    "match_all": {}
  }
}

GET /notes/_search
{
  "query": {
    "match": {
      "content": {
        "query": "Pga. at HULLER ",
        "operator": "or"
      }
    }
  }
}

// Insert notes in the index. If doesn't work go to folder with json file containing all the notes
//and use curl function: curl -H "Content-Type: application/x-ndjson" -XPOST -u toms:helloworld http://search.aensland.tech/notes/_bulk --data-binary "@notesNDJSON.json"

POST notes/_bulk
{"index":{}}
{"content":"Maling er ikke dækkende","rank":4896}
{"index":{}}
{"content":"Hakket og skrammet","rank":7477}
{"index":{}}
{"content":"Malet med vægmaling","rank":3987}
{"index":{}}
{"content":"Efter beslag","rank":3630}
{"index":{}}
{"content":"Efter ledninger","rank":2897}
{"index":{}}
{"content":"Efter skæremærker","rank":2897}
{"index":{}}
{"content":"Nikotinskadet","rank":3645}
{"index":{}}
{"content":"Vægmaling på","rank":3982}
{"index":{}}
{"content":"Skal være hvid iflg. afdelingens vedligeholdelsesreglement","rank":3621}
{"index":{}}
{"content":"Skal være grå iflg. afdelingens vedligeholdelsesreglement","rank":3621}
{"index":{}}
{"content":"Maling på","rank":5726}
{"index":{}}
{"content":"Efter knager","rank":183}
{"index":{}}
{"content":"Efter gammel måler","rank":181}
{"index":{}}
{"content":"Nikontinskadet","rank":181}
{"index":{}}
{"content":"Loft har revner","rank":181}
{"index":{}}
{"content":"Ødelagt","rank":10759}
{"index":{}}
{"content":"Er ikke håndværksmæssigt korrekt opsat","rank":363}
{"index":{}}
{"content":"Ikke standard","rank":8565}
{"index":{}}
{"content":"Maling afskaller","rank":368}
{"index":{}}
{"content":"Gennemslidninger","rank":1075}
{"index":{}}
{"content":"Efter tæppeaftryk","rank":348}
{"index":{}}
{"content":"For at bevare overfladens levetid","rank":674}
{"index":{}}
{"content":"Gennemslidninger og ridser","rank":717}
{"index":{}}
{"content":"Gennemslidninger og maling på","rank":716}
{"index":{}}
{"content":"Efter gulvbelægning er fjernet","rank":534}
{"index":{}}
{"content":"Dybe ridser","rank":736}
{"index":{}}
{"content":"Dybe ridser og hakker","rank":729}
{"index":{}}
{"content":"Dybe ridser og maling på","rank":716}
{"index":{}}
{"content":"Vand-/ og fugtskadet","rank":359}
{"index":{}}
{"content":"Efter gulvtæppe / limrester","rank":715}
{"index":{}}
{"content":"Farveforskelle","rank":729}
{"index":{}}
{"content":"Efter kakkelovn","rank":716}
{"index":{}}
{"content":"Vand-/ fugtskadet","rank":368}
{"index":{}}
{"content":"Nedslidt","rank":1518}
{"index":{}}
{"content":"Revner","rank":405}
{"index":{}}
{"content":"Efter nikotin","rank":364}
{"index":{}}
{"content":"Snavset","rank":376}
{"index":{}}
{"content":"Renoveres under den kollektive råderet","rank":438}
{"index":{}}
{"content":"Ulovlige iflg. Brandmyndighederne","rank":438}
{"index":{}}
{"content":"Arbejdet er ikke ansøgt","rank":438}
{"index":{}}
{"content":"Byggesagen","rank":451}
{"index":{}}
{"content":"Vandskadet","rank":2440}
{"index":{}}
{"content":"Mangler","rank":10862}
{"index":{}}
{"content":"Henstår i kælder","rank":219}
{"index":{}}
{"content":"Mangler (kommuneregning","rank":219}
{"index":{}}
{"content":"Monteret ovenpå gulvtæpper","rank":219}
{"index":{}}
{"content":"Ødelagt efter rollator","rank":876}
{"index":{}}
{"content":"Mangler efter skab","rank":219}
{"index":{}}
{"content":"Jf. afdelingens lokale vedligeholdelsesreglement","rank":219}
{"index":{}}
{"content":"Tæret","rank":440}
{"index":{}}
{"content":"Ulovlige","rank":219}
{"index":{}}
{"content":"Ødelagte","rank":221}
{"index":{}}
{"content":"Løse","rank":219}
{"index":{}}
{"content":"Bakelit","rank":660}
{"index":{}}
{"content":"Virker ikke","rank":1098}
{"index":{}}
{"content":"Hullet","rank":219}
{"index":{}}
{"content":"Flere mangler","rank":438}
{"index":{}}
{"content":"Huller","rank":244}
{"index":{}}
{"content":"Reparation af mosaikker","rank":219}
{"index":{}}
{"content":"Buler","rank":219}
{"index":{}}
{"content":"Kan ikke rengøres","rank":1328}
{"index":{}}
{"content":"Ødelagt / itu","rank":438}
{"index":{}}
{"content":"Blyindfattede ruder er ikke standard","rank":438}
{"index":{}}
{"content":"I henhold til afdelingens vedligeholdelsesreglement eller ordensregler","rank":1095}
{"index":{}}
{"content":"Er gået ud","rank":219}
{"index":{}}
{"content":"Ommales på grund af forkert farvevalg","rank":219}
{"index":{}}
{"content":"Nøgler mangler","rank":219}
{"index":{}}
{"content":"Nøgler ude af system","rank":219}
{"index":{}}
{"content":"Cylinder ude af system","rank":219}
{"index":{}}
{"content":"Fogedsag","rank":219}
{"index":{}}
{"content":"Ulovlige iflg. bygningsreglementet","rank":219}
{"index":{}}
{"content":"Male3t med vægmaling","rank":2}
{"index":{}}
{"content":"Hakket og skrammet, samt maling på","rank":2}
{"index":{}}
{"content":"Males hvidt iflg. vedligeholdelsesreglementet","rank":179}
{"index":{}}
{"content":"Fugtskadet / ødelagt","rank":217}
{"index":{}}
{"content":"Mellem gulv og vægge","rank":179}
{"index":{}}
{"content":"Efter vaskemaskine","rank":217}
{"index":{}}
{"content":"Efter opvaskemaskine","rank":221}
{"index":{}}
{"content":"Efter parabol mv","rank":217}
{"index":{}}
{"content":"Blændet","rank":217}
{"index":{}}
{"content":"Ikke udført håndværksmæssigt korrekt","rank":218}
{"index":{}}
{"content":"Iflg. afd","rank":437}
{"index":{}}
{"content":"Har revner","rank":17}
{"index":{}}
{"content":"Efter gulvtæppe/limrester","rank":1}
{"index":{}}
{"content":"Vamd-/og fugtskadet","rank":1}
{"index":{}}
{"content":"Pga. malerpletter - skønnet pris","rank":3}
{"index":{}}
{"content":"Skønnet pris","rank":3}
{"index":{}}
{"content":"Blot en test","rank":1}
{"index":{}}
{"content":"Er ødelagt - skønnet pris","rank":3}
{"index":{}}
{"content":"Fastgørelse af skabslåge - skønnet pris","rank":3}
{"index":{}}
{"content":"Klikgulv fjernes - skønnet pris","rank":3}
{"index":{}}
{"content":"Mangler / fjernet fra lejemålet - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. anden farve - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. andet tapet","rank":2}
{"index":{}}
{"content":"Pga. at huller i væg skal spartles - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. hakker - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. hund - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. højhælet sko - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. kat - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. ridser - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. ridser og hakker - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. søm- og skruehuller - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. tapet mangler - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. urin - skønnet pris","rank":3}
{"index":{}}
{"content":"Pletmales","rank":19}
{"index":{}}
{"content":"Tapet løst","rank":7}
{"index":{}}
{"content":"Tæpper fjernes - skønnet pris","rank":3}
{"index":{}}
{"content":"Afløb i bad","rank":3}
{"index":{}}
{"content":"Vinduesbundplade udskiftes - skønnet pris","rank":3}
{"index":{}}
{"content":"Vinyl / linoleum fjernes - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. nikotin - skønnet pris","rank":3}
{"index":{}}
{"content":"Tapet løst - skønnet pris","rank":3}
{"index":{}}
{"content":"Pga. hakker","rank":3}
{"index":{}}
{"content":"Pga. anden farve","rank":3}
{"index":{}}
{"content":"Mangelfuld rengøring","rank":17}
{"index":{}}
{"content":"Er ødelagt","rank":3}
{"index":{}}
{"content":"Mangler / fjernet fra lejemålet","rank":2}
{"index":{}}
{"content":"Pga. kalk","rank":3}
{"index":{}}
{"content":"Pga. kat","rank":3}
{"index":{}}
{"content":"Pga. hund","rank":3}
{"index":{}}
{"content":"Pga. malerpletter","rank":3}
{"index":{}}
{"content":"Efter renoveringen","rank":5}
{"index":{}}
{"content":"Overtegnet","rank":2}
{"index":{}}
{"content":"Nye skabe monteres","rank":2}
{"index":{}}
{"content":"Tilkalket","rank":70}
{"index":{}}
{"content":"Topdæksel på toilet udskiftes","rank":2}
{"index":{}}
{"content":"Emhætte udskiftes","rank":5}
{"index":{}}
{"content":"Kun kælderrum iflg. aftale med fraflytter","rank":2}
{"index":{}}
{"content":"Lamper","rank":4}
{"index":{}}
{"content":"Store ridser i gulv. Slibes og lakeres","rank":1}
{"index":{}}
{"content":"Lamper mv","rank":3}
{"index":{}}
{"content":"Hylder mv","rank":2}
{"index":{}}
{"content":"Sorte aftegninger","rank":2}
{"index":{}}
{"content":"Kalk på","rank":159}
{"index":{}}
{"content":"Bruse forhængsstang","rank":3}
{"index":{}}
{"content":"Kontakt til opvaskemaskine fastgøres i vaskskab synligt","rank":2}
{"index":{}}
{"content":"Mangler / fjernet fra lejemålet","rank":1}
{"index":{}}
{"content":"Pga. andet tapet - skønnet pris","rank":1}
{"index":{}}
{"content":"Pga. at huller i væg skal spartles","rank":2}
{"index":{}}
{"content":"Pga. højhælet sko","rank":2}
{"index":{}}
{"content":"Pga. kalk - skønnet pris","rank":2}
{"index":{}}
{"content":"Pga. nikotin","rank":5}
{"index":{}}
{"content":"Pga. ridser","rank":2}
{"index":{}}
{"content":"Pga. ridser og hakker","rank":2}
{"index":{}}
{"content":"Pga. søm- og skruehuller","rank":2}
{"index":{}}
{"content":"Pga. tapet mangler","rank":2}
{"index":{}}
{"content":"Pga. urin","rank":2}
{"index":{}}
{"content":"Terrazzogulv slibes og behandles","rank":6}
{"index":{}}
{"content":"Fliser mangler i køkken","rank":3}
{"index":{}}
{"content":"Klistermærker","rank":4}
{"index":{}}
{"content":"Rengøres","rank":98}
{"index":{}}
{"content":"Kun på 1 væg","rank":3}
{"index":{}}
{"content":"Altan vægge maling på","rank":3}
{"index":{}}
{"content":"Fittings på rør fjernes efter opvaskemaskine","rank":3}
{"index":{}}
{"content":"Afventer nye leverandør","rank":3}
{"index":{}}
{"content":"Bordplade og skab udluses","rank":3}
{"index":{}}
{"content":"Opfriskes","rank":14}
{"index":{}}
{"content":"Huller i murværk","rank":2}
{"index":{}}
{"content":"Hakket og skrammet samt malingen er ikke dækkende","rank":3}
{"index":{}}
{"content":"Skal udføres","rank":3}
{"index":{}}
{"content":"Se indflytningsrapport","rank":91}
{"index":{}}
{"content":"Kontakter og afbrydere udskiftes","rank":7}
{"index":{}}
{"content":"Skabe eftergås","rank":1}
{"index":{}}
{"content":"Lamper og rullegardiner","rank":1}
{"index":{}}
{"content":"Gerigt mod servicerum ødelagt","rank":1}
{"index":{}}
{"content":"Dør mod entre","rank":1}
{"index":{}}
{"content":"Bordplade vandskadet","rank":4}
{"index":{}}
{"content":"Ingen nøgle afleveret","rank":1}
{"index":{}}
{"content":"Tømnes","rank":4}
{"index":{}}
{"content":"Klister på vindue","rank":1}
{"index":{}}
{"content":"Kun afvaskning af vandrette flader","rank":3}
{"index":{}}
{"content":"For kalk og snavs","rank":1}
{"index":{}}
{"content":"Skidt og snavs","rank":1}
{"index":{}}
{"content":"Snavset og kalk på","rank":4}
{"index":{}}
{"content":"Afpropning af strøm","rank":2}
{"index":{}}
{"content":"Reparation af hul","rank":2}
{"index":{}}
{"content":"Rengøres let","rank":2}
{"index":{}}
{"content":"Tangent ødelagt","rank":2}
{"index":{}}
{"content":"Ekstra behandling pga. farvevalg på 1 væg","rank":1}
{"index":{}}
{"content":"Se mangelliste og/ indflytningsrapport","rank":1}
{"index":{}}
{"content":"Omkodningen med 4 nøgler","rank":1}
{"index":{}}
{"content":"Bordplade ved vask vandskadet","rank":1}
{"index":{}}
{"content":"Beslag nedtages","rank":6}
{"index":{}}
{"content":"Efter klistermærker mv","rank":1}
{"index":{}}
{"content":"Standard monteres","rank":1}
{"index":{}}
{"content":"Standard amaturer monteres","rank":1}
{"index":{}}
{"content":"Badeværelsesudstyr og skabe nedtages","rank":1}
{"index":{}}
{"content":"Snavset udvendigt","rank":1}
{"index":{}}
{"content":"Står løst i boligen","rank":1}
{"index":{}}
{"content":"Lakken slidt af","rank":1}
{"index":{}}
{"content":"Eftergås","rank":3}
{"index":{}}
{"content":"Rørbæringer monteres","rank":3}
{"index":{}}
{"content":"Samt ny gasmåler","rank":3}
{"index":{}}
{"content":"Tapet afrenses","rank":2}
{"index":{}}
{"content":"Tapet repareres","rank":4}
{"index":{}}
{"content":"Flere med huller","rank":2}
{"index":{}}
{"content":"Efter kat","rank":2}
{"index":{}}
{"content":"Fjernes","rank":14}
{"index":{}}
{"content":"Pletmalet","rank":33}
{"index":{}}
{"content":"Efter persienne","rank":2}
{"index":{}}
{"content":"Ridset","rank":48}
{"index":{}}
{"content":"Komfur fjernes","rank":8}
{"index":{}}
{"content":"Mangler ved overskab","rank":2}
{"index":{}}
{"content":"Standard lampe monteres","rank":2}
{"index":{}}
{"content":"Strømudtag nedtages","rank":1}
{"index":{}}
{"content":"Lette aftegninger","rank":2}
{"index":{}}
{"content":"Kalk på fliser","rank":10}
{"index":{}}
{"content":"Efter skab","rank":14}
{"index":{}}
{"content":"Lås sidder på","rank":3}
{"index":{}}
{"content":"Ridset og fugtskadet","rank":1}
{"index":{}}
{"content":"Samt håndvask udskiftes","rank":3}
{"index":{}}
{"content":"Dåse monteres ved gulv","rank":3}
{"index":{}}
{"content":"Strøm afproppes","rank":2}
{"index":{}}
{"content":"Spartlinger slibes ned. Kan nedslibning ikke fjerne spartlinger","rank":2}
{"index":{}}
{"content":"Gamle kontakter udskiftes","rank":2}
{"index":{}}
{"content":"Maling ikke dækkende","rank":7}
{"index":{}}
{"content":"Maling skaller af","rank":3}
{"index":{}}
{"content":"Er ikke håndværksmæssigt korrekt udført","rank":12}
{"index":{}}
{"content":"Er ikke håndværksmæssigt korrekt","rank":4}
{"index":{}}
{"content":"Forkert type maling","rank":1}
{"index":{}}
{"content":"Ej nymalet","rank":1}
{"index":{}}
{"content":"Streger efter slibemaskine","rank":1}
{"index":{}}
{"content":"Ej nybehandlet (slib/3 x lak","rank":1}
{"index":{}}
{"content":"Let gennemslidt","rank":1}
{"index":{}}
{"content":"Væsentlige ridser","rank":1}
{"index":{}}
{"content":"Mangler afkalkning af fliser","rank":1}
{"index":{}}
{"content":"Mangler afkalkning omkring vandhane","rank":1}
{"index":{}}
{"content":"Ruder ej nypudsede","rank":1}
{"index":{}}
{"content":"Spindelvæv i hjørner/loft","rank":1}
{"index":{}}
{"content":"Fodpaneler ej rengjorte","rank":1}
{"index":{}}
{"content":"Afkalk af armatur","rank":1}
{"index":{}}
{"content":"Afkalk af fliser","rank":1}
{"index":{}}
{"content":"Afkalk af brusehoved","rank":1}
{"index":{}}
{"content":"Fremstår pæne","rank":1}
{"index":{}}
{"content":"Lugter","rank":1}
{"index":{}}
{"content":"Maling skaller","rank":1}
{"index":{}}
{"content":"Håndtag eftergås mv","rank":2}
{"index":{}}
{"content":"Blev nedtaget efter indflytning på beboeres foranledning","rank":2}
{"index":{}}
{"content":"Ulovlig installation nedtages","rank":3}
{"index":{}}
{"content":"Fugtskadet","rank":31}
{"index":{}}
{"content":"Afslutning mangler ved vinduesplade","rank":2}
{"index":{}}
{"content":"Mobilt køkken skal gennemgås og justeres","rank":2}
{"index":{}}
{"content":"Der er lavet lille hul i glas","rank":2}
{"index":{}}
{"content":"Tusch på","rank":2}
{"index":{}}
{"content":"Loftrum tømmes for effekter","rank":2}
{"index":{}}
{"content":"Løs kontakt","rank":4}
{"index":{}}
{"content":"Skimmelsvamp i højre hjørne","rank":2}
{"index":{}}
{"content":"Fugt fra bad","rank":2}
{"index":{}}
{"content":"Højskab","rank":2}
{"index":{}}
{"content":"Gerekt mod trappe udskiftes","rank":2}
{"index":{}}
{"content":"Nikotin","rank":142}
{"index":{}}
{"content":"Brandsikring om rør ved loft","rank":2}
{"index":{}}
{"content":"Sanvset","rank":2}
{"index":{}}
{"content":"Håndtag mv","rank":2}
{"index":{}}
{"content":"Sæberester","rank":6}
{"index":{}}
{"content":"Tilhører ikke lejemålet","rank":2}
{"index":{}}
{"content":"Pga. spartel","rank":2}
{"index":{}}
{"content":"NAME","rank":4}
{"index":{}}
{"content":"Spærring nædvendig efter nikotin","rank":1}
{"index":{}}
{"content":"Bakelitkontakter og afbrydere","rank":1}
{"index":{}}
{"content":"Samt hylder","rank":1}
{"index":{}}
{"content":"nikotinskadet","rank":1}
{"index":{}}
{"content":"Standardnote 1","rank":1}
{"index":{}}
{"content":"Efter skridunderlag og gennemslidninger","rank":2}
{"index":{}}
{"content":"Ikke malet forneden","rank":2}
{"index":{}}
{"content":"Vandskade under lak foran fransk altan","rank":2}
{"index":{}}
{"content":"Rørkasse","rank":2}
{"index":{}}
{"content":"Kradsemærker efter kat","rank":2}
{"index":{}}
{"content":"Tømmes","rank":11}
{"index":{}}
{"content":"Trævæg males ikke","rank":1}
{"index":{}}
{"content":"Ved radiator","rank":2}
{"index":{}}
{"content":"Hul efter kogeplade","rank":2}
{"index":{}}
{"content":"Efter hængsler","rank":2}
{"index":{}}
{"content":"Vægplader mv. ikke standard","rank":2}
{"index":{}}
{"content":"Efterfølgende reparation af huller","rank":2}
{"index":{}}
{"content":"Samt filter","rank":2}
{"index":{}}
{"content":"Håndtag udskiftes","rank":3}
{"index":{}}
{"content":"Nøgler ikke afleveret","rank":12}
{"index":{}}
{"content":"Puds ødelagt/vandskade","rank":1}
{"index":{}}
{"content":"Maling på naturtræ","rank":1}
{"index":{}}
{"content":"Efter vaskimaskine","rank":2}
{"index":{}}
{"content":"Fyldt. Afdelingen har fotos","rank":2}
{"index":{}}
{"content":"Vask og blandingsbatteri","rank":1}
{"index":{}}
{"content":"Persienner","rank":1}
{"index":{}}
{"content":"Finer skadet","rank":1}
{"index":{}}
{"content":"Samt skuffefronter","rank":1}
{"index":{}}
{"content":"Fodpaneler udskiftes","rank":1}
{"index":{}}
{"content":"Malet","rank":30}
{"index":{}}
{"content":"Døre","rank":8}
{"index":{}}
{"content":"Ridser i lakken","rank":14}
{"index":{}}
{"content":"Reparation efter badeforhængsstang","rank":2}
{"index":{}}
{"content":"Kalkaftegninger","rank":2}
{"index":{}}
{"content":"Monteres","rank":15}
{"index":{}}
{"content":"Afpropning efter komfur","rank":2}
{"index":{}}
{"content":"Emhætte","rank":7}
{"index":{}}
{"content":"Trappetrin","rank":9}
{"index":{}}
{"content":"Vandrette flader aftørres","rank":2}
{"index":{}}
{"content":"1 stk. mangler","rank":2}
{"index":{}}
{"content":"Se mangelliste","rank":111}
{"index":{}}
{"content":"Rullespor","rank":6}
{"index":{}}
{"content":"Kan slibning og behandling ikke fjerne skaderne","rank":2}
{"index":{}}
{"content":"Der er ikke lavet indflytningsrapport","rank":18}
{"index":{}}
{"content":"Håndtag","rank":3}
{"index":{}}
{"content":"Lampeudtag","rank":3}
{"index":{}}
{"content":"3 gange lak iflg. afdelingens lokale vedligeholdelsesreglement","rank":2}
{"index":{}}
{"content":"Samt rør","rank":7}
{"index":{}}
{"content":"Bakelit kontakter og afbrydere","rank":2}
{"index":{}}
{"content":"Samt skunk","rank":4}
{"index":{}}
{"content":"Greb monteres","rank":2}
{"index":{}}
{"content":"Ovn+topplade+plader rengøres","rank":1}
{"index":{}}
{"content":"Point graduering mangler","rank":2}
{"index":{}}
{"content":"Point graduering ikke angivet på indflytningsrapport","rank":2}
{"index":{}}
{"content":"Kabelkasse","rank":7}
{"index":{}}
{"content":"Tape","rank":2}
{"index":{}}
{"content":"Vægmaling på bagkanter","rank":3}
{"index":{}}
{"content":"Afslutning på elementer mangler","rank":3}
{"index":{}}
{"content":"Efter køkkenrenovering","rank":4}
{"index":{}}
{"content":"Maling skrabet af under klistermærker","rank":1}
{"index":{}}
{"content":"Huller efter skruer spartles og males","rank":1}
{"index":{}}
{"content":"Krads-mærker efter kat","rank":1}
{"index":{}}
{"content":"Mærker efter husdyr","rank":1}
{"index":{}}
{"content":"Efter vandskade","rank":6}
{"index":{}}
{"content":"Persienner sad oppe ved indflytningen","rank":2}
{"index":{}}
{"content":"Højskabe maling krakkelere","rank":3}
{"index":{}}
{"content":"Skæremærker","rank":2}
{"index":{}}
{"content":"Spejl","rank":1}
{"index":{}}
{"content":"Røg alarm","rank":1}
{"index":{}}
{"content":"Efter mosaik er fjernet","rank":1}
{"index":{}}
{"content":"Store områder med løse fliser og mosaik","rank":1}
{"index":{}}
{"content":"Efter nedtagelse af løse fliser","rank":1}
{"index":{}}
{"content":"ledninger mv","rank":1}
{"index":{}}
{"content":"Hvid plast nikotinskadet","rank":1}
{"index":{}}
{"content":"Ikke gjort ved sidste istandsættelse","rank":2}
{"index":{}}
{"content":"Aftøres med våd klud","rank":2}
{"index":{}}
{"content":"Efter folie","rank":7}
{"index":{}}
{"content":"Dueefterladenskaber","rank":3}
{"index":{}}
{"content":"Slibes og behandles","rank":1}
{"index":{}}
{"content":"Låger og skuffefronter udskiftes","rank":2}
{"index":{}}
{"content":"Malet på ydersiden","rank":2}
{"index":{}}
{"content":"ikke håndværksmæssigt korrekt udført","rank":2}
{"index":{}}
{"content":"laminerede låger og skuffefronter","rank":2}
{"index":{}}
{"content":"Samt ingeniørskab","rank":2}
{"index":{}}
{"content":"Maling afrenses","rank":3}
{"index":{}}
{"content":"I forbindelse med udskiftning af bordplade","rank":3}
{"index":{}}
{"content":"Afhjælpning i forbindelse med udskiftning af bordplade","rank":4}
{"index":{}}
{"content":"Persienner nedtages","rank":4}
{"index":{}}
{"content":"Lampe nedtages","rank":20}
{"index":{}}
{"content":"Hylder reetableres","rank":2}
{"index":{}}
{"content":"Hylde monteres","rank":2}
{"index":{}}
{"content":"Slange og bruser monteres","rank":2}
{"index":{}}
{"content":"Håndtag fjernes","rank":2}
{"index":{}}
{"content":"Dørtrin reetableres","rank":2}
{"index":{}}
{"content":"Ryddes for møbler og gulvtæpper","rank":2}
{"index":{}}
{"content":"Kælderrum tømmes og rengøres","rank":2}
{"index":{}}
{"content":"Skiftes pga. af følgeskader","rank":2}
{"index":{}}
{"content":"Mangelfuld udførelse","rank":2}
{"index":{}}
{"content":"Blænding af dør laves om. Ikje udført håndværksmæssigt korrekt","rank":3}
{"index":{}}
{"content":"Toilet genmonteres","rank":3}
{"index":{}}
{"content":"Sokkel færdigøres","rank":3}
{"index":{}}
{"content":"Rørmanchetter monteres","rank":3}
{"index":{}}
{"content":"Fodpanel monteres","rank":3}
{"index":{}}
{"content":"Reparation af dør","rank":3}
{"index":{}}
{"content":"Skureliste eftergås","rank":3}
{"index":{}}
{"content":"Kun reparation","rank":3}
{"index":{}}
{"content":"Generelt for alle rum","rank":3}
{"index":{}}
{"content":"Efter gamle greb","rank":1}
{"index":{}}
{"content":"Ikke tidligere afslebet i indhak","rank":1}
{"index":{}}
{"content":"Ulovlig installation","rank":4}
{"index":{}}
{"content":"Vandskade","rank":12}
{"index":{}}
{"content":"Samt stålplader","rank":1}
{"index":{}}
{"content":"Ikke point sat på indflytningsrapport","rank":1}
{"index":{}}
{"content":"Minus mod bad","rank":2}
{"index":{}}
{"content":"Afproppes til før målerstuds","rank":2}
{"index":{}}
{"content":"Samt ydervægge males 2 gange med træværksmaling","rank":1}
{"index":{}}
{"content":"Gule aftegninger","rank":2}
{"index":{}}
{"content":"Delvis malet","rank":2}
{"index":{}}
{"content":"Hængsler afrenses for maling","rank":1}
{"index":{}}
{"content":"Fryser afrimes","rank":5}
{"index":{}}
{"content":"Ikke pointgivet på indflytningsrapporten","rank":3}
{"index":{}}
{"content":"Efter kat eller andet","rank":3}
{"index":{}}
{"content":"Skabe fastmonteres","rank":3}
{"index":{}}
{"content":"Foldedør nedtages","rank":3}
{"index":{}}
{"content":"Gammel lakbehandlet skabe malet","rank":3}
{"index":{}}
{"content":"Udskiftes","rank":11}
{"index":{}}
{"content":"Vandnæse monteres på dør","rank":3}
{"index":{}}
{"content":"Ydervægge males 2 gange med træværksmaling","rank":1}
{"index":{}}
{"content":"Efter boedplade er udskiftet","rank":2}
{"index":{}}
{"content":"Efter bordplade er udskiftet","rank":2}
{"index":{}}
{"content":"Kontakter afproppes med propper","rank":2}
{"index":{}}
{"content":"Silikat maling","rank":4}
{"index":{}}
{"content":"Ikke afproppet efter lovkrav","rank":2}
{"index":{}}
{"content":"Ikke istandsat ved indflytning","rank":12}
{"index":{}}
{"content":"Kroge","rank":1}
{"index":{}}
{"content":"Iflg. afdelingens råderetskatelog","rank":1}
{"index":{}}
{"content":"Samt indsats","rank":2}
{"index":{}}
{"content":"Topstykke udskiftes","rank":2}
{"index":{}}
{"content":"Låge ødelagt","rank":2}
{"index":{}}
{"content":"Glideskinne monteres","rank":1}
{"index":{}}
{"content":"Hylde","rank":3}
{"index":{}}
{"content":"Fugtpletter","rank":3}
{"index":{}}
{"content":"Glashylde mangler","rank":1}
{"index":{}}
{"content":"Lak på","rank":2}
{"index":{}}
{"content":"Belægning på overflade","rank":2}
{"index":{}}
{"content":"Oppudsning af bagvæg bag hul ved underskabe","rank":2}
{"index":{}}
{"content":"Efter aftegninger","rank":2}
{"index":{}}
{"content":"Baldakin","rank":1}
{"index":{}}
{"content":"Efter opvaskemaskine og/ vaskemaskine","rank":1}
{"index":{}}
{"content":"Udskiftning af 2 baner tapet","rank":2}
{"index":{}}
{"content":"I skabe","rank":3}
{"index":{}}
{"content":"Fuge mellem gulv og vægge","rank":2}
{"index":{}}
{"content":"Lampeudtag udskiftes","rank":4}
{"index":{}}
{"content":"1 ekstra gang lak","rank":3}
{"index":{}}
{"content":"Faldstamme og grenrør","rank":3}
{"index":{}}
{"content":"Køkken tømmes for ikke tilhørende effekter","rank":3}
{"index":{}}
{"content":"Nøgler","rank":1}
{"index":{}}
{"content":"Norm betyder i dette tilfælde","rank":3}
{"index":{}}
{"content":"Fyldt med inventar","rank":1}
{"index":{}}
{"content":"Ikke slebet i bund ved sidste istandsættelse","rank":1}
{"index":{}}
{"content":"Lamper og gardiner","rank":2}
{"index":{}}
{"content":"Højskabe","rank":6}
{"index":{}}
{"content":"T-stk. k/v","rank":3}
{"index":{}}
{"content":"Kollektiv råderet","rank":3}
{"index":{}}
{"content":"Væske efter død person","rank":2}
{"index":{}}
{"content":"Reparation af væg efter skab","rank":2}
{"index":{}}
{"content":"Samt malede fliser","rank":3}
{"index":{}}
{"content":"rengøring af badeværelse","rank":2}
{"index":{}}
{"content":"Radiator hakket/ridset","rank":4}
{"index":{}}
{"content":"Fodpaneler hakket/ridset","rank":2}
{"index":{}}
{"content":"Panelunderlag malerpletter","rank":4}
{"index":{}}
{"content":"Kontakter/rammer malerpletter","rank":4}
{"index":{}}
{"content":"Loftudtag malerpletter","rank":4}
{"index":{}}
{"content":"Vægfliser/gulvfliser/fuger skjoldet og pletter","rank":4}
{"index":{}}
{"content":"Dørkarme hakker/ridser","rank":4}
{"index":{}}
{"content":"Hængelås kælderrum","rank":4}
{"index":{}}
{"content":"Dørbrikker gadedøre","rank":4}
{"index":{}}
{"content":"Fliser males","rank":2}
{"index":{}}
{"content":"Flere løse","rank":2}
{"index":{}}
{"content":"Altandør","rank":2}
{"index":{}}
{"content":"Altandørsomfatning","rank":2}
{"index":{}}
{"content":"Naturtræ behandles","rank":2}
{"index":{}}
{"content":"Samt ventilationsrør","rank":2}
{"index":{}}
{"content":"Hakker og skrammer","rank":6}
{"index":{}}
{"content":"Sæberester og kalk","rank":3}
{"index":{}}
{"content":"Ridser","rank":85}
{"index":{}}
{"content":"Forhøjet sæde er monteres af kommunen","rank":2}
{"index":{}}
{"content":"Efter håndtag er nedtaget. Opsat af kommunen","rank":2}
{"index":{}}
{"content":"Løsthængende lampeudtag","rank":2}
{"index":{}}
{"content":"Males 2 gange. Meter antal er fordoblet","rank":2}
{"index":{}}
{"content":"Fremstår ikke nymalet","rank":1}
{"index":{}}
{"content":"Skrammede","rank":6}
{"index":{}}
{"content":"Skrammet","rank":60}
{"index":{}}
{"content":"Ekstra rengøring pga. Nikotin","rank":2}
{"index":{}}
{"content":"Manglende rengøring","rank":316}
{"index":{}}
{"content":"Efter væg","rank":4}
{"index":{}}
{"content":"Hakker og maling dækker ikke i værelse 3","rank":2}
{"index":{}}
{"content":"Standardnote","rank":2}
{"index":{}}
{"content":"Skrammet og ridset","rank":6}
{"index":{}}
{"content":"Lampeudtagsdæksel mangler","rank":3}
{"index":{}}
{"content":"Ikke afkalket","rank":37}
{"index":{}}
{"content":"Gennemslidt","rank":11}
{"index":{}}
{"content":"Ikke rengjort","rank":267}
{"index":{}}
{"content":"Ikke pudset","rank":23}
{"index":{}}
{"content":"Pga.robotstøvsuger","rank":2}
{"index":{}}
{"content":"Samt skureliste","rank":2}
{"index":{}}
{"content":"Fliser udluses","rank":2}
{"index":{}}
{"content":"Omstilling af låse til hoveddør","rank":2}
{"index":{}}
{"content":"Skal kun plettes hvor der er slået skaller af","rank":2}
{"index":{}}
{"content":"Væg monteres","rank":2}
{"index":{}}
{"content":"Samt ydervægge","rank":2}
{"index":{}}
{"content":"Dæksel monteres på lampeudtag","rank":2}
{"index":{}}
{"content":"Systemnøgler","rank":2}
{"index":{}}
{"content":"Systemnøgle passer til hoveddør","rank":2}
{"index":{}}
{"content":"monteret røgmelder","rank":2}
{"index":{}}
{"content":"Misfarvet","rank":61}
{"index":{}}
{"content":"Farveskift til hvid","rank":15}
{"index":{}}
{"content":"Mangler rengøring","rank":83}
{"index":{}}
{"content":"Udbedres snarest","rank":2}
{"index":{}}
{"content":"Ingen el ellet vandinstallation til vaskemaskine. Standardarmatur opsat","rank":2}
{"index":{}}
{"content":"Fodpaneler hakket/ridset/mærker","rank":2}
{"index":{}}
{"content":"Dør hakket ridset","rank":2}
{"index":{}}
{"content":"Køkken: låger og skuffer slidte - sokkel slidt/ridset/malerpletter","rank":2}
{"index":{}}
{"content":"Køkkenbord slidt - bagkantliste slidt","rank":2}
{"index":{}}
{"content":"Diverse udluset huller i fuger","rank":2}
{"index":{}}
{"content":"Husk vægge i skabe og magasiner","rank":3}
{"index":{}}
{"content":"Husk lofter i skabe og magasiner","rank":3}
{"index":{}}
{"content":"Kun vandrette flader","rank":3}
{"index":{}}
{"content":"Søjler skal have brandhæmmende maling","rank":2}
{"index":{}}
{"content":"2-komponent epoxylak","rank":6}
{"index":{}}
{"content":"Skuremærker","rank":2}
{"index":{}}
{"content":"Dybe ridset","rank":2}
{"index":{}}
{"content":"Spærrende + maling","rank":3}
{"index":{}}
{"content":"Skruehuller rep","rank":10}
{"index":{}}
{"content":"Lejer : Mellemslib +1x lak og afd. slibning + 2x lak","rank":1}
{"index":{}}
{"content":"Skimmelsvamp i kantfuge","rank":2}
{"index":{}}
{"content":"Iht. leverandørs anbefalinger","rank":2}
{"index":{}}
{"content":"Stav udskiftes på parketgulv","rank":3}
{"index":{}}
{"content":"Lampeudtag mangler. Ledninger blottet","rank":3}
{"index":{}}
{"content":"Manchetter omkring rør udskiftes/monteres","rank":3}
{"index":{}}
{"content":"I badezonen","rank":3}
{"index":{}}
{"content":"Ej ren","rank":68}
{"index":{}}
{"content":"Affaldstativ og emfang til stede. Installation til vaskemaskine til stede","rank":2}
{"index":{}}
{"content":"Installation til vaskemaskine til stede. Standardarmatur for Sammenlægningslejligheder opsat. Ingen lys i bad - standard hvor Sammenlægningslejligheder","rank":2}
{"index":{}}
{"content":"Lamper nedtages","rank":5}
{"index":{}}
{"content":"Håndvask udskiftes","rank":7}
{"index":{}}
{"content":"Reparation af huller i fuger og fliser","rank":3}
{"index":{}}
{"content":"Komplet rengøring","rank":18}
{"index":{}}
{"content":"Sokkel monteres","rank":3}
{"index":{}}
{"content":"Samt div. beslag","rank":3}
{"index":{}}
{"content":"Efter foliet er fjernet","rank":2}
{"index":{}}
{"content":"Liste ved vindue (fuges","rank":2}
{"index":{}}
{"content":"Samt ramme","rank":2}
{"index":{}}
{"content":"Ingen tryk på vand","rank":2}
{"index":{}}
{"content":"Dødt gasrør nedtages","rank":2}
{"index":{}}
{"content":"Huller i naturtræs vinduer lappes","rank":2}
{"index":{}}
{"content":"Kalk og sæberester på","rank":8}
{"index":{}}
{"content":"Melamin fjernes","rank":2}
{"index":{}}
{"content":"Efter aftale med afdelingskontoret","rank":2}
{"index":{}}
{"content":"Reparation af vindue og udskiftning af indfatning","rank":2}
{"index":{}}
{"content":"Afpropning af strøm ved ildsted","rank":2}
{"index":{}}
{"content":"Hul i underlag","rank":2}
{"index":{}}
{"content":"Magasin reetableres","rank":2}
{"index":{}}
{"content":"Standard udstyr opsættes","rank":2}
{"index":{}}
{"content":"Løs dørplade","rank":2}
{"index":{}}
{"content":"Ikke fjernet","rank":20}
{"index":{}}
{"content":"Ikke nedtaget","rank":10}
{"index":{}}
{"content":"Hakker","rank":22}
{"index":{}}
{"content":"Ridse","rank":2}
{"index":{}}
{"content":"Tæppetape","rank":11}
{"index":{}}
{"content":"Ikke tømt","rank":21}
{"index":{}}
{"content":"Mangler samt slange","rank":2}
{"index":{}}
{"content":"Ødelagte installationer","rank":2}
{"index":{}}
{"content":"Ikke udført korrekt","rank":4}
{"index":{}}
{"content":"Vægmaling på træværk","rank":4}
{"index":{}}
{"content":"Vægmaling på kontakt","rank":2}
{"index":{}}
{"content":"Malerpletter","rank":4}
{"index":{}}
{"content":"Lakeret udenom tæppe","rank":1}
{"index":{}}
{"content":"Efter fjernelse af klikgulv","rank":1}
{"index":{}}
{"content":"Efter etablering af blændet dør","rank":1}
{"index":{}}
{"content":"Efter væg er flyttet tilbage til standard","rank":1}
{"index":{}}
{"content":"Fodpaneler rykkes ned. Har været monteret ovenpå gulvtæppe","rank":1}
{"index":{}}
{"content":"Klikgulv fjernes","rank":3}
{"index":{}}
{"content":"Efter beslag mv","rank":1}
{"index":{}}
{"content":"Gulvbelægning fjernes","rank":4}
{"index":{}}
{"content":"Fodpaneler udskiftes til standard","rank":1}
{"index":{}}
{"content":"Gennemslidte og sorte (ludbehandlet","rank":2}
{"index":{}}
{"content":"Efter stearin","rank":2}
{"index":{}}
{"content":"Let slib","rank":6}
{"index":{}}
{"content":"Ved vindue (lysning","rank":2}
{"index":{}}
{"content":"Indvendigt","rank":2}
{"index":{}}
{"content":"Stikkontakt","rank":5}
{"index":{}}
{"content":"Mærker efter støvsuger","rank":12}
{"index":{}}
{"content":"Beslag mv","rank":1}
{"index":{}}
{"content":"Skab henstår i kælder","rank":1}
{"index":{}}
{"content":"Montering af sandlister ved køkkenskabe","rank":2}
{"index":{}}
{"content":"Nikotin misfarvning","rank":2}
{"index":{}}
{"content":"Opskrues og monell behandling","rank":2}
{"index":{}}
{"content":"Rep. Efter gardiner","rank":5}
{"index":{}}
{"content":"Afkalkning","rank":38}
{"index":{}}
{"content":"Rengøring eftergås","rank":2}
{"index":{}}
{"content":"Der er vinyl på gulvet","rank":2}
{"index":{}}
{"content":"Males","rank":45}
{"index":{}}
{"content":"Ikke rigtig farve der er plettet med","rank":2}
{"index":{}}
{"content":"Røgalarm monteres","rank":2}
{"index":{}}
{"content":"Rengøring bagved radiator","rank":4}
{"index":{}}
{"content":"Flytte møbler","rank":2}
{"index":{}}
{"content":"Skab monteres efter hårde hvidevare","rank":3}
{"index":{}}
{"content":"Kabelkasse monteres","rank":2}
{"index":{}}
{"content":"Nye greb på døre","rank":2}
{"index":{}}
{"content":"Kabinevæg","rank":2}
{"index":{}}
{"content":"Skrammer/mærker rep","rank":2}
{"index":{}}
{"content":"Komplet slibning","rank":4}
{"index":{}}
{"content":"Afmontering / montering af gulvskinner","rank":2}
{"index":{}}
{"content":"Montere sandlister ved køkkenskabe og vinduespartier","rank":2}
{"index":{}}
{"content":"Sandlister afmonteres for gulvslibning","rank":2}
{"index":{}}
{"content":"Ikje istandsat ved sidste istandsættelse","rank":2}
{"index":{}}
{"content":"Ikke istandsat ved sidste istandsættelse","rank":10}
{"index":{}}
{"content":"Loftrum ikke tømt","rank":6}
{"index":{}}
{"content":"Kanter rep","rank":2}
{"index":{}}
{"content":"Snavs og skjolder","rank":2}
{"index":{}}
{"content":"Ikke monteret","rank":4}
{"index":{}}
{"content":"Sorte fuger afrenses","rank":2}
{"index":{}}
{"content":"Samstilles med postkasse","rank":4}
{"index":{}}
{"content":"Samstilles med hoveddør","rank":2}
{"index":{}}
{"content":"Reetablering af blændet dør","rank":3}
{"index":{}}
{"content":"Test","rank":11}
{"index":{}}
{"content":"Kun ydervæg","rank":1}
{"index":{}}
{"content":"Opskuring og monell behandling","rank":8}
{"index":{}}
{"content":"Der er lidt sorte streger på toiletdør og den ene skydedør  prøv at lappe dem","rank":2}
{"index":{}}
{"content":"Ej rengjort","rank":62}
{"index":{}}
{"content":"Fjernet af fraflytter","rank":2}
{"index":{}}
{"content":"Gulnet og ridset","rank":2}
{"index":{}}
{"content":"Riser og slid gennem lak","rank":2}
{"index":{}}
{"content":"Ikke udført hånværkmessigt korrekt af beboer","rank":2}
{"index":{}}
{"content":"Ikke godkendt","rank":2}
{"index":{}}
{"content":"Males hvid","rank":2}
{"index":{}}
{"content":"Rengøring bagved","rank":2}
{"index":{}}
{"content":"Opskures og monell behandling","rank":2}
{"index":{}}
{"content":"Afmontering af sandlister for gulvslibning","rank":4}
{"index":{}}
{"content":"Montering af sandlister","rank":6}
{"index":{}}
{"content":"Afkalkning af fliser ved bruser","rank":2}
{"index":{}}
{"content":"Kalk","rank":73}
{"index":{}}
{"content":"Rengøring","rank":98}
{"index":{}}
{"content":"Spindelvæv og støv","rank":2}
{"index":{}}
{"content":"Højskab på hjul","rank":2}
{"index":{}}
{"content":"Toilet kumme afkalkes","rank":2}
{"index":{}}
{"content":"Udsugningsventil rengøres","rank":2}
{"index":{}}
{"content":"Nymalet på alle malbar overflader","rank":1}
{"index":{}}
{"content":"På grund af søm huller","rank":2}
{"index":{}}
{"content":"Ridser og skrammer","rank":25}
{"index":{}}
{"content":"Streger og ridser","rank":2}
{"index":{}}
{"content":"20-ml2","rank":1}
{"index":{}}
{"content":"Afvaskning - Test","rank":1}
{"index":{}}
{"content":"Både en indflytnings og fraflytnings note - redigeret","rank":1}
{"index":{}}
{"content":"Både en indflytnings og fraflytnings note - skiftet selskab og afdeling efter","rank":1}
{"index":{}}
{"content":"En indflytnings standardnote","rank":1}
{"index":{}}
{"content":"En ny indflytnings note","rank":1}
{"index":{}}
{"content":"hejhej","rank":1}
{"index":{}}
{"content":"Hund har","rank":1}
{"index":{}}
{"content":"Kat har","rank":1}
{"index":{}}
{"content":"kold afvask","rank":1}
{"index":{}}
{"content":"Standardnote test","rank":1}
{"index":{}}
{"content":"Test","rank":2}
{"index":{}}
{"content":"Testnote KRJ","rank":1}
{"index":{}}
{"content":"Testt","rank":1}
{"index":{}}
{"content":"Tilføjet en ny standardnote for indflytning - vægge - redigeret","rank":1}
{"index":{}}
{"content":"Udsugning i emhætten er defekt","rank":1}
{"index":{}}
{"content":"Wololo","rank":1}
{"index":{}}
{"content":"Woop","rank":1}
{"index":{}}
{"content":"Ikke pointsat på indflytningsrapport","rank":3}
{"index":{}}
{"content":"Ny fuge omkring vask","rank":3}
{"index":{}}
{"content":"Opfriskning af malingslag","rank":4}
{"index":{}}
{"content":"Døre monteres","rank":2}
{"index":{}}
{"content":"Ligger løst i lejlighed","rank":1}
{"index":{}}
{"content":"Trappetin","rank":2}
{"index":{}}
{"content":"Skab ødelagt","rank":2}
{"index":{}}
{"content":"Efter lås","rank":2}
{"index":{}}
{"content":"Standard lamper","rank":2}
{"index":{}}
{"content":"Ridser og skrammer og gule af nikotin","rank":2}
{"index":{}}
{"content":"Meget ridset og skrammet","rank":2}
{"index":{}}
{"content":"På grund af ridser og skrammer","rank":8}
{"index":{}}
{"content":"Dørgreb skal skiftes på grund af de ikke kan rengøres og er gule af nikotin","rank":6}
{"index":{}}
{"content":"Kan ikke rengøres på grund af nikotin","rank":4}
{"index":{}}
{"content":"Perlator + afløbsrens + filter + div. 300 kr","rank":2}
{"index":{}}
{"content":"Stikkontakter og afbryde kan ikke rengøres på grund af nikotin er syret ind i kontakten og afbryder","rank":2}
{"index":{}}
{"content":"Vægge og lofter er meget gule af nikotin og kræver ekstra maling behandling","rank":2}
{"index":{}}
{"content":"Skader på dørkarm rep","rank":2}
{"index":{}}
{"content":"Dørplade til bad","rank":2}
{"index":{}}
{"content":"Dørkarm til bad","rank":2}
{"index":{}}
{"content":"Rengøring bag køleskab","rank":6}
{"index":{}}
{"content":"Afmontering af sandlister inden gulvslibning","rank":2}
{"index":{}}
{"content":"Gulv afkalkes under vask og ved bruser","rank":2}
{"index":{}}
{"content":"Fliser afkalkes ved bruser","rank":2}
{"index":{}}
{"content":"Rengøring mangelfuld","rank":15}
{"index":{}}
{"content":"Vask+spærrende+maling","rank":1}
{"index":{}}
{"content":"Skrammer efter brug af gardiner","rank":2}
{"index":{}}
{"content":"Skrammer maling 1 gang fraflytter","rank":2}
{"index":{}}
{"content":"Hoveddør indvendig","rank":12}
{"index":{}}
{"content":"Ridser i gulvet","rank":2}
{"index":{}}
{"content":"Pga nikotin","rank":14}
{"index":{}}
{"content":"Mærker og ridser","rank":9}
{"index":{}}
{"content":"Kalket til","rank":36}
{"index":{}}
{"content":"Hul","rank":2}
{"index":{}}
{"content":"Ridser og mærker og vandskadet","rank":6}
{"index":{}}
{"content":"Altan er ikke ryddet for effekter","rank":2}
{"index":{}}
{"content":"Bordplade er ikke rengjort","rank":2}
{"index":{}}
{"content":"Bordplade ødelagt/misligholdt","rank":2}
{"index":{}}
{"content":"Bordplade ikke lovlig i.h.t. standard","rank":2}
{"index":{}}
{"content":"Skade - reetableres","rank":2}
{"index":{}}
{"content":"Misligholdt","rank":13}
{"index":{}}
{"content":"Pga. maling","rank":5}
{"index":{}}
{"content":"Ødelagt/misligholdt","rank":2}
{"index":{}}
{"content":"Mangelfuldt rengjort","rank":2}
{"index":{}}
{"content":"Slagmærker","rank":2}
{"index":{}}
{"content":"Tapet ikke opsat korrekt","rank":5}
{"index":{}}
{"content":"Tapet mangler","rank":2}
{"index":{}}
{"content":"Tapet påført tuds/andet","rank":2}
{"index":{}}
{"content":"Dørekarme males hvide","rank":4}
{"index":{}}
{"content":"Fodlister males hvide","rank":4}
{"index":{}}
{"content":"Incl. håndvask","rank":2}
{"index":{}}
{"content":"Mange ridser på gulve","rank":2}
{"index":{}}
{"content":"Total tengøring af lejlighed","rank":2}
{"index":{}}
{"content":"Ekstra rengøring af køkken og bad","rank":6}
{"index":{}}
{"content":"Rengøring af håndvask i bad","rank":2}
{"index":{}}
{"content":"Rengøring af skabe i","rank":2}
{"index":{}}
{"content":"Polering af vinduer","rank":4}
{"index":{}}
{"content":"Aftøring af døre og karme","rank":2}
{"index":{}}
{"content":"Lejer giver med sin underskrift tilladelse til at boligselskabet tilmelde lejer som kunde i de relevante forsyningsselskaber","rank":2}
{"index":{}}
{"content":"Rengøring af emhætte","rank":5}
{"index":{}}
{"content":"Efter rør","rank":2}
{"index":{}}
{"content":"Ikke standard skabe nedtages","rank":2}
{"index":{}}
{"content":"Vinduesgreb udskiftes","rank":2}
{"index":{}}
{"content":"Reetabler af dørtrin","rank":4}
{"index":{}}
{"content":"Fraflytter og driften deler udgiften 50% til hver da det har været skader på gulvede","rank":2}
{"index":{}}
{"content":"Skab monteres efter opvaskemaskine","rank":4}
{"index":{}}
{"content":"Skab monteres efter opvaskemaskine. Henstår i lejlighed","rank":1}
{"index":{}}
{"content":"Væg monteres med hylde","rank":2}
{"index":{}}
{"content":"ikke rengjort","rank":8}
{"index":{}}
{"content":"gennem slid","rank":2}
{"index":{}}
{"content":"Gulvtæppe fjernes","rank":7}
{"index":{}}
{"content":"Defekt / Ødelagt","rank":4}
{"index":{}}
{"content":"Montere sandlister ved skabe","rank":2}
{"index":{}}
{"content":"Gult indvendigt","rank":2}
{"index":{}}
{"content":"Ulovlig insatllation","rank":2}
{"index":{}}
{"content":"Blændet dør reetableres","rank":2}
{"index":{}}
{"content":"Samstilles med postkasse og køkkentrappe og evt. ekstralås","rank":2}
{"index":{}}
{"content":"Samt vask","rank":2}
{"index":{}}
{"content":"Affaldsstativ opsat","rank":2}
{"index":{}}
{"content":"Emfang opsat","rank":2}
{"index":{}}
{"content":"Køkkenskab ved vaskemaskine installation til stede","rank":2}
{"index":{}}
{"content":"Køkkenskab ved installation til opvaskemaskine er flyttet til komfurside og stor bordplade opsat","rank":2}
{"index":{}}
{"content":"Vandmåler ok","rank":2}
{"index":{}}
{"content":"På grund af nikotin","rank":12}
{"index":{}}
{"content":"Rengøring af komfur","rank":5}
{"index":{}}
{"content":"Dør monteres","rank":5}
{"index":{}}
{"content":"Kalk på. Toilet har løbet","rank":2}
{"index":{}}
{"content":"Skæremærke","rank":2}
{"index":{}}
{"content":"Vinyl på gulv udskiftes","rank":2}
{"index":{}}
{"content":"Maling er afskallet på karm","rank":2}
{"index":{}}
{"content":"Mange ridser på trægulv","rank":2}
{"index":{}}
{"content":"Aftøring af radiator","rank":2}
{"index":{}}
{"content":"Rengøring af skabe ud og indvendig","rank":2}
{"index":{}}
{"content":"Dæksel til stærkstrøms dåse mangler","rank":2}
{"index":{}}
{"content":"Slidt pga kørestol","rank":4}
{"index":{}}
{"content":"Males pga af slidt efter mange års brug","rank":2}
{"index":{}}
{"content":"Skabsbunde males","rank":2}
{"index":{}}
{"content":"Sokkel under køkken elementer males","rank":2}
{"index":{}}
{"content":"Ikke rengjort ved syn","rank":6}
{"index":{}}
{"content":"Slidte gulve afdelingen","rank":2}
{"index":{}}
{"content":"Misligholdt - malerbehandles","rank":2}
{"index":{}}
{"content":"Trænger til rengøring","rank":2}
{"index":{}}
{"content":"Isoleres for nikotin","rank":2}
{"index":{}}
{"content":"Slib og lak","rank":8}
{"index":{}}
{"content":"Total rengøring af lejlighed","rank":8}
{"index":{}}
{"content":"Ridser og skramme på karme","rank":2}
{"index":{}}
{"content":"Døren er ødelagt","rank":4}
{"index":{}}
{"content":"Tømning af lejlighed","rank":2}
{"index":{}}
{"content":"Kogepladen kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Afkalkning toilet","rank":2}
{"index":{}}
{"content":"Efter persienner","rank":3}
{"index":{}}
{"content":"Støvsugning af radiator","rank":2}
{"index":{}}
{"content":"Rengøring af kogeplade","rank":2}
{"index":{}}
{"content":"Aftøring af skabe udvending","rank":4}
{"index":{}}
{"content":"Rep små skader","rank":2}
{"index":{}}
{"content":"Beskidte overflader","rank":2}
{"index":{}}
{"content":"Gardinbeslag fjernes","rank":2}
{"index":{}}
{"content":"Hul i dør","rank":32}
{"index":{}}
{"content":"Vask af væg med Hysan","rank":2}
{"index":{}}
{"content":"Gulv slidt og ridset","rank":5}
{"index":{}}
{"content":"Lister på vinduet males","rank":2}
{"index":{}}
{"content":"Kalk og snavs","rank":2}
{"index":{}}
{"content":"Toilet løb ved indflytning","rank":1}
{"index":{}}
{"content":"Meget beskidt","rank":18}
{"index":{}}
{"content":"Kontakt ødelagt","rank":2}
{"index":{}}
{"content":"På grund af brændmærker","rank":2}
{"index":{}}
{"content":"Røde pletter fjernes","rank":2}
{"index":{}}
{"content":"Vinyl på gulv buler","rank":2}
{"index":{}}
{"content":"Efter klistermærke","rank":2}
{"index":{}}
{"content":"Liste monteres på overskabe mellem væg og topplade","rank":3}
{"index":{}}
{"content":"Rep. Vinduer/døre efter gardinstænger","rank":2}
{"index":{}}
{"content":"Ridser efter rollator","rank":2}
{"index":{}}
{"content":"Filter / kabinet ikke rengjort","rank":2}
{"index":{}}
{"content":"Køkjen elementer eftergås","rank":2}
{"index":{}}
{"content":"Klapventiler rengøres for tape og limrester","rank":2}
{"index":{}}
{"content":"Rensning af nålefilt for pletter","rank":2}
{"index":{}}
{"content":"På grund af ridser på gulv","rank":2}
{"index":{}}
{"content":"Rep. efter rollator/kørestol","rank":2}
{"index":{}}
{"content":"Ridser i gulv som følge af husdyrhold","rank":2}
{"index":{}}
{"content":"Vinduet kan ikke lukkes","rank":2}
{"index":{}}
{"content":"Ødelagt kontakt","rank":2}
{"index":{}}
{"content":"Slidt","rank":16}
{"index":{}}
{"content":"1 eller flere nøgle(r) mangler","rank":2}
{"index":{}}
{"content":"Maling af fodlister hvor der sættes rutex op","rank":2}
{"index":{}}
{"content":"Fuldslibning","rank":4}
{"index":{}}
{"content":"Montere fejelister","rank":2}
{"index":{}}
{"content":"Rengøring i fals","rank":2}
{"index":{}}
{"content":"Ingen noter","rank":1}
{"index":{}}
{"content":"Kan ikke rengøres for nikotin","rank":4}
{"index":{}}
{"content":"Slidmærker oh huller","rank":2}
{"index":{}}
{"content":"Slidmærker","rank":7}
{"index":{}}
{"content":"Opskuring og sæbebehandling ( monell","rank":2}
{"index":{}}
{"content":"Mærker efter seng","rank":2}
{"index":{}}
{"content":"Rep. efter gardiner","rank":7}
{"index":{}}
{"content":"Ridser efter stole","rank":2}
{"index":{}}
{"content":"Trænger til maling","rank":6}
{"index":{}}
{"content":"Aftøring af skabe indvending","rank":2}
{"index":{}}
{"content":"På grund af pletter på nålefilt","rank":2}
{"index":{}}
{"content":"Monteret ovenpå vinyl","rank":1}
{"index":{}}
{"content":"Kabelkasser nedtages og installationer reetableres","rank":1}
{"index":{}}
{"content":"Tæppetap","rank":2}
{"index":{}}
{"content":"Lejer giver med sin underskrift tilladelse til at boligselskabet tilmelde lejer som kunde i de relevante forsyningsselskaber. For Dong's vedkommer som  basis-el kunde","rank":4}
{"index":{}}
{"content":"Hakker og mærker","rank":5}
{"index":{}}
{"content":"Tæppe tape","rank":2}
{"index":{}}
{"content":"Gennemslidt og ridser","rank":2}
{"index":{}}
{"content":"Taperester","rank":5}
{"index":{}}
{"content":"Fra loftrum","rank":2}
{"index":{}}
{"content":"Ridser og skramme","rank":2}
{"index":{}}
{"content":"Males på grund af dørerne er skadet","rank":2}
{"index":{}}
{"content":"Polering vinduer indvendig","rank":2}
{"index":{}}
{"content":"Rengøring af komfur og emhætte","rank":2}
{"index":{}}
{"content":"Dørgreb ødelagt","rank":4}
{"index":{}}
{"content":"Hul indørpladen","rank":4}
{"index":{}}
{"content":"Rensning af venyl ved vaskemaskine","rank":2}
{"index":{}}
{"content":"Aftøring af gulve","rank":2}
{"index":{}}
{"content":"Tømmes for effekter","rank":3}
{"index":{}}
{"content":"Overskabe nedtages","rank":3}
{"index":{}}
{"content":"Stinkpladet nedtages og reparation der efter","rank":3}
{"index":{}}
{"content":"Komfur kan ikke rengøres","rank":4}
{"index":{}}
{"content":"Emhætte kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Fejning og tømning af altankasse","rank":2}
{"index":{}}
{"content":"Bladningsbatteri kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Ridser i bordpladen","rank":2}
{"index":{}}
{"content":"Lampeskærm ødelagt i emhætte","rank":2}
{"index":{}}
{"content":"Buler i køleskabet og hylde ødelagt","rank":2}
{"index":{}}
{"content":"Har ikke aflevet vaskekort","rank":2}
{"index":{}}
{"content":"Mangler vaskekolds med nøgle","rank":2}
{"index":{}}
{"content":"Kogepladen mangler","rank":2}
{"index":{}}
{"content":"Skrammet og med skruehuller","rank":8}
{"index":{}}
{"content":"Lange ridser i gulvet","rank":2}
{"index":{}}
{"content":"Gammel lampeudtag udskiftes","rank":2}
{"index":{}}
{"content":"Rengøring komfur og emhætte","rank":4}
{"index":{}}
{"content":"Udsugning i bad rengøres","rank":2}
{"index":{}}
{"content":"Tape fjernes","rank":2}
{"index":{}}
{"content":"Ryger","rank":14}
{"index":{}}
{"content":"Alt afkalkes samt rengøring af hele rummet","rank":2}
{"index":{}}
{"content":"Maling er slået af","rank":2}
{"index":{}}
{"content":"Grundig rengøring af linoleum så div mærker og snavs fjernes","rank":2}
{"index":{}}
{"content":"Wc løber voldsomt","rank":2}
{"index":{}}
{"content":"Maling på dørkarm skallet af","rank":2}
{"index":{}}
{"content":"Ridser efter seng og kontorstol","rank":2}
{"index":{}}
{"content":"Misfarvet/fugtskadet","rank":2}
{"index":{}}
{"content":"Ikke rengjort tilstrækkelig","rank":2}
{"index":{}}
{"content":"Manglende vedligehold i boperiode","rank":2}
{"index":{}}
{"content":"Huller efter ophæng af gardiner","rank":2}
{"index":{}}
{"content":"Ikke rengjort for fedt/snavs","rank":2}
{"index":{}}
{"content":"Ikke afvasket/rengjort","rank":2}
{"index":{}}
{"content":"Rep. af tapet","rank":5}
{"index":{}}
{"content":"Montere sandlister efter slibning","rank":2}
{"index":{}}
{"content":"Skrammer efter rollator","rank":4}
{"index":{}}
{"content":"Rutex limes","rank":2}
{"index":{}}
{"content":"Rengøring over alt på alle kanter og flader","rank":2}
{"index":{}}
{"content":"Fugerne på gulvet på badeværelset skal renses med maskine","rank":2}
{"index":{}}
{"content":"Nedtagning af gardiner/persienner","rank":2}
{"index":{}}
{"content":"Nedtagning af lamper","rank":6}
{"index":{}}
{"content":"Gulvtæppet skal fjernes og bortskaffes. Der tages forbehold om at rette krav om istandsættelse af gulvet","rank":1}
{"index":{}}
{"content":"Alt Træværk skal rengøres","rank":1}
{"index":{}}
{"content":"Vinduer rengøres","rank":4}
{"index":{}}
{"content":"Radiatorer + rør rengøres","rank":1}
{"index":{}}
{"content":"Skabe og skuffer rengøres ind og udvendigt","rank":1}
{"index":{}}
{"content":"Der er slået maling af karm","rank":2}
{"index":{}}
{"content":"Der er slidt igennem lak","rank":4}
{"index":{}}
{"content":"Montering af wc sæde","rank":2}
{"index":{}}
{"content":"Levering af wc sæde hvis dette ikke er hos varmemester","rank":2}
{"index":{}}
{"content":"Der er hakker i dørkarm","rank":2}
{"index":{}}
{"content":"Der er skruehuller i vinduesramme","rank":2}
{"index":{}}
{"content":"Afkalkning af gulvklinker","rank":2}
{"index":{}}
{"content":"Der er kalk på gulvklinker","rank":2}
{"index":{}}
{"content":"Let slibning og oliering af terressedøt","rank":2}
{"index":{}}
{"content":"Der er hakker i fodliste","rank":2}
{"index":{}}
{"content":"Dørhåndtag efterspændes","rank":2}
{"index":{}}
{"content":"Skydedør afmonteres og sendes til sprøjtemaler for at blive repareret og malet efter skrammer.\nBehandlingen omfatter flg:\nAfvaskning - slibning - spartling - slibning - grund - mellem maling - lakering. Ral 9010 glans 30","rank":1}
{"index":{}}
{"content":"Hele badeværelset rengøres/afkalkes","rank":1}
{"index":{}}
{"content":"Hele køkkenet rengøres","rank":1}
{"index":{}}
{"content":"Køleskab fjernes","rank":11}
{"index":{}}
{"content":"Vask + rep + plet + stryg + færdigstryg","rank":1}
{"index":{}}
{"content":"Lejer har selv malet middelmådigt","rank":2}
{"index":{}}
{"content":"Der er hakker i maling","rank":2}
{"index":{}}
{"content":"Slidt igennem lak","rank":24}
{"index":{}}
{"content":"Låger","rank":7}
{"index":{}}
{"content":"Alt skal rengøres og afkalkes","rank":2}
{"index":{}}
{"content":"Der er ridser i dør","rank":2}
{"index":{}}
{"content":"Ikke rengjort ved fraflytning","rank":50}
{"index":{}}
{"content":"Skader rep","rank":2}
{"index":{}}
{"content":"Der er skruehuller i dør/vindue","rank":2}
{"index":{}}
{"content":"Maling slidt igennem","rank":2}
{"index":{}}
{"content":"Udskiftning af alle tangenter og rammer da de er misfarvede","rank":2}
{"index":{}}
{"content":"Dør udskiftes","rank":8}
{"index":{}}
{"content":"Møbler","rank":2}
{"index":{}}
{"content":"Slidt pga forkert brug","rank":2}
{"index":{}}
{"content":"Males pga forkert brug","rank":2}
{"index":{}}
{"content":"Forsøge rengjort men ikke tilstrækkelig","rank":2}
{"index":{}}
{"content":"Der er slået flig af flise","rank":2}
{"index":{}}
{"content":"Låger for køkkenskab ødelagt","rank":2}
{"index":{}}
{"content":"Wc bræt fastmonteres","rank":2}
{"index":{}}
{"content":"Hoveddør maling er ridset","rank":2}
{"index":{}}
{"content":"Fodlister er ridsede","rank":2}
{"index":{}}
{"content":"Dør er ridset","rank":2}
{"index":{}}
{"content":"Kalk og rust fjernes","rank":2}
{"index":{}}
{"content":"Samstilles med postkasse og hængelås til kælderrum","rank":2}
{"index":{}}
{"content":"Afkalkning af bruservæg","rank":2}
{"index":{}}
{"content":"Rengøring af vinduesfals","rank":4}
{"index":{}}
{"content":"Omkodning af nøgler","rank":5}
{"index":{}}
{"content":"Bordplade ødelagt","rank":7}
{"index":{}}
{"content":"Mos og ukrudt fjernes fra flisebelægning","rank":2}
{"index":{}}
{"content":"Slibes og lakeres","rank":5}
{"index":{}}
{"content":"Af og på montering af vask og blandningsbatteri","rank":2}
{"index":{}}
{"content":"Meget gule og stærke farve","rank":2}
{"index":{}}
{"content":"Laminat er slået af bordpladen","rank":2}
{"index":{}}
{"content":"Skabene kan ikke rengøres for maling på låge og udvendige sider","rank":2}
{"index":{}}
{"content":"Rengøring bag radiatorer","rank":2}
{"index":{}}
{"content":"Rens og rengøring af gulvafløbet","rank":2}
{"index":{}}
{"content":"Kalk på gulv","rank":2}
{"index":{}}
{"content":"Overfladiske ridser og skrammer","rank":2}
{"index":{}}
{"content":"Der er ridser og slået maling af","rank":2}
{"index":{}}
{"content":"Skruehuller efter persienner","rank":2}
{"index":{}}
{"content":"Lejer har ikke rengjort lejemål inden fraflytning","rank":2}
{"index":{}}
{"content":"Fremstilling af 1 stk ny specialnøgle som ikke er leveret tilbage","rank":2}
{"index":{}}
{"content":"Overfladiske ridser i lak","rank":4}
{"index":{}}
{"content":"Ukrudt fjernes og ordnes efter årstid","rank":2}
{"index":{}}
{"content":"Stikkontakter og afbryde kan ikke rengøres på grund af maling","rank":2}
{"index":{}}
{"content":"Overfladiske ridser","rank":10}
{"index":{}}
{"content":"Emfang ikke tilstrækkeligt rengjort","rank":2}
{"index":{}}
{"content":"Kalk skal fjernes","rank":2}
{"index":{}}
{"content":"Hoveddør spartles huller og males","rank":2}
{"index":{}}
{"content":"Gul efter nikotin","rank":2}
{"index":{}}
{"content":"Døren til stuen mangler","rank":2}
{"index":{}}
{"content":"Det er ikke afleveret nogen nøgler til lejligheden","rank":2}
{"index":{}}
{"content":"Aftøring af vinduesfals","rank":2}
{"index":{}}
{"content":"Ridser og mærker efter bla. støvsuger","rank":2}
{"index":{}}
{"content":"Få mærker og ridser efter hjælpemidler","rank":2}
{"index":{}}
{"content":"Sorte mærker efter hjælpemidler fjernes","rank":2}
{"index":{}}
{"content":"Der er kun et enkelt hul","rank":2}
{"index":{}}
{"content":"Loft lift rengøres","rank":2}
{"index":{}}
{"content":"Rep. efter gardiner og over males for misfarvning fra tobaksrygning","rank":2}
{"index":{}}
{"content":"Køleskabsskab rengøres invendig","rank":2}
{"index":{}}
{"content":"Der er kalk på vægfliser","rank":2}
{"index":{}}
{"content":"Huller efter rullegardin","rank":4}
{"index":{}}
{"content":"Fraflytter har malet på dørkarme","rank":2}
{"index":{}}
{"content":"Der er ridser i pladen og den er gået fra i bunden","rank":2}
{"index":{}}
{"content":"Fraflytter har malet radiatoren","rank":4}
{"index":{}}
{"content":"Fliser rengøres for mos og snavs","rank":2}
{"index":{}}
{"content":"Blandningsbatteri ødelagt i håndvask","rank":2}
{"index":{}}
{"content":"Manglen rengøring","rank":14}
{"index":{}}
{"content":"Hil i døren til sovevæverelse","rank":2}
{"index":{}}
{"content":"Pletter på nålefilt","rank":2}
{"index":{}}
{"content":"Dørplader er ridset","rank":2}
{"index":{}}
{"content":"Afrensning af kontakter og afbryder","rank":2}
{"index":{}}
{"content":"Dørklokken er overmalet","rank":2}
{"index":{}}
{"content":"Toiletsæde ødelagt","rank":4}
{"index":{}}
{"content":"Stikkontakten er smeltet","rank":2}
{"index":{}}
{"content":"Kontakter og afbryder er overmalet","rank":2}
{"index":{}}
{"content":"Dørkarm er ridset","rank":2}
{"index":{}}
{"content":"Beskidt","rank":29}
{"index":{}}
{"content":"Heller efter persienne/gardin","rank":2}
{"index":{}}
{"content":"Huller efter persienne / gardin","rank":6}
{"index":{}}
{"content":"Hakket","rank":3}
{"index":{}}
{"content":"Div. Mærker og ridser","rank":2}
{"index":{}}
{"content":"Skrammer","rank":25}
{"index":{}}
{"content":"Rengøring fals","rank":2}
{"index":{}}
{"content":"Misfarvet efter rygning","rank":2}
{"index":{}}
{"content":"Ridser og hakker i gulv","rank":3}
{"index":{}}
{"content":"Lejer hat ikke gjort rent inden fraflytning","rank":2}
{"index":{}}
{"content":"Nedvaskning efter rygning","rank":2}
{"index":{}}
{"content":"Alt vaskes ned og afkalkes","rank":2}
{"index":{}}
{"content":"Ridser og hakker i maling","rank":6}
{"index":{}}
{"content":"Huller efter gardin / persienne","rank":4}
{"index":{}}
{"content":"Nøgle mangler","rank":14}
{"index":{}}
{"content":"Omkodning med 3 nøgler","rank":2}
{"index":{}}
{"content":"Ridser og haller i maling","rank":2}
{"index":{}}
{"content":"Lejer har ikke rengjort inden fraflytning","rank":2}
{"index":{}}
{"content":"Er pletvis bemalet med vægmaling","rank":2}
{"index":{}}
{"content":"Ridset og skrammet","rank":6}
{"index":{}}
{"content":"Lejer har ikke rengjort ved fraflytning","rank":2}
{"index":{}}
{"content":"Slidt igennem maling","rank":2}
{"index":{}}
{"content":"Slidt igennem lak og misfarvet","rank":2}
{"index":{}}
{"content":"Gulv afkalkes","rank":13}
{"index":{}}
{"content":"Skruehuller","rank":19}
{"index":{}}
{"content":"Der er kalk på vaskearmatur","rank":2}
{"index":{}}
{"content":"Der er kalk på brusearmstut","rank":2}
{"index":{}}
{"content":"Hele værelset rengøres","rank":1}
{"index":{}}
{"content":"Hele stuen rengøres","rank":1}
{"index":{}}
{"content":"Hele entreen rengøres","rank":1}
{"index":{}}
{"content":"Alle fodlister rengøres","rank":2}
{"index":{}}
{"content":"Dørkarm rengøres","rank":1}
{"index":{}}
{"content":"Garderobeskabe rengøres","rank":2}
{"index":{}}
{"content":"Kalk og svans på klinker","rank":2}
{"index":{}}
{"content":"Der er kalkrender i wc skål","rank":2}
{"index":{}}
{"content":"Rengøring bag radiator","rank":2}
{"index":{}}
{"content":"Aftøring af fodlister","rank":4}
{"index":{}}
{"content":"Ridser i dørkarm","rank":2}
{"index":{}}
{"content":"Brandmærker på bordplade","rank":2}
{"index":{}}
{"content":"Kogeplade kan ikke rengøres","rank":4}
{"index":{}}
{"content":"Limrester på bruservæg","rank":2}
{"index":{}}
{"content":"Toilet afkalkes","rank":12}
{"index":{}}
{"content":"På grund af bordplade skal skiftes på grund af brandmærker","rank":2}
{"index":{}}
{"content":"Vaskes","rank":20}
{"index":{}}
{"content":"Gummifuge udskiftes til mørtelfuge","rank":2}
{"index":{}}
{"content":"Aftræk til emhætte udskiftes til metal","rank":2}
{"index":{}}
{"content":"Kræver spærregrund pga. farve","rank":2}
{"index":{}}
{"content":"Kræver spærregrund pga. Farve","rank":2}
{"index":{}}
{"content":"Køkkenbord rengøres","rank":2}
{"index":{}}
{"content":"Ridser og mærker efter hjælpemidler","rank":2}
{"index":{}}
{"content":"Rep. efter gardiner og mærker","rank":2}
{"index":{}}
{"content":"Rep. med rutex efter vægrep","rank":2}
{"index":{}}
{"content":"Dørplader udskiftes pga. ridser og mærker efter hjælpemidler","rank":4}
{"index":{}}
{"content":"Bad ikke rengjort og afkalket","rank":2}
{"index":{}}
{"content":"Køkken og hvidevarer ikke rengjort","rank":2}
{"index":{}}
{"content":"Ikke tilstrækkeligt rengjort ved fraflytning","rank":8}
{"index":{}}
{"content":"Skadet af nikotin-kan ikke afvaskes","rank":2}
{"index":{}}
{"content":"Ej ren og over malet","rank":8}
{"index":{}}
{"content":"Rengøring bag radiatore","rank":2}
{"index":{}}
{"content":"Rengøring af ventilator","rank":4}
{"index":{}}
{"content":"Ridser og skræmmer","rank":2}
{"index":{}}
{"content":"Ridser og mærker","rank":126}
{"index":{}}
{"content":"gennemslid","rank":2}
{"index":{}}
{"content":"Ridset og mærker","rank":2}
{"index":{}}
{"content":"Overalt","rank":2}
{"index":{}}
{"content":"Afkaltning af fliser","rank":2}
{"index":{}}
{"content":"Polering vinduer udvending","rank":2}
{"index":{}}
{"content":"Elefantsnot og tape","rank":2}
{"index":{}}
{"content":"Sømhuller efter fejelister","rank":2}
{"index":{}}
{"content":"Spartel på væg ved bord/væg","rank":2}
{"index":{}}
{"content":"Afrens efter dårlig spartel","rank":2}
{"index":{}}
{"content":"Brøndby kommune","rank":2}
{"index":{}}
{"content":"Magler fodlister nogle steder ca 2 m","rank":2}
{"index":{}}
{"content":"Slidt gulv","rank":4}
{"index":{}}
{"content":"Polering af vinduer indvendig","rank":4}
{"index":{}}
{"content":"Rengøring og afkalk","rank":2}
{"index":{}}
{"content":"Slut Rengøring","rank":2}
{"index":{}}
{"content":"Beskidte ruder","rank":4}
{"index":{}}
{"content":"Nedtagning af reol","rank":2}
{"index":{}}
{"content":"Mørke mærker i gulv","rank":2}
{"index":{}}
{"content":"Fjerne kabel bakke","rank":2}
{"index":{}}
{"content":"Afbyder og stik","rank":2}
{"index":{}}
{"content":"Male","rank":58}
{"index":{}}
{"content":"Skadet af rollator","rank":4}
{"index":{}}
{"content":"Gulv udskiftes","rank":2}
{"index":{}}
{"content":"Låge i højskab udskiftes","rank":2}
{"index":{}}
{"content":"Håndvask og spejl  skal skiftes 50/50% til lejer og driften","rank":2}
{"index":{}}
{"content":"ikke vedligeholdt i bo perioden","rank":2}
{"index":{}}
{"content":"Hul i dørgeret","rank":2}
{"index":{}}
{"content":"Pletter som ikke kan fjernes","rank":2}
{"index":{}}
{"content":"Sæberester på","rank":2}
{"index":{}}
{"content":"Huller i fliser udgipses","rank":2}
{"index":{}}
{"content":"Der er slået maling af","rank":2}
{"index":{}}
{"content":"Monterer sandlister ved skabe","rank":2}
{"index":{}}
{"content":"Ekstrem beskidt","rank":2}
{"index":{}}
{"content":"Skuffer i skab på hjul","rank":2}
{"index":{}}
{"content":"Afmont/montering af skinne","rank":2}
{"index":{}}
{"content":"Mærker og pletter som ikke kan fjernes","rank":2}
{"index":{}}
{"content":"Dybe ridser i belægning","rank":2}
{"index":{}}
{"content":"Indkaldt til prøveslibning på grund af hundurin på gulvene","rank":2}
{"index":{}}
{"content":"Pletter af hunde urin som ikke kan fjernes eller bortslibes","rank":2}
{"index":{}}
{"content":"Låsesæt","rank":2}
{"index":{}}
{"content":"Rengøring af fliser og fjernelse af gammel grill og redskaber","rank":2}
{"index":{}}
{"content":"Rengøring af køl/frys","rank":1}
{"index":{}}
{"content":"Halløjsovs","rank":2}
{"index":{}}
{"content":"Rengøring af alle køkkenskabe indvendig og udvendig","rank":1}
{"index":{}}
{"content":"Rengøring af hele køkkenet","rank":1}
{"index":{}}
{"content":"Rengøring af hele stuen","rank":1}
{"index":{}}
{"content":"Rengøring af hele entreen","rank":1}
{"index":{}}
{"content":"Rengøringen af hele stuen","rank":1}
{"index":{}}
{"content":"Rengøring af hele værelset","rank":1}
{"index":{}}
{"content":"Rengøring af hele badeværelset","rank":1}
{"index":{}}
{"content":"Rengøring af alle fodlister","rank":1}
{"index":{}}
{"content":"Rengøring af alt træværk","rank":7}
{"index":{}}
{"content":"Rengøring af vinduer","rank":1}
{"index":{}}
{"content":"Rengøring af radiator og rør","rank":1}
{"index":{}}
{"content":"Gulvtæppe skal fjernes og bortskaffes. Der tages forbehold om at rette krav om istandsættelse af gulvet","rank":1}
{"index":{}}
{"content":"Græsset skal slåes","rank":1}
{"index":{}}
{"content":"Hækken skal klippes","rank":1}
{"index":{}}
{"content":"Bede renses for ukrudt","rank":1}
{"index":{}}
{"content":"Fliser renses for ukrudt","rank":1}
{"index":{}}
{"content":"Haven tømmes for effekter","rank":1}
{"index":{}}
{"content":"Rengøring af hele lejemålet overalt","rank":1}
{"index":{}}
{"content":"Alt træværk rengøres","rank":1}
{"index":{}}
{"content":"Rør","rank":5}
{"index":{}}
{"content":"Alt træværk","rank":1}
{"index":{}}
{"content":"Hele badeværelset","rank":1}
{"index":{}}
{"content":"Alle køkkenskabe rengøres ind- og udvendigt","rank":1}
{"index":{}}
{"content":"Alle køkken- og garderobeskabe rengøres ind- og udvendigt","rank":1}
{"index":{}}
{"content":"Fliser i brusehjørne afkalkes og rengøres","rank":1}
{"index":{}}
{"content":"Alle fliser afkalkes og rengøres","rank":1}
{"index":{}}
{"content":"Vinduesrammer rengøres","rank":1}
{"index":{}}
{"content":"Vinduesrammer og -falser rengøres","rank":1}
{"index":{}}
{"content":"Alle hvidevarer rengøres","rank":2}
{"index":{}}
{"content":"Komfur rengøres","rank":1}
{"index":{}}
{"content":"Komfur rengøres indvendigt","rank":1}
{"index":{}}
{"content":"Komfur rengøres udvendigt","rank":1}
{"index":{}}
{"content":"Køl/frys rengøres","rank":2}
{"index":{}}
{"content":"Emhætte rengøres","rank":5}
{"index":{}}
{"content":"Sæbeskuffe rengøres","rank":1}
{"index":{}}
{"content":"Sæbeskuffe og trevlefilter rengøres","rank":1}
{"index":{}}
{"content":"Trevlefilter rengøres","rank":1}
{"index":{}}
{"content":"Komfuret rengøres","rank":1}
{"index":{}}
{"content":"Bede rengøres for ukrudt","rank":1}
{"index":{}}
{"content":"Hæk klippes","rank":3}
{"index":{}}
{"content":"Vaskemaskinen rengøres","rank":1}
{"index":{}}
{"content":"Hæk klippes og bede rengøres for ukrudt","rank":1}
{"index":{}}
{"content":"Udvendig flisebelægning rengøres for ukrudt","rank":1}
{"index":{}}
{"content":"Der er ridser/hakker i maling","rank":2}
{"index":{}}
{"content":"Huller efter gardin/persienne","rank":2}
{"index":{}}
{"content":"Store ridser igennem lak","rank":7}
{"index":{}}
{"content":"Foged har sat lejer ud","rank":2}
{"index":{}}
{"content":"Skab under håndvask er ødelagt af fugt","rank":2}
{"index":{}}
{"content":"Mangler i forbindelse med fraflytningen","rank":1}
{"index":{}}
{"content":"Manglende pudsning","rank":2}
{"index":{}}
{"content":"Små ridser og mærker","rank":4}
{"index":{}}
{"content":"Ridset / maling slået af","rank":4}
{"index":{}}
{"content":"Ikke tilstrækkeligt rengjort","rank":45}
{"index":{}}
{"content":"Der er kalk på fliser","rank":2}
{"index":{}}
{"content":"Ikke tilstrækkeligt","rank":2}
{"index":{}}
{"content":"Ikke rengjort ved fraflyt","rank":2}
{"index":{}}
{"content":"Ridser i overflade","rank":5}
{"index":{}}
{"content":"ikke rengjort tilstrækkeligt","rank":2}
{"index":{}}
{"content":"Murstens væg skal males uden anden behandling","rank":2}
{"index":{}}
{"content":"Slidmærker forsøges at rengøre væk","rank":1}
{"index":{}}
{"content":"Slidmærker på fodlisterne forsøges rengjort. Hvis diss ikke kan rengøres væk vil disse blive malet","rank":1}
{"index":{}}
{"content":"Hoveddøren rengøres indvendigt","rank":1}
{"index":{}}
{"content":"Tørretumbler renes for fnuller og rengøres for støv på ovenpå","rank":1}
{"index":{}}
{"content":"Vaske udluftning af","rank":2}
{"index":{}}
{"content":"Bund i vaskskab udskiftes/plade monteres","rank":2}
{"index":{}}
{"content":"Og mangelliste","rank":2}
{"index":{}}
{"content":"Vægmaling fjernes fra fodpanel","rank":2}
{"index":{}}
{"content":"Indbo fjernes","rank":8}
{"index":{}}
{"content":"Afskalninger efter normal brug","rank":1}
{"index":{}}
{"content":"Skabe nedtages","rank":3}
{"index":{}}
{"content":"Rist på radiator monteres","rank":1}
{"index":{}}
{"content":"Cementfuge omkring gulvafløb efterfuges","rank":2}
{"index":{}}
{"content":"Skruehuller o vægge efterfuges","rank":2}
{"index":{}}
{"content":"Der kan være mindre ridser under det ny lakeret gulv","rank":2}
{"index":{}}
{"content":"Rep ikke udført korrekt","rank":2}
{"index":{}}
{"content":"Tømning af lejlighed / kælderrum","rank":4}
{"index":{}}
{"content":"Rummet tømmes og affald bortskaffes","rank":1}
{"index":{}}
{"content":"Hoveddør invendig","rank":2}
{"index":{}}
{"content":"Vindue er af plast","rank":2}
{"index":{}}
{"content":"Lak gennem slidt","rank":5}
{"index":{}}
{"content":"Skyggelist fuges på 2 sider","rank":2}
{"index":{}}
{"content":"Fodliste fuges mod gulv","rank":2}
{"index":{}}
{"content":"Emfang ikketilstrækkeligt rengjort","rank":2}
{"index":{}}
{"content":"Ridser/hakker i maling","rank":12}
{"index":{}}
{"content":"Kontakter","rank":5}
{"index":{}}
{"content":"Gulve er lakeret og må kun lakeres med klar lak","rank":1}
{"index":{}}
{"content":"Gulve er lakeret med klar lak og må ikke behandles med anden lak","rank":1}
{"index":{}}
{"content":"Klarlak","rank":2}
{"index":{}}
{"content":"Er slebet og lakeret 1 gang. Gulv fremstår ru og ulakeret","rank":2}
{"index":{}}
{"content":"Ikke gjort","rank":3}
{"index":{}}
{"content":"Overfladisk ridse i lak","rank":2}
{"index":{}}
{"content":"Slidt og mærker i gulv","rank":2}
{"index":{}}
{"content":"Polering af vinduer udvendig","rank":2}
{"index":{}}
{"content":"Aftøring af skabe udvendig","rank":2}
{"index":{}}
{"content":"Ridser på gulvet","rank":2}
{"index":{}}
{"content":"Faldstamme tæret","rank":3}
{"index":{}}
{"content":"Bøjning på vandledning tæret","rank":3}
{"index":{}}
{"content":"Makise nedtages","rank":3}
{"index":{}}
{"content":"Armtur afhentes p kontor","rank":3}
{"index":{}}
{"content":"Le snavset","rank":3}
{"index":{}}
{"content":"Ulovlige vægplader nedtages","rank":3}
{"index":{}}
{"content":"Kun ved ildsted","rank":3}
{"index":{}}
{"content":"Skabe fjernes","rank":3}
{"index":{}}
{"content":"Forsøgt malet men ikke tilstrækkeligt","rank":2}
{"index":{}}
{"content":"Fraflytter har selv slebet gulvet men er ikke kommet ind i hjørnerne og mangelfuld lakering","rank":2}
{"index":{}}
{"content":"Gulv skures op og behandles med polish","rank":2}
{"index":{}}
{"content":"Hakker i træ","rank":2}
{"index":{}}
{"content":"Wc Vaskes af","rank":2}
{"index":{}}
{"content":"Let slidt og lak","rank":2}
{"index":{}}
{"content":"Lejemålet er ikke rengjort","rank":1}
{"index":{}}
{"content":"Fraflytter har forsøgt at male selv","rank":2}
{"index":{}}
{"content":"Ridset/maling slået af","rank":2}
{"index":{}}
{"content":"Vinduesplade hævet","rank":4}
{"index":{}}
{"content":"Der er vægmaling på træværk","rank":2}
{"index":{}}
{"content":"Afmontering af sandlister før gulvslibning","rank":2}
{"index":{}}
{"content":"Små rep. efter div. små ridser og mærker","rank":2}
{"index":{}}
{"content":"Rengøring af skur","rank":4}
{"index":{}}
{"content":"Male mørk væg","rank":2}
{"index":{}}
{"content":"Revner i mellem væg-loft","rank":2}
{"index":{}}
{"content":"Ødelagt efter den har fået fugt","rank":2}
{"index":{}}
{"content":"Ødelagt efter fugt i bunden","rank":2}
{"index":{}}
{"content":"Plet reparation","rank":2}
{"index":{}}
{"content":"Ikke tilstrækkeligt rengjorte","rank":2}
{"index":{}}
{"content":"Låge udskiftes","rank":1}
{"index":{}}
{"content":"Malet på fodliser","rank":2}
{"index":{}}
{"content":"Løs stikkontakt i køkken","rank":2}
{"index":{}}
{"content":"Omkodning af nøgler til lejlighed","rank":2}
{"index":{}}
{"content":"Efter gentagende gange har jeg kunne komme i kontakt med fraflytter ang. Fraflytnings syn","rank":2}
{"index":{}}
{"content":"Mangler nøgler opgangsdør og postkasse","rank":2}
{"index":{}}
{"content":"Point graduering mangler på indflytningsrapport","rank":2}
{"index":{}}
{"content":"Brandmærker","rank":6}
{"index":{}}
{"content":"Huller efter skruer","rank":4}
{"index":{}}
{"content":"Omkodning af nøgler til lejlighed. Cylinderen ligge i køkkenskuffen.  Lejeren har ikke afleveret nogen nøgler","rank":2}
{"index":{}}
{"content":"Ekstra rengøring før håndværkere","rank":2}
{"index":{}}
{"content":"Bundpladen er ødelagt af vand som ikke er blevet tørret op","rank":2}
{"index":{}}
{"content":"Bundpladen i vinduet er slået kanter af","rank":2}
{"index":{}}
{"content":"Hele køkkenet kasseres på grund af fugtskader","rank":2}
{"index":{}}
{"content":"Maling misligeholdt","rank":2}
{"index":{}}
{"content":"Gulve misvedligeholdt","rank":2}
{"index":{}}
{"content":"Spærrende behandling udføres grundet væggenes beskaffenhed fra ex. Fedt","rank":2}
{"index":{}}
{"content":"Det er slået hul i dørpladen","rank":2}
{"index":{}}
{"content":"Hængsel er brækket af underskabet","rank":2}
{"index":{}}
{"content":"Grundet brugen af det lejede","rank":1}
{"index":{}}
{"content":"Grundet brugen af det lejede, er det nødvendigt med en grundigere rengøring af hele lejligheden med sæbe og kemi af stærkere karakter, hvor brugen af disse midler kun må udføres og bruges af professionel rengørings firma","rank":1}
{"index":{}}
{"content":"Spærrende behandling udføres grundet lofternes beskaffenhed fra ex. Fedt","rank":1}
{"index":{}}
{"content":"Træværket skal males pga stor slidtage","rank":1}
{"index":{}}
{"content":"Gulvene har brændmærker efter gryder","rank":1}
{"index":{}}
{"content":"Nyt væv opsættes i køkkenet fra dørkarm til stue og hen til højskab ved vask","rank":1}
{"index":{}}
{"content":"Nyt væv i køkken. Eksisterende ødelægges ved opsætning af nyt køkken","rank":1}
{"index":{}}
{"content":"Emhætten er så beskidt og uhygiejnisk at den ikke kan rengøres. Ny monteres","rank":1}
{"index":{}}
{"content":"Afpropning mangler","rank":7}
{"index":{}}
{"content":"Snavs","rank":6}
{"index":{}}
{"content":"Revnet i samlinger","rank":2}
{"index":{}}
{"content":"Hak i plade","rank":2}
{"index":{}}
{"content":"Revner og huller fra skab","rank":2}
{"index":{}}
{"content":"Ridser og hakker","rank":51}
{"index":{}}
{"content":"Små ridser overflade","rank":2}
{"index":{}}
{"content":"Ridser ved trappe 2 trin nedefra","rank":2}
{"index":{}}
{"content":"Skiftes på grund af det ikke kan rengøres","rank":4}
{"index":{}}
{"content":"Der mangler nøgler til lejligheden og skal omkodes","rank":4}
{"index":{}}
{"content":"Bagvæggen og væg mod opgang skiftes rutex","rank":2}
{"index":{}}
{"content":"Skydedøren er fugtskadet. Ny monteres","rank":1}
{"index":{}}
{"content":"Bagbeklædningen sættes på plads i midterste skab","rank":1}
{"index":{}}
{"content":"Defekt flyder","rank":2}
{"index":{}}
{"content":"Laktype Bona Traffic HD 2-komponent vandbaseret 100% polyuretan eller toplak med tilsvarende høje slidstyrke","rank":3}
{"index":{}}
{"content":"Dørstop monteres","rank":2}
{"index":{}}
{"content":"Efter tusch","rank":2}
{"index":{}}
{"content":"Dybe ridser i stenbordplade","rank":2}
{"index":{}}
{"content":"Bundplade i vaskskab udskiftes","rank":2}
{"index":{}}
{"content":"Ødelagt/fugtskadet","rank":2}
{"index":{}}
{"content":"Kun bagplade","rank":2}
{"index":{}}
{"content":"Uoriginale kroge nedtages","rank":2}
{"index":{}}
{"content":"Støvsuges","rank":4}
{"index":{}}
{"content":"Overfladeske ridser","rank":2}
{"index":{}}
{"content":"Fyldningsrevner","rank":6}
{"index":{}}
{"content":"Badekar grimt","rank":2}
{"index":{}}
{"content":"Ridser/slid","rank":2}
{"index":{}}
{"content":"Plet rep","rank":7}
{"index":{}}
{"content":"Fraflytter skudt med blyhagl på vægge i soveværelse","rank":2}
{"index":{}}
{"content":"Det er spildt oile og andet som ikke kan fjernes på parketgulvet","rank":2}
{"index":{}}
{"content":"Komfuret kan ikke rengøres og er meget misligholdt","rank":4}
{"index":{}}
{"content":"Filt opsættes","rank":2}
{"index":{}}
{"content":"Dørplader ikke rengjort","rank":2}
{"index":{}}
{"content":"Maling revnet mellem fodpanel og sandliste","rank":2}
{"index":{}}
{"content":"Bundplade udskiftes i kølekabe sektion","rank":2}
{"index":{}}
{"content":"Misligholdelse køle/fryseskab Ødelagt der har været slukket for strømmen længe","rank":2}
{"index":{}}
{"content":"Afmonterin/montering af dørskinner","rank":2}
{"index":{}}
{"content":"Køkkenet er ødelagt af fugt og fraflytter har skudt med luftgevær på skabe og bordplade","rank":2}
{"index":{}}
{"content":"Af og på montering af køkkenvask","rank":4}
{"index":{}}
{"content":"Af og på montering af Emhætte","rank":4}
{"index":{}}
{"content":"Misfarvet af nikotin","rank":24}
{"index":{}}
{"content":"Gennemslid","rank":19}
{"index":{}}
{"content":"Rep. Af skuffe","rank":2}
{"index":{}}
{"content":"Hul i indv. Dør","rank":2}
{"index":{}}
{"content":"Store ridser / mærker i gulv","rank":2}
{"index":{}}
{"content":"Fra svane køkken","rank":4}
{"index":{}}
{"content":"Ekstre rengøring i køkken","rank":2}
{"index":{}}
{"content":"Ekstre rengøring på badeværelse","rank":2}
{"index":{}}
{"content":"Rengøres kun udvendig","rank":2}
{"index":{}}
{"content":"Slidte i maling","rank":2}
{"index":{}}
{"content":"Beskidte","rank":13}
{"index":{}}
{"content":"Skifte lys under overskabe 2 stk","rank":2}
{"index":{}}
{"content":"Male skabe udvendigt","rank":2}
{"index":{}}
{"content":"Slidte og misfarvning","rank":2}
{"index":{}}
{"content":"Omfinering af dørplade","rank":2}
{"index":{}}
{"content":"Revnet og mange huller","rank":2}
{"index":{}}
{"content":"Rengøring af toilet","rank":11}
{"index":{}}
{"content":"Indfatning revnet Ny","rank":2}
{"index":{}}
{"content":"Håndtag defekt","rank":2}
{"index":{}}
{"content":"Lysning males","rank":2}
{"index":{}}
{"content":"Nyt vindues greb","rank":2}
{"index":{}}
{"content":"Nyt tætningsbånd dør","rank":2}
{"index":{}}
{"content":"Tapet løs hjørne skiftes","rank":2}
{"index":{}}
{"content":"Misfarvning","rank":18}
{"index":{}}
{"content":"Slidte","rank":2}
{"index":{}}
{"content":"Ny bordplade","rank":5}
{"index":{}}
{"content":"Slidt gammel","rank":4}
{"index":{}}
{"content":"Gammel","rank":2}
{"index":{}}
{"content":"Gammelt","rank":2}
{"index":{}}
{"content":"Afmontere armatur køkken","rank":2}
{"index":{}}
{"content":"Gammelt og slidt","rank":2}
{"index":{}}
{"content":"Reparation af hoveddør","rank":2}
{"index":{}}
{"content":"Rengøring inden håndværker i køkken","rank":2}
{"index":{}}
{"content":"Rengøring af vinduer inden maler","rank":2}
{"index":{}}
{"content":"Vask al træværk nikotin","rank":2}
{"index":{}}
{"content":"Rent inden håndværker","rank":2}
{"index":{}}
{"content":"Beskidte og ridset","rank":2}
{"index":{}}
{"content":"ikke rengjort ved fraflytning","rank":2}
{"index":{}}
{"content":"nikotin","rank":2}
{"index":{}}
{"content":"vægmaling på træværk","rank":2}
{"index":{}}
{"content":"Ikke rengjort til ren bund","rank":2}
{"index":{}}
{"content":"Aftørring af fodlister","rank":2}
{"index":{}}
{"content":"Aftørring af radiator","rank":2}
{"index":{}}
{"content":"Meget gul af nikotin","rank":4}
{"index":{}}
{"content":"Meget gule af nikotin","rank":2}
{"index":{}}
{"content":"Nikotin og itu","rank":8}
{"index":{}}
{"content":"Itu","rank":2}
{"index":{}}
{"content":"Skruehuller i skabsside","rank":2}
{"index":{}}
{"content":"Tæpper fjernes i værelse og stue","rank":2}
{"index":{}}
{"content":"Overmalet","rank":63}
{"index":{}}
{"content":"Skal ikke være der","rank":6}
{"index":{}}
{"content":"Pga gulvsliber","rank":2}
{"index":{}}
{"content":"Forkert er monteret . Den skal være rund","rank":8}
{"index":{}}
{"content":"Gulve rengøres for snavs og streger efter fodtøj","rank":1}
{"index":{}}
{"content":"Kogepladen mangler i lejligheden","rank":2}
{"index":{}}
{"content":"Og pga gulvslibning","rank":2}
{"index":{}}
{"content":"Skal ej være der","rank":2}
{"index":{}}
{"content":"Gule af nikotin","rank":2}
{"index":{}}
{"content":"Små ridser","rank":13}
{"index":{}}
{"content":"Pletter på nålefilt efter nikotin","rank":2}
{"index":{}}
{"content":"Lakken er slidt og kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Radiatorer meget støvede støvsuges kraftigt eller blæses med trykluft","rank":2}
{"index":{}}
{"content":"Rengør loft lifts skinner","rank":2}
{"index":{}}
{"content":"Sorte mærker på fliser efter hjælpemidler fjernes","rank":2}
{"index":{}}
{"content":"Efter nedtegelse af persienner","rank":1}
{"index":{}}
{"content":"Fraflytter og driften dele 50","rank":2}
{"index":{}}
{"content":"Gulvbrædder udskiftes","rank":2}
{"index":{}}
{"content":"Beslag mv. nedtages","rank":3}
{"index":{}}
{"content":"Afslutninger udføres i revner/hjørner","rank":2}
{"index":{}}
{"content":"Pga. Ridser og mærker","rank":2}
{"index":{}}
{"content":"Ny smæklås monteres på dør mod køkkentrappe","rank":2}
{"index":{}}
{"content":"Udskiftning af gulv i bad","rank":3}
{"index":{}}
{"content":"Ekstra kørsel lejemål ikke ryddet og rengjort","rank":2}
{"index":{}}
{"content":"Lejemål ikke ryddet ved syn","rank":2}
{"index":{}}
{"content":"Ridser i maling","rank":10}
{"index":{}}
{"content":"Små ridser i lak","rank":2}
{"index":{}}
{"content":"Ridser og hakker i lak","rank":2}
{"index":{}}
{"content":"Vaske alle udluftnings kanaler ned","rank":2}
{"index":{}}
{"content":"Mangler en nøgle","rank":8}
{"index":{}}
{"content":"Rengøring af haven","rank":2}
{"index":{}}
{"content":"Lampe i entre fjernes","rank":2}
{"index":{}}
{"content":"Revner mellem fodpanel og sandliste","rank":3}
{"index":{}}
{"content":"Radiatorer støvsuges","rank":2}
{"index":{}}
{"content":"Samt kabelkasse","rank":2}
{"index":{}}
{"content":"Gulve rengøres før gulvsliber for lim/tape","rank":1}
{"index":{}}
{"content":"400v monteres ved ildsted","rank":3}
{"index":{}}
{"content":"Rengøring af afdækning over køkkenskabe","rank":2}
{"index":{}}
{"content":"Rensning og pollis af linolium","rank":3}
{"index":{}}
{"content":"Bundventil i vask udskiftes","rank":3}
{"index":{}}
{"content":"Ny vask monteres","rank":3}
{"index":{}}
{"content":"Nyt armatur monteres","rank":5}
{"index":{}}
{"content":"Rengøring af køleskab ind og udvendig","rank":2}
{"index":{}}
{"content":"Spejlet mangler","rank":2}
{"index":{}}
{"content":"Gulvbelægning udskiftes","rank":2}
{"index":{}}
{"content":"Manglende vedligeholdelse","rank":88}
{"index":{}}
{"content":"Fjernelse af udestuen","rank":2}
{"index":{}}
{"content":"Trappe","rank":27}
{"index":{}}
{"content":"Under vindue","rank":2}
{"index":{}}
{"content":"Afpropning efter vaskemaskine","rank":3}
{"index":{}}
{"content":"Ny hængelås leveres","rank":2}
{"index":{}}
{"content":"Planlægning af arbejdet aftales med maler på tlf. 40133265","rank":3}
{"index":{}}
{"content":"Rep. og limning af rutex ret evt. hjørnefolder","rank":2}
{"index":{}}
{"content":"Skunk lem plet og færdigstryg","rank":2}
{"index":{}}
{"content":"Rep. rutex efter væg Rep./revner","rank":2}
{"index":{}}
{"content":"Komfur ej rengjort til ren bund","rank":2}
{"index":{}}
{"content":"Ikke tilhørende beslag nedtages inden behandling","rank":1}
{"index":{}}
{"content":"På begge sider","rank":4}
{"index":{}}
{"content":"Ikke fejet","rank":2}
{"index":{}}
{"content":"Pudsning af vinduer indvendigt og udvendigt","rank":2}
{"index":{}}
{"content":"Levering og montering af nyt Emfang og komfur","rank":2}
{"index":{}}
{"content":"Mislighold","rank":10}
{"index":{}}
{"content":"Hakker i gulv","rank":8}
{"index":{}}
{"content":"Gennemslidt lak","rank":75}
{"index":{}}
{"content":"Revne i håndvask","rank":4}
{"index":{}}
{"content":"Liste ved terrassedør","rank":2}
{"index":{}}
{"content":"Afsyret","rank":2}
{"index":{}}
{"content":"Cellutexplader på loft ikke lovlige jr. brandmyndighederne","rank":2}
{"index":{}}
{"content":"Fastgøres","rank":5}
{"index":{}}
{"content":"Håndtag og nøglehuller eftergås","rank":2}
{"index":{}}
{"content":"Galshylde monteres","rank":2}
{"index":{}}
{"content":"Over malet","rank":17}
{"index":{}}
{"content":"Meget vandskadet","rank":2}
{"index":{}}
{"content":"Samt bordplade og vask","rank":2}
{"index":{}}
{"content":"Pletter på trægulvet som ikke kan fjernes","rank":2}
{"index":{}}
{"content":"Aftøring af døreplader","rank":2}
{"index":{}}
{"content":"Mangler spejl i bad","rank":2}
{"index":{}}
{"content":"Rengøring toilet","rank":2}
{"index":{}}
{"content":"Vinduesplade monteres","rank":2}
{"index":{}}
{"content":"Dækpladelister over skab nedtages","rank":2}
{"index":{}}
{"content":"Indvendige bradepander og rist","rank":2}
{"index":{}}
{"content":"Revner i venyl","rank":2}
{"index":{}}
{"content":"Laminat i stykker","rank":2}
{"index":{}}
{"content":"Støv","rank":4}
{"index":{}}
{"content":"Fjernelse af laminatgulv i hele lejligheden","rank":2}
{"index":{}}
{"content":"Det gamle spejl er blevet pillet ned","rank":2}
{"index":{}}
{"content":"Af og påmontering af komfur","rank":2}
{"index":{}}
{"content":"Køkkenlåge er ødelagt i finering","rank":2}
{"index":{}}
{"content":"Ikke demonteret ved fraflytning","rank":3}
{"index":{}}
{"content":"Skrammer/misligeholdt","rank":2}
{"index":{}}
{"content":"Rengøring af terrasse","rank":2}
{"index":{}}
{"content":"Oven på skabe","rank":1}
{"index":{}}
{"content":"Kalk på samt på rør ved brusearmatur","rank":2}
{"index":{}}
{"content":"Ved terrassedør","rank":2}
{"index":{}}
{"content":"Ved hoveddør","rank":10}
{"index":{}}
{"content":"Farve grå","rank":2}
{"index":{}}
{"content":"Bakkelit","rank":3}
{"index":{}}
{"content":"Altandørsparti ikke rengjort","rank":3}
{"index":{}}
{"content":"Stik til komfur monteres","rank":3}
{"index":{}}
{"content":"Nedslidt/svamp/not og fer ødelagt","rank":2}
{"index":{}}
{"content":"Gennemslid og hakket","rank":2}
{"index":{}}
{"content":"Toilet udskiftes","rank":2}
{"index":{}}
{"content":"Afpropning af strømudtag","rank":2}
{"index":{}}
{"content":"Flisevæg","rank":2}
{"index":{}}
{"content":"Nikotin og ridser hakker","rank":2}
{"index":{}}
{"content":"Nikotin på træværk","rank":2}
{"index":{}}
{"content":"Vaske af for nikotin og rengøring af skabe ude og inde","rank":2}
{"index":{}}
{"content":"Vask al træværk inden maler for nikotin","rank":2}
{"index":{}}
{"content":"Ridser og slidt igennem lak","rank":2}
{"index":{}}
{"content":"Finish omkring dør indfatninger","rank":2}
{"index":{}}
{"content":"Løs fuge i brusebad","rank":2}
{"index":{}}
{"content":"Fastgørelse af lys armatur","rank":4}
{"index":{}}
{"content":"Fastgørelse af lysarmatur","rank":4}
{"index":{}}
{"content":"Nye lyskilder i emhætte","rank":4}
{"index":{}}
{"content":"Fastgørelse af armatur rør i kælder","rank":4}
{"index":{}}
{"content":"Kalk- små ridser","rank":2}
{"index":{}}
{"content":"Vask alle radiator ventiler samt ventilation riste af over alt","rank":2}
{"index":{}}
{"content":"Rengøre stikkontakt","rank":2}
{"index":{}}
{"content":"Misligeholdt / ridser op pletter","rank":2}
{"index":{}}
{"content":"Misligehold ikke rengjort","rank":2}
{"index":{}}
{"content":"Lyserød maling på karm","rank":2}
{"index":{}}
{"content":"Revet d af væg","rank":2}
{"index":{}}
{"content":"Mange borehuller i vægge","rank":2}
{"index":{}}
{"content":"Er gule. Skal være hvide eller grå","rank":2}
{"index":{}}
{"content":"Er vandskadet","rank":8}
{"index":{}}
{"content":"De høre ikke til lejemålet","rank":2}
{"index":{}}
{"content":"Knaster","rank":4}
{"index":{}}
{"content":"Udskiftning af bordplade med underlimet vask","rank":2}
{"index":{}}
{"content":"Hylde til køleskab","rank":2}
{"index":{}}
{"content":"Store huller i væg","rank":2}
{"index":{}}
{"content":"Huller i siden","rank":6}
{"index":{}}
{"content":"Store huller","rank":4}
{"index":{}}
{"content":"Lampe i loft skal fjernes","rank":4}
{"index":{}}
{"content":"Nyt dæksel","rank":4}
{"index":{}}
{"content":"Hak i gulv","rank":2}
{"index":{}}
{"content":"Hak i gulv ved el tavle","rank":2}
{"index":{}}
{"content":"Efter gulv mand","rank":2}
{"index":{}}
{"content":"Mad brændt på","rank":2}
{"index":{}}
{"content":"Defekt dåse","rank":4}
{"index":{}}
{"content":"Rengøring af vinduesrammer","rank":2}
{"index":{}}
{"content":"Nye baner tapet opsættes efter skab stk","rank":2}
{"index":{}}
{"content":"Fodpanel monteres efter skab","rank":2}
{"index":{}}
{"content":"Ikke gradueret på indflytningsrapport","rank":2}
{"index":{}}
{"content":"Nyt udtag til komfur","rank":2}
{"index":{}}
{"content":"Låger slibes og lakeres","rank":2}
{"index":{}}
{"content":"Ydervæg skal behandles med træværksmaling","rank":2}
{"index":{}}
{"content":"Fedtet","rank":3}
{"index":{}}
{"content":"Liste ved dør","rank":2}
{"index":{}}
{"content":"Brandmærke","rank":3}
{"index":{}}
{"content":"Hakket og skrammet mod vindfang","rank":2}
{"index":{}}
{"content":"Hakket og skrammet mod entre","rank":2}
{"index":{}}
{"content":"Vinyl nedtages efter aftale med afdelingen","rank":2}
{"index":{}}
{"content":"Badeniche udføres efter aftale med afdelingen","rank":2}
{"index":{}}
{"content":"Efter murer har monteres fliser","rank":2}
{"index":{}}
{"content":"Vandskade fra overbo","rank":2}
{"index":{}}
{"content":"Skabe og skuffer eftergås og justeres","rank":4}
{"index":{}}
{"content":"Olie slå igennem","rank":1}
{"index":{}}
{"content":"Rengøring ikke gjort","rank":1}
{"index":{}}
{"content":"Gulv udluses efter væg håndværksmæssigt korrekt","rank":1}
{"index":{}}
{"content":"Delvist malet","rank":1}
{"index":{}}
{"content":"Radiator monteres","rank":1}
{"index":{}}
{"content":"Kontakter skal være ens","rank":1}
{"index":{}}
{"content":"Lampeudtag i loft udskiftes/monteres","rank":2}
{"index":{}}
{"content":"Afmon/mont af skinne i dør","rank":2}
{"index":{}}
{"content":"Polering af spejl","rank":2}
{"index":{}}
{"content":"Spartel afrenses på væg","rank":2}
{"index":{}}
{"content":"Nye lampeudtag monteres ved roset","rank":2}
{"index":{}}
{"content":"Udskiftning af vinylgulv i bad","rank":2}
{"index":{}}
{"content":"Udskiftning af vinyl","rank":4}
{"index":{}}
{"content":"Arbejdet aftales med maler på tlf. 40133265","rank":2}
{"index":{}}
{"content":"Låge til øverste hylde i fryser","rank":2}
{"index":{}}
{"content":"Polering gulv i køkken","rank":2}
{"index":{}}
{"content":"Den manglende vedligeholdelse vil give gennemslag. Derfor kræves en ekstra behandling","rank":2}
{"index":{}}
{"content":"Altan fejl iflg. Ejendomsfunktionær","rank":2}
{"index":{}}
{"content":"ny tapet op i hele lejemålet","rank":2}
{"index":{}}
{"content":"Dør til bad","rank":2}
{"index":{}}
{"content":"Rep. Af skruehuller","rank":2}
{"index":{}}
{"content":"Det er røget meget i lejligheden og den skal have nikotinspærre","rank":2}
{"index":{}}
{"content":"Maling springer af","rank":2}
{"index":{}}
{"content":"Tilpasningsskade","rank":2}
{"index":{}}
{"content":"Kalk og skidt","rank":2}
{"index":{}}
{"content":"Maling springer i kanter","rank":4}
{"index":{}}
{"content":"Hul til bl.batteri","rank":2}
{"index":{}}
{"content":"Komfur stod i lejligheden ved indflytning","rank":2}
{"index":{}}
{"content":"Ramme flækket","rank":2}
{"index":{}}
{"content":"Samt ydervæg med 2 gange træværksmaling inkl. grundbehandling","rank":2}
{"index":{}}
{"content":"Trin","rank":2}
{"index":{}}
{"content":"Vandlås utæt","rank":2}
{"index":{}}
{"content":"Samt trianettekøkken","rank":2}
{"index":{}}
{"content":"RANDERS FC STYRER FOR VILDT","rank":2}
{"index":{}}
{"content":"Svane køkken","rank":8}
{"index":{}}
{"content":"Huller rep","rank":2}
{"index":{}}
{"content":"Rengøring af termostatventiler og ventilartor","rank":2}
{"index":{}}
{"content":"Aftøring af dørplader","rank":2}
{"index":{}}
{"content":"Aftøring af Vinduesramme","rank":2}
{"index":{}}
{"content":"I henhold til øvrige aftaler","rank":4}
{"index":{}}
{"content":"Afkalkning af samtlige bl.batterier","rank":2}
{"index":{}}
{"content":"Aftegninger/fugt plet","rank":1}
{"index":{}}
{"content":"Hoveddør","rank":22}
{"index":{}}
{"content":"Små hakker","rank":6}
{"index":{}}
{"content":"Små sømhuller","rank":2}
{"index":{}}
{"content":"Skrammer fra hjælpemidler","rank":2}
{"index":{}}
{"content":"Let slip","rank":2}
{"index":{}}
{"content":"Lidt snavset","rank":4}
{"index":{}}
{"content":"Også rengøring af toilet","rank":2}
{"index":{}}
{"content":"Ved skydedør","rank":2}
{"index":{}}
{"content":"Vinduer ikke pudset","rank":20}
{"index":{}}
{"content":"Vask til ren bund samt aftørring oven på skabe","rank":2}
{"index":{}}
{"content":"Front på hæve/sænke køkkenbord knækket. Der er udskæring til panel for komfur","rank":3}
{"index":{}}
{"content":"Inkl pudsning af vindue","rank":2}
{"index":{}}
{"content":"Omlægning med 3 nye nøgler","rank":2}
{"index":{}}
{"content":"Maling på udtag","rank":2}
{"index":{}}
{"content":"Maling på rammer-tangenter","rank":2}
{"index":{}}
{"content":"Brandmærker i gulv","rank":2}
{"index":{}}
{"content":"Slidt og ridser igennem lak","rank":2}
{"index":{}}
{"content":"Skader efter vand","rank":2}
{"index":{}}
{"content":"Montering af vask og armatur","rank":2}
{"index":{}}
{"content":"Waterstop monteres på vaskemaskinen","rank":2}
{"index":{}}
{"content":"Fjerne alle Malerpletter i hele lejemål på paneler","rank":2}
{"index":{}}
{"content":"Rengøring imellem glas på ovn","rank":2}
{"index":{}}
{"content":"sømhuller","rank":2}
{"index":{}}
{"content":"bageplader rengøres","rank":2}
{"index":{}}
{"content":"2 løse skuffefronter","rank":2}
{"index":{}}
{"content":"kalk","rank":2}
{"index":{}}
{"content":"polering","rank":2}
{"index":{}}
{"content":"afskalning","rank":2}
{"index":{}}
{"content":"ca. 15 trin","rank":2}
{"index":{}}
{"content":"let slip","rank":2}
{"index":{}}
{"content":"Omlægning af lås med 3 nye nøgler","rank":4}
{"index":{}}
{"content":"Fjerne flydende gulv og alle tilhørende lister","rank":2}
{"index":{}}
{"content":"Efter beslag fra tidligere lejer","rank":1}
{"index":{}}
{"content":"Omkring altandør","rank":1}
{"index":{}}
{"content":"Afhjælpning i forbindelse med udskiftning af køkkenbord plade","rank":1}
{"index":{}}
{"content":"Alle stikkontakter i hele lejlighed sprittes af","rank":2}
{"index":{}}
{"content":"Alle stikkontakter og lampeudtag i hele lejemål sprittes af","rank":2}
{"index":{}}
{"content":"linoleum og skinner fjernes","rank":2}
{"index":{}}
{"content":"Kalket","rank":5}
{"index":{}}
{"content":"Mærker","rank":20}
{"index":{}}
{"content":"Lejligheden er meget gul af nikotin og skal have spærregrunder på alle lofter","rank":2}
{"index":{}}
{"content":"Stikkontakt mangler ved køleskab","rank":2}
{"index":{}}
{"content":"Fjerne lamper køkken og soveværelse","rank":2}
{"index":{}}
{"content":"Skruehuller efter persinner","rank":2}
{"index":{}}
{"content":"Alle stikkontakter og lampeudtag sprittes af","rank":2}
{"index":{}}
{"content":"Alke stikkontakter og lampeudtag sprittes af","rank":2}
{"index":{}}
{"content":"Nyt wc komplet med bræt","rank":2}
{"index":{}}
{"content":"Samt ydervæg males","rank":1}
{"index":{}}
{"content":"Hyldepapir ikke fjernet","rank":1}
{"index":{}}
{"content":"Liste ved vask slibes og lakeres x2","rank":2}
{"index":{}}
{"content":"Samt rørkasse","rank":1}
{"index":{}}
{"content":"Rørkasse males","rank":3}
{"index":{}}
{"content":"Aftøring af dørekarme","rank":2}
{"index":{}}
{"content":"Håndtag eftergås","rank":1}
{"index":{}}
{"content":"Kokosmåtte mangler","rank":2}
{"index":{}}
{"content":"på grund ødelagt bordplade","rank":2}
{"index":{}}
{"content":"Ridser på dørplade på begge sider","rank":2}
{"index":{}}
{"content":"Alle stikkontakter og lampeudtag sprittes af i hele lejligheden","rank":2}
{"index":{}}
{"content":"Spindelvæv","rank":12}
{"index":{}}
{"content":"Let afslibning og lak","rank":2}
{"index":{}}
{"content":"Rengøring af lift i loft","rank":2}
{"index":{}}
{"content":"Afvaskning af nikotin samt","rank":2}
{"index":{}}
{"content":"Ny cylinder med 3 nye nøgler","rank":2}
{"index":{}}
{"content":"Låge over kølskkab monteres igen","rank":2}
{"index":{}}
{"content":"Dør meget ridset","rank":3}
{"index":{}}
{"content":"Overmalede","rank":3}
{"index":{}}
{"content":"Fjerne mos og ukrudt imellem fliser","rank":2}
{"index":{}}
{"content":"Oebro95.Dk","rank":3}
{"index":{}}
{"content":"Farve forskel","rank":2}
{"index":{}}
{"content":"Farveforskel","rank":2}
{"index":{}}
{"content":"Fliser løse","rank":2}
{"index":{}}
{"content":"Afsprittes","rank":4}
{"index":{}}
{"content":"Godt slidt","rank":2}
{"index":{}}
{"content":"Lidt slidt","rank":4}
{"index":{}}
{"content":"Ikke afkalkning. Men rengøring af linoliums gulv","rank":2}
{"index":{}}
{"content":"Aldrig rengjort","rank":2}
{"index":{}}
{"content":"Små farvenuancer","rank":2}
{"index":{}}
{"content":"Huller efter gardinstænger","rank":4}
{"index":{}}
{"content":"Mærker efter gardinstænger","rank":2}
{"index":{}}
{"content":"Begge bl.batterier","rank":2}
{"index":{}}
{"content":"Lidt tape og hakker","rank":2}
{"index":{}}
{"content":"Kun ydervæg skal males og med træværksmaling","rank":1}
{"index":{}}
{"content":"Film på","rank":1}
{"index":{}}
{"content":"Kun ramme","rank":1}
{"index":{}}
{"content":"Klistermærker på dør","rank":1}
{"index":{}}
{"content":"Fodpaneler fastgøres","rank":1}
{"index":{}}
{"content":"Aftegninger","rank":4}
{"index":{}}
{"content":"Ramme hakker","rank":1}
{"index":{}}
{"content":"Justering og reperation af skuffer og skabe","rank":1}
{"index":{}}
{"content":"Udskiftning af gericht","rank":1}
{"index":{}}
{"content":"Gericht udskiftes","rank":1}
{"index":{}}
{"content":"Fodliste udskiftes","rank":1}
{"index":{}}
{"content":"Karm udskiftes","rank":1}
{"index":{}}
{"content":"Stikkontakter","rank":2}
{"index":{}}
{"content":"Rør til wc vand udskiftes","rank":1}
{"index":{}}
{"content":"Samt armatur","rank":2}
{"index":{}}
{"content":"Kun øverste rammer ved vinduer. Skruehuller","rank":2}
{"index":{}}
{"content":"Huller efter gardinstang","rank":10}
{"index":{}}
{"content":"Ikke tilbageleveret","rank":3}
{"index":{}}
{"content":"Ikke","rank":5}
{"index":{}}
{"content":"Leveres af kontoret","rank":3}
{"index":{}}
{"content":"System 231","rank":3}
{"index":{}}
{"content":"Leveres af ejendomskontoret","rank":3}
{"index":{}}
{"content":"Udbedring af skader","rank":28}
{"index":{}}
{"content":"Fuld dækkende malerbehandling","rank":38}
{"index":{}}
{"content":"Afvaskning","rank":46}
{"index":{}}
{"content":"Nikotinspærre","rank":40}
{"index":{}}
{"content":"Opsætning af glasvæv","rank":4}
{"index":{}}
{"content":"Opsætning af glasfilt","rank":8}
{"index":{}}
{"content":"Afvasking","rank":2}
{"index":{}}
{"content":"Opsætning af rutex","rank":5}
{"index":{}}
{"content":"Opsætning af Glasvæv","rank":2}
{"index":{}}
{"content":"Opsætnin af rutex","rank":2}
{"index":{}}
{"content":"opsætning af glasvæv","rank":2}
{"index":{}}
{"content":"Hovedrengøring","rank":31}
{"index":{}}
{"content":"Rengøring efter håndværker","rank":32}
{"index":{}}
{"content":"Udskiftning af dørplade","rank":4}
{"index":{}}
{"content":"Ridset og skrammet efter kørestol","rank":2}
{"index":{}}
{"content":"Udskiftning af låge","rank":6}
{"index":{}}
{"content":"Tømmes og rengøres","rank":4}
{"index":{}}
{"content":"Vinduer pudses","rank":9}
{"index":{}}
{"content":"Skabe rengøres","rank":10}
{"index":{}}
{"content":"Låger rengøres","rank":4}
{"index":{}}
{"content":"Døre rengøres","rank":4}
{"index":{}}
{"content":"Hele boligen","rank":6}
{"index":{}}
{"content":"Kun karm over dør","rank":2}
{"index":{}}
{"content":"Kun karm over vindue","rank":2}
{"index":{}}
{"content":"Små mærker","rank":4}
{"index":{}}
{"content":"Ikke klinker men linoleum","rank":2}
{"index":{}}
{"content":"Fodlister skal afmonteres på grund af parket skal skiftes","rank":2}
{"index":{}}
{"content":"Ingen lys i badeværelse","rank":2}
{"index":{}}
{"content":"Manglen aftøring af skabe udvendig","rank":2}
{"index":{}}
{"content":"Støvsugning bag ratiator","rank":2}
{"index":{}}
{"content":"Genbrug gammel køkkenvask","rank":2}
{"index":{}}
{"content":"Genbrug blandningsbatteriet","rank":2}
{"index":{}}
{"content":"Så loft ligner samme slags i hele stue","rank":2}
{"index":{}}
{"content":"Ikke malet pænt","rank":2}
{"index":{}}
{"content":"Mangler panel","rank":4}
{"index":{}}
{"content":"Tapet på dør","rank":2}
{"index":{}}
{"content":"Mangler lim under tapet","rank":2}
{"index":{}}
{"content":"Maling på låge skab","rank":2}
{"index":{}}
{"content":"Grimt finish omkring alle kontakter efter tapet opsætning","rank":2}
{"index":{}}
{"content":"Tapet ødelagt omkring vindue og væg til højre","rank":2}
{"index":{}}
{"content":"Ridser igennemlak og mange mærker","rank":2}
{"index":{}}
{"content":"Hul i plade samt mange mærker","rank":2}
{"index":{}}
{"content":"Beskidt i og bagside","rank":2}
{"index":{}}
{"content":"Maling på håndtag","rank":2}
{"index":{}}
{"content":"Rense maling af gulv","rank":2}
{"index":{}}
{"content":"Fjerne maling på kontakter","rank":2}
{"index":{}}
{"content":"Mangler maling","rank":2}
{"index":{}}
{"content":"Karme og lister","rank":2}
{"index":{}}
{"content":"Hunden har tisset på parkentgulvet","rank":2}
{"index":{}}
{"content":"Rengøring af alle overflader","rank":18}
{"index":{}}
{"content":"Mangler nøgler","rank":10}
{"index":{}}
{"content":"Sokkel og sider løs","rank":4}
{"index":{}}
{"content":"Sokkel","rank":8}
{"index":{}}
{"content":"2x maling","rank":2}
{"index":{}}
{"content":"Kalk mærker mange steder","rank":4}
{"index":{}}
{"content":"Ødelagt forneden","rank":2}
{"index":{}}
{"content":"Bordplade skal skiftes","rank":4}
{"index":{}}
{"content":"Brændt mad på pladerne","rank":2}
{"index":{}}
{"content":"Huller i fuge","rank":3}
{"index":{}}
{"content":"Nyt skab fra svane","rank":4}
{"index":{}}
{"content":"Huller og hakker","rank":4}
{"index":{}}
{"content":"Lampeudtag monteres ved roset","rank":1}
{"index":{}}
{"content":"Bundplade udskiftes i Vaskskab","rank":1}
{"index":{}}
{"content":"Vaskskab udskiftes","rank":1}
{"index":{}}
{"content":"Samt krydderihylde","rank":1}
{"index":{}}
{"content":"Kun vaskskab","rank":1}
{"index":{}}
{"content":"Prop til vask mangler","rank":1}
{"index":{}}
{"content":"Køleskabselement udskiftes","rank":1}
{"index":{}}
{"content":"Komfur fjernes og gas afproppes","rank":4}
{"index":{}}
{"content":"Bundplade i vaskskab udskiftes eller dækplade monteres","rank":2}
{"index":{}}
{"content":"Bad renoveres","rank":2}
{"index":{}}
{"content":"Spejl udskiftes","rank":1}
{"index":{}}
{"content":"14-dages mangler skal angives i C-Web, der tilgås som flg.:\nwww.C-web.Dk\nBruger: 1600.15971.X@c-web.Dk\nPassword: xxxxxx","rank":1}
{"index":{}}
{"content":"Total rengøring badeværelse","rank":2}
{"index":{}}
{"content":"Der magler 2 nøgler til lejligheden","rank":2}
{"index":{}}
{"content":"Lejligheden var ikke tømt ved fraflytningen og det et var en del sortering af indbo","rank":2}
{"index":{}}
{"content":"Fals rengøres","rank":2}
{"index":{}}
{"content":"Spartling af huller","rank":2}
{"index":{}}
{"content":"Hakket/ridset i maling","rank":2}
{"index":{}}
{"content":"Slidt igennem lsl","rank":2}
{"index":{}}
{"content":"Rengøres med sprit","rank":6}
{"index":{}}
{"content":"Glasplade ødelagt pågrund af mange ridser","rank":2}
{"index":{}}
{"content":"Mangler nøgle","rank":4}
{"index":{}}
{"content":"Hylden er ødelagt","rank":2}
{"index":{}}
{"content":"Køleskab","rank":18}
{"index":{}}
{"content":"Komfur","rank":13}
{"index":{}}
{"content":"Tilsætninger males","rank":2}
{"index":{}}
{"content":"Rengøres efter håndværker","rank":2}
{"index":{}}
{"content":"Eftersyn generelt","rank":1}
{"index":{}}
{"content":"Radiator efterses","rank":1}
{"index":{}}
{"content":"Der er spartlet hul / huller i loftet hvilket ikke er udført håndværksmæssigt korrekt. Dette skal reppes og spartles igen","rank":1}
{"index":{}}
{"content":"Der er spartlet hul / huller på væggene","rank":2}
{"index":{}}
{"content":"Medmindre mærker kan rengøres væk fra dørkarm / gerikt imellem stue og værelse","rank":1}
{"index":{}}
{"content":"Emhætten kan ikke rengøres","rank":2}
{"index":{}}
{"content":"På grund af køkken skal skiftes","rank":2}
{"index":{}}
{"content":"Haven skal rydddes total og anlægges ny græsplæne","rank":2}
{"index":{}}
{"content":"Toilet kan rengøres","rank":2}
{"index":{}}
{"content":"Trådløs ringeklokke mangler","rank":4}
{"index":{}}
{"content":"Nødvendig rengøring for istandsættelse","rank":2}
{"index":{}}
{"content":"1.stk. nøgle mangler","rank":4}
{"index":{}}
{"content":"Køkkenet er så skadet af nikotin","rank":2}
{"index":{}}
{"content":"Fjerne laminat og parketgulv i køkken da det er ødelagt","rank":2}
{"index":{}}
{"content":"Parketgulv ødelagt","rank":2}
{"index":{}}
{"content":"fjerne diverse gardinstænger og af og genmontere højskabe i soveværelse","rank":2}
{"index":{}}
{"content":"Bruserstang og slange +hoved kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Knækket i hjørnet","rank":2}
{"index":{}}
{"content":"Farveskift fra grøn til hvid","rank":2}
{"index":{}}
{"content":"Meget skidt bag radiatorer","rank":2}
{"index":{}}
{"content":"Inddækning males efter beslag","rank":1}
{"index":{}}
{"content":"Bagkant maling springer","rank":1}
{"index":{}}
{"content":"Maling springer på bagkant","rank":1}
{"index":{}}
{"content":"Køleskab rengøres til ren bund","rank":2}
{"index":{}}
{"content":"Gulv rengøres til ren bund","rank":2}
{"index":{}}
{"content":"Fodlister rengøres til ren bund","rank":2}
{"index":{}}
{"content":"Rengøring af toiletskål","rank":2}
{"index":{}}
{"content":"Revne i frostskuffe","rank":2}
{"index":{}}
{"content":"Div. Ridser og mærker","rank":2}
{"index":{}}
{"content":"Ikke vedligeholdt","rank":10}
{"index":{}}
{"content":"Renses af for maling","rank":2}
{"index":{}}
{"content":"Afvaskes med sprit","rank":8}
{"index":{}}
{"content":"Tapet på endevæg. 2m2","rank":2}
{"index":{}}
{"content":"Store Huller og karme ødelagte efter vold","rank":2}
{"index":{}}
{"content":"Misfarvet efter nikotin","rank":2}
{"index":{}}
{"content":"Defekt","rank":7}
{"index":{}}
{"content":"6 m2 nyt tapet","rank":2}
{"index":{}}
{"content":"Banke bule af og murer hul til","rank":2}
{"index":{}}
{"content":"Kontakt ved dør til stue","rank":2}
{"index":{}}
{"content":"Bygge væg i gips","rank":2}
{"index":{}}
{"content":"Afmonterer og montere efter fjerne og opsæt ny væg","rank":2}
{"index":{}}
{"content":"Hoveddør slibe og male 2gange","rank":2}
{"index":{}}
{"content":"Rammer og tangenter paner underlag","rank":2}
{"index":{}}
{"content":"Kalk på vægge","rank":2}
{"index":{}}
{"content":"Samt 3 stikkontakter","rank":2}
{"index":{}}
{"content":"Rammer og tangenter panel underlag og stikkontaker","rank":2}
{"index":{}}
{"content":"Manglede ved fraflytning","rank":3}
{"index":{}}
{"content":"manglede ved fraflytning","rank":3}
{"index":{}}
{"content":"Fjerne puds og pudset op igen pænt. Plant","rank":2}
{"index":{}}
{"content":"På grund af dørplade er blevet skiftet","rank":2}
{"index":{}}
{"content":"Hakker i gulvet","rank":2}
{"index":{}}
{"content":"Sorte pletter","rank":2}
{"index":{}}
{"content":"Det er slået fliser i ved håndvask","rank":2}
{"index":{}}
{"content":"Slået hul i bordpladen","rank":2}
{"index":{}}
{"content":"Genmontering af køkken skab","rank":2}
{"index":{}}
{"content":"Alt træværk males da der er en del ridser og mærker bla. efter husdyrhold","rank":2}
{"index":{}}
{"content":"Rep efter Div. Ridser og mærker","rank":2}
{"index":{}}
{"content":"Rep. efter Div. ridser","rank":2}
{"index":{}}
{"content":"Dørtrin slibes pga. Ridser og mærker bla. Grundet husdyrhold","rank":2}
{"index":{}}
{"content":"Kontakter rengøres helt til bund for snavs og nikotin","rank":2}
{"index":{}}
{"content":"Ej rengjort rengøres til ren bund","rank":2}
{"index":{}}
{"content":"Ej rengjort til ren bund","rank":2}
{"index":{}}
{"content":"Badeværelse ej rengjort og afkalket til ren bund","rank":2}
{"index":{}}
{"content":"Komfuret er så misligholdt og fejlagtigt brugt","rank":2}
{"index":{}}
{"content":"Dør udskiftes pga. Ridser og mærker og bærer præg af husdyrhold","rank":2}
{"index":{}}
{"content":"Store ridser i gulv","rank":2}
{"index":{}}
{"content":"Levering og montering af ny skydedør komplet med karm og gerigter","rank":2}
{"index":{}}
{"content":"Ikke rengjorte","rank":4}
{"index":{}}
{"content":"Test af kagemand","rank":1}
{"index":{}}
{"content":"I henhold til lov om leje af almene bolig  §5 stk. 2 accepterer jeg","rank":1}
{"index":{}}
{"content":"Rep. af lejligheds dør efter den har været brudt op","rank":2}
{"index":{}}
{"content":"Laminat ødelagt på bordpladen","rank":2}
{"index":{}}
{"content":"Brandmærke på gulv","rank":2}
{"index":{}}
{"content":"Det har stået varme ting på bordpladen","rank":2}
{"index":{}}
{"content":"Mangler kogeplade i lejligheden","rank":2}
{"index":{}}
{"content":"Mangler hylde i køleskabslåge","rank":2}
{"index":{}}
{"content":"Af og påmontering af køkkenvask og blandingbatteri på grund af bordpladen skal skiftes","rank":2}
{"index":{}}
{"content":"Er ikke vedligeholdt i boperioden","rank":2}
{"index":{}}
{"content":"Er lagt uden tilladelse og kun et lag. Det er lige som et klistermærke","rank":2}
{"index":{}}
{"content":"Kalket til og ej ren","rank":2}
{"index":{}}
{"content":"Døren mangler","rank":2}
{"index":{}}
{"content":"Gulvtæppe høre ikke til lejemålet","rank":2}
{"index":{}}
{"content":"Høre ej til lejemålet","rank":2}
{"index":{}}
{"content":"Pga gulvslibning","rank":8}
{"index":{}}
{"content":"Høre ikke til lejemålet","rank":8}
{"index":{}}
{"content":"Køleskab rengøres for klistermærker","rank":2}
{"index":{}}
{"content":"Vindue males pga. manglendene udluftning","rank":2}
{"index":{}}
{"content":"Kan ikke rengøres for nicotin maling nødvendig","rank":2}
{"index":{}}
{"content":"Afvaskes for nicotin og males","rank":2}
{"index":{}}
{"content":"Dør mangler","rank":20}
{"index":{}}
{"content":"Dør ødelagt af nicotin og mærker","rank":4}
{"index":{}}
{"content":"Fodlister skal spartles og males på grund af skæremærker fra kniv i forbindelse nedlægning af gulvtæppet","rank":1}
{"index":{}}
{"content":"Loft udtag overmalet","rank":2}
{"index":{}}
{"content":"Efter clips","rank":1}
{"index":{}}
{"content":"Persienne nedtages","rank":1}
{"index":{}}
{"content":"Samt udlusning efter dørhul","rank":1}
{"index":{}}
{"content":"Efter montering af væg","rank":1}
{"index":{}}
{"content":"Efter snedkereftersyn","rank":1}
{"index":{}}
{"content":"Installationer og radiatorer eftergås","rank":1}
{"index":{}}
{"content":"Maling ikke dækkende og samt grundarbejde mangler","rank":4}
{"index":{}}
{"content":"Samt roset","rank":1}
{"index":{}}
{"content":"Lampe på loft nedtages","rank":1}
{"index":{}}
{"content":"Højskab monteres","rank":1}
{"index":{}}
{"content":"Højskab males efter beslag mv","rank":1}
{"index":{}}
{"content":"Males pga gulvskifte","rank":1}
{"index":{}}
{"content":"Gulvet skal vaskes med maskine","rank":1}
{"index":{}}
{"content":"Loftet er misfarvet og der tages forbehold for en spærrende behandling","rank":1}
{"index":{}}
{"content":"Væggene er misfarvede og der tages forbehold for en spærrende behandling","rank":1}
{"index":{}}
{"content":"Tapet sidder dårligt og spartlet mange steder","rank":2}
{"index":{}}
{"content":"Så misligeholdt at udskiftning er nødvendig","rank":6}
{"index":{}}
{"content":"Fjerne klistermærke på skabslåge","rank":2}
{"index":{}}
{"content":"Knappen på emhætten er i stykker","rank":2}
{"index":{}}
{"content":"Et lille skruehul","rank":2}
{"index":{}}
{"content":"3 skruehuller spartles og plet males","rank":2}
{"index":{}}
{"content":"Afkalkning af 2 bl.batterier samt brusenice","rank":2}
{"index":{}}
{"content":"Ridser fra gulvslibning","rank":2}
{"index":{}}
{"content":"Huller små hakker","rank":2}
{"index":{}}
{"content":"Aftøring af ovn indv","rank":2}
{"index":{}}
{"content":"Mærker og ridser efter hjælpemidler rollater","rank":2}
{"index":{}}
{"content":"Pga fejlbehandling","rank":2}
{"index":{}}
{"content":"Vinduesplade udskiftes","rank":1}
{"index":{}}
{"content":"Meget snavset","rank":34}
{"index":{}}
{"content":"Efter ikke standard udstyr","rank":1}
{"index":{}}
{"content":"Spejl monteres","rank":1}
{"index":{}}
{"content":"Fjern Skruer/ravpluks","rank":6}
{"index":{}}
{"content":"Fjern gardiner/persienner","rank":6}
{"index":{}}
{"content":"Ødelagt Orange plade","rank":3}
{"index":{}}
{"content":"Huller i væg i wc","rank":6}
{"index":{}}
{"content":"Gennemsslidninger på lakken","rank":3}
{"index":{}}
{"content":"Manglende vedligeholdelse mod gennemslag","rank":2}
{"index":{}}
{"content":"Haløjsa","rank":2}
{"index":{}}
{"content":"Omlægning af cylinder og 3 nye nøgler","rank":2}
{"index":{}}
{"content":"Nedvask af loft efter nikotin","rank":2}
{"index":{}}
{"content":"Ridset og meget beskidt","rank":2}
{"index":{}}
{"content":"Fulddækkende malerbehandling","rank":4}
{"index":{}}
{"content":"Græs slåes","rank":2}
{"index":{}}
{"content":"Indbo bortskaffes","rank":2}
{"index":{}}
{"content":"Busk klippes","rank":2}
{"index":{}}
{"content":"Ukrudt imellem fliser fjernes","rank":2}
{"index":{}}
{"content":"Både i for og baghave","rank":2}
{"index":{}}
{"content":"Nikotinspære","rank":2}
{"index":{}}
{"content":"Udbedringen af skader","rank":14}
{"index":{}}
{"content":"Udskiftning af dørplader","rank":2}
{"index":{}}
{"content":"Mellemslibning og 1 gang lak","rank":2}
{"index":{}}
{"content":"Mellemslibning og 2 gange lak","rank":2}
{"index":{}}
{"content":"Fuld afslibning og 3 gange lak","rank":2}
{"index":{}}
{"content":"Hulle i bordplad /misfaver brændemærke","rank":6}
{"index":{}}
{"content":"Laminat ødelagt","rank":6}
{"index":{}}
{"content":"Fjern af lamper","rank":6}
{"index":{}}
{"content":"Fjern af ukrut på terrassen","rank":3}
{"index":{}}
{"content":"Inge lak på Skureliste","rank":6}
{"index":{}}
{"content":"3del hylde u/vask","rank":3}
{"index":{}}
{"content":"Malening på fejelister","rank":3}
{"index":{}}
{"content":"Flise ødelagt","rank":6}
{"index":{}}
{"content":"Nyt tapet","rank":7}
{"index":{}}
{"content":"Rygerlejlighed","rank":3}
{"index":{}}
{"content":"Skydedør afmonteres og køres til sprøjtemaler for at blive repareret og malet efter skrammer.\nBehandlingen omfatter: Afvaskning - slibning - spartling - slibning - grund - mellemmaling - lakering med RAL 9010 glans 30","rank":1}
{"index":{}}
{"content":"Mangler lak","rank":15}
{"index":{}}
{"content":"Dybe ridser som gennembryder lakken","rank":9}
{"index":{}}
{"content":"Fjern skruer rawplugs og spartel huller","rank":9}
{"index":{}}
{"content":"Fjern skruer og rawplugs","rank":6}
{"index":{}}
{"content":"Rengør terrasser og lug plantekasser","rank":3}
{"index":{}}
{"content":"Rengør afløbsrender på terrasser","rank":3}
{"index":{}}
{"content":"Rengør udsugning ventiler","rank":9}
{"index":{}}
{"content":"Gulv ikke vedligeholdt i lejeperioden","rank":3}
{"index":{}}
{"content":"Fejlagtig vedligeholdelse af det lejede","rank":6}
{"index":{}}
{"content":"Lak gennemslidt","rank":12}
{"index":{}}
{"content":"Dybe ridser gennem lak","rank":3}
{"index":{}}
{"content":"Fjern ukrudt mellem fliser og rens afløbsrander","rank":3}
{"index":{}}
{"content":"Rens afløbsrander","rank":3}
{"index":{}}
{"content":"Fjern møbler og tæpper","rank":6}
{"index":{}}
{"content":"Nikotin på vægge og lofter","rank":6}
{"index":{}}
{"content":"Fjern skruer og rawplugs og spartel huller","rank":3}
{"index":{}}
{"content":"Rengør køkkenskabe ind og udvendigt","rank":3}
{"index":{}}
{"content":"Fejlagtig brug","rank":6}
{"index":{}}
{"content":"Fejlagtig Vedligeholdelse vægmaling på træ-fodpaneler","rank":6}
{"index":{}}
{"content":"Afløbsrender ikke rengjorte på terrasse","rank":3}
{"index":{}}
{"content":"Gulve ikke vedligeholdt i lejeperioden","rank":3}
{"index":{}}
{"content":"Fjern skurer og rawlplugs","rank":3}
{"index":{}}
{"content":"Rep. Af huller efter gardiner / persienner","rank":3}
{"index":{}}
{"content":"Låse omstilling","rank":3}
{"index":{}}
{"content":"Lås omstilling ved manglende af nøgle","rank":3}
{"index":{}}
{"content":"Rummet tømmes og rengøres overalt","rank":1}
{"index":{}}
{"content":"Lak slidt igennem","rank":11}
{"index":{}}
{"content":"Hvid maling på de grå karme/indfatninger","rank":1}
{"index":{}}
{"content":"Fjern og bortkør opvaske maskine","rank":3}
{"index":{}}
{"content":"Ridser fra husdyr/møbler","rank":2}
{"index":{}}
{"content":"Klistermærker/farveforskel","rank":2}
{"index":{}}
{"content":"Rør kasse males","rank":2}
{"index":{}}
{"content":"Skrammet og gul af nikotin","rank":2}
{"index":{}}
{"content":"Film på vinduer","rank":2}
{"index":{}}
{"content":"Spejl rengøres","rank":2}
{"index":{}}
{"content":"Kun væggen ved eltavle skal tapetseres","rank":2}
{"index":{}}
{"content":"Løs maling og skal spartles efter plast tapet på væg","rank":2}
{"index":{}}
{"content":"Gule/brune af nikotin/tobakos","rank":3}
{"index":{}}
{"content":"Lakken slidt helt af flere steder","rank":3}
{"index":{}}
{"content":"Dybe ridser igennem lakken","rank":3}
{"index":{}}
{"content":"Rep. Og maling af rør","rank":2}
{"index":{}}
{"content":"Rensning af tæpper","rank":4}
{"index":{}}
{"content":"Lak slidt","rank":3}
{"index":{}}
{"content":"Køleskab -komfur -skab i værelse 1","rank":3}
{"index":{}}
{"content":"1stk. Nøgle mangler","rank":2}
{"index":{}}
{"content":"Gulvtæppetape på gulvet","rank":2}
{"index":{}}
{"content":"Ikke rengjort af fraflytter","rank":2}
{"index":{}}
{"content":"Gelænder til første sal. Rep/lak af huller/hakker","rank":2}
{"index":{}}
{"content":"Manglende rengøring i hele lejemålet","rank":3}
{"index":{}}
{"content":"Kalk på gulv og væg","rank":3}
{"index":{}}
{"content":"Nikotin gul","rank":2}
{"index":{}}
{"content":"Lille skuffe hakker i kant","rank":4}
{"index":{}}
{"content":"Mange slid mærker","rank":4}
{"index":{}}
{"content":"Malerpletter fjernes med skrabejern inden letslib","rank":2}
{"index":{}}
{"content":"Males pga. huller","rank":3}
{"index":{}}
{"content":"Males pga. Hul","rank":3}
{"index":{}}
{"content":"Pga. gennemslid og kraftige hakker","rank":3}
{"index":{}}
{"content":"Rengøring ikke foretaget","rank":3}
{"index":{}}
{"content":"Males pga. hakker og mærker","rank":3}
{"index":{}}
{"content":"Udskiftes da mangler","rank":3}
{"index":{}}
{"content":"Skift af vaskeskab inkl. VVS arbejde","rank":3}
{"index":{}}
{"content":"Skiftes pga. hul","rank":3}
{"index":{}}
{"content":"Males pga. huller efter gardiner","rank":6}
{"index":{}}
{"content":"Have ikke ordnet. Græs og hæk klippes samt oprydning","rank":3}
{"index":{}}
{"content":"Males pga. rød maling","rank":3}
{"index":{}}
{"content":"Skiftes da sparket så der er revne/flækket","rank":3}
{"index":{}}
{"content":"Kontakt udskiftes","rank":1}
{"index":{}}
{"content":"Ydervæg males med træværksmaling","rank":1}
{"index":{}}
{"content":"Ej udført","rank":6}
{"index":{}}
{"content":"Lugt af nikotin","rank":3}
{"index":{}}
{"content":"Grundet tæppetape","rank":3}
{"index":{}}
{"content":"Grundet huller","rank":6}
{"index":{}}
{"content":"Males grundet huller","rank":3}
{"index":{}}
{"content":"Males grundet ridser","rank":3}
{"index":{}}
{"content":"Pga. kraftige hakker","rank":3}
{"index":{}}
{"content":"Ikke gjort optimalt","rank":3}
{"index":{}}
{"content":"Pga. huller","rank":3}
{"index":{}}
{"content":"Ikke foretaget","rank":9}
{"index":{}}
{"content":"Pga. skader efter varm gryde eller pande","rank":3}
{"index":{}}
{"content":"Afmontering af opvaskemaskine","rank":3}
{"index":{}}
{"content":"Ikke fortaget","rank":3}
{"index":{}}
{"content":"Flethegn i haven ikke fjernet","rank":3}
{"index":{}}
{"content":"Pga. Gulvslib","rank":2}
{"index":{}}
{"content":"Er beskidt","rank":2}
{"index":{}}
{"content":"Afmontering af brusekabine samt vaskeskab incl ny håndvask","rank":3}
{"index":{}}
{"content":"Indbo fjernet","rank":8}
{"index":{}}
{"content":"Skift af vægfliser","rank":3}
{"index":{}}
{"content":"Lejemålet er ikke rengjort i flere år","rank":2}
{"index":{}}
{"content":"Vandskadet flere steder","rank":2}
{"index":{}}
{"content":"Håndværker ringer og laver en aftale","rank":3}
{"index":{}}
{"content":"Tømning af lejemål","rank":6}
{"index":{}}
{"content":"Manglende vedligeholdes","rank":3}
{"index":{}}
{"content":"Hovedrengøring og tømning","rank":3}
{"index":{}}
{"content":"Slib og 3 gange lak","rank":6}
{"index":{}}
{"content":"Bestilling af 3 stk skb 2696 - 66","rank":3}
{"index":{}}
{"content":"El tjek","rank":6}
{"index":{}}
{"content":"Gammel vandskade foran altandøre","rank":3}
{"index":{}}
{"content":"Gammel vandskade under radiator","rank":3}
{"index":{}}
{"content":"Mellemrum mellem bræder","rank":3}
{"index":{}}
{"content":"Hak i vask","rank":3}
{"index":{}}
{"content":"Ikke ryddet","rank":9}
{"index":{}}
{"content":"Flere dybe ridser","rank":3}
{"index":{}}
{"content":"Gennemslidning af laklag","rank":4}
{"index":{}}
{"content":"Manglende rengøring + hele rummet afkalkes","rank":3}
{"index":{}}
{"content":"Males med 1x spærregrunder","rank":3}
{"index":{}}
{"content":"Ridser efter kørestol","rank":3}
{"index":{}}
{"content":"Tapet afrenses spartles og males","rank":3}
{"index":{}}
{"content":"Dybe brændemærker flere steder","rank":3}
{"index":{}}
{"content":"Manglende ved fraflytning","rank":3}
{"index":{}}
{"content":"Afkalkning af hele rummet","rank":3}
{"index":{}}
{"content":"Gulv slibes og lakeres 3 gange","rank":3}
{"index":{}}
{"content":"Alm. Rengøring","rank":6}
{"index":{}}
{"content":"El Gennemgang skal på års rekvisition","rank":3}
{"index":{}}
{"content":"Bære præg af slidtage","rank":3}
{"index":{}}
{"content":"Snedker gennemgang skal på års rekvisition","rank":3}
{"index":{}}
{"content":"Flise gennemgang skal på års rekvisition","rank":3}
{"index":{}}
{"content":"Dør slibes og behandles","rank":1}
{"index":{}}
{"content":"Vaskskab","rank":1}
{"index":{}}
{"content":"Er ridset","rank":4}
{"index":{}}
{"content":"Løs tapet efter opsætning af tavle","rank":2}
{"index":{}}
{"content":"Fjerne beslag","rank":2}
{"index":{}}
{"content":"Fjerne tape væg","rank":2}
{"index":{}}
{"content":"Fjerne tape","rank":4}
{"index":{}}
{"content":"Slid","rank":4}
{"index":{}}
{"content":"Små huller","rank":2}
{"index":{}}
{"content":"10 skruehuller","rank":2}
{"index":{}}
{"content":"Små slid mærker","rank":2}
{"index":{}}
{"content":"Slidt igennem","rank":2}
{"index":{}}
{"content":"Polering","rank":2}
{"index":{}}
{"content":"Samt kantliste bordplade","rank":2}
{"index":{}}
{"content":"Slibe og spartel af 4 m2 væg","rank":2}
{"index":{}}
{"content":"Mangler 3 m panel","rank":2}
{"index":{}}
{"content":"Malet over","rank":2}
{"index":{}}
{"content":"Samt ramme og front på lampeudtag 50x50","rank":2}
{"index":{}}
{"content":"Rammer og tangenter stikkontaker og afbryder","rank":2}
{"index":{}}
{"content":"Samt liste ved bordplade","rank":2}
{"index":{}}
{"content":"T-stk. tæret k/v","rank":1}
{"index":{}}
{"content":"Voldsomt misfarvet af nikotin","rank":2}
{"index":{}}
{"content":"Omlægning af cylinder med 3 nøgler","rank":2}
{"index":{}}
{"content":"Males pga. Nikotin","rank":2}
{"index":{}}
{"content":"Gule pga. Nikotin","rank":2}
{"index":{}}
{"content":"Vand-/ og fugtskade","rank":1}
{"index":{}}
{"content":"Gennemslid af malinden","rank":2}
{"index":{}}
{"content":"Slidt maling af","rank":2}
{"index":{}}
{"content":"Rengøring imellem rillerne på radiatoren for støv og spindelvæv","rank":2}
{"index":{}}
{"content":"Væg mod entre tapeseres","rank":2}
{"index":{}}
{"content":"Væg i brusekabine afkalkes","rank":2}
{"index":{}}
{"content":"Cylinder fjernet af låsesmed","rank":4}
{"index":{}}
{"content":"Pga.Rygerlejlighed","rank":6}
{"index":{}}
{"content":"Pga. Rygerlejlighed","rank":3}
{"index":{}}
{"content":"Pga.Rygelejlighed","rank":3}
{"index":{}}
{"content":"Loftet er i pæn stand","rank":3}
{"index":{}}
{"content":"Let misfarvet","rank":2}
{"index":{}}
{"content":"Montering af eksisterende aluliste","rank":2}
{"index":{}}
{"content":"Ikke helt rengjort","rank":5}
{"index":{}}
{"content":"Kalk under","rank":2}
{"index":{}}
{"content":"Ikke poleret","rank":2}
{"index":{}}
{"content":"Maling af dørkarm","rank":3}
{"index":{}}
{"content":"Se indflytningsrapport/mangelliste","rank":3}
{"index":{}}
{"content":"Efter ophæng","rank":1}
{"index":{}}
{"content":"Filter snavset","rank":2}
{"index":{}}
{"content":"Kondensator snavset","rank":1}
{"index":{}}
{"content":"Isolering i teknikskabet repareres","rank":1}
{"index":{}}
{"content":"Vindueskarm istue har vandskade slib+lak samt huller i siderne","rank":3}
{"index":{}}
{"content":"Afresning af klister rester puder og tape i lejemålet","rank":3}
{"index":{}}
{"content":"Plade over køkken skab","rank":3}
{"index":{}}
{"content":"Plade bag komfur","rank":2}
{"index":{}}
{"content":"Afpropning af afløb og hane efter hårde hvidevare","rank":1}
{"index":{}}
{"content":"Total rengøring af lejemål da ej gjort","rank":6}
{"index":{}}
{"content":"Afmontering af lampe","rank":3}
{"index":{}}
{"content":"Hæk klippes samt trimmes","rank":3}
{"index":{}}
{"content":"Ej gjort","rank":9}
{"index":{}}
{"content":"Pga. kraftige ridser og gennemslid","rank":3}
{"index":{}}
{"content":"Maling af terrassedør pga. huller","rank":3}
{"index":{}}
{"content":"Dør repareres efter beslag","rank":1}
{"index":{}}
{"content":"Skruehuller efter rulle/gardin","rank":2}
{"index":{}}
{"content":"Ridset og hakker maling","rank":2}
{"index":{}}
{"content":"Nye trekandtslister på bundstykker","rank":2}
{"index":{}}
{"content":"Slidt igenne lak","rank":2}
{"index":{}}
{"content":"Hovedrengøring efter nikotin","rank":2}
{"index":{}}
{"content":"Tapet hæfter ikke længere på væggen","rank":2}
{"index":{}}
{"content":"Dybe ridser igennem lak","rank":2}
{"index":{}}
{"content":"Trekantlister ødelagt / sidder ikke ordenligt","rank":2}
{"index":{}}
{"content":"Epoxy og 3x lak med ding dong skal afprøves som i M A 29","rank":2}
{"index":{}}
{"content":"Let snavset","rank":3}
{"index":{}}
{"content":"Bundplade i højskab udskiftes","rank":2}
{"index":{}}
{"content":"Skimmelsanering","rank":3}
{"index":{}}
{"content":"Malet men ikke håndværksmæssigt korrekt","rank":6}
{"index":{}}
{"content":"Hak og ridser","rank":6}
{"index":{}}
{"content":"Vægge i stue er 25 m2","rank":1}
{"index":{}}
{"content":"Dør har fået fugt i bund","rank":3}
{"index":{}}
{"content":"Lampe i trappe hals pilles ned","rank":3}
{"index":{}}
{"content":"Hovedrengøring al hele rummet","rank":3}
{"index":{}}
{"content":"Beskidt og mangler afrimning af fryser","rank":3}
{"index":{}}
{"content":"Opsæt gipsloft","rank":3}
{"index":{}}
{"content":"Gulv og dørtrin slibes og lakeres","rank":3}
{"index":{}}
{"content":"Manglende vedligehold","rank":11}
{"index":{}}
{"content":"Rengøring efter håndværker har monteret nyt køkken","rank":3}
{"index":{}}
{"content":"Bortkørsel af affald","rank":3}
{"index":{}}
{"content":"Manglende afkalkning","rank":38}
{"index":{}}
{"content":"Manglene afkalkning","rank":3}
{"index":{}}
{"content":"Nikotin gult","rank":3}
{"index":{}}
{"content":"Nikotin gult og beskidt","rank":6}
{"index":{}}
{"content":"Kalket og beskidt","rank":3}
{"index":{}}
{"content":"Disk slib og lak","rank":3}
{"index":{}}
{"content":"Gennemslidning af lak","rank":6}
{"index":{}}
{"content":"Udskiftning af radiatorrist","rank":3}
{"index":{}}
{"content":"Gennemsliding af lak og dybe hakker","rank":3}
{"index":{}}
{"content":"Total rengøring af bolig","rank":3}
{"index":{}}
{"content":"Der er ikke tømt for inventar","rank":3}
{"index":{}}
{"content":"Ikke rengjort ved fraflytninh","rank":2}
{"index":{}}
{"content":"Rep. og maling af skydedør pga. huller","rank":3}
{"index":{}}
{"content":"Pga. gennemslid og kraftige ridser","rank":6}
{"index":{}}
{"content":"Rulleskab i køkken skadet af fugt da det er blevet brugt i badeværelset","rank":3}
{"index":{}}
{"content":"Ej rene","rank":2}
{"index":{}}
{"content":"Gulvet","rank":3}
{"index":{}}
{"content":"Gulvet har mindre ridser og mangler lak","rank":3}
{"index":{}}
{"content":"Lejemålet er ikke gjort rent efter flytning","rank":3}
{"index":{}}
{"content":"Grundet skidt og savns på vægge skal de have isospær maling","rank":3}
{"index":{}}
{"content":"Lejligheden skal rengøres","rank":2}
{"index":{}}
{"content":"Udskifting af cylinder til 6 stiftet på hoveddør sammen med postkasse. Der sidder i døren en gammel 5 stiftet","rank":3}
{"index":{}}
{"content":"Nedvaskes grundet rygning","rank":3}
{"index":{}}
{"content":"Tilkalkede","rank":6}
{"index":{}}
{"content":"Gulv gennemslidt i lak","rank":3}
{"index":{}}
{"content":"Overflader ikke rengjort","rank":3}
{"index":{}}
{"content":"Vinduespolering indvendig og udvendig ikke udført","rank":3}
{"index":{}}
{"content":"Hele rummet inkl. Sanitet og rør skal rengøres samt afkalkes","rank":3}
{"index":{}}
{"content":"Effekter ikke fjernet","rank":3}
{"index":{}}
{"content":"Rum ikke ryddet og fejet","rank":3}
{"index":{}}
{"content":"Vinyl/linolium behandles","rank":2}
{"index":{}}
{"content":"Forkant af dør","rank":2}
{"index":{}}
{"content":"Rengøring uden om komfur","rank":3}
{"index":{}}
{"content":"Rengøring i skuffe","rank":3}
{"index":{}}
{"content":"Vask gulvet","rank":6}
{"index":{}}
{"content":"Huller i siderne","rank":2}
{"index":{}}
{"content":"Ridser gået gennem lakken","rank":3}
{"index":{}}
{"content":"Lakken slidt af flere steder","rank":3}
{"index":{}}
{"content":"Rotex undervindue i stykker","rank":2}
{"index":{}}
{"content":"grøn nøgle væk","rank":2}
{"index":{}}
{"content":"Fliser revnet/knækket","rank":4}
{"index":{}}
{"content":"Filt- maling revnet af efter lister","rank":2}
{"index":{}}
{"content":"Hakker i låge","rank":4}
{"index":{}}
{"content":"Kalk på bordplade","rank":4}
{"index":{}}
{"content":"Opsæt rutex efter skade/ fugt","rank":2}
{"index":{}}
{"content":"Vinyl gulv misvedligeholdt/ødelagt","rank":2}
{"index":{}}
{"content":"Køkken ej rengjort","rank":2}
{"index":{}}
{"content":"Ramme om glasparti males","rank":2}
{"index":{}}
{"content":"Klinkegulv afkalkes","rank":2}
{"index":{}}
{"content":"Køkkenskuffen fremstilles","rank":2}
{"index":{}}
{"content":"Rengøring efter gulvslib","rank":9}
{"index":{}}
{"content":"Meget ridset i emalje","rank":1}
{"index":{}}
{"content":"Kun topbræt i inddækning","rank":1}
{"index":{}}
{"content":"Gulv skiftes pga. fugt skade prisen er incl. materialer","rank":4}
{"index":{}}
{"content":"Garderobe skabe og hatte mangler","rank":2}
{"index":{}}
{"content":"Gulv slibes pga. Mange ridser og mærker","rank":2}
{"index":{}}
{"content":"2 nøgler mangler","rank":2}
{"index":{}}
{"content":"Ekstra rengøring af hvide varer","rank":2}
{"index":{}}
{"content":"Vægfliser afkalkes","rank":2}
{"index":{}}
{"content":"Huller i dør","rank":5}
{"index":{}}
{"content":"Gulve væge","rank":3}
{"index":{}}
{"content":"Låsesystem skiftes","rank":3}
{"index":{}}
{"content":"Fraflytter ikke gjort ren","rank":66}
{"index":{}}
{"content":"Pga. gennemslid","rank":3}
{"index":{}}
{"content":"Bundplade ødelagt samt skab mangler ved kølesskab","rank":3}
{"index":{}}
{"content":"Rengøring af radiator","rank":6}
{"index":{}}
{"content":"Rengøring af blandingsbatteri i bruser og håndvask","rank":3}
{"index":{}}
{"content":"Afkalkning af blandingsbatteri","rank":10}
{"index":{}}
{"content":"Afkalkning af brusekabine","rank":3}
{"index":{}}
{"content":"Kontakt dækblade mangler","rank":1}
{"index":{}}
{"content":"Kælderrum tømmes for effekter","rank":1}
{"index":{}}
{"content":"Males på begge sider","rank":1}
{"index":{}}
{"content":"Side i højskab udskiftes","rank":1}
{"index":{}}
{"content":"Terassedør pletes","rank":2}
{"index":{}}
{"content":"Effekter i kælderrum fjernes","rank":1}
{"index":{}}
{"content":"Mærker fra hjælpemidler","rank":2}
{"index":{}}
{"content":"Afrimes","rank":2}
{"index":{}}
{"content":"Gammelt at se på","rank":2}
{"index":{}}
{"content":"Slidt lak","rank":2}
{"index":{}}
{"content":"Afpropning er vaskemaskine","rank":1}
{"index":{}}
{"content":"Dobbelt letslibning 2x lak","rank":2}
{"index":{}}
{"content":"Ødelagt Rutex skiftes","rank":2}
{"index":{}}
{"content":"Hoved dør males","rank":2}
{"index":{}}
{"content":"Ridser og mærker fra bla. seng","rank":2}
{"index":{}}
{"content":"Klisrmæer fjernes","rank":2}
{"index":{}}
{"content":"Inkl. inddækning og vinduesplade","rank":1}
{"index":{}}
{"content":"Kun indvendig side","rank":2}
{"index":{}}
{"content":"Afvaskes grudet snavs","rank":3}
{"index":{}}
{"content":"Afrenses grundet snavs","rank":3}
{"index":{}}
{"content":"Grudet mislighold","rank":3}
{"index":{}}
{"content":"Grundet slid og ælde","rank":3}
{"index":{}}
{"content":"Grudet gammelt og slidt","rank":3}
{"index":{}}
{"content":"Omlægning af postkasse + hoveddør + terrassedør","rank":3}
{"index":{}}
{"content":"Hovedrengøring efter håndværkere","rank":3}
{"index":{}}
{"content":"Grudet mange med fejl","rank":3}
{"index":{}}
{"content":"Grudet meget slidt","rank":3}
{"index":{}}
{"content":"Grundet meget slidt og tilkalket","rank":3}
{"index":{}}
{"content":"Nedtagning af ulovligt loft","rank":3}
{"index":{}}
{"content":"Udskiftes grundet revne fra top til bund","rank":3}
{"index":{}}
{"content":"Grundet snavs","rank":3}
{"index":{}}
{"content":"Afvaskes grundet snavs","rank":3}
{"index":{}}
{"content":"Grudet gammelt og nedslidt","rank":3}
{"index":{}}
{"content":"Nedtagning af gas rør","rank":3}
{"index":{}}
{"content":"Klargøring til ny installation","rank":3}
{"index":{}}
{"content":"Grundet slidte lister skal de skiftes","rank":3}
{"index":{}}
{"content":"Er udført af beb","rank":3}
{"index":{}}
{"content":"Knastgennemtrængning","rank":3}
{"index":{}}
{"content":"Alle dørtrin","rank":3}
{"index":{}}
{"content":"Gulvet mangler lak","rank":3}
{"index":{}}
{"content":"Maler pletter","rank":4}
{"index":{}}
{"content":"Sidder forkert","rank":2}
{"index":{}}
{"content":"Karme og gerigter rep. og males efter ridser og mærker","rank":2}
{"index":{}}
{"content":"Er ikke monteret","rank":2}
{"index":{}}
{"content":"Fodlister Rep. og males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Vindues plade Rep. og males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Gulvet lakeres da lakken er meget slidt og ridset","rank":2}
{"index":{}}
{"content":"Spindevæv","rank":2}
{"index":{}}
{"content":"Skabe ej rengjort","rank":2}
{"index":{}}
{"content":"Dørplader ej rengjort","rank":2}
{"index":{}}
{"content":"Loftlem Rep. og males","rank":2}
{"index":{}}
{"content":"Ikke rengjort optimalt","rank":3}
{"index":{}}
{"content":"Maling af hoveddør indv","rank":4}
{"index":{}}
{"content":"Er ikke vedligeholdt i bo perioden","rank":4}
{"index":{}}
{"content":"Gulvarbejde","rank":10}
{"index":{}}
{"content":"Skal vaskes pga. Gulvafslibning","rank":2}
{"index":{}}
{"content":"Opblødning af spartelhuller","rank":2}
{"index":{}}
{"content":"Maling af skabslåge","rank":2}
{"index":{}}
{"content":"Ekstra rengøring af badeværelse","rank":2}
{"index":{}}
{"content":"Kalket til eller ikke ren","rank":2}
{"index":{}}
{"content":"Tapet arbejde","rank":6}
{"index":{}}
{"content":"Døren er blindet uden tilladelse","rank":2}
{"index":{}}
{"content":"Maling af træværk","rank":2}
{"index":{}}
{"content":"Maling af rør","rank":2}
{"index":{}}
{"content":"Maling af radiator","rank":2}
{"index":{}}
{"content":"Gulv arbejde","rank":8}
{"index":{}}
{"content":"Let rengøring","rank":14}
{"index":{}}
{"content":"Renøgring af skuffer og skabe","rank":3}
{"index":{}}
{"content":"Manglenden rengøring","rank":3}
{"index":{}}
{"content":"Stikkontakter ikke rengjort","rank":2}
{"index":{}}
{"content":"Fuge ved fodlister","rank":2}
{"index":{}}
{"content":"Gulv rengøring","rank":3}
{"index":{}}
{"content":"Fjern køleskab og komfur","rank":3}
{"index":{}}
{"content":"Finer er ødelagt på lågen","rank":2}
{"index":{}}
{"content":"Lampeudtags dåse mangler","rank":1}
{"index":{}}
{"content":"Dæksel til lampeudtag mangler","rank":1}
{"index":{}}
{"content":"Vandnæse udskiftes","rank":1}
{"index":{}}
{"content":"Vask","rank":4}
{"index":{}}
{"content":"Bruseamatur udskiftes","rank":1}
{"index":{}}
{"content":"Ødelagt af fugt","rank":4}
{"index":{}}
{"content":"Lak slidt igenmen","rank":3}
{"index":{}}
{"content":"Kontakter og afbryde skiftes i stuen og entre","rank":2}
{"index":{}}
{"content":"Toilet kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Ikke tilstrækkelig rengjort vaskes af med sprit","rank":2}
{"index":{}}
{"content":"fuldslib 3 x lak","rank":3}
{"index":{}}
{"content":"Spartles og males på begge sider","rank":3}
{"index":{}}
{"content":"Maling skadet","rank":2}
{"index":{}}
{"content":"Ridser og hakker gulv","rank":2}
{"index":{}}
{"content":"Brandmærker på lenoliums gulv","rank":2}
{"index":{}}
{"content":"Gule misfarvninger på bordplade","rank":2}
{"index":{}}
{"content":"Greb knækket","rank":2}
{"index":{}}
{"content":"Fjerne opvaskemaskine","rank":11}
{"index":{}}
{"content":"Lampeskærme mangler","rank":2}
{"index":{}}
{"content":"Kontakter virker ikke ved køkkenbord","rank":2}
{"index":{}}
{"content":"Rengørning","rank":9}
{"index":{}}
{"content":"Rengørning. Og karm","rank":3}
{"index":{}}
{"content":"Hele køkken rengørs","rank":3}
{"index":{}}
{"content":"Tøm klæderrum","rank":6}
{"index":{}}
{"content":"Gennemgang af vinduer","rank":6}
{"index":{}}
{"content":"Rep efter kørestol","rank":1}
{"index":{}}
{"content":"Udsk som følge af kørestolsbrug","rank":1}
{"index":{}}
{"content":"Rengøring efter HV","rank":2}
{"index":{}}
{"content":"Små skrammer","rank":2}
{"index":{}}
{"content":"Hakker eller mærker i gulv","rank":2}
{"index":{}}
{"content":"Bemærk","rank":2}
{"index":{}}
{"content":"Gardinstænger rengøres for nicotin","rank":2}
{"index":{}}
{"content":"Gulv fuld slibes og lakeres på grund af ridser og skrammer","rank":9}
{"index":{}}
{"content":"Mangler afkalkning","rank":3}
{"index":{}}
{"content":"Hoved Rengøring af hele rummet","rank":3}
{"index":{}}
{"content":"Plet / rep af skruehuller","rank":2}
{"index":{}}
{"content":"Alle skabe og skuffer males udvendigt","rank":2}
{"index":{}}
{"content":"Reperation af tapet badeværelse","rank":2}
{"index":{}}
{"content":"Ikke pænt malet","rank":2}
{"index":{}}
{"content":"Malet ikke pænt og kun nogle steder","rank":2}
{"index":{}}
{"content":"Mærke slid mærker","rank":2}
{"index":{}}
{"content":"Samt brusehoved","rank":2}
{"index":{}}
{"content":"Fuld slib","rank":10}
{"index":{}}
{"content":"Kun inddækning","rank":1}
{"index":{}}
{"content":"Gulvet slibes og lakeres","rank":2}
{"index":{}}
{"content":"Nyt komfur monteres","rank":2}
{"index":{}}
{"content":"Dør skiftes","rank":2}
{"index":{}}
{"content":"Rep.og mal efter ridser og mærker","rank":2}
{"index":{}}
{"content":"Klister fra tape/klistermærker fjernes","rank":2}
{"index":{}}
{"content":"Dørtrin slibes og lakeres pga. mange ridser og mærker","rank":2}
{"index":{}}
{"content":"Dækblade på halv mur slibes og lakeres","rank":2}
{"index":{}}
{"content":"Døre gennemgås samt håndtag udskiftes","rank":1}
{"index":{}}
{"content":"Hak i dør","rank":2}
{"index":{}}
{"content":"Ødelagt og mangler sokkel og ben","rank":2}
{"index":{}}
{"content":"Hak i låge","rank":2}
{"index":{}}
{"content":"Så meget misligholdt og vandskadet","rank":2}
{"index":{}}
{"content":"Pga udskiftning af køkkenbordsplade","rank":2}
{"index":{}}
{"content":"Koordinerer  med tømrer magdahl tlf 4013 7036","rank":2}
{"index":{}}
{"content":"Pga bordplade skal skiftes","rank":2}
{"index":{}}
{"content":"Høre ikke til i lejemålet","rank":2}
{"index":{}}
{"content":"Er meget beskidt og Brandt fast","rank":2}
{"index":{}}
{"content":"Er blevet vandskadet","rank":2}
{"index":{}}
{"content":"Radiator plet Rep","rank":2}
{"index":{}}
{"content":"Demontage/ montage af sandlister","rank":2}
{"index":{}}
{"content":"Demontage/montage af sandlister","rank":4}
{"index":{}}
{"content":"Filt i loft + isospær","rank":3}
{"index":{}}
{"content":"Gulve rengøres","rank":1}
{"index":{}}
{"content":"Mark på væg","rank":3}
{"index":{}}
{"content":"Køleskab skiftes","rank":4}
{"index":{}}
{"content":"Lejer og driften 50 %til hver","rank":2}
{"index":{}}
{"content":"Ikke udført optimalt","rank":3}
{"index":{}}
{"content":"Mangler pudsning","rank":6}
{"index":{}}
{"content":"Beskidt og ridser","rank":2}
{"index":{}}
{"content":"Til kalket","rank":13}
{"index":{}}
{"content":"Sorte mærker","rank":4}
{"index":{}}
{"content":"Brandt fast","rank":2}
{"index":{}}
{"content":"Nyt knophåndtag under vask. Samt knop over vask udskiftes","rank":1}
{"index":{}}
{"content":"Let total rengøring","rank":22}
{"index":{}}
{"content":"Termostat batteri. Akalkes","rank":2}
{"index":{}}
{"content":"Fejelister monteres","rank":2}
{"index":{}}
{"content":"Ridser dør badeværelse","rank":2}
{"index":{}}
{"content":"Fjern komfur + afprop","rank":3}
{"index":{}}
{"content":"Lejer og driften betale 50/50 på tæppe i stuen","rank":2}
{"index":{}}
{"content":"Rep.og mall efter gardiner","rank":2}
{"index":{}}
{"content":"Nedvask loft og spærre på loft","rank":3}
{"index":{}}
{"content":"Nedvaskning af lofter og vægge efter nikotin","rank":3}
{"index":{}}
{"content":"Der mangler lak på gulvet","rank":3}
{"index":{}}
{"content":"Repation af trappevangr efter hundebid","rank":3}
{"index":{}}
{"content":"Reparation af trappevange efter hundebid","rank":3}
{"index":{}}
{"content":"Reparation af vindueskarm efter hundebid","rank":3}
{"index":{}}
{"content":"Nedtagning af køkken","rank":3}
{"index":{}}
{"content":"Nedtagning af tapet og opsætning af rutex på 1 væg ud mod gård","rank":3}
{"index":{}}
{"content":"Rydning af skur og bortkørsel af affald","rank":3}
{"index":{}}
{"content":"Hovedrengøring og afkalkning af wc","rank":3}
{"index":{}}
{"content":"Nedvask vægge og spærrene på vægge","rank":3}
{"index":{}}
{"content":"Nedvask vægge og spærrende på vægge","rank":3}
{"index":{}}
{"content":"Skrue huller","rank":7}
{"index":{}}
{"content":"Revne i væg Rep. og rutex opsættes efterfølgende","rank":2}
{"index":{}}
{"content":"Ridser / hakker i maling","rank":2}
{"index":{}}
{"content":"Omlægning af lås og 3 nye nøgler","rank":2}
{"index":{}}
{"content":"Udskiftning af ca. 2m2 gulv på grund af vandskade ved vask","rank":3}
{"index":{}}
{"content":"Gamle køkken elementer udlagt på grund af fugt","rank":3}
{"index":{}}
{"content":"Udskiftning af stikkontakter og panel underlag på grund af de kan ikke gøres rene","rank":3}
{"index":{}}
{"content":"Udskiftning af de smalle stikkontaker og afbruder på grund af de kan ikke gøres rene","rank":3}
{"index":{}}
{"content":"Udskiftning af meget beskidt køkkenvask med en ny","rank":3}
{"index":{}}
{"content":"udskiftning af meget beskidte radiatorventiler med nye","rank":3}
{"index":{}}
{"content":"Udluftnings hætte","rank":2}
{"index":{}}
{"content":"Stikkontakter og lampeudtag ikke rengjort","rank":2}
{"index":{}}
{"content":"Males 2 gange","rank":12}
{"index":{}}
{"content":"Der er kalk på","rank":2}
{"index":{}}
{"content":"Afvaskes inden maler","rank":2}
{"index":{}}
{"content":"Ødelagt dør","rank":2}
{"index":{}}
{"content":"Div. El efter udskiftning af hoveddør kontakt i indfatning mm","rank":2}
{"index":{}}
{"content":"El i mellemdør demonteres og monteres","rank":2}
{"index":{}}
{"content":"Afrens/afvask for nikotin","rank":3}
{"index":{}}
{"content":"Afvask +maling. Meget nikotin","rank":3}
{"index":{}}
{"content":"Afvask + maling. Meget nikotin","rank":3}
{"index":{}}
{"content":"Gulv slibes + 3 gange lak","rank":3}
{"index":{}}
{"content":"Slib +lak","rank":3}
{"index":{}}
{"content":"Generelt hele boligen rengøres","rank":3}
{"index":{}}
{"content":"Udskift wc","rank":3}
{"index":{}}
{"content":"Der er kraftige ridser og hakker","rank":3}
{"index":{}}
{"content":"Huller i væg","rank":3}
{"index":{}}
{"content":"Store mærker og hakker","rank":2}
{"index":{}}
{"content":"Spærrende behandling efter nikotin","rank":3}
{"index":{}}
{"content":"Hele rummet hovedrengøres","rank":3}
{"index":{}}
{"content":"Malerstænk af vægmaling","rank":1}
{"index":{}}
{"content":"Flytteskab og samle sokkel","rank":2}
{"index":{}}
{"content":"Ridser i låge","rank":2}
{"index":{}}
{"content":"Revnet filt af 2 steder","rank":2}
{"index":{}}
{"content":"Hakker og ridser","rank":17}
{"index":{}}
{"content":"Opblødning af spartel ved huller påvæg","rank":2}
{"index":{}}
{"content":"Mangler 1 nøgle","rank":7}
{"index":{}}
{"content":"Kontakt overmalet","rank":1}
{"index":{}}
{"content":"Bordplade udskiftes","rank":1}
{"index":{}}
{"content":"Bordplade forhøjes","rank":1}
{"index":{}}
{"content":"efter bordplade er udskiftet","rank":1}
{"index":{}}
{"content":"Vindueslister udskiftes (hvide","rank":1}
{"index":{}}
{"content":"Køkken rum rengøres","rank":1}
{"index":{}}
{"content":"Samt fejeliste","rank":1}
{"index":{}}
{"content":"1 gang ekstra gang lak","rank":1}
{"index":{}}
{"content":"Loftrum tømmes og fejes","rank":1}
{"index":{}}
{"content":"Dørtrin udsfiftes/monteres","rank":1}
{"index":{}}
{"content":"Kontakt","rank":1}
{"index":{}}
{"content":"Afpropning mangler jf. gældende lovgivning","rank":1}
{"index":{}}
{"content":"Reparation af tapet","rank":9}
{"index":{}}
{"content":"Males med bio rid eller silikat maling","rank":1}
{"index":{}}
{"content":"Fugtskadet ved bad","rank":1}
{"index":{}}
{"content":"Beskyttelsesbund monteres i højskab","rank":1}
{"index":{}}
{"content":"Maler arb","rank":2}
{"index":{}}
{"content":"Brændmærke","rank":4}
{"index":{}}
{"content":"Vaskenøgle mangler","rank":2}
{"index":{}}
{"content":"Rep efter rollatorbrug","rank":2}
{"index":{}}
{"content":"Håndvask","rank":2}
{"index":{}}
{"content":"Rengøring ikke udført","rank":6}
{"index":{}}
{"content":"Ekstra rengøring","rank":3}
{"index":{}}
{"content":"Malerarbejde","rank":4}
{"index":{}}
{"content":"S 1000 N","rank":14}
{"index":{}}
{"content":"Ved køkkenskift","rank":4}
{"index":{}}
{"content":"Rengøring ved køkkenskift","rank":8}
{"index":{}}
{"content":"Nicotin kan ikke vaskes af","rank":2}
{"index":{}}
{"content":"Nye tæpper","rank":2}
{"index":{}}
{"content":"Gulv mangler til polish","rank":2}
{"index":{}}
{"content":"Nyt køkken","rank":12}
{"index":{}}
{"content":"Af og påmontering","rank":3}
{"index":{}}
{"content":"El eftersyn","rank":3}
{"index":{}}
{"content":"Afprop af gas","rank":3}
{"index":{}}
{"content":"Opsætning af ny dør","rank":3}
{"index":{}}
{"content":"Lak slidt i gennem","rank":3}
{"index":{}}
{"content":"Rengøring og pudse vinduer","rank":3}
{"index":{}}
{"content":"Fjerne komfur","rank":3}
{"index":{}}
{"content":"Traffic lak 2 koponent","rank":1}
{"index":{}}
{"content":"Gerekt udskiftes","rank":1}
{"index":{}}
{"content":"Maling afrenses og loft nedvaskes inden filt opsættes","rank":1}
{"index":{}}
{"content":"Incl. Rammer","rank":2}
{"index":{}}
{"content":"Omlægning af systemlås","rank":2}
{"index":{}}
{"content":"Døren skal være monteret i lejligheden","rank":2}
{"index":{}}
{"content":"Underside håndvask","rank":2}
{"index":{}}
{"content":"Rep. og plet dører","rank":2}
{"index":{}}
{"content":"Meget snavset og gult","rank":3}
{"index":{}}
{"content":"Ridser i gulv","rank":12}
{"index":{}}
{"content":"Meget nedslidt lak mangler flere steder","rank":3}
{"index":{}}
{"content":"Meget snavset og tilkalket","rank":3}
{"index":{}}
{"content":"Meget nedslidt","rank":3}
{"index":{}}
{"content":"Hakker / mærker","rank":4}
{"index":{}}
{"content":"Underside af skuffer","rank":2}
{"index":{}}
{"content":"Radiator males","rank":5}
{"index":{}}
{"content":"Betongulv males","rank":2}
{"index":{}}
{"content":"Dørkarme males pga. ridser og mærker","rank":8}
{"index":{}}
{"content":"Vægrep. Efter aftale","rank":2}
{"index":{}}
{"content":"Væg Rep. Efter aftale","rank":2}
{"index":{}}
{"content":"Vaske skab låge rep beslag","rank":3}
{"index":{}}
{"content":"Loftroset mangler låg","rank":3}
{"index":{}}
{"content":"Gulvafslibning","rank":3}
{"index":{}}
{"content":"Loftet males udenom normal istandsættelse","rank":2}
{"index":{}}
{"content":"Skabslåge males for ridser fra hjælpemidler","rank":2}
{"index":{}}
{"content":"Karm og dør skiftes","rank":2}
{"index":{}}
{"content":"Dørplade skiftes","rank":4}
{"index":{}}
{"content":"Dørkarm spartles op","rank":2}
{"index":{}}
{"content":"Tæpper fjernes og gulv renses","rank":2}
{"index":{}}
{"content":"Udskiftning af vinylgulv i  badværelse","rank":2}
{"index":{}}
{"content":"Misligholdelse","rank":6}
{"index":{}}
{"content":"Kantliste fjernes og der spartles","rank":2}
{"index":{}}
{"content":"Hakker samt skader efter påvirkning af lukket dør forsøgt presset ind","rank":2}
{"index":{}}
{"content":"Ikke karme men det stykke imellem","rank":2}
{"index":{}}
{"content":"Samme farve som den nye dør til stuen","rank":2}
{"index":{}}
{"content":"Revner rep. og ny rutex opsættes","rank":2}
{"index":{}}
{"content":"Fremstår næsten uden mærker","rank":2}
{"index":{}}
{"content":"Lette aflejninger af kalk","rank":1}
{"index":{}}
{"content":"Total rengøring af køkken","rank":4}
{"index":{}}
{"content":"Total rengøring af badeværelse","rank":4}
{"index":{}}
{"content":"Skabslåge ødelagt","rank":2}
{"index":{}}
{"content":"Karm flækket","rank":2}
{"index":{}}
{"content":"Dørkarm flækket","rank":2}
{"index":{}}
{"content":"Spærring","rank":1}
{"index":{}}
{"content":"Misligeholdt","rank":10}
{"index":{}}
{"content":"Tror de hedder fodspark","rank":2}
{"index":{}}
{"content":"af og påmontering af badeværlse","rank":2}
{"index":{}}
{"content":"Nyt glas","rank":3}
{"index":{}}
{"content":"Rep fliser ved stikkontakt","rank":3}
{"index":{}}
{"content":"Fugt væg","rank":6}
{"index":{}}
{"content":"Lysning tapet væk","rank":3}
{"index":{}}
{"content":"Hovderengøring","rank":3}
{"index":{}}
{"content":"Manglen rengøring af stue","rank":2}
{"index":{}}
{"content":"Tape fra gulvtæppe","rank":2}
{"index":{}}
{"content":"Males efter rollatorbrug","rank":2}
{"index":{}}
{"content":"Gennemslid og skader","rank":4}
{"index":{}}
{"content":"Hele køkkenet skiftes","rank":2}
{"index":{}}
{"content":"Ekstra kørsel som følge af nødvendig rengøring inden håndværkere","rank":1}
{"index":{}}
{"content":"hakker","rank":3}
{"index":{}}
{"content":"13 stk. Trappetrin fuld slib og 3 x lak","rank":2}
{"index":{}}
{"content":"De er pt. Malet hvide","rank":2}
{"index":{}}
{"content":"Rep og males efter kørestolsbrug","rank":1}
{"index":{}}
{"content":"Rengøring nødvendig før håndværkere","rank":2}
{"index":{}}
{"content":"Kun væg ved dør","rank":2}
{"index":{}}
{"content":"Kan ikke se gulvet grundet tæppe","rank":2}
{"index":{}}
{"content":"Hakker/huller","rank":2}
{"index":{}}
{"content":"Udskift til en ny dør fra lager","rank":3}
{"index":{}}
{"content":"Måtte gå ind med låsesmed","rank":3}
{"index":{}}
{"content":"Låsesmed lave nye nøgler","rank":3}
{"index":{}}
{"content":"Ny låsekasse + nøgler","rank":3}
{"index":{}}
{"content":"2.stk nye briker","rank":3}
{"index":{}}
{"content":"Og ny lås","rank":3}
{"index":{}}
{"content":"Genmen gå og lave","rank":3}
{"index":{}}
{"content":"Nyt dørtrin","rank":6}
{"index":{}}
{"content":"Kold og varm hane gen monters","rank":3}
{"index":{}}
{"content":"Fejnelse af gulvtæppe","rank":3}
{"index":{}}
{"content":"Gennemgang af vindue","rank":3}
{"index":{}}
{"content":"Fjenelse af gulvtæppe","rank":3}
{"index":{}}
{"content":"Der er gulvtæppe rester tilbage på gulv","rank":3}
{"index":{}}
{"content":"Ødlagt pågund vand","rank":3}
{"index":{}}
{"content":"Tømning affald","rank":3}
{"index":{}}
{"content":"fjenelse af effekter og genstande og bortkøres","rank":3}
{"index":{}}
{"content":"Der er ridser i gulv","rank":3}
{"index":{}}
{"content":"Fjenelse af kokfliser på trin","rank":3}
{"index":{}}
{"content":"Klippe hæk","rank":3}
{"index":{}}
{"content":"Og nedtagning af over skab","rank":3}
{"index":{}}
{"content":"Opsat fototapet på væg ved døren","rank":2}
{"index":{}}
{"content":"Total rengøring af entre","rank":2}
{"index":{}}
{"content":"Total rengøring af stue","rank":2}
{"index":{}}
{"content":"Rengøring af altan","rank":2}
{"index":{}}
{"content":"Maling på termostathoved","rank":2}
{"index":{}}
{"content":"Gammelt brugt wc med kalk render","rank":1}
{"index":{}}
{"content":"Ikke udført","rank":18}
{"index":{}}
{"content":"Dør mangler maling ind til køkken","rank":3}
{"index":{}}
{"content":"Køkkenskab mangler","rank":3}
{"index":{}}
{"content":"Fugt","rank":3}
{"index":{}}
{"content":"Male rep. i soveværelse","rank":2}
{"index":{}}
{"content":"Lukke fejl ved sidste istandsættelse med våd maling","rank":1}
{"index":{}}
{"content":"Gulvtæppe ligget der i mange år","rank":2}
{"index":{}}
{"content":"Gulvtæppe/aluliste fjernes","rank":2}
{"index":{}}
{"content":"Slidt igennem nogle steder","rank":2}
{"index":{}}
{"content":"Ekstra som følge af rengøring før håndværker","rank":1}
{"index":{}}
{"content":"Maskinslibning af alt træværk i boligen. Mislighold","rank":2}
{"index":{}}
{"content":"Aldrig pudset","rank":2}
{"index":{}}
{"content":"Billigere end malerbehandling","rank":2}
{"index":{}}
{"content":"Hakkede","rank":2}
{"index":{}}
{"content":"Skab mangler","rank":3}
{"index":{}}
{"content":"Loft helt gul af nikotin","rank":3}
{"index":{}}
{"content":"Træværk er helt gult og fedtet","rank":3}
{"index":{}}
{"content":"Hørte ikke til i lejemålet","rank":2}
{"index":{}}
{"content":"Mangler i lejemålet","rank":2}
{"index":{}}
{"content":"Rummet rengøres overalt","rank":1}
{"index":{}}
{"content":"Der snavset og klistret","rank":2}
{"index":{}}
{"content":"Resterende gulv skiftes af afdelingen","rank":4}
{"index":{}}
{"content":"Generel rengøring af hele lejemål","rank":3}
{"index":{}}
{"content":"Demonter vinyl og afrens gulvtæppe tape","rank":2}
{"index":{}}
{"content":"Vinduesplade mangler","rank":1}
{"index":{}}
{"content":"Køkkenelementer eftergås","rank":1}
{"index":{}}
{"content":"Ridser og hakker igennem lak","rank":2}
{"index":{}}
{"content":"Ruder pudses","rank":1}
{"index":{}}
{"content":"Pga.ridser/skrammer","rank":2}
{"index":{}}
{"content":"Normal vedl","rank":2}
{"index":{}}
{"content":"Dørplade i hvid","rank":2}
{"index":{}}
{"content":"Mangler loftrosette","rank":1}
{"index":{}}
{"content":"Pga malerarbejde på døren","rank":2}
{"index":{}}
{"content":"Døren er ikke blevet vedligeholdt i boperioden","rank":2}
{"index":{}}
{"content":"Er vandskades","rank":2}
{"index":{}}
{"content":"Pga at afkalkning har siddet for længe","rank":2}
{"index":{}}
{"content":"Tapet kantslibes enkelte steder","rank":1}
{"index":{}}
{"content":"Malet delvis","rank":1}
{"index":{}}
{"content":"Tapet udskiftes","rank":1}
{"index":{}}
{"content":"Kun mellem låge og glas i låge","rank":1}
{"index":{}}
{"content":"Males pga. ridser/mærker","rank":1}
{"index":{}}
{"content":"ridser","rank":2}
{"index":{}}
{"content":"Tapet arbejde ved køkken","rank":2}
{"index":{}}
{"content":"Ej rengjordt","rank":2}
{"index":{}}
{"content":"Misfarvede","rank":2}
{"index":{}}
{"content":"Dørplader males pga. mærker og ridser","rank":2}
{"index":{}}
{"content":"Manglen rengøring af ovnplade og rist","rank":2}
{"index":{}}
{"content":"lejligheden skal rengøres inden håndværker","rank":2}
{"index":{}}
{"content":"Lejeren har afmonteret dørpumpe","rank":2}
{"index":{}}
{"content":"da det mangler en nøgler til lejligheden","rank":2}
{"index":{}}
{"content":"Mod entre","rank":2}
{"index":{}}
{"content":"Rep efter skruehuller","rank":4}
{"index":{}}
{"content":"Rep af sømhuller","rank":2}
{"index":{}}
{"content":"Demontering af skab og lukning af skruehuller","rank":3}
{"index":{}}
{"content":"Kradsemærker","rank":3}
{"index":{}}
{"content":"Afskrabning på kant","rank":3}
{"index":{}}
{"content":"Gennemslidt lak foran vask","rank":3}
{"index":{}}
{"content":"Demontering af lys i loft","rank":3}
{"index":{}}
{"content":"Demontering af antennekabel til soveværelse","rank":3}
{"index":{}}
{"content":"Anden beboer har sat lås på og sat malerbøtter ind","rank":3}
{"index":{}}
{"content":"Ny bestykning af hoveddøør","rank":3}
{"index":{}}
{"content":"Fastmontering af kontakt ved køkken","rank":3}
{"index":{}}
{"content":"Tjek for ulovligheder","rank":3}
{"index":{}}
{"content":"Rep. hvis muligt ellers udskift dør til garderobeskab","rank":3}
{"index":{}}
{"content":"Samt afkalkning","rank":6}
{"index":{}}
{"content":"Udskiftning af wc bræt","rank":3}
{"index":{}}
{"content":"6 stk. Ved dør samt 1 ved badekar","rank":3}
{"index":{}}
{"content":"Dørkarm Fuge afrenses samt på fliser","rank":3}
{"index":{}}
{"content":"Nikotin og skimmel","rank":3}
{"index":{}}
{"content":"Udskiftning af fuge ved badekar","rank":3}
{"index":{}}
{"content":"Meget slidt","rank":3}
{"index":{}}
{"content":"Og ikke monteret prof","rank":3}
{"index":{}}
{"content":"Maling afskalning ved dørgreb","rank":3}
{"index":{}}
{"content":"Gasmåler mangler","rank":10}
{"index":{}}
{"content":"Vaskeskabslåge ødelagt på forkant","rank":3}
{"index":{}}
{"content":"Skabslåge th. for vask mangler","rank":3}
{"index":{}}
{"content":"Udskiftning af dørgreb","rank":3}
{"index":{}}
{"content":"Maling på elkontakter og antennestik","rank":2}
{"index":{}}
{"content":"Ovngreb mangler","rank":3}
{"index":{}}
{"content":"Mange afskalninger diverse steder","rank":3}
{"index":{}}
{"content":"Demontering af foldedør","rank":3}
{"index":{}}
{"content":"Tegninger på væg dækkes","rank":3}
{"index":{}}
{"content":"Afskallet maling","rank":3}
{"index":{}}
{"content":"Maling af altangulv og vætn","rank":3}
{"index":{}}
{"content":"Rep. eller udskiftning af kontakter tv. for vindue","rank":3}
{"index":{}}
{"content":"Dørtelefon mangler","rank":3}
{"index":{}}
{"content":"Fjernelse af komfur","rank":6}
{"index":{}}
{"content":"Ovn","rank":2}
{"index":{}}
{"content":"Kogezone","rank":2}
{"index":{}}
{"content":"Køkken","rank":33}
{"index":{}}
{"content":"Udskiftning hvis maler ikke kan rep. hoveddør","rank":3}
{"index":{}}
{"content":"Rengøring af alle kontakter og loftrosetter","rank":3}
{"index":{}}
{"content":"Stativ til skraldespand er defekt","rank":3}
{"index":{}}
{"content":"Meget fedtet","rank":2}
{"index":{}}
{"content":"Håndtag er knækket","rank":2}
{"index":{}}
{"content":"Der er ikke rengjort i lejemålet","rank":3}
{"index":{}}
{"content":"Afmontering af gardiner samt montering af døre","rank":3}
{"index":{}}
{"content":"Afmontering af ledning samt bortskaffelse af komfur","rank":3}
{"index":{}}
{"content":"Oliering af bundstykke ved hoveddør + olie på sålbænk","rank":2}
{"index":{}}
{"content":"Pudses udv","rank":2}
{"index":{}}
{"content":"Ledninger i loftroset","rank":3}
{"index":{}}
{"content":"Loftroset mangler","rank":3}
{"index":{}}
{"content":"Forbehold for mislighold under tæpper","rank":3}
{"index":{}}
{"content":"Måler defekt","rank":6}
{"index":{}}
{"content":"Træværk og dør skrammet","rank":3}
{"index":{}}
{"content":"Malingsafslag","rank":3}
{"index":{}}
{"content":"Hakker i gulv flere steder samt opfugtede sammenstødninger","rank":3}
{"index":{}}
{"content":"Normalistandsætteles","rank":3}
{"index":{}}
{"content":"Normalistandsættelse","rank":3}
{"index":{}}
{"content":"Bortskaffelse af rullegardiner","rank":3}
{"index":{}}
{"content":"Udskiftes kun hvis ikke kan rep","rank":3}
{"index":{}}
{"content":"Skabslåger påkørt i bunden","rank":3}
{"index":{}}
{"content":"Spartles til klat til maling","rank":3}
{"index":{}}
{"content":"Blåt træværk","rank":2}
{"index":{}}
{"content":"Total rengøring","rank":38}
{"index":{}}
{"content":"Te køkken","rank":2}
{"index":{}}
{"content":"Skabe","rank":2}
{"index":{}}
{"content":"Prutventil aftørres","rank":2}
{"index":{}}
{"content":"Gennemslidt lak ved terrassedør","rank":3}
{"index":{}}
{"content":"Knivhak ved vask på forkant to steder","rank":3}
{"index":{}}
{"content":"Fodpaneler i køkken og entre","rank":3}
{"index":{}}
{"content":"Værelse 1. th fodpaneler skrammet","rank":3}
{"index":{}}
{"content":"Farverester flere steder på gulv","rank":3}
{"index":{}}
{"content":"NI beløb kunne indskrives de korekte sted derfor denne note 6.050","rank":3}
{"index":{}}
{"content":"1 spærregrund","rank":2}
{"index":{}}
{"content":"Afskalninger mange steder","rank":3}
{"index":{}}
{"content":"Hul i bordplade","rank":3}
{"index":{}}
{"content":"Udskiftes hvis ikke kan rep","rank":6}
{"index":{}}
{"content":"Afskalninger","rank":6}
{"index":{}}
{"content":"Maling ikke vedligeholdt","rank":3}
{"index":{}}
{"content":"Skimmel sernæring af","rank":3}
{"index":{}}
{"content":"Fjernes i forbindelse med skimmelrenovering","rank":3}
{"index":{}}
{"content":"Afrensning af malerpletter","rank":3}
{"index":{}}
{"content":"Alt træværk gennemgås","rank":3}
{"index":{}}
{"content":"Finner afrevet","rank":3}
{"index":{}}
{"content":"Samt","rank":3}
{"index":{}}
{"content":"Øselagt","rank":3}
{"index":{}}
{"content":"Tæret og mangler maling","rank":3}
{"index":{}}
{"content":"Sætningsrevner","rank":8}
{"index":{}}
{"content":"Skimmelsernæres","rank":3}
{"index":{}}
{"content":"Meget kalk","rank":10}
{"index":{}}
{"content":"Spejlskab og hylder","rank":3}
{"index":{}}
{"content":"Skabslåge","rank":3}
{"index":{}}
{"content":"Efter selvforskyldt vandskade","rank":3}
{"index":{}}
{"content":"Hvis ikke kan rengøres","rank":3}
{"index":{}}
{"content":"Udskiftning","rank":3}
{"index":{}}
{"content":"Hvis ikke kan rep/rengøres","rank":3}
{"index":{}}
{"content":"Udskiftes hvid ikke kan slibes","rank":3}
{"index":{}}
{"content":"Alle kontakter","rank":3}
{"index":{}}
{"content":"Under kanap","rank":3}
{"index":{}}
{"content":"I kanap","rank":3}
{"index":{}}
{"content":"Tæpperester","rank":9}
{"index":{}}
{"content":"Lampe","rank":3}
{"index":{}}
{"content":"Males hvis ikke kan tengøres","rank":3}
{"index":{}}
{"content":"Epoxy ødelagt","rank":3}
{"index":{}}
{"content":"Smæklås sefekt","rank":3}
{"index":{}}
{"content":"Misligehold","rank":10}
{"index":{}}
{"content":"Afdelingen","rank":4}
{"index":{}}
{"content":"Møg beskidt","rank":3}
{"index":{}}
{"content":"Ikke rengjort og tømt ved fraflytning","rank":3}
{"index":{}}
{"content":"Mange ridser","rank":5}
{"index":{}}
{"content":"Bobestyer har ikke afleveret nøgler og opgangs brikker","rank":3}
{"index":{}}
{"content":"Tømning af lejemål for efterladte efter","rank":3}
{"index":{}}
{"content":"Også i køkken og gangen","rank":4}
{"index":{}}
{"content":"Ridser og mærker og huller","rank":2}
{"index":{}}
{"content":"Fjerne komfur og køleskab","rank":3}
{"index":{}}
{"content":"Manglede rengøring","rank":11}
{"index":{}}
{"content":"Males en gang","rank":3}
{"index":{}}
{"content":"Ridser flere steder","rank":3}
{"index":{}}
{"content":"Hakker i bunden","rank":3}
{"index":{}}
{"content":"Dørkarm skræmmet ude og inde","rank":3}
{"index":{}}
{"content":"Ledningsholdere fjernes på paneler","rank":3}
{"index":{}}
{"content":"Paneler påkørt","rank":3}
{"index":{}}
{"content":"Lang ridse","rank":3}
{"index":{}}
{"content":"Bordplader rengøres for madolie","rank":2}
{"index":{}}
{"content":"Mærker i gulvet","rank":5}
{"index":{}}
{"content":"Afkalkning af toilet","rank":2}
{"index":{}}
{"content":"Huller i skabsside","rank":3}
{"index":{}}
{"content":"Hakker i fodpanel tv for hoveddør","rank":3}
{"index":{}}
{"content":"Gennemslidt lak/olie","rank":3}
{"index":{}}
{"content":"Olieres eller lakkeres","rank":3}
{"index":{}}
{"content":"2 døre mangler","rank":3}
{"index":{}}
{"content":"Hvid defekte skal de erstattes","rank":3}
{"index":{}}
{"content":"Ej rent","rank":2}
{"index":{}}
{"content":"Pga fuld afslibning af gulve","rank":2}
{"index":{}}
{"content":"Pga fuldslibning","rank":2}
{"index":{}}
{"content":"Ej vedligeholdt i bo perioden","rank":12}
{"index":{}}
{"content":"Farverester","rank":2}
{"index":{}}
{"content":"Skimmel efter vandskade","rank":3}
{"index":{}}
{"content":"Når strømudtag bruges slår al strømmen fra","rank":3}
{"index":{}}
{"content":"Hul i lak","rank":3}
{"index":{}}
{"content":"Dørblad med et enkelt hak","rank":3}
{"index":{}}
{"content":"Lejlighesdør har været brudt op","rank":2}
{"index":{}}
{"content":"Fra lager","rank":4}
{"index":{}}
{"content":"Håndtag mangler","rank":4}
{"index":{}}
{"content":"Ridser og vandskade","rank":2}
{"index":{}}
{"content":"Ridser og mærker i dørtrin","rank":3}
{"index":{}}
{"content":"Ridser og mærker i gulv","rank":3}
{"index":{}}
{"content":"Stue ikke rengjort","rank":3}
{"index":{}}
{"content":"Lejemål ikke ryddet","rank":3}
{"index":{}}
{"content":"Entre ikke rengjort","rank":3}
{"index":{}}
{"content":"Badeværelse ikke rengjort","rank":3}
{"index":{}}
{"content":"Lak slidt igennem manglende vedligeholdelse","rank":9}
{"index":{}}
{"content":"Flere store hakker efter tabt broncestatue","rank":3}
{"index":{}}
{"content":"Vask af gulv","rank":11}
{"index":{}}
{"content":"Flere hakkeri lakken","rank":3}
{"index":{}}
{"content":"Enkelte ridser i lakken","rank":3}
{"index":{}}
{"content":"Oplukning + ny cylinder +3 nøgler","rank":3}
{"index":{}}
{"content":"Pga. Nikotin","rank":10}
{"index":{}}
{"content":"Pga","rank":3}
{"index":{}}
{"content":"Gulvet letslibes og lakeres","rank":2}
{"index":{}}
{"content":"Dørkarme plet Rep","rank":2}
{"index":{}}
{"content":"Vaskes pga nikotin","rank":2}
{"index":{}}
{"content":"Gulv misligeholdt","rank":3}
{"index":{}}
{"content":"Ridser og nikotin","rank":2}
{"index":{}}
{"content":"Væge misligeholdt og tegnet på","rank":3}
{"index":{}}
{"content":"Hovedrengøring inkl. Hårde hvidevarer","rank":3}
{"index":{}}
{"content":"Rydning af hele lejliged samt kælderrum inkl. Bortkørsel","rank":3}
{"index":{}}
{"content":"Meget beskidt alt skal rengøres","rank":2}
{"index":{}}
{"content":"Tæret rør","rank":2}
{"index":{}}
{"content":"Skabe er ikke rengjort","rank":3}
{"index":{}}
{"content":"Bordplade ved vask","rank":3}
{"index":{}}
{"content":"Tæppe er ikke fjernet","rank":3}
{"index":{}}
{"content":"Pga. gulvslib","rank":2}
{"index":{}}
{"content":"Opbordet i boperioden","rank":3}
{"index":{}}
{"content":"Udskiftning af loftsudtag","rank":3}
{"index":{}}
{"content":"Tabt","rank":3}
{"index":{}}
{"content":"Ikke afrenset kalk","rank":3}
{"index":{}}
{"content":"Løs installation","rank":1}
{"index":{}}
{"content":"skiftes til 6 stiftes cylinde og postkasse med 3 nøgler","rank":2}
{"index":{}}
{"content":"Polering af vinduer udvending","rank":2}
{"index":{}}
{"content":"Pga gulv slib","rank":2}
{"index":{}}
{"content":"Mærke","rank":2}
{"index":{}}
{"content":"Mærker ridser","rank":4}
{"index":{}}
{"content":"Lak på gulv gennemslidt","rank":3}
{"index":{}}
{"content":"Vindue puds","rank":2}
{"index":{}}
{"content":"Badværelsesdør","rank":2}
{"index":{}}
{"content":"Liste foran vindue-/terrassedøre","rank":2}
{"index":{}}
{"content":"Tapet arb","rank":4}
{"index":{}}
{"content":"Mærker i maling","rank":5}
{"index":{}}
{"content":"Mærker / hakker","rank":30}
{"index":{}}
{"content":"Medgået tid","rank":2}
{"index":{}}
{"content":"Store ridser","rank":2}
{"index":{}}
{"content":"Mindre ridser","rank":2}
{"index":{}}
{"content":"Ikke vedligeholdt i bo perioden","rank":4}
{"index":{}}
{"content":"Pga gulvslib","rank":6}
{"index":{}}
{"content":"Sætningsskade","rank":2}
{"index":{}}
{"content":"Total rengøring med alt","rank":2}
{"index":{}}
{"content":"Gulv ikke rengjort","rank":2}
{"index":{}}
{"content":"Skureliste ved køkkenbord","rank":2}
{"index":{}}
{"content":"Sokkel ved køkken","rank":2}
{"index":{}}
{"content":"Snavset og tilkalket","rank":6}
{"index":{}}
{"content":"Ridser i gulvlakken","rank":4}
{"index":{}}
{"content":"Havearbejde","rank":8}
{"index":{}}
{"content":"Bortskaffelse af effekter","rank":2}
{"index":{}}
{"content":"Rydning af skur","rank":2}
{"index":{}}
{"content":"Bortskaffelse af køleskab","rank":2}
{"index":{}}
{"content":"SKC 2871","rank":2}
{"index":{}}
{"content":"Ridser i lak","rank":18}
{"index":{}}
{"content":"Køkken låger","rank":2}
{"index":{}}
{"content":"Efter køkkenskift","rank":2}
{"index":{}}
{"content":"Gennemslidt overfladebehandling","rank":3}
{"index":{}}
{"content":"Græs hvor der har stået plantekasser mangler","rank":3}
{"index":{}}
{"content":"Demontering af spots i køkken","rank":2}
{"index":{}}
{"content":"Kattekrads","rank":3}
{"index":{}}
{"content":"Vinduesparti med havedør","rank":3}
{"index":{}}
{"content":"Silikonefuge skiftes","rank":3}
{"index":{}}
{"content":"Hjemme lavet sokkel","rank":2}
{"index":{}}
{"content":"V. Køkkenskift","rank":2}
{"index":{}}
{"content":"Ikke pænt spartel og mangler tapet","rank":2}
{"index":{}}
{"content":"Hakker i overfladen","rank":3}
{"index":{}}
{"content":"Male endevæg køkken til stue","rank":2}
{"index":{}}
{"content":"Paneler er hakkede","rank":3}
{"index":{}}
{"content":"Tapet i hele gangen","rank":2}
{"index":{}}
{"content":"Tapet alle vægge køkken","rank":2}
{"index":{}}
{"content":"Værelse ved køkken","rank":3}
{"index":{}}
{"content":"Hyler hele tiden","rank":3}
{"index":{}}
{"content":"Hele lejemålet","rank":2}
{"index":{}}
{"content":"Skære bordplade til og fastmontere samt lime endestyk laminat på","rank":2}
{"index":{}}
{"content":"Maling på kontakter","rank":4}
{"index":{}}
{"content":"Beboer har fjernet og lukket Udluftning","rank":2}
{"index":{}}
{"content":"Røgskadet","rank":6}
{"index":{}}
{"content":"Tuds farve","rank":2}
{"index":{}}
{"content":"Ridser i gulvlaken","rank":2}
{"index":{}}
{"content":"Køkkenvask","rank":2}
{"index":{}}
{"content":"Badeværelse karm og dør males","rank":2}
{"index":{}}
{"content":"Maling på paneler","rank":2}
{"index":{}}
{"content":"Genemslidning +misfarvning af bordplade","rank":3}
{"index":{}}
{"content":"Overlysvindue","rank":2}
{"index":{}}
{"content":"Underside","rank":6}
{"index":{}}
{"content":"Demonter div på vægge og lofter","rank":2}
{"index":{}}
{"content":"Klargøring til maler","rank":2}
{"index":{}}
{"content":"Fjerne gulvtæppe","rank":2}
{"index":{}}
{"content":"Opblødning af spartelmasse ved skruehuller","rank":2}
{"index":{}}
{"content":"Skuffer","rank":5}
{"index":{}}
{"content":"På grordplade skal skiftes","rank":2}
{"index":{}}
{"content":"Omkodningen af dør postkasse","rank":2}
{"index":{}}
{"content":"Fjerne skillevægge","rank":2}
{"index":{}}
{"content":"Demontering og montering af nye køkkenskabe","rank":2}
{"index":{}}
{"content":"Folie sat på","rank":2}
{"index":{}}
{"content":"Montere låger igen","rank":2}
{"index":{}}
{"content":"Afslibning af polyfylla ved skruehuller","rank":2}
{"index":{}}
{"content":"Slibning pga mtæppetape på gulve","rank":3}
{"index":{}}
{"content":"Træ tremme loft","rank":4}
{"index":{}}
{"content":"Badeværelse karm","rank":2}
{"index":{}}
{"content":"Se bund af låge","rank":2}
{"index":{}}
{"content":"Nederst gummi liste på låge","rank":2}
{"index":{}}
{"content":"Lille skab under bord","rank":2}
{"index":{}}
{"content":"Skadet/ ridset","rank":1}
{"index":{}}
{"content":"Rep/males efter rollatorbrug","rank":1}
{"index":{}}
{"content":"Rengøring nødvendig før malerarbejde","rank":1}
{"index":{}}
{"content":"Misfarvede af nikotin","rank":1}
{"index":{}}
{"content":"Rydning af inventar","rank":6}
{"index":{}}
{"content":"Vinduer rep. og males efter gardiner og ridser og mærker","rank":2}
{"index":{}}
{"content":"Smadrede ruder udskiftes","rank":4}
{"index":{}}
{"content":"Knækket vinduesplade udskiftes","rank":4}
{"index":{}}
{"content":"Terressedør Rep. og males udvendig pga. hærværk","rank":2}
{"index":{}}
{"content":"Tømning af affald i skur","rank":4}
{"index":{}}
{"content":"Rep. af huller i vægge","rank":2}
{"index":{}}
{"content":"Afvaskning pga overfladen er ikke malbar","rank":3}
{"index":{}}
{"content":"Afvaskning da overflade ikke er malbar","rank":3}
{"index":{}}
{"content":"Hovedrengøring af alle flader pga nikotin","rank":3}
{"index":{}}
{"content":"Gulvet har lakgennemslid og ridser","rank":3}
{"index":{}}
{"content":"Rengøres og kalk fjernes","rank":12}
{"index":{}}
{"content":"Rengøring og kalk fjernes","rank":3}
{"index":{}}
{"content":"Rep. Div fliser","rank":3}
{"index":{}}
{"content":"Og afrens termorude","rank":3}
{"index":{}}
{"content":"Montering af geret står i boligen","rank":3}
{"index":{}}
{"content":"Af monting af lampe","rank":3}
{"index":{}}
{"content":"Ny loftrosæt","rank":3}
{"index":{}}
{"content":"El gemmegang","rank":3}
{"index":{}}
{"content":"Fjen alt","rank":6}
{"index":{}}
{"content":"Også komfur","rank":3}
{"index":{}}
{"content":"Og venylgulv + tømmning af skaben","rank":3}
{"index":{}}
{"content":"Dørtrin slibes","rank":5}
{"index":{}}
{"content":"Fast montering af amtur","rank":6}
{"index":{}}
{"content":"Fjern maling","rank":3}
{"index":{}}
{"content":"afrens termorude","rank":3}
{"index":{}}
{"content":"Rep og male","rank":3}
{"index":{}}
{"content":"Dødsbo flyttes til skifteretsdepot","rank":3}
{"index":{}}
{"content":"Mangler sokkel","rank":2}
{"index":{}}
{"content":"Mangler sokkel og fastgørelse af skab","rank":2}
{"index":{}}
{"content":"Plug i vægge","rank":2}
{"index":{}}
{"content":"Installationer ændret m.m","rank":2}
{"index":{}}
{"content":"Fjerne hyldeholder på flise væg","rank":2}
{"index":{}}
{"content":"Fjerne hylde holder der er limet på flise væg","rank":2}
{"index":{}}
{"content":"Hyldeholder er limet på fliserne og kan ikke komme af","rank":2}
{"index":{}}
{"content":"Ændret","rank":2}
{"index":{}}
{"content":"Husk over på skabene","rank":2}
{"index":{}}
{"content":"Blå radiator","rank":2}
{"index":{}}
{"content":"Spærring af alle overflader for nikotin","rank":3}
{"index":{}}
{"content":"Pudsning af alle vinduer","rank":3}
{"index":{}}
{"content":"Fjern kork samt slibning og 3 x lak","rank":3}
{"index":{}}
{"content":"Fjern kork","rank":3}
{"index":{}}
{"content":"Rengøring af gulv","rank":6}
{"index":{}}
{"content":"Ridser og skammer","rank":4}
{"index":{}}
{"content":"Manglende rengøring. Manglende rengøring (lejeren har ikke rengjort","rank":2}
{"index":{}}
{"content":"Tømning af depotrum","rank":2}
{"index":{}}
{"content":"Fjernelse af affald køkken","rank":2}
{"index":{}}
{"content":"Manglende rengøring af fraflytter","rank":2}
{"index":{}}
{"content":"Pletter der ikke kan fjernes","rank":2}
{"index":{}}
{"content":"Har ikke tømt lejlighed","rank":4}
{"index":{}}
{"content":"Skrue i dørplade","rank":2}
{"index":{}}
{"content":"Manglende pasning","rank":2}
{"index":{}}
{"content":"Fjernelse af affald","rank":2}
{"index":{}}
{"content":"Fjernelse af træ","rank":2}
{"index":{}}
{"content":"Rensning af terrasse","rank":2}
{"index":{}}
{"content":"filter ødelaget","rank":2}
{"index":{}}
{"content":"toiletsæde i stykker","rank":2}
{"index":{}}
{"content":"Ovn rengøres over alt","rank":2}
{"index":{}}
{"content":"Køleskab rengøres","rank":5}
{"index":{}}
{"content":"Rengøring af spejl","rank":6}
{"index":{}}
{"content":"Efter gardiner","rank":2}
{"index":{}}
{"content":"3 huller i bordpladen","rank":2}
{"index":{}}
{"content":"Klistermærke skal ej være der","rank":2}
{"index":{}}
{"content":"Mangler pga skab er fjernet","rank":2}
{"index":{}}
{"content":"Pga.af nikotin","rank":2}
{"index":{}}
{"content":"Afskrabning","rank":8}
{"index":{}}
{"content":"Omkodningen af dør og postkasse","rank":2}
{"index":{}}
{"content":"Bulet kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Slid mærker","rank":2}
{"index":{}}
{"content":"Fugt skade bag hoveddør","rank":2}
{"index":{}}
{"content":"Løst tapet limes","rank":2}
{"index":{}}
{"content":"Plettes","rank":2}
{"index":{}}
{"content":"Mærker efter tæpper","rank":2}
{"index":{}}
{"content":"Tæppetape fjernes","rank":2}
{"index":{}}
{"content":"Dobbelt klæbede tape renses af gulv","rank":2}
{"index":{}}
{"content":"Kat i lejligheden","rank":2}
{"index":{}}
{"content":"Dobbelt klæbende tape renses af gulv","rank":2}
{"index":{}}
{"content":"Defekt/ødelagt","rank":2}
{"index":{}}
{"content":"Lys samt armatur","rank":2}
{"index":{}}
{"content":"Antennestik defekt","rank":2}
{"index":{}}
{"content":"Ødelagt /mangler","rank":2}
{"index":{}}
{"content":"Der har været kat i rummet","rank":2}
{"index":{}}
{"content":"Badeværelseamatur skiftes","rank":2}
{"index":{}}
{"content":"Antenne kontakt fastgøres","rank":2}
{"index":{}}
{"content":"Manglende tømming","rank":8}
{"index":{}}
{"content":"Manglende tømmin","rank":2}
{"index":{}}
{"content":"I forbindelse med ny bordplade","rank":6}
{"index":{}}
{"content":"Slidt maling afskallet","rank":2}
{"index":{}}
{"content":"Efter skift af gulv","rank":2}
{"index":{}}
{"content":"Ikke malbart","rank":6}
{"index":{}}
{"content":"Slidt samt mærker","rank":2}
{"index":{}}
{"content":"Badeværelse lysamatur skiftes ødelagt","rank":2}
{"index":{}}
{"content":"Mgl.vedligehold","rank":6}
{"index":{}}
{"content":"Mgl.rengøring","rank":3}
{"index":{}}
{"content":"Mgl.tømning af dødsbo","rank":6}
{"index":{}}
{"content":"Nymalet på alle malbare flader","rank":1}
{"index":{}}
{"content":"Lakken er slidt helt igennem","rank":1}
{"index":{}}
{"content":"Træliste","rank":2}
{"index":{}}
{"content":"Også HV dør indv","rank":2}
{"index":{}}
{"content":"Aflæsning af\nEl: \nVand:\nVarme","rank":1}
{"index":{}}
{"content":"Reparation af skruerhuller","rank":2}
{"index":{}}
{"content":"Begge sider samt endestyk","rank":2}
{"index":{}}
{"content":"Ridser og mærker igennem lak","rank":4}
{"index":{}}
{"content":"Ikke rene","rank":6}
{"index":{}}
{"content":"Ikke rent","rank":14}
{"index":{}}
{"content":"Ridser og gennemslidning af lakken","rank":2}
{"index":{}}
{"content":"Misfarvet af fugt","rank":2}
{"index":{}}
{"content":"Grov slib og 3 x lak","rank":2}
{"index":{}}
{"content":"Mal x 2","rank":2}
{"index":{}}
{"content":"Skabs låger","rank":4}
{"index":{}}
{"content":"Rengøring af over/underskabe+over og under skaberne. Rengøring af bord og stenplade. Afkalk håndvask","rank":2}
{"index":{}}
{"content":"Incl. Lysning og vinduesplade","rank":2}
{"index":{}}
{"content":"Afkalkning af alle fliser","rank":2}
{"index":{}}
{"content":"Afkalk håndvask","rank":2}
{"index":{}}
{"content":"Kabelbakker","rank":2}
{"index":{}}
{"content":"Rengøring af entreskab: ind/udvendig+ovenpå","rank":2}
{"index":{}}
{"content":"Incl. Demontering af småting","rank":2}
{"index":{}}
{"content":"Husk gulv vask","rank":2}
{"index":{}}
{"content":"Opsæt tapet i entre","rank":2}
{"index":{}}
{"content":"Ved badeværelse dør","rank":2}
{"index":{}}
{"content":"Linoleum fjernes","rank":1}
{"index":{}}
{"content":"Er ridset og skræmet","rank":2}
{"index":{}}
{"content":"Sokkel mangler og skab står løst","rank":2}
{"index":{}}
{"content":"Hul i døren . Det skal lukkes og 2 gange maling","rank":2}
{"index":{}}
{"content":"Hul efter gardin","rank":2}
{"index":{}}
{"content":"Opfriskning","rank":2}
{"index":{}}
{"content":"Ridser efter hund afskrabning","rank":2}
{"index":{}}
{"content":"Istykker","rank":2}
{"index":{}}
{"content":"På grund af vand fra opvask","rank":2}
{"index":{}}
{"content":"Udskift svømmer","rank":2}
{"index":{}}
{"content":"Har fordelt udgift .men lejer har været klar det har løbet i lang tid","rank":2}
{"index":{}}
{"content":"Køkkenskab skal rep","rank":4}
{"index":{}}
{"content":"Udskiftes pga .slid samt opbulning på gulv","rank":2}
{"index":{}}
{"content":"Skader efter hund","rank":2}
{"index":{}}
{"content":"Demontering og bortskaffelse","rank":2}
{"index":{}}
{"content":"Clips på fodpaneler","rank":2}
{"index":{}}
{"content":"Clips på vindue","rank":2}
{"index":{}}
{"content":"Div. I køkkenskab","rank":2}
{"index":{}}
{"content":"Søm/clips huller","rank":2}
{"index":{}}
{"content":"Slibning efter spartling af lejer","rank":2}
{"index":{}}
{"content":"Afskrabning på radiator","rank":2}
{"index":{}}
{"content":"Skader/skrammer igennem maling","rank":4}
{"index":{}}
{"content":"Lysninger","rank":8}
{"index":{}}
{"content":"Efter håndværker","rank":2}
{"index":{}}
{"content":"Front","rank":8}
{"index":{}}
{"content":"Låger og skuffer eftergås","rank":1}
{"index":{}}
{"content":"Terrazzo gulv afkalkes","rank":2}
{"index":{}}
{"content":"Skidt bag radiator","rank":4}
{"index":{}}
{"content":"Omkodening","rank":2}
{"index":{}}
{"content":"Flækket","rank":4}
{"index":{}}
{"content":"Tømning af skur","rank":2}
{"index":{}}
{"content":"Bortskaffelse","rank":2}
{"index":{}}
{"content":"Køleskab mangler ved syn","rank":2}
{"index":{}}
{"content":"Sømhuller","rank":4}
{"index":{}}
{"content":"Skabslåger","rank":4}
{"index":{}}
{"content":"Farvet spartel","rank":2}
{"index":{}}
{"content":"Kabel bakke i loft","rank":2}
{"index":{}}
{"content":"Huller i side plade","rank":2}
{"index":{}}
{"content":"Mærker og slagmærker på låger","rank":2}
{"index":{}}
{"content":"Fjerne alle lamper","rank":2}
{"index":{}}
{"content":"Mangler front udtag","rank":2}
{"index":{}}
{"content":"I hele lejemålet","rank":4}
{"index":{}}
{"content":"Mangler hele lameudtaget","rank":2}
{"index":{}}
{"content":"Tapet uden på filt","rank":2}
{"index":{}}
{"content":"Slid igennem lak","rank":2}
{"index":{}}
{"content":"Brændt og færdige","rank":2}
{"index":{}}
{"content":"Fjer klister mærker vindue","rank":2}
{"index":{}}
{"content":"Spartel på væg efter fjerne tapet","rank":2}
{"index":{}}
{"content":"Rydning og bortskaffelse af indbo","rank":2}
{"index":{}}
{"content":"Afsrabninger","rank":2}
{"index":{}}
{"content":"Afskrabninger","rank":4}
{"index":{}}
{"content":"Skruer huller","rank":4}
{"index":{}}
{"content":"Hoveddør indvendig side","rank":2}
{"index":{}}
{"content":"Tv lednonig opsat af lejer","rank":2}
{"index":{}}
{"content":"Tvledning opsat af lejer","rank":2}
{"index":{}}
{"content":"Maling efter fjernelse af tv ledning","rank":2}
{"index":{}}
{"content":"Sunket fliser samt revnet","rank":2}
{"index":{}}
{"content":"Sunket hjørne fliser revnet","rank":2}
{"index":{}}
{"content":"Drypper ved håndvask","rank":2}
{"index":{}}
{"content":"Evt. Rep","rank":2}
{"index":{}}
{"content":"Spartling og færdigmaling","rank":6}
{"index":{}}
{"content":"Letslibning og lakkering","rank":3}
{"index":{}}
{"content":"Vinduer males x 2","rank":2}
{"index":{}}
{"content":"Rengøring før håndværker","rank":11}
{"index":{}}
{"content":"Skydedørsrørkasse males x 2","rank":2}
{"index":{}}
{"content":"Dørkarme males x 2","rank":2}
{"index":{}}
{"content":"Fodpanelmales x 2","rank":2}
{"index":{}}
{"content":"Dører males x 2","rank":4}
{"index":{}}
{"content":"1 x spærregrund","rank":2}
{"index":{}}
{"content":"Tæpperester fjernes","rank":2}
{"index":{}}
{"content":"Lysning males x 2","rank":2}
{"index":{}}
{"content":"Fodlist magler","rank":3}
{"index":{}}
{"content":"Fodlist mangler","rank":3}
{"index":{}}
{"content":"Skift dørkar","rank":3}
{"index":{}}
{"content":"Loftudtag hivet ud","rank":3}
{"index":{}}
{"content":"Udlagt gulv","rank":3}
{"index":{}}
{"content":"Udlagt bordplade","rank":3}
{"index":{}}
{"content":"Defekt emhætte","rank":3}
{"index":{}}
{"content":"Misligholdt hvidevarer","rank":3}
{"index":{}}
{"content":"Hele lejemålet slippes","rank":3}
{"index":{}}
{"content":"Gennem slid i lak","rank":3}
{"index":{}}
{"content":"Manglende vedligholdelse","rank":3}
{"index":{}}
{"content":"Udlagt armatur","rank":3}
{"index":{}}
{"content":"Plade bag wc mangler","rank":3}
{"index":{}}
{"content":"Fjern skruer","rank":3}
{"index":{}}
{"content":"Åben pulterrum","rank":3}
{"index":{}}
{"content":"Tømning af pulterrum","rank":3}
{"index":{}}
{"content":"Inge nøge","rank":3}
{"index":{}}
{"content":"Ikke rengjordt","rank":9}
{"index":{}}
{"content":"Køleskab + vanyl","rank":3}
{"index":{}}
{"content":"Ridser gennem lak","rank":3}
{"index":{}}
{"content":"Dørgreb mangler","rank":9}
{"index":{}}
{"content":"Dørkarmme males x 2","rank":2}
{"index":{}}
{"content":"Fodpaneler males x 2","rank":2}
{"index":{}}
{"content":"Grovslib og 3 x lak","rank":2}
{"index":{}}
{"content":"Afkalk alle filseri bad","rank":2}
{"index":{}}
{"content":"Afkalk toilet","rank":2}
{"index":{}}
{"content":"Afkalk armatur og håndvask","rank":2}
{"index":{}}
{"content":"Afkalk alle fliser","rank":2}
{"index":{}}
{"content":"Rengøring af alle skabe","rank":5}
{"index":{}}
{"content":"Rengøring af lampe","rank":4}
{"index":{}}
{"content":"Rengøring af skabe","rank":2}
{"index":{}}
{"content":"Venstre karm til hoveddør udskiftes","rank":2}
{"index":{}}
{"content":"Radiator males pga. Ridser og mærker","rank":2}
{"index":{}}
{"content":"Hul loft","rank":3}
{"index":{}}
{"content":"Fjern lamper","rank":6}
{"index":{}}
{"content":"Enge klokke mangler","rank":2}
{"index":{}}
{"content":"Total hoved rengøring (slem","rank":3}
{"index":{}}
{"content":"Mangler dørhåndtag","rank":2}
{"index":{}}
{"content":"Div skader","rank":2}
{"index":{}}
{"content":"Manglende polering","rank":6}
{"index":{}}
{"content":"Kogeplade slidt","rank":2}
{"index":{}}
{"content":"Rep af væg ved temp. Regulator","rank":1}
{"index":{}}
{"content":"Se foto","rank":1}
{"index":{}}
{"content":"Støvsuge skader på sandliste","rank":1}
{"index":{}}
{"content":"Afskrabning fra hund","rank":2}
{"index":{}}
{"content":"Afskrabninger fra hund","rank":2}
{"index":{}}
{"content":"Terrassedør ikke rengjort","rank":2}
{"index":{}}
{"content":"Brødkrummer i bund samt ovn","rank":2}
{"index":{}}
{"content":"Træværk malet med vægmaling. Klargøres til korrekt maling","rank":3}
{"index":{}}
{"content":"Søm huller","rank":4}
{"index":{}}
{"content":"Slibes + lak","rank":2}
{"index":{}}
{"content":"Afrenses for maling","rank":6}
{"index":{}}
{"content":"Mistet nøgler fraflytter kun 1aflevret","rank":2}
{"index":{}}
{"content":"Forkant på skab","rank":2}
{"index":{}}
{"content":"Gennem slid flere steder","rank":2}
{"index":{}}
{"content":"Håndfedt på døre","rank":2}
{"index":{}}
{"content":"Under side af skuffer og låger","rank":2}
{"index":{}}
{"content":"Gennem gang af fronter i køkken","rank":2}
{"index":{}}
{"content":"Fjerne tape elefant","rank":2}
{"index":{}}
{"content":"Maling på listen","rank":2}
{"index":{}}
{"content":"Fjerne fast siddende papir rammer","rank":2}
{"index":{}}
{"content":"Indvendige døre og garderobe skabe","rank":2}
{"index":{}}
{"content":"Inkl. Målerskab","rank":2}
{"index":{}}
{"content":"Ridser og kalk","rank":2}
{"index":{}}
{"content":"Ridser og kalk bordplade","rank":2}
{"index":{}}
{"content":"Køleskab side","rank":2}
{"index":{}}
{"content":"Mangler 2 nøgler  samt 1 til postkasse","rank":2}
{"index":{}}
{"content":"Test af standardnoter","rank":1}
{"index":{}}
{"content":"Vand fra vask","rank":2}
{"index":{}}
{"content":"Sod fra starin","rank":1}
{"index":{}}
{"content":"Krog i vindue ikke standard","rank":1}
{"index":{}}
{"content":"Normal","rank":38}
{"index":{}}
{"content":"Ruder","rank":4}
{"index":{}}
{"content":"Dør plader","rank":4}
{"index":{}}
{"content":"Væg fliser","rank":2}
{"index":{}}
{"content":"Tapet arbejde ved reduktion af skabe","rank":4}
{"index":{}}
{"content":"Fod lister","rank":10}
{"index":{}}
{"content":"Sokkel males grå","rank":12}
{"index":{}}
{"content":"Garderobe hylde","rank":2}
{"index":{}}
{"content":"Gulve","rank":14}
{"index":{}}
{"content":"Vinduespolering","rank":9}
{"index":{}}
{"content":"Nyt væv ved køkken skift","rank":2}
{"index":{}}
{"content":"Cylinder boret ud","rank":2}
{"index":{}}
{"content":"Skrammer og ridser i gulv","rank":2}
{"index":{}}
{"content":"Skruer huller samt afskrabning","rank":2}
{"index":{}}
{"content":"Beskidt. Samt rester","rank":2}
{"index":{}}
{"content":"Træværk","rank":15}
{"index":{}}
{"content":"Vinduer","rank":20}
{"index":{}}
{"content":"Dør plade 2 sider","rank":2}
{"index":{}}
{"content":"Ekstra slib ved altan dør","rank":2}
{"index":{}}
{"content":"Trappe vanger","rank":6}
{"index":{}}
{"content":"Trappe mæglere","rank":2}
{"index":{}}
{"content":"Vinduesfalse","rank":10}
{"index":{}}
{"content":"Underside blandings batteri","rank":2}
{"index":{}}
{"content":"Finish komfur front","rank":2}
{"index":{}}
{"content":"Lampe er ikke fjernet","rank":3}
{"index":{}}
{"content":"Spærregrunder efter leje periode","rank":2}
{"index":{}}
{"content":"Ny tapet efter leje periode","rank":2}
{"index":{}}
{"content":"Ny væv","rank":2}
{"index":{}}
{"content":"Træværk x 3","rank":2}
{"index":{}}
{"content":"Radiatorer x 3","rank":2}
{"index":{}}
{"content":"Loftlem","rank":14}
{"index":{}}
{"content":"Skydedøre lakeres x 2","rank":2}
{"index":{}}
{"content":"Demontere kabler og ledninger","rank":2}
{"index":{}}
{"content":"Karmtræ afvask efter leje periode","rank":2}
{"index":{}}
{"content":"Fod lister afvask efter leje periode","rank":2}
{"index":{}}
{"content":"Radiatorer afvask","rank":2}
{"index":{}}
{"content":"Udvidet rengøring i bad","rank":2}
{"index":{}}
{"content":"Imprægnering af flise gulv","rank":2}
{"index":{}}
{"content":"Sætningsrevne limes og repareres","rank":2}
{"index":{}}
{"content":"Rep. Af huller efter gardiner","rank":3}
{"index":{}}
{"content":"Tæppe skiftes","rank":2}
{"index":{}}
{"content":"Radiatorrør","rank":6}
{"index":{}}
{"content":"Radiattorer","rank":2}
{"index":{}}
{"content":"Opgradering af tapet standart","rank":2}
{"index":{}}
{"content":"Gulv udskiftes efter nedsivning af krops væsker","rank":2}
{"index":{}}
{"content":"Der har været rygte","rank":2}
{"index":{}}
{"content":"Pga. Af rygning","rank":4}
{"index":{}}
{"content":"Ælde","rank":2}
{"index":{}}
{"content":"Slid og ælde","rank":2}
{"index":{}}
{"content":"I stykker","rank":2}
{"index":{}}
{"content":"Højre længst væk virker ikke nogen gang","rank":2}
{"index":{}}
{"content":"Fugtskadet efter afmontering og opbevaring","rank":2}
{"index":{}}
{"content":"Ødelagt efter afmontering (opvaskemaskine","rank":2}
{"index":{}}
{"content":"Manglende renholdelse","rank":4}
{"index":{}}
{"content":"Løs","rank":5}
{"index":{}}
{"content":"Beskidt og tape rester","rank":2}
{"index":{}}
{"content":"Sidder løst","rank":4}
{"index":{}}
{"content":"Løse kontakter og lampeudtag","rank":1}
{"index":{}}
{"content":"Afkalkes","rank":36}
{"index":{}}
{"content":"Fjerne male pletter","rank":2}
{"index":{}}
{"content":"Afskabning","rank":2}
{"index":{}}
{"content":"Dyb ridse midt for","rank":2}
{"index":{}}
{"content":"Skadet på underside . Lægges på lager","rank":2}
{"index":{}}
{"content":"Tegnet på vægge + sod","rank":3}
{"index":{}}
{"content":"Faldstamme fordelerrør tæret","rank":1}
{"index":{}}
{"content":"Gennem slidt lak og brændemærker","rank":3}
{"index":{}}
{"content":"Manglende regøring","rank":3}
{"index":{}}
{"content":"Huller fra sovesofa","rank":2}
{"index":{}}
{"content":"Afkalkning og rengøring","rank":2}
{"index":{}}
{"content":"Rengøring af hårde hvidevarer mm","rank":2}
{"index":{}}
{"content":"Husk at afrime fryser","rank":2}
{"index":{}}
{"content":"Shampoo hyldeinsats monteres","rank":1}
{"index":{}}
{"content":"Mangler vedligeholdelse","rank":1}
{"index":{}}
{"content":"De bordplader der er lav hylder af dem","rank":2}
{"index":{}}
{"content":"Gennem slidt nogle steder","rank":2}
{"index":{}}
{"content":"Træværk ( karm + panel","rank":2}
{"index":{}}
{"content":"Rep skruehuller","rank":1}
{"index":{}}
{"content":"Misfarvet pga. Rygning","rank":2}
{"index":{}}
{"content":"Misfarvet pga. Madrester samt ridser","rank":2}
{"index":{}}
{"content":"I forbindelse med skift af køkkenvask","rank":2}
{"index":{}}
{"content":"Mangler skruer samt misfarvet","rank":2}
{"index":{}}
{"content":"Manglende tømming samt bortskaffelse af møbler","rank":2}
{"index":{}}
{"content":"Tapet afskallet pga","rank":2}
{"index":{}}
{"content":"Manglende nøgler","rank":9}
{"index":{}}
{"content":"Efter skruer huller","rank":2}
{"index":{}}
{"content":"Arbejdes bord opsat af lejer . Ikke blevet fjernet","rank":2}
{"index":{}}
{"content":"Fugtophævet","rank":2}
{"index":{}}
{"content":"Altan males pga.maling rester","rank":2}
{"index":{}}
{"content":"Huller fra køkkenbord samt brændemærker","rank":2}
{"index":{}}
{"content":"Dæksel mangler defekt","rank":2}
{"index":{}}
{"content":"Ej fjernet og fyldt med gammel mad","rank":2}
{"index":{}}
{"content":"Manglende udluftning  fugt skadet","rank":2}
{"index":{}}
{"content":"Hul i plade ved vindue","rank":2}
{"index":{}}
{"content":"Afrens af lim på loftet","rank":2}
{"index":{}}
{"content":"Flere steder gennemslidt","rank":4}
{"index":{}}
{"content":"Beboer har sparket døren op","rank":2}
{"index":{}}
{"content":"Alt træværk og døre males","rank":2}
{"index":{}}
{"content":"Låge over komfur er fugtskadet i bunden","rank":6}
{"index":{}}
{"content":"Skuffe er revnet","rank":3}
{"index":{}}
{"content":"Kontakter er overmalet","rank":3}
{"index":{}}
{"content":"Se billeder","rank":3}
{"index":{}}
{"content":"Dyb ridse","rank":2}
{"index":{}}
{"content":"Håndlister lakeres","rank":2}
{"index":{}}
{"content":"Radiatorer","rank":28}
{"index":{}}
{"content":"Skunklem inkl. rammetræ","rank":2}
{"index":{}}
{"content":"Lysninger lakeres","rank":2}
{"index":{}}
{"content":"Afrens af tape","rank":2}
{"index":{}}
{"content":"Emhætte og komfur finish","rank":2}
{"index":{}}
{"content":"Køkken diverse","rank":2}
{"index":{}}
{"content":"Olie behandling","rank":2}
{"index":{}}
{"content":"Hakker og afsktab","rank":3}
{"index":{}}
{"content":"Hakker og gennemslidt lak","rank":3}
{"index":{}}
{"content":"Spor efter vandskade ved køleskab","rank":3}
{"index":{}}
{"content":"Ventilation ikke rengjort","rank":3}
{"index":{}}
{"content":"Kalk på gulv og i bruseområde","rank":3}
{"index":{}}
{"content":"Afskrab efter håndklædeholder på dørkarm","rank":3}
{"index":{}}
{"content":"Dør skrammet efter håndklædeholder på dør","rank":3}
{"index":{}}
{"content":"Begge sider","rank":26}
{"index":{}}
{"content":"Lettere tilsmudset generelt","rank":3}
{"index":{}}
{"content":"Lettere tildsmudset","rank":3}
{"index":{}}
{"content":"Græsslåmaskine og rive fjernes hvis ny lejer ikke vil overtage dette","rank":3}
{"index":{}}
{"content":"Epoxy males med ding dong","rank":2}
{"index":{}}
{"content":"Dørplade rengøres på alle flader","rank":1}
{"index":{}}
{"content":"Væg ikke færdig malet males fra hjørne til hjørne","rank":1}
{"index":{}}
{"content":"Fugtskadet over tid","rank":1}
{"index":{}}
{"content":"Efter 5 kroge","rank":2}
{"index":{}}
{"content":"Terrasse rengøres","rank":2}
{"index":{}}
{"content":"Rengøring efter lejeperiode","rank":6}
{"index":{}}
{"content":"Fliser afkalkes","rank":3}
{"index":{}}
{"content":"Gulv afkalk","rank":2}
{"index":{}}
{"content":"Døre olie behandles","rank":2}
{"index":{}}
{"content":"Slag mærker","rank":2}
{"index":{}}
{"content":"Cisterne knækket","rank":2}
{"index":{}}
{"content":"Spærrende på en sort væg","rank":3}
{"index":{}}
{"content":"Opsæt Rutex på væg","rank":3}
{"index":{}}
{"content":"Nedtag løst tapet på en væg","rank":3}
{"index":{}}
{"content":"Lamper ikke nedtaget","rank":2}
{"index":{}}
{"content":"Køl/frys","rank":3}
{"index":{}}
{"content":"Slået istykker i bund","rank":2}
{"index":{}}
{"content":"Nedtagning af pyntebjælker","rank":3}
{"index":{}}
{"content":"Spærre behandling","rank":2}
{"index":{}}
{"content":"Låge til højskab","rank":3}
{"index":{}}
{"content":"Emhætteskab mangler","rank":3}
{"index":{}}
{"content":"Slib af gulve","rank":2}
{"index":{}}
{"content":"Skruerhuller","rank":2}
{"index":{}}
{"content":"Toiletsæde mangler","rank":3}
{"index":{}}
{"content":"Tapet reparation","rank":4}
{"index":{}}
{"content":"Låse udskiftes i nye koder","rank":2}
{"index":{}}
{"content":"Slagmærker i dør","rank":2}
{"index":{}}
{"content":"Vægge","rank":15}
{"index":{}}
{"content":"Sanitet","rank":6}
{"index":{}}
{"content":"Hylde v. spejl males","rank":2}
{"index":{}}
{"content":"Krog i loft ved køkken vindue","rank":2}
{"index":{}}
{"content":"Søm og skruer i vægge og loft","rank":2}
{"index":{}}
{"content":"Terrassedør males x 2","rank":2}
{"index":{}}
{"content":"Lysning udvendig","rank":2}
{"index":{}}
{"content":"Karmtræ udvendig","rank":2}
{"index":{}}
{"content":"Ikke malbar pga kraftig rygning","rank":3}
{"index":{}}
{"content":"Mørk mærk på skydedør","rank":2}
{"index":{}}
{"content":"Vandskadet finer","rank":2}
{"index":{}}
{"content":"Grå radiatorer","rank":2}
{"index":{}}
{"content":"Lakeret døre","rank":8}
{"index":{}}
{"content":"Skruehuller hele lejligheden vinduer/døre","rank":2}
{"index":{}}
{"content":"Hovderengørn i alle rum","rank":3}
{"index":{}}
{"content":"3lags termorude pumteret","rank":3}
{"index":{}}
{"content":"Slib 3 gangelak","rank":3}
{"index":{}}
{"content":"Ingen lak på gulve","rank":3}
{"index":{}}
{"content":"Rengøring af plader i komfur","rank":2}
{"index":{}}
{"content":"Radiatorer rengøres","rank":2}
{"index":{}}
{"content":"Udskiftes kan ikke rengøres","rank":1}
{"index":{}}
{"content":"Finish rengøring","rank":2}
{"index":{}}
{"content":"Incl demontering","rank":2}
{"index":{}}
{"content":"Persinner","rank":2}
{"index":{}}
{"content":"Søm/skruer/beslag","rank":2}
{"index":{}}
{"content":"Slibe spartel væk","rank":2}
{"index":{}}
{"content":"Slibe døren","rank":2}
{"index":{}}
{"content":"Skydedør og endestykke","rank":2}
{"index":{}}
{"content":"Males udenom de ting der er på vægge","rank":2}
{"index":{}}
{"content":"Ridser hakker og vandskadet","rank":2}
{"index":{}}
{"content":"Demontering af lamper","rank":2}
{"index":{}}
{"content":"Reparation af spartel huller","rank":4}
{"index":{}}
{"content":"Rutex rep","rank":4}
{"index":{}}
{"content":"Dørplader olie behandles","rank":2}
{"index":{}}
{"content":"Dørtrin","rank":13}
{"index":{}}
{"content":"Grønsagsskuffe","rank":2}
{"index":{}}
{"content":"Ekstra afkalk: sanitet","rank":2}
{"index":{}}
{"content":"Hylde til køleskabslåge","rank":2}
{"index":{}}
{"content":"Hane afproppes efter opvaskemaskine","rank":1}
{"index":{}}
{"content":"Ridset/skadet","rank":2}
{"index":{}}
{"content":"Rep sømhuller","rank":2}
{"index":{}}
{"content":"Gasinstallation ikke afproppet","rank":1}
{"index":{}}
{"content":"Ridser/skader","rank":2}
{"index":{}}
{"content":"Tapet arbejde ved sætnings revner","rank":2}
{"index":{}}
{"content":"Karmtræ","rank":2}
{"index":{}}
{"content":"Dørplade","rank":2}
{"index":{}}
{"content":"Hoveddør 2 sider","rank":2}
{"index":{}}
{"content":"Reparation efter kabellister","rank":2}
{"index":{}}
{"content":"Rengøring efter leje periode","rank":16}
{"index":{}}
{"content":"Beboer har selv malet væggen med dårlig resultat","rank":3}
{"index":{}}
{"content":"Huller i loft efter lamper","rank":3}
{"index":{}}
{"content":"Spartling plet og færdigstryg","rank":3}
{"index":{}}
{"content":"Spartling plet og færdigmaling","rank":3}
{"index":{}}
{"content":"Slibning og lakkering","rank":3}
{"index":{}}
{"content":"Rydning af lejers indbo til skifteretslokaler i kælderen","rank":3}
{"index":{}}
{"content":"Eksisterende kantslibes hvis muligt","rank":1}
{"index":{}}
{"content":"Ekstra afkalk af gulv","rank":2}
{"index":{}}
{"content":"Rengøring ved køkken skift","rank":6}
{"index":{}}
{"content":"Lim","rank":2}
{"index":{}}
{"content":"Rengøring for nikotin","rank":2}
{"index":{}}
{"content":"Fjernelse af søm/skruer på vægge","rank":3}
{"index":{}}
{"content":"Brandmærker fra tidligere lejer","rank":2}
{"index":{}}
{"content":"Der var monteret trægulve","rank":2}
{"index":{}}
{"content":"Beskidt så der kan ikke males ovenpå","rank":2}
{"index":{}}
{"content":"Kunne ikke rengøres efter lejer","rank":4}
{"index":{}}
{"content":"I forbindelse med rengøring","rank":4}
{"index":{}}
{"content":"Kunne ikke afrenses af rengøring","rank":2}
{"index":{}}
{"content":"Gummifuge i brusehjørne samt gulv","rank":2}
{"index":{}}
{"content":"Kunne ikke gøres rene samt beskadiget manglende dele","rank":2}
{"index":{}}
{"content":"Mærker i pladen","rank":2}
{"index":{}}
{"content":"Istykker i bund samt fugt skadet","rank":2}
{"index":{}}
{"content":"Beskidt samt afskabet","rank":2}
{"index":{}}
{"content":"Stakit fornyes vindues list ved vindues parti fornyes","rank":2}
{"index":{}}
{"content":"I forbindelse med nyt køkken","rank":2}
{"index":{}}
{"content":"Slået i stykker","rank":2}
{"index":{}}
{"content":"Til bortskaffelse af affald","rank":2}
{"index":{}}
{"content":"Huller i linolium","rank":2}
{"index":{}}
{"content":"Afmontering af komfur emhætte","rank":2}
{"index":{}}
{"content":"Beskidt kunne ikke rengøres","rank":2}
{"index":{}}
{"content":"Kunne ikke rengøres","rank":14}
{"index":{}}
{"content":"I forbindelse med skift af køkken","rank":2}
{"index":{}}
{"content":"Samt linolium lagt ud over","rank":2}
{"index":{}}
{"content":"Hoveddør indv. side","rank":2}
{"index":{}}
{"content":"Friside","rank":6}
{"index":{}}
{"content":"Huller efter persienner","rank":2}
{"index":{}}
{"content":"Løst tapet","rank":5}
{"index":{}}
{"content":"Stikkontakt låg mangler","rank":3}
{"index":{}}
{"content":"Ikke rengjort før syn","rank":4}
{"index":{}}
{"content":"Slibes grundet slid","rank":2}
{"index":{}}
{"content":"Ved brænddør","rank":2}
{"index":{}}
{"content":"Grundet misligeholdelse","rank":42}
{"index":{}}
{"content":"Grundes først","rank":2}
{"index":{}}
{"content":"Bæringer males x 2","rank":2}
{"index":{}}
{"content":"Spartel reparation ud bedres","rank":2}
{"index":{}}
{"content":"Indv. døre plet","rank":2}
{"index":{}}
{"content":"Håndliste","rank":2}
{"index":{}}
{"content":"Inge dør","rank":3}
{"index":{}}
{"content":"Ventilator ikke rengjort","rank":3}
{"index":{}}
{"content":"Malning på fejelister","rank":3}
{"index":{}}
{"content":"Opsætning af overskab","rank":3}
{"index":{}}
{"content":"Hul efter parabol","rank":3}
{"index":{}}
{"content":"Finish","rank":6}
{"index":{}}
{"content":"Let slibning og 1 gang lak","rank":2}
{"index":{}}
{"content":"Opgradering af klinke gulv","rank":2}
{"index":{}}
{"content":"Ødelagt ved behæfting","rank":2}
{"index":{}}
{"content":"Rengøring af fliser for ukrudt /mos","rank":2}
{"index":{}}
{"content":"Skadet ved håndvask","rank":2}
{"index":{}}
{"content":"Pga.af skadet bordplade","rank":2}
{"index":{}}
{"content":"På grund af skadet bordplade","rank":2}
{"index":{}}
{"content":"Spartling og malerbehandling","rank":3}
{"index":{}}
{"content":"Altan dør","rank":2}
{"index":{}}
{"content":"Udbedringen efter borehuller","rank":1}
{"index":{}}
{"content":"Døre har hakker og skrammer","rank":1}
{"index":{}}
{"content":"Plet maling af træværk pga gardiner","rank":2}
{"index":{}}
{"content":"Plet maling af træværk pga rolator","rank":2}
{"index":{}}
{"content":"Plet maling af træværk pga kørestol","rank":2}
{"index":{}}
{"content":"Demontering af gardiner og tilbehør","rank":2}
{"index":{}}
{"content":"Pga af nikotin","rank":4}
{"index":{}}
{"content":"Nedste lås defekt","rank":3}
{"index":{}}
{"content":"Der er mærker på gulvet efter personalet har spritet hænder af","rank":2}
{"index":{}}
{"content":"Indkøb af nyt nødkald pga mrsa bakterier / kunne ikke renses tilstrækkeligt","rank":2}
{"index":{}}
{"content":"Afbrydere og stikkontakter rengøres","rank":1}
{"index":{}}
{"content":"Opsæt filt","rank":3}
{"index":{}}
{"content":"Males som følge af søm/ skader","rank":1}
{"index":{}}
{"content":"Fra udsættelse","rank":2}
{"index":{}}
{"content":"El skab","rank":4}
{"index":{}}
{"content":"Oliering","rank":2}
{"index":{}}
{"content":"Lakeres eller skiftes","rank":2}
{"index":{}}
{"content":"Gennem slidt lak","rank":8}
{"index":{}}
{"content":"Ved hoveddøren","rank":2}
{"index":{}}
{"content":"Spærrende maling","rank":8}
{"index":{}}
{"content":"Faldstamme","rank":6}
{"index":{}}
{"content":"Afrens af gl. maling","rank":2}
{"index":{}}
{"content":"Ridser mærker","rank":2}
{"index":{}}
{"content":"M2 Gælder for hele lejligheden alle rum incl afdækning","rank":9}
{"index":{}}
{"content":"M2 Gælder hele lejligheden alle rum","rank":3}
{"index":{}}
{"content":"Males pga. Rygning","rank":3}
{"index":{}}
{"content":"Rengøring inden håndværker hvis nødvendigt pga. Rygning","rank":3}
{"index":{}}
{"content":"Rengøring efter fraflytter","rank":12}
{"index":{}}
{"content":"Rengøring af køleskab","rank":3}
{"index":{}}
{"content":"Dørblade og blændkarme males  pga rygning","rank":3}
{"index":{}}
{"content":"Incl. afdækning","rank":3}
{"index":{}}
{"content":"Incl. Afdækning","rank":3}
{"index":{}}
{"content":"Males 2 gange hvis nødvendigt","rank":3}
{"index":{}}
{"content":"Afriming af fryser","rank":2}
{"index":{}}
{"content":"Males 2 gange  hvis nødvendigt","rank":3}
{"index":{}}
{"content":"Vinduer rep. og mal efter hærværk","rank":2}
{"index":{}}
{"content":"Riser","rank":3}
{"index":{}}
{"content":"Afrensningen tapet + plet rep + male","rank":3}
{"index":{}}
{"content":"Persiene beslag fjernes + rep hul","rank":3}
{"index":{}}
{"content":"Vaskeskab låge udskiftrs pågrund af vandskade","rank":3}
{"index":{}}
{"content":"I forb. Udskiftning af bordplade","rank":3}
{"index":{}}
{"content":"Tape & kontakter dør afrens","rank":3}
{"index":{}}
{"content":"Males efter skader","rank":3}
{"index":{}}
{"content":"Dårlig rengøren","rank":3}
{"index":{}}
{"content":"Tape afrens","rank":3}
{"index":{}}
{"content":"Gardinstang","rank":3}
{"index":{}}
{"content":"Hul i væg","rank":12}
{"index":{}}
{"content":"Nyt håndtag","rank":3}
{"index":{}}
{"content":"Frisider","rank":4}
{"index":{}}
{"content":"Limtræ","rank":2}
{"index":{}}
{"content":"Rengøring på badeværelset","rank":4}
{"index":{}}
{"content":"Dørplade males","rank":2}
{"index":{}}
{"content":"Skader gennem lak/maling","rank":2}
{"index":{}}
{"content":"Skader gennem lak","rank":2}
{"index":{}}
{"content":"Hæk klip","rank":4}
{"index":{}}
{"content":"Græs klip","rank":2}
{"index":{}}
{"content":"Skur fejes","rank":2}
{"index":{}}
{"content":"Dør ind til stue mangler","rank":3}
{"index":{}}
{"content":"Rydning af drivhus","rank":3}
{"index":{}}
{"content":"Afsyring af bad gulv","rank":2}
{"index":{}}
{"content":"Spartel huller repareres","rank":4}
{"index":{}}
{"content":"Huller i døren","rank":2}
{"index":{}}
{"content":"Skal males hvide","rank":4}
{"index":{}}
{"content":"Huller efter gardiner","rank":10}
{"index":{}}
{"content":"Komplet","rank":2}
{"index":{}}
{"content":"Falser","rank":2}
{"index":{}}
{"content":"Der er blevet monteret ekstra gulv samt fejelister","rank":2}
{"index":{}}
{"content":"Malet lyserød","rank":2}
{"index":{}}
{"content":"Malet lyseblå i mellem låger","rank":2}
{"index":{}}
{"content":"Kant slået af samt beskidt der ikke kan fjernes samt fugt skadet","rank":2}
{"index":{}}
{"content":"Plet rep af gulv","rank":2}
{"index":{}}
{"content":"Skab ikke isat hvor opvasker har stået","rank":2}
{"index":{}}
{"content":"Opsat lamel hegn op mod hæk i dårlig stand","rank":2}
{"index":{}}
{"content":"Der er lagt laminat gulv over gulvtæppe","rank":2}
{"index":{}}
{"content":"I allle rum","rank":2}
{"index":{}}
{"content":"Anden lyskilde monteret","rank":2}
{"index":{}}
{"content":"Antenneledning fjernes","rank":2}
{"index":{}}
{"content":"Rep af skruehuller","rank":2}
{"index":{}}
{"content":"Ikke malet håndværksmæssigt korrekt","rank":5}
{"index":{}}
{"content":"Letslibning og 1 x maling","rank":2}
{"index":{}}
{"content":"Revnet mange steder","rank":2}
{"index":{}}
{"content":"Hylde ved skab","rank":2}
{"index":{}}
{"content":"Fugtskader","rank":4}
{"index":{}}
{"content":"Taperester ved vindue","rank":2}
{"index":{}}
{"content":"Påkørsel med el scooter","rank":2}
{"index":{}}
{"content":"Påkørsel med el-scooter","rank":2}
{"index":{}}
{"content":"Skade efter påkørsel med el-scooter","rank":2}
{"index":{}}
{"content":"Lejlighed er ikke rengjort til syn","rank":3}
{"index":{}}
{"content":"Dyb rids e fra fraflytning i hjørne","rank":2}
{"index":{}}
{"content":"Effekter fjernes","rank":1}
{"index":{}}
{"content":"Efter nedsænket kogeplade","rank":1}
{"index":{}}
{"content":"Manglende vedligelseholdelse gulv ødelagt","rank":3}
{"index":{}}
{"content":"Udskiftning af bordplade samt montering","rank":2}
{"index":{}}
{"content":"Brandmærke ved komfur","rank":2}
{"index":{}}
{"content":"Højskab males også indvendigt","rank":1}
{"index":{}}
{"content":"Hyldepapir","rank":1}
{"index":{}}
{"content":"Misvedligeholdt","rank":3}
{"index":{}}
{"content":"Komfuret kræver ekstraordinær rengøring/afrensning. Snavs, madrester, fastbrændt fedt, med mere","rank":1}
{"index":{}}
{"content":"Incl skabe og køl","rank":3}
{"index":{}}
{"content":"Rullebord rengøres","rank":3}
{"index":{}}
{"content":"Seng rengøres","rank":6}
{"index":{}}
{"content":"Incl afdækning","rank":6}
{"index":{}}
{"content":"M2 gælder hele lejligheden  alle rum","rank":3}
{"index":{}}
{"content":"M2 gælder hele lejligheden alle rum","rank":9}
{"index":{}}
{"content":"Gælder hele lejligheden  alle rum","rank":3}
{"index":{}}
{"content":"Gulv på tæppe","rank":3}
{"index":{}}
{"content":"Pga Nikotin","rank":2}
{"index":{}}
{"content":"Pga slid","rank":2}
{"index":{}}
{"content":"Alt rengøres pga nikotin","rank":2}
{"index":{}}
{"content":"Skader gennem maling","rank":2}
{"index":{}}
{"content":"Fuger renses for nikotin","rank":2}
{"index":{}}
{"content":"Fliser af vaskes for nikotin","rank":2}
{"index":{}}
{"content":"Gulvet meget slidt","rank":3}
{"index":{}}
{"content":"Slibning samt polering af terrazzo gulv","rank":3}
{"index":{}}
{"content":"Fastgørelse af stik","rank":3}
{"index":{}}
{"content":"Dørkarm ved hoveddør","rank":3}
{"index":{}}
{"content":"Rep af væg ved hoveddør","rank":3}
{"index":{}}
{"content":"Fjernelse af ledning ved hoveddør","rank":3}
{"index":{}}
{"content":"Dette bliver ikke udbedret","rank":4}
{"index":{}}
{"content":"Skramlet pga kørestolsbrug","rank":4}
{"index":{}}
{"content":"Skramlet pga. Kørerstol","rank":2}
{"index":{}}
{"content":"Ridset gulv mm","rank":2}
{"index":{}}
{"content":"Skrammet pga af kørestolsbruger","rank":2}
{"index":{}}
{"content":"Pga.Røg&misfarvning","rank":2}
{"index":{}}
{"content":"Pga. Hakker og ridser","rank":2}
{"index":{}}
{"content":"Pga ridser og dybe hakker i lakken","rank":2}
{"index":{}}
{"content":"Pga.Rengøring ikke udført","rank":2}
{"index":{}}
{"content":"Pga.Ridser&skrammer","rank":2}
{"index":{}}
{"content":"Sletslibning og lakering af gulve pga. Mange tidser","rank":2}
{"index":{}}
{"content":"Pga dybe ridser gennem lakken","rank":2}
{"index":{}}
{"content":"Huller i vinduer","rank":5}
{"index":{}}
{"content":"Udskiftning af tæppe","rank":2}
{"index":{}}
{"content":"Hakker og endestykke","rank":2}
{"index":{}}
{"content":"kalk på fliser","rank":2}
{"index":{}}
{"content":"For nekotin","rank":2}
{"index":{}}
{"content":"Der er ikke rengjort","rank":2}
{"index":{}}
{"content":"Ikke godkendt råderets arbejde","rank":2}
{"index":{}}
{"content":"Fugtskade","rank":7}
{"index":{}}
{"content":"Radiatorrist rep","rank":3}
{"index":{}}
{"content":"Brændt mangler samt i stykker","rank":2}
{"index":{}}
{"content":"Nogle dybe","rank":2}
{"index":{}}
{"content":"Bortskafning af køleskab","rank":2}
{"index":{}}
{"content":"Ridser og skader","rank":3}
{"index":{}}
{"content":"Letslib","rank":3}
{"index":{}}
{"content":"Males 1gang","rank":6}
{"index":{}}
{"content":"Skydedør males 1side","rank":3}
{"index":{}}
{"content":"Karm mod bad pletmales","rank":3}
{"index":{}}
{"content":"Mærker fra måtte","rank":2}
{"index":{}}
{"content":"Rundt trykmærke","rank":2}
{"index":{}}
{"content":"Monter skuffeskab efter vaskemaskine (har skabet i lejemålet","rank":3}
{"index":{}}
{"content":"Rude udskiftes","rank":1}
{"index":{}}
{"content":"Dør fuges inden malerbehandling i fyldninger","rank":1}
{"index":{}}
{"content":"Komfur i køkken","rank":1}
{"index":{}}
{"content":"Gummifuge ved bruser hjørne samt dør","rank":2}
{"index":{}}
{"content":"Løs tapet","rank":3}
{"index":{}}
{"content":"Spartling og pletmaling af paneler","rank":3}
{"index":{}}
{"content":"Små ridser og igennem lak","rank":2}
{"index":{}}
{"content":"Ekstra afkalkning af gulv ( meget kalk","rank":2}
{"index":{}}
{"content":"2 sider ridser og mærker","rank":2}
{"index":{}}
{"content":"Skydedøre mellem stuerne afvaskes pga nikotin","rank":2}
{"index":{}}
{"content":"Køleskab afvaskes","rank":2}
{"index":{}}
{"content":"Gummifuge skiftes pga fugeslip","rank":2}
{"index":{}}
{"content":"Afpropning komfurudtag","rank":1}
{"index":{}}
{"content":"Afpropning af installation komfur","rank":1}
{"index":{}}
{"content":"Omstilling af hoveddør, postkasse og lås på kælderrum og levering af 3 stk. nøgler med det nye nøglenummer, samt destruktion af nøgler på udgående nøglenummer. Bemærk, at kælderrum er aflåst med hængelås (type ABUS nr. 83/45), med undtagelse af lejemålene 1, 6, 9 og 15, der har pladedør. Inden opgaven igangsættes, kontrolleres nøglenummer på nøgler afleveret af fraflytter op i mod gældende låseplan (system C0622G) og fraflytningsrapportens oplysninger om lejemålsnummer (1-81-\"Lejemålsnummer\"-XX). Hvis der konstateres uoverensstemmelser, skal afdelingen kontaktes","rank":1}
{"index":{}}
{"content":"Den eneste form for gulvbehandling","rank":1}
{"index":{}}
{"content":"Alt er lidt beskidt og der har været røget så der er nikotin på træværk og vinduer","rank":2}
{"index":{}}
{"content":"Runde Mærker","rank":2}
{"index":{}}
{"content":"Maling af fodlister","rank":2}
{"index":{}}
{"content":"hoveddøren males indvendigt","rank":2}
{"index":{}}
{"content":"Dørplade skiftes da det ikke kan svare sig at male den","rank":2}
{"index":{}}
{"content":"Gulvet ligger på grænsen til","rank":2}
{"index":{}}
{"content":"Der har været skruet rullegardiner op i vindusrammen","rank":2}
{"index":{}}
{"content":"Baghaven ordnes for algerog ukrudt","rank":2}
{"index":{}}
{"content":"Rengøring af badeværelset","rank":2}
{"index":{}}
{"content":"Klipning af hæk og græs i forhave og badhaven + bortkørsel af diverse græs og afklipning","rank":2}
{"index":{}}
{"content":"Paneler","rank":6}
{"index":{}}
{"content":"Gerigter","rank":3}
{"index":{}}
{"content":"Bortkørsel af køleskab","rank":2}
{"index":{}}
{"content":"Kalk på samt på brusearmatur/rør","rank":1}
{"index":{}}
{"content":"Efter beslag samt hakket og skrammet vinduesplade","rank":1}
{"index":{}}
{"content":"Træværk og kontakter","rank":3}
{"index":{}}
{"content":"Bordplade ødelagt af varm gryde","rank":2}
{"index":{}}
{"content":"Afvaskes for nicotin","rank":2}
{"index":{}}
{"content":"Inge nøgler","rank":3}
{"index":{}}
{"content":"Ny lås og postkasse","rank":3}
{"index":{}}
{"content":"Vægge og lofter afvaskes for nicotin før normalistandsættelse","rank":2}
{"index":{}}
{"content":"Skur fejes ned og gulv fejes","rank":2}
{"index":{}}
{"content":"Gasfyr og rør rengøres","rank":2}
{"index":{}}
{"content":"Dør ødelagt af hjælpe midler","rank":4}
{"index":{}}
{"content":"Extra rengøring af radiatorer pga. nicotin","rank":2}
{"index":{}}
{"content":"Dør males","rank":2}
{"index":{}}
{"content":"Ødelagt tapet","rank":7}
{"index":{}}
{"content":"2 sider","rank":6}
{"index":{}}
{"content":"Ødelagt gulv og urin igennem gulv","rank":2}
{"index":{}}
{"content":"Maling pga. huller efter gardiner","rank":3}
{"index":{}}
{"content":"1 x spærregrunder","rank":2}
{"index":{}}
{"content":"Fastlåsning af ventil","rank":1}
{"index":{}}
{"content":"Effekter fjernes minus paller","rank":1}
{"index":{}}
{"content":"Gummilister renses","rank":2}
{"index":{}}
{"content":"Maling pga. hul og ridser","rank":3}
{"index":{}}
{"content":"Pga. mulig forkert behanling males vægge. Undersøges om det er korrekt ellers hæftes","rank":3}
{"index":{}}
{"content":"Udlejer betaler","rank":3}
{"index":{}}
{"content":"Hvidevarer","rank":7}
{"index":{}}
{"content":"Der er flere brugs mærker i karmen på gangen","rank":2}
{"index":{}}
{"content":"Håndtering","rank":2}
{"index":{}}
{"content":"Fodlister males som vi plejer","rank":2}
{"index":{}}
{"content":"Udføres som vi plejer","rank":2}
{"index":{}}
{"content":"Pletspartling og færdigmaling","rank":6}
{"index":{}}
{"content":"Udføres efter aftalt standard","rank":14}
{"index":{}}
{"content":"Spartling og pletmaling","rank":3}
{"index":{}}
{"content":"Males efter aftalt standard","rank":4}
{"index":{}}
{"content":"Udføres som nomalt rengøring ved en standard fraflytning","rank":2}
{"index":{}}
{"content":"Bliver udført på Ejendomsfunk. medgået tid","rank":2}
{"index":{}}
{"content":"Ny loftrosette","rank":6}
{"index":{}}
{"content":"Underside afkalkning","rank":2}
{"index":{}}
{"content":"Rep","rank":4}
{"index":{}}
{"content":"Ikke malet og de er misfarvet","rank":2}
{"index":{}}
{"content":"Ridser i entredør udvending udbedres","rank":2}
{"index":{}}
{"content":"Rider og mærker","rank":2}
{"index":{}}
{"content":"2 gange","rank":2}
{"index":{}}
{"content":"Fodlister ridset pga kørestolsbrug","rank":1}
{"index":{}}
{"content":"Oprydning af div. Effekter","rank":1}
{"index":{}}
{"content":"Gulv gennemslidt i lak og med malerpletter","rank":3}
{"index":{}}
{"content":"Rep af væg pga grafitti. Vask og 2 x spærregrund","rank":2}
{"index":{}}
{"content":"Spartling af hul lavet på dørflade","rank":2}
{"index":{}}
{"content":"Spartles og males pga sømhuller lavet på skabsside","rank":2}
{"index":{}}
{"content":"Males pga slagmærker og ridser","rank":2}
{"index":{}}
{"content":"Flis slået af karm","rank":2}
{"index":{}}
{"content":"Fuld slibning nødvendig pga","rank":2}
{"index":{}}
{"content":"Ovn meget snavset","rank":2}
{"index":{}}
{"content":"Emhætte meget snavset","rank":2}
{"index":{}}
{"content":"Spartling af huller samt grafitti på grønne dør til bad begge sider","rank":2}
{"index":{}}
{"content":"Ovn meget misligeholdt","rank":2}
{"index":{}}
{"content":"Maling af dørkarm i følge normal standart","rank":2}
{"index":{}}
{"content":"Dørplade skiftes da den er meget opfugtet (lugter meget kraftigt af kattetis","rank":2}
{"index":{}}
{"content":"Radiator meget misfarvet og males","rank":2}
{"index":{}}
{"content":"123456 oprettelse af standardnote","rank":2}
{"index":{}}
{"content":"Dørplade rengøres på 1 side","rank":1}
{"index":{}}
{"content":"Skabsside skiftes (lugter af kattetis","rank":2}
{"index":{}}
{"content":"Skabe rengøres ind","rank":1}
{"index":{}}
{"content":"Skabe rengøres indv og udv","rank":1}
{"index":{}}
{"content":"Bordplade renhgøres","rank":1}
{"index":{}}
{"content":"Håndvask rengøres","rank":1}
{"index":{}}
{"content":"Forbehold for gulvet i hele lejemålet","rank":2}
{"index":{}}
{"content":"Blbatteri afkalkes","rank":1}
{"index":{}}
{"content":"Køleskab rengøres indv","rank":1}
{"index":{}}
{"content":"Køleskab rengøres indv udv","rank":1}
{"index":{}}
{"content":"Kontakter rengøres for støv fedt","rank":1}
{"index":{}}
{"content":"Udluftning rengøres","rank":1}
{"index":{}}
{"content":"Vinduer pudses indv","rank":1}
{"index":{}}
{"content":"Vinduerpudses indv udv","rank":1}
{"index":{}}
{"content":"Kontakter og ventilation spøjst males","rank":2}
{"index":{}}
{"content":"Alle skabe vaskes i hele lejemålet vaskes helt ned til ren bund","rank":2}
{"index":{}}
{"content":"Rengøres og polering","rank":4}
{"index":{}}
{"content":"Dørplade afvaskning","rank":2}
{"index":{}}
{"content":"Vinduer er meget misfarvet","rank":2}
{"index":{}}
{"content":"Terrassedør og vinduer males","rank":2}
{"index":{}}
{"content":"Skabsside males","rank":2}
{"index":{}}
{"content":"Vindue males","rank":2}
{"index":{}}
{"content":"Oprettet af Jess fra egen bruger. Er den tilføjet til LM admin","rank":1}
{"index":{}}
{"content":111,"rank":1}
{"index":{}}
{"content":1112,"rank":1}
{"index":{}}
{"content":1,"rank":1}
{"index":{}}
{"content":"Pga. Huller fra gardin","rank":6}
{"index":{}}
{"content":"Radiatorer males pga. Div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Maling af fodlister Pga.Huller fra søm efter fejelist","rank":1}
{"index":{}}
{"content":"Maling af karme Pga. Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Maling på kontakter og stik","rank":2}
{"index":{}}
{"content":"Fliser rider og mærker","rank":4}
{"index":{}}
{"content":"Sprøjtemaling af døre","rank":2}
{"index":{}}
{"content":"Maling af døre Pga. Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Hvis den skal skiftes","rank":4}
{"index":{}}
{"content":"Ridser og mærker på top pladen","rank":4}
{"index":{}}
{"content":"Løs plade","rank":2}
{"index":{}}
{"content":"Vaskes af for nikotin","rank":2}
{"index":{}}
{"content":"Tapet arbejde ifm. Køkkenskift","rank":2}
{"index":{}}
{"content":"Vægge gives stopgrund pga. Misfarvning da de ikke kan dækkes af maling","rank":1}
{"index":{}}
{"content":"Lofter gives stropgrund pga. Misfarvning og ikke kan dækkes af maling","rank":1}
{"index":{}}
{"content":"Vindues ramme males pga. Skruehuller","rank":1}
{"index":{}}
{"content":"Fodpaneler males pga. Skrammer og hakker","rank":1}
{"index":{}}
{"content":"Fodpaneler males pga. Sømhuller","rank":1}
{"index":{}}
{"content":"Dør karme males pga. Ridser og hakker","rank":1}
{"index":{}}
{"content":"Gulve gives slet lak  pga. Ridser samt nedslidning af lakken til rå træ","rank":1}
{"index":{}}
{"content":"På grund af utilstrækkelig rengøring","rank":1}
{"index":{}}
{"content":"Gulve høvles pga. Nedslidning af lakken til rå træ og det er blevet sort / grå","rank":1}
{"index":{}}
{"content":"Rengøring før hånværker da lejligheden ikke var rengjort ved fraflytning","rank":1}
{"index":{}}
{"content":"Fodpaneler males pga. Overmaling af vægfarve","rank":1}
{"index":{}}
{"content":"På grund af skruehuller","rank":1}
{"index":{}}
{"content":"På grund af vandskade","rank":1}
{"index":{}}
{"content":"Dørkarme males pga. Overmaling af vægfarve","rank":1}
{"index":{}}
{"content":"På grund af skrammer på træværk","rank":1}
{"index":{}}
{"content":"Pga. kraftig tilsmudsning der ikke kunne afrenses tilfredsstillende","rank":2}
{"index":{}}
{"content":"Pga. af tilsmudsning der ikke var fjernet ved synet","rank":2}
{"index":{}}
{"content":"Pga. manglende nøgle ved synet","rank":2}
{"index":{}}
{"content":"Pga. manglende vaskekort ved synet","rank":2}
{"index":{}}
{"content":"Pga. manglende adgangskort ved synet","rank":2}
{"index":{}}
{"content":"Pga. huller efter beslag og ridser i malingen","rank":2}
{"index":{}}
{"content":"Pga. ridser og skrammer i lakken","rank":1}
{"index":{}}
{"content":"Skrammer/ ridser efter kørestol eller rollator","rank":2}
{"index":{}}
{"content":"Pga. skruehuller","rank":2}
{"index":{}}
{"content":"Pga. manglende rengøring","rank":24}
{"index":{}}
{"content":"Pga. vandskade","rank":2}
{"index":{}}
{"content":"Pga. huller i døren","rank":2}
{"index":{}}
{"content":"Pga. skrammede dørkarme","rank":2}
{"index":{}}
{"content":"Pga. skrammede fodlister","rank":2}
{"index":{}}
{"content":"Nedtagning af hegn da dette ikke var fjernet ved synet","rank":2}
{"index":{}}
{"content":"Omlægning af bed til græs da dette ikke var gjort ved synet","rank":2}
{"index":{}}
{"content":"Tømning af skur / kælderrum da dette ikke var tømt ved synet","rank":2}
{"index":{}}
{"content":"Komfur mangler","rank":1}
{"index":{}}
{"content":"Dørkarm males x 2","rank":2}
{"index":{}}
{"content":"Afkalkning og let rengøring","rank":1}
{"index":{}}
{"content":"Væg- og tapet-reparation","rank":2}
{"index":{}}
{"content":"Tapet arbejde ved køkken skift","rank":2}
{"index":{}}
{"content":"Emhætte udsk","rank":1}
{"index":{}}
{"content":"Mangler i stuen","rank":2}
{"index":{}}
{"content":"Fjerne trægulv altan","rank":2}
{"index":{}}
{"content":"Pga fugtskader","rank":2}
{"index":{}}
{"content":"Komfur og emhætte udsk","rank":1}
{"index":{}}
{"content":"Tal med afdelingen","rank":2}
{"index":{}}
{"content":"Hoved rengøring","rank":3}
{"index":{}}
{"content":"Afrens af lak på pvc fod lister","rank":2}
{"index":{}}
{"content":"Terrazzo slibes og olie behandles","rank":2}
{"index":{}}
{"content":"Males efter hunde/ katteangreb","rank":1}
{"index":{}}
{"content":"Ridset/skadet + lugt af hund/kat","rank":1}
{"index":{}}
{"content":"Der er blevet malet på dørkarm med hvid maling","rank":2}
{"index":{}}
{"content":"Radiator males x 2","rank":4}
{"index":{}}
{"content":"Rør til radiator males x 2","rank":2}
{"index":{}}
{"content":"Karm rundt om vindue males x 2","rank":2}
{"index":{}}
{"content":"Males x 2","rank":2}
{"index":{}}
{"content":"Plade over entreskab males x 2","rank":2}
{"index":{}}
{"content":"Vindue males x 2","rank":2}
{"index":{}}
{"content":"Maling efter vandskade","rank":1}
{"index":{}}
{"content":"Trappe komplet alt incl. Og gelænder","rank":2}
{"index":{}}
{"content":"Opsætning af tapet 6 baner","rank":2}
{"index":{}}
{"content":"Gitter males x 2 på begge sider","rank":2}
{"index":{}}
{"content":"Rep efter vand på loft","rank":2}
{"index":{}}
{"content":"Sokkel males x 2","rank":2}
{"index":{}}
{"content":"Plade over overskabe males x 2","rank":2}
{"index":{}}
{"content":"Rep af loft og behandl efter fugt","rank":2}
{"index":{}}
{"content":"Trin til altandør grovslib x 3 lak","rank":2}
{"index":{}}
{"content":"Ridser gennemslid","rank":2}
{"index":{}}
{"content":"Mærker/slid","rank":2}
{"index":{}}
{"content":"Male kontakter","rank":2}
{"index":{}}
{"content":"Gulv slibes","rank":4}
{"index":{}}
{"content":"Farveskift","rank":18}
{"index":{}}
{"content":"Farveskift på en væg","rank":2}
{"index":{}}
{"content":"Maling af dørkarm og gerigter","rank":5}
{"index":{}}
{"content":"Kontakt sidder i dørkarm","rank":2}
{"index":{}}
{"content":"Der bliver sat nye karme på i dette rum","rank":2}
{"index":{}}
{"content":"Maling af dørplader","rank":2}
{"index":{}}
{"content":"maling af fodlister","rank":2}
{"index":{}}
{"content":"Rør til radiator males","rank":2}
{"index":{}}
{"content":"Lukning af huller i plastliste efter gardiner","rank":2}
{"index":{}}
{"content":"Nedtagning af gardiner","rank":4}
{"index":{}}
{"content":"Hegn er ikke håndværksmæssiget korrekt udført","rank":2}
{"index":{}}
{"content":"Skab sættes på plads","rank":2}
{"index":{}}
{"content":"Det er kun de ting der høre til lejlighed der skal blive tilbage","rank":2}
{"index":{}}
{"content":"Kam ikke rengøres og er skadet","rank":1}
{"index":{}}
{"content":"Vi skal lige tale om favevalg til gulvet","rank":2}
{"index":{}}
{"content":"håndværkere rengøring","rank":2}
{"index":{}}
{"content":"Rengøres for støv","rank":2}
{"index":{}}
{"content":"Skuffer skal også rengøres","rank":2}
{"index":{}}
{"content":"Der er linoleumsgulv","rank":2}
{"index":{}}
{"content":"Skab og låger males","rank":2}
{"index":{}}
{"content":"Skab vaskes","rank":2}
{"index":{}}
{"content":"Rengøres som vi plejer","rank":2}
{"index":{}}
{"content":"Fyldning","rank":2}
{"index":{}}
{"content":"Vinduesplade lakeres","rank":2}
{"index":{}}
{"content":"Trækværk","rank":2}
{"index":{}}
{"content":"Dørtrin olieres","rank":6}
{"index":{}}
{"content":"Demontering af persienner","rank":5}
{"index":{}}
{"content":"Mange dybe mærker / ridser","rank":2}
{"index":{}}
{"content":"Afkalkning af gulv / bruseniche","rank":2}
{"index":{}}
{"content":"Underside af blandingsbatteri","rank":2}
{"index":{}}
{"content":"pga. ridser og skrammer","rank":1}
{"index":{}}
{"content":"Udsk pga nikotin","rank":1}
{"index":{}}
{"content":"Vinduer og terrassedøre","rank":2}
{"index":{}}
{"content":"Afdækning","rank":32}
{"index":{}}
{"content":"Hoveddør malen på begge sider","rank":2}
{"index":{}}
{"content":"Rep af skuffeside og skuffer","rank":2}
{"index":{}}
{"content":"Hvis det er muligt at skifte frontlisten gøres dette. Ellers skiftes bordpladen","rank":2}
{"index":{}}
{"content":"Ukrudt ved belægning","rank":2}
{"index":{}}
{"content":"Hoveddør vaskes til ren bund","rank":2}
{"index":{}}
{"content":"Dørplader lakeres","rank":2}
{"index":{}}
{"content":"Der er to knækket fliser på badeværelset","rank":2}
{"index":{}}
{"content":"Der mangler en hovededørs nøgle og en postkasse nøgle","rank":2}
{"index":{}}
{"content":"Forbehold for rullegardiner i kælderrum","rank":2}
{"index":{}}
{"content":"Maling af radiator pga. Skrammer og ridser","rank":2}
{"index":{}}
{"content":"Pga . Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Maling af vinduer pga. Huller og skrammer","rank":1}
{"index":{}}
{"content":"Udskift af dør pga. Store huller i dørplader","rank":2}
{"index":{}}
{"content":"Afrens tapet og opsæt af tapet","rank":1}
{"index":{}}
{"content":"Udskift af bordplade. Pga huller i bordplade","rank":2}
{"index":{}}
{"content":"Da dette ikke er udført","rank":3}
{"index":{}}
{"content":"Maling af låge","rank":2}
{"index":{}}
{"content":"Maling fordør","rank":1}
{"index":{}}
{"content":"Sprøjtemaling af låger","rank":2}
{"index":{}}
{"content":"Loft vindue","rank":2}
{"index":{}}
{"content":"Maling af gulv","rank":5}
{"index":{}}
{"content":"Rep af vinduer pga. Huler fra gardin","rank":1}
{"index":{}}
{"content":"Maling af døre. Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Maling af Fodlister Pga. Huller fra søm efter fejelister","rank":1}
{"index":{}}
{"content":"Maling af Karme Pga. Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Pga. Rengøring ikke udført","rank":1}
{"index":{}}
{"content":"Pga. Ridser og skrammer","rank":25}
{"index":{}}
{"content":"Pga. Røg og misfavinig","rank":1}
{"index":{}}
{"content":"Afrens tapet og opsæt at tapet","rank":1}
{"index":{}}
{"content":"Maling af Vinduer pga. Huller og skrammer","rank":1}
{"index":{}}
{"content":"Maling af fordør","rank":2}
{"index":{}}
{"content":"Rep af vinduer pga. Huller fra gardin","rank":1}
{"index":{}}
{"content":"Pga. Ridser og skammer","rank":2}
{"index":{}}
{"content":"Skader på gulv hvor lak er væk . Gulv fejlbehandlet af lejer","rank":2}
{"index":{}}
{"content":"Lysning","rank":4}
{"index":{}}
{"content":"Demontering og bortskafning af div indbo","rank":2}
{"index":{}}
{"content":"Også skur og have","rank":2}
{"index":{}}
{"content":"Dør plade skiftes","rank":2}
{"index":{}}
{"content":"Skift af liste til bordplade ved komfur","rank":2}
{"index":{}}
{"content":"males","rank":2}
{"index":{}}
{"content":"Maling af fordør pga. Ridser og skrammer","rank":1}
{"index":{}}
{"content":"Huller lukkes","rank":2}
{"index":{}}
{"content":"Alle kontakter vaskes ned","rank":2}
{"index":{}}
{"content":"Efter persinner","rank":2}
{"index":{}}
{"content":"Slibes","rank":9}
{"index":{}}
{"content":"Tømning af lejemål for diverse og køre det på genbrugen","rank":2}
{"index":{}}
{"content":"Nedtagning af kontakt i køkkenet og ud til gang","rank":2}
{"index":{}}
{"content":"Ramme er knækket","rank":2}
{"index":{}}
{"content":"Ordnes og tømmes for diverse","rank":4}
{"index":{}}
{"content":"Facaden renses for alger","rank":2}
{"index":{}}
{"content":"Renses for alger","rank":2}
{"index":{}}
{"content":"Fylde sand mellem fliser","rank":2}
{"index":{}}
{"content":"Slå græsset og rive det sammen","rank":2}
{"index":{}}
{"content":"Pga. Mangler nøgle","rank":1}
{"index":{}}
{"content":"Skab til opvaskemaskine mangler. (det står måske i skur","rank":2}
{"index":{}}
{"content":"Udskift af belægning Pga. huller","rank":1}
{"index":{}}
{"content":"Der opsættes tapet hvor dette mangler","rank":1}
{"index":{}}
{"content":"Gulv slibes og lakeres pga slid og ridser","rank":1}
{"index":{}}
{"content":"Gulv. Let slibes og lakeres","rank":1}
{"index":{}}
{"content":"Dørtrin slibes og lakeres","rank":1}
{"index":{}}
{"content":"Toilet rengøres","rank":1}
{"index":{}}
{"content":"Brusekabine afkalkes","rank":1}
{"index":{}}
{"content":"Spejl pudses","rank":1}
{"index":{}}
{"content":"Bordplade rengøres","rank":1}
{"index":{}}
{"content":"Komfur rengøres indv og udv","rank":1}
{"index":{}}
{"content":"Komfurplads rengøres","rank":1}
{"index":{}}
{"content":"Komfur rengøres indv også plader","rank":1}
{"index":{}}
{"content":"Lampeudtag i loft udskiftes","rank":1}
{"index":{}}
{"content":"Gerigter males","rank":1}
{"index":{}}
{"content":"Gerigter og fodlister males","rank":1}
{"index":{}}
{"content":"Dørplade males på  begge sider","rank":1}
{"index":{}}
{"content":"Dørkarm og og dørplade males","rank":1}
{"index":{}}
{"content":"Gulv vaskes","rank":2}
{"index":{}}
{"content":"Effekter fjernes og bortskaffes","rank":1}
{"index":{}}
{"content":"Effeketer fjernes og opbevares i 3 mdr","rank":1}
{"index":{}}
{"content":"Køleskab udskiftes","rank":4}
{"index":{}}
{"content":"Justering af låger","rank":2}
{"index":{}}
{"content":"Misvedligehold","rank":2}
{"index":{}}
{"content":"Af og påmontering ag vask og bl batt","rank":2}
{"index":{}}
{"content":"Huller i låge","rank":2}
{"index":{}}
{"content":"Fugt skadet","rank":2}
{"index":{}}
{"content":"Grimt slibes og lakeret","rank":2}
{"index":{}}
{"content":"Tjek div. Kontakter og udtag","rank":2}
{"index":{}}
{"content":"Efterspænd håndtag","rank":2}
{"index":{}}
{"content":"Afkalk og linoleum rengøring","rank":2}
{"index":{}}
{"content":"Der mangler nøgler","rank":1}
{"index":{}}
{"content":"Dør skadet","rank":1}
{"index":{}}
{"content":"Oprydning i have/ udearealer","rank":1}
{"index":{}}
{"content":"Omlægning af låse i system","rank":4}
{"index":{}}
{"content":"Ekstra rengøring efter urin","rank":2}
{"index":{}}
{"content":"Gummifuge omkring gulvafløb udskiftes","rank":2}
{"index":{}}
{"content":"Gennemslidninger gennem lak","rank":1}
{"index":{}}
{"content":"Diverse mærker malers eller dør males","rank":2}
{"index":{}}
{"content":"Gulvet har lidt kalk","rank":2}
{"index":{}}
{"content":"Plade i entre males x 2","rank":2}
{"index":{}}
{"content":"Nogle meget dybe","rank":2}
{"index":{}}
{"content":"Sod / os / tobak","rank":2}
{"index":{}}
{"content":"Efter gulvslib","rank":9}
{"index":{}}
{"content":"Skift af afbrydere ved døren","rank":3}
{"index":{}}
{"content":"Fjernelse af ledninger fra gammelt telefonstik","rank":3}
{"index":{}}
{"content":"Udskiftes til iføs nyeste model","rank":3}
{"index":{}}
{"content":"Ødelagte stave udskiftes","rank":1}
{"index":{}}
{"content":"Finer limes hvor det har sluppet","rank":2}
{"index":{}}
{"content":"Ridser og gennemslidning af lak","rank":2}
{"index":{}}
{"content":"Gult","rank":8}
{"index":{}}
{"content":"Fjerne ridser med skrabejern inden letslib","rank":2}
{"index":{}}
{"content":"Spærre grunder","rank":2}
{"index":{}}
{"content":"Høj skabe males indvendigt","rank":2}
{"index":{}}
{"content":"Rydning og bortkørsel af indbo","rank":2}
{"index":{}}
{"content":"Systemlåse omkodes","rank":2}
{"index":{}}
{"content":"Armatur","rank":2}
{"index":{}}
{"content":"Slidt og ridser og hakker","rank":2}
{"index":{}}
{"content":"Alle kontakter males","rank":4}
{"index":{}}
{"content":"Gulvet males","rank":2}
{"index":{}}
{"content":"Køkkenvask rengøres","rank":4}
{"index":{}}
{"content":"Lukke huller efter alarmsystem","rank":2}
{"index":{}}
{"content":"Badeværelset rengøres","rank":2}
{"index":{}}
{"content":"Gennemslidninger og tape ikke fjernet","rank":1}
{"index":{}}
{"content":"Tape ikke fjernet","rank":1}
{"index":{}}
{"content":"Revner mellem sandliste og fodpanel","rank":1}
{"index":{}}
{"content":"Dybe hakker","rank":1}
{"index":{}}
{"content":"Rude ridset","rank":3}
{"index":{}}
{"content":"Pga misfarvning og røg","rank":1}
{"index":{}}
{"content":"Pga . Gennem slid af lakken og ridser","rank":1}
{"index":{}}
{"content":"Gulvet slidt gennem lakken","rank":3}
{"index":{}}
{"content":"Nedtagning af tapet. Vægge sparles op","rank":3}
{"index":{}}
{"content":"Udskiftning af stikkontakt","rank":6}
{"index":{}}
{"content":"Sætnings skade på vægge","rank":2}
{"index":{}}
{"content":"Tapet fjernes. Filt op","rank":3}
{"index":{}}
{"content":"Nedtagning af lampe","rank":6}
{"index":{}}
{"content":"Vindues plade","rank":4}
{"index":{}}
{"content":"Teknikskab værn","rank":2}
{"index":{}}
{"content":"Rep + filt op","rank":3}
{"index":{}}
{"content":"Ny dør. Rådden","rank":3}
{"index":{}}
{"content":"Solbænke olie behandles","rank":2}
{"index":{}}
{"content":"Efterladte effekter bortskaffes","rank":2}
{"index":{}}
{"content":"Justering af have","rank":16}
{"index":{}}
{"content":"Rammer om glasparti over skabe males","rank":2}
{"index":{}}
{"content":"Rep. væg omkring kontakter og rep. Med rutex","rank":2}
{"index":{}}
{"content":"Fugning ved skyggelister","rank":1}
{"index":{}}
{"content":"Spartelhuller og tapet repareres","rank":2}
{"index":{}}
{"content":"Ikke tiltrækkeligt rengjort","rank":3}
{"index":{}}
{"content":"Slidtage og ridser gennem lak","rank":3}
{"index":{}}
{"content":"Rep. af borehuller i vådzone","rank":3}
{"index":{}}
{"content":"Lampe i loft nedtages","rank":3}
{"index":{}}
{"content":"hul i væv","rank":2}
{"index":{}}
{"content":"Udvendig vinduespolering foretages af afdeling. Er ikke Flyt B","rank":2}
{"index":{}}
{"content":"Dør ødelagt","rank":3}
{"index":{}}
{"content":"Ikke malbar","rank":6}
{"index":{}}
{"content":"Rengøring samt afkalkning","rank":3}
{"index":{}}
{"content":"Rep dørkarm","rank":3}
{"index":{}}
{"content":"Slibes og olieres","rank":3}
{"index":{}}
{"content":"Væggene er ikke malbar grundet nikotin","rank":3}
{"index":{}}
{"content":"Vægge og loft er ikke malbar grundet nikotin","rank":3}
{"index":{}}
{"content":"Rydning af køkken for køleskab","rank":3}
{"index":{}}
{"content":"Rep/ udskiftning af ødelagte altankasser","rank":3}
{"index":{}}
{"content":"Rep. af lille hak i bund af dørplade entre/bad","rank":2}
{"index":{}}
{"content":"Rep. af afskalninger på karme stue/bad","rank":2}
{"index":{}}
{"content":"Blændplader ved vinduer","rank":2}
{"index":{}}
{"content":"Manglende rengøring nicotin mættede loft","rank":3}
{"index":{}}
{"content":"Slid fra tæppe samt mærke fra udifinerbart rengørings middel","rank":2}
{"index":{}}
{"content":"Bule væg","rank":2}
{"index":{}}
{"content":"Tus på radiator","rank":2}
{"index":{}}
{"content":"Ridser og mærker hakker","rank":2}
{"index":{}}
{"content":"Ved syn manglede 1 stk. nøgle at blive afleveret. Ny systemcylinder + 3 nye nøgler beløber sig til ca. 2000 kr. - hvis nøgle afleveres senest 25/2-2019 frafalder dette krav","rank":2}
{"index":{}}
{"content":"Lameller og rør ved loft","rank":2}
{"index":{}}
{"content":"Puds af vinduer","rank":1}
{"index":{}}
{"content":"Pga da dette ikke er gjort","rank":1}
{"index":{}}
{"content":"Alle rum","rank":5}
{"index":{}}
{"content":"Pga. Røg og misfarvning","rank":4}
{"index":{}}
{"content":"Feje gulvet inden afdækning kan udføres","rank":2}
{"index":{}}
{"content":"3x fuldslib og hd lak","rank":2}
{"index":{}}
{"content":"3x fulddslib og hd lak","rank":2}
{"index":{}}
{"content":"Liglugt","rank":6}
{"index":{}}
{"content":"Udskiftes grundet svær misligeholdelse","rank":3}
{"index":{}}
{"content":"Udskiftes grundet svær misligeholdelse samt liglugt","rank":9}
{"index":{}}
{"content":"Udskiftning af ødelagt dørtelefon","rank":3}
{"index":{}}
{"content":"Rengøring af stikkontakter og afbrydere","rank":3}
{"index":{}}
{"content":"Fugt skade kanter","rank":2}
{"index":{}}
{"content":"Altandør lister","rank":2}
{"index":{}}
{"content":"Alt træværk males hvidt","rank":2}
{"index":{}}
{"content":"Reperation af skabe og låger","rank":2}
{"index":{}}
{"content":"Skader kalk","rank":2}
{"index":{}}
{"content":"Hul i bordpladen ledning","rank":2}
{"index":{}}
{"content":"Af og påmontering af vand og vask","rank":2}
{"index":{}}
{"content":"Demontere og Fjerne vaskemaskine","rank":2}
{"index":{}}
{"content":"Dør plade","rank":2}
{"index":{}}
{"content":"Mangler et skab og sokkel","rank":2}
{"index":{}}
{"content":"Fjerne hylde og skuffe","rank":2}
{"index":{}}
{"content":"Skæve","rank":2}
{"index":{}}
{"content":"Slibes og olie ridser og mærker","rank":2}
{"index":{}}
{"content":"Montere ny emhætte","rank":2}
{"index":{}}
{"content":"Fronter og tanggenter stikkontakter og lameudtag","rank":2}
{"index":{}}
{"content":"Udskiftning af 15 enheder","rank":2}
{"index":{}}
{"content":"2 frisider males","rank":2}
{"index":{}}
{"content":"Mørke fugt mærker","rank":2}
{"index":{}}
{"content":"Lysning ved vindue","rank":2}
{"index":{}}
{"content":"“Emhætte” i køkken","rank":2}
{"index":{}}
{"content":"Montering af manglende brusestang","rank":3}
{"index":{}}
{"content":"Sokkelkant v. terrazzo gulv","rank":2}
{"index":{}}
{"content":"Tæppe","rank":2}
{"index":{}}
{"content":"Komfur leveres og tilsluttes","rank":2}
{"index":{}}
{"content":"Manglende nøgle = omlægning af systemlås","rank":6}
{"index":{}}
{"content":"Rengøring af vægge samt fodliste","rank":3}
{"index":{}}
{"content":"17 meter Gælder Hele lejligheden","rank":3}
{"index":{}}
{"content":"Resterende træværk pletmales efter behov","rank":3}
{"index":{}}
{"content":"Incl. Skabe skuffer seng og bad","rank":3}
{"index":{}}
{"content":"Spærrende maling efter rygning","rank":3}
{"index":{}}
{"content":"gælder hele lejligheden","rank":3}
{"index":{}}
{"content":"Træværk pletmales efter behov","rank":3}
{"index":{}}
{"content":"Runde mærker","rank":2}
{"index":{}}
{"content":"Fliser er sorte skal have flise rens","rank":2}
{"index":{}}
{"content":"Fuge i bund ved lysninger","rank":2}
{"index":{}}
{"content":"Skrammer/ hakker","rank":2}
{"index":{}}
{"content":"Beplantning i altankummer","rank":3}
{"index":{}}
{"content":"Der er struktur tapet","rank":3}
{"index":{}}
{"content":"Efter strukturtapet","rank":3}
{"index":{}}
{"content":"Malerklatter","rank":2}
{"index":{}}
{"content":"Paneler og gerigter er spartlet flere steder","rank":3}
{"index":{}}
{"content":"Alt træværk gennemgås og behandles til malbar overflade","rank":3}
{"index":{}}
{"content":"Tæppetapetester","rank":3}
{"index":{}}
{"content":"Inkl. Dørtrin","rank":6}
{"index":{}}
{"content":"Der er blyindfattede ruder i dørene","rank":3}
{"index":{}}
{"content":"Vinduesplader er med folie","rank":3}
{"index":{}}
{"content":"Efter istandsættelse","rank":3}
{"index":{}}
{"content":"Gulvlister mangler generelt","rank":3}
{"index":{}}
{"content":"Huller i vådzone","rank":7}
{"index":{}}
{"content":"Dør mod værelse 1 er tapetseret","rank":3}
{"index":{}}
{"content":"Der mangler vindueslysning","rank":3}
{"index":{}}
{"content":"Mangler vedhæftning","rank":3}
{"index":{}}
{"content":"Kontakt mangler tangent","rank":3}
{"index":{}}
{"content":"Tapet på skabslåger","rank":3}
{"index":{}}
{"content":"Skab tapetseret indvendigt","rank":3}
{"index":{}}
{"content":"Tal med driften om hvad der skal ske","rank":3}
{"index":{}}
{"content":"Rust omkring afløb","rank":3}
{"index":{}}
{"content":"Demontering af bøjle","rank":3}
{"index":{}}
{"content":"Rep. Eller udskiftning af ca 10 fliser med huller","rank":3}
{"index":{}}
{"content":"Afmontering samt fjerne lejers komfur","rank":3}
{"index":{}}
{"content":"Let snavset i ovn","rank":3}
{"index":{}}
{"content":"Nedtagning af fliser og oppudsning klar til tapet","rank":3}
{"index":{}}
{"content":"Lettere rengøring af hele køkkenet efter istansættelse","rank":3}
{"index":{}}
{"content":"Skab over plads til køleskab mangler","rank":3}
{"index":{}}
{"content":"Indretning i skab bortskaffes","rank":3}
{"index":{}}
{"content":"Højskab væg rep og males","rank":3}
{"index":{}}
{"content":"Faldstamme ved komfur skaller","rank":3}
{"index":{}}
{"content":"Skureliste mangler lak","rank":3}
{"index":{}}
{"content":"1 nøgle mangler","rank":6}
{"index":{}}
{"content":"Stærkt tilkalket","rank":6}
{"index":{}}
{"content":"Stærk tilkalket","rank":3}
{"index":{}}
{"content":"Afskallet forkert brug","rank":3}
{"index":{}}
{"content":"Skade på linoleumgulv","rank":2}
{"index":{}}
{"content":"Fejning af kælderrum","rank":3}
{"index":{}}
{"content":"Pga gardin huller","rank":2}
{"index":{}}
{"content":"Pga. Rygning","rank":1}
{"index":{}}
{"content":"Skift af gulv","rank":2}
{"index":{}}
{"content":"Renses for ukrudt og renses med højtryksrenser","rank":2}
{"index":{}}
{"content":"Skimmel","rank":4}
{"index":{}}
{"content":"Standard","rank":2}
{"index":{}}
{"content":"Skodt","rank":2}
{"index":{}}
{"content":"Stege fedt","rank":2}
{"index":{}}
{"content":"Efter nikotinen","rank":2}
{"index":{}}
{"content":"Pga. huller efter gardiner","rank":10}
{"index":{}}
{"content":"Stort vindue i køkken stue","rank":3}
{"index":{}}
{"content":"Vinduer i køkken alrum","rank":3}
{"index":{}}
{"content":"Rep og mal af radiator","rank":3}
{"index":{}}
{"content":"Alle døre i fordelimgs gang","rank":3}
{"index":{}}
{"content":"Alle karme i fordelingsgang","rank":3}
{"index":{}}
{"content":"Hele trapper","rank":3}
{"index":{}}
{"content":"Liste på bad fjernes","rank":3}
{"index":{}}
{"content":"Træværk hoveddørs parti","rank":3}
{"index":{}}
{"content":"Træværk ved dør","rank":3}
{"index":{}}
{"content":"Fodpanel i hele underetage","rank":3}
{"index":{}}
{"content":"Træværk ved trappe","rank":3}
{"index":{}}
{"content":"Træværk ved vindue","rank":3}
{"index":{}}
{"content":"Huller i træværk ved vindue","rank":3}
{"index":{}}
{"content":"2 stk toilet skabe m. Side stykke","rank":3}
{"index":{}}
{"content":"Gennemførsel af vand til vaskemaskine i skab","rank":3}
{"index":{}}
{"content":"Lukning af ca 20 huller i fuger","rank":3}
{"index":{}}
{"content":"Der er 11 facadeplader der er revner nogle er rep","rank":3}
{"index":{}}
{"content":"Maling krympet","rank":1}
{"index":{}}
{"content":"Efter beslag i vinduesramme","rank":1}
{"index":{}}
{"content":"Test 111","rank":1}
{"index":{}}
{"content":"Ovn kammer","rank":2}
{"index":{}}
{"content":"Runde ringe af","rank":2}
{"index":{}}
{"content":"Sorte ridser i kumme","rank":2}
{"index":{}}
{"content":"Løse ledninger fastgøres","rank":1}
{"index":{}}
{"content":"Hyldepapir fjernes fra vindues inden der males","rank":1}
{"index":{}}
{"content":"Kalk på samt på rør","rank":1}
{"index":{}}
{"content":"Døre og vinduer","rank":2}
{"index":{}}
{"content":"Dyb","rank":2}
{"index":{}}
{"content":"Væg genopsættes","rank":3}
{"index":{}}
{"content":"Skadet efter brug af rollator","rank":1}
{"index":{}}
{"content":"Skure liste skal også have olie Runde ringe","rank":2}
{"index":{}}
{"content":"Beboeren fik skala 3 på gulve vi deler 50","rank":2}
{"index":{}}
{"content":"Ridsede og skadet","rank":1}
{"index":{}}
{"content":"Afkalkning ikke udført","rank":1}
{"index":{}}
{"content":"Krog ved spejl nedtages","rank":1}
{"index":{}}
{"content":"Udskiftning af toiletsæde","rank":6}
{"index":{}}
{"content":"Spærregrunder pga. Rygning","rank":6}
{"index":{}}
{"content":"Gulv fuldslibes og 2 x lak","rank":3}
{"index":{}}
{"content":"Rengøring af alt træværk. Kontakter afrenses","rank":3}
{"index":{}}
{"content":"Hakker og skrammet","rank":10}
{"index":{}}
{"content":"Incl badeværelse","rank":3}
{"index":{}}
{"content":"Kanter på tapet slibes inden der males","rank":1}
{"index":{}}
{"content":"Huller efter ophæng","rank":3}
{"index":{}}
{"content":"Fliser langs gulv","rank":3}
{"index":{}}
{"content":"Nuance forskel","rank":3}
{"index":{}}
{"content":"Ridser under lak ved indflytning","rank":1}
{"index":{}}
{"content":"Mærker-ridser-huller i overflade","rank":6}
{"index":{}}
{"content":"Front komfur","rank":2}
{"index":{}}
{"content":"Havedøren","rank":2}
{"index":{}}
{"content":"Mærker- ridser - huller i overflade","rank":3}
{"index":{}}
{"content":"Dørkant beskidt","rank":1}
{"index":{}}
{"content":"Pilartor udskiftes grundet kalket til","rank":3}
{"index":{}}
{"content":"Mærker-ridser-huller i overfladen","rank":1}
{"index":{}}
{"content":"Mærker- ridser - huller i overfladen","rank":1}
{"index":{}}
{"content":"Pilartor kalket til. Skal udskiftes","rank":1}
{"index":{}}
{"content":"Mærker - ridser - huller i overflade","rank":3}
{"index":{}}
{"content":"Limning af sætnings revne","rank":2}
{"index":{}}
{"content":"Garderobe","rank":2}
{"index":{}}
{"content":"Gennem slid af lak","rank":6}
{"index":{}}
{"content":"Der er sorte mærker på gulvet","rank":2}
{"index":{}}
{"content":"Front ved knapper","rank":2}
{"index":{}}
{"content":"Grovslib + 3 x lak","rank":2}
{"index":{}}
{"content":"Rør males x 2","rank":2}
{"index":{}}
{"content":"Der er er stor afstand imellem bræderne","rank":2}
{"index":{}}
{"content":"Låg  på loftrosette mangle","rank":2}
{"index":{}}
{"content":"der mangler tapet","rank":2}
{"index":{}}
{"content":"Fliser afkalkes i bad","rank":2}
{"index":{}}
{"content":"rengøring efter håndværker","rank":2}
{"index":{}}
{"content":"Der mangler maling","rank":2}
{"index":{}}
{"content":"Trappetrin slib","rank":2}
{"index":{}}
{"content":"Trappe mægler","rank":2}
{"index":{}}
{"content":"Rengøring ved baderums renovering","rank":2}
{"index":{}}
{"content":"Brændmærker efter cigaretter","rank":2}
{"index":{}}
{"content":"Alle lodrette og vandrette fuger skiftes","rank":2}
{"index":{}}
{"content":"Opgradering af rengøring","rank":6}
{"index":{}}
{"content":"Loft i lysning","rank":2}
{"index":{}}
{"content":"Manglende nøgle","rank":8}
{"index":{}}
{"content":"Gulvet er flere steder slidt gennem lak og misfarvet","rank":3}
{"index":{}}
{"content":"Huller/mærker","rank":1}
{"index":{}}
{"content":"Huller/mærker i vægge","rank":2}
{"index":{}}
{"content":"Huller/mærker i loft","rank":1}
{"index":{}}
{"content":"Trappe stødtrin","rank":2}
{"index":{}}
{"content":"Sol bænk renses 5 stk olie behandles","rank":2}
{"index":{}}
{"content":"Tilsætnings lister","rank":2}
{"index":{}}
{"content":"Flisegulv afkalkes","rank":3}
{"index":{}}
{"content":"Efter tapet på låger","rank":2}
{"index":{}}
{"content":"Maler timer","rank":2}
{"index":{}}
{"content":"Hakket og skrammer","rank":5}
{"index":{}}
{"content":"Mangler dæksel","rank":5}
{"index":{}}
{"content":"Ikke rengjort ved frafraflytning","rank":2}
{"index":{}}
{"content":"Sorte mærker i gulv","rank":2}
{"index":{}}
{"content":"Efter tømrer","rank":1}
{"index":{}}
{"content":"Afmontering","rank":3}
{"index":{}}
{"content":"Kraftig rengøring","rank":5}
{"index":{}}
{"content":"Pudsning af vinduer","rank":3}
{"index":{}}
{"content":"Regøring af radiator","rank":2}
{"index":{}}
{"content":"Komfur fjernes ikke standard","rank":1}
{"index":{}}
{"content":"Afrens lim","rank":2}
{"index":{}}
{"content":"Aftryk/aftegninger","rank":2}
{"index":{}}
{"content":"Hoved dør indv","rank":4}
{"index":{}}
{"content":"Mærker efter møbler","rank":6}
{"index":{}}
{"content":"Skruehuller efter gardinstang","rank":2}
{"index":{}}
{"content":"Dørplade males hvid","rank":2}
{"index":{}}
{"content":"Terrazzo gulv","rank":2}
{"index":{}}
{"content":"Afrens af klister-mærker","rank":2}
{"index":{}}
{"content":"Teknikskab","rank":2}
{"index":{}}
{"content":"Solbænke og dørtrin olie behandles","rank":2}
{"index":{}}
{"content":"Afrens af vindues parti","rank":2}
{"index":{}}
{"content":"Teknik skab","rank":2}
{"index":{}}
{"content":"Slibemærker","rank":1}
{"index":{}}
{"content":"Ikke rngjort","rank":3}
{"index":{}}
{"content":"Skydedør skiftes hvis den ikke kan laves af maler","rank":2}
{"index":{}}
{"content":"Dørhåndtage","rank":3}
{"index":{}}
{"content":"Ødelagt håndtaget samt kan ikke rengøres ødelagt skuffe pga. Overisning","rank":2}
{"index":{}}
{"content":"Møgbeskidt kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Ødelagt håndtag samt skuffe pga af overisning .kan ikke gøres rent","rank":2}
{"index":{}}
{"content":"Pletter samt hundehår dybt ned i tæppe","rank":2}
{"index":{}}
{"content":"Efterladt sand mm","rank":2}
{"index":{}}
{"content":"Alt incl","rank":2}
{"index":{}}
{"content":"Trappeløb (stødtrin og gummifuge","rank":2}
{"index":{}}
{"content":"Ekstra slib efter skab","rank":2}
{"index":{}}
{"content":"Meget beskidt .så en standard rengøring ikke nok","rank":2}
{"index":{}}
{"content":"Depotrum ved garage fyldt med affald","rank":2}
{"index":{}}
{"content":"Afskrabning efter hund","rank":2}
{"index":{}}
{"content":"Ødelagt skabslåger hængsler","rank":2}
{"index":{}}
{"content":"Rengøring af fals","rank":2}
{"index":{}}
{"content":"Rengøres badved","rank":2}
{"index":{}}
{"content":"Spejl nedtages ikke standard","rank":1}
{"index":{}}
{"content":"Nicotin","rank":12}
{"index":{}}
{"content":"Dårligt maler arbejde","rank":6}
{"index":{}}
{"content":"Loftroset","rank":3}
{"index":{}}
{"content":"Ledninger","rank":3}
{"index":{}}
{"content":"Nyt loftroset låg","rank":3}
{"index":{}}
{"content":"Hjørneplade","rank":3}
{"index":{}}
{"content":"Skabsplade","rank":3}
{"index":{}}
{"content":"Vinduesramme","rank":3}
{"index":{}}
{"content":"Fastgør","rank":3}
{"index":{}}
{"content":"Huller/ ridser/ sorte streger/ mørke plamager/ i el. på vægge. Billeddokumenteret","rank":6}
{"index":{}}
{"content":"test på afd","rank":2}
{"index":{}}
{"content":"Jeg mener selskab","rank":1}
{"index":{}}
{"content":"selskab","rank":1}
{"index":{}}
{"content":"01 afd","rank":1}
{"index":{}}
{"content":"01 afd. iben","rank":1}
{"index":{}}
{"content":"Iben - selskab test","rank":1}
{"index":{}}
{"content":"Maling bobler","rank":3}
{"index":{}}
{"content":"Tapet sluppet ved gulvet","rank":3}
{"index":{}}
{"content":"Tapet flosset efter kat","rank":3}
{"index":{}}
{"content":"Tapet ødelagt over vinduet","rank":3}
{"index":{}}
{"content":"Efter klistermærker","rank":4}
{"index":{}}
{"content":"IBEN TESTER ALLE AFDELINGER I SELSKAB 2","rank":38}
{"index":{}}
{"content":"Ej tømt for effekter","rank":1}
{"index":{}}
{"content":"Kalk på fronten","rank":2}
{"index":{}}
{"content":"Nyt komfur","rank":5}
{"index":{}}
{"content":"Nyt køl og fryseskab levering og montering","rank":2}
{"index":{}}
{"content":"Bortskaffelse af gammelt","rank":4}
{"index":{}}
{"content":"LOFT: Huller/ ridser/ sorte streger/ mørke plamager/ i el. på vægge. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"Huller/ ridser/ sorte streger/ i el. på loftet. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"VINDUE: Huller/ ridser i vindue(r). Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Huller/ ridser i vindue(r). Billeddokumenteret","rank":1}
{"index":{}}
{"content":"TRÆVÆRK: Ridser/sorte mærker på træværk. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"Ridser/sorte mærker på træværk. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"VANGER: Ridse/ sorte mærker på vanger. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Ridse/ sorte mærker på vanger. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"DUP: Låge/skuffe/dør duppes med hvid. Se blå tape ”dup”","rank":122}
{"index":{}}
{"content":"Låge/skuffe/dør duppes med hvid. Se blå tape ”dup”","rank":2}
{"index":{}}
{"content":"Ryger lejlighed. Vægge/træværk er meget gule fra nikotin. ISO maling påkrævet. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"ISO: Ryger lejlighed. Vægge/træværk er meget gule fra nikotin. ISO maling påkrævet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"SELV SAT I STAND: Fraflytter har selv sat i stand og arbejdet godkendes","rank":122}
{"index":{}}
{"content":"Fraflytter har selv sat i stand og arbejdet godkendes","rank":1}
{"index":{}}
{"content":"Hakker/ ridser i gulvet under lakken. Se blå tape. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"Overfladeridser i lakken på gulv. Se blå tape. Billeddokumenteret","rank":2}
{"index":{}}
{"content":"Overfladeridser og hakker i gulv skal repareres. Se blå tape. Billeddokumenteret","rank":2}
{"index":{}}
{"content":"Lamelslip. Se blå tape. Billeddokumenteret","rank":2}
{"index":{}}
{"content":"Skaden er markeret med blå tape. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Boligen er rengjort af fraflytter","rank":4}
{"index":{}}
{"content":"RENGØRING: Boligen er ikke rengjort. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"Boligen er ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Ovn ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"KØL/FRYS: Køl/frys ikke rengjort. Billeddokumenteret","rank":124}
{"index":{}}
{"content":"Køl/frys ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Emhætte ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"OPVASKEMASKINE: Opvaskemaskine ikke rengjort. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"Opvaskemaskine ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Kogeplade ikke rengjort. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Alle hårde hvidevarer rengøres samt vaskemaskine og tørretumbler på badeværelset. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"VINDUER: Vinduer er ikke rengjorte. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Vinduer er ikke rengjorte. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Vinduer ikke rengjorte udvendig","rank":4}
{"index":{}}
{"content":"VINDUER: Vinduer var ikke pudset ved indflytning. Fraflytter har fremvist dokumentation","rank":122}
{"index":{}}
{"content":"Vinduer var ikke pudset ved indflytning. Fraflytter har fremvist dokumentation","rank":4}
{"index":{}}
{"content":"EFFEKTER: Effekter demonteres og fjernes fra lejemålet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Effekter demonteres og fjernes fra lejemålet. Billeddokumenteret","rank":5}
{"index":{}}
{"content":"KALK: Kalk under blandingsbatteri i brusenichen. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Kalk under blandingsbatteri i brusenichen. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Klister fra kabelbakke fjernes fra loft/væg/fodpanel. Billeddokumenteret","rank":4}
{"index":{}}
{"content":"Perlator er ikke rengjort/ afkalket og er misligholdt. Billeddokumenteret","rank":109}
{"index":{}}
{"content":"Blandingsbatteri i køkken er ødelagt. Billeddokumenteret","rank":108}
{"index":{}}
{"content":"Bruserslange er utæt. Billeddokumenteret","rank":108}
{"index":{}}
{"content":"BORDPLADE: Ridser/ sorte ringe på bordpladen. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Ridser/ sorte ringe på bordpladen. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"Beløbet er estimeret. Fraflytter betale kun den faktiske pris","rank":119}
{"index":{}}
{"content":"Afdækning til eludtag 50x50 mangler. Billeddokumenteret","rank":109}
{"index":{}}
{"content":"Spot(s) virker ikke. Billeddokumenteret","rank":109}
{"index":{}}
{"content":"Fryser skuffe øverst er skadet. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"SKUFFE MIDT: Fryserskuffe i midten er skadet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Fryserskuffe i midten er skadet. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"Fryserskuffe nederst er skadet. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"FLASKEHOLDER: Flaskeholder i køleskabslågen er skadet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Flaskeholder i køleskabslågen er skadet. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"RISTE/PLADER MANGLER: Riste/ plader i ovn mangler. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"Riste/ plader i ovn mangler. Billeddokumenteret","rank":3}
{"index":{}}
{"content":"Glas i emhætten er skadet. Billeddokumenteret","rank":5}
{"index":{}}
{"content":"GLAS SKADET: Glas i emhætten er skadet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"Nøgle x-x-x-x er afleveret. Systemnøgle: XXX -  Home har nøgle nr. x. Billeddokumenteret","rank":107}
{"index":{}}
{"content":"Nøgle x-x-x-x er afleveret. Systemnøgle: XXX -  Home/Udlejning har nøgle nr. x. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"Hul(ler) i flise(r). Billeddokumenteret","rank":108}
{"index":{}}
{"content":"Glas på altan er skadet. Billeddokumenteret","rank":108}
{"index":{}}
{"content":"Aføbsrende i vindue snavset","rank":3}
{"index":{}}
{"content":"Overskab snavset og fedtet","rank":3}
{"index":{}}
{"content":"Dør til badeværelse binder","rank":3}
{"index":{}}
{"content":"Knast repareres i gulv","rank":2}
{"index":{}}
{"content":"Knagerække nedtages ikke standard","rank":1}
{"index":{}}
{"content":"Levering og montering","rank":2}
{"index":{}}
{"content":"Ridser/ mærker","rank":2}
{"index":{}}
{"content":"Just Works","rank":2}
{"index":{}}
{"content":"Afløbsrende snavset","rank":3}
{"index":{}}
{"content":"1 x iso grunder","rank":2}
{"index":{}}
{"content":"Limtræ bjælke","rank":2}
{"index":{}}
{"content":"Mange skruger","rank":3}
{"index":{}}
{"content":"Mange skruer","rank":6}
{"index":{}}
{"content":"Mange store skruer og huller i vægge","rank":3}
{"index":{}}
{"content":"Udv. Vinduepuds og falser","rank":2}
{"index":{}}
{"content":"Store ridser og slitage ned til træet","rank":6}
{"index":{}}
{"content":"Løs tapet ved vindue","rank":6}
{"index":{}}
{"content":"Manglene rengøring","rank":5}
{"index":{}}
{"content":"Rep af huller og fjernelse af søm","rank":6}
{"index":{}}
{"content":"Nedtagning af ulovlige el","rank":3}
{"index":{}}
{"content":"Løse afbryder","rank":3}
{"index":{}}
{"content":"Mangler låsecylinder og nøgler","rank":3}
{"index":{}}
{"content":"Hulder og revner i loft","rank":3}
{"index":{}}
{"content":"Males pga pletter / skader","rank":1}
{"index":{}}
{"content":"Afpropning af spulehane","rank":10}
{"index":{}}
{"content":"Udskiftes Pga. Lugt","rank":3}
{"index":{}}
{"content":"Flere mærker på linolium","rank":2}
{"index":{}}
{"content":"Finish indv gummiliste + udv. Omkring","rank":2}
{"index":{}}
{"content":"Lappes og plets","rank":2}
{"index":{}}
{"content":"Skadet","rank":3}
{"index":{}}
{"content":"Omstilles til samme som hoveddør","rank":1}
{"index":{}}
{"content":"Ridser efter kniv","rank":4}
{"index":{}}
{"content":"Hul i dørplader","rank":2}
{"index":{}}
{"content":"Toiletsæde og toiletskål snavset","rank":3}
{"index":{}}
{"content":"Snavset bag komfur","rank":3}
{"index":{}}
{"content":"Pudses","rank":9}
{"index":{}}
{"content":"Afskrabninger efter hund","rank":2}
{"index":{}}
{"content":"Fjernelse af rest indbo samt nedtagning lamper og gardiner","rank":2}
{"index":{}}
{"content":"Meget beskidt så ekstra tid til rengøring","rank":2}
{"index":{}}
{"content":"Ridser og mærker igennem lakken","rank":2}
{"index":{}}
{"content":"Hul i dør samt limet figur på skydedør","rank":2}
{"index":{}}
{"content":"Højskab udskiftes ødelagt","rank":1}
{"index":{}}
{"content":"Fjerne 2 underskabe","rank":2}
{"index":{}}
{"content":"Opretning af skabe","rank":2}
{"index":{}}
{"content":"Forbehold for maler kan male døre pænt igen","rank":2}
{"index":{}}
{"content":"2 skydedøre faldet af","rank":2}
{"index":{}}
{"content":"Males som vi plejer","rank":4}
{"index":{}}
{"content":"Støv beskidt","rank":2}
{"index":{}}
{"content":"Alle skabe gøres rent ude og indvendigt","rank":2}
{"index":{}}
{"content":"Ale vinduer udvendigt gøres rene","rank":2}
{"index":{}}
{"content":"Gøres rent hele køleskab","rank":2}
{"index":{}}
{"content":"Ask armatur og emhætte gøres rent","rank":2}
{"index":{}}
{"content":"Vaskes gulv hele lejemål","rank":2}
{"index":{}}
{"content":"Udføres som standart","rank":2}
{"index":{}}
{"content":"Fjernelse af rørkasse","rank":1}
{"index":{}}
{"content":"Udskiftning af 1.5 m2 fliser samt luk 14 huller","rank":2}
{"index":{}}
{"content":"Og indvendigt","rank":2}
{"index":{}}
{"content":"Slidt igennem lak mange rider og hakker","rank":2}
{"index":{}}
{"content":"Badeværelse dør","rank":2}
{"index":{}}
{"content":"Ødelagt væg hjørne","rank":2}
{"index":{}}
{"content":"Haha","rank":1}
{"index":{}}
{"content":"Ekstra rengøring af gulve","rank":2}
{"index":{}}
{"content":"Rense kalk af gulv","rank":2}
{"index":{}}
{"content":"Mangler dæksel og tangenter","rank":1}
{"index":{}}
{"content":"Alle tangenter","rank":2}
{"index":{}}
{"content":"Spærrende maling pga rygning","rank":6}
{"index":{}}
{"content":"Alt træværk males pga rygning","rank":3}
{"index":{}}
{"content":"Træværk hvor rengøring er tilstrækkeligt for pænt og ensartet resultat","rank":3}
{"index":{}}
{"content":"Rengøres efter rygning","rank":3}
{"index":{}}
{"content":"Afskrabning efter kørestol","rank":2}
{"index":{}}
{"content":"Ue og inde","rank":2}
{"index":{}}
{"content":"Huller i væg efter påkørsel","rank":2}
{"index":{}}
{"content":"Skrammet efter påkørsel","rank":2}
{"index":{}}
{"content":"Maling slået af deles","rank":2}
{"index":{}}
{"content":"Manglende nedtagning af lamper","rank":2}
{"index":{}}
{"content":"Skiftes pga. Nikotin","rank":6}
{"index":{}}
{"content":"Vinduesrammer udført i aluminium\n\nRadiator i konvektorgrav\n\nUdført som kælderrum\n\nDet skal bemærkes, at køleskab, ove og opvaskemaskiner er lejeres egne hårde hvidevarer\n\nNøgler:\n3 stk. Til hoveddør og kælderrum plus 1 stk. Grøn genbestillings nøgle\n3 stk. Nøglebrikker\n2 stk. Postkassenøgler","rank":1}
{"index":{}}
{"content":"JE","rank":1}
{"index":{}}
{"content":"Maling af køkkenlåger da dette ikke er gjort håndværksmessigt korrekt","rank":3}
{"index":{}}
{"content":"Afvask nicotin","rank":2}
{"index":{}}
{"content":"Spærregrunder hele lejemål","rank":2}
{"index":{}}
{"content":"Rep og males efter rollatorbrug","rank":1}
{"index":{}}
{"content":"Ikke korrekt afkalket","rank":6}
{"index":{}}
{"content":"Ridser og hakker gennem lakken","rank":3}
{"index":{}}
{"content":"Hakker og ridser gennem lakken","rank":3}
{"index":{}}
{"content":"Gasmåler reetableres","rank":3}
{"index":{}}
{"content":"Pga huller fra gardin","rank":1}
{"index":{}}
{"content":"Indbo ryddes og køres til storskrald på Tonemestervej 28","rank":3}
{"index":{}}
{"content":"Pålagt skridsikring","rank":3}
{"index":{}}
{"content":"Afrenses og terrazzo slibes og olieres","rank":3}
{"index":{}}
{"content":"Ikke afleveret","rank":6}
{"index":{}}
{"content":"Delvist ikke rengjort","rank":3}
{"index":{}}
{"content":"Inkl. afkalkning af badeværelse","rank":3}
{"index":{}}
{"content":"Spejlskab","rank":3}
{"index":{}}
{"content":"Inkl. Skabe","rank":3}
{"index":{}}
{"content":"Inkl vinduespolering","rank":3}
{"index":{}}
{"content":"Hyldepapir meget slidt","rank":3}
{"index":{}}
{"content":"Nyt pålægges","rank":3}
{"index":{}}
{"content":"Maling mangelfuld","rank":3}
{"index":{}}
{"content":"Limrester","rank":2}
{"index":{}}
{"content":"Skab demonteres","rank":3}
{"index":{}}
{"content":"Kan ikke åbnes","rank":3}
{"index":{}}
{"content":"Malede kontakter crengøres","rank":3}
{"index":{}}
{"content":"Demontering af emhætte","rank":3}
{"index":{}}
{"content":"Vindue åbner ikke korrekt","rank":3}
{"index":{}}
{"content":"Der laves maler rep efter persienner","rank":2}
{"index":{}}
{"content":"Lampe sættes fast på væg igen","rank":2}
{"index":{}}
{"content":"Vi skifter selv døren","rank":2}
{"index":{}}
{"content":"Tømming af blomst kumme","rank":2}
{"index":{}}
{"content":"Reparation i indhak i entre","rank":2}
{"index":{}}
{"content":"Køkken skabe","rank":2}
{"index":{}}
{"content":"Vaskeskab","rank":4}
{"index":{}}
{"content":"Nye lister ved vinduer males","rank":2}
{"index":{}}
{"content":"M2 gælder hele lejligheden inklusiv afdækning","rank":6}
{"index":{}}
{"content":"Geregter og paneler + havedør pletmales","rank":3}
{"index":{}}
{"content":"Rep lysning efter gardin","rank":1}
{"index":{}}
{"content":"Rep vindue efter gardin","rank":1}
{"index":{}}
{"content":"Pga . Der er malet med mat maling","rank":1}
{"index":{}}
{"content":"Pag. Gennemslid af lkeen","rank":1}
{"index":{}}
{"content":"Pga.dette ikke er udført","rank":1}
{"index":{}}
{"content":"Inkl. Bagvægge i entreskabene","rank":3}
{"index":{}}
{"content":"Vinyl ødelagt","rank":1}
{"index":{}}
{"content":"Grundet manglende vedligeholdelse","rank":3}
{"index":{}}
{"content":"Maling af dørkarmen","rank":3}
{"index":{}}
{"content":"Inkl. Lille rum","rank":3}
{"index":{}}
{"content":"Vinduesplade","rank":10}
{"index":{}}
{"content":"Fejning","rank":3}
{"index":{}}
{"content":"Vindues bundplade","rank":4}
{"index":{}}
{"content":"Linolium. Top / hige speed behandling","rank":2}
{"index":{}}
{"content":"Udskiftes pga. Nikotin","rank":6}
{"index":{}}
{"content":"Samt maling på karm","rank":2}
{"index":{}}
{"content":"Maling på fodlister","rank":2}
{"index":{}}
{"content":"El gennem gang","rank":2}
{"index":{}}
{"content":"Revnet i top","rank":2}
{"index":{}}
{"content":"Fordør på indvendig side","rank":1}
{"index":{}}
{"content":"Samt fjernelse af affald samt fjernelse af stakit","rank":2}
{"index":{}}
{"content":"Montering af skab hvor opvaskemaskine har stået sjusket sat i","rank":2}
{"index":{}}
{"content":"Depot rum","rank":2}
{"index":{}}
{"content":"Efter bøjle eller andet","rank":1}
{"index":{}}
{"content":"Slange væk","rank":1}
{"index":{}}
{"content":"Pga huller efter gardin","rank":1}
{"index":{}}
{"content":"Special rengøring før håndværker","rank":2}
{"index":{}}
{"content":"Maling af Vinduer pga Huller fra gardin","rank":1}
{"index":{}}
{"content":"Karme pletmales","rank":3}
{"index":{}}
{"content":"Paneler males","rank":3}
{"index":{}}
{"content":"Males 1 gang","rank":6}
{"index":{}}
{"content":"Skadet  af rollator","rank":1}
{"index":{}}
{"content":"Ikke tømt for effekter","rank":2}
{"index":{}}
{"content":"Gået i stykker","rank":1}
{"index":{}}
{"content":"Gulv gynger. Opklodsning væk","rank":1}
{"index":{}}
{"content":"Lofter males 1 gang","rank":3}
{"index":{}}
{"content":"Gulv ridset i lakken","rank":2}
{"index":{}}
{"content":"Lejlighed ikke rengjort ved fraflytning","rank":2}
{"index":{}}
{"content":"Træværk ridset/ ødelagt","rank":2}
{"index":{}}
{"content":"Lejlighed præget af nikotin","rank":2}
{"index":{}}
{"content":"Udskift Tangenter","rank":2}
{"index":{}}
{"content":"Epoxy maling af badeværelse gulv","rank":2}
{"index":{}}
{"content":"Lidt nikotin på bagsiden","rank":2}
{"index":{}}
{"content":"Pga. Gulvarbejde","rank":2}
{"index":{}}
{"content":"nikotin på over alt","rank":2}
{"index":{}}
{"content":"Kun plet","rank":2}
{"index":{}}
{"content":"Fjernelse af manglende inventar","rank":3}
{"index":{}}
{"content":"Teknik skab males indvendigt","rank":2}
{"index":{}}
{"content":"Underside: toilet","rank":2}
{"index":{}}
{"content":"Underside af bl. Batter i bad","rank":2}
{"index":{}}
{"content":"Brystning og væg males","rank":2}
{"index":{}}
{"content":"Ødelagt karm","rank":2}
{"index":{}}
{"content":"Spartel-huller repareres","rank":2}
{"index":{}}
{"content":"Vaskes op","rank":2}
{"index":{}}
{"content":"Vasket og poleres","rank":2}
{"index":{}}
{"content":"Monter skabslåge på skab samt rep skabsside","rank":3}
{"index":{}}
{"content":"Mangler - ser nr. 62610157 prod nr. 933012468-00 mærke ERT 1602AOW3 type TT 160 C","rank":3}
{"index":{}}
{"content":"Feje terrasse og afløbsrande","rank":3}
{"index":{}}
{"content":"Dørtrin er slidt gennem lak","rank":3}
{"index":{}}
{"content":"Komfur er ikke tilstrækkeligt rengjort","rank":3}
{"index":{}}
{"content":"Loftrosette ødelagt","rank":1}
{"index":{}}
{"content":"Eksisterende måler hæves så højt som muligt mod loft","rank":1}
{"index":{}}
{"content":"Markise nedtages","rank":1}
{"index":{}}
{"content":"Stærkt misfarvet","rank":2}
{"index":{}}
{"content":"Mangelende nøgle = omlægning af systemlås","rank":2}
{"index":{}}
{"content":"Afdækning over køkkenskabe","rank":2}
{"index":{}}
{"content":"Gennemslid af lak","rank":13}
{"index":{}}
{"content":"Fjerne kalk på badeværelse 1. Sal","rank":3}
{"index":{}}
{"content":"Skyggeliste fuges mod væg og loft","rank":2}
{"index":{}}
{"content":"Gennem gang af køkken ( finish","rank":2}
{"index":{}}
{"content":"Lamper nedtages ikke standard","rank":2}
{"index":{}}
{"content":"Afpropning af afløb","rank":9}
{"index":{}}
{"content":"Små ridser og mærker i overflade","rank":2}
{"index":{}}
{"content":"Dør tages fra kælder og monteres/ justeres","rank":3}
{"index":{}}
{"content":"Står løst i køkken","rank":1}
{"index":{}}
{"content":"Afdelingen har jf. deres lokale vedligeholdelsesreglement valgt at udskifte de døre der skal males. Dette er en billigere løsning","rank":2}
{"index":{}}
{"content":"Div. Afkalkning","rank":6}
{"index":{}}
{"content":"Males pga skader","rank":1}
{"index":{}}
{"content":"Der er ikke tilstrækkeligt rengjort","rank":3}
{"index":{}}
{"content":"Montering af løst kabel","rank":3}
{"index":{}}
{"content":"Måler monteres","rank":3}
{"index":{}}
{"content":"Bolig vinyl på gulv fjernes","rank":3}
{"index":{}}
{"content":"Ny bruser/ bruserslange","rank":3}
{"index":{}}
{"content":"Ny plade i vaskeskab","rank":3}
{"index":{}}
{"content":"Skuffemodul udskiftes","rank":3}
{"index":{}}
{"content":"Nye lister på vindue","rank":3}
{"index":{}}
{"content":"Indbo flyttes til storskrald","rank":3}
{"index":{}}
{"content":"Male graffiti over","rank":2}
{"index":{}}
{"content":"Mle karm","rank":2}
{"index":{}}
{"content":"Samt front hattehylde","rank":2}
{"index":{}}
{"content":"Mangle ø 80 stue","rank":2}
{"index":{}}
{"content":"Lugter af pis","rank":2}
{"index":{}}
{"content":"Pga. Huller efter gardin","rank":6}
{"index":{}}
{"content":"2 huller efter kroge til venstre for brusebatt","rank":2}
{"index":{}}
{"content":"Brændmærker","rank":7}
{"index":{}}
{"content":"Spindelvæv radiatorer","rank":2}
{"index":{}}
{"content":"Rep. Plet og færdigstryg","rank":3}
{"index":{}}
{"content":"Laminat har løftet sig","rank":3}
{"index":{}}
{"content":"Nedtagning af emhætte","rank":3}
{"index":{}}
{"content":"Pga. Manglende rengøring","rank":25}
{"index":{}}
{"content":"Firkantet pleter","rank":2}
{"index":{}}
{"content":"Let flytte rengøring","rank":2}
{"index":{}}
{"content":"Opgradering af trappe","rank":2}
{"index":{}}
{"content":"Hul i væg ved terrasse dør efter hund","rank":2}
{"index":{}}
{"content":"Mærket med blyant","rank":2}
{"index":{}}
{"content":"Pga. Misfarvning og skrammer","rank":1}
{"index":{}}
{"content":"Pga. Gennemslid af lakken og ikke vedligeholdt","rank":1}
{"index":{}}
{"content":"Huller fra søm","rank":1}
{"index":{}}
{"content":"Pga. Dette ikke er gjordt","rank":1}
{"index":{}}
{"content":"Lim afrenses fra kabel lister","rank":2}
{"index":{}}
{"content":"Rep huller efter ophæng","rank":3}
{"index":{}}
{"content":"Rep af huller efter persienner","rank":3}
{"index":{}}
{"content":"Ødelagt stik. Ledning Revnet ud af stik","rank":2}
{"index":{}}
{"content":"Ødelagt panelunderlag","rank":2}
{"index":{}}
{"content":"Revner ved vindue","rank":2}
{"index":{}}
{"content":"Rep vindue værelse 2 mod gården","rank":4}
{"index":{}}
{"content":"Altandør hænger","rank":4}
{"index":{}}
{"content":"Tjek bremse altandør","rank":4}
{"index":{}}
{"content":"Fugeslip","rank":6}
{"index":{}}
{"content":"Fliser flækket","rank":4}
{"index":{}}
{"content":"Mangler 1nøgle","rank":2}
{"index":{}}
{"content":"Males pga stænk af spraymaling","rank":1}
{"index":{}}
{"content":"Udsk pga skader","rank":1}
{"index":{}}
{"content":"Mærker i træværk","rank":3}
{"index":{}}
{"content":"Kontakt hænger ud af vægen","rank":2}
{"index":{}}
{"content":"Hul lukke på skabssiden","rank":2}
{"index":{}}
{"content":"Hele lejemålet tømmes for møbler og diverse","rank":2}
{"index":{}}
{"content":"Forbehold for skader på gulve da de ikke kan ses grundet møbler","rank":2}
{"index":{}}
{"content":"Hegn fjernes og der sættes hæk","rank":2}
{"index":{}}
{"content":"Der mangler en postkassenøgle","rank":2}
{"index":{}}
{"content":"Er ren","rank":4}
{"index":{}}
{"content":"Persienner ikke standard","rank":2}
{"index":{}}
{"content":"Fjerne tape på væg","rank":2}
{"index":{}}
{"content":"Ødelagt front kant","rank":2}
{"index":{}}
{"content":"Ødelagt vindues karm","rank":2}
{"index":{}}
{"content":"Ny monteres og males derefter","rank":2}
{"index":{}}
{"content":"Male kanter","rank":2}
{"index":{}}
{"content":"Manglende bortskaffelse af gulvtæpper","rank":3}
{"index":{}}
{"content":"Ink.vindueskarm","rank":3}
{"index":{}}
{"content":"5 stk. Dørtrin grovslib og 3 x lak","rank":2}
{"index":{}}
{"content":"Køkkenskabs gavle males x 2","rank":2}
{"index":{}}
{"content":"Alle parneler","rank":3}
{"index":{}}
{"content":"Dørkarme","rank":3}
{"index":{}}
{"content":"Afskrabet maling","rank":6}
{"index":{}}
{"content":"Hakker og ridser i gulv","rank":3}
{"index":{}}
{"content":"Vinduskar","rank":3}
{"index":{}}
{"content":"Pga gennem slid af lakken","rank":1}
{"index":{}}
{"content":"Pga.emhætten ikke er rengjort","rank":1}
{"index":{}}
{"content":"Fjerne klædeskab","rank":2}
{"index":{}}
{"content":"Fjerne klædeskab og plader","rank":2}
{"index":{}}
{"content":"Entre og værelse","rank":2}
{"index":{}}
{"content":"Tangenter på stikkontak mangler","rank":2}
{"index":{}}
{"content":"Fjerne køleskab og komfur","rank":2}
{"index":{}}
{"content":"Fjerne plade for dør og montere indfatninger","rank":2}
{"index":{}}
{"content":"Ny lampe","rank":3}
{"index":{}}
{"content":"Gammelt slidt gulv","rank":2}
{"index":{}}
{"content":"Fjerne kabelbakke væg","rank":2}
{"index":{}}
{"content":"Mørke pletter","rank":2}
{"index":{}}
{"content":"Vindue","rank":8}
{"index":{}}
{"content":"Pga. Gennemslid af lakken","rank":12}
{"index":{}}
{"content":"Kalk på rør","rank":1}
{"index":{}}
{"content":"Pga. nye fordampningsmåler","rank":1}
{"index":{}}
{"content":"Pga. ridser og skrammer","rank":25}
{"index":{}}
{"content":"Efter sætningsrevne er udbedret","rank":1}
{"index":{}}
{"content":"Afhjælpning vask og armatur udskiftes efter bordpladeudskiftning","rank":1}
{"index":{}}
{"content":"Skabe og skuffer gennemgås for funktionalitet","rank":1}
{"index":{}}
{"content":"Alt incl. (div. hvidevare og afkalkning","rank":2}
{"index":{}}
{"content":"High speed polering af linoleumsgulv","rank":2}
{"index":{}}
{"content":"Opgradering afd","rank":2}
{"index":{}}
{"content":"Fjerne ting alle steder","rank":2}
{"index":{}}
{"content":"2 x afkalkning i bad","rank":2}
{"index":{}}
{"content":"Terrassedør","rank":5}
{"index":{}}
{"content":"Pga. Gennem slid af lak","rank":1}
{"index":{}}
{"content":"Behandling af beton gulv","rank":2}
{"index":{}}
{"content":"Afrens af tæppe mv","rank":2}
{"index":{}}
{"content":"Nikotin og skidt","rank":3}
{"index":{}}
{"content":"Nikotinog skidt","rank":3}
{"index":{}}
{"content":"Gasmåler nedtaget af hofor","rank":3}
{"index":{}}
{"content":"Filter mangler","rank":3}
{"index":{}}
{"content":"Samt gulv","rank":3}
{"index":{}}
{"content":"Samt håndvask","rank":3}
{"index":{}}
{"content":"Opfugtet i bund","rank":3}
{"index":{}}
{"content":"Skiftes hvis ikke kan rep","rank":3}
{"index":{}}
{"content":"Rep af 8 huller","rank":3}
{"index":{}}
{"content":"Samt pletning af flise","rank":3}
{"index":{}}
{"content":"Trykmærker / ridser","rank":4}
{"index":{}}
{"content":"Nicotin mættede vægge","rank":3}
{"index":{}}
{"content":"Nicotin mætted dør","rank":3}
{"index":{}}
{"content":"Skaberengøres","rank":3}
{"index":{}}
{"content":"Rengøres for tape rester","rank":3}
{"index":{}}
{"content":"Karm hoveddør males","rank":3}
{"index":{}}
{"content":"Samling i værelse løs","rank":3}
{"index":{}}
{"content":"Gælder hel lejligheden inkl. Afdækning","rank":3}
{"index":{}}
{"content":"Badeværelse rengøres","rank":3}
{"index":{}}
{"content":"Opgradering af istandsættelse","rank":2}
{"index":{}}
{"content":"Fuld slib og 3 x lak pga. Brud på lakken","rank":3}
{"index":{}}
{"content":"Let slib og 3 x lak","rank":3}
{"index":{}}
{"content":"Fuldslipning og 3x lak","rank":3}
{"index":{}}
{"content":"Fuld slip og 3x lak","rank":3}
{"index":{}}
{"content":"Beslag fjernes ikke standard","rank":2}
{"index":{}}
{"content":"Køkkenet tømmes for effekter","rank":1}
{"index":{}}
{"content":"Klistermærker og tape","rank":2}
{"index":{}}
{"content":"Det er kun skruehuller efter gardinstænger der skal spartles og males","rank":2}
{"index":{}}
{"content":"Skydedør genmonteres","rank":2}
{"index":{}}
{"content":"Mange års mad os og mad fedt","rank":3}
{"index":{}}
{"content":"Mange huller i bordplade","rank":3}
{"index":{}}
{"content":"Nedtagning af div. Hylder","rank":6}
{"index":{}}
{"content":"Pga. Misfarvning","rank":5}
{"index":{}}
{"content":"I forsendelse med udskift af bordplade","rank":3}
{"index":{}}
{"content":"Rep af skabslåge","rank":3}
{"index":{}}
{"content":"Over malet stikkontakter","rank":3}
{"index":{}}
{"content":"Montering af dør","rank":3}
{"index":{}}
{"content":"Rep af dørhåndtag","rank":3}
{"index":{}}
{"content":"Nedtagning af børnesikring i vindueskarm","rank":3}
{"index":{}}
{"content":"Altan : rep af skabslås","rank":3}
{"index":{}}
{"content":"Tætningslister på hoveddør","rank":1}
{"index":{}}
{"content":"Stofledninger udskiftes","rank":1}
{"index":{}}
{"content":"Afskabning efter rollator elller lign","rank":2}
{"index":{}}
{"content":"Skab monteres","rank":2}
{"index":{}}
{"content":"Det er EB stor håndvask og der er hul i","rank":2}
{"index":{}}
{"content":"Hak i","rank":2}
{"index":{}}
{"content":"Huller i gulv 3 steder","rank":2}
{"index":{}}
{"content":"Rengøring af falser på alle vinduer og døre","rank":2}
{"index":{}}
{"content":"Beskidt / Ikke rengjort","rank":3}
{"index":{}}
{"content":"Ser hjemmelavet ud","rank":1}
{"index":{}}
{"content":"Brand hul i bordpladen","rank":2}
{"index":{}}
{"content":"Pga manglede rengørning","rank":32}
{"index":{}}
{"content":"Rengøring af alle flader pga snavs","rank":3}
{"index":{}}
{"content":"Loft afrenses","rank":2}
{"index":{}}
{"content":"Udskiftning af toilet da cisterne er flækket","rank":2}
{"index":{}}
{"content":"Ovenlys vindue","rank":2}
{"index":{}}
{"content":"Spærrende maler behandling","rank":2}
{"index":{}}
{"content":"Stødtrin","rank":2}
{"index":{}}
{"content":"Lister ved vinduer","rank":2}
{"index":{}}
{"content":"Tæppe bortskaffes","rank":2}
{"index":{}}
{"content":"Byggestrøm","rank":1}
{"index":{}}
{"content":"Rullelåse","rank":1}
{"index":{}}
{"content":"Nye hylder køkken","rank":1}
{"index":{}}
{"content":"Støvsugning bag radiator","rank":2}
{"index":{}}
{"content":"Afløb ikke rengjort","rank":2}
{"index":{}}
{"content":"Skal fjernes og efter maler og gulv høvler monteres nyt","rank":4}
{"index":{}}
{"content":"Meget nikotin","rank":2}
{"index":{}}
{"content":"Er flået itu","rank":2}
{"index":{}}
{"content":"Ødelagt pga rullestol","rank":2}
{"index":{}}
{"content":"Fuld slib ved køkken skift","rank":2}
{"index":{}}
{"content":"Mangler lidt maling","rank":2}
{"index":{}}
{"content":"Manglende afkalkning af flisegulv","rank":2}
{"index":{}}
{"content":"Ifm håndværkerrengøring","rank":2}
{"index":{}}
{"content":"Udskiftes pga brændt hul","rank":2}
{"index":{}}
{"content":"Finish køkken","rank":4}
{"index":{}}
{"content":"Pvc fod lister","rank":2}
{"index":{}}
{"content":"Spærres pga. manglende vedligeholdelse","rank":6}
{"index":{}}
{"content":"Rengøring efter gulvsliber","rank":2}
{"index":{}}
{"content":"Afkalkning og rens","rank":3}
{"index":{}}
{"content":"Underside vask","rank":2}
{"index":{}}
{"content":"Maling på el kontakter afrenses","rank":2}
{"index":{}}
{"content":"Rotex","rank":1}
{"index":{}}
{"content":"Manglende nedtagning","rank":10}
{"index":{}}
{"content":"Rosette mangler","rank":1}
{"index":{}}
{"content":"Dør renses for lim","rank":1}
{"index":{}}
{"content":"Spulehane afproppes","rank":4}
{"index":{}}
{"content":"Skal være metal","rank":1}
{"index":{}}
{"content":"Loft lameller lakeres x 2","rank":2}
{"index":{}}
{"content":"Kun rundt om vindue","rank":2}
{"index":{}}
{"content":"Underside toilet","rank":2}
{"index":{}}
{"content":"Afrens ved terrassedør for lim/klister","rank":2}
{"index":{}}
{"content":"Nedtagning af tapet","rank":3}
{"index":{}}
{"content":"Optagning og ligning af nyt Junker bøg parket gulv","rank":3}
{"index":{}}
{"content":"Køkkenskabe vandskadet","rank":3}
{"index":{}}
{"content":"Udskiftning af dørkarm og dør","rank":3}
{"index":{}}
{"content":"Rydning af have","rank":3}
{"index":{}}
{"content":"Manglede rengøring misligholdt","rank":3}
{"index":{}}
{"content":"Efter rullegardin","rank":1}
{"index":{}}
{"content":"Optagning og lægning af nyt Junker bøg parket gulv","rank":3}
{"index":{}}
{"content":"Afpropning efter opvaskemaskine","rank":1}
{"index":{}}
{"content":"Altan gulv","rank":2}
{"index":{}}
{"content":"Mur værn","rank":2}
{"index":{}}
{"content":"Badekar behandles","rank":2}
{"index":{}}
{"content":"Ekstra afsyring","rank":2}
{"index":{}}
{"content":"Frisider x 2","rank":2}
{"index":{}}
{"content":"Udskift til rullelåse og greb","rank":1}
{"index":{}}
{"content":"Rep af væg ved nedtagning af isolering","rank":1}
{"index":{}}
{"content":"Vindues plade lakeres","rank":2}
{"index":{}}
{"content":"Blændplade","rank":2}
{"index":{}}
{"content":"Maler arbejde ved køkken skift","rank":4}
{"index":{}}
{"content":"Manglende vedligeholdelse/rengøring","rank":3}
{"index":{}}
{"content":"Hul i siden på dør","rank":2}
{"index":{}}
{"content":"Vægge ikke malbar grundet nikotin","rank":3}
{"index":{}}
{"content":"Opgradering af rengørings standart","rank":2}
{"index":{}}
{"content":"Finish på emhætten","rank":2}
{"index":{}}
{"content":"Gulvet ikke afkalket","rank":3}
{"index":{}}
{"content":"Gennemgang af køkken.  Låger","rank":2}
{"index":{}}
{"content":"Fuger","rank":3}
{"index":{}}
{"content":"Der er maler pletter på gulv","rank":3}
{"index":{}}
{"content":"Efter håndværkere","rank":2}
{"index":{}}
{"content":"Slidt gennem lakken","rank":1}
{"index":{}}
{"content":"Manglende nøgle = omlægning af lås","rank":4}
{"index":{}}
{"content":"Afkalkning af gulv + olie","rank":2}
{"index":{}}
{"content":"Ikke rengjort bag radiator","rank":2}
{"index":{}}
{"content":"Kontakter overmalet","rank":3}
{"index":{}}
{"content":"Enkelt afskalling på karm i stue/værelse. Skrabemærke på gerekt i entre","rank":2}
{"index":{}}
{"content":"Skruehuller i top af lysninger spartles og plettes","rank":2}
{"index":{}}
{"content":"Vinduesplade skiftes ud pga. hakker/ ridser","rank":3}
{"index":{}}
{"content":"Primær underside","rank":2}
{"index":{}}
{"content":"Dør magler","rank":3}
{"index":{}}
{"content":"Loft er misligholdt.  Pga. nikotin","rank":3}
{"index":{}}
{"content":"Loft er misligholdt. Pga. af nikotin","rank":3}
{"index":{}}
{"content":"Huller høj skab","rank":2}
{"index":{}}
{"content":"Og garderobe","rank":2}
{"index":{}}
{"content":"Pga. Ridser og skrammer og gennemslid af lakken","rank":1}
{"index":{}}
{"content":"Ridser og skjolde","rank":2}
{"index":{}}
{"content":"Skrammet og fuld af nikotin","rank":2}
{"index":{}}
{"content":"Fjerne skum på gulv fra gulv tæppe","rank":2}
{"index":{}}
{"content":"Slibes 1grunder 2 gange lak slid gennem lak","rank":3}
{"index":{}}
{"content":"Fjernelse af køleskab","rank":3}
{"index":{}}
{"content":"Afkalkning bad","rank":4}
{"index":{}}
{"content":"Underside af håndvask","rank":2}
{"index":{}}
{"content":"Radiator","rank":4}
{"index":{}}
{"content":"Vindues fals","rank":2}
{"index":{}}
{"content":"Gennemgang af kontakter","rank":2}
{"index":{}}
{"content":"Afpropning af afløb og spulehane","rank":1}
{"index":{}}
{"content":"Bordplade slibes og lakkeres","rank":8}
{"index":{}}
{"content":"Der skal ikke lappes de 4 huller hvor der sidder skruer i","rank":3}
{"index":{}}
{"content":"Maling af elskab","rank":4}
{"index":{}}
{"content":"Gulvet på altanen","rank":2}
{"index":{}}
{"content":"Afrens og maling","rank":2}
{"index":{}}
{"content":"Rengøring efter fraflytter +skabe bad","rank":3}
{"index":{}}
{"content":"Mærker i gulv","rank":2}
{"index":{}}
{"content":"Lakken mat nogle steder","rank":2}
{"index":{}}
{"content":"Demontering af gardiner / persienner","rank":2}
{"index":{}}
{"content":"Pga. Overmalet med vægmaling","rank":1}
{"index":{}}
{"content":"Ikke istandsat grundet helhedsplan","rank":2}
{"index":{}}
{"content":"Ikke istandsat grundet helhedsplanen","rank":2}
{"index":{}}
{"content":"Gul af nikotin","rank":2}
{"index":{}}
{"content":"Fugeslip på gummifuger","rank":2}
{"index":{}}
{"content":"Rullegardin nedtages","rank":1}
{"index":{}}
{"content":"Skammer","rank":2}
{"index":{}}
{"content":"Stor mørk plamage","rank":2}
{"index":{}}
{"content":"Males indvendigt i underskab på vaskeside tættest dør","rank":1}
{"index":{}}
{"content":"Udvendig vindues puds","rank":2}
{"index":{}}
{"content":"Manglende rosette","rank":1}
{"index":{}}
{"content":"Afpropning af afløb til opvaskemaskine","rank":1}
{"index":{}}
{"content":"Rengøring af teknikskab","rank":2}
{"index":{}}
{"content":"Opskuring og monelbehandling","rank":2}
{"index":{}}
{"content":"Tæret grenrør/vandlås udskiftes","rank":1}
{"index":{}}
{"content":"Maling af bagbeklædning på køkken pga. huller","rank":3}
{"index":{}}
{"content":"Maling af skydedøre hvis muligt","rank":3}
{"index":{}}
{"content":"Vindues falser","rank":4}
{"index":{}}
{"content":"Borehuller samt skrammer efter alarm","rank":2}
{"index":{}}
{"content":"M2 gælder hele lejligheden incl afdækning","rank":3}
{"index":{}}
{"content":"Paneler males i hele lejligheden","rank":3}
{"index":{}}
{"content":"Karm og gerigt til bad males","rank":3}
{"index":{}}
{"content":"Gulv slibes og lakeres","rank":3}
{"index":{}}
{"content":"Rengøring efter fraflytter incl. Bad seng skabe og køl","rank":3}
{"index":{}}
{"content":"Brand mærker og ridser","rank":3}
{"index":{}}
{"content":"Udskiftning af blændstykke under køkkenvask","rank":3}
{"index":{}}
{"content":"Pga. rygning og misfarvning","rank":1}
{"index":{}}
{"content":"Kan ikke gøres ren","rank":1}
{"index":{}}
{"content":"Udvendig på 3 sider","rank":1}
{"index":{}}
{"content":"Stærkt","rank":4}
{"index":{}}
{"content":"Sparkling af huller efter ophæng","rank":3}
{"index":{}}
{"content":"Klister efter gulvtæpper","rank":3}
{"index":{}}
{"content":"Sparkling af huller","rank":3}
{"index":{}}
{"content":"Spartling af huller efter ophæng","rank":3}
{"index":{}}
{"content":"Rep af løs tapet","rank":2}
{"index":{}}
{"content":"alt rengøres","rank":2}
{"index":{}}
{"content":"rengøring mislighold","rank":2}
{"index":{}}
{"content":"manglende rengøring","rank":2}
{"index":{}}
{"content":"Skrammer efter hjælpemiddeler","rank":2}
{"index":{}}
{"content":"Pga. gennemslidning af lak","rank":2}
{"index":{}}
{"content":"Pga. kalk og tæpperester","rank":1}
{"index":{}}
{"content":"Tømning og rydning af hele boligen","rank":2}
{"index":{}}
{"content":"Tapet afrens","rank":2}
{"index":{}}
{"content":"M2gælder hele lejligheden inkl. Afdækning","rank":3}
{"index":{}}
{"content":"Fodpaneler pletmales","rank":3}
{"index":{}}
{"content":"Havedør og karm males","rank":3}
{"index":{}}
{"content":"Manglende fejelister efter gulvtæppe","rank":2}
{"index":{}}
{"content":"M2 gulvbelægning skiftes (brandmærker","rank":3}
{"index":{}}
{"content":"Stue-køkken værelse og bad rengøres efter lejer","rank":3}
{"index":{}}
{"content":"Affarvet efter nikotin","rank":2}
{"index":{}}
{"content":"Efter linolium","rank":2}
{"index":{}}
{"content":"Nikotin samt vandskadet under køleskab","rank":2}
{"index":{}}
{"content":"VÆG: Huller/ ridser/ sorte streger/ mørke plamager/ i el. på vægge. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"SKADE: Skaden er markeret med blå tape. Billeddokumenteret","rank":366}
{"index":{}}
{"content":"LOFT: Huller/ ridser/ sorte streger/ i el. på loftet. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"SKUFFE ØVERST: Fryser skuffe øverst er skadet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"TRAVÆRK: Ridser/sorte mærker på træværk. Billeddokumenteret","rank":1}
{"index":{}}
{"content":"SKUFFE NEDERST: Fryserskuffe nederst er skadet. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"RISTE/PLADER MANGELRE: Riste/ plader i ovn mangler. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"UNDER LAK: Hakker/ ridser i gulvet under lakken. Se blå tape. Billeddokumenteret","rank":123}
{"index":{}}
{"content":"OVERFLADE RIDSER: Overfladeridser i lakken på gulv. Se blå tape. Billeddokumenteret","rank":123}
{"index":{}}
{"content":"KLISTER: Klister fra kabelbakke fjernes fra loft/væg/fodpanel. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"REP: Overfladeridser og hakker i gulv skal repareres. Se blå tape. Billeddokumenteret","rank":123}
{"index":{}}
{"content":"LAMELSLIP: Lamelslip. Se blå tape. Billeddokumenteret","rank":123}
{"index":{}}
{"content":"VINDUER: Vinduer ikke rengjorte udvendig","rank":122}
{"index":{}}
{"content":"ALLE HV: Alle hårde hvidevarer rengøres samt vaskemaskine og tørretumbler på badeværelset. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"KOGEPLADE: Kogeplade ikke rengjort. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"EMHÆTTE: Emhætte ikke rengjort. Billeddokumenteret","rank":122}
{"index":{}}
{"content":"OVN: Ovn ikke rengjort. Billeddokumenteret","rank":121}
{"index":{}}
{"content":"RENGØRING AF BEBOER: Boligen er rengjort af beboer","rank":122}
{"index":{}}
{"content":"Hul i vinyl","rank":2}
{"index":{}}
{"content":"Spartel huller efter ophæng","rank":3}
{"index":{}}
{"content":"Gulvet fremstod med flere hakker i gulvet og lakken gennemslidt","rank":3}
{"index":{}}
{"content":"Rep af huller i vindueskarm efter gardiner","rank":3}
{"index":{}}
{"content":"Fjern af skridsikker tape på 13 trin uden stød","rank":3}
{"index":{}}
{"content":"Flere hakker i gulv af 1 til 3 mm dybe","rank":3}
{"index":{}}
{"content":"Riser i gulv af 5 til 20 cm","rank":3}
{"index":{}}
{"content":"Udbedre fuge mellem vindue og dør","rank":3}
{"index":{}}
{"content":"afkalkning brusekabine","rank":3}
{"index":{}}
{"content":"Hele lejlighed","rank":2}
{"index":{}}
{"content":"Hele lejlighedens fodlister og karme","rank":2}
{"index":{}}
{"content":"Hjul på vej","rank":3}
{"index":{}}
{"content":"Klister fjernes","rank":3}
{"index":{}}
{"content":"Rengøring af radiatorriste","rank":3}
{"index":{}}
{"content":"Liste under dørtrin","rank":3}
{"index":{}}
{"content":"Slipes","rank":3}
{"index":{}}
{"content":"Maling af Gulv og vægge på altan","rank":2}
{"index":{}}
{"content":"Total rengøring ( - hvidevare","rank":2}
{"index":{}}
{"content":"Nyt skab ved siden af vaskeskab","rank":2}
{"index":{}}
{"content":"Vaskes for nikotin","rank":2}
{"index":{}}
{"content":"Rep af hulder i væggen","rank":3}
{"index":{}}
{"content":"Rep af fuge","rank":3}
{"index":{}}
{"content":"Skunk lem x 2 maling","rank":2}
{"index":{}}
{"content":"Total ordning af for og baghave","rank":2}
{"index":{}}
{"content":"Spartel huller efter gardin","rank":3}
{"index":{}}
{"content":"Har ikke været malet før","rank":3}
{"index":{}}
{"content":"Istykker af påkørsel af rollator","rank":2}
{"index":{}}
{"content":"Loftrosette","rank":3}
{"index":{}}
{"content":"Kroge nedtages","rank":2}
{"index":{}}
{"content":"Gulv vaskes for sæberester før gulvmand","rank":2}
{"index":{}}
{"content":"Lapning af huller i vinduesbundstykke i værelse","rank":2}
{"index":{}}
{"content":"Montering af fodlister","rank":2}
{"index":{}}
{"content":"Gulvlak gennemslidt","rank":5}
{"index":{}}
{"content":"Rensning af fliser på terrasse","rank":2}
{"index":{}}
{"content":"Klipning af græs","rank":2}
{"index":{}}
{"content":"Gulvmand skal vurderer gulvet i stue om det kan holde til afslibning","rank":2}
{"index":{}}
{"content":"Lejer ikke enig omkring gulvslibningen","rank":2}
{"index":{}}
{"content":"Rengøres med sprit inden maling","rank":2}
{"index":{}}
{"content":"Mangler at fjerne væg til væg gulvtæpper","rank":3}
{"index":{}}
{"content":"Spartel huller og male","rank":3}
{"index":{}}
{"content":"Fliser er overmalet","rank":3}
{"index":{}}
{"content":"Terassogulv er overmalet","rank":3}
{"index":{}}
{"content":"Ned tagning af lampe","rank":3}
{"index":{}}
{"content":"Skab mangler hyller og låger","rank":3}
{"index":{}}
{"content":"Spejl mangler","rank":3}
{"index":{}}
{"content":"Flere slags maling i loft","rank":3}
{"index":{}}
{"content":"Flere lag tapet hænger løst","rank":3}
{"index":{}}
{"content":"Fjern ødelagt køleskab","rank":3}
{"index":{}}
{"content":"Tegning med kuglepen","rank":2}
{"index":{}}
{"content":"Små mærker i gulv","rank":2}
{"index":{}}
{"content":"Fliser kunne ikke rengøres","rank":2}
{"index":{}}
{"content":"Ekstra afkalkning af gulv og vægge","rank":2}
{"index":{}}
{"content":"Stødtrin males grå","rank":2}
{"index":{}}
{"content":"Vanger fuges og trekant males","rank":2}
{"index":{}}
{"content":"Gl. måler","rank":2}
{"index":{}}
{"content":"Gamle kontakter og lampeudtag udskiftes","rank":2}
{"index":{}}
{"content":"normal","rank":4}
{"index":{}}
{"content":"Indv dør inkl karm udskiftes","rank":2}
{"index":{}}
{"content":"Vanger","rank":2}
{"index":{}}
{"content":"Spartles efter ophæng","rank":6}
{"index":{}}
{"content":"Toilet skab","rank":3}
{"index":{}}
{"content":"Både fodliste og loftliste","rank":3}
{"index":{}}
{"content":"For ens udtryk","rank":2}
{"index":{}}
{"content":"Skrammer pga kørestolsbrug","rank":2}
{"index":{}}
{"content":"Incl demontering af div søm/skruer/kroge","rank":2}
{"index":{}}
{"content":"Hakker i maling","rank":14}
{"index":{}}
{"content":"Rep af huller","rank":2}
{"index":{}}
{"content":"Omlægning af låse","rank":2}
{"index":{}}
{"content":"Termorude udskiftes","rank":2}
{"index":{}}
{"content":"Døre mangler","rank":2}
{"index":{}}
{"content":"Tømning af lejemål samt hovedrengøring når lejemålet er renoveret","rank":3}
{"index":{}}
{"content":"Maskinslibes og olieres","rank":3}
{"index":{}}
{"content":"Hakker i skabs låger","rank":2}
{"index":{}}
{"content":"Huller sider vinduer","rank":2}
{"index":{}}
{"content":"Reparation af epoxy gulv ved afløb","rank":2}
{"index":{}}
{"content":"Kontakter udskiftes ved fodpaneler","rank":1}
{"index":{}}
{"content":"Wc mangler rengøring og afkalkningen","rank":2}
{"index":{}}
{"content":"Komfur ikke rengjort","rank":2}
{"index":{}}
{"content":"Emhætte mangler at blive rengjort","rank":2}
{"index":{}}
{"content":"Skjolder","rank":2}
{"index":{}}
{"content":"Ramme er væk","rank":2}
{"index":{}}
{"content":"Der udføres plet reparation på vægge","rank":2}
{"index":{}}
{"content":"Radiator rør males","rank":2}
{"index":{}}
{"content":"Dørtrin slibes og lakeres da dette ikke har været vedligeholdt i bo perioden","rank":2}
{"index":{}}
{"content":"Ødelagt glasvæg skiftes","rank":2}
{"index":{}}
{"content":"Termoruder ridset pga. husdyrhold (hund","rank":4}
{"index":{}}
{"content":"Fodpaneler ødelagt pga. husdyrhold (hund","rank":2}
{"index":{}}
{"content":"Hoveddør males udvendig","rank":2}
{"index":{}}
{"content":"2 gang maling","rank":3}
{"index":{}}
{"content":"Let maling","rank":3}
{"index":{}}
{"content":"1 gang maling","rank":3}
{"index":{}}
{"content":"Rengøring af hele lejemålet","rank":6}
{"index":{}}
{"content":"Sorte mærker på gulv","rank":3}
{"index":{}}
{"content":"Bruseforhæng holder rengøres","rank":2}
{"index":{}}
{"content":"Gulvet meget kalket","rank":3}
{"index":{}}
{"content":"Garderobe hylde rengøres","rank":2}
{"index":{}}
{"content":"Hul i terrazzo ved afløb","rank":3}
{"index":{}}
{"content":"Udvendig rengøring af terrassedør og vindues parti","rank":2}
{"index":{}}
{"content":"Skur fejes og rengøres","rank":2}
{"index":{}}
{"content":"Maling skallet af","rank":3}
{"index":{}}
{"content":"Alt vaskes ned for nikotin","rank":2}
{"index":{}}
{"content":"Defekt armatur","rank":3}
{"index":{}}
{"content":"Tapet ved hoveddør","rank":3}
{"index":{}}
{"content":"Karm og geregter til toilet males","rank":3}
{"index":{}}
{"content":"Rengøring af seng efter fraflytter","rank":3}
{"index":{}}
{"content":"Loft reparation efter kabellister","rank":2}
{"index":{}}
{"content":"T-stk. k/v tæret","rank":2}
{"index":{}}
{"content":"Afvask","rank":35}
{"index":{}}
{"content":"Skydedøre i bøg udskiftes","rank":2}
{"index":{}}
{"content":"Radiator i bad udskiftes","rank":2}
{"index":{}}
{"content":"Låger lakeres med lak","rank":2}
{"index":{}}
{"content":"Slib og lakering af låger på underskabe","rank":2}
{"index":{}}
{"content":"Strømudtag monteres i dåse. Kabel ligger løst","rank":2}
{"index":{}}
{"content":"Vinyl fjernes","rank":5}
{"index":{}}
{"content":"Meget kalket","rank":6}
{"index":{}}
{"content":"Rydning af lejers inventar","rank":6}
{"index":{}}
{"content":"Pga. Huller efter gardiner","rank":10}
{"index":{}}
{"content":"Og gennemslid af lakken","rank":1}
{"index":{}}
{"content":"Beslag og/ lamper nedtages","rank":1}
{"index":{}}
{"content":"Komfur fjetnes","rank":1}
{"index":{}}
{"content":"Desinficerende alt over alt","rank":6}
{"index":{}}
{"content":"Brud på maling","rank":10}
{"index":{}}
{"content":"Brud på lak","rank":33}
{"index":{}}
{"content":"Mangelende Rengøring","rank":6}
{"index":{}}
{"content":"Slidt og ridset","rank":2}
{"index":{}}
{"content":"Grundet misligeholdelse. Låsesmed på","rank":2}
{"index":{}}
{"content":"Omlægning af cylinder i dør og postkasse samt 3 nye nøgler","rank":2}
{"index":{}}
{"content":"Ned vask af vægge","rank":3}
{"index":{}}
{"content":"Rep. Af kam","rank":3}
{"index":{}}
{"content":"M2 gælder hele lejligheden inklusiv afdægning","rank":3}
{"index":{}}
{"content":"Fodpaneler og geregter pletmales","rank":3}
{"index":{}}
{"content":"Hele gulvet matslibes og lakeres","rank":3}
{"index":{}}
{"content":"Ledning nedtages","rank":8}
{"index":{}}
{"content":"Skureliste skal slibes og have lak","rank":2}
{"index":{}}
{"content":"Værelse ikke tømt","rank":10}
{"index":{}}
{"content":"Plade/Plader mangler","rank":2}
{"index":{}}
{"content":"Mangelende Afkalkning","rank":10}
{"index":{}}
{"content":"Nøgle Mangler","rank":2}
{"index":{}}
{"content":"Omkodning da der mangler nøgle/Nøgler","rank":2}
{"index":{}}
{"content":"Havehegn nedtages","rank":2}
{"index":{}}
{"content":"Forstærkning af trappetrin","rank":2}
{"index":{}}
{"content":"Hakker skrammer","rank":2}
{"index":{}}
{"content":"Rør kasse","rank":2}
{"index":{}}
{"content":"Vask snavset","rank":1}
{"index":{}}
{"content":"Lak gennemslidt ved altandør","rank":3}
{"index":{}}
{"content":"Slibe males ridser og hakker","rank":3}
{"index":{}}
{"content":"Rengøring efter snavs","rank":3}
{"index":{}}
{"content":"Kælderrum var ikke tømt ved fraflytning","rank":3}
{"index":{}}
{"content":"Altan: Noteres og udføres ved bedre vejr forhold. Gulv","rank":2}
{"index":{}}
{"content":"Maghonidør udskiftes","rank":2}
{"index":{}}
{"content":"Terrazzo gulv afkalk og efterbehandles","rank":2}
{"index":{}}
{"content":"Skureliste lakeres x 3","rank":2}
{"index":{}}
{"content":"I forbindelse af afmontering af bord plade","rank":2}
{"index":{}}
{"content":"Efterskrue bøgetræs gulv","rank":2}
{"index":{}}
{"content":"Bøgetræsdør udskiftes","rank":4}
{"index":{}}
{"content":"Gulv reparation","rank":2}
{"index":{}}
{"content":"Udsugning","rank":2}
{"index":{}}
{"content":"Beslag","rank":2}
{"index":{}}
{"content":"Alle dæksler over malet på side skiftes","rank":2}
{"index":{}}
{"content":"Pletmale pletter i overkanten på karmen","rank":3}
{"index":{}}
{"content":"Nyt tæppet op","rank":3}
{"index":{}}
{"content":"Nedtagning af tapet + nyt tapet op","rank":3}
{"index":{}}
{"content":"Nyt tapet 2 gang maling","rank":6}
{"index":{}}
{"content":"Spærres mod gennemslag på færdigmaling","rank":10}
{"index":{}}
{"content":"Loftplader nedtages","rank":2}
{"index":{}}
{"content":"Dørtrin monteres","rank":2}
{"index":{}}
{"content":"Gammel måler udskiftes","rank":2}
{"index":{}}
{"content":"Rengøring af lejemål","rank":3}
{"index":{}}
{"content":"Dør ødelagt af hjælpemidler","rank":2}
{"index":{}}
{"content":"Låger ødelagt af hjælpemidler","rank":2}
{"index":{}}
{"content":"Pga rygning / nikotin","rank":1}
{"index":{}}
{"content":"Ekstra kørsel pga rengøring før maler","rank":1}
{"index":{}}
{"content":"Males efter hundeangreb","rank":2}
{"index":{}}
{"content":"Meget ridset","rank":2}
{"index":{}}
{"content":"Trygmærker","rank":2}
{"index":{}}
{"content":"Males op","rank":3}
{"index":{}}
{"content":"Spartles","rank":6}
{"index":{}}
{"content":"Behandles med olie","rank":3}
{"index":{}}
{"content":"Skruer/kroge pilles ud af loft/vægge","rank":3}
{"index":{}}
{"content":"Vindues pudsning","rank":6}
{"index":{}}
{"content":"Rep. Kun der hvor der er lavet huller","rank":2}
{"index":{}}
{"content":"Væggene er malet mad farver","rank":2}
{"index":{}}
{"content":"Rep af ridser på karme","rank":2}
{"index":{}}
{"content":"Vask vinyl gulve i lejemål","rank":2}
{"index":{}}
{"content":"Rep af skruehuller efter gardiner/persienner på vinduer/døre/lysninger","rank":2}
{"index":{}}
{"content":"Væg/gulvfliser i bruser afkalkes","rank":2}
{"index":{}}
{"content":"Skuffe under ovn rengøres","rank":2}
{"index":{}}
{"content":"Rep af skruehuller efter gardiner/persienner på vinduer/døre/lysninger i hele lejemålet","rank":2}
{"index":{}}
{"content":"Montering af fejelister ved alle døre","rank":3}
{"index":{}}
{"content":"Gennemgås","rank":3}
{"index":{}}
{"content":"Gennem slidt","rank":2}
{"index":{}}
{"content":"Slib og olie","rank":15}
{"index":{}}
{"content":"4 små steder på væg der hvor skyde dør slutter til","rank":3}
{"index":{}}
{"content":"Ridser i gulv efter seng","rank":2}
{"index":{}}
{"content":"Revnet i top plade samt meget beskidt i vandlås","rank":2}
{"index":{}}
{"content":"Kælderrum ikke tømt","rank":12}
{"index":{}}
{"content":"Plade/plader mangler i komfur","rank":6}
{"index":{}}
{"content":"Lejlighed ikke tømt","rank":15}
{"index":{}}
{"content":"Lampe/ledning ikke taget ned","rank":2}
{"index":{}}
{"content":"Ledning ikke taget ned","rank":2}
{"index":{}}
{"content":"Mangelende rengøring","rank":8}
{"index":{}}
{"content":"Lampe ikke fjernet","rank":4}
{"index":{}}
{"content":"Ledning fjernes","rank":2}
{"index":{}}
{"content":"Plade/plader Mangler","rank":4}
{"index":{}}
{"content":"Ledning ikke fjernet","rank":2}
{"index":{}}
{"content":"Feje lister afmonteret efter gulvtæppe","rank":2}
{"index":{}}
{"content":"Brud på Maling","rank":2}
{"index":{}}
{"content":"Nøgle/nøgler Mangler","rank":2}
{"index":{}}
{"content":"Ridsen i lak","rank":2}
{"index":{}}
{"content":"Plade/plader mangler","rank":2}
{"index":{}}
{"content":"Blændpartier","rank":2}
{"index":{}}
{"content":"Pga misfarvning/ nikotin","rank":1}
{"index":{}}
{"content":"Dørplader","rank":2}
{"index":{}}
{"content":"Nøgle/nøgler mangler","rank":2}
{"index":{}}
{"content":"Dørblad udskiftes","rank":2}
{"index":{}}
{"content":"Samt skurelister","rank":2}
{"index":{}}
{"content":"Maling fra vægge","rank":2}
{"index":{}}
{"content":"Vinduespolering gennemgang","rank":2}
{"index":{}}
{"content":"Maling af gerigter efter tømrer arbejde","rank":2}
{"index":{}}
{"content":"Repr. Af tapet","rank":2}
{"index":{}}
{"content":"Vinduesplader","rank":2}
{"index":{}}
{"content":"Vinyl udskiftet","rank":4}
{"index":{}}
{"content":"Ozon behandling","rank":2}
{"index":{}}
{"content":"Afvask med sprit","rank":2}
{"index":{}}
{"content":"Hvidevare komfur","rank":2}
{"index":{}}
{"content":"Efterskrue bøge træs gulve","rank":2}
{"index":{}}
{"content":"Rester af montage tape","rank":2}
{"index":{}}
{"content":"Flyttes til depot","rank":3}
{"index":{}}
{"content":"Mangler vinduespudsning","rank":3}
{"index":{}}
{"content":"Fuger ved dør- og vinduer males hvid","rank":2}
{"index":{}}
{"content":"Pvc fod lister montering Excel. Materialer","rank":2}
{"index":{}}
{"content":"Levering og montering af radiator ved køkken skift","rank":2}
{"index":{}}
{"content":"Velux vindue","rank":2}
{"index":{}}
{"content":"Fliser","rank":2}
{"index":{}}
{"content":"Vindues plader","rank":2}
{"index":{}}
{"content":"Skunklem","rank":2}
{"index":{}}
{"content":"Vask udskiftes","rank":1}
{"index":{}}
{"content":"Flere løse fastgøres","rank":1}
{"index":{}}
{"content":"Afbryder udskiftes","rank":1}
{"index":{}}
{"content":"Vask og armatur udskiftes efter bordplade er udskiftet","rank":1}
{"index":{}}
{"content":"Afhjælpning før bordplade udskiftning","rank":1}
{"index":{}}
{"content":"Pga. Stærk tilsmudsning/misfarvning","rank":7}
{"index":{}}
{"content":"Udskiftes pga. skadet","rank":2}
{"index":{}}
{"content":"Begge sider males","rank":3}
{"index":{}}
{"content":"Plus male","rank":3}
{"index":{}}
{"content":"Kun toppen","rank":6}
{"index":{}}
{"content":"Både vinduer og karm","rank":3}
{"index":{}}
{"content":"Alle gummifuger skiftes","rank":2}
{"index":{}}
{"content":"Dørkarm","rank":9}
{"index":{}}
{"content":"Pga. Huller fra gardiner","rank":2}
{"index":{}}
{"content":"Mangelfuld vedligehold","rank":2}
{"index":{}}
{"content":"Rep og genetablering af antennestik","rank":2}
{"index":{}}
{"content":"Havehegn fjernes og fliser genetableres","rank":2}
{"index":{}}
{"content":"Pga. Huller efter sandlister","rank":1}
{"index":{}}
{"content":"Er malet før","rank":6}
{"index":{}}
{"content":"Skydedør","rank":3}
{"index":{}}
{"content":"Alle mod gårdhave","rank":3}
{"index":{}}
{"content":"Pæren virker ikke","rank":2}
{"index":{}}
{"content":"Opgradering af bruseniche ( mørke fuger","rank":2}
{"index":{}}
{"content":"Køkken plade udskiftes","rank":6}
{"index":{}}
{"content":"Nye lister ved fod lister monteres","rank":2}
{"index":{}}
{"content":"Elkontakter","rank":2}
{"index":{}}
{"content":"Døre udskiftes","rank":2}
{"index":{}}
{"content":"Lak er stærkt genneslidt. Er billede dokumenteret","rank":2}
{"index":{}}
{"content":"Afkalkning af badekar","rank":2}
{"index":{}}
{"content":"Borehuller","rank":2}
{"index":{}}
{"content":"Kontakter og afbrydere udkiftes","rank":1}
{"index":{}}
{"content":"Klar gøre til malening af dør","rank":3}
{"index":{}}
{"content":"Fjern ledninger og lamper","rank":3}
{"index":{}}
{"content":"Afrens af tape fra kabellister","rank":2}
{"index":{}}
{"content":"Rengøring efter byggeri overtagelse","rank":2}
{"index":{}}
{"content":"Afdækning af gulv til maler","rank":2}
{"index":{}}
{"content":"Reparation af ridser i gulv","rank":2}
{"index":{}}
{"content":"Opsætning af struktur tapet ved dør efter kat der har skrabet","rank":2}
{"index":{}}
{"content":"Afskrabning efter kat","rank":2}
{"index":{}}
{"content":"Ballofix fjernes ved radiator. Ikke lovligt","rank":2}
{"index":{}}
{"content":"Afskrabning fra kørestol","rank":2}
{"index":{}}
{"content":"Efter påkørsel af kørestol","rank":2}
{"index":{}}
{"content":"Karmtræ tilpasses til indvendige døre","rank":2}
{"index":{}}
{"content":"Komfur Voss ELK 12020 HV","rank":2}
{"index":{}}
{"content":"Spartel huller","rank":3}
{"index":{}}
{"content":"Kun top","rank":6}
{"index":{}}
{"content":"Fraflytter andel for misligholdt emhætte","rank":2}
{"index":{}}
{"content":"Nyt dørgreb","rank":3}
{"index":{}}
{"content":"Nye hyldebærer","rank":3}
{"index":{}}
{"content":"Pa. Nikotin","rank":2}
{"index":{}}
{"content":"Afkalkning bruseniche","rank":2}
{"index":{}}
{"content":"Loftrosette mangler","rank":9}
{"index":{}}
{"content":"Monterer sandlister/ metal skinner i lejemål","rank":2}
{"index":{}}
{"content":"Fliser/ sanitet kalket til","rank":2}
{"index":{}}
{"content":"Træværk over skydedøren","rank":3}
{"index":{}}
{"content":"Nikotin/ misfarvet","rank":1}
{"index":{}}
{"content":"Dør rengøres. Snavset","rank":1}
{"index":{}}
{"content":"Vaskes og rengøres for støv","rank":2}
{"index":{}}
{"content":"Hvidevarer rengøres","rank":2}
{"index":{}}
{"content":"Finish indvendig","rank":2}
{"index":{}}
{"content":"Se billed","rank":3}
{"index":{}}
{"content":"Anden farve","rank":3}
{"index":{}}
{"content":"Afrensning og monel behandling","rank":2}
{"index":{}}
{"content":"60 cm bred","rank":3}
{"index":{}}
{"content":"Højre hængt","rank":3}
{"index":{}}
{"content":"Maling slået af","rank":6}
{"index":{}}
{"content":"Ikke håndværksmæssigt korrekt","rank":3}
{"index":{}}
{"content":"Toiletskab plus sideplade","rank":3}
{"index":{}}
{"content":"Konventer bænk","rank":3}
{"index":{}}
{"content":"Karme begge sider","rank":3}
{"index":{}}
{"content":"Skader p.g.a. husdyr","rank":2}
{"index":{}}
{"content":"Skramlet p.g.a. kørestolsbrug / rolator","rank":2}
{"index":{}}
{"content":"Spærregrunder p.g.a. nikotin","rank":2}
{"index":{}}
{"content":"Fliser tilkalkede","rank":2}
{"index":{}}
{"content":"Vindues polering","rank":3}
{"index":{}}
{"content":"Gulv vaskes i grundrens","rank":2}
{"index":{}}
{"content":"Rep af ridser og mærker på døre og karme","rank":2}
{"index":{}}
{"content":"Skrammer/ridser","rank":2}
{"index":{}}
{"content":"Hele lejligheden","rank":4}
{"index":{}}
{"content":"Tangent mangler","rank":3}
{"index":{}}
{"content":"Vandbesparende toilet monteres","rank":1}
{"index":{}}
{"content":"Armatur udskiftes","rank":1}
{"index":{}}
{"content":"Grenrør udskiftes","rank":1}
{"index":{}}
{"content":"Folie på","rank":2}
{"index":{}}
{"content":"Dør rengøres","rank":1}
{"index":{}}
{"content":"Mal først en gang","rank":1}
{"index":{}}
{"content":"Light","rank":2}
{"index":{}}
{"content":"Karm 2 sider","rank":2}
{"index":{}}
{"content":"Topbehandling af linoleum","rank":2}
{"index":{}}
{"content":"Vinduesplade males grå","rank":2}
{"index":{}}
{"content":"Beskidt og ikke rengjort","rank":2}
{"index":{}}
{"content":"Afløb afproppes","rank":3}
{"index":{}}
{"content":"Dæksel mangler","rank":9}
{"index":{}}
{"content":"Spærrende mod nikotin","rank":6}
{"index":{}}
{"content":"Males grå som standard","rank":1}
{"index":{}}
{"content":"Alt over alt","rank":6}
{"index":{}}
{"content":"Gummiliste ved hoveddør udskiftes","rank":1}
{"index":{}}
{"content":"Reparation af element","rank":1}
{"index":{}}
{"content":"Reparation Af skraldestativ","rank":1}
{"index":{}}
{"content":"Fjerne film og pudse","rank":3}
{"index":{}}
{"content":"Ulækker og beskidt","rank":3}
{"index":{}}
{"content":"Fjerne velcro rester omkring terresedør","rank":3}
{"index":{}}
{"content":"Udskiftes pga. Misfarvning","rank":3}
{"index":{}}
{"content":"Udskiftes pga. Fugtskade","rank":3}
{"index":{}}
{"content":"Afvaskning af kalk","rank":6}
{"index":{}}
{"content":"Nedtagning af opklisteret kroge","rank":3}
{"index":{}}
{"content":"Køleskab med lille fryseboks","rank":3}
{"index":{}}
{"content":"Rens af flise terrasse","rank":3}
{"index":{}}
{"content":"Velcro rester og misfarvning","rank":3}
{"index":{}}
{"content":"Montering af skraldestatib","rank":3}
{"index":{}}
{"content":"Armatur udskiftes til led","rank":3}
{"index":{}}
{"content":"Nyt wc sæde monteres","rank":3}
{"index":{}}
{"content":"Ny perlator","rank":6}
{"index":{}}
{"content":"Ny bruseslange og hoved","rank":3}
{"index":{}}
{"content":"Parabol nedtages","rank":1}
{"index":{}}
{"content":"Loftliste","rank":6}
{"index":{}}
{"content":"Ikke malet før","rank":3}
{"index":{}}
{"content":"Afkalk","rank":5}
{"index":{}}
{"content":"Skrue huller i vinduer","rank":3}
{"index":{}}
{"content":"Bore huller i vægge","rank":3}
{"index":{}}
{"content":"Skrue huller i altandør","rank":3}
{"index":{}}
{"content":"Hvis de ikke kan blive rene","rank":3}
{"index":{}}
{"content":"Træ håndlister","rank":2}
{"index":{}}
{"content":"Skure liste","rank":2}
{"index":{}}
{"content":"Gardin nedtages","rank":1}
{"index":{}}
{"content":"Reparation efter beslag","rank":1}
{"index":{}}
{"content":"Pga. Gennemslidning af lakken","rank":1}
{"index":{}}
{"content":"Over køkkenbord","rank":3}
{"index":{}}
{"content":"Gennem gang køkken","rank":2}
{"index":{}}
{"content":"Fodpaneler","rank":2}
{"index":{}}
{"content":"Kun rør","rank":6}
{"index":{}}
{"content":"Køkkenskabe og skuffer","rank":3}
{"index":{}}
{"content":"Rep. Skruehuller","rank":3}
{"index":{}}
{"content":"Nye greb","rank":6}
{"index":{}}
{"content":"Garderobeskab","rank":3}
{"index":{}}
{"content":"Badekar ikke rengjort og afkalket. Badekar afkalkes og rengøres","rank":1}
{"index":{}}
{"content":"Bruse/kar blandingsbatteri ikke rengjort og afkalket. Blandingsbatteri afkalkes","rank":1}
{"index":{}}
{"content":"Der er reserveret 4500;- til gulvafslibning","rank":1}
{"index":{}}
{"content":"Dør til garderobe ikke rengjort. Dør afvaskes","rank":1}
{"index":{}}
{"content":"Elkontakter ikke rengjorte. Kontakter rengøres","rank":1}
{"index":{}}
{"content":"Elkontakter løse. Kontakter reetableres","rank":1}
{"index":{}}
{"content":"Falser rengøres","rank":1}
{"index":{}}
{"content":"Gulvtæppe og sandlister ikke fjernede. Tæppe og lister bortskaffes","rank":1}
{"index":{}}
{"content":"Installationsdæksler mangler. Dæksler reetableres","rank":1}
{"index":{}}
{"content":"Kuppel mangler på lampe. Kuppel genetableres","rank":1}
{"index":{}}
{"content":"Lampe ikke fjernet. Lampe bortskaffes","rank":1}
{"index":{}}
{"content":"Radiatorer ikke rengjorte. Radiatorer rengøres","rank":1}
{"index":{}}
{"content":"Radiatorrør ikke malet korrekt. Rør males","rank":1}
{"index":{}}
{"content":"Stikkontakt skadet. Kontakt reetableres","rank":1}
{"index":{}}
{"content":"Stikkontakt skadet. Stikkontakt reetableres","rank":1}
{"index":{}}
{"content":"Søm og skuer i vægge. Søm og skruer fjærnes","rank":1}
{"index":{}}
{"content":"Telefonstik løst. Stik fæstnes","rank":1}
{"index":{}}
{"content":"Terrazzogulv","rank":1}
{"index":{}}
{"content":"Vandhane ikke rengjort og afkalket. Vandhane afkalkes og rengøres","rank":1}
{"index":{}}
{"content":"Hakker efter møbel","rank":2}
{"index":{}}
{"content":"5 stave skiftes","rank":2}
{"index":{}}
{"content":"Ødelagt og ikke rengjort","rank":2}
{"index":{}}
{"content":"Rep af loft efter gummilister + mal","rank":2}
{"index":{}}
{"content":"Rep af isolering inst. Skakt","rank":1}
{"index":{}}
{"content":"Pga.gennem slid af lakken og ikke vedligeholdt","rank":1}
{"index":{}}
{"content":"Rengøring og maling af lysning ved staldvindue","rank":2}
{"index":{}}
{"content":"Der kræves spærregrunder pga. ualmindelig meget nikotin","rank":2}
{"index":{}}
{"content":"Rep. af rutex","rank":2}
{"index":{}}
{"content":"Vindues bundplade ej rengjort","rank":2}
{"index":{}}
{"content":"Fliser ødelagt af hjælpemidler","rank":2}
{"index":{}}
{"content":"Pga.gennemslid af lakken","rank":1}
{"index":{}}
{"content":"Vask af alle flader","rank":3}
{"index":{}}
{"content":"Aftegninger efter væske eller andet","rank":1}
{"index":{}}
{"content":"Vedligeholdelse mangler","rank":1}
{"index":{}}
{"content":"Nikotin og snavs","rank":1}
{"index":{}}
{"content":"Ikke tømt ved fraflytning","rank":3}
{"index":{}}
{"content":"Maling på stikkontakter","rank":3}
{"index":{}}
{"content":"Små hakker og ridser","rank":3}
{"index":{}}
{"content":"Fodlister","rank":6}
{"index":{}}
{"content":"Monteres på vægge","rank":2}
{"index":{}}
{"content":"Nyt bruse armatur","rank":2}
{"index":{}}
{"content":"Pga huller efter gardiner/pasienner","rank":2}
{"index":{}}
{"content":"Samt vask og armatur","rank":2}
{"index":{}}
{"content":"Gulvtæppe rester","rank":6}
{"index":{}}
{"content":"Hoveddør plus side panel","rank":3}
{"index":{}}
{"content":"Sokkel males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Venstre hængt","rank":3}
{"index":{}}
{"content":"Svært misligeholdt","rank":3}
{"index":{}}
{"content":"Fodpaneler og geregter males","rank":3}
{"index":{}}
{"content":"Maling af limtræsbjælke ved lofter. 2 x maling","rank":2}
{"index":{}}
{"content":"Mærker der ikke kan fjernes","rank":2}
{"index":{}}
{"content":"Ridser og hakker lak er slidt","rank":3}
{"index":{}}
{"content":"Afkalkning af badeværelse","rank":6}
{"index":{}}
{"content":"Gerigter pletmales","rank":3}
{"index":{}}
{"content":"Slange og armatur for kalk","rank":1}
{"index":{}}
{"content":"Dørtelefon virker ikke","rank":1}
{"index":{}}
{"content":"Låger og skuffer justeres","rank":1}
{"index":{}}
{"content":"Brænderi bordpladen","rank":2}
{"index":{}}
{"content":"Tapet og bore hul reparation efter eget spartel arbejde","rank":2}
{"index":{}}
{"content":"Slib af træ værk efter eget maler arbejde","rank":2}
{"index":{}}
{"content":"Udskiftning af bøgetræs gulv","rank":2}
{"index":{}}
{"content":"Nedtagning loftlampe","rank":3}
{"index":{}}
{"content":"Nyt brusearmatur","rank":1}
{"index":{}}
{"content":"SKC 2506  L 281","rank":2}
{"index":{}}
{"content":"Manglende vedligeholdelse og misligeholdelse","rank":3}
{"index":{}}
{"content":"Misligeholdelse","rank":9}
{"index":{}}
{"content":"Ny levering af postkasse og dør cylindre","rank":2}
{"index":{}}
{"content":"Loft og vægge males i garderobe skabe","rank":2}
{"index":{}}
{"content":"Lejligheden meget tilrøget","rank":6}
{"index":{}}
{"content":"Fraflytter har ikke gjort ren","rank":2}
{"index":{}}
{"content":"Lejligheden ikke gjort ren","rank":2}
{"index":{}}
{"content":"Skal gøres ren inden håndværker kan gå igang","rank":2}
{"index":{}}
{"content":"Pga. lejligheden er meget beskidt","rank":2}
{"index":{}}
{"content":"Ja","rank":3}
{"index":{}}
{"content":"Gulvslibning","rank":3}
{"index":{}}
{"content":"Udtagning af skruer og/eller rawplugs","rank":3}
{"index":{}}
{"content":"Fraflytter ikke gjort renb","rank":2}
{"index":{}}
{"content":"Skal rengøres inden maler kan gå igang","rank":2}
{"index":{}}
{"content":"Ødelagt/mangler","rank":1}
{"index":{}}
{"content":"Afvaskes og pletmales glans 40 Ral9010","rank":2}
{"index":{}}
{"content":"Afvaskning samt maling 3 x glans 40 Ral9010","rank":2}
{"index":{}}
{"content":"Alm. Rum Væg males 2 gange glans 5 Ral9010","rank":2}
{"index":{}}
{"content":"Badeværelse. Afløbsriste aftages og afløb renses","rank":2}
{"index":{}}
{"content":"Badeværelse. Vandlås aftages og renses","rank":2}
{"index":{}}
{"content":"Badeværelse/Torilet Loft males 2 gange glans 20 Ral9010","rank":2}
{"index":{}}
{"content":"Badeværelse/Torilet Væg males 2 gange glans 20 Ral9010","rank":2}
{"index":{}}
{"content":"Gulvflade Fuldslibes + minimum 3 x mat Kvalitets Lak","rank":2}
{"index":{}}
{"content":"Gulvflade Fuldslibes + minimum 3 x mat Kvalitets lak. Lejer belastes Let Slibning","rank":2}
{"index":{}}
{"content":"Gulvflade Let slibes + minimum 2 x mat kvalitets lak","rank":2}
{"index":{}}
{"content":"Køkken. Emhætte Rengøres","rank":2}
{"index":{}}
{"content":"Køkken. Køle-Fryseskab Rengøres","rank":2}
{"index":{}}
{"content":"Køkken. Køle-Fryseskab Rengøres og Fryser afrimes","rank":2}
{"index":{}}
{"content":"Køkken. Køleskab Rengøres","rank":2}
{"index":{}}
{"content":"Køkken. Loft males 2 x glans 20 Ral9010","rank":2}
{"index":{}}
{"content":"Køkken. Loft males 2 x glans 5 Ral9010","rank":2}
{"index":{}}
{"content":"Køkken. Væg males 2 x glans 20 Ral9010","rank":2}
{"index":{}}
{"content":"Køkken. Væg males 2 x glans 20 Ral9010 I koge og vask zone øvrigt 2 x glans 5 Ral9010","rank":2}
{"index":{}}
{"content":"Køkken. Opvaskemaskine Rengøres","rank":2}
{"index":{}}
{"content":"Køkken. Ovn og emhætte Rengøres","rank":2}
{"index":{}}
{"content":"Køkken. Stålvask afrenses og blandingsbatteri afkalkes","rank":2}
{"index":{}}
{"content":"Køkken. Vandlås aftages og renses","rank":2}
{"index":{}}
{"content":"Ridset og slidt","rank":4}
{"index":{}}
{"content":"Loft males 2  x glans 5 Ral9010","rank":2}
{"index":{}}
{"content":"Loft Spartling og slibning af huller + 2 gange glans 5 Ral9010","rank":2}
{"index":{}}
{"content":"Loft Sætningsskade udbedres på Ejendommes regning (husk max regl","rank":2}
{"index":{}}
{"content":"Mislighold Dør og karm skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Gulv. Afhøvles efterfølgende fuldslibes gulv og påføres + minimum 4 gane mat kvalitets lak","rank":2}
{"index":{}}
{"content":"Mislighold Gulv. Gulv skal udskiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Bordplade Fuldslibes + 2 til 3 gange efterbehandling. OBS. Inklusiv omkostning for afmonteringer","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Bordplade Let slibes + 2 gange efterbehandling. OBS. Inklusiv omkostning for afmonteringer","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Bordplade Udskiftes. OBS. Inklusiv omkostning for af- og påmonteringer","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Køle-Fryse indsatser udskiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Ovnlåge skiftes","rank":2}
{"index":{}}
{"content":"Mislighold køkken Ovnplader skiftes","rank":2}
{"index":{}}
{"content":"Mislighold køkken Ovn skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Skabs hylde skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Skabs låge skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Skraldestativ skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken Skuffe indsatser skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køkken. Væg ukorrekt malet. 1) males med spæremaling for dækning af farve","rank":2}
{"index":{}}
{"content":"Mislighold Loft ukorrekt malet. 1) males med spæremaling for dækning af farve","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning af batterier","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning af lyskilde","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning af spejl","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning blandingsbatteri","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning blandingsbatteri samt bruse enhed","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning Torilet sæde","rank":2}
{"index":{}}
{"content":"Mislighold Udskiftning vask bundprop","rank":2}
{"index":{}}
{"content":"Mislighold Vindue udskiftes","rank":2}
{"index":{}}
{"content":"Mislighold Vindueshasper og stormkroge gennemgås for udskiftning","rank":2}
{"index":{}}
{"content":"Mislighold Væg ukorrekt malet. 1) males med spæremaling for dækning af farve","rank":2}
{"index":{}}
{"content":"Mislighold. Samtlige flader males med minimum 2 gange spærremaling for aflukning og indkapsling af rygerskader. Efterfølgende påføres 2 x glans 5 Ral9010  på væg og loft samt (badeværelse og køkken 2x glans 20 Ral9010) 3 x glans 40 Ral9010 på træværk","rank":2}
{"index":{}}
{"content":"Tørretumbler Rengøres","rank":2}
{"index":{}}
{"content":"Udskiftning af lyskilde","rank":2}
{"index":{}}
{"content":"Vaskemaskine Rengøres","rank":2}
{"index":{}}
{"content":"Væg Sætningsskade udbedres på Ejendommes regning (husk max regl","rank":2}
{"index":{}}
{"content":"Mislighold køkken emhætte defekt skiftes","rank":2}
{"index":{}}
{"content":"Mislighold køkken Kogeplade defekt skiftes","rank":2}
{"index":{}}
{"content":"Mislighold køkken Blandingsbatteri defekt","rank":2}
{"index":{}}
{"content":"Mislighold køkken Køleskab defekt Skiftes","rank":2}
{"index":{}}
{"content":"Mislighold køkken Køle/fryseskab defekt Skiftes","rank":2}
{"index":{}}
{"content":"Mislighold Køle/fryse låge beskadiget","rank":2}
{"index":{}}
{"content":"Mislighold køkken Linoleum / Vinyl beskadiget","rank":2}
{"index":{}}
{"content":"Køkken Gulv- Afvaskes og gives 2 x behandling","rank":2}
{"index":{}}
{"content":"Fodpaneler og fejelister","rank":2}
{"index":{}}
{"content":"Vindues plader slibes og påføres 3 x glans 40 Ral 9010","rank":2}
{"index":{}}
{"content":"Vindues plader slibes og påføres 3 x glans 40 Ral 9010 Træ indfatninger gennemgås for mulig pletmaling","rank":2}
{"index":{}}
{"content":"Vinduesrammer afvaskes og påføres 3 x glans 40 Ral 9010","rank":2}
{"index":{}}
{"content":"Fuge ved loftlister","rank":2}
{"index":{}}
{"content":"Tapet reparation i alle rum","rank":2}
{"index":{}}
{"content":"Loft lem","rank":2}
{"index":{}}
{"content":"Meget nikotinbehæftet","rank":3}
{"index":{}}
{"content":"Kodning af låse i system","rank":2}
{"index":{}}
{"content":"Skabs bunde males","rank":2}
{"index":{}}
{"content":"Males pga. afkrab","rank":3}
{"index":{}}
{"content":"Samt karm","rank":3}
{"index":{}}
{"content":"Samt hakker","rank":3}
{"index":{}}
{"content":"Karme males","rank":3}
{"index":{}}
{"content":"Maling af karm","rank":3}
{"index":{}}
{"content":"Bl bat samt bordplade afkalkes","rank":3}
{"index":{}}
{"content":"Til venstre for vindue i stue monteres fodliste","rank":3}
{"index":{}}
{"content":"Netstik fjernes","rank":3}
{"index":{}}
{"content":"Nyt wc sæde","rank":3}
{"index":{}}
{"content":"Males grå","rank":3}
{"index":{}}
{"content":"Lampe i loft fjernes","rank":3}
{"index":{}}
{"content":"Tapet limes","rank":2}
{"index":{}}
{"content":"Afkalkning af hele badeværelset","rank":3}
{"index":{}}
{"content":"Udskiftning af bundventil","rank":3}
{"index":{}}
{"content":"Klistermærker samt huller i dør","rank":3}
{"index":{}}
{"content":"Skrammer og ridser","rank":4}
{"index":{}}
{"content":"Er meget tilgroet","rank":3}
{"index":{}}
{"content":"Slid efter tæpper","rank":2}
{"index":{}}
{"content":"Hul i skydedør til værelse","rank":2}
{"index":{}}
{"content":"Rens af alger","rank":3}
{"index":{}}
{"content":"Klimatech monteres på væg i gavl","rank":2}
{"index":{}}
{"content":"Finish låger","rank":2}
{"index":{}}
{"content":"Stofledninger fjernes","rank":2}
{"index":{}}
{"content":"Samt løse fliser fastmonteres","rank":2}
{"index":{}}
{"content":"Filter samt beslag mangler","rank":2}
{"index":{}}
{"content":"Hvid 01 refleksfri","rank":2}
{"index":{}}
{"content":"Bad gulv epoxy behandling","rank":2}
{"index":{}}
{"content":"M2 Gælder hele lejligheden  incl. afdækning","rank":3}
{"index":{}}
{"content":"M2 gælder hele lejligheden incl. afdækning","rank":3}
{"index":{}}
{"content":"2 stk vindueskarme males efter fugt skader","rank":3}
{"index":{}}
{"content":"Hele lejligheden rengøres efter fraflytter","rank":3}
{"index":{}}
{"content":"Incl køleskab","rank":3}
{"index":{}}
{"content":"Opgradering af tapet arbejde","rank":2}
{"index":{}}
{"content":"Demontering af div søm / skruer","rank":2}
{"index":{}}
{"content":"Se mangelliste/ indflytningsrapport","rank":5}
{"index":{}}
{"content":"Se mangelliste/indflytningsrapport","rank":12}
{"index":{}}
{"content":"Afløb utæt","rank":2}
{"index":{}}
{"content":"Fjern skillevæg","rank":3}
{"index":{}}
{"content":"Lakering af gulv pga gennem slid af lak","rank":1}
{"index":{}}
{"content":"Maling af fodlister pga. overmalet","rank":1}
{"index":{}}
{"content":"Dør gerigter udskiftes","rank":2}
{"index":{}}
{"content":"Pga. Skidt og fedt","rank":1}
{"index":{}}
{"content":"Pga fedt og snavs","rank":1}
{"index":{}}
{"content":"Ridser og bobbler","rank":3}
{"index":{}}
{"content":"Pga. Overmalet","rank":1}
{"index":{}}
{"content":"Bude i skab","rank":3}
{"index":{}}
{"content":"Lampe ikke standard","rank":2}
{"index":{}}
{"content":"Vindue kan ikke lukke ordentlig","rank":2}
{"index":{}}
{"content":"Ikke rengjort ved fraflytningsynet","rank":3}
{"index":{}}
{"content":"Spærre pga rygning","rank":3}
{"index":{}}
{"content":"M 2 gælder hele lejligheden alle rum incl afdækning","rank":3}
{"index":{}}
{"content":"Gulv slibes og 2 gange lak","rank":3}
{"index":{}}
{"content":"Slidt gennem lak og brandmærker","rank":3}
{"index":{}}
{"content":"Nye håndtag på alle skab og skabslåge","rank":3}
{"index":{}}
{"content":"Udsk af udlagt dør","rank":3}
{"index":{}}
{"content":"Div. afkalkning","rank":2}
{"index":{}}
{"content":"Manglede afkalkning","rank":3}
{"index":{}}
{"content":"Højskab klargøres til nyt","rank":3}
{"index":{}}
{"content":"Manglende rengørning","rank":26}
{"index":{}}
{"content":"Nyt armatur monteres samt vandbesparende toilet","rank":2}
{"index":{}}
{"content":"Ny vask monteres samt vandbesparende toilet","rank":2}
{"index":{}}
{"content":"Kalk på gulvet","rank":3}
{"index":{}}
{"content":"Vægge/lofter/paneler ikke malbar grundet rygning","rank":3}
{"index":{}}
{"content":"Manglende rengørnig","rank":2}
{"index":{}}
{"content":"Pga manglende rengørning","rank":6}
{"index":{}}
{"content":"Rep af fyldning i altandør","rank":3}
{"index":{}}
{"content":"Mangler at aflever en nøgle","rank":2}
{"index":{}}
{"content":"55 cm","rank":3}
{"index":{}}
{"content":"Der er skader efter persienner","rank":6}
{"index":{}}
{"content":"Skabe og skuffer rengøres","rank":2}
{"index":{}}
{"content":"Der tages forbehold for gulvet kan blive rent og ikke lugter af urin","rank":4}
{"index":{}}
{"content":"Alle kontakter rengøres","rank":2}
{"index":{}}
{"content":"Udskiftning af cylinder i skabsboks","rank":3}
{"index":{}}
{"content":"Alle kontakter vaskes","rank":2}
{"index":{}}
{"content":"Træværk pletmales","rank":3}
{"index":{}}
{"content":"Ej fjernet ældre vaskemaskine","rank":2}
{"index":{}}
{"content":"Ekstra maler behandling","rank":2}
{"index":{}}
{"content":"Slidt og masser gulv tape","rank":3}
{"index":{}}
{"content":"Misvedligholdse af væggen som skal pudses op","rank":3}
{"index":{}}
{"content":"Slidt gennem lak","rank":3}
{"index":{}}
{"content":"Kun karm","rank":3}
{"index":{}}
{"content":"Let slip og 2 gang lak","rank":3}
{"index":{}}
{"content":"I forbindelse med nyt gulv","rank":3}
{"index":{}}
{"content":"Vægge/loft/træværk  er ikke malbar skal  spærres","rank":3}
{"index":{}}
{"content":"Rengøring efter håndværkere","rank":8}
{"index":{}}
{"content":"Lofter","rank":9}
{"index":{}}
{"content":"Hoved dør x 3","rank":2}
{"index":{}}
{"content":"Væg hvor skab har stået grundes inden maling","rank":2}
{"index":{}}
{"content":"Køkkenskabe og skuffer eftergås og justeres","rank":1}
{"index":{}}
{"content":"Skab står løst i køkken","rank":1}
{"index":{}}
{"content":"Der er meget snavset diverse steder","rank":3}
{"index":{}}
{"content":"Dør plade mangler","rank":2}
{"index":{}}
{"content":"Nullermænd","rank":2}
{"index":{}}
{"content":"Hoveddør plus sideplade","rank":3}
{"index":{}}
{"content":"Skæring indtil stue","rank":3}
{"index":{}}
{"content":"Montering af fodplade","rank":3}
{"index":{}}
{"content":"Rep af skabsbund ved køleskab","rank":3}
{"index":{}}
{"content":"Nyt filter","rank":3}
{"index":{}}
{"content":"Pudsning af ovenlys vinduer","rank":3}
{"index":{}}
{"content":"Rep af vindue","rank":3}
{"index":{}}
{"content":"Pudsning","rank":3}
{"index":{}}
{"content":"Montering af låge","rank":3}
{"index":{}}
{"content":"Udskift wcsæde","rank":3}
{"index":{}}
{"content":"Udskift armatur","rank":3}
{"index":{}}
{"content":"Afkalk bad","rank":2}
{"index":{}}
{"content":"Hoved dør males 1000 N","rank":2}
{"index":{}}
{"content":"Rep af hjørne ved terrassedør","rank":2}
{"index":{}}
{"content":"Gennemsnittet flere steder","rank":2}
{"index":{}}
{"content":"Gennemslidt flere steder","rank":2}
{"index":{}}
{"content":"Skal rengøres inden maler","rank":2}
{"index":{}}
{"content":"Pga manglede rengørning diverse ekstra","rank":2}
{"index":{}}
{"content":"Nyt greb","rank":3}
{"index":{}}
{"content":"Efter skrue knirkende gulve","rank":2}
{"index":{}}
{"content":"Store afrevne pletter","rank":2}
{"index":{}}
{"content":"Efter gulv slib","rank":3}
{"index":{}}
{"content":"Afkalkning af gulv og vægge samt på siderne af toiletet","rank":3}
{"index":{}}
{"content":"Fodlister males pga. ridser og mærker","rank":6}
{"index":{}}
{"content":"Vinduer og altan dør males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Loft lift ej rengjort","rank":2}
{"index":{}}
{"content":"Vægfliser rengøres for kalk og sorte streger","rank":2}
{"index":{}}
{"content":"Gulv rengøres for kalk","rank":2}
{"index":{}}
{"content":"Lejligheden skal gøres ren inden maler kan kommer til","rank":4}
{"index":{}}
{"content":"Montering af nye pvc fod lister","rank":2}
{"index":{}}
{"content":"Reparation","rank":4}
{"index":{}}
{"content":"Boligen er ikke istandsat pga. Den kommende\nsammenlægning/renovlering. Boligen er midlertidigt\nudlejet, og er kun rengjor","rank":1}
{"index":{}}
{"content":"Meget ridset samt vand opfugtet ved køleskab strøm afbrudt og køleskab afrimet","rank":2}
{"index":{}}
{"content":"Ridset og misligholdt","rank":4}
{"index":{}}
{"content":"Tømme for indbo og klargøring til håndværker","rank":2}
{"index":{}}
{"content":"Ikkerengjort","rank":2}
{"index":{}}
{"content":"Skruehuller efter gardinstænger","rank":2}
{"index":{}}
{"content":"Ridser efter møbler","rank":2}
{"index":{}}
{"content":"Slidt efter gulvtæpper/møbler","rank":2}
{"index":{}}
{"content":"Stødmærker","rank":6}
{"index":{}}
{"content":"Fugtskade manglende forhæng","rank":3}
{"index":{}}
{"content":"Ud og indvendvigt","rank":3}
{"index":{}}
{"content":"Ind og udvendigt","rank":3}
{"index":{}}
{"content":"Meget gule","rank":3}
{"index":{}}
{"content":"Forkertmalerbehandling. Skal maskinslibes og males 2 gange","rank":3}
{"index":{}}
{"content":"Rep efter gardin","rank":3}
{"index":{}}
{"content":"Plus mal","rank":3}
{"index":{}}
{"content":"Af og påmonteres for tømrer","rank":3}
{"index":{}}
{"content":"Gasmåler nedtaget","rank":3}
{"index":{}}
{"content":"Håndvask af og påmonteres for tømrer","rank":3}
{"index":{}}
{"content":"Løse kontakter","rank":3}
{"index":{}}
{"content":"Kraftig slitage","rank":3}
{"index":{}}
{"content":"Slitage","rank":3}
{"index":{}}
{"content":"Til håndvask","rank":3}
{"index":{}}
{"content":"Manglende bortskaffelse","rank":6}
{"index":{}}
{"content":"Fjern skabe og gulvtæppe","rank":3}
{"index":{}}
{"content":"Slid og ridser","rank":3}
{"index":{}}
{"content":"Ifø cera udskiftes","rank":3}
{"index":{}}
{"content":"Revne i gulv udbedres og slibes poleres","rank":3}
{"index":{}}
{"content":"Depotrum","rank":4}
{"index":{}}
{"content":"Skal afrenses i sod og nikotinrens","rank":2}
{"index":{}}
{"content":"Rengøring af skabe og bordplader","rank":3}
{"index":{}}
{"content":"Rydning af have for ukrudt","rank":6}
{"index":{}}
{"content":"Standard lampe mangler","rank":1}
{"index":{}}
{"content":"2 farvet og skrammet","rank":2}
{"index":{}}
{"content":"Ikke r","rank":2}
{"index":{}}
{"content":"Sorte","rank":2}
{"index":{}}
{"content":"Ridset 2 systemer","rank":2}
{"index":{}}
{"content":"Der tages forbehold for helt nyt gulv","rank":2}
{"index":{}}
{"content":"Der tages forbehold for gulvet","rank":2}
{"index":{}}
{"content":"Så græs og lave haven pæn igen efter hund","rank":2}
{"index":{}}
{"content":"Kan ikke vurderer gulvet grund af skidt og møg","rank":2}
{"index":{}}
{"content":"Vaskes og poleres","rank":2}
{"index":{}}
{"content":"Vurderes efter rengøring","rank":2}
{"index":{}}
{"content":"Diverse fjernes","rank":2}
{"index":{}}
{"content":"Skrammer efter møbel","rank":2}
{"index":{}}
{"content":"Skabene står i baderum","rank":2}
{"index":{}}
{"content":"Inventar hører ikke til lejemålet","rank":1}
{"index":{}}
{"content":"Ødelagt","rank":1}
{"index":{}}
{"content":"Hvidevarer rengøring","rank":4}
{"index":{}}
{"content":"Postkasse lås omlagt","rank":2}
{"index":{}}
{"content":"Fjerne folie på stænkeplade","rank":2}
{"index":{}}
{"content":"Let vask","rank":2}
{"index":{}}
{"content":"Nedvask loft og spærre på loft på grund af manglede rengøring","rank":6}
{"index":{}}
{"content":"Nedvask vægge og spærre på vægge på grund af manglede rengøring","rank":3}
{"index":{}}
{"content":"manglede afkalkning","rank":12}
{"index":{}}
{"content":"Grundet misligehold","rank":2}
{"index":{}}
{"content":"Just Works™","rank":2}
{"index":{}}
{"content":"Tømrer arbejde","rank":2}
{"index":{}}
{"content":"Postkasse lås","rank":2}
{"index":{}}
{"content":"Skab i bryggers fornyes til tilsvarende","rank":2}
{"index":{}}
{"content":"Dørblad","rank":2}
{"index":{}}
{"content":"Manglende hyller i skab","rank":2}
{"index":{}}
{"content":"Cylinder omlægning","rank":2}
{"index":{}}
{"content":"A","rank":30}
{"index":{}}
{"content":"Mis","rank":15}
{"index":{}}
{"content":"Rengøring efter håndværker har monteret nyt køkken og nye gulve","rank":3}
{"index":{}}
{"content":"Træværk males efter ridser og mærker","rank":4}
{"index":{}}
{"content":"Vinduer males efter gardiner og mærker","rank":2}
{"index":{}}
{"content":"Hoveddør males efter Div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Dørplade males efter ridser og mærker","rank":2}
{"index":{}}
{"content":"Loftlem males efter Div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Radiatorer støvsuges og afvaskes","rank":2}
{"index":{}}
{"content":"Kontakter og lampeudtag ej rengjort","rank":2}
{"index":{}}
{"content":"Maling af fodlister pga. ridser og skrammer","rank":1}
{"index":{}}
{"content":"Vægmaling på stikkontakter/lampeudtag","rank":2}
{"index":{}}
{"content":"Vask af vinduer alle rum","rank":1}
{"index":{}}
{"content":"2 stk. Stave skiftes mod køkken","rank":2}
{"index":{}}
{"content":"Blændplader","rank":2}
{"index":{}}
{"content":"Der laves kun det nødvendige","rank":2}
{"index":{}}
{"content":"Fodlister males for ridser og mærker","rank":2}
{"index":{}}
{"content":"Vindue og terressedør males for ridser og mærker","rank":2}
{"index":{}}
{"content":"Males for ridser og mærker","rank":2}
{"index":{}}
{"content":"Dug ruder udskiftes","rank":2}
{"index":{}}
{"content":"Rengøres for nikotin","rank":2}
{"index":{}}
{"content":"Mistanke om stofledninger","rank":2}
{"index":{}}
{"content":"Låse omlægges uden for system","rank":2}
{"index":{}}
{"content":"Maling af vindue pga. skrammer","rank":1}
{"index":{}}
{"content":"Mangler rosette","rank":1}
{"index":{}}
{"content":"Male af loft","rank":3}
{"index":{}}
{"content":"Ny rutex","rank":3}
{"index":{}}
{"content":"Rep. Af gulv","rank":3}
{"index":{}}
{"content":"Rep.dørplade","rank":3}
{"index":{}}
{"content":"Totalrengøring af hele rum","rank":3}
{"index":{}}
{"content":"Rep.af kam","rank":3}
{"index":{}}
{"content":"Male af træværk","rank":3}
{"index":{}}
{"content":"Kat tisse / udskiftning af gulve","rank":3}
{"index":{}}
{"content":"Reparation af gulv med indfletning","rank":3}
{"index":{}}
{"content":"Genopsætning af køkken skab","rank":3}
{"index":{}}
{"content":"Fuldafslibning og 3 gange lak","rank":3}
{"index":{}}
{"content":"Rengøring dør","rank":3}
{"index":{}}
{"content":"Komfur og emfang fjernes","rank":3}
{"index":{}}
{"content":"Vinduer snavsede","rank":3}
{"index":{}}
{"content":"Tæppetape på gulv","rank":3}
{"index":{}}
{"content":"Døre bæres op","rank":3}
{"index":{}}
{"content":"Badeværelse afkalkes og rengøres","rank":3}
{"index":{}}
{"content":"Rengøring af trinette","rank":2}
{"index":{}}
{"content":"Fodlister males for div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Vinduer Rep. efter gardiner","rank":2}
{"index":{}}
{"content":"Dørplade males for ridser og mærker","rank":4}
{"index":{}}
{"content":"ej rengjort","rank":2}
{"index":{}}
{"content":"Radiatorer støvsuges og rengøres til ren bund","rank":2}
{"index":{}}
{"content":"Loftlift rengøres","rank":2}
{"index":{}}
{"content":"Hvidt jf. vedligeholdelsesreglement","rank":2}
{"index":{}}
{"content":"Låger og vandrette flader","rank":3}
{"index":{}}
{"content":"Ved altandør","rank":3}
{"index":{}}
{"content":"Demontering af lampe","rank":3}
{"index":{}}
{"content":"Indvending og udvendigt","rank":3}
{"index":{}}
{"content":"Håndtag demonteres","rank":3}
{"index":{}}
{"content":"Rør under vask males","rank":3}
{"index":{}}
{"content":"Fjerne klister mærker","rank":3}
{"index":{}}
{"content":"Spærregrunder","rank":2}
{"index":{}}
{"content":"Hoved dør","rank":2}
{"index":{}}
{"content":"Rengøring hvidevarer","rank":2}
{"index":{}}
{"content":"Håndtag nedtages","rank":1}
{"index":{}}
{"content":"Linoleums gulv ej rengjort og mangler polish behandling","rank":2}
{"index":{}}
{"content":"Dørplade rep. og plet for ridser og mærker","rank":2}
{"index":{}}
{"content":"Totalrengøring af rum","rank":3}
{"index":{}}
{"content":"Dørkam","rank":3}
{"index":{}}
{"content":"Ødelagt gulve","rank":3}
{"index":{}}
{"content":"Gardiner nedtages","rank":4}
{"index":{}}
{"content":"Nye greb plastik","rank":3}
{"index":{}}
{"content":"Hængsler udsk","rank":3}
{"index":{}}
{"content":"Rengøres pga kalk","rank":3}
{"index":{}}
{"content":"Inge lak på men er slib","rank":3}
{"index":{}}
{"content":"Fjern linolium+lister","rank":2}
{"index":{}}
{"content":"Vægge males med diffusionsåben maling","rank":2}
{"index":{}}
{"content":"Folie på træværk","rank":2}
{"index":{}}
{"content":"D","rank":3}
{"index":{}}
{"content":"Udvidet","rank":2}
{"index":{}}
{"content":"Maling af hoveddør","rank":2}
{"index":{}}
{"content":"Køkken plader udskiftes","rank":2}
{"index":{}}
{"content":"Låge til vaske skab","rank":2}
{"index":{}}
{"content":"Afd","rank":6}
{"index":{}}
{"content":"Misl","rank":12}
{"index":{}}
{"content":"Afkalkning af vægfliser. Grundet misligeholdelse","rank":2}
{"index":{}}
{"content":"Fjerne overflødig spartelmasse","rank":2}
{"index":{}}
{"content":"Dårlig rengøring","rank":15}
{"index":{}}
{"content":"Nye fejelister på grund af silicone","rank":3}
{"index":{}}
{"content":"Sa","rank":3}
{"index":{}}
{"content":"Fyldt med silicone","rank":3}
{"index":{}}
{"content":"Skabe monteres","rank":2}
{"index":{}}
{"content":"Bruser ikke standard","rank":1}
{"index":{}}
{"content":"Standard badeværelsesudstyr opsættes","rank":1}
{"index":{}}
{"content":"Loftlister ved skab males hvide","rank":1}
{"index":{}}
{"content":"V","rank":6}
{"index":{}}
{"content":"Afkalkning af brusezone","rank":3}
{"index":{}}
{"content":"Montering af sandlister pga at de sidder højt efter montering af gulvtæpper","rank":2}
{"index":{}}
{"content":"snavset og gult","rank":3}
{"index":{}}
{"content":"Gult og snavset","rank":12}
{"index":{}}
{"content":"Gult og snavset. Venstre væg ikke malbar","rank":3}
{"index":{}}
{"content":"Haven er ikke ryddet","rank":2}
{"index":{}}
{"content":"Lejers indbo bortkøres","rank":3}
{"index":{}}
{"content":"Diverse klistermærker fjernes","rank":3}
{"index":{}}
{"content":"Ridset og mærker in","rank":2}
{"index":{}}
{"content":"Lejemålet fremstår svært misligholdt overalt. Have samt flisearealer er tilgroede og mosbefængte. Lejligheden bærer voldsomt præg af husdyrhold","rank":1}
{"index":{}}
{"content":"Mislig","rank":3}
{"index":{}}
{"content":"Komfur og let rengøring","rank":3}
{"index":{}}
{"content":"Pga. Huller efter billeder/ gardiner","rank":1}
{"index":{}}
{"content":"M","rank":3}
{"index":{}}
{"content":"Genmonteres","rank":3}
{"index":{}}
{"content":"Loftudtag dæksel udskiftes","rank":1}
{"index":{}}
{"content":"Stor revne i væg armeres så den ikke genopstår","rank":1}
{"index":{}}
{"content":"Karm og geregter til stue-værelse males","rank":3}
{"index":{}}
{"content":"Fodpanel males hvis rengøring ikke er nok","rank":3}
{"index":{}}
{"content":"Om nødvendigt behandles med spærrer før maling grundet rygning","rank":3}
{"index":{}}
{"content":"Rengøring efter rygning","rank":3}
{"index":{}}
{"content":"Vedligeholdelse afd","rank":2}
{"index":{}}
{"content":"Gulv, dørtrin fuld slibes og lakeres på grund af ridser og skrammer","rank":6}
{"index":{}}
{"content":"Gulv let slibes og lakeres på grund af ridser og skrammer","rank":9}
{"index":{}}
{"content":"Afmontering af gaskomfur og afpropning af installation","rank":6}
{"index":{}}
{"content":"Bortkørsel af hvidevarer","rank":6}
{"index":{}}
{"content":"Dør afhentes i kælderrum og monteres","rank":6}
{"index":{}}
{"content":"Have ikke er vedligeholdt. Genoprettes til afdelingens standard","rank":6}
{"index":{}}
{"content":"Resttømning, kælderrum ryddes og fejes","rank":6}
{"index":{}}
{"content":"Resttømning, nedtagning af gardinstænger","rank":6}
{"index":{}}
{"content":"Oplukning af postkasse og montering af ny cylinder med 2 nøgler","rank":6}
{"index":{}}
{"content":"Resttømning af inventar i lejemålet","rank":6}
{"index":{}}
{"content":"Overflader, vægge spærres med isoleringsgrunder da de er meget snavsede","rank":6}
{"index":{}}
{"content":"Overflader","rank":12}
{"index":{}}
{"content":"Overflader, loft spærres med isoleringsgrunder da de er meget snavsede","rank":3}
{"index":{}}
{"content":"Terrazzogulv slibes og topbehandles da det ikke kan rengøres","rank":6}
{"index":{}}
{"content":"Terrazzogulv afkalkes og  topbehandles","rank":6}
{"index":{}}
{"content":"Rengøring, sanitet afkalkes og rengøres","rank":6}
{"index":{}}
{"content":"Rengøring, vinduesparti rengøres grundigt i falser og omkring beslag","rank":3}
{"index":{}}
{"content":"Rengøring, håndvask snavset og tilkalket, afkalkes og rengøres","rank":6}
{"index":{}}
{"content":"Rengøring, hovedrengøring og vinduespolering","rank":3}
{"index":{}}
{"content":"Stikkontakt ødelagt","rank":3}
{"index":{}}
{"content":"Stikkontakt ødelagt, - udskiftes","rank":3}
{"index":{}}
{"content":"Loftroset ødelagt/låg mangler","rank":3}
{"index":{}}
{"content":"Loftroset ødelagt/låg mangler, udskiftes","rank":3}
{"index":{}}
{"content":"Antenne dåse ødelagt","rank":6}
{"index":{}}
{"content":"Køkkenbordsplade beskadiget og kan ikke repareres, udskiftes komplet med ny skureliste","rank":6}
{"index":{}}
{"content":"Overflader, træværk afvaskes slibes og grundes - klar til færdigmaling","rank":3}
{"index":{}}
{"content":"Rengøring, køkkeninventar afvaskes ind og udvendigt","rank":3}
{"index":{}}
{"content":"Rengøring, vinduespolering","rank":6}
{"index":{}}
{"content":"Rengøring, afkalkning og rengøring af fliser","rank":3}
{"index":{}}
{"content":"Malerbehandling af loftoverflader","rank":3}
{"index":{}}
{"content":"Flytning af bohave fra bolig og depotrum til skifteretsdepot","rank":3}
{"index":{}}
{"content":"Gulvet skal skiftes da der er omfattende skader som ikke kan oprettes ved slibning og lakering","rank":3}
{"index":{}}
{"content":"Malerbehandling af vægoverflader","rank":3}
{"index":{}}
{"content":"Malerbehandling af træværk","rank":3}
{"index":{}}
{"content":"Loftoverflader meget snavsede","rank":3}
{"index":{}}
{"content":"Vægoverflader meget snavsede","rank":3}
{"index":{}}
{"content":"Træværk meget snavset, kan ikke overmales. Slibes og grundes","rank":3}
{"index":{}}
{"content":"Køkkenbordsplade udskiftes - ødelagt af længere tids  vandpåvirkning","rank":3}
{"index":{}}
{"content":"Toiletsæde udskiftes","rank":6}
{"index":{}}
{"content":"Varmemåler fjernet/ødelagt. Montering af ny varmemåler","rank":6}
{"index":{}}
{"content":"Vinduesbeslag ødelagt som følge af forkert brug, - repareres eller udskiftes","rank":6}
{"index":{}}
{"content":"Radiator, serviceføler ødelagt, ny monteres","rank":6}
{"index":{}}
{"content":"Udskiftning af ANTAL fliser som er ødelagte som følge af ophæng","rank":6}
{"index":{}}
{"content":"Resttømning","rank":3}
{"index":{}}
{"content":"Resttømning, nedtagning af diverse søm skruer og beslag mv","rank":3}
{"index":{}}
{"content":"Vindue, gummilister beskadiget, skal udskiftes","rank":3}
{"index":{}}
{"content":"Overflader, dør/døre slibes og grundes - klar til færdigmaling","rank":3}
{"index":{}}
{"content":"Overflader, vægge - udskiftning af XXX baner tapet som er beskadiget","rank":3}
{"index":{}}
{"content":"Døre, - udskiftning af ødelagt fyldning","rank":3}
{"index":{}}
{"content":"Døre, - udskiftning af dørgreb","rank":3}
{"index":{}}
{"content":"Toilet udskiftes, kan ikke rengøres","rank":6}
{"index":{}}
{"content":"Rengøring, toilet snavset og tilkalket, afkalkes og rengøres","rank":3}
{"index":{}}
{"content":"Manglende håndtag","rank":2}
{"index":{}}
{"content":"Sidt igennem lak","rank":2}
{"index":{}}
{"content":"Afrens af maling på div","rank":2}
{"index":{}}
{"content":"Vindue fladt for","rank":2}
{"index":{}}
{"content":"Dyb ridse efter kørestol eller lign","rank":2}
{"index":{}}
{"content":"Voss elk 13020 hv","rank":2}
{"index":{}}
{"content":"Opgradering af hæk","rank":2}
{"index":{}}
{"content":"Slibes og males færdig. Pga hakker og ridser","rank":3}
{"index":{}}
{"content":"Rengør","rank":4}
{"index":{}}
{"content":"Håndtag til køleskab samt nedtagning af lamper","rank":2}
{"index":{}}
{"content":"Der er tisse på gulve","rank":3}
{"index":{}}
{"content":"Gardinstang fjernes","rank":2}
{"index":{}}
{"content":"Spartling +maling af lysning","rank":1}
{"index":{}}
{"content":"Ikke mal bar overflade mangler rutex","rank":3}
{"index":{}}
{"content":"Vægge afrenses for skimmel","rank":3}
{"index":{}}
{"content":"Skab nedtages","rank":3}
{"index":{}}
{"content":"Afrenses for klistermærker","rank":3}
{"index":{}}
{"content":"Lofter og vægge males med spærrer","rank":3}
{"index":{}}
{"content":"Spærrende malling","rank":3}
{"index":{}}
{"content":"Rydning af fraflytters inventar","rank":9}
{"index":{}}
{"content":"4 mm spejl 119 x 66 cm monteres","rank":2}
{"index":{}}
{"content":"Gaskomfur demonteres og bortskaffes","rank":3}
{"index":{}}
{"content":"Skimmel på ydervæg","rank":3}
{"index":{}}
{"content":"Højskab til køleskab","rank":3}
{"index":{}}
{"content":"Ekstra Slibning af","rank":2}
{"index":{}}
{"content":"Slib og 3 x lak","rank":3}
{"index":{}}
{"content":"Forsegles","rank":3}
{"index":{}}
{"content":"malerbehandling af fodpanel","rank":3}
{"index":{}}
{"content":"Pga. Misfarvning og skidt","rank":1}
{"index":{}}
{"content":"Bag / rør","rank":2}
{"index":{}}
{"content":"Effekter fjernes se billeder","rank":2}
{"index":{}}
{"content":"Karme males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Ved håndtag","rank":2}
{"index":{}}
{"content":"Radiator males pga. ridser og mærker","rank":4}
{"index":{}}
{"content":"Vindue males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Skabslåge males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Loft lem x2","rank":2}
{"index":{}}
{"content":"Dørplade males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Gulvtæppe renses","rank":2}
{"index":{}}
{"content":"Malet med mørk farve","rank":2}
{"index":{}}
{"content":"finish","rank":2}
{"index":{}}
{"content":"Pga. Kraftig tilsmudsning og misfarvning","rank":1}
{"index":{}}
{"content":"Gulvtæppe ødelagt af bla. brandmærker","rank":2}
{"index":{}}
{"content":"Lim og tape rester","rank":1}
{"index":{}}
{"content":"Dørplade udskiftes pga. hul","rank":2}
{"index":{}}
{"content":"Efter væske","rank":1}
{"index":{}}
{"content":"Ikke lukket","rank":1}
{"index":{}}
{"content":"Bortskaffelse af inventar","rank":3}
{"index":{}}
{"content":"Slidt og manglende vedligehold","rank":3}
{"index":{}}
{"content":"Forkert malerarbejde","rank":3}
{"index":{}}
{"content":"Meget gult","rank":3}
{"index":{}}
{"content":"Ny låge i overskab","rank":3}
{"index":{}}
{"content":"Loft armatur nedtages","rank":3}
{"index":{}}
{"content":"Udskiftning af loft udtag","rank":3}
{"index":{}}
{"content":"Udskiftning af kontakter","rank":3}
{"index":{}}
{"content":"Nedtagning af skab ved vindue","rank":3}
{"index":{}}
{"content":"Hele lejemål","rank":2}
{"index":{}}
{"content":"Gælder hele lejligheden","rank":6}
{"index":{}}
{"content":"Pga. misfarvning","rank":1}
{"index":{}}
{"content":"Væg ved nedtaget garderobe","rank":1}
{"index":{}}
{"content":"Fodliste fuges mod rutex","rank":2}
{"index":{}}
{"content":"Ruex rep","rank":2}
{"index":{}}
{"content":"Glashylde","rank":3}
{"index":{}}
{"content":"Afvaskes og males","rank":3}
{"index":{}}
{"content":"Beskidte vinduer","rank":3}
{"index":{}}
{"content":"Males indvendigt og udvendigt","rank":3}
{"index":{}}
{"content":"Mærker og hakker","rank":3}
{"index":{}}
{"content":"Både håndvask og bruse batteri","rank":3}
{"index":{}}
{"content":"Renses","rank":3}
{"index":{}}
{"content":"Nedtagning af bruseforhæng","rank":3}
{"index":{}}
{"content":"Afmontering af børnesikring inden maling","rank":3}
{"index":{}}
{"content":"Fjernelse af gulvtæppe","rank":2}
{"index":{}}
{"content":"Bosch kgv 36 vw 32","rank":3}
{"index":{}}
{"content":"Voss elk 13003 hv","rank":3}
{"index":{}}
{"content":"Pga. huller fra skruer","rank":1}
{"index":{}}
{"content":"Lejlighed ikke rengjort","rank":3}
{"index":{}}
{"content":"Pga. Lejlighed ikke var rengjort før syn","rank":1}
{"index":{}}
{"content":"Slib og lak pga ridser og mærker","rank":1}
{"index":{}}
{"content":"Lim fjernes på vinduesrammer","rank":2}
{"index":{}}
{"content":"Nyt vinyl i køkken","rank":2}
{"index":{}}
{"content":"Persienner nedtages ikke standard","rank":1}
{"index":{}}
{"content":"Folie fjernes på vindue/dør glas","rank":2}
{"index":{}}
{"content":"Udskiftning af gulv","rank":9}
{"index":{}}
{"content":"Dørplade males på udvendig side","rank":2}
{"index":{}}
{"content":"Udskiftning af gulvstave","rank":2}
{"index":{}}
{"content":"Hoveddør males for mærker og ridser","rank":2}
{"index":{}}
{"content":"Vinduer og terrassedør males for Div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Vinduesbundplade males for ridser og mærker","rank":2}
{"index":{}}
{"content":"Energimåler mangler","rank":3}
{"index":{}}
{"content":"Nyt køleskab med frostboks","rank":3}
{"index":{}}
{"content":"Rep. af huller efter gardiner","rank":12}
{"index":{}}
{"content":"Entré dør","rank":2}
{"index":{}}
{"content":"Nyt skab","rank":3}
{"index":{}}
{"content":"Slibes pga ridser gennem lak","rank":3}
{"index":{}}
{"content":"Ridser gennem lakken","rank":7}
{"index":{}}
{"content":"Ikke rengjort ordentlig","rank":5}
{"index":{}}
{"content":"Radiator og gennemgang vindues m fals","rank":2}
{"index":{}}
{"content":"Søm","rank":3}
{"index":{}}
{"content":"Udskift fugtskadet dør","rank":3}
{"index":{}}
{"content":"Nicotik","rank":3}
{"index":{}}
{"content":"Og rengør karm","rank":3}
{"index":{}}
{"content":"Meget tilkalket","rank":3}
{"index":{}}
{"content":"Ekstra","rank":2}
{"index":{}}
{"content":"Rep. Af skue/ søm huller","rank":2}
{"index":{}}
{"content":"Dybe ridser på gulvet","rank":2}
{"index":{}}
{"content":"Bag radiatorer","rank":3}
{"index":{}}
{"content":"Kalk eller sæberester på","rank":2}
{"index":{}}
{"content":"Efter skrue gulv ( evt gulvjack","rank":2}
{"index":{}}
{"content":"Skrue/søm huller","rank":2}
{"index":{}}
{"content":"Maling er flere steder slået af træværk","rank":3}
{"index":{}}
{"content":"Fjer spejl","rank":3}
{"index":{}}
{"content":"Gulvtape på gulv","rank":3}
{"index":{}}
{"content":"Afrens at gulvtæppe tape","rank":2}
{"index":{}}
{"content":"Mærker / Hakker","rank":2}
{"index":{}}
{"content":"Maling dækker ikke","rank":2}
{"index":{}}
{"content":"Håndværker rengøring","rank":6}
{"index":{}}
{"content":"Behandling af gulve","rank":2}
{"index":{}}
{"content":"Bakelit kontakter og afbrydere udskiftes","rank":2}
{"index":{}}
{"content":"Håndvask kalk","rank":2}
{"index":{}}
{"content":"Gulv kalk","rank":2}
{"index":{}}
{"content":"Behandlet","rank":2}
{"index":{}}
{"content":"Slebet","rank":4}
{"index":{}}
{"content":"Huller i 8 fliser","rank":2}
{"index":{}}
{"content":"Baldakin nedtages","rank":2}
{"index":{}}
{"content":"Behandling begyndt","rank":2}
{"index":{}}
{"content":"Nedtagning af gaedinstænger","rank":3}
{"index":{}}
{"content":"Nedtagning af gardinstænger","rank":5}
{"index":{}}
{"content":"Rengøring pga snavs Alle flader og døre samt karme","rank":3}
{"index":{}}
{"content":"Overmaleling","rank":1}
{"index":{}}
{"content":"Køkken udskiftes grundet misligeholdelse af beboer","rank":3}
{"index":{}}
{"content":"Pga manglede rengøring","rank":2}
{"index":{}}
{"content":"Rester af indbo fjernes","rank":3}
{"index":{}}
{"content":"Rep af dør/karm eller udskiftes dør","rank":3}
{"index":{}}
{"content":"Rep af hoveddør","rank":3}
{"index":{}}
{"content":"Loft stærkt nikotinfarvet","rank":3}
{"index":{}}
{"content":"Vægge stærkt nikotinfarvede","rank":3}
{"index":{}}
{"content":"Dørblade stærkt nikotinfarvede. Til badeværelse Til køkken Til stue","rank":3}
{"index":{}}
{"content":"Skabslåge stærkt nikotinfarvet","rank":3}
{"index":{}}
{"content":"Vindue stærkt nikotinfarvet","rank":3}
{"index":{}}
{"content":"Terrazzo rengøres","rank":6}
{"index":{}}
{"content":"Rengøring af al sanitet samt håndvask - og bruser","rank":3}
{"index":{}}
{"content":"Stærkt nikotinfarvet","rank":9}
{"index":{}}
{"content":"Karme gerigter fodpaneler males i hele lejligheden","rank":3}
{"index":{}}
{"content":"Defekt hylle nedtages","rank":3}
{"index":{}}
{"content":"Slibes samt lakeres","rank":9}
{"index":{}}
{"content":"Grundig rengøring","rank":9}
{"index":{}}
{"content":"Nedtagning af loftarmatur","rank":12}
{"index":{}}
{"content":"Bordplade med 1 samling udskiftes","rank":3}
{"index":{}}
{"content":"Udskiftning af vask","rank":3}
{"index":{}}
{"content":"Udskiftning af defekt dørgreb","rank":3}
{"index":{}}
{"content":"Udskiftning af trekantsliste","rank":3}
{"index":{}}
{"content":"Montering af stormkrog","rank":3}
{"index":{}}
{"content":"Nedtagning af forlængerdåse","rank":3}
{"index":{}}
{"content":"Nedtagning magnetskinne","rank":3}
{"index":{}}
{"content":"Rydning af kælderrum","rank":9}
{"index":{}}
{"content":"Ikke. Rengjort","rank":2}
{"index":{}}
{"content":"Udskiftning af dør med glas. Pga slået istykker","rank":2}
{"index":{}}
{"content":"Uds af dør pga huler i dør plade","rank":2}
{"index":{}}
{"content":"1 stk skab mangler er fjerne fra boligen. 1 stk krydderihylde ødelagt nye leveres og monteres","rank":2}
{"index":{}}
{"content":"I stk emhætte ødelagt nye monteres silerline den billige","rank":2}
{"index":{}}
{"content":"Ny dør. Eks. Ødelagt","rank":2}
{"index":{}}
{"content":"Ny dør eks ødelagt","rank":4}
{"index":{}}
{"content":"Nye dør eks. Er fjerne fra bolingen","rank":2}
{"index":{}}
{"content":"Ny dør eks er ødelagt","rank":2}
{"index":{}}
{"content":"Ny dør eks. Fjerne fra boligen","rank":2}
{"index":{}}
{"content":"Ny dør eks. Ødelagt","rank":2}
{"index":{}}
{"content":"Ny dør pga dør fjerne fra boligen","rank":2}
{"index":{}}
{"content":"Køre extra gang","rank":2}
{"index":{}}
{"content":"Dyb ridse igennem lak","rank":2}
{"index":{}}
{"content":"Ridser og hakker og mangler lak","rank":3}
{"index":{}}
{"content":"Maling/malertape fjernes","rank":3}
{"index":{}}
{"content":"Fastgørrelse af lampeudtag","rank":3}
{"index":{}}
{"content":"Vaskes og pudses","rank":2}
{"index":{}}
{"content":"Slibers","rank":2}
{"index":{}}
{"content":"Fryseskuffe nr. 1 itu","rank":2}
{"index":{}}
{"content":"Filter genvex efterses","rank":2}
{"index":{}}
{"content":"Samme nøgle","rank":2}
{"index":{}}
{"content":"Gulvet skal slibes","rank":2}
{"index":{}}
{"content":"Alle trægulve er slebet og ny lakeret uden brudte flader. Dog med små ridser under","rank":2}
{"index":{}}
{"content":"Samme som til hoveddør","rank":2}
{"index":{}}
{"content":"Altaner rengøres","rank":2}
{"index":{}}
{"content":"Fryseskuffe nr. 2 itu","rank":2}
{"index":{}}
{"content":"Fryseskuffe nr. 3 itu","rank":2}
{"index":{}}
{"content":"Skabsfronter rengøres","rank":2}
{"index":{}}
{"content":"Flere steder med gennemslidt","rank":2}
{"index":{}}
{"content":"Mærker/hakker","rank":6}
{"index":{}}
{"content":"Plet af dørkarme og bundstyk i vindue/skydedør","rank":2}
{"index":{}}
{"content":"Rutex ødelagt på hjørne. Skade udbedres","rank":2}
{"index":{}}
{"content":"Maling x 2","rank":2}
{"index":{}}
{"content":"Pga. Huller efter gardin montering","rank":1}
{"index":{}}
{"content":"Pga. huller efter kabelclips","rank":1}
{"index":{}}
{"content":"Istandsættelse af lejemål jf. Synsrapporten - arbejdet udføres dags dato til og med d. 00.00.00 Venligst planlæg med Maler/Gulvsliber hvor de kan komme til i lejemålet indenfor samme tidsfrist","rank":2}
{"index":{}}
{"content":"Pga. Ridser & skrammer","rank":5}
{"index":{}}
{"content":"Spartling pga. huller","rank":1}
{"index":{}}
{"content":"Effekter henstillet","rank":2}
{"index":{}}
{"content":"Rap. Af skrue huller","rank":2}
{"index":{}}
{"content":"Håndværkerrengøring","rank":1}
{"index":{}}
{"content":"Flere steder gennem slidt i gulvlakken","rank":2}
{"index":{}}
{"content":"Flere steder gennemslidt i gulvlakken","rank":2}
{"index":{}}
{"content":"Finish bag","rank":2}
{"index":{}}
{"content":"Let total","rank":20}
{"index":{}}
{"content":"Gennem gang af skabe (køkken / entre","rank":2}
{"index":{}}
{"content":"Jernstolpe i vinduesparti males","rank":1}
{"index":{}}
{"content":"1/2 pris","rank":1}
{"index":{}}
{"content":"Pga malepletter","rank":1}
{"index":{}}
{"content":"Pga div skrammer","rank":1}
{"index":{}}
{"content":"Fjernelse af kabel","rank":1}
{"index":{}}
{"content":"Pga riser og skrammer i overflade","rank":1}
{"index":{}}
{"content":"Lejlighed rengøres før maleren kan komme til","rank":2}
{"index":{}}
{"content":"Rengøring oppe under overskabe","rank":2}
{"index":{}}
{"content":"Skadet ca 30 cm inde i laminat i runding","rank":2}
{"index":{}}
{"content":"Stabler på hængsler afrenses så dør kan komme på","rank":3}
{"index":{}}
{"content":"Nedtages","rank":3}
{"index":{}}
{"content":"Hoveddør slibes og olieres","rank":3}
{"index":{}}
{"content":"Tømmes for indbo","rank":5}
{"index":{}}
{"content":"Tømmes for lejers indbo","rank":3}
{"index":{}}
{"content":"Rep efter gardinmontering","rank":4}
{"index":{}}
{"content":"Pga. Mangelfuld rengøring","rank":2}
{"index":{}}
{"content":"Pga. Ridser/skrammer","rank":1}
{"index":{}}
{"content":"Pga. Gennemslid","rank":1}
{"index":{}}
{"content":"Rep. Af huller efter gardiner/persienner","rank":1}
{"index":{}}
{"content":"Pga ridser i overfladen","rank":1}
{"index":{}}
{"content":"Rengøring af skabe indvendig","rank":1}
{"index":{}}
{"content":"Rengøring af skabe udvendig","rank":1}
{"index":{}}
{"content":"Pga. Kraftig tilsmudsning","rank":1}
{"index":{}}
{"content":"Pga mangelfuld rengøring","rank":18}
{"index":{}}
{"content":"Ikke udført til syn","rank":2}
{"index":{}}
{"content":"Afrens + afvask +silb+ plet + mellemstryg+ færdigstryg","rank":9}
{"index":{}}
{"content":"Afkalkning af begge bl.batteri","rank":1}
{"index":{}}
{"content":"Afvask + rep + plet","rank":12}
{"index":{}}
{"content":"Afvask + rep + plet + færdigstryg","rank":9}
{"index":{}}
{"content":"Afvask + rep + slib + mellemstryg + færdigstryg","rank":12}
{"index":{}}
{"content":"Gulvfliser Afkalke","rank":12}
{"index":{}}
{"content":"Rep + mellemstryg + færdigstryg","rank":12}
{"index":{}}
{"content":"Spærrende","rank":23}
{"index":{}}
{"content":"Vægfliser Afkalke","rank":12}
{"index":{}}
{"content":"Spærrende + færdigstryg","rank":12}
{"index":{}}
{"content":"Skrammer og riser","rank":1}
{"index":{}}
{"content":"Manglende nøgle = omlægning","rank":8}
{"index":{}}
{"content":"Ikke rengjort for kalk","rank":3}
{"index":{}}
{"content":"Ridser eller hakker","rank":3}
{"index":{}}
{"content":"Lak slidt af","rank":3}
{"index":{}}
{"content":"Plet malet","rank":1}
{"index":{}}
{"content":"SKADE: Skaden er markeret med blå tape. Billeddokumenter","rank":1}
{"index":{}}
{"content":"Pga kraftig tilsmudsning","rank":1}
{"index":{}}
{"content":"Pga riser og skrammer","rank":21}
{"index":{}}
{"content":"Pga mangelfuld rengøring . Rengøring af alle overflader","rank":1}
{"index":{}}
{"content":"Slib samt lak","rank":21}
{"index":{}}
{"content":"Rengøres for kalk","rank":12}
{"index":{}}
{"content":"Afvask rep og plet","rank":3}
{"index":{}}
{"content":"Rep samt plet","rank":3}
{"index":{}}
{"content":"Rengør for kalk","rank":3}
{"index":{}}
{"content":"Udskiftning af bordplader med samling","rank":3}
{"index":{}}
{"content":"Slib og skibslak","rank":2}
{"index":{}}
{"content":"Manglende nøgle = omlægning af system lås","rank":4}
{"index":{}}
{"content":"Diverse afkalkning","rank":2}
{"index":{}}
{"content":"Skader i malingen på dørbladet","rank":3}
{"index":{}}
{"content":"Bruser armatur","rank":1}
{"index":{}}
{"content":"Afkalkning af bruser armatur","rank":1}
{"index":{}}
{"content":"Ned viskning af nicotin med nikotinens inden maling","rank":2}
{"index":{}}
{"content":"Håndtag hænger","rank":1}
{"index":{}}
{"content":"Ødelagt tapet efter skillevæg","rank":2}
{"index":{}}
{"content":"Korpus og låger","rank":3}
{"index":{}}
{"content":"Gulvstave med huller udskiftes","rank":2}
{"index":{}}
{"content":"Skuffe fronter og bunde","rank":3}
{"index":{}}
{"content":"Genmontering af låger","rank":3}
{"index":{}}
{"content":"Nye greb på låger og skuffer","rank":3}
{"index":{}}
{"content":"Smøres og eftergåes","rank":3}
{"index":{}}
{"content":"Elk 13003 hv","rank":3}
{"index":{}}
{"content":"Gram Ks 1135-90","rank":3}
{"index":{}}
{"content":"Gram fs 1095-90","rank":3}
{"index":{}}
{"content":"Malerstænk og ridser","rank":3}
{"index":{}}
{"content":"Dørkarm mod køkken fast monteres","rank":3}
{"index":{}}
{"content":"Meget til kalket","rank":3}
{"index":{}}
{"content":"Rep af fliser i bruse zonen","rank":3}
{"index":{}}
{"content":"Rengøring af friskluftventil","rank":3}
{"index":{}}
{"content":"Ingen tapet","rank":3}
{"index":{}}
{"content":"Korpus males indvendigt og udvendigt","rank":3}
{"index":{}}
{"content":"Extra fengøring pga. nikotin","rank":2}
{"index":{}}
{"content":"Nye hængsler og greb","rank":3}
{"index":{}}
{"content":"2 stk SKB 5389","rank":3}
{"index":{}}
{"content":"Udskiftning af postkasse cylinder","rank":3}
{"index":{}}
{"content":"Ingen nøgler","rank":3}
{"index":{}}
{"content":"Bruse forhængs stang ej rengjort","rank":2}
{"index":{}}
{"content":"Dører ødelagt pga. hjælpemidler","rank":2}
{"index":{}}
{"content":"Rengøring af dørkarm mod stue","rank":3}
{"index":{}}
{"content":"Rep efter gardin montering","rank":2}
{"index":{}}
{"content":"1 * stryg","rank":2}
{"index":{}}
{"content":"1*stryg","rank":8}
{"index":{}}
{"content":"Maling","rank":46}
{"index":{}}
{"content":"Afkælk","rank":3}
{"index":{}}
{"content":"Pga skrammer","rank":1}
{"index":{}}
{"content":"Ridset/hakker i maling/skruehuller","rank":2}
{"index":{}}
{"content":"Dørkarme males for ridser og mærker","rank":2}
{"index":{}}
{"content":"Bruseforhængs holder rengøres","rank":2}
{"index":{}}
{"content":"Pga Mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Ridser ud for køkken dør","rank":2}
{"index":{}}
{"content":"Ridset/hakker i maling","rank":2}
{"index":{}}
{"content":"Pga. hul i dør","rank":3}
{"index":{}}
{"content":"Der er ikke rengjort i bolig","rank":3}
{"index":{}}
{"content":"Der skal klippes græs og hæk da dette ikke er gjort","rank":3}
{"index":{}}
{"content":"Ødelagt facadeplade på skur","rank":3}
{"index":{}}
{"content":"Bundstykke i hoveddør lak + olie solbænk","rank":2}
{"index":{}}
{"content":"Finish af skuffer + readiator","rank":2}
{"index":{}}
{"content":"Opgradering","rank":4}
{"index":{}}
{"content":"Skaktpose stativ opsættes","rank":3}
{"index":{}}
{"content":"Dørkarme males efter Div. ridser og mærker","rank":2}
{"index":{}}
{"content":"Og vægge","rank":3}
{"index":{}}
{"content":"Gulve letslibes og lakeres for Div. små ridser og mærker","rank":2}
{"index":{}}
{"content":"Saltnings skade","rank":2}
{"index":{}}
{"content":"Ridser i gulvlak","rank":2}
{"index":{}}
{"content":"Træværk ridset","rank":2}
{"index":{}}
{"content":"Døreplade løsnet efter vand","rank":1}
{"index":{}}
{"content":"Vandskade på dørplade","rank":1}
{"index":{}}
{"content":"Ordne have for ukrudt og klippe diverse","rank":4}
{"index":{}}
{"content":"Slib og lak - lokalt","rank":3}
{"index":{}}
{"content":"Skrammer/hakker","rank":2}
{"index":{}}
{"content":"Der mangler fodpanel","rank":3}
{"index":{}}
{"content":"Tape på indfatning","rank":3}
{"index":{}}
{"content":"Misligholdelse af træværk","rank":3}
{"index":{}}
{"content":"Mange skruehuller","rank":2}
{"index":{}}
{"content":"100•200mm hul i gipsvæg","rank":2}
{"index":{}}
{"content":"Rengøring over alt","rank":3}
{"index":{}}
{"content":"Rengøres overalt","rank":3}
{"index":{}}
{"content":"Mangler indfatning","rank":3}
{"index":{}}
{"content":"Huller i dørene","rank":2}
{"index":{}}
{"content":"Løse eller faldet af","rank":2}
{"index":{}}
{"content":"Letslibning + pur behandling","rank":3}
{"index":{}}
{"content":"Tømning af hele lejemålet","rank":3}
{"index":{}}
{"content":"Tømning af udeareal","rank":3}
{"index":{}}
{"content":"1 gang stryg","rank":2}
{"index":{}}
{"content":"Let slibning + Pur behanling","rank":3}
{"index":{}}
{"content":"Udskiftning af Hoveddør","rank":3}
{"index":{}}
{"content":"Montering af skabslåge","rank":3}
{"index":{}}
{"content":"Rep af skydedør efter fugt samt justering","rank":3}
{"index":{}}
{"content":"Vindue udskiftes","rank":3}
{"index":{}}
{"content":"Røgmelder mangler","rank":6}
{"index":{}}
{"content":"S 1000n","rank":2}
{"index":{}}
{"content":"Gennem slid og ridser","rank":4}
{"index":{}}
{"content":"Nedtagning af klistermærker","rank":3}
{"index":{}}
{"content":"Nedtagning/reetablering til loftudtag","rank":3}
{"index":{}}
{"content":"Rense samt grundmale","rank":3}
{"index":{}}
{"content":"Fjerne pålimet spejl på dør","rank":3}
{"index":{}}
{"content":"Reperation af tapet over dør","rank":3}
{"index":{}}
{"content":"Fjerne fordelerboks","rank":3}
{"index":{}}
{"content":"Reparer tapet","rank":6}
{"index":{}}
{"content":"Rep.efter gardin montering","rank":1}
{"index":{}}
{"content":"Udskift af sokkel. Udskift af toilet-bræt","rank":3}
{"index":{}}
{"content":"Pga. Mørk farve","rank":1}
{"index":{}}
{"content":"Pga. stærk tilsmudsning","rank":1}
{"index":{}}
{"content":"Rens af gulv","rank":3}
{"index":{}}
{"content":"Nedtagning af gaskomfur","rank":3}
{"index":{}}
{"content":"Ridser gennem slidt","rank":2}
{"index":{}}
{"content":"Mug","rank":2}
{"index":{}}
{"content":"Ikke afkalket eller rengjort","rank":3}
{"index":{}}
{"content":"Medicinskab og plader ikke vedligehold","rank":3}
{"index":{}}
{"content":"Lamper & ledninger samt frem","rank":3}
{"index":{}}
{"content":"Pga. manglende afrensning","rank":1}
{"index":{}}
{"content":"Fjern gardinstang","rank":3}
{"index":{}}
{"content":"Pga riser og skramer","rank":1}
{"index":{}}
{"content":"Rep efter gardinstang holder","rank":1}
{"index":{}}
{"content":"Pga. Gennemslid af lak","rank":7}
{"index":{}}
{"content":"Lak slidt igennem og træ har taget skade","rank":6}
{"index":{}}
{"content":"Forkert farve","rank":3}
{"index":{}}
{"content":"Skal være der","rank":3}
{"index":{}}
{"content":"Afblænding af brevindkast","rank":2}
{"index":{}}
{"content":"Rep efter gardinstang","rank":2}
{"index":{}}
{"content":"Pga mangelfuld rengøring Vindues pusning","rank":1}
{"index":{}}
{"content":"Farveskift s1000n","rank":4}
{"index":{}}
{"content":"Gennem slidt og ridser","rank":2}
{"index":{}}
{"content":"Hoveddør indvendigt","rank":2}
{"index":{}}
{"content":"Pga. Tæppe & Taperester","rank":1}
{"index":{}}
{"content":"Rep. at huller efter gardinmontering","rank":1}
{"index":{}}
{"content":"Der er katte lem i terrassedør","rank":3}
{"index":{}}
{"content":"Meget gult og snavset","rank":12}
{"index":{}}
{"content":"Lak nedslidt flere steder","rank":3}
{"index":{}}
{"content":"Kabinet udskiftes gult og snavset","rank":3}
{"index":{}}
{"content":"Gennemgåes","rank":3}
{"index":{}}
{"content":"Meget misfarvet","rank":2}
{"index":{}}
{"content":"Skaktpose stativ monteres","rank":3}
{"index":{}}
{"content":"Nye skuffe bunde","rank":3}
{"index":{}}
{"content":"Lak","rank":1}
{"index":{}}
{"content":"Rep. af huller efter gardinmontering","rank":3}
{"index":{}}
{"content":"Rep. af huller efter sikringsbeslag","rank":1}
{"index":{}}
{"content":"Bortskaffelse af indbo før syn","rank":1}
{"index":{}}
{"content":"Hækklipning","rank":1}
{"index":{}}
{"content":"Græsslåning","rank":1}
{"index":{}}
{"content":"fjerne hegn","rank":1}
{"index":{}}
{"content":"Pga. Tæpperester","rank":1}
{"index":{}}
{"content":"Manglende rengøring af toilet","rank":1}
{"index":{}}
{"content":"Rens lak","rank":9}
{"index":{}}
{"content":"Radiatorist slib lak","rank":3}
{"index":{}}
{"content":"Total","rank":2}
{"index":{}}
{"content":"Mærker efter dobbeltklæbende tape","rank":3}
{"index":{}}
{"content":"Reparation af tapet mv","rank":3}
{"index":{}}
{"content":"Montering af toiletsæde","rank":3}
{"index":{}}
{"content":"Reparation af dørplade inde","rank":3}
{"index":{}}
{"content":"Nedtagning af diverse fra vægge","rank":3}
{"index":{}}
{"content":"Nedtagting af diverse installationer","rank":3}
{"index":{}}
{"content":"Reparation af træværk","rank":6}
{"index":{}}
{"content":"Vinduesplade skal repareres samt males","rank":3}
{"index":{}}
{"content":"Montering af indfatning","rank":3}
{"index":{}}
{"content":"Ny tapet under radiator","rank":2}
{"index":{}}
{"content":"Afkalk gulv højre for bruser","rank":2}
{"index":{}}
{"content":"Fjerne taperester","rank":1}
{"index":{}}
{"content":"Revner lappes og gulv slibes og poleres","rank":3}
{"index":{}}
{"content":"Hovedrengøring af hele lejemålet","rank":3}
{"index":{}}
{"content":"Afrens mal låger","rank":3}
{"index":{}}
{"content":"Maling på afbryder/lampeudtag","rank":3}
{"index":{}}
{"content":"Maling afskalet","rank":3}
{"index":{}}
{"content":"Afrens","rank":3}
{"index":{}}
{"content":"Rep efter gardinstang huller","rank":1}
{"index":{}}
{"content":"Udskift bordplade","rank":3}
{"index":{}}
{"content":"Maling mangler","rank":3}
{"index":{}}
{"content":"Ikke malet hvid","rank":3}
{"index":{}}
{"content":"Slib 3 x lak","rank":6}
{"index":{}}
{"content":"Udskift dør","rank":3}
{"index":{}}
{"content":"Pulterrum tømmes","rank":3}
{"index":{}}
{"content":"Blandingsbatteri afkalkes","rank":6}
{"index":{}}
{"content":"Pga. Tabt farve","rank":1}
{"index":{}}
{"content":"Skifte alle gummifuger","rank":2}
{"index":{}}
{"content":"IFØ Sign","rank":3}
{"index":{}}
{"content":"Ikke vores","rank":11}
{"index":{}}
{"content":"Maling af dørkarm og gerigter i alle rum","rank":2}
{"index":{}}
{"content":"Maling af fodlister i hele rummet også dem i plastik. Meget misfarvet","rank":2}
{"index":{}}
{"content":"Nedtagning af diverse ledninger og lamper der ikke tilhøre boligen","rank":2}
{"index":{}}
{"content":"Fjerne klisermærker","rank":3}
{"index":{}}
{"content":"Skift af bordplade i køkkenet","rank":2}
{"index":{}}
{"content":"Pga af riser og skrammer","rank":1}
{"index":{}}
{"content":"Pga. Skift til anden tapet end rutex","rank":1}
{"index":{}}
{"content":"Efter lim","rank":1}
{"index":{}}
{"content":"Kun plet rep","rank":3}
{"index":{}}
{"content":"Ikke srandard","rank":1}
{"index":{}}
{"content":"Fjern ledninger","rank":3}
{"index":{}}
{"content":"Hele lejemål: Rydning og bortskaffelse af inventar","rank":2}
{"index":{}}
{"content":"Rep af skade på udvendigt væghjørne i gang","rank":2}
{"index":{}}
{"content":"Rep af skruehuller efter gardiner på vinduer og døre","rank":2}
{"index":{}}
{"content":"Døre ikke afvasket for nikotin","rank":2}
{"index":{}}
{"content":"Sl","rank":2}
{"index":{}}
{"content":"Køkken ikke rengjort","rank":2}
{"index":{}}
{"content":"Toilet manglende rengøring","rank":2}
{"index":{}}
{"content":"Pga. stærk tilsmudsning og misfarvning","rank":5}
{"index":{}}
{"content":"Pga. Huller","rank":1}
{"index":{}}
{"content":"Skab sokkel males pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Toilettet skal afkalkes","rank":3}
{"index":{}}
{"content":"Pga. Påført maling på fliser","rank":1}
{"index":{}}
{"content":"Gulvklinker afkalkes","rank":3}
{"index":{}}
{"content":"Beslag på vindue ikke standard","rank":1}
{"index":{}}
{"content":"Skabssokkel pga. ridser og mærker","rank":2}
{"index":{}}
{"content":"Løse ledninger nedtages","rank":1}
{"index":{}}
{"content":"Lys under overskabe afmonteres","rank":1}
{"index":{}}
{"content":"Blandingsbatteri kalket til","rank":2}
{"index":{}}
{"content":"Fliser på gulv beskadiget efter tab af ting","rank":3}
{"index":{}}
{"content":"Af rens for fugt","rank":3}
{"index":{}}
{"content":"Hænger løst","rank":1}
{"index":{}}
{"content":"Males pga ridser","rank":2}
{"index":{}}
{"content":"Karme og fodpaneler","rank":3}
{"index":{}}
{"content":"Ny emhætte opsættes","rank":3}
{"index":{}}
{"content":"Ikke vores ting","rank":3}
{"index":{}}
{"content":"Gummifuge skiftes efter kattekrads","rank":3}
{"index":{}}
{"content":"Ca. 4 m","rank":3}
{"index":{}}
{"content":"Der tages forbehold for om gulvet er for medtaget og skal skiftes","rank":3}
{"index":{}}
{"content":"Hvis bordplade ikke kan rengøres skal den skiftes","rank":3}
{"index":{}}
{"content":"Måtte mangler","rank":3}
{"index":{}}
{"content":"Male pletter + ridser","rank":3}
{"index":{}}
{"content":"Vindue og dørparti males pga kattekrads","rank":3}
{"index":{}}
{"content":"Sokkel passer ikke","rank":3}
{"index":{}}
{"content":"Gennemslidt lak. Gulvet er ødlagt ved døren til badevæelset","rank":3}
{"index":{}}
{"content":"Hjørnekanter rep. Flere steder ved trappe","rank":3}
{"index":{}}
{"content":"cylinder udskiftes og 3 nye nøgler","rank":3}
{"index":{}}
{"content":"Pga mangelfuld rengøring bag radiator","rank":1}
{"index":{}}
{"content":"PU emalje","rank":2}
{"index":{}}
{"content":"Ikke rydet","rank":1}
{"index":{}}
{"content":"Lejemål ikke tømt","rank":3}
{"index":{}}
{"content":"Afvaskning mangelfuldt","rank":3}
{"index":{}}
{"content":"Dør mangler maling","rank":3}
{"index":{}}
{"content":"Maling på gulv","rank":12}
{"index":{}}
{"content":"Lampe under overskab fjernes","rank":1}
{"index":{}}
{"content":"Før 1/7 2020","rank":1}
{"index":{}}
{"content":"Før 1/7 2015","rank":1}
{"index":{}}
{"content":"Lejer har været i mod med kørestol","rank":2}
{"index":{}}
{"content":"brændmærker i gulvet","rank":3}
{"index":{}}
{"content":"mærker og ridser i gulvet","rank":3}
{"index":{}}
{"content":"Røgskade","rank":1}
{"index":{}}
{"content":"Letslibning og lak pga ridser og gennemslidning af lak","rank":2}
{"index":{}}
{"content":"Vinduer ikke rengjort","rank":2}
{"index":{}}
{"content":"Letslibning pga ridser og gennemslidning","rank":2}
{"index":{}}
{"content":"Rep a tapet","rank":2}
{"index":{}}
{"content":"Males pga ridser og skrammer","rank":3}
{"index":{}}
{"content":"Fuldafslibning pga gennemslidning","rank":2}
{"index":{}}
{"content":"Nedtagning afmloftarmatur","rank":3}
{"index":{}}
{"content":"Terrazzo renses for kalk og olieres","rank":3}
{"index":{}}
{"content":"Fuge i gulv mangler flere steder","rank":3}
{"index":{}}
{"content":"Fjerne greb og holdere toilethylde samt spejl","rank":3}
{"index":{}}
{"content":"Hvide","rank":7}
{"index":{}}
{"content":"Rep efter opsætning af gardiner","rank":2}
{"index":{}}
{"content":"Laminatbordplade defekt ved vask","rank":3}
{"index":{}}
{"content":"Rengør også ventilationskegle","rank":3}
{"index":{}}
{"content":"Hæk ikke klippet","rank":3}
{"index":{}}
{"content":"Græs ikke slået","rank":3}
{"index":{}}
{"content":"Ikke olieret","rank":3}
{"index":{}}
{"content":"Ikke korrekt rengjort","rank":6}
{"index":{}}
{"content":"Nøgler ikke indleveret","rank":2}
{"index":{}}
{"content":"Gulve slibes og lakeres","rank":2}
{"index":{}}
{"content":"Dørtrin lakeres","rank":2}
{"index":{}}
{"content":"Kalk og maling på gulvet og soklen","rank":3}
{"index":{}}
{"content":"Karme Rep. og plet","rank":2}
{"index":{}}
{"content":"Fodlister Rep","rank":2}
{"index":{}}
{"content":"Test af oprettelse af gemt note (vist i listen","rank":2}
{"index":{}}
{"content":"Udskiftning af gulvtæppe til trægulv","rank":2}
{"index":{}}
{"content":"Sli og 3 x lak","rank":3}
{"index":{}}
{"content":"Fjern knage mm","rank":3}
{"index":{}}
{"content":"Fjern gardin","rank":3}
{"index":{}}
{"content":"Fjern ledning","rank":9}
{"index":{}}
{"content":"Udskift af dørgreb","rank":3}
{"index":{}}
{"content":"Tømning af kld rum og bortskaffelse","rank":1}
{"index":{}}
{"content":"Loftlem males","rank":2}
{"index":{}}
{"content":"Dørplader Rep. og plet for mærker på hjørner","rank":2}
{"index":{}}
{"content":"Spærregrunder pga. nicotin hvis normalistandsættelse ikke kan dække","rank":2}
{"index":{}}
{"content":"Loftskinner fjernes","rank":3}
{"index":{}}
{"content":"Afrensning af tape rester","rank":1}
{"index":{}}
{"content":"Pga huller fra gardin montering","rank":1}
{"index":{}}
{"content":"Pga kraftig misfarvning","rank":2}
{"index":{}}
{"content":"Afrensning af tæpperester","rank":2}
{"index":{}}
{"content":"Kantlister afrenses","rank":3}
{"index":{}}
{"content":"Ny lenolium","rank":3}
{"index":{}}
{"content":"Fjerne søm og skruer fra vægge samt lofter","rank":3}
{"index":{}}
{"content":"Defekt kontakt","rank":3}
{"index":{}}
{"content":"Udskiftning af bordplader inklusiv vvs arbejder genbrug/ilægning af vask","rank":3}
{"index":{}}
{"content":"Fjerne vægskab","rank":3}
{"index":{}}
{"content":"Nedtagning af ringeklokke samt tilhørende dele","rank":3}
{"index":{}}
{"content":"Fjerne bløde ledninger","rank":3}
{"index":{}}
{"content":"Udskift af plader bag radiator","rank":3}
{"index":{}}
{"content":"Afkalkning af håndvask","rank":3}
{"index":{}}
{"content":"Fjerne gardinstang","rank":9}
{"index":{}}
{"content":"Fjerne lyscensor","rank":3}
{"index":{}}
{"content":"Fjerne knagerække","rank":3}
{"index":{}}
{"content":"Afkalkning af wc","rank":9}
{"index":{}}
{"content":"Fjern indskudslag/brædder reetabler brædder + isolering","rank":3}
{"index":{}}
{"content":"Afkalkning af bruserslange","rank":3}
{"index":{}}
{"content":"Efter nye gulve","rank":2}
{"index":{}}
{"content":"Slib + lak","rank":9}
{"index":{}}
{"content":"Skamme på karm","rank":2}
{"index":{}}
{"content":"Afskrabninger nederst","rank":2}
{"index":{}}
{"content":"Lampe nedtages ikke standard","rank":2}
{"index":{}}
{"content":"Mande huller i vækken","rank":3}
{"index":{}}
{"content":"Pga maling rester","rank":1}
{"index":{}}
{"content":"Vindues plade males x 2","rank":2}
{"index":{}}
{"content":"Isolering af rør fjernes nyt påsættes","rank":1}
{"index":{}}
{"content":"Pga misfarvning/ samt stærk tilsmusning","rank":1}
{"index":{}}
{"content":"Rengøring af over og underskabe + skabslåger","rank":2}
{"index":{}}
{"content":"Pga ødelagt tapet","rank":1}
{"index":{}}
{"content":"Fjern opvaskemaskine","rank":3}
{"index":{}}
{"content":"Rep af skabsside","rank":3}
{"index":{}}
{"content":"Afkalk toilet og vask","rank":2}
{"index":{}}
{"content":"Udskift underlag","rank":3}
{"index":{}}
{"content":"Fjern bord reol og fliser","rank":3}
{"index":{}}
{"content":"Pga borehuller","rank":1}
{"index":{}}
{"content":"Rep af skab","rank":3}
{"index":{}}
{"content":"Spartling af huller samt maling af friside pga skruehuller","rank":1}
{"index":{}}
{"content":"Fodliste påsættes","rank":3}
{"index":{}}
{"content":"Skiftes","rank":3}
{"index":{}}
{"content":"Pulterrum ryddes","rank":3}
{"index":{}}
{"content":"Manglende rengøring samt fejning af depot 10","rank":2}
{"index":{}}
{"content":"Ej tømt","rank":1}
{"index":{}}
{"content":"Skunk lem","rank":2}
{"index":{}}
{"content":"Opgardering","rank":2}
{"index":{}}
{"content":"Kontakter maler","rank":3}
{"index":{}}
{"content":"Rep af træværk","rank":3}
{"index":{}}
{"content":"Pga. gennemslid af lak","rank":7}
{"index":{}}
{"content":"Pga. farveskifte","rank":1}
{"index":{}}
{"content":"Rep af hul","rank":3}
{"index":{}}
{"content":"Pga. Manglende inventar","rank":1}
{"index":{}}
{"content":"Afkalkes og let rengøring","rank":1}
{"index":{}}
{"content":"Skrammer på kant","rank":2}
{"index":{}}
{"content":"Rengøring af overskabe","rank":3}
{"index":{}}
{"content":"Ovn og komfur rengøres","rank":3}
{"index":{}}
{"content":"Kuppel mangler","rank":3}
{"index":{}}
{"content":"Lampeudtag mangler","rank":3}
{"index":{}}
{"content":"Løst","rank":1}
{"index":{}}
{"content":"Dødsbo","rank":3}
{"index":{}}
{"content":"Vinduer mangler rengøring","rank":3}
{"index":{}}
{"content":"Nikotin farvet","rank":2}
{"index":{}}
{"content":"Fjern vaskemaskine","rank":3}
{"index":{}}
{"content":"Rengør køl og frys","rank":3}
{"index":{}}
{"content":"Fjern folie på disk","rank":3}
{"index":{}}
{"content":"Ikke afrimet","rank":2}
{"index":{}}
{"content":"Fjern skruer og rawplug","rank":15}
{"index":{}}
{"content":"Fjern hylde","rank":3}
{"index":{}}
{"content":"Tøm terrasse","rank":3}
{"index":{}}
{"content":"Smurt ind i fedtlign stof","rank":2}
{"index":{}}
{"content":"Hv rengøring","rank":4}
{"index":{}}
{"content":"Rep. skruehuller","rank":2}
{"index":{}}
{"content":"Tømning og rydning","rank":2}
{"index":{}}
{"content":"Demonter","rank":2}
{"index":{}}
{"content":"gardiner","rank":2}
{"index":{}}
{"content":"og div","rank":2}
{"index":{}}
{"content":"Males på grund af huller i væggen","rank":1}
{"index":{}}
{"content":"Slibes på grund af ridser og mærker","rank":1}
{"index":{}}
{"content":"Ekstra rengøring fordi rengøringen er mangelfuld","rank":1}
{"index":{}}
{"content":"Gulvmand skal vurderer om gulvet kun skal let slibes og relakkeres","rank":1}
{"index":{}}
{"content":"Fjerne køleskab","rank":6}
{"index":{}}
{"content":"Også postkasse","rank":6}
{"index":{}}
{"content":"Afmontering af gardiner","rank":2}
{"index":{}}
{"content":"Ikke rengjort inden syn","rank":3}
{"index":{}}
{"content":"Rengøring af fliser","rank":3}
{"index":{}}
{"content":"Males på grund af huller i vægen","rank":1}
{"index":{}}
{"content":"Males på grund af farveforskel","rank":1}
{"index":{}}
{"content":"Meget svinsk","rank":3}
{"index":{}}
{"content":"Ende stykke på væg mellem stue og værelse","rank":2}
{"index":{}}
{"content":"Hy","rank":3}
{"index":{}}
{"content":"Ridser gennem gulvlak","rank":3}
{"index":{}}
{"content":"Fodpanel slidt (Ælde","rank":3}
{"index":{}}
{"content":"Dørkarm hakket og ridset","rank":3}
{"index":{}}
{"content":"Dørblad hakket","rank":3}
{"index":{}}
{"content":"Nikotin gult loft + væg","rank":3}
{"index":{}}
{"content":"Vindues parti nikotin gult","rank":3}
{"index":{}}
{"content":"Hygiejnerengøring","rank":6}
{"index":{}}
{"content":"Klar lak","rank":6}
{"index":{}}
{"content":"Loft liste alle rum","rank":2}
{"index":{}}
{"content":"Afrens til bæredygtig bund og maling","rank":2}
{"index":{}}
{"content":"Lysninger af træ (plastik vinduer","rank":2}
{"index":{}}
{"content":"Værdiboks i skabet","rank":2}
{"index":{}}
{"content":"X 2","rank":2}
{"index":{}}
{"content":"Vindue og terrasse dør komplet med 1 x maling","rank":2}
{"index":{}}
{"content":"Ridser som gennembryder lakken","rank":15}
{"index":{}}
{"content":"Afslibning pga gennemslibning af samt ridser","rank":2}
{"index":{}}
{"content":"Fjern klistermærke","rank":3}
{"index":{}}
{"content":"Dørtrin ved altan","rank":3}
{"index":{}}
{"content":"Fodplade monteres","rank":3}
{"index":{}}
{"content":"Prop monteres på hane til vaskemaskine","rank":3}
{"index":{}}
{"content":"Fjerneklister mærke","rank":3}
{"index":{}}
{"content":"Nyt spejl monteres","rank":3}
{"index":{}}
{"content":"Vægmaling på karme/ fodpanel","rank":1}
{"index":{}}
{"content":"Rester af tæppe","rank":1}
{"index":{}}
{"content":"Rengøring af fliser for maling","rank":1}
{"index":{}}
{"content":"Fodpaneler misfarvet","rank":3}
{"index":{}}
{"content":"Skab fjernes","rank":10}
{"index":{}}
{"content":"Montering af skab","rank":3}
{"index":{}}
{"content":"Slidt/defekt panelstikkontakt","rank":3}
{"index":{}}
{"content":"Slidt/defekt afbryder i karm","rank":3}
{"index":{}}
{"content":"Slidt/defekt stikkontakt i karm","rank":3}
{"index":{}}
{"content":"Slidt/defekt lampeudtag","rank":3}
{"index":{}}
{"content":"Dørblad slidt/binder","rank":3}
{"index":{}}
{"content":"Dørblad misfarvet","rank":3}
{"index":{}}
{"content":"Gulv slidt (Knirker","rank":3}
{"index":{}}
{"content":"Slidt/defekt emhætte","rank":3}
{"index":{}}
{"content":"WC Slidt/defekt","rank":3}
{"index":{}}
{"content":"Fodpanel hakket","rank":3}
{"index":{}}
{"content":"Knækket/Flækket klinke på badeværelse","rank":3}
{"index":{}}
{"content":"Falmet pletter","rank":2}
{"index":{}}
{"content":"2x maling af hvide vægge","rank":2}
{"index":{}}
{"content":"Rep af hul i væggen","rank":2}
{"index":{}}
{"content":"Maling af bad. Indvendig side (ubehandlet","rank":2}
{"index":{}}
{"content":"Gennemslidt lak og ridser","rank":3}
{"index":{}}
{"content":"Demontering af fraflytters elinstallationer","rank":3}
{"index":{}}
{"content":"Inklusiv karm","rank":3}
{"index":{}}
{"content":"Dørblik mangler","rank":3}
{"index":{}}
{"content":"Hakker i vinduesplade","rank":3}
{"index":{}}
{"content":"Skrammer i maling","rank":6}
{"index":{}}
{"content":"Større spartlede huller rep","rank":3}
{"index":{}}
{"content":"Dæksel mangler på loftroset","rank":3}
{"index":{}}
{"content":"2 stk vindues plader slibes og males pga ridser og hakker","rank":3}
{"index":{}}
{"content":"Opvaskermaskine demonteres og bortskaffes","rank":3}
{"index":{}}
{"content":"Ikke vedligeholdt korrekt","rank":3}
{"index":{}}
{"content":"Bordplade udskiftes hvis ikke kan rep","rank":3}
{"index":{}}
{"content":"Låger og skuffefronter afskallet","rank":3}
{"index":{}}
{"content":"Sokkel defekt","rank":3}
{"index":{}}
{"content":"Evt. rep efter at køleskab og opvaskemaskine er kommer ud","rank":3}
{"index":{}}
{"content":"Bagplade i vaskeskab opfugtet","rank":3}
{"index":{}}
{"content":"Rep af stort spartlet hul over komfur","rank":3}
{"index":{}}
{"content":"Ikke rengjort over og under overskabe","rank":3}
{"index":{}}
{"content":"Afskallet maling på dørkarm","rank":3}
{"index":{}}
{"content":"Ny vinduesplade","rank":3}
{"index":{}}
{"content":"Hvid","rank":1}
{"index":{}}
{"content":"Generel rengøring og afkalkning","rank":6}
{"index":{}}
{"content":"Afrensning af radiator","rank":1}
{"index":{}}
{"content":"Afrensning af vinduer","rank":1}
{"index":{}}
{"content":"Pga. mangelfuld rengøring","rank":3}
{"index":{}}
{"content":"Pga. Stærk tilsmudsning og misfarvning","rank":4}
{"index":{}}
{"content":"Før maler","rank":1}
{"index":{}}
{"content":"Inddækning males","rank":1}
{"index":{}}
{"content":"Pudsning af alle vinduespartier","rank":1}
{"index":{}}
{"content":"Det er aftalt der laves komplet rengøring af lejemålet","rank":2}
{"index":{}}
{"content":"Farve skift","rank":2}
{"index":{}}
{"content":"Ikke malet korrekt","rank":6}
{"index":{}}
{"content":"Malet gulv","rank":3}
{"index":{}}
{"content":"Malet låger og skuffer","rank":3}
{"index":{}}
{"content":"Dørplader skifte pga. Div. Ridser","rank":2}
{"index":{}}
{"content":"Oplukning og ny cylinder til lejemål og postkasse","rank":3}
{"index":{}}
{"content":"Malet køleskab","rank":3}
{"index":{}}
{"content":"Plade fjernes","rank":3}
{"index":{}}
{"content":"Dør hul lukkes fra entre til soveværelse","rank":3}
{"index":{}}
{"content":"Ny thermostat","rank":3}
{"index":{}}
{"content":"Nyt wc monteres","rank":3}
{"index":{}}
{"content":"Nyt håndvask armatur","rank":3}
{"index":{}}
{"content":"Hullet og malet","rank":3}
{"index":{}}
{"content":"Ny emhætte","rank":3}
{"index":{}}
{"content":"Kanyler","rank":3}
{"index":{}}
{"content":"Efter væske el. andet","rank":2}
{"index":{}}
{"content":"Pga. Stærk tilsmudsning/ misfarvning","rank":1}
{"index":{}}
{"content":"Slibes pga. Ridser og hakker gennem lak","rank":3}
{"index":{}}
{"content":"Opretning af radiator","rank":1}
{"index":{}}
{"content":"Udskift dørhåndtag","rank":3}
{"index":{}}
{"content":"Rydning ef lejemål","rank":3}
{"index":{}}
{"content":"Pga. Kraftig tilsmudsning/misfarvning","rank":1}
{"index":{}}
{"content":"Ny top disk","rank":3}
{"index":{}}
{"content":"Montering af afbryder","rank":3}
{"index":{}}
{"content":"Fjern hylder","rank":3}
{"index":{}}
{"content":"Slib lak","rank":6}
{"index":{}}
{"content":"Opsæt bord og vask","rank":3}
{"index":{}}
{"content":"Afrens kontakter","rank":3}
{"index":{}}
{"content":"Friside på skab","rank":2}
{"index":{}}
{"content":"Skrald","rank":1}
{"index":{}}
{"content":"Mælerkasse i midten af trappen","rank":3}
{"index":{}}
{"content":"P.g.a små ridser og pletter","rank":2}
{"index":{}}
{"content":"P.g.a manglende rengøring","rank":12}
{"index":{}}
{"content":"Ekstra rengøring fraflytning","rank":2}
{"index":{}}
{"content":"Ekstra maler arbejde vedr. revner ved lysninger og vægge. Hele boligen","rank":2}
{"index":{}}
{"content":"Pletning af sort mærke på stuevæg","rank":2}
{"index":{}}
{"content":"Vedligehold","rank":2}
{"index":{}}
{"content":"Ridser på terrassedør males","rank":2}
{"index":{}}
{"content":"Sort mærke på stuevæg males","rank":2}
{"index":{}}
{"content":"Maler arbejde ved køkkenskift","rank":2}
{"index":{}}
{"content":"Ridser & skrammer","rank":1}
{"index":{}}
{"content":"Skader efter urtepotter","rank":1}
{"index":{}}
{"content":"Efterse ovenlys kan ikke åbne på knap","rank":3}
{"index":{}}
{"content":"Rep af fuger","rank":3}
{"index":{}}
{"content":"Fjerne skillevæg","rank":6}
{"index":{}}
{"content":"Vinduesparti","rank":1}
{"index":{}}
{"content":"Nye swedoor døre og karme","rank":3}
{"index":{}}
{"content":"Nye døre og karme isættes","rank":3}
{"index":{}}
{"content":"Pga. ridser & skrammer","rank":1}
{"index":{}}
{"content":"Ledninger hænger ud af vægrosette","rank":1}
{"index":{}}
{"content":"Dørplade og karm ødelagt af køre stol","rank":2}
{"index":{}}
{"content":"Radiator termostater rengøres","rank":2}
{"index":{}}
{"content":"Tørre skabe af indvendig","rank":1}
{"index":{}}
{"content":"Pga. fugtskade","rank":2}
{"index":{}}
{"content":"Pga. manglende nøgler","rank":41}
{"index":{}}
{"content":"Pga ridser og skrammer","rank":1}
{"index":{}}
{"content":"Pga kraftigt tilsmusning","rank":1}
{"index":{}}
{"content":"Pga hakker og skrammer","rank":1}
{"index":{}}
{"content":"Mærker/ridser","rank":2}
{"index":{}}
{"content":"Forsøgt malet","rank":2}
{"index":{}}
{"content":"Pga. afrensning af taperester","rank":1}
{"index":{}}
{"content":"Aftørring af skabe udvendig/oven på","rank":1}
{"index":{}}
{"content":"WC ikke rengjort","rank":2}
{"index":{}}
{"content":"1 stk grøn kodenøgle. Ved mistet kodenøgle hæfter beboer for ny låsekasse","rank":6}
{"index":{}}
{"content":"Nye skurrelister","rank":2}
{"index":{}}
{"content":"Dør isættes samt skabs modul tages ud ved kogeplader så der kan isættes komfur","rank":2}
{"index":{}}
{"content":"Dør i sættes","rank":2}
{"index":{}}
{"content":"Dør åbnet/lukket for tidligere efter malerbehandlind","rank":2}
{"index":{}}
{"content":"Efter håndtag er udskiftet","rank":1}
{"index":{}}
{"content":"Afdækning og rengøring efter håndværker","rank":1}
{"index":{}}
{"content":"Rengøres pga. beskidt","rank":1}
{"index":{}}
{"content":"Slibes pga. Ridser og hakker","rank":1}
{"index":{}}
{"content":"Slibes og males pga. Ridser","rank":1}
{"index":{}}
{"content":"Rengøres pga. Kalk","rank":1}
{"index":{}}
{"content":"Terrazzo renses for kalk","rank":3}
{"index":{}}
{"content":"let total","rank":2}
{"index":{}}
{"content":"Plus karm","rank":3}
{"index":{}}
{"content":"Render renses","rank":6}
{"index":{}}
{"content":"Ukrudt fjernes","rank":3}
{"index":{}}
{"content":"Fjern gardinstænger","rank":6}
{"index":{}}
{"content":"Mærker i dørkarm","rank":2}
{"index":{}}
{"content":"Spejl samt beslag fjernes","rank":3}
{"index":{}}
{"content":"Bortskaffelse af komfur","rank":3}
{"index":{}}
{"content":"Fjerne skilt fra facade over butiksvindue","rank":3}
{"index":{}}
{"content":"Udbedring af huller efter skruer","rank":3}
{"index":{}}
{"content":"Sokkel på klædeskab","rank":1}
{"index":{}}
{"content":"Pga. sætningrevner","rank":1}
{"index":{}}
{"content":"pga. kalkaflejring","rank":1}
{"index":{}}
{"content":"Stikkontakter ødlagt","rank":3}
{"index":{}}
{"content":"Ny låsekase","rank":3}
{"index":{}}
{"content":"Folie monteret","rank":1}
{"index":{}}
{"content":"Gipsplader mangler efter skab","rank":1}
{"index":{}}
{"content":"På grund af der mangler nøgler","rank":3}
{"index":{}}
{"content":"Mærker efter kløer","rank":2}
{"index":{}}
{"content":"Rum ikke rengjort ved fraflytning","rank":1}
{"index":{}}
{"content":"Efterladt indbo ved fraflytning","rank":1}
{"index":{}}
{"content":"Ridser og pletter","rank":2}
{"index":{}}
{"content":"Vindues polering pga mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Rep huller efter gardinmontering","rank":1}
{"index":{}}
{"content":"Lamper fjernes","rank":1}
{"index":{}}
{"content":"Istandsættelse påbegyndt","rank":1}
{"index":{}}
{"content":"Dæksel til strøm mangler","rank":1}
{"index":{}}
{"content":"Smaderet rude","rank":3}
{"index":{}}
{"content":"Males med iso spær","rank":9}
{"index":{}}
{"content":"Lofter ikke malbar grundet nikotin","rank":3}
{"index":{}}
{"content":"Afrenses af tapet","rank":3}
{"index":{}}
{"content":"Spartling og pletning af skruehuller på vinduer og døre","rank":2}
{"index":{}}
{"content":"Nye fodpaneler og sandlister","rank":3}
{"index":{}}
{"content":"Efter lak","rank":1}
{"index":{}}
{"content":"Nyt brusesæt","rank":3}
{"index":{}}
{"content":"Ny rist på gulvafløbet","rank":3}
{"index":{}}
{"content":"Højrehængt","rank":6}
{"index":{}}
{"content":"Venstrehængt","rank":3}
{"index":{}}
{"content":"Nye fodpaneler","rank":3}
{"index":{}}
{"content":"Nedvaskes","rank":3}
{"index":{}}
{"content":"Gøres klar til maling","rank":6}
{"index":{}}
{"content":"Nyt spejl og wc rulleholder","rank":3}
{"index":{}}
{"content":"Knagerække","rank":3}
{"index":{}}
{"content":"Nyt armatur","rank":12}
{"index":{}}
{"content":"Overflader rengøres for kalk","rank":3}
{"index":{}}
{"content":"Rep af fliser på gulv","rank":3}
{"index":{}}
{"content":"Kalk fjernes fra cisterne","rank":3}
{"index":{}}
{"content":"Rens for kalk","rank":9}
{"index":{}}
{"content":"Afstivning hvis det er muligt","rank":3}
{"index":{}}
{"content":"Rustne hængsler udskiftes","rank":3}
{"index":{}}
{"content":"Rengøring af ovenlysvindue samt skagt","rank":3}
{"index":{}}
{"content":"Vægflader","rank":3}
{"index":{}}
{"content":"Nye fliser på gulv i brusezonen","rank":3}
{"index":{}}
{"content":"Spejl fjernes","rank":6}
{"index":{}}
{"content":"Wcrulle holder","rank":3}
{"index":{}}
{"content":"Udskiftning af trægulv","rank":6}
{"index":{}}
{"content":"Alle overflader gøres rent","rank":3}
{"index":{}}
{"content":"Udskiftning af stofledninger","rank":1}
{"index":{}}
{"content":"Vinduesrammer nedvaskes","rank":3}
{"index":{}}
{"content":"Udbedring af borehuller","rank":3}
{"index":{}}
{"content":"Hul i gulv udbedres","rank":3}
{"index":{}}
{"content":"Indfatninger + karm udbedres og færdigmales","rank":3}
{"index":{}}
{"content":"Pga. løst tapet","rank":1}
{"index":{}}
{"content":"Pga. afsmitning","rank":1}
{"index":{}}
{"content":"Lofter er nikotingule","rank":3}
{"index":{}}
{"content":"Vægge er nikotingule","rank":3}
{"index":{}}
{"content":"Rengøring alle overflader","rank":3}
{"index":{}}
{"content":"Fjerne og bortskaffe gaskomfur","rank":3}
{"index":{}}
{"content":"Bort","rank":1}
{"index":{}}
{"content":"Kroges fjernes ikke standard","rank":1}
{"index":{}}
{"content":"Nedtagning af belysning","rank":1}
{"index":{}}
{"content":"Nye garderobe skabe","rank":2}
{"index":{}}
{"content":"Stænkplade fjernes ikke standard","rank":1}
{"index":{}}
{"content":"P.g.a ridser","rank":2}
{"index":{}}
{"content":"Letslib og 2 x lak","rank":3}
{"index":{}}
{"content":"Fjern gardiner","rank":3}
{"index":{}}
{"content":"Rette kontakter","rank":3}
{"index":{}}
{"content":"Flyttes til opbevaring","rank":3}
{"index":{}}
{"content":"Ny friskluftventil","rank":3}
{"index":{}}
{"content":"Vægge vaskes ned for nicotin","rank":2}
{"index":{}}
{"content":"Ekstra gulvvask","rank":3}
{"index":{}}
{"content":"Bruseforhængs stang rengøres","rank":2}
{"index":{}}
{"content":"Gulv og væg","rank":3}
{"index":{}}
{"content":"Afrens tapet opsæt nyt","rank":3}
{"index":{}}
{"content":"Maling efter nedtagning af spejl","rank":3}
{"index":{}}
{"content":"Ned tagning af spejl","rank":3}
{"index":{}}
{"content":"Efter opsætning af plakat","rank":2}
{"index":{}}
{"content":"Fylde huller og pletmale","rank":1}
{"index":{}}
{"content":"Ny dør","rank":12}
{"index":{}}
{"content":"Skabe mangler grab","rank":3}
{"index":{}}
{"content":"Maling skaler i træværK","rank":3}
{"index":{}}
{"content":"Maling skaler af på træværk","rank":3}
{"index":{}}
{"content":"Afrens af bordplade","rank":3}
{"index":{}}
{"content":"Udskift af køkkenskabe og overskabe","rank":3}
{"index":{}}
{"content":"Nedtagning af emhætte og rør til udsugning","rank":3}
{"index":{}}
{"content":"Markeret med blå tape","rank":1}
{"index":{}}
{"content":"Pga af gulv afslibning","rank":2}
{"index":{}}
{"content":"Vandskadet i hjørne","rank":2}
{"index":{}}
{"content":"Folie på dør","rank":3}
{"index":{}}
{"content":"Afmontering og fjern vaskemaskine og afløb til vaskemaskine","rank":3}
{"index":{}}
{"content":"SSG vurderede at det ikke kunne svare sig at rengøre det( var nyt da lejer flyttede ind","rank":2}
{"index":{}}
{"content":"SSG vurderede at dette ikke kunne gøres ren(var nyt da lejer flyttede ind","rank":2}
{"index":{}}
{"content":"SSG vurderede at den ikke kunne rengøres(var ny da lejer flyttede ind","rank":2}
{"index":{}}
{"content":"Rep af tapet","rank":6}
{"index":{}}
{"content":"Begge plader","rank":1}
{"index":{}}
{"content":"Pga. røg","rank":1}
{"index":{}}
{"content":"Isostop","rank":1}
{"index":{}}
{"content":"Fjernelse af ulovlig el","rank":3}
{"index":{}}
{"content":"Panelplader nedtages","rank":3}
{"index":{}}
{"content":"Garderobeskabe over alt","rank":3}
{"index":{}}
{"content":"Kalk fjernes","rank":6}
{"index":{}}
{"content":"Orange plade skiftes","rank":3}
{"index":{}}
{"content":"Rep af intillation","rank":3}
{"index":{}}
{"content":"manglende nøgle = omlægning af systemlås","rank":2}
{"index":{}}
{"content":"Opskuring af gulv","rank":2}
{"index":{}}
{"content":"Ridser og slitage ned til træet","rank":3}
{"index":{}}
{"content":"Malen er skallet af flere steder","rank":3}
{"index":{}}
{"content":"Skabe mangler","rank":3}
{"index":{}}
{"content":"Rep. Af sætningsskade (tapet arbejde","rank":2}
{"index":{}}
{"content":"Træ kasse over vinduer","rank":2}
{"index":{}}
{"content":"1 x maling","rank":12}
{"index":{}}
{"content":"Dør til værelse 1","rank":2}
{"index":{}}
{"content":"Siddeplads på køleskab","rank":2}
{"index":{}}
{"content":"Ridset af sovesofa","rank":2}
{"index":{}}
{"content":"Fremtræder nyistandsat. Ingen behandling","rank":1}
{"index":{}}
{"content":"Omkodning af lås - pga. manglende nøgler","rank":1}
{"index":{}}
{"content":"Vask fastgøres","rank":1}
{"index":{}}
{"content":"Tagvindue","rank":3}
{"index":{}}
{"content":"Greb dekt","rank":3}
{"index":{}}
{"content":"Rengøring af skabe ud- & indvendig","rank":1}
{"index":{}}
{"content":"Knage nedtages","rank":1}
{"index":{}}
{"content":"Der mangler sålbænk på altan","rank":1}
{"index":{}}
{"content":"Ridser igennem lak","rank":8}
{"index":{}}
{"content":"Lak mangler","rank":1}
{"index":{}}
{"content":"Armatur i vask udskiftes","rank":1}
{"index":{}}
{"content":"Skadet pga persienner","rank":2}
{"index":{}}
{"content":"Nikotin skadet","rank":2}
{"index":{}}
{"content":"Ikke pointsat påindflytningsrapport","rank":1}
{"index":{}}
{"content":"Nye swedoor","rank":3}
{"index":{}}
{"content":"Mistanke om skimmel bag gummihud","rank":3}
{"index":{}}
{"content":"Gulvet males hvidt","rank":3}
{"index":{}}
{"content":"Perlator tilkalket","rank":1}
{"index":{}}
{"content":"Brændt hul i bordplade","rank":3}
{"index":{}}
{"content":"Værelse ikke rengjort","rank":3}
{"index":{}}
{"content":"Brændemærke efter grill","rank":3}
{"index":{}}
{"content":"Males pga. Huller","rank":1}
{"index":{}}
{"content":"Udluftningsstang til topvindue udskiftes","rank":1}
{"index":{}}
{"content":"Ny gasmåler monteres","rank":3}
{"index":{}}
{"content":"Fjernelse af løs vinyl på gulv","rank":3}
{"index":{}}
{"content":"Slibning gulve","rank":3}
{"index":{}}
{"content":"Gasafprponing mangler","rank":1}
{"index":{}}
{"content":"Termostat udskiftes","rank":2}
{"index":{}}
{"content":"400v etableres","rank":2}
{"index":{}}
{"content":"Nedtagning af tv","rank":3}
{"index":{}}
{"content":"Begge altaner","rank":2}
{"index":{}}
{"content":"Hundhar skrabet ridser","rank":2}
{"index":{}}
{"content":"Ridser i dør formondtlig hund","rank":2}
{"index":{}}
{"content":"Kalk og/ sæberester på","rank":1}
{"index":{}}
{"content":"Nedtagning af lamper og reol system på væg","rank":3}
{"index":{}}
{"content":"Paneler og karme males","rank":3}
{"index":{}}
{"content":"Udskift kontakter","rank":6}
{"index":{}}
{"content":"Afrens tapet og klargøring til maling","rank":3}
{"index":{}}
{"content":"Fjern indbo","rank":6}
{"index":{}}
{"content":"Fjern køleskab","rank":3}
{"index":{}}
{"content":"Udskift bordplader","rank":3}
{"index":{}}
{"content":"Udskift lister","rank":3}
{"index":{}}
{"content":"Ny skuffe/skuffeskab","rank":3}
{"index":{}}
{"content":"Mal dør","rank":3}
{"index":{}}
{"content":"Mal dørkarme","rank":3}
{"index":{}}
{"content":"Udskiftning af fliser","rank":3}
{"index":{}}
{"content":"Polering af gulv","rank":3}
{"index":{}}
{"content":"Samt spærring efter manglende vedligeholdelse","rank":4}
{"index":{}}
{"content":"Tudse mærker krydser","rank":2}
{"index":{}}
{"content":"Ventilator tappe til","rank":2}
{"index":{}}
{"content":"Vægge males","rank":3}
{"index":{}}
{"content":"Væg males","rank":6}
{"index":{}}
{"content":"Loft males","rank":3}
{"index":{}}
{"content":"Låge faldet af","rank":3}
{"index":{}}
{"content":"Lister /karm faldet af","rank":3}
{"index":{}}
{"content":"Vinduesplade udskiftes efter vold","rank":3}
{"index":{}}
{"content":"Låge på sikringsskab mangler","rank":6}
{"index":{}}
{"content":"Udskiftning af bordplade grundet huller","rank":3}
{"index":{}}
{"content":"Udskiftning af vinduesplade","rank":3}
{"index":{}}
{"content":"rep af skabslåge","rank":3}
{"index":{}}
{"content":"Rep af karme der er faldet af","rank":3}
{"index":{}}
{"content":"Toiletbræt defekt","rank":3}
{"index":{}}
{"content":"Nyt køleskab grundet misligehold","rank":3}
{"index":{}}
{"content":"PUR Behandling","rank":3}
{"index":{}}
{"content":"Udskiftning af kontakt","rank":3}
{"index":{}}
{"content":"Malet med tudser samt afskrabninger","rank":2}
{"index":{}}
{"content":"Kalk i brusekabine og gulv","rank":3}
{"index":{}}
{"content":"Samt rengøring af udsugningskegle","rank":3}
{"index":{}}
{"content":"Panel mangler","rank":3}
{"index":{}}
{"content":"Ikke rengjort oven på 3 overskabe samt toppen af overskabslåger","rank":3}
{"index":{}}
{"content":"Gennemslidt og ridset","rank":3}
{"index":{}}
{"content":"Ikke rengjort rundt om ventilation","rank":3}
{"index":{}}
{"content":"Let rengøring af topplade","rank":3}
{"index":{}}
{"content":"Skade","rank":4}
{"index":{}}
{"content":"Ovn rengøres","rank":3}
{"index":{}}
{"content":"Rengør vask","rank":6}
{"index":{}}
{"content":"Lampeudtag fastgøres","rank":3}
{"index":{}}
{"content":"Fjern clips på fodpanel","rank":3}
{"index":{}}
{"content":"Rengør toilet","rank":3}
{"index":{}}
{"content":"Rengøres efter håndværkere","rank":1}
{"index":{}}
{"content":"Spærende maling","rank":9}
{"index":{}}
{"content":"Spærring og maling","rank":3}
{"index":{}}
{"content":"Renses og males","rank":6}
{"index":{}}
{"content":"Reses og males","rank":3}
{"index":{}}
{"content":"Slib lak af køkkenbordplade","rank":3}
{"index":{}}
{"content":"Fjern kroge mm","rank":3}
{"index":{}}
{"content":"Gulv poleres","rank":3}
{"index":{}}
{"content":"Udskift fliser med huller","rank":3}
{"index":{}}
{"content":"Udskift blandingsbatteri","rank":3}
{"index":{}}
{"content":"Skader","rank":2}
{"index":{}}
{"content":"Dør rosetter mangler","rank":2}
{"index":{}}
{"content":"Dør håndtag mangler","rank":2}
{"index":{}}
{"content":"Eftergå og behandle evt. mod alger","rank":1}
{"index":{}}
{"content":"Ridser mm","rank":5}
{"index":{}}
{"content":"Afskraninger","rank":2}
{"index":{}}
{"content":"Søm mærker fra ledning holder","rank":2}
{"index":{}}
{"content":"Dybe ridser ude for køkken","rank":2}
{"index":{}}
{"content":"Ridser i et rundt felt","rank":2}
{"index":{}}
{"content":"Ridser på karme","rank":2}
{"index":{}}
{"content":"Gasafpropning mangler","rank":2}
{"index":{}}
{"content":"Rengøring mangelfuld/ ikke sket","rank":3}
{"index":{}}
{"content":"Mangler 1 stk postkasse nøgle nr 42","rank":3}
{"index":{}}
{"content":"Slibes 1 grunder 2 gange lak grundet ridser og hakker gennem lak","rank":6}
{"index":{}}
{"content":"Rengøring af alle flader grundet snavs","rank":3}
{"index":{}}
{"content":"Vinduer gennemgåes samt udskift lister","rank":3}
{"index":{}}
{"content":"Omkodning af lås","rank":2}
{"index":{}}
{"content":"Ikke tilstrækklig rengjort","rank":3}
{"index":{}}
{"content":"Nye skabe","rank":2}
{"index":{}}
{"content":"Samt depot rum 30 tømming","rank":2}
{"index":{}}
{"content":"Fliser afkalkes golv og væge","rank":3}
{"index":{}}
{"content":"Fjerne inventat i baghave","rank":3}
{"index":{}}
{"content":"Efter fjernelse af gulvtæpper","rank":2}
{"index":{}}
{"content":"Efter fjernelse af gulvtæppe","rank":2}
{"index":{}}
{"content":"Rengøring omkring håndvask blandt andet","rank":3}
{"index":{}}
{"content":"Ubbedring af manglende gulvmosaik ved dørtrin","rank":3}
{"index":{}}
{"content":"Oprydning af have","rank":3}
{"index":{}}
{"content":"Mangler 1 11-stift nøgle til opgang","rank":3}
{"index":{}}
{"content":"Fjerne loftslampe","rank":3}
{"index":{}}
{"content":"Vask til ren bund","rank":2}
{"index":{}}
{"content":"Liste under vindues bundplade","rank":2}
{"index":{}}
{"content":"Centralt opsat standardnote","rank":4}
{"index":{}}
{"content":"2 x afkalkning gulv","rank":2}
{"index":{}}
{"content":"SFE test","rank":1}
{"index":{}}
{"content":"Reparation af loftudtag","rank":3}
{"index":{}}
{"content":"Afklakning","rank":2}
{"index":{}}
{"content":"Køkkenelementer rengøres ind og udvendigt","rank":1}
{"index":{}}
{"content":"Strømudtag etableres ved ildsted 400v","rank":2}
{"index":{}}
{"content":"kontakter med jord etableres efter aftale med ejendomskontor","rank":2}
{"index":{}}
{"content":"Se fejl og mangelliste","rank":8}
{"index":{}}
{"content":"Efter nedtagning af spejle","rank":1}
{"index":{}}
{"content":"Ridser ca 15 cm fra gulv","rank":2}
{"index":{}}
{"content":"Manglende tømning","rank":2}
{"index":{}}
{"content":"Rep af væg","rank":3}
{"index":{}}
{"content":"Fjern hyldepapir","rank":3}
{"index":{}}
{"content":"Wc afkalkes","rank":3}
{"index":{}}
{"content":"Køleskab ikke rengjort","rank":3}
{"index":{}}
{"content":"Ødelagt vægmaling spartels og males","rank":1}
{"index":{}}
{"content":"Pga. Manglende nøgler","rank":1}
{"index":{}}
{"content":"Hylder males og tape tages af","rank":1}
{"index":{}}
{"content":"Pga. mislykket rep. af egen huller","rank":1}
{"index":{}}
{"content":"Køleskab har stået i depot med kukket dør. Lugt kan ikke fjernes","rank":1}
{"index":{}}
{"content":"Se. mangelliste","rank":1}
{"index":{}}
{"content":"Hængsler og greb udskiftes","rank":3}
{"index":{}}
{"content":"Ny bruseslange og hoved monteres","rank":3}
{"index":{}}
{"content":"Rengøring af håndvask","rank":1}
{"index":{}}
{"content":"Rep efter gardinmontering spatels og pletmales","rank":1}
{"index":{}}
{"content":"Folie el. andet","rank":2}
{"index":{}}
{"content":"Skade efter nedsivning af vand","rank":2}
{"index":{}}
{"content":"Fjernelse af spindelvæv og aftørring / vask af fodpaneler pga mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Hul i dørplade","rank":2}
{"index":{}}
{"content":"Ledninger taget af bag stikkontakt","rank":1}
{"index":{}}
{"content":"Pga. huller i klinke","rank":39}
{"index":{}}
{"content":"Pga. Hakker og gennemslid af laminat","rank":39}
{"index":{}}
{"content":"Rens afløb","rank":3}
{"index":{}}
{"content":"Afkalkning i bad","rank":2}
{"index":{}}
{"content":"Underside af vask","rank":2}
{"index":{}}
{"content":"Pga. Tilsmudsning/misfarvning","rank":1}
{"index":{}}
{"content":"Nedtagning af hylde","rank":3}
{"index":{}}
{"content":"Pga misfarvning","rank":1}
{"index":{}}
{"content":"Ny køkkenbord plade på begge sider","rank":3}
{"index":{}}
{"content":"Kasse over køleskab fjernes","rank":3}
{"index":{}}
{"content":"Demontering af el installation","rank":3}
{"index":{}}
{"content":"Det som ikke skal være der","rank":3}
{"index":{}}
{"content":"Opsat tapet","rank":3}
{"index":{}}
{"content":"Beskidt og tilkalket","rank":3}
{"index":{}}
{"content":"Ny spejlhylde","rank":6}
{"index":{}}
{"content":"ny knagerække","rank":3}
{"index":{}}
{"content":"Ny wc rulleholder","rank":3}
{"index":{}}
{"content":"Beboers inventar","rank":9}
{"index":{}}
{"content":"Loft forsejles 2 gange","rank":1}
{"index":{}}
{"content":"Pga. Gennemskue af lakken","rank":1}
{"index":{}}
{"content":"Kalk på fliser i bad","rank":3}
{"index":{}}
{"content":"Ikke ren gjort","rank":3}
{"index":{}}
{"content":"Gulve udbedres på fraflytters regning","rank":3}
{"index":{}}
{"content":"Skrue/bore huller i træværk","rank":3}
{"index":{}}
{"content":"Lak mangler på gulv","rank":3}
{"index":{}}
{"content":"Ridser i trappe","rank":3}
{"index":{}}
{"content":"Hakker i trappe","rank":3}
{"index":{}}
{"content":"Maling slidt af på indfatning","rank":3}
{"index":{}}
{"content":"Maling mangler på fodpanel","rank":3}
{"index":{}}
{"content":"Hakker i indfatning","rank":3}
{"index":{}}
{"content":"Hakker i fodpanel","rank":3}
{"index":{}}
{"content":"Bore hul i vægfliser","rank":3}
{"index":{}}
{"content":"Lampeudtag overmalet","rank":3}
{"index":{}}
{"content":"Maling på afbryder/udtag","rank":3}
{"index":{}}
{"content":"Gammel vandskade under lak","rank":3}
{"index":{}}
{"content":"Syreskadet blandings batteri","rank":3}
{"index":{}}
{"content":"Hul i væg fliser/fuger","rank":3}
{"index":{}}
{"content":"Risser","rank":1}
{"index":{}}
{"content":"Spartling og pletning af huller på vægge og vinduer/døre","rank":2}
{"index":{}}
{"content":"Sæbehylde ikke demonteret","rank":3}
{"index":{}}
{"content":"Klikgulv","rank":3}
{"index":{}}
{"content":"Fjernes hvis ikke kan slibes","rank":3}
{"index":{}}
{"content":"Hylde og ophæng ikke demonteret","rank":3}
{"index":{}}
{"content":"Demontering af klikgulv","rank":3}
{"index":{}}
{"content":"Ikke rengjort korrekt","rank":9}
{"index":{}}
{"content":"Klædeskab ikke fjernet","rank":3}
{"index":{}}
{"content":"Gulvfliser ikke fjernet","rank":3}
{"index":{}}
{"content":"Altanmøbler ikke fjernet","rank":3}
{"index":{}}
{"content":"Træværk over / under stuevindue","rank":1}
{"index":{}}
{"content":"Fodpanel friskes op","rank":3}
{"index":{}}
{"content":"Males på grund af mærker og ridser","rank":1}
{"index":{}}
{"content":"Males på grund af huller i loftet","rank":1}
{"index":{}}
{"content":"Ikke gjort ved indflytning","rank":2}
{"index":{}}
{"content":"Mangler 2 nøgler","rank":3}
{"index":{}}
{"content":"mangelende nøgle = omlægning af systemlås","rank":2}
{"index":{}}
{"content":"Fjernels Ledning","rank":3}
{"index":{}}
{"content":"Beskidt kan ikke rengøres","rank":2}
{"index":{}}
{"content":"Kennys egen note","rank":1}
{"index":{}}
{"content":"Den bedste note i verden","rank":2}
{"index":{}}
{"content":"Lakken er gennemslidt og det underliggende gulv er misfarvet","rank":3}
{"index":{}}
{"content":"Dør indfatning og dørblad hakket og skrammet","rank":3}
{"index":{}}
{"content":"Bordplade hakket og skrammet","rank":6}
{"index":{}}
{"content":"Hele rummet afkalkes og rengøres kraftigt","rank":3}
{"index":{}}
{"content":"Løsøre nedtages og bortkøres","rank":3}
{"index":{}}
{"content":"Hårde hvidevarer nedtages og bortkøres","rank":3}
{"index":{}}
{"content":"Hele rummet rengøres grundigt","rank":3}
{"index":{}}
{"content":"Rengøring efter Håndværker","rank":3}
{"index":{}}
{"content":"Der forligger ejerskabserklæring","rank":3}
{"index":{}}
{"content":"Tapet ødelagt","rank":3}
{"index":{}}
{"content":"Lakken er gennemslidt og trinnet er misfarvet","rank":3}
{"index":{}}
{"content":"Lejer hæfter ikke for en slipning da gulvet har rejst sig","rank":2}
{"index":{}}
{"content":"Kælderrum er ikke tømt","rank":3}
{"index":{}}
{"content":"Ikke afrenset tapeklisrer","rank":3}
{"index":{}}
{"content":"Mange huller i vægge","rank":3}
{"index":{}}
{"content":"På dørkarm og gereigth","rank":3}
{"index":{}}
{"content":"Ikke bortskaffet","rank":3}
{"index":{}}
{"content":"Kabelbakker ikke demonteret","rank":3}
{"index":{}}
{"content":"Rep. og plettes hvis skader efter demontering","rank":3}
{"index":{}}
{"content":"Ikke demonteret","rank":3}
{"index":{}}
{"content":"Bordplade skiftes hvis den ikke kan rengøres eller har skader under snavs","rank":3}
{"index":{}}
{"content":"Gulv udskiftes i nødvendigt omfang hvis ikke kan slibes","rank":3}
{"index":{}}
{"content":"Gulv ødelagt ved vask","rank":3}
{"index":{}}
{"content":"Udskiftes i nødvendigt omfang","rank":3}
{"index":{}}
{"content":"Mangel på rengøring","rank":6}
{"index":{}}
{"content":"Skrue i dør udvendigt samt klister","rank":3}
{"index":{}}
{"content":"Knager ikke demonteret","rank":3}
{"index":{}}
{"content":"Cylinder tidligere omstillet da fraflytters bobestyrer ikke vikke afleverer nøgler til lejemålet","rank":3}
{"index":{}}
{"content":"Pga gennemslid i lakken","rank":1}
{"index":{}}
{"content":"Lim fra folie","rank":2}
{"index":{}}
{"content":"Korrekt","rank":3}
{"index":{}}
{"content":"Alt træværk afvaskes for nikotin","rank":3}
{"index":{}}
{"content":"Gardiner ikke demonteret","rank":3}
{"index":{}}
{"content":"Mikroovn ikke fjernet","rank":3}
{"index":{}}
{"content":"Kogeplade er demonteret","rank":3}
{"index":{}}
{"content":"Samt stikkontakter","rank":3}
{"index":{}}
{"content":"Lampe over spejl defekt","rank":3}
{"index":{}}
{"content":"Rep. af huller efter diverse","rank":3}
{"index":{}}
{"content":"Demontering af div","rank":3}
{"index":{}}
{"content":"Brusestang løs og uden ophæng","rank":3}
{"index":{}}
{"content":"Ny brusestang monteres med ophæng i loft","rank":3}
{"index":{}}
{"content":"Vask af gulv pga mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Rengøring bag alle radiator pga mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Rengøring efter gulvslibning","rank":3}
{"index":{}}
{"content":"Ny skuffe","rank":3}
{"index":{}}
{"content":"Ny låge til skraldestativ","rank":3}
{"index":{}}
{"content":"Maling vægge","rank":1}
{"index":{}}
{"content":"Maling gennemslidt","rank":1}
{"index":{}}
{"content":"Pga. Manglende vedligehold","rank":1}
{"index":{}}
{"content":"Bortskaffelse af efterladt indbo","rank":1}
{"index":{}}
{"content":"Rens rende","rank":3}
{"index":{}}
{"content":"Loft Nikotin gult","rank":3}
{"index":{}}
{"content":"Vægge Nikotin farvede","rank":3}
{"index":{}}
{"content":"Reparer","rank":3}
{"index":{}}
{"content":"Efter klistermærke mv","rank":1}
{"index":{}}
{"content":"Fjerne kogeplade","rank":3}
{"index":{}}
{"content":"Pga hul i døren","rank":2}
{"index":{}}
{"content":"Der foreligger ejerskabserklæring","rank":3}
{"index":{}}
{"content":"Altandør oprettes","rank":3}
{"index":{}}
{"content":"Ny bundventil samt boniarør","rank":3}
{"index":{}}
{"content":"Ifm gulvslibning","rank":3}
{"index":{}}
{"content":"Fjerne spejl","rank":6}
{"index":{}}
{"content":"Fjerne fraflytters installationer","rank":3}
{"index":{}}
{"content":"Ny cylinder i lejemål og postkasse nøgle skal passe til begge steder","rank":3}
{"index":{}}
{"content":"Fedet og ulækker","rank":3}
{"index":{}}
{"content":"Rep af køkkenlåger","rank":3}
{"index":{}}
{"content":"Ny frontplade på sokkel","rank":3}
{"index":{}}
{"content":"Fjerne klistermærker","rank":6}
{"index":{}}
{"content":"Stænkplade","rank":3}
{"index":{}}
{"content":"Store hakker","rank":3}
{"index":{}}
{"content":"Fjerne stolpe","rank":3}
{"index":{}}
{"content":"Af gulv","rank":3}
{"index":{}}
{"content":"Generalt ødelagte lofter","rank":3}
{"index":{}}
{"content":"Generalt ødelagte vægge","rank":3}
{"index":{}}
{"content":"Fjerne afskærmning","rank":3}
{"index":{}}
{"content":"Males fra top til bund","rank":3}
{"index":{}}
{"content":"Der hvor der er boret","rank":3}
{"index":{}}
{"content":"Forbehold for tilladelse","rank":3}
{"index":{}}
{"content":"Rengøring overalt","rank":3}
{"index":{}}
{"content":"Fuges mod væg","rank":1}
{"index":{}}
{"content":"Loft skaller","rank":1}
{"index":{}}
{"content":"Ridset og nicotin farvet","rank":2}
{"index":{}}
{"content":"Fjern klister fra knager","rank":3}
{"index":{}}
{"content":"Huller i fuger","rank":3}
{"index":{}}
{"content":"Fuges","rank":3}
{"index":{}}
{"content":"Demontering","rank":3}
{"index":{}}
{"content":"Fugning af evt. huller i fuger eller udskiftning af fliser","rank":3}
{"index":{}}
{"content":"Gennemslidt lak og hakker","rank":3}
{"index":{}}
{"content":"Altandør stod åben og regn på gulvet","rank":3}
{"index":{}}
{"content":"Gl vandskade fra åbent vindue","rank":3}
{"index":{}}
{"content":"Demontering af skab under kogeplade","rank":3}
{"index":{}}
{"content":"Mangler 1 systemnøgle","rank":3}
{"index":{}}
{"content":"Wc-stativ mangler","rank":3}
{"index":{}}
{"content":"Mærker på maling","rank":5}
{"index":{}}
{"content":"Greb monteres på skab på repose","rank":3}
{"index":{}}
{"content":"El gennemgang","rank":3}
{"index":{}}
{"content":"Ny fuge rundt om badekar","rank":3}
{"index":{}}
{"content":"Lys i overskab fjernes","rank":3}
{"index":{}}
{"content":"Rep af huller i skabsbund","rank":3}
{"index":{}}
{"content":"Plet / rep af væg","rank":2}
{"index":{}}
{"content":"Løse ledninger ud af kontaker","rank":1}
{"index":{}}
{"content":"Nedtagning af nødkaldanlæg","rank":1}
{"index":{}}
{"content":"Rep efter nødkaldsanlæg","rank":1}
{"index":{}}
{"content":"Nøglermangler","rank":1}
{"index":{}}
{"content":"Mulig fyldt","rank":1}
{"index":{}}
{"content":"Hvor det er påkævet","rank":1}
{"index":{}}
{"content":"manglende nøgle = omlægning","rank":2}
{"index":{}}
{"content":"Skrammer på maling","rank":2}
{"index":{}}
{"content":"Klikgulv allock","rank":2}
{"index":{}}
{"content":"Vinyl udskiftes","rank":1}
{"index":{}}
{"content":"Fugtskade fra bad","rank":1}
{"index":{}}
{"content":"Skrue skruet igennem låge","rank":39}
{"index":{}}
{"content":"Rengøring af wc","rank":1}
{"index":{}}
{"content":"Pga. taperester","rank":1}
{"index":{}}
{"content":"Meget nikotin ikke afrenset","rank":3}
{"index":{}}
{"content":"Bølget parket","rank":3}
{"index":{}}
{"content":"Inkl. dørtrin","rank":6}
{"index":{}}
{"content":"Ødelagte fliser","rank":3}
{"index":{}}
{"content":"Samt skruehuller i fuger","rank":3}
{"index":{}}
{"content":"Emhætte ikke bortskaffet","rank":3}
{"index":{}}
{"content":"lysstofsarmatur ikke bortskaffet","rank":3}
{"index":{}}
{"content":"Loftroset defekt","rank":3}
{"index":{}}
{"content":"Huller i joft","rank":3}
{"index":{}}
{"content":"Maling afskalning","rank":3}
{"index":{}}
{"content":"Tapet gaber flere steder","rank":3}
{"index":{}}
{"content":"Mange søm i væg","rank":3}
{"index":{}}
{"content":"Parketgulv skiftes i nødvendigt omfang","rank":3}
{"index":{}}
{"content":"Hvis ikke kan rep. Af gulvmang","rank":3}
{"index":{}}
{"content":"Revnet gulv","rank":3}
{"index":{}}
{"content":"Strukturtapet","rank":3}
{"index":{}}
{"content":"Maling krakelerer","rank":3}
{"index":{}}
{"content":"Hvis forsikring ikke dækker","rank":3}
{"index":{}}
{"content":"Afskallet selvniverering","rank":3}
{"index":{}}
{"content":"Ekstralås er boret ud","rank":3}
{"index":{}}
{"content":"Der er tidligere udskiftet en cylinder","rank":3}
{"index":{}}
{"content":"Samt afrensning af folie på vinduer","rank":3}
{"index":{}}
{"content":"Polering af linoleum pga. ridser og skrammer","rank":1}
{"index":{}}
{"content":"Udskift malede låger og hylder og sider og desk","rank":3}
{"index":{}}
{"content":"Udskift afbryder","rank":3}
{"index":{}}
{"content":"Udskift ødelagte ruder","rank":3}
{"index":{}}
{"content":"Lejer 60% udl. 40","rank":1}
{"index":{}}
{"content":"Lejlighed ikke rengjort til syn","rank":2}
{"index":{}}
{"content":"Strammer","rank":2}
{"index":{}}
{"content":"Lejer 75% udl. 25","rank":1}
{"index":{}}
{"content":"Badeværelse inventar afvaskes","rank":15}
{"index":{}}
{"content":"Bruseniche afkalkes og renses","rank":15}
{"index":{}}
{"content":"Dør afvaskes på grund af mærker","rank":14}
{"index":{}}
{"content":"Fodpanel males på grund af sorte mærker","rank":15}
{"index":{}}
{"content":"Gulv maskinslibes og 3 x lak på grund af ridser og brud på lak","rank":4}
{"index":{}}
{"content":"Håndvask og blandingsbatteri afkalkes og renses","rank":15}
{"index":{}}
{"content":"Køkken inventar afvaskes","rank":14}
{"index":{}}
{"content":"Køle/frys afrimes og afvaskes","rank":4}
{"index":{}}
{"content":"Lejers inventar fjernes","rank":15}
{"index":{}}
{"content":"Loft males på grund af streger","rank":15}
{"index":{}}
{"content":"Opvaskemaskine renses og afkalkes","rank":14}
{"index":{}}
{"content":"Ovn renses","rank":12}
{"index":{}}
{"content":"Terrasse rengøres for ukrudt","rank":14}
{"index":{}}
{"content":"Træværk afvaskes på grund af mærker","rank":15}
{"index":{}}
{"content":"Træværk males på grund af skrammer og mærker","rank":13}
{"index":{}}
{"content":"Vaskemaskine og tørretumbler renses og afkalkes","rank":15}
{"index":{}}
{"content":"Væg 1 males på grund af  skrammer","rank":15}
{"index":{}}
{"content":"Væg 2 males på grund af  skrammer","rank":14}
{"index":{}}
{"content":"Væg 3 males på grund af  skrammer","rank":15}
{"index":{}}
{"content":"Væg 4 males på grund af skrammer","rank":14}
{"index":{}}
{"content":"Vægge males på grund af skrammer","rank":14}
{"index":{}}
{"content":"Vindue males på grund af skrammer","rank":15}
{"index":{}}
{"content":"Vindue pletmales på grund af skrammer","rank":15}
{"index":{}}
{"content":"Bordplade skiftes på af hakker og ridser","rank":14}
{"index":{}}
{"content":"Inventar låge skiftes på grund af hakker og ridser","rank":14}
{"index":{}}
{"content":"Dør skiftes på grund af hakker og ridser","rank":14}
{"index":{}}
{"content":"LET ) rengøring fjernelse af spindelvæv og aftørring af skabe ind og udvendig af hele lejemål .pga mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Fjerne skridsikring ved seng","rank":3}
{"index":{}}
{"content":"Gulv maskinslibes og 3 x lak på grund af dybe ridser og brud på lak","rank":9}
{"index":{}}
{"content":"Afrens og afvask på grund af snavs og mærker","rank":15}
{"index":{}}
{"content":"Pga. væg malet i anden farve","rank":1}
{"index":{}}
{"content":"Ovn ikke bortskaffet","rank":3}
{"index":{}}
{"content":"Bordkomfue ikke bortskaffet","rank":3}
{"index":{}}
{"content":"køleskab ikk bortskaffet","rank":3}
{"index":{}}
{"content":"Opvaskermaskine ikk bortskaffet","rank":3}
{"index":{}}
{"content":"Skjulte installationer bag gerigter og stokatur","rank":3}
{"index":{}}
{"content":"Bordkomfur monteret","rank":3}
{"index":{}}
{"content":"Skiftes hvis driften ikke accepterer bordkomfur","rank":3}
{"index":{}}
{"content":"Gerigter og paneler mangler","rank":3}
{"index":{}}
{"content":"Demontering af kabelkanaler som erstatter gerigter og paneler","rank":3}
{"index":{}}
{"content":"Ikke kotekt monteret","rank":3}
{"index":{}}
{"content":"Underskab hvor der skal være komfur","rank":3}
{"index":{}}
{"content":"Monterede stukatur fjernes og vægge og lofter rep","rank":3}
{"index":{}}
{"content":"Samt indmuret","rank":3}
{"index":{}}
{"content":"Strukturtapet monteret","rank":3}
{"index":{}}
{"content":"Fjernet","rank":3}
{"index":{}}
{"content":"Mosaikker mangler","rank":3}
{"index":{}}
{"content":"Udskiftning og rep af fliser bag fraflytters inventar","rank":3}
{"index":{}}
{"content":"Diverse demonteres","rank":3}
{"index":{}}
{"content":"Inkl. vvs","rank":3}
{"index":{}}
{"content":"Overskab ved gasmåler","rank":3}
{"index":{}}
{"content":"Slidt og lidt bølgende","rank":3}
{"index":{}}
{"content":"Rep plet og færdigstryg","rank":3}
{"index":{}}
{"content":"Vægmaling ned på fod paneler","rank":3}
{"index":{}}
{"content":"Vægmaling ned på fodpaneler","rank":3}
{"index":{}}
{"content":"Slibes pga ridser og mærker","rank":1}
{"index":{}}
{"content":"Udskift skabslåge","rank":3}
{"index":{}}
{"content":"Pga. stærk tilsmudset vægge","rank":1}
{"index":{}}
{"content":"Huller i dør til værelse","rank":3}
{"index":{}}
{"content":"Skabslåge mangler","rank":3}
{"index":{}}
{"content":"Oval ruko 6 stift","rank":3}
{"index":{}}
{"content":"Rukonøgle 6 stift kode","rank":3}
{"index":{}}
{"content":"Fjerne gaskomfur","rank":3}
{"index":{}}
{"content":"Perlator ikke rengjort/afkalket","rank":1}
{"index":{}}
{"content":"Vindue i soveværelse og stue males","rank":3}
{"index":{}}
{"content":"Males stue og værelse","rank":3}
{"index":{}}
{"content":"Opvaske fjernes","rank":3}
{"index":{}}
{"content":"Ikke misligeholdelse da gulvet løfter sig","rank":2}
{"index":{}}
{"content":"Ikke misligeholdelse da gulvet har løftet sig","rank":2}
{"index":{}}
{"content":"Mangel på veligeholdelse","rank":2}
{"index":{}}
{"content":"Mærker efter hjælpemidler","rank":2}
{"index":{}}
{"content":"Afkalkning af hane","rank":3}
{"index":{}}
{"content":"Let rengøring - støvsugning","rank":3}
{"index":{}}
{"content":"Kalk afrenses bruseområde","rank":1}
{"index":{}}
{"content":"Vandskade gulv","rank":3}
{"index":{}}
{"content":"Plet ved radiator måler","rank":2}
{"index":{}}
{"content":"Hoveddør indv","rank":2}
{"index":{}}
{"content":"Afpropning ved vand og afløb vedr. vaske-/opvaskemaskine","rank":1}
{"index":{}}
{"content":"Maling af fodpaneler","rank":3}
{"index":{}}
{"content":"Dørblad er løs","rank":3}
{"index":{}}
{"content":"Nedtagning af kroge i loft","rank":2}
{"index":{}}
{"content":"Hakker efter kørestol","rank":2}
{"index":{}}
{"content":"Omkodning pga manglende nøgle","rank":2}
{"index":{}}
{"content":"Rep. af skuffer mm","rank":3}
{"index":{}}
{"content":"Letslibning pga ridser i lak","rank":2}
{"index":{}}
{"content":"Ikke ren","rank":12}
{"index":{}}
{"content":"Lettere tilkalket","rank":9}
{"index":{}}
{"content":"Pga. farveskift","rank":1}
{"index":{}}
{"content":"Beton gulv males","rank":2}
{"index":{}}
{"content":"Nedtagning af gardinstænger og rullegardiner","rank":2}
{"index":{}}
{"content":"Afkalkning af begge bl. batteri","rank":2}
{"index":{}}
{"content":"Klargøring og polering","rank":2}
{"index":{}}
{"content":"Kld. rum ikke tømt","rank":2}
{"index":{}}
{"content":"Omkodning af lås samt nye nøgler","rank":2}
{"index":{}}
{"content":"Pga. borehuller","rank":2}
{"index":{}}
{"content":"Pga. gennemslid igennem lakken","rank":2}
{"index":{}}
{"content":"Pga. hakker og skrammer","rank":2}
{"index":{}}
{"content":"Pga. kraftig tilsmudsning","rank":2}
{"index":{}}
{"content":"Pga. malet med en anden farve end standart","rank":2}
{"index":{}}
{"content":"Pga. mangelfuld rengøring bag radiator","rank":1}
{"index":{}}
{"content":"Pga. overmalet kontakter","rank":2}
{"index":{}}
{"content":"Pga. riser og skrammer","rank":2}
{"index":{}}
{"content":"Pga. tape samt riser i lakken","rank":2}
{"index":{}}
{"content":"Pga. vandskade efter brug uden badeforhæng","rank":2}
{"index":{}}
{"content":"Rep. efter gardin montering","rank":2}
{"index":{}}
{"content":"Loft males pgr af skrammer","rank":1}
{"index":{}}
{"content":"Ligger løst i bolig","rank":1}
{"index":{}}
{"content":"Hylde er i skab i mellemgang","rank":1}
{"index":{}}
{"content":"Hakker i karmen","rank":2}
{"index":{}}
{"content":"Dørkarm er malet med vægfarve","rank":2}
{"index":{}}
{"content":"Højne standarden i boligen","rank":2}
{"index":{}}
{"content":"Gulv let slibes og 2 x lak på grund af  skrammer og ridser","rank":14}
{"index":{}}
{"content":"Dørtrin maskinslibes og 3 x lak på grund af ridser og brud på lak","rank":4}
{"index":{}}
{"content":"Dørtrin let slibes og 2 x lak på grund af  skrammer og ridser","rank":10}
{"index":{}}
{"content":"Fjernelse af spindelvæv og aftørring / vask af fodpaneler pga. mangelfuld rengøring","rank":1}
{"index":{}}
{"content":"Ny dør pga. vandskade","rank":1}
{"index":{}}
{"content":"Pga. mangelfuld rengøring bag radiator ( Alle 493","rank":1}
{"index":{}}
{"content":"Nedtagning af Lamper","rank":3}
{"index":{}}
{"content":"Hul I dørplade","rank":3}
{"index":{}}
{"content":"Hul I dørplade. Udskiftes for lejers regning","rank":3}
{"index":{}}
{"content":"Gulvtæppe ikke fjernet ved fraflytningssyn","rank":3}
{"index":{}}
{"content":"Toilet ikke Rengjort ved fraflytningssyn. Afkalkes","rank":3}
{"index":{}}
{"content":"Brusekabine ikke rengjort ved fraflytningssyn. Afkalkes","rank":3}
{"index":{}}
{"content":"Køkkenskabe ikke rengjort ved flyttesyn","rank":3}
{"index":{}}
{"content":"Lak gennemslidt. Mørkegrå eller sort.(mislighold","rank":3}
{"index":{}}
{"content":"Der mangler kabel til internet på afdelingens modem","rank":3}
{"index":{}}
{"content":"Stikkontakt defekt","rank":3}
{"index":{}}
{"content":"Dørtrin maskinslibes og 3 x lak på grund af dybe ridser og brud på lak","rank":9}
{"index":{}}
{"content":"Køle/frys afrimes og afvaskes","rank":10}
{"index":{}}
{"content":"Ovn renses","rank":3}
{"index":{}}
{"content":"Afvaskes for nikotin","rank":2}
{"index":{}}
{"content":"Træværk males på grund af skrammer og mærke","rank":1}
{"index":{}}
{"content":"Hænger ud fra væg","rank":1}
{"index":{}}
{"content":"Knager ikke standard","rank":1}
{"index":{}}
{"content":"Maling af vægge","rank":6}
{"index":{}}
{"content":"Maling af loft","rank":3}
{"index":{}}
{"content":"Maling rør","rank":3}
{"index":{}}
{"content":"Udskiftning af dørblad","rank":3}
{"index":{}}
{"content":"Klargør til maling","rank":3}
{"index":{}}
{"content":"Klar til maling","rank":6}
{"index":{}}
{"content":"Montering af trekantslister","rank":3}
{"index":{}}
{"content":"Levering af indvendig dør","rank":3}
{"index":{}}
{"content":"lugt sanering","rank":3}
{"index":{}}
{"content":"Udskiftning af rude","rank":3}
{"index":{}}
{"content":"Udskiftning defekt kontakt","rank":3}
{"index":{}}
{"content":"Nedvaskning af loft samt vægge","rank":3}
{"index":{}}
{"content":"Inventar låge pletmales efter skrammer og hakker","rank":8}
{"index":{}}
{"content":"Dør pletmales på grund af skrammer og hakker","rank":7}
{"index":{}}
{"content":"Kogeplade skiftes på grund af brud","rank":7}
{"index":{}}
{"content":"Vinduer pudses indvendigt og udvendigt","rank":7}
{"index":{}}
{"content":"Altan rengøres","rank":7}
{"index":{}}
{"content":"Badeværelse inventar udskiftes på grund af vandskade","rank":7}
{"index":{}}
{"content":"Løse ledninger ud af rosette","rank":1}
{"index":{}}
{"content":"Slibes pgr. Tæpperester","rank":3}
{"index":{}}
{"content":"Vask vinduer","rank":3}
{"index":{}}
{"content":"Ryd terrasse","rank":3}
{"index":{}}
{"content":"Pga. Kalk","rank":3}
{"index":{}}
{"content":"Indbo ikke ryddet","rank":3}
{"index":{}}
{"content":"Inkl. kontakter","rank":3}
{"index":{}}
{"content":"Inkl. afkalkning","rank":3}
{"index":{}}
{"content":"Forbehold for skader under indbo","rank":3}
{"index":{}}
{"content":"Mulige skader under indbo","rank":3}
{"index":{}}
{"content":"Emhætte og filter ikke rengjort","rank":3}
{"index":{}}
{"content":"Huller i vindueskarm udbedres","rank":3}
{"index":{}}
{"content":"Fuges mod fodpaneler og gerigter","rank":1}
{"index":{}}
{"content":"Der er streger","rank":1}
{"index":{}}
{"content":"Afmonter ledninger","rank":3}
{"index":{}}
{"content":"Fastgør gulvlister","rank":3}
{"index":{}}
{"content":"Skimmelsvamp i fuger","rank":1}
{"index":{}}
{"content":"Pga. Misfarvning og stærk tilsmudsning","rank":3}
{"index":{}}
{"content":"Pga. Taperester","rank":1}
{"index":{}}
{"content":"Hænger ud af væg","rank":2}
{"index":{}}
{"content":"Malet dørblad","rank":3}
{"index":{}}
{"content":"Nye LED lamper monteres (standard til med ejendomskontoret","rank":1}
{"index":{}}
{"content":"Nye LED lamper monteres (standard tal med ejendomskontoret","rank":1}
{"index":{}}
{"content":"Pga. Sætningsrevner","rank":3}
{"index":{}}
{"content":"Reparation af isolering i teknikskab på rør","rank":1}
{"index":{}}
{"content":"male","rank":14}
{"index":{}}
{"content":"Hængsel mangler","rank":3}
{"index":{}}
{"content":"Ny fuge omkring afløb","rank":3}
{"index":{}}
{"content":"Olieres","rank":3}
{"index":{}}
{"content":"Males pga ridser/mærker og lappes huller","rank":1}
{"index":{}}
{"content":"Males pga. ridser/mærker og lappes huller","rank":2}
{"index":{}}
{"content":"Lakken slibes af og nyt påføres","rank":1}
{"index":{}}
{"content":"Låger hænger skævt","rank":1}
{"index":{}}
{"content":"Skrammet - farveskift til hvid","rank":1}
{"index":{}}
{"content":"Maling springer i samlinger mv. samt vinduesplade","rank":1}
{"index":{}}
{"content":"Maling springer i samlinger mv","rank":1}
{"index":{}}
{"content":"Afpropning mangler jf. gældende regler","rank":1}
{"index":{}}
{"content":"Pga. bortkommen nøgler","rank":1}
{"index":{}}
{"content":"Pga. emne er malet med vægfarve","rank":1}
{"index":{}}
{"content":"Pga. Ikke korrekt udført behandling fra lejersside","rank":1}
{"index":{}}
{"content":"Pga. emne er overmalet med vægfarve","rank":1}
{"index":{}}
{"content":"Hakker i dørkarm","rank":3}
{"index":{}}
{"content":"ikke tømt","rank":1}
{"index":{}}
{"content":"Løber","rank":3}
{"index":{}}
{"content":"Nye hængsler","rank":3}
{"index":{}}
{"content":"Trådhylder ikke standard","rank":1}
{"index":{}}
{"content":"Pga. Fugtskade","rank":6}
{"index":{}}
{"content":"Pga. Hakker og mærker","rank":1}
{"index":{}}
{"content":"Pga. Efterladt indbo","rank":1}
{"index":{}}
{"content":"Skallende maling","rank":3}
{"index":{}}
{"content":"Borehuller i fliser","rank":3}
{"index":{}}
{"content":"Rep/forsegling af huller i fuger og fliser","rank":3}
{"index":{}}
{"content":"Demontering af hjælpemidler","rank":3}
{"index":{}}
{"content":"Wc bræt mangler","rank":3}
{"index":{}}
{"content":"Bruseslange og håndbruser skiftes","rank":3}
{"index":{}}
{"content":"Inventar Ikke fjernet","rank":3}
{"index":{}}
{"content":"Ekstraordinær rengøring for nikotin","rank":3}
{"index":{}}
{"content":"Inkl. vindusspudsning","rank":3}
{"index":{}}
{"content":"inkl. Rengøring af kontakter","rank":3}
{"index":{}}
{"content":"Overmalede kontakter","rank":3}
{"index":{}}
{"content":"Lampeudtag skiftes","rank":3}
{"index":{}}
{"content":"Montering eller demontering af telefonstik","rank":3}
{"index":{}}
{"content":"Skuffe i komfur mangler","rank":3}
{"index":{}}
{"content":"Udskiftes hvis ikke kan rep. til matcende pris","rank":3}
{"index":{}}
{"content":"Bagkants springninger","rank":1}
{"index":{}}
{"content":"Com x box mangler","rank":1}
{"index":{}}
{"content":"Aldrig malede","rank":1}
{"index":{}}
{"content":"Kroge fjernes fra skabslåge","rank":1}
{"index":{}}
{"content":"Rengøring af træværk og vindue","rank":2}
{"index":{}}
{"content":"HTH Låge udskiftes","rank":1}
{"index":{}}
{"content":"Mangler på skab","rank":1}
{"index":{}}
{"content":"Ridset igennem lak","rank":1}
{"index":{}}
{"content":"Ridset gennem lak","rank":1}
{"index":{}}
{"content":"Hyldepapir fjernes fra vinduesplade","rank":1}
{"index":{}}
{"content":"Brystning","rank":3}
{"index":{}}
{"content":"Ej malet","rank":3}
{"index":{}}
{"content":"Ej malet korrekt","rank":3}
{"index":{}}
{"content":"Fast sætter","rank":3}
{"index":{}}
{"content":"Bosch kgv39vwea","rank":3}
{"index":{}}
{"content":"Ny håndbruser og slange","rank":1}
{"index":{}}
{"content":"Om","rank":2}
{"index":{}}
{"content":"Afslibes pga ridser","rank":1}
{"index":{}}
{"content":"Omkodning pga manglende nøgler","rank":1}
{"index":{}}
{"content":"Spartle og plette efter gardiner","rank":1}
{"index":{}}
{"content":"Spartle og plette efter gardiner på vinduer og døre","rank":1}
{"index":{}}
{"content":"Døre udskiftes pga skrammer","rank":1}
{"index":{}}
{"content":"Letslibning pga ridser","rank":1}
{"index":{}}
{"content":"El-gennemgang","rank":3}
{"index":{}}
{"content":"Fejl i parket","rank":1}
{"index":{}}
{"content":"Afkalk vægfliser","rank":2}
{"index":{}}
{"content":"Rengøring af ovn og komfur","rank":3}
{"index":{}}
{"content":"Pga. Misfarvning & stærk tilsmudsning","rank":2}
{"index":{}}
{"content":"Malet i anden farve end standard","rank":1}
{"index":{}}
{"content":"Gulv maskinslibes og 3 x lak på grund af dybe ridser og brud på lak","rank":1}
{"index":{}}
{"content":"Jf. HOFOR er denne mangel ikke lovlig","rank":2}
{"index":{}}
{"content":"Krakelerer","rank":2}
{"index":{}}
{"content":"Nedtagning og bortskafning af persienner","rank":1}
{"index":{}}
{"content":"Nedtagning af japanpaneler","rank":2}
{"index":{}}
{"content":"I badeværelse en væg skal males efter et hul","rank":1}
{"index":{}}
{"content":"Henning Nyhuus","rank":6}
{"index":{}}
{"content":"Kontakter rengøres","rank":3}
{"index":{}}
{"content":"Radiator vaskes","rank":3}
{"index":{}}
{"content":"Bund males","rank":3}
{"index":{}}
{"content":"Omstilles så hoveddør passer med postkasse og hængelås i kld. Der er hængelås","rank":1}
{"index":{}}
{"content":"Montering samt lakering 3-kantsliste","rank":3}
{"index":{}}
{"content":"Dør","rank":6}
{"index":{}}
{"content":"Udskiftning af defekt afbryder/stikkontakt","rank":3}
{"index":{}}
{"content":"Affald fjernes","rank":3}
{"index":{}}
{"content":"Levering af toiletsæde/bræt","rank":3}
{"index":{}}
{"content":"Klargøring til maling","rank":3}
{"index":{}}
{"content":"Spærremaling samt maling","rank":3}
{"index":{}}
{"content":"Lugtsanering","rank":3}
{"index":{}}
{"content":"Bløde ledninger fjernes","rank":3}
{"index":{}}
{"content":"Rengøring af køkkenelemter inde og ude","rank":3}
{"index":{}}
{"content":"Ny rørkasse","rank":3}
{"index":{}}
{"content":"Reparation af låger","rank":3}
{"index":{}}
{"content":"Nedtagning køkkenbelysning","rank":3}
{"index":{}}
{"content":"Fjerne emhætte","rank":3}
{"index":{}}
{"content":"Afmontering samt fjerne gaskomfur fra lejemål","rank":3}
{"index":{}}
{"content":"Reparer samt færdig mal","rank":3}
{"index":{}}
{"content":"Reparation/udskiftning af karm","rank":3}
{"index":{}}
{"content":"Levering af dørgreb sæt","rank":3}
{"index":{}}
{"content":"Fjerne gardinbeslag","rank":3}
{"index":{}}
{"content":"Rydning af loftsrum","rank":3}
{"index":{}}
{"content":"Fastgørelse af bruserstang","rank":3}
{"index":{}}
{"content":"Aftørring af alle skabe ud og indvendig","rank":1}
{"index":{}}
{"content":"Vask af alle vinduer ud og indvendig","rank":1}
{"index":{}}
{"content":"Vinduer samt altandør","rank":3}
{"index":{}}
{"content":"Ikke pudset ved indflytning","rank":1}
{"index":{}}
{"content":"Omkodning af cylindre","rank":3}
{"index":{}}
{"content":"Udskiftning af cylindre","rank":3}
{"index":{}}
{"content":"Gasledning føres til gulv","rank":1}
{"index":{}}
{"content":"Manglende dør","rank":3}
{"index":{}}
{"content":"OBS! Døre til lejemålet må IKKE smides ud","rank":3}
{"index":{}}
{"content":"Pga. Manglende pudsning","rank":1}
{"index":{}}
{"content":"Murerreparation af væg","rank":3}
{"index":{}}
{"content":"Nye hylder i magasin","rank":1}
{"index":{}}
{"content":"Dør afmonteres og sendes til sprøjtemaler for at blive repareret og malet efter skrammer.\nBehandlingen omfatter flg:\nAfvaskning - slibning - spartling - slibning - grund - mellem maling - lakering. Males i eksisterende farve og glans","rank":1}
{"index":{}}
{"content":"Teknikskab indv","rank":1}
{"index":{}}
{"content":"Samlinger repereres","rank":3}
{"index":{}}
{"content":"Fjernelse af invetar i hele boligen","rank":3}
{"index":{}}
{"content":"Fjern invetar som smides ud","rank":3}
{"index":{}}
{"content":"Radiator males på grund af mærker","rank":4}
{"index":{}}
{"content":"Radiator pletmales på grund af mærker","rank":5}
{"index":{}}
{"content":"Ekstra TV stik nedtages","rank":1}
{"index":{}}
{"content":"Slidt i gennem lakken","rank":6}
{"index":{}}
{"content":"forskelig tapet","rank":3}
{"index":{}}
{"content":"Ny postkasse lås","rank":3}
{"index":{}}
{"content":"Nedtagning af vægskab","rank":6}
{"index":{}}
{"content":"Nedtagning af nedsænket loft","rank":3}
{"index":{}}
{"content":"Nedtagning af vægbeklædning","rank":3}
{"index":{}}
{"content":"Kvadratmeter skal måles op","rank":6}
{"index":{}}
{"content":"Ny gulvbelægning","rank":6}
{"index":{}}
{"content":"Afpropning af gashane","rank":3}
{"index":{}}
{"content":"Males hele lejemål og letslib af gulv","rank":1}
{"index":{}}
{"content":"Nedtagning af kroge/fjerne klistermærker fliser","rank":3}
{"index":{}}
{"content":"Kvadratmeter skal tjekkes","rank":3}
{"index":{}}
{"content":"Ny tapet","rank":3}
{"index":{}}
{"content":"Dørtrin hoveddør","rank":3}
{"index":{}}
{"content":"Kvadratmeter måles op","rank":3}
{"index":{}}
{"content":"Fjerne nedsænket loft","rank":3}
{"index":{}}
{"content":"Pletmaling af karm  - lysning i skydedør mellem stue og værelse","rank":3}
{"index":{}}
{"content":"Ridset og hakker","rank":1}
{"index":{}}
{"content":"Nedtagning af vægarmatur","rank":3}
{"index":{}}
{"content":"Entregulv","rank":3}
{"index":{}}
{"content":"3 gange lak","rank":3}
{"index":{}}
{"content":"Stuegulv","rank":3}
{"index":{}}
{"content":"Skabe samt skuffer","rank":3}
{"index":{}}
{"content":"Gasmåler","rank":3}
{"index":{}}
{"content":"Køkkenbeslyning (under overskab","rank":3}
{"index":{}}
{"content":"Bordplade med samling","rank":3}
{"index":{}}
{"content":"Invendige dører skiftes pga. ridser","rank":1}
{"index":{}}
{"content":"Dørplade skiftes pga ridser","rank":1}
{"index":{}}
{"content":"Montering af nye fejelister","rank":3}
{"index":{}}
{"content":"Hul iunderlag","rank":1}
{"index":{}}
{"content":"Efter beslag/ophæng","rank":1}
{"index":{}}
{"content":"Fliser mangler","rank":3}
{"index":{}}
{"content":"Fjern gulvtæppe","rank":3}
{"index":{}}
{"content":"Alle lister","rank":3}
{"index":{}}
{"content":"Jf. gældende lovgivning ikke lovlig","rank":2}
{"index":{}}
{"content":"Pga. Lim rester efter tæpper","rank":1}
{"index":{}}
{"content":"Loftslamper ikke Demonteret","rank":3}
{"index":{}}
{"content":"Indbygningsovn","rank":3}
{"index":{}}
{"content":"Opvaskemaskine","rank":3}
{"index":{}}
{"content":"bordkomfur ikke demonretet","rank":3}
{"index":{}}
{"content":"Lettere rengøring af køkken","rank":3}
{"index":{}}
{"content":"Ikke afkalket korrekt","rank":14}
{"index":{}}
{"content":"Fliser gået fra ved vindue","rank":3}
{"index":{}}
{"content":"Demontering af diverse ophængt på væggene og rep af Huller heraf","rank":3}
{"index":{}}
{"content":"Lampe ikke demonteret","rank":3}
{"index":{}}
{"content":"Dør står i kælder","rank":3}
{"index":{}}
{"content":"Mangler det sidste finish på låger","rank":3}
{"index":{}}
{"content":"Radiatore rengøres","rank":3}
{"index":{}}
{"content":"Rens af emhætte","rank":3}
{"index":{}}
{"content":"Rengøring af radiatore","rank":3}
{"index":{}}
{"content":"Hoveddør pudses","rank":3}
{"index":{}}
{"content":"Afkalkning af fliser","rank":3}
{"index":{}}
{"content":"Pga. Hul i dørplade","rank":1}
{"index":{}}
{"content":"Vaske alle skab ned både ud og indvendig","rank":1}
{"index":{}}
{"content":"Terrazzogulv slibes og olieres","rank":3}
{"index":{}}
{"content":"Reparation af vindue","rank":3}
{"index":{}}
{"content":"Udskiftning rådnet træ","rank":3}
{"index":{}}
{"content":"Slib samt lak hele gulvet","rank":3}
{"index":{}}
{"content":"Væg mod nabo + væg mod entré","rank":3}
{"index":{}}
{"content":"Pga. Hul i dør","rank":1}
{"index":{}}
{"content":"Nedtagning af beslag","rank":3}
{"index":{}}
{"content":"Pga. Bortkommen nøgle","rank":1}
{"index":{}}
{"content":"Rydde skab","rank":3}
{"index":{}}
{"content":"Reparere huller i gulvbelægning","rank":3}
{"index":{}}
{"content":"Rep. + færdigstryg","rank":3}
{"index":{}}
{"content":"Havemøbler samt div. redskaber ryddes","rank":3}
{"index":{}}
{"content":"Letslib + 1. Gang lak","rank":1}
{"index":{}}
{"content":"Rydning af indbo","rank":3}
{"index":{}}
{"content":"Dørtrin mod have","rank":3}
{"index":{}}
{"content":"Udskiftning af 1 låge under vask","rank":3}
{"index":{}}
{"content":"Udskiftning af ødelagte hylder til køkkenskabe","rank":3}
{"index":{}}
{"content":"Længder SKAL måles op","rank":3}
{"index":{}}
{"content":"Udskiftning af gulvbelægning","rank":3}
{"index":{}}
{"content":"Montering af dørgreb","rank":3}
{"index":{}}
{"content":"Ventilator defekt","rank":3}
{"index":{}}
{"content":"Reetablering af dørtrin","rank":3}
{"index":{}}
{"content":"Teknikskab rengøres","rank":1}
{"index":{}}
{"content":"Ovenlys","rank":3}
{"index":{}}
{"content":"Kraftig rengøring ellers udskiftning","rank":1}
{"index":{}}
{"content":"Lejer ej mødt og ingen nøgler. Låsesmed tilkaldt til oplukning af hoveddør og postkasse","rank":2}
{"index":{}}
{"content":"Loftrosetter udskiftes til standard","rank":1}
{"index":{}}
{"content":"Åbnes og håndtag monteres","rank":2}
{"index":{}}
{"content":"Udskiftning af køkkenvask bundplade","rank":1}
{"index":{}}
{"content":"Fjernelse af alll eftkter og indbo i hele boligen","rank":3}
{"index":{}}
{"content":"2 stk skabe ikke rengjort","rank":2}
{"index":{}}
{"content":"pga. ikke vedligeholdt have","rank":1}
{"index":{}}
{"content":"Pga. skade efter påkørsel","rank":2}
{"index":{}}
{"content":"Pga. skade","rank":1}
{"index":{}}
{"content":"pga. mislighold","rank":1}
{"index":{}}
{"content":"Pga. Manglede køleskab","rank":1}
{"index":{}}
{"content":"Pga. Tape/lim rester","rank":1}
{"index":{}}
{"content":"Ekstraordinær rengøring før håndværker","rank":1}
{"index":{}}
{"content":"Radiator males da nikotinen ikke kan fjernes","rank":1}
{"index":{}}
{"content":"Vinduer afvaskes for nikotin inden maling","rank":1}
{"index":{}}
{"content":"Skabe rengøres for nikotin","rank":1}
{"index":{}}
{"content":"Gennemgang af alt el i bolig","rank":1}
{"index":{}}
{"content":"Indv døre males hvide","rank":1}
{"index":{}}
{"content":"Lejer hæfter for væggen ved trappen. Reparationen af væggen bag døren er for udlejer","rank":1}
{"index":{}}
{"content":"Fjerne blomster kasser","rank":3}
{"index":{}}
{"content":"Algerens","rank":3}
{"index":{}}
{"content":"Nedtagning af svævehylder","rank":3}
{"index":{}}
{"content":"Nedtagning ad spejlfliser","rank":3}
{"index":{}}
{"content":"Nedtagning af film på på vinduer","rank":3}
{"index":{}}
{"content":"Vægge og loft ikke malbar grundet nigotin","rank":6}
{"index":{}}
{"content":"Vægge og loft ikke malbar grundet nikotin","rank":6}
{"index":{}}
{"content":"Bordplade fugtskadet","rank":3}
{"index":{}}
{"content":"Maling springer på bagkanter","rank":1}
{"index":{}}
{"content":"Ingen lak tilbage","rank":1}
{"index":{}}
{"content":"Maling springer på kant","rank":1}
{"index":{}}
{"content":"Bolig ikke tømt ved syn","rank":3}
{"index":{}}
{"content":"Det var ikke sket ved fraflytning","rank":3}
{"index":{}}
{"content":"Gulv misvedligeholdt","rank":5}
{"index":{}}
{"content":"Manglende nøgler ved fraflytning","rank":3}
{"index":{}}
{"content":"Vindueskarm misvedligeholdt","rank":2}
{"index":{}}
{"content":"Rengøring af top overskabe","rank":3}
{"index":{}}
{"content":"Rigtig god weekend","rank":3}
{"index":{}}
{"content":"Gennemslid på lak","rank":3}
{"index":{}}
{"content":"Maling på trappetrin","rank":3}
{"index":{}}
{"content":"Skal rengøres","rank":4}
{"index":{}}
{"content":"Gulvet skal lakeres og slibes","rank":3}
{"index":{}}
{"content":"Nye gulve","rank":3}
{"index":{}}
{"content":"Gulvet er slebet og lakeret","rank":3}
{"index":{}}
{"content":"Gulvet er vasket og rengjort","rank":3}
{"index":{}}
{"content":"Pga malingrester på gulvet","rank":1}
{"index":{}}
{"content":"Fjernbetjening er væk","rank":3}
{"index":{}}
{"content":"Kontrol og udskiftning af stofledninger","rank":2}
{"index":{}}
{"content":"Efter vandskade fra overbo","rank":2}
{"index":{}}
{"content":"Incl. Lysning og vindues plade","rank":2}
{"index":{}}
{"content":"Rengøring af stikkontakt/afbryder","rank":3}
{"index":{}}
{"content":"Trykmærker","rank":1}
{"index":{}}
{"content":"Strukturmaling fjernes","rank":3}
{"index":{}}
{"content":"Spot fjernes","rank":3}
{"index":{}}
{"content":"Males 2gange","rank":3}
{"index":{}}
{"content":"Gulv ridset","rank":6}
{"index":{}}
{"content":"Rengøring og REA behandling","rank":3}
{"index":{}}
{"content":"Vinduesplade ridset","rank":3}
{"index":{}}
{"content":"Fraflytter er ikke til stede","rank":3}
{"index":{}}
{"content":"Lofter: Daim standardnote","rank":1}
{"index":{}}
{"content":"Stuk: Daim standardnote","rank":1}
{"index":{}}
{"content":"Vægge: Daim standardnote","rank":1}
{"index":{}}
{"content":"Ridse i gulv skal fyldes hvis muligt","rank":1}
{"index":{}}
{"content":"Maler","rank":4}
{"index":{}}
{"content":"Levering af toiletsæde","rank":3}
{"index":{}}
{"content":"Dør ridset pga kørestolsbrug","rank":3}
{"index":{}}
{"content":"Gulv","rank":7}
{"index":{}}
{"content":"Reparation af stikkontakt ved gulv","rank":3}
{"index":{}}
{"content":"Pga. Brandmærker","rank":1}
{"index":{}}
{"content":"Rengør radiatorgrav","rank":3}
{"index":{}}
{"content":"Lejlighed ikke rengjort ved flyttesyn","rank":3}
{"index":{}}
{"content":"Badeværelse vaskes og afkalkes","rank":3}
{"index":{}}
{"content":"Pga. Limrester efter opsætning af spejle","rank":1}
{"index":{}}
{"content":"Greb til skuffe mangler","rank":1}
{"index":{}}
{"content":"Pga. Manglende nøgle til kælder","rank":1}
{"index":{}}
{"content":"Hegn og ukrudt ikke fjernet ved fraflytning","rank":1}
{"index":{}}
{"content":"Pga. Stærk misfarvning og tilsmudsning","rank":1}
{"index":{}}
{"content":"Maling på dørtrin","rank":3}
{"index":{}}
{"content":"Hul mod badeværelse","rank":3}
{"index":{}}
{"content":"Fodpaneler mangler","rank":3}
{"index":{}}
{"content":"Nedtagning af persienner","rank":3}
{"index":{}}
{"content":"Opvaskemaskine fjernes","rank":3}
{"index":{}}
{"content":"Nye fodpanel males","rank":3}
{"index":{}}
{"content":"Tæppe fjernes","rank":3}
{"index":{}}
{"content":"Maling på stikkontakt","rank":3}
{"index":{}}
{"content":"Vindues","rank":1}
{"index":{}}
{"content":"Der er meget beskidt","rank":1}
{"index":{}}
{"content":"Påkørsel med kørestol dør/karme evt","rank":2}
{"index":{}}
{"content":"Rygerbolig","rank":2}
{"index":{}}
{"content":"Skuffer og skabe vaskes","rank":2}
{"index":{}}
{"content":"Håndvask afkalkes","rank":2}
{"index":{}}
{"content":"Termostatføler udskiftes","rank":2}
{"index":{}}
{"content":"Ovn udskiftes","rank":2}
{"index":{}}
{"content":"Bordovn udskiftes","rank":2}
{"index":{}}
{"content":"Kogeplade udskiftes","rank":2}
{"index":{}}
{"content":"Gulv slibes og 3 x lak","rank":2}
{"index":{}}
{"content":"Skydedør slibes","rank":2}
{"index":{}}
{"content":"Træværk slibes","rank":2}
{"index":{}}
{"content":"Skabsside lappes og pletmales","rank":2}
{"index":{}}
{"content":"Skabsdør lappes og pletmales","rank":2}
{"index":{}}
{"content":"Lejlighed rengøres inden håndværkere kommer","rank":2}
{"index":{}}
{"content":"Fodpaneler slibes","rank":2}
{"index":{}}
{"content":"Køkkenbordsplade udskiftes","rank":2}
{"index":{}}
{"content":"Vaskes og males","rank":2}
{"index":{}}
{"content":"Nedtagning og rep af tapet","rank":2}
{"index":{}}
{"content":"Efter gammelt ur","rank":2}
{"index":{}}
{"content":"rep af tapet efter køkkenrenovering som beboer skulle have lavet på vedligeholdelse konto","rank":2}
{"index":{}}
{"content":"Tilsmudsning/ misfarvning","rank":1}
{"index":{}}
{"content":"Mange borehuller i fliserne (Er lukket","rank":1}
{"index":{}}
{"content":"Mange borehuller i fliserne","rank":1}
{"index":{}}
{"content":"Kalkpletter på terrazzogulv","rank":1}
{"index":{}}
{"content":"Rengøringen er ikke tilstrækkelig","rank":1}
{"index":{}}
{"content":"Nøglen passer også til postkassen","rank":1}
{"index":{}}
{"content":"Gennenslidt lak ved opvaskemaskine","rank":1}
{"index":{}}
{"content":"Vandskadet gulv under vaskeskab og opvaskemaskine","rank":1}
{"index":{}}
{"content":"Demontering af køkkenskabe hvis gulv skal skiftes","rank":1}
{"index":{}}
{"content":"Slibning / spartling af overgange","rank":1}
{"index":{}}
{"content":"Hakker i paneler og karme","rank":1}
{"index":{}}
{"content":"Samt på forkant","rank":1}
{"index":{}}
{"content":"Samt rengøring af wc kumme udenpå for maling","rank":1}
{"index":{}}
{"content":"Gulvfliser renses for kalk","rank":1}
{"index":{}}
{"content":"Renses for kalk","rank":2}
{"index":{}}
{"content":"Bordplade uden samling genbrug vask samt blandingsbatteri inklusiv vvs arbejde","rank":1}
{"index":{}}
{"content":"Gardinstang nedtages","rank":2}
{"index":{}}
{"content":"Knager nedtages","rank":1}
{"index":{}}
{"content":"låst","rank":1}
{"index":{}}
{"content":"Nyt spejl","rank":1}
{"index":{}}
{"content":"Tapet i loft","rank":1}
{"index":{}}
{"content":"Fjernelse af linolium","rank":2}
{"index":{}}
{"content":"Plader på vægge","rank":1}
{"index":{}}
{"content":"Kabelbake","rank":1}
{"index":{}}
{"content":"Dørkarm ødelagt","rank":1}
{"index":{}}
{"content":"Fjern klædeskab","rank":1}
{"index":{}}
{"content":"Udskift endegavl køl frys","rank":1}
{"index":{}}
{"content":"3.Stk","rank":1}
{"index":{}}
{"content":"Ingen nøgle","rank":1}
{"index":{}}
{"content":"Pga. Misfarvning & Afsmitning","rank":1}
{"index":{}}
{"content":"Gulvet skal så vidt det er muligt","rank":126}
{"index":{}}
{"content":"Pga. Limrester","rank":1}
{"index":{}}
{"content":"Rep af skrammer","rank":1}
{"index":{}}
{"content":"Rep. Efter gardiner/percienner","rank":1}
{"index":{}}
{"content":"Malet ikke håndværksmæssigt korrekt","rank":1}
{"index":{}}
{"content":"Pletvis maling ved dør","rank":1}
{"index":{}}
{"content":"Pga. Mislighold","rank":1}
{"index":{}}
{"content":"Ledning i loft demonteres","rank":1}
{"index":{}}
{"content":"Spartle og maling af skruehuller efter gardiner hele lejemål","rank":1}
{"index":{}}
{"content":"Gulve ridset","rank":1}
{"index":{}}
{"content":"Dørplade ridset","rank":1}
{"index":{}}
{"content":"Plader bag radiator ikke standard","rank":1}
{"index":{}}
{"content":"Reparation samt færdigstryg","rank":1}
{"index":{}}
{"content":"Rep af hul efter lampe","rank":1}
{"index":{}}
{"content":"Sættes ned efter gulvbelægning","rank":1}
{"index":{}}
{"content":"Opretningen af låger","rank":1}
{"index":{}}
{"content":"Slibes pga ridser og hakker","rank":1}
{"index":{}}
{"content":"Males pga ridser/mærker/huller","rank":1}
{"index":{}}
{"content":"Manglende gulvvask","rank":1}
{"index":{}}
{"content":"Pga. Skift af måler","rank":1}
{"index":{}}
{"content":"Hylder nedtages ikke standard","rank":1}
{"index":{}}
{"content":"Afvaskning af alle skabe ud- og indvendig","rank":1}
{"index":{}}
{"content":"Slib  af gulv 3 xlak","rank":1}
{"index":{}}
{"content":"Maling og rep","rank":1}
{"index":{}}
{"content":"Huller i fuger ikke rep korrekt","rank":1}
{"index":{}}
{"content":"Ventilationsrist defekt","rank":1}
{"index":{}}
{"content":"Hakker og gennemslidt lak i stød","rank":1}
{"index":{}}
{"content":"Greb på terrassedør mangler","rank":1}
{"index":{}}
{"content":"Gulv skiftes i nødvendigt omfang hvis det ikke kan slibes og lakkeres","rank":1}
{"index":{}}
{"content":"Reetableres hvis ikke godkendt","rank":1}
{"index":{}}
{"content":"Gennemslidt forkanter på trappen","rank":1}
{"index":{}}
{"content":"Effekter i skabe Smides ud","rank":1}
{"index":{}}
{"content":"Gulvbrædder justeres","rank":1}
{"index":{}}
{"content":"Misfarvning/tilsmudsning","rank":1}
{"index":{}}
{"content":"Pga tilsmudsning/ misfarvning","rank":1}
{"index":{}}
{"content":"Dør males på grund af skrammer og ridser","rank":1}
{"index":{}}
{"content":"Soveværelse","rank":4}
{"index":{}}
{"content":"Værelse 1","rank":5}
{"index":{}}
{"content":"Entré","rank":29}
{"index":{}}
{"content":"Stue","rank":25}
{"index":{}}
{"content":"Værelse","rank":24}
{"index":{}}
{"content":"Værelse 2","rank":25}
{"index":{}}
{"content":"Værelse 3","rank":25}
{"index":{}}
{"content":"Kammer 1","rank":25}
{"index":{}}
{"content":"Kammer 2","rank":25}
{"index":{}}
{"content":"Alrum","rank":25}
{"index":{}}
{"content":"Gang","rank":25}
{"index":{}}
{"content":"Badeværelse","rank":25}
{"index":{}}
{"content":"Afrens af tapet","rank":1}
{"index":{}}
{"content":"Hakker i dør","rank":1}
{"index":{}}
{"content":"Ridser og slidt","rank":2}
{"index":{}}
{"content":"Mange hakker","rank":1}
{"index":{}}
{"content":"Fjerne skridsikring på gulv ved seng","rank":1}
\n