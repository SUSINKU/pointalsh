const SUPA_URL='https://mqprjpqumofnddvbifwj.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcHJqcHF1bW9mbmRkdmJpZndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzc2MzMsImV4cCI6MjA5Mjk1MzYzM30.5Zy8esQVIyQOUBrkqe57XzsNk_T7eRMX1GaQlBzb-0w';
const supa={
  async req(path,opts={}){
    try{
      const r=await fetch(SUPA_URL+'/rest/v1/'+path,{
        headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Content-Type':'application/json','Prefer':opts.prefer||''},
        method:opts.method||'GET',body:opts.body?JSON.stringify(opts.body):undefined
      });
      if(!r.ok)return null;
      const t=await r.text();return t?JSON.parse(t):null;
    }catch(e){return null;}
  },
  async get(t,p=''){return this.req(t+(p?'?'+p:''));},
  async upsert(t,d){return this.req(t,{method:'POST',prefer:'resolution=merge-duplicates,return=minimal',body:d});},
};

const CLASS_ORDER=['PS','MS/GS','CP','CE1/CE2','CE2/CM1','CM1/CM2'];
const CLASS_COLOR={'PS':'#7c3aed','MS/GS':'#1d4ed8','CP':'#059669','CE1/CE2':'#b45309','CE2/CM1':'#c2410c','CM1/CM2':'#6b21a8'};

let PERI=[
  {nom:"BERNARDON Lily-Rose",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:false,r:false,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CARLIER Lilou",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DECELLE Albane",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DELIMANGE Anaé",cl:"PS","27/04":{m:true,mi:true,r:'abs',s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"FRANZETTI Maé",cl:"PS","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:false,mi:false,r:false,s:false},"30/04":{m:true,mi:true,r:true,s:true}},
  {nom:"GUYOT Romane",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"HURTAUX Maël",cl:"PS","27/04":{m:false,mi:true,r:'abs',s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"MALVOISIN Léon",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:'abs',s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"MARANGÉ Olivia",cl:"PS","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"MARCHAL Julia Louis",cl:"PS","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"MISMAC Aimée",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"NEVES Jules",cl:"PS","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"PATRIGEON Léandre",cl:"PS","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:true,mi:true,r:true,s:false}},
  {nom:"SEQUEVAL Lucie",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"VILLEMINOT Léonie",cl:"PS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"ALCEGAIRE Beloan",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"ATANSO Emmanuel",cl:"MS/GS","27/04":{m:true,mi:true,r:true,s:true},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BALLETTI Estelle",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BARTHELEMY Timoté",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BERRARD ROUSSEL Raphaël",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BOURIANES MISTRI Axel",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BRISSON Léa",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CHASSAGNEUX Rose",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CHITA Noah",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:'abs'},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CLET Enaël",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"COSTAUX BRUGNON Hugo",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"DEJARDIN Emma",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"FREGNAUX Nina",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"FUCHS Mathis",cl:"MS/GS","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"GEORGIN Callie",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"LARDENOIS Apolline",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"LERAILLEY LEGRAND Morgane",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:false,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"MIANDY Kayden",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:'abs'},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"MOAL Alix",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"RASSELET Jeanne",cl:"MS/GS","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BERTILI-LAUTREFIN Kaïly",cl:"CP","27/04":{m:false,mi:true,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BURLAT Mylan",cl:"CP","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:true,mi:true,r:true,s:false}},
  {nom:"CARLIER Alice",cl:"CP","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"KOENIG Paul",cl:"CP","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"LAGUERRE Eliott",cl:"CP","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"LALLEMENT Enoha",cl:"CP","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:false,r:false,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"MARANGÉ Nina",cl:"CP","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"NEVES Elina",cl:"CP","27/04":{m:true,mi:true,r:true,s:true},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"PANOT Livia",cl:"CP","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"PATRIGEON Augustin",cl:"CP","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:true,mi:true,r:true,s:false}},
  {nom:"PICCOLI Ylan",cl:"CP","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"SEQUEVAL Emma",cl:"CP","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"STIOT Léo",cl:"CP","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"TONDA NGWENDJA Ilyana",cl:"CP","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"VACHER Priam",cl:"CP","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"VIGNIER Myloane",cl:"CP","27/04":{m:'abs',mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BALLETTI Océa",cl:"CE1/CE2","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:true,mi:true,r:true,s:false}},
  {nom:"BARTHELEMY Gauthier",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BONHOMME Martin",cl:"CE1/CE2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BOURIANES MISTRI Noémie",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BOURNAISON Louis",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BRISSON Élise",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"CHITA Naël",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:'abs'},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"CLET Anaë",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"EXCOFFIER Hélios",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"FRANZETTI Théo",cl:"CE1/CE2","27/04":{m:true,mi:true,r:true,s:true},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:true,mi:true,r:true,s:true}},
  {nom:"GEORGIN Nolan",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"GUENE Jules",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"GUYOT Sacha",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"HALLE Gabriel",cl:"CE1/CE2","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"LAURENT Chloé",cl:"CE1/CE2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"BRONNE Lucas",cl:"CE2/CM1","27/04":{m:true,mi:true,r:true,s:false},"28/04":{m:true,mi:true,r:true,s:false},"30/04":{m:true,mi:true,r:true,s:true}},
  {nom:"CHASSAGNEUX Eden",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CLANET Lucy",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"GUILLAUMOT Lucy",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"GÉRARD Gabriel",cl:"CE2/CM1","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"LAOUAR Inaya",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"LAURENT BREART Léo",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"MOAL Clara",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"NGWETE Thomas",cl:"CE2/CM1","27/04":{m:true,mi:true,r:true,s:true},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:true,mi:true,r:true,s:true}},
  {nom:"OGNIEL Walène",cl:"CE2/CM1","27/04":{m:true,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"PANOT Paul",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"PASTORE Lyam",cl:"CE2/CM1","27/04":{m:true,mi:true,r:true,s:'abs'},"28/04":{m:true,mi:true,r:true,s:true},"30/04":{m:true,mi:true,r:true,s:true}},
  {nom:"PETIT Owen",cl:"CE2/CM1","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"PICCOLI Ryan",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"RIGOLLET Alix",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"ROUSSEL Eva",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"VILLEMINOT Jules",cl:"CE2/CM1","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BERNARDON Maëly",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:false,r:false,s:false},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"BOURNAISON Augustin",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"CHEVALIER Aurélien",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:false,r:false,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DECELLE Louison",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"DELAND-HUY Mylla",cl:"CM1/CM2","27/04":{m:true,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"DENOIT Juliette",cl:"CM1/CM2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DENOIT Justine",cl:"CM1/CM2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DESSOY Axelle",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DESSOY Hannah",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"DESTRUMELLE Louna",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"FUCHS Hugo",cl:"CM1/CM2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
  {nom:"JONCOUR Chloé",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"LAGUERRE Pauline",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:true},"28/04":{m:false,mi:true,r:true,s:true},"30/04":{m:false,mi:true,r:true,s:true}},
  {nom:"PIERRONT Nina",cl:"CM1/CM2","27/04":{m:false,mi:true,r:true,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:true,r:true,s:false}},
  {nom:"SIMON Maël",cl:"CM1/CM2","27/04":{m:false,mi:false,r:false,s:false},"28/04":{m:false,mi:true,r:true,s:false},"30/04":{m:false,mi:false,r:false,s:false}},
];
let MER_PLUS6=[
  {nom:"BARTHELEMY Corentin","25/03":{matin:"",journee:"8h23",restau:"17h40",apmidi:""}},
  {nom:"BERTILI-LAUTREFIN Kaïly","25/03":{matin:"",journee:"",restau:"13h30",apmidi:"18h30"}},
  {nom:"BONHOMME Martin","25/03":{matin:"",journee:"8h25",restau:"16h47",apmidi:""}},
  {nom:"BOURNAISON Augustin","25/03":{matin:"",journee:"7h50",restau:"17h12",apmidi:""}},
  {nom:"BOURNAISON Louis","25/03":{matin:"",journee:"8h40",restau:"17h22",apmidi:""}},
  {nom:"BURLAT Mylan","25/03":{matin:"",journee:"8h35",restau:"17h36",apmidi:""}},
  {nom:"CARLIER Alice","25/03":{matin:"",journee:"8h35",restau:"17h36",apmidi:""}},
  {nom:"GODFROY Hugo","25/03":{matin:"",journee:"8h00",restau:"18h35",apmidi:""}},
  {nom:"GODFROY Margaux","25/03":{matin:"",journee:"8h00",restau:"18h35",apmidi:""}},
  {nom:"GROSSELIN Gabin","25/03":{matin:"7h50",journee:"",restau:"13h30",apmidi:""}},
  {nom:"GUILLAUMOT Lucy","25/03":{matin:"",journee:"7h30",restau:"17h00",apmidi:""}},
  {nom:"GÉRARD Gabriel","25/03":{matin:"",journee:"8h50",restau:"17h65",apmidi:""}},
  {nom:"HALLE Gabriel","25/03":{matin:"8h05",journee:"",restau:"17h40",apmidi:""}},
  {nom:"NEVES Elina","25/03":{matin:"",journee:"7h35",restau:"17h40",apmidi:""}},
  {nom:"PASTORE Lyam","25/03":{matin:"",journee:"8h45",restau:"18h09",apmidi:""}},
  {nom:"SEQUEVAL Emma","25/03":{matin:"",journee:"8h20",restau:"15h02",apmidi:""}},
  {nom:"TONDA NGWENDJA Ilyana","25/03":{matin:"",journee:"8h00",restau:"16h50",apmidi:""}},
  {nom:"VACHER Priam","25/03":{matin:"",journee:"8h00",restau:"17h52",apmidi:""}},
];
let MER_MOINS6=[
  {nom:"BELLANCE Océane","25/03":{matin:"",journee:"7h35",restau:"16h40",apmidi:""}},
  {nom:"CARLIER Lilou","25/03":{matin:"",journee:"7h10",restau:"16h40",apmidi:""}},
  {nom:"GODFROY Axel","25/03":{matin:"",journee:"7h10",restau:"16h40",apmidi:""}},
  {nom:"MISMAC Aimée","25/03":{matin:"",journee:"7h40",restau:"16h40",apmidi:""}},
  {nom:"MAISTRE Zoé","25/03":{matin:"",journee:"7h10",restau:"16h40",apmidi:""}},
  {nom:"MARCHAL Julia Louis","25/03":{matin:"",journee:"7h40",restau:"16h40",apmidi:""}},
  {nom:"NEVES Jules","25/03":{matin:"",journee:"7h10",restau:"16h40",apmidi:""}},
  {nom:"SEQUEVAL Lucie","25/03":{matin:"",journee:"7h10",restau:"16h40",apmidi:""}},
  {nom:"VACHER Héloïse","25/03":{matin:"",journee:"8h00",restau:"17h52",apmidi:""}},
];
let VAC_PLUS6=[
  {nom:"BARTHELEMY Gauthier","20/04":{matin:"",journee:"9h14",restau:"17h15",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"9h15",apmidi:""},"22/04":{matin:"8h30",journee:"",restau:"9h14",apmidi:"8h"},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"BOUSSANGE Hanaë","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"ABS",restau:"",apmidi:""}},
  {nom:"BURLAT Mylan","20/04":{matin:"",journee:"7h40",restau:"17h00",apmidi:""},"21/04":{matin:"",journee:"7h36",restau:"17h10",apmidi:""},"22/04":{matin:"",journee:"7h36",restau:"17h10",apmidi:""},"23/04":{matin:"",journee:"7h31",restau:"15h42",apmidi:""},"24/04":{matin:"",journee:"7h40",restau:"17h48",apmidi:""}},
  {nom:"CARLIER Alice","20/04":{matin:"",journee:"8h05",restau:"",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"15h20",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"8h11",restau:"",apmidi:""}},
  {nom:"CLET Anaë","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"8h20",apmidi:"18h22"},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"8h90",restau:"8h03",apmidi:""}},
  {nom:"FRANZETTI Théo","20/04":{matin:"",journee:"8h12",restau:"17h15",apmidi:""},"21/04":{matin:"",journee:"9h30",restau:"12h24",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"9h35",restau:"13h",apmidi:""},"24/04":{matin:"",journee:"9h45",restau:"17h00",apmidi:""}},
  {nom:"GEORGIN Nolan","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"GÉRARD Gabriel","20/04":{matin:"",journee:"8h15",restau:"18h16",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"8h17",journee:"",restau:"ABS",apmidi:""},"23/04":{matin:"",journee:"9h10",restau:"9h13",apmidi:""},"24/04":{matin:"",journee:"ABS",restau:"",apmidi:""}},
  {nom:"HALLE Gabriel","20/04":{matin:"",journee:"8h45",restau:"17h40",apmidi:""},"21/04":{matin:"",journee:"8h15",restau:"17h09",apmidi:""},"22/04":{matin:"8h15",journee:"",restau:"8h09",apmidi:""},"23/04":{matin:"",journee:"8h15",restau:"15h30",apmidi:""},"24/04":{matin:"",journee:"8h60",restau:"17h05",apmidi:""}},
  {nom:"KOENIG Paul","20/04":{matin:"",journee:"8h14",restau:"18h20",apmidi:""},"21/04":{matin:"",journee:"8h15",restau:"17h50",apmidi:""},"22/04":{matin:"",journee:"ABS",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h20",restau:"18h13",apmidi:""},"24/04":{matin:"",journee:"8h20",restau:"17h06",apmidi:""}},
  {nom:"LAOUAR Inaya","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"13h06",apmidi:""}},
  {nom:"LAURENT BREART Léo","20/04":{matin:"",journee:"13h55",restau:"17h45",apmidi:""},"21/04":{matin:"",journee:"8h10",restau:"8h01",apmidi:""},"22/04":{matin:"",journee:"13h55",restau:"17h02",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"9h35",restau:"18h00",apmidi:""}},
  {nom:"PASTORE Lyam","20/04":{matin:"8h11",journee:"",restau:"18h00",apmidi:""},"21/04":{matin:"",journee:"8h50",restau:"17h00",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"18h15",journee:"",restau:"18h13",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"PICCOLI Ryan","20/04":{matin:"",journee:"8h00",restau:"16h55",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"16h55",apmidi:""},"22/04":{matin:"",journee:"ABS",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h00",restau:"11h76",apmidi:""},"24/04":{matin:"",journee:"8h00",restau:"6h08",apmidi:""}},
  {nom:"PICCOLI Ylan","20/04":{matin:"8h05",journee:"",restau:"16h30",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"16h55",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h44",restau:"18h12",apmidi:""},"24/04":{matin:"",journee:"8h00",restau:"16h15",apmidi:""}},
  {nom:"ROGER Mathilde","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"8h40",restau:"17h25",apmidi:""},"23/04":{matin:"",journee:"8h40",restau:"13h13",apmidi:""},"24/04":{matin:"8h48",journee:"",restau:"17h11",apmidi:""}},
  {nom:"ROUSSEL Eva","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"STIOT Léo","20/04":{matin:"",journee:"8h30",restau:"17h14",apmidi:""},"21/04":{matin:"",journee:"8h44",restau:"16h50",apmidi:""},"22/04":{matin:"",journee:"8h00",restau:"17h20",apmidi:""},"23/04":{matin:"",journee:"8h46",restau:"15h13",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"TONDA NGWENDJA Ilyana","20/04":{matin:"",journee:"9h30",restau:"17h",apmidi:""},"21/04":{matin:"",journee:"10h30",restau:"ABS",apmidi:"17h05"},"22/04":{matin:"",journee:"8h40",restau:"16h43",apmidi:""},"23/04":{matin:"",journee:"13h",restau:"16h55",apmidi:""},"24/04":{matin:"",journee:"ABS",restau:"",apmidi:""}},
  {nom:"VACHER Priam","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h00",restau:"18h05",apmidi:""},"24/04":{matin:"",journee:"9h44",restau:"17h38",apmidi:""}},
];
let VAC_MOINS6=[
  {nom:"BARTHELEMY Timoté","20/04":{matin:"",journee:"8h14",restau:"17h15",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"9h15",apmidi:""},"22/04":{matin:"",journee:"8h09",restau:"17h18",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"BELLANCE Djavann","20/04":{matin:"",journee:"8h26",restau:"17h14",apmidi:""},"21/04":{matin:"",journee:"7h20",restau:"16h55",apmidi:""},"22/04":{matin:"",journee:"7h25",restau:"16h00",apmidi:""},"23/04":{matin:"",journee:"9h30",restau:"17h15",apmidi:""},"24/04":{matin:"",journee:"9h30",restau:"7h13",apmidi:""}},
  {nom:"BERRARD ROUSSEL Raphaël","20/04":{matin:"8h30",journee:"",restau:"9h20",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"8h00",journee:"",restau:"8h20",apmidi:""}},
  {nom:"BOURLET Loïc","20/04":{matin:"",journee:"7h48",restau:"17h30",apmidi:""},"21/04":{matin:"",journee:"8h00",restau:"17h00",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h10",restau:"18h15",apmidi:""},"24/04":{matin:"",journee:"8h15",restau:"8h11",apmidi:""}},
  {nom:"BOUSSANGE Hanaë","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"ABS",restau:"8h15",apmidi:"8h11"}},
  {nom:"CARLIER Lilou","20/04":{matin:"",journee:"8h05",restau:"17h20",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"8h01",restau:"17h20",apmidi:""},"24/04":{matin:"",journee:"8h15",restau:"1h39",apmidi:"8h03"}},
  {nom:"CLET Enaël","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"7h20",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"COSTAUX BRUGNON Hugo","20/04":{matin:"8h30",journee:"",restau:"14h",apmidi:""},"21/04":{matin:"",journee:"ABS",restau:"ABS",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"11h40",restau:"16h59",apmidi:""}},
  {nom:"DELIMANGE Anaé","20/04":{matin:"",journee:"8h12",restau:"13h20",apmidi:"9h10"},"21/04":{matin:"",journee:"8h10",restau:"9h32",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"ABS",apmidi:""},"24/04":{matin:"",journee:"8h11",restau:"",apmidi:""}},
  {nom:"FRANZETTI Maé","20/04":{matin:"",journee:"7h02",restau:"9h15",apmidi:""},"21/04":{matin:"",journee:"",restau:"9h26",apmidi:""},"22/04":{matin:"",journee:"9h38",restau:"17h38",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"9h45",restau:"18h44",apmidi:""}},
  {nom:"GEORGIN Callie","20/04":{matin:"8h14",journee:"",restau:"18h13",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"",restau:"",apmidi:""}},
  {nom:"HEYNDERICK Charly","20/04":{matin:"",journee:"ABS",restau:"ABS",apmidi:""},"21/04":{matin:"",journee:"ABS",restau:"ABS",apmidi:""},"22/04":{matin:"",journee:"ABS",restau:"",apmidi:""},"23/04":{matin:"",journee:"ABS",restau:"",apmidi:""},"24/04":{matin:"",journee:"ABS",restau:"",apmidi:""}},
  {nom:"HURTAUX Maël","20/04":{matin:"8h33",journee:"",restau:"17h00",apmidi:""},"21/04":{matin:"8h40",journee:"",restau:"17h27",apmidi:""},"22/04":{matin:"",journee:"9h39",restau:"17h38",apmidi:""},"23/04":{matin:"",journee:"9h38",restau:"",apmidi:""},"24/04":{matin:"",journee:"9h37",restau:"7h10",apmidi:""}},
  {nom:"MARCHAL Julia Louis","20/04":{matin:"",journee:"7h38",restau:"9h30",apmidi:""},"21/04":{matin:"",journee:"8h40",restau:"7h27",apmidi:""},"22/04":{matin:"",journee:"9h39",restau:"",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"9h37",restau:"7h10",apmidi:""}},
  {nom:"VACHER Hélios","20/04":{matin:"",journee:"",restau:"",apmidi:""},"21/04":{matin:"",journee:"",restau:"",apmidi:""},"22/04":{matin:"",journee:"8h00",restau:"8h00",apmidi:""},"23/04":{matin:"",journee:"",restau:"",apmidi:""},"24/04":{matin:"",journee:"9h45",restau:"17h35",apmidi:""}},
];

let periDate='27/04', periClass='Toutes', periDates=['27/04','28/04','30/04'];
let merDate='25/03', merGrp='moins6', merDates=['25/03'];
let recapMerGrp='moins6';
let vacDate='20/04', vacGrp='moins6', vacDates=['20/04','21/04','22/04','23/04','24/04'];
let recapVacGrp='moins6';
let calYear=2026;

function getPeriVal(e,date,champ){return e[date]?e[date][champ]:false;}
function getMerData(e,date){return e[date]||{matin:'',journee:'',restau:'',apmidi:''};}
function getVacData(e,date){return e[date]||{matin:'',journee:'',restau:'',apmidi:''};}

function labelPeriDate(d){
  var m={'27/04':'Lun 27/04','28/04':'Mar 28/04','30/04':'Jeu 30/04'};
  return m[d]||d;
}
function labelMerDate(d){return 'Mer '+d;}
function labelVacDate(d){
  var m={'20/04':'Lun','21/04':'Mar','22/04':'Mer','23/04':'Jeu','24/04':'Ven'};
  return (m[d]||'')+' '+d;
}

function sortedPeri(){
  return [...PERI].sort(function(a,b){
    var ia=CLASS_ORDER.indexOf(a.cl),ib=CLASS_ORDER.indexOf(b.cl);
    return ia!==ib?ia-ib:a.nom.localeCompare(b.nom);
  });
}
function currentMerData(){return merGrp==='plus6'?MER_PLUS6:MER_MOINS6;}
function currentVacData(){return vacGrp==='plus6'?VAC_PLUS6:VAC_MOINS6;}

function renderPeriDateTabs(){
  var html='';
  periDates.forEach(function(d){
    var cls=d===periDate?'dt act':'dt';
    html+='<button class="'+cls+'" data-d="'+d+'" onclick="selectPeriDate(this.dataset.d,this)">'+labelPeriDate(d)+'</button>';
  });
  document.getElementById('peri-date-tabs').innerHTML=html;
}

function renderMerDateTabs(){
  var html='';
  merDates.forEach(function(d){
    var cls=d===merDate?'dt mer act':'dt mer';
    html+='<button class="'+cls+'" data-d="'+d+'" onclick="selectMerDate(this.dataset.d,this)">'+labelMerDate(d)+'</button>';
  });
  document.getElementById('mer-date-tabs').innerHTML=html;
}

function renderVacDateTabs(){
  var html='';
  vacDates.forEach(function(d){
    var isAct=d===vacDate;
    var cls=isAct?'dt mer act':'dt mer';
    var col=isAct?'white':'var(--vac)';
    var bg=isAct?'var(--vac)':'var(--surface)';
    html+='<button class="'+cls+'" data-d="'+d+'" onclick="selectVacDate(this.dataset.d,this)" style="border-color:var(--vac);color:'+col+';background:'+bg+'">'+labelVacDate(d)+'</button>';
  });
  document.getElementById('vac-date-tabs').innerHTML=html;
}

function renderPeriTable(filter){
  filter=filter||'';
  var rows=sortedPeri().filter(function(e){
    return (periClass==='Toutes'||e.cl===periClass)&&(!filter||e.nom.toLowerCase().includes(filter.toLowerCase()));
  });
  var d=periDate;
  var html='',lastCl=null;
  rows.forEach(function(e){
    if(periClass==='Toutes'&&e.cl!==lastCl){
      var col=CLASS_COLOR[e.cl]||'#888';
      html+='<tr class="cl-sep"><td colspan="7" style="background:'+col+'14;border-left:3px solid '+col+';color:'+col+';">'+e.cl+'</td></tr>';
      lastCl=e.cl;
    }
    var safe=e.nom.replace(/'/g,"\'");
    function mk(champ,cls){
      var v=getPeriVal(e,d,champ);
      if(v==='abs')return '<td class="cc"><span class="abs-b">ABS</span></td>';
      var label=v===true?'✓':'';
      var triCls=v===true?'tri pres '+cls:'tri';
      return '<td class="cc"><button class="'+triCls+'" data-nom="'+e.nom+'" data-date="'+d+'" data-champ="'+champ+'" onclick="cyclePeri(this.dataset.nom,this.dataset.date,this.dataset.champ,this)">'+label+'</button></td>';
    }
    html+='<tr data-nom="'+e.nom.toLowerCase()+'">';
    html+='<td class="nc">'+e.nom+'</td>';
    html+='<td><span class="pill">'+e.cl+'</span></td>';
    html+=mk('m','m')+mk('mi','mi')+mk('r','r')+mk('s','s');
    html+='<td><button class="btn btn-g btn-sm" data-type="peri" data-nom="'+e.nom+'" onclick="openModalEdit(this.dataset.type,this.dataset.nom)">Modifier</button></td>';
    html+='</tr>';
  });
  document.getElementById('peri-tbody').innerHTML=html;
  document.getElementById('peri-table-title').textContent=(periClass==='Toutes'?'Toutes les classes':periClass)+' — '+labelPeriDate(periDate);
  document.getElementById('peri-table-sub').textContent=rows.length+' enfant'+(rows.length>1?'s':'');
  document.getElementById('tc-all').textContent=PERI.length;
  renderPeriTfoot(rows,d);
  renderPeriStats();
}

function renderPeriStats(){
  var rows=sortedPeri().filter(function(e){return periClass==='Toutes'||e.cl===periClass;});
  var d=periDate;
  function cnt(c){return rows.filter(function(e){return getPeriVal(e,d,c)===true;}).length;}
  document.getElementById('peri-stats').innerHTML=
    '<div class="sc"><div class="sd" style="background:var(--matin)"></div><span class="sv cm">'+cnt('m')+'</span><span class="sl">matin</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--midi)"></div><span class="sv cmi">'+cnt('mi')+'</span><span class="sl">midi</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--restau)"></div><span class="sv cr">'+cnt('r')+'</span><span class="sl">restau.</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--soir)"></div><span class="sv cs">'+cnt('s')+'</span><span class="sl">soir</span></div>';
}

function renderPeriTfoot(rows,d){
  var tf=document.getElementById('peri-tfoot');
  if(!tf)return;
  function cnt(c){return rows.filter(function(e){return getPeriVal(e,d,c)===true;}).length;}
  tf.innerHTML='<tr style="background:var(--surface2);font-weight:600;font-size:13px"><td colspan="2" style="padding:9px 12px">Total — '+rows.length+' enfant'+(rows.length>1?'s':'')+'</td><td class="cc cm">'+cnt('m')+'</td><td class="cc cmi">'+cnt('mi')+'</td><td class="cc cr">'+cnt('r')+'</td><td class="cc cs">'+cnt('s')+'</td><td></td></tr>';
}

function renderMerTable(filter){
  filter=filter||'';
  var data=currentMerData();
  var rows=[...data].sort(function(a,b){return a.nom.localeCompare(b.nom);}).filter(function(e){return !filter||e.nom.toLowerCase().includes(filter.toLowerCase());});
  var d=merDate;
  function mkH(val,champ,nom){
    var v=val||'';
    var safe=nom.replace(/'/g,"\'");
    return '<td class="cc"><input class="h-inp'+(v?' v':'')+'" value="'+v+'" placeholder="—" data-nom="'+nom+'" data-date="'+d+'" data-champ="'+champ+'" onchange="updateMerField(this.dataset.nom,this.dataset.date,this.dataset.champ,this.value)" onblur="autoSync()"></td>';
  }
  var html='';
  rows.forEach(function(e){
    var dd=getMerData(e,d);
    var safe=e.nom.replace(/'/g,"\'");
    html+='<tr data-nom="'+e.nom.toLowerCase()+'">';
    html+='<td class="nc">'+e.nom+'</td>';
    html+=mkH(dd.matin,'matin',e.nom)+mkH(dd.journee,'journee',e.nom)+mkH(dd.restau,'restau',e.nom)+mkH(dd.apmidi,'apmidi',e.nom);
    html+='<td><button class="btn btn-g btn-sm" data-type="mer" data-nom="'+e.nom+'" onclick="openModalEdit(this.dataset.type,this.dataset.nom)">Modifier</button></td>';
    html+='</tr>';
  });
  document.getElementById('mer-tbody').innerHTML=html;
  var grpLabel=merGrp==='plus6'?'+6 ans':'-6 ans';
  document.getElementById('mer-table-title').textContent='Mercredi ALSH — '+grpLabel+' — '+labelMerDate(merDate);
  document.getElementById('mer-table-sub').textContent=rows.length+' enfant'+(rows.length>1?'s':'');
  renderHoraireTfoot('mer-tfoot',rows,d,getMerData);
  var tot={matin:0,journee:0,restau:0,apmidi:0};
  rows.forEach(function(e){var dd=getMerData(e,d);if(dd.matin&&dd.matin!=='ABS')tot.matin++;if(dd.journee&&dd.journee!=='ABS')tot.journee++;if(dd.restau&&dd.restau!=='ABS')tot.restau++;if(dd.apmidi&&dd.apmidi!=='ABS')tot.apmidi++;});
  document.getElementById('mer-stats').innerHTML=
    '<div class="sc"><div class="sd" style="background:var(--matin)"></div><span class="sv cm">'+tot.matin+'</span><span class="sl">ALSH matin</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--mer)"></div><span class="sv cmer">'+tot.journee+'</span><span class="sl">journée</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--restau)"></div><span class="sv cr">'+tot.restau+'</span><span class="sl">restau.</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--soir)"></div><span class="sv cs">'+tot.apmidi+'</span><span class="sl">après-midi</span></div>';
}

function renderVacTable(filter){
  filter=filter||'';
  var data=currentVacData();
  var rows=[...data].sort(function(a,b){return a.nom.localeCompare(b.nom);}).filter(function(e){return !filter||e.nom.toLowerCase().includes(filter.toLowerCase());});
  var d=vacDate;
  function mkH(val,champ,nom){
    var v=val||'';
    var safe=nom.replace(/'/g,"\'");
    return '<td class="cc"><input class="h-inp'+(v?' v':'')+'" value="'+v+'" placeholder="—" data-nom="'+nom+'" data-date="'+d+'" data-champ="'+champ+'" onchange="updateVacField(this.dataset.nom,this.dataset.date,this.dataset.champ,this.value)" onblur="autoSync()"></td>';
  }
  var html='';
  rows.forEach(function(e){
    var dd=getVacData(e,d);
    var safe=e.nom.replace(/'/g,"\'");
    html+='<tr data-nom="'+e.nom.toLowerCase()+'">';
    html+='<td class="nc">'+e.nom+'</td>';
    html+=mkH(dd.matin,'matin',e.nom)+mkH(dd.journee,'journee',e.nom)+mkH(dd.restau,'restau',e.nom)+mkH(dd.apmidi,'apmidi',e.nom);
    html+='<td><button class="btn btn-g btn-sm" data-type="vac" data-nom="'+e.nom+'" onclick="openModalEdit(this.dataset.type,this.dataset.nom)">Modifier</button></td>';
    html+='</tr>';
  });
  document.getElementById('vac-tbody').innerHTML=html;
  var grpLabel=vacGrp==='plus6'?'+6 ans':'-6 ans';
  document.getElementById('vac-table-title').textContent='Vacances ALSH — '+grpLabel+' — '+labelVacDate(vacDate);
  document.getElementById('vac-table-sub').textContent=rows.length+' enfant'+(rows.length>1?'s':'');
  renderHoraireTfoot('vac-tfoot',rows,d,getVacData);
  var tot={matin:0,journee:0,restau:0,apmidi:0};
  rows.forEach(function(e){var dd=getVacData(e,d);if(dd.matin&&dd.matin!=='ABS')tot.matin++;if(dd.journee&&dd.journee!=='ABS')tot.journee++;if(dd.restau&&dd.restau!=='ABS')tot.restau++;if(dd.apmidi&&dd.apmidi!=='ABS')tot.apmidi++;});
  document.getElementById('vac-stats').innerHTML=
    '<div class="sc"><div class="sd" style="background:var(--matin)"></div><span class="sv cm">'+tot.matin+'</span><span class="sl">ALSH matin</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--mer)"></div><span class="sv cmer">'+tot.journee+'</span><span class="sl">journée</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--restau)"></div><span class="sv cr">'+tot.restau+'</span><span class="sl">restau.</span></div>'+
    '<div class="sc"><div class="sd" style="background:var(--soir)"></div><span class="sv cs">'+tot.apmidi+'</span><span class="sl">après-midi</span></div>';
}

function renderHoraireTfoot(id,rows,d,getData){
  var tf=document.getElementById(id);if(!tf)return;
  var m=0,j=0,r=0,a=0;
  rows.forEach(function(e){var dd=getData(e,d);if(dd.matin&&dd.matin!=='ABS')m++;if(dd.journee&&dd.journee!=='ABS')j++;if(dd.restau&&dd.restau!=='ABS')r++;if(dd.apmidi&&dd.apmidi!=='ABS')a++;});
  tf.innerHTML='<tr style="background:var(--surface2);font-weight:600;font-size:13px"><td style="padding:9px 12px">Total — '+rows.length+' enfant'+(rows.length>1?'s':'')+'</td><td class="cc cm">'+m+'</td><td class="cc cmer">'+j+'</td><td class="cc cr">'+r+'</td><td class="cc cs">'+a+'</td><td></td></tr>';
}

function renderRecapPeri(){
  var p=periDates;
  document.getElementById('recap-peri-period').textContent='Semaine du '+p[0]+' au '+p[p.length-1];
  var thead=document.querySelector('#recap-peri-table thead tr');
  var thHtml='<th>Classe</th><th>Élèves</th>';
  p.forEach(function(d){thHtml+='<th class="cm">'+labelPeriDate(d)+' M</th><th class="cmi">Mi</th><th class="cr">R</th><th class="cs">S</th>';});
  thead.innerHTML=thHtml;
  var totals=p.map(function(){return {m:0,mi:0,r:0,s:0};});
  var tbody='';
  CLASS_ORDER.forEach(function(cl){
    var ef=PERI.filter(function(e){return e.cl===cl;});
    var cells='';
    p.forEach(function(d,i){
      var m=ef.filter(function(e){return getPeriVal(e,d,'m')===true;}).length;
      var mi=ef.filter(function(e){return getPeriVal(e,d,'mi')===true;}).length;
      var r=ef.filter(function(e){return getPeriVal(e,d,'r')===true;}).length;
      var s=ef.filter(function(e){return getPeriVal(e,d,'s')===true;}).length;
      totals[i].m+=m;totals[i].mi+=mi;totals[i].r+=r;totals[i].s+=s;
      cells+='<td class="cm" style="font-family:monospace">'+m+'</td><td class="cmi">'+mi+'</td><td class="cr">'+r+'</td><td class="cs">'+s+'</td>';
    });
    tbody+='<tr><td style="font-weight:500">'+cl+'</td><td style="font-family:monospace;color:var(--text3)">'+ef.length+'</td>'+cells+'</tr>';
  });
  var totalRow='<tr style="background:var(--surface2);font-weight:600"><td>Total</td><td style="font-family:monospace">'+PERI.length+'</td>';
  totals.forEach(function(t){totalRow+='<td class="cm">'+t.m+'</td><td class="cmi">'+t.mi+'</td><td class="cr">'+t.r+'</td><td class="cs">'+t.s+'</td>';});
  totalRow+='</tr>';
  document.getElementById('recap-peri-tbody').innerHTML=tbody+totalRow;
}

function renderRecapMer(){
  var src=recapMerGrp==='plus6'?MER_PLUS6:MER_MOINS6;
  var sorted=[...src].sort(function(a,b){return a.nom.localeCompare(b.nom);});
  var grpLabel=recapMerGrp==='plus6'?'+6 ans':'-6 ans';
  document.getElementById('mer-recap-sub').textContent=grpLabel+' · '+sorted.length+' enfants · '+merDates.length+' mercredi(s)';
  var totM=0,totR=0,totS=0;
  merDates.forEach(function(d){src.forEach(function(e){var dd=getMerData(e,d);if(dd.matin&&dd.matin!=='ABS')totM++;if(dd.restau&&dd.restau!=='ABS')totR++;if(dd.apmidi&&dd.apmidi!=='ABS')totS++;});});
  document.getElementById('mer-caf-grid').innerHTML=
    '<div class="caf-card" style="background:var(--matl);border-color:#bfdbfe"><div class="caf-val cm">'+totM+'</div><div class="caf-lbl">ALSH matin</div></div>'+
    '<div class="caf-card" style="background:var(--resl);border-color:#bbf7d0"><div class="caf-val cr">'+totR+'</div><div class="caf-lbl">ALSH restauration</div></div>'+
    '<div class="caf-card" style="background:var(--soirl);border-color:#ddd6fe"><div class="caf-val cs">'+totS+'</div><div class="caf-lbl">ALSH après-midi</div></div>';
  var datesHtml='';
  merDates.forEach(function(d){datesHtml+='<th class="cmer">'+labelMerDate(d)+'<br><small style="font-weight:400;color:var(--text3)">M/J/R/A</small></th>';});
  document.getElementById('mer-recap-dates').innerHTML=datesHtml;
  var tbody='';
  sorted.forEach(function(e){
    var cells='';
    merDates.forEach(function(d){
      var dd=getMerData(e,d);
      var v=[dd.matin||'—',dd.journee||'—',dd.restau||'—',dd.apmidi||'—'].join('·');
      cells+='<td style="font-family:monospace;font-size:11px;color:var(--text2)">'+v+'</td>';
    });
    tbody+='<tr><td class="nc">'+e.nom+'</td>'+cells+'</tr>';
  });
  document.getElementById('mer-recap-tbody').innerHTML=tbody;
}

function renderRecapVac(){
  var src=recapVacGrp==='plus6'?VAC_PLUS6:VAC_MOINS6;
  var sorted=[...src].sort(function(a,b){return a.nom.localeCompare(b.nom);});
  var grpLabel=recapVacGrp==='plus6'?'+6 ans':'-6 ans';
  document.getElementById('vac-recap-sub').textContent=grpLabel+' · '+sorted.length+' enfants · '+vacDates.length+' jour(s)';
  var totM=0,totJ=0,totR=0,totA=0;
  vacDates.forEach(function(d){src.forEach(function(e){var dd=getVacData(e,d);if(dd.matin&&dd.matin!=='ABS')totM++;if(dd.journee&&dd.journee!=='ABS')totJ++;if(dd.restau&&dd.restau!=='ABS')totR++;if(dd.apmidi&&dd.apmidi!=='ABS')totA++;});});
  document.getElementById('vac-caf-grid').innerHTML=
    '<div class="caf-card" style="background:var(--matl);border-color:#bfdbfe"><div class="caf-val cm">'+totM+'</div><div class="caf-lbl">ALSH matin</div></div>'+
    '<div class="caf-card" style="background:var(--merl);border-color:#a5f3fc"><div class="caf-val cmer">'+totJ+'</div><div class="caf-lbl">ALSH journée</div></div>'+
    '<div class="caf-card" style="background:var(--resl);border-color:#bbf7d0"><div class="caf-val cr">'+totR+'</div><div class="caf-lbl">ALSH restauration</div></div>'+
    '<div class="caf-card" style="background:var(--soirl);border-color:#ddd6fe"><div class="caf-val cs">'+totA+'</div><div class="caf-lbl">ALSH après-midi</div></div>';
  var datesHtml='';
  vacDates.forEach(function(d){datesHtml+='<th style="color:var(--vac)">'+labelVacDate(d)+'<br><small style="font-weight:400;color:var(--text3)">M/J/R/A</small></th>';});
  document.getElementById('vac-recap-dates').innerHTML=datesHtml;
  var tbody='';
  sorted.forEach(function(e){
    var cells='';
    vacDates.forEach(function(d){
      var dd=getVacData(e,d);
      var v=[dd.matin||'—',dd.journee||'—',dd.restau||'—',dd.apmidi||'—'].join('·');
      cells+='<td style="font-family:monospace;font-size:11px;color:var(--text2)">'+v+'</td>';
    });
    tbody+='<tr><td class="nc">'+e.nom+'</td>'+cells+'</tr>';
  });
  document.getElementById('vac-recap-tbody').innerHTML=tbody;
}

var _modalCtx={type:'',nom:''};

function openModalAdd(type){
  _modalCtx={type:type,nom:''};
  document.getElementById('modal-title').textContent=type==='peri'?'Ajouter périscolaire':type==='mer'?'Ajouter mercredi':'Ajouter vacances';
  document.getElementById('modal-nom').value='';
  document.getElementById('modal-nom-orig').value='';
  document.getElementById('modal-cl-row').style.display=type==='peri'?'':'none';
  document.getElementById('modal-grp-row').style.display=type!=='peri'?'':'none';
  if(type==='mer')document.getElementById('modal-grp').value=merGrp;
  if(type==='vac')document.getElementById('modal-grp').value=vacGrp;
  document.getElementById('modal-delete-row').style.display='none';
  document.getElementById('modal-save-btn').textContent='Ajouter';
  document.getElementById('modal-bg').classList.add('open');
}

function openModalEdit(type,nom){
  _modalCtx={type:type,nom:nom};
  document.getElementById('modal-title').textContent='Modifier';
  document.getElementById('modal-nom').value=nom;
  document.getElementById('modal-nom-orig').value=nom;
  if(type==='peri'){
    var e=PERI.find(function(x){return x.nom===nom;});
    document.getElementById('modal-cl').value=e?e.cl:'PS';
    document.getElementById('modal-cl-row').style.display='';
    document.getElementById('modal-grp-row').style.display='none';
  }else{
    document.getElementById('modal-grp').value=type==='mer'?merGrp:vacGrp;
    document.getElementById('modal-cl-row').style.display='none';
    document.getElementById('modal-grp-row').style.display='';
  }
  document.getElementById('modal-delete-row').style.display='';
  document.getElementById('modal-save-btn').textContent='Enregistrer';
  document.getElementById('modal-bg').classList.add('open');
}

function closeModal(){document.getElementById('modal-bg').classList.remove('open');}

function saveModal(){
  var nom=document.getElementById('modal-nom').value.trim();
  if(!nom){showToast('Nom requis','err');return;}
  var nomOrig=document.getElementById('modal-nom-orig').value;
  var type=_modalCtx.type;
  if(type==='peri'){
    var cl=document.getElementById('modal-cl').value;
    if(nomOrig){var e=PERI.find(function(x){return x.nom===nomOrig;});if(e){e.nom=nom;e.cl=cl;}}
    else PERI.push({nom:nom,cl:cl});
    autoSync();renderPeriTable();
  }else if(type==='mer'){
    var grp=document.getElementById('modal-grp').value;
    var src=grp==='plus6'?MER_PLUS6:MER_MOINS6;
    if(nomOrig){var e=src.find(function(x){return x.nom===nomOrig;});if(e)e.nom=nom;}
    else src.push({nom:nom});
    autoSync();renderMerTable();
  }else{
    var grp=document.getElementById('modal-grp').value;
    var src=grp==='plus6'?VAC_PLUS6:VAC_MOINS6;
    if(nomOrig){var e=src.find(function(x){return x.nom===nomOrig;});if(e)e.nom=nom;}
    else src.push({nom:nom});
    autoSync();renderVacTable();
  }
  closeModal();showToast(nomOrig?'Modifié':'Ajouté');
}

function deleteEnfant(){
  if(!confirm('Supprimer cet enfant ?'))return;
  var nom=_modalCtx.nom,type=_modalCtx.type;
  if(type==='peri'){
    var i=PERI.findIndex(function(x){return x.nom===nom;});if(i>-1)PERI.splice(i,1);
    autoSync();renderPeriTable();
  }else if(type==='mer'){
    [MER_PLUS6,MER_MOINS6].forEach(function(src){var i=src.findIndex(function(x){return x.nom===nom;});if(i>-1)src.splice(i,1);});
    autoSync();renderMerTable();
  }else{
    [VAC_PLUS6,VAC_MOINS6].forEach(function(src){var i=src.findIndex(function(x){return x.nom===nom;});if(i>-1)src.splice(i,1);});
    autoSync();renderVacTable();
  }
  closeModal();showToast('Supprimé','warn');
}

function cyclePeri(nom,date,champ,btn){
  var e=PERI.find(function(x){return x.nom.toLowerCase()===nom.toLowerCase();});
  if(!e||!e[date])return;
  var cur=e[date][champ];
  var next=cur===false?true:cur===true?'abs':false;
  e[date][champ]=next;
  var cls=champ==='m'?'m':champ==='mi'?'mi':champ==='r'?'r':'s';
  btn.className='tri'+(next===true?' pres '+cls:next==='abs'?' abs':'');
  btn.textContent=next===true?'✓':next==='abs'?'ABS':'';
  renderPeriStats();
  autoSync();
}

function updateMerField(nom,date,champ,val){
  var src=currentMerData();
  var e=src.find(function(x){return x.nom.toLowerCase()===nom.toLowerCase();});
  if(e){if(!e[date])e[date]={matin:'',journee:'',restau:'',apmidi:''};e[date][champ]=val;}
  autoSync();
}

function updateVacField(nom,date,champ,val){
  var src=currentVacData();
  var e=src.find(function(x){return x.nom.toLowerCase()===nom.toLowerCase();});
  if(e){if(!e[date])e[date]={matin:'',journee:'',restau:'',apmidi:''};e[date][champ]=val;}
  autoSync();
}

function selectPeriDate(d,el){periDate=d;document.querySelectorAll('#peri-date-tabs .dt').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderPeriTable();}
function selectMerDate(d,el){merDate=d;document.querySelectorAll('#mer-date-tabs .dt').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderMerTable();}
function selectVacDate(d,el){vacDate=d;document.querySelectorAll('#vac-date-tabs .dt').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderVacTable();}
function selectClassTab(cl,el){periClass=cl;document.querySelectorAll('#class-tabs .tab').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderPeriTable();}
function selectGrp(g,el){merGrp=g;document.querySelectorAll('#view-mercredi .grp-tab').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderMerTable();}
function selectVacGrp(g,el){vacGrp=g;document.querySelectorAll('#view-vacances .grp-tab').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderVacTable();}
function selectRecapGrp(g,el){recapMerGrp=g;document.querySelectorAll('[id^=rgrp]').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderRecapMer();}
function selectRecapVacGrp(g,el){recapVacGrp=g;document.querySelectorAll('[id^=rvgrp]').forEach(function(t){t.classList.remove('act');});el.classList.add('act');renderRecapVac();}
function jumpClass(cl){
  periClass=cl;
  showView('periscolaire',document.getElementById('ni-pt'));
  document.querySelectorAll('#class-tabs .tab').forEach(function(t){t.classList.toggle('act',t.textContent.trim().startsWith(cl));});
  renderPeriTable();
}
function searchPeri(q){renderPeriTable(q);}
function searchMer(q){renderMerTable(q);}
function searchVac(q){renderVacTable(q);}
function savePeri(){autoSync();showToast('Pointage enregistré');}
function saveMer(){autoSync();showToast('Mercredi enregistré');}
function saveVac(){autoSync();showToast('Vacances enregistrées');}
function exportCAF(){showToast('Export CAF — à connecter au backend','warn');}

function importPeri(){
  var raw=document.getElementById('peri-json').value.trim();
  if(!raw){showToast('JSON vide','err');return;}
  var p;try{p=JSON.parse(raw);}catch(e){showToast('JSON invalide','err');return;}
  var nv=0,maj=0;
  (p.enfants||[]).forEach(function(imp){
    var ex=PERI.find(function(e){return e.nom.toLowerCase()===imp.nom.toLowerCase();});
    if(!ex){ex={nom:imp.nom,cl:imp.cl||'?'};PERI.push(ex);nv++;}else maj++;
    Object.keys(imp).forEach(function(k){if(k==='nom'||k==='cl')return;ex[k]=imp[k];if(!periDates.includes(k))periDates.push(k);});
  });
  periDates.sort();periDate=periDates[periDates.length-1];
  document.getElementById('peri-json').value='';
  autoSync();renderPeriDateTabs();renderPeriTable();
  showToast((p.semaine||'Import')+' : '+nv+' nouveau(x), '+maj+' mis à jour');
}

function importMer(){
  var raw=document.getElementById('mer-json').value.trim();
  if(!raw){showToast('JSON vide','err');return;}
  var p;try{p=JSON.parse(raw);}catch(e){showToast('JSON invalide','err');return;}
  var grp=p.groupe||'moins6';
  var src=grp==='plus6'?MER_PLUS6:MER_MOINS6;
  var nv=0,maj=0;
  (p.enfants||[]).forEach(function(imp){
    var ex=src.find(function(e){return e.nom.toLowerCase()===imp.nom.toLowerCase();});
    if(!ex){ex={nom:imp.nom};src.push(ex);nv++;}else maj++;
    Object.keys(imp).forEach(function(k){if(k==='nom')return;ex[k]=imp[k];if(!merDates.includes(k))merDates.push(k);});
  });
  merDates.sort();merDate=merDates[merDates.length-1];merGrp=grp;
  document.getElementById('mer-json').value='';
  autoSync();renderMerDateTabs();renderMerTable();
  showToast((p.semaine||'Import mercredi')+' : '+nv+' nouveau(x), '+maj+' mis à jour');
}

function importVac(){
  var raw=document.getElementById('vac-json').value.trim();
  if(!raw){showToast('JSON vide','err');return;}
  var p;try{p=JSON.parse(raw);}catch(e){showToast('JSON invalide','err');return;}
  var grp=p.groupe||'moins6';
  var src=grp==='plus6'?VAC_PLUS6:VAC_MOINS6;
  var nv=0,maj=0;
  (p.enfants||[]).forEach(function(imp){
    var ex=src.find(function(e){return e.nom.toLowerCase()===imp.nom.toLowerCase();});
    if(!ex){ex={nom:imp.nom};src.push(ex);nv++;}else maj++;
    Object.keys(imp).forEach(function(k){if(k==='nom')return;ex[k]=imp[k];if(!vacDates.includes(k))vacDates.push(k);});
  });
  vacDates.sort();vacDate=vacDates[0];vacGrp=grp;
  document.getElementById('vac-json').value='';
  autoSync();renderVacDateTabs();renderVacTable();
  showToast((p.periode||'Import vacances')+' : '+nv+' nouveau(x), '+maj+' mis à jour');
}

function saveAll(){
  try{
    localStorage.setItem('palsh_peri',JSON.stringify(PERI));
    localStorage.setItem('palsh_mer_plus6',JSON.stringify(MER_PLUS6));
    localStorage.setItem('palsh_mer_moins6',JSON.stringify(MER_MOINS6));
    localStorage.setItem('palsh_vac_plus6',JSON.stringify(VAC_PLUS6));
    localStorage.setItem('palsh_vac_moins6',JSON.stringify(VAC_MOINS6));
    localStorage.setItem('palsh_peri_dates',JSON.stringify(periDates));
    localStorage.setItem('palsh_mer_dates',JSON.stringify(merDates));
    localStorage.setItem('palsh_vac_dates',JSON.stringify(vacDates));
  }catch(e){}
}

function loadAll(){
  try{
    var pp=localStorage.getItem('palsh_peri');
    var mp=localStorage.getItem('palsh_mer_plus6');
    var mm=localStorage.getItem('palsh_mer_moins6');
    var vp=localStorage.getItem('palsh_vac_plus6');
    var vm=localStorage.getItem('palsh_vac_moins6');
    var pd=localStorage.getItem('palsh_peri_dates');
    var md=localStorage.getItem('palsh_mer_dates');
    var vd=localStorage.getItem('palsh_vac_dates');
    if(pp){PERI.length=0;JSON.parse(pp).forEach(function(x){PERI.push(x);});}
    if(mp){MER_PLUS6.length=0;JSON.parse(mp).forEach(function(x){MER_PLUS6.push(x);});}
    if(mm){MER_MOINS6.length=0;JSON.parse(mm).forEach(function(x){MER_MOINS6.push(x);});}
    if(vp){VAC_PLUS6.length=0;JSON.parse(vp).forEach(function(x){VAC_PLUS6.push(x);});}
    if(vm){VAC_MOINS6.length=0;JSON.parse(vm).forEach(function(x){VAC_MOINS6.push(x);});}
    if(pd){periDates=JSON.parse(pd);periDate=periDates[periDates.length-1]||periDate;}
    if(md){merDates=JSON.parse(md);merDate=merDates[merDates.length-1]||merDate;}
    if(vd){vacDates=JSON.parse(vd);vacDate=vacDates[0]||vacDate;}
  }catch(e){}
}

var _syncTimer=null;
function autoSync(){
  saveAll();
  showSyncIndicator('en attente');
  clearTimeout(_syncTimer);
  _syncTimer=setTimeout(function(){
    showSyncIndicator('sync');
    syncToSupabase().then(function(){
      showSyncIndicator('ok');
      setTimeout(function(){showSyncIndicator('');},2000);
    });
  },1500);
}

function showSyncIndicator(state){
  var el=document.getElementById('sync-indicator');
  if(!el)return;
  if(!state){el.style.opacity='0';return;}
  el.style.opacity='1';
  if(state==='ok'){el.textContent='✓ Sauvegardé';el.style.color='var(--accent)';}
  else if(state==='sync'){el.textContent='↑ Sync…';el.style.color='var(--matin)';}
  else{el.textContent='● En attente';el.style.color='var(--warn)';}
}

async function syncToSupabase(){
  console.log('Sync Supabase démarrage...');
  try{
    var periRows=PERI.map(function(e){return {nom:e.nom,classe:e.cl,actif:true};});
    await supa.upsert('enfants_peri?on_conflict=nom,classe',periRows);
    var dbPeri=await supa.get('enfants_peri','select=id,nom,classe');
    var periIdx={};
    (dbPeri||[]).forEach(function(r){periIdx[r.nom+'|'+r.classe]=r.id;});
    var ptRows=[];
    PERI.forEach(function(e){
      var eid=periIdx[e.nom+'|'+e.cl];
      if(!eid)return;
      periDates.forEach(function(dateStr){
        var d=e[dateStr];if(!d)return;
        ptRows.push({enfant_id:eid,date:dateStr,annee:calYear,
          matin:d.m===true,midi:d.mi===true,restau:d.r===true,soir:d.s===true,
          matin_abs:d.m==='abs',midi_abs:d.mi==='abs',restau_abs:d.r==='abs',soir_abs:d.s==='abs'});
      });
    });
    if(ptRows.length)await supa.upsert('pointages_peri?on_conflict=enfant_id,date,annee',ptRows);

    var merAllRows=[...MER_MOINS6.map(function(e){return {nom:e.nom,groupe:'moins6',actif:true};}),
                   ...MER_PLUS6.map(function(e){return {nom:e.nom,groupe:'plus6',actif:true};})];
    await supa.upsert('enfants_mer?on_conflict=nom,groupe',merAllRows);
    var dbMer=await supa.get('enfants_mer','select=id,nom,groupe');
    var merIdx={};(dbMer||[]).forEach(function(r){merIdx[r.nom+'|'+r.groupe]=r.id;});
    var merPtRows=[];
    [...MER_MOINS6.map(function(e){return Object.assign({},e,{_grp:'moins6'});}),...MER_PLUS6.map(function(e){return Object.assign({},e,{_grp:'plus6'});})].forEach(function(e){
      var eid=merIdx[e.nom+'|'+e._grp];if(!eid)return;
      merDates.forEach(function(dateStr){var d=e[dateStr];if(!d)return;merPtRows.push({enfant_id:eid,date:dateStr,annee:calYear,matin:d.matin||'',journee:d.journee||'',restau:d.restau||'',apmidi:d.apmidi||''});});
    });
    if(merPtRows.length)await supa.upsert('pointages_mer?on_conflict=enfant_id,date,annee',merPtRows);

    var vacAllRows=[...VAC_MOINS6.map(function(e){return {nom:e.nom,groupe:'moins6',actif:true};}),
                   ...VAC_PLUS6.map(function(e){return {nom:e.nom,groupe:'plus6',actif:true};})];
    await supa.upsert('enfants_vac?on_conflict=nom,groupe',vacAllRows);
    var dbVac=await supa.get('enfants_vac','select=id,nom,groupe');
    var vacIdx={};(dbVac||[]).forEach(function(r){vacIdx[r.nom+'|'+r.groupe]=r.id;});
    var vacPtRows=[];
    [...VAC_MOINS6.map(function(e){return Object.assign({},e,{_grp:'moins6'});}),...VAC_PLUS6.map(function(e){return Object.assign({},e,{_grp:'plus6'});})].forEach(function(e){
      var eid=vacIdx[e.nom+'|'+e._grp];if(!eid)return;
      vacDates.forEach(function(dateStr){var d=e[dateStr];if(!d)return;vacPtRows.push({enfant_id:eid,date:dateStr,annee:calYear,matin:d.matin||'',journee:d.journee||'',restau:d.restau||'',apmidi:d.apmidi||''});});
    });
    if(vacPtRows.length)await supa.upsert('pointages_vac?on_conflict=enfant_id,date,annee',vacPtRows);
    console.log('Sync OK - peri:'+ptRows.length+' mer:'+merPtRows.length+' vac:'+vacPtRows.length);
  }catch(err){console.error('Sync ERREUR:',err);showToast('Erreur sync: '+err.message,'err');}
}

async function loadFromSupabase(){
  console.log('Chargement depuis Supabase...');
  try{
    var ep=await supa.get('enfants_peri','select=id,nom,classe,actif&actif=eq.true');
    var pp=await supa.get('pointages_peri','select=enfant_id,date,annee,matin,midi,restau,soir,matin_abs,restau_abs,soir_abs');
    if(ep&&ep.length){
      PERI.length=0;
      var ptByE={};
      (pp||[]).forEach(function(p){if(!ptByE[p.enfant_id])ptByE[p.enfant_id]=[];ptByE[p.enfant_id].push(p);});
      ep.forEach(function(e){
        var obj={nom:e.nom,cl:e.classe};
        (ptByE[e.id]||[]).forEach(function(p){
          obj[p.date]={m:p.matin_abs?'abs':p.matin,mi:p.midi,r:p.restau_abs?'abs':p.restau,s:p.soir_abs?'abs':p.soir};
          if(!periDates.includes(p.date))periDates.push(p.date);
        });
        PERI.push(obj);
      });
      periDates.sort();periDate=periDates[periDates.length-1]||periDate;
    }
    var em=await supa.get('enfants_mer','select=id,nom,groupe&actif=eq.true');
    var pm=await supa.get('pointages_mer','select=enfant_id,date,annee,matin,journee,restau,apmidi');
    if(em&&em.length){
      MER_MOINS6.length=0;MER_PLUS6.length=0;
      var mtByE={};(pm||[]).forEach(function(p){if(!mtByE[p.enfant_id])mtByE[p.enfant_id]=[];mtByE[p.enfant_id].push(p);});
      em.forEach(function(e){
        var obj={nom:e.nom};
        (mtByE[e.id]||[]).forEach(function(p){obj[p.date]={matin:p.matin,journee:p.journee,restau:p.restau,apmidi:p.apmidi};if(!merDates.includes(p.date))merDates.push(p.date);});
        (e.groupe==='moins6'?MER_MOINS6:MER_PLUS6).push(obj);
      });
      merDates.sort();merDate=merDates[merDates.length-1]||merDate;
    }
    var ev=await supa.get('enfants_vac','select=id,nom,groupe&actif=eq.true');
    var pv=await supa.get('pointages_vac','select=enfant_id,date,annee,matin,journee,restau,apmidi');
    if(ev&&ev.length){
      VAC_MOINS6.length=0;VAC_PLUS6.length=0;
      var vtByE={};(pv||[]).forEach(function(p){if(!vtByE[p.enfant_id])vtByE[p.enfant_id]=[];vtByE[p.enfant_id].push(p);});
      ev.forEach(function(e){
        var obj={nom:e.nom};
        (vtByE[e.id]||[]).forEach(function(p){obj[p.date]={matin:p.matin,journee:p.journee,restau:p.restau,apmidi:p.apmidi};if(!vacDates.includes(p.date))vacDates.push(p.date);});
        (e.groupe==='moins6'?VAC_MOINS6:VAC_PLUS6).push(obj);
      });
      vacDates.sort();vacDate=vacDates[0]||vacDate;
    }
    saveAll();
    renderPeriDateTabs();renderMerDateTabs();renderVacDateTabs();renderPeriTable();
    showToast('Données chargées depuis Supabase');
  }catch(err){
    console.warn('Supabase indisponible',err);
  }
}

const MOIS_FR=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DOW_FR=['L','M','M','J','V','S','D'];

function changeCalYear(d){calYear+=d;renderCal();}

function buildDayIndex(){
  var idx={};
  periDates.forEach(function(dateStr){
    var hasPeri=PERI.some(function(e){var dd=e[dateStr];return dd&&(dd.m===true||dd.mi===true||dd.r===true||dd.s===true);});
    if(hasPeri){
      if(!idx[dateStr])idx[dateStr]={types:new Set(),peri:0,mer:0,vac:0};
      idx[dateStr].types.add('peri');
      idx[dateStr].peri=PERI.filter(function(e){return e[dateStr]&&(e[dateStr].m===true||e[dateStr].mi===true||e[dateStr].r===true||e[dateStr].s===true);}).length;
    }
  });
  merDates.forEach(function(dateStr){
    var hasMer=[...MER_PLUS6,...MER_MOINS6].some(function(e){var dd=e[dateStr];return dd&&(dd.matin||dd.journee||dd.restau||dd.apmidi);});
    if(hasMer){
      if(!idx[dateStr])idx[dateStr]={types:new Set(),peri:0,mer:0,vac:0};
      idx[dateStr].types.add('mer');
      idx[dateStr].mer=[...MER_PLUS6,...MER_MOINS6].filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    }
  });
  vacDates.forEach(function(dateStr){
    var hasVac=[...VAC_PLUS6,...VAC_MOINS6].some(function(e){var dd=e[dateStr];return dd&&(dd.matin||dd.journee||dd.restau||dd.apmidi);});
    if(hasVac){
      if(!idx[dateStr])idx[dateStr]={types:new Set(),peri:0,mer:0,vac:0};
      idx[dateStr].types.add('vac');
      idx[dateStr].vac=[...VAC_PLUS6,...VAC_MOINS6].filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    }
  });
  return idx;
}

function renderCal(){
  document.getElementById('cal-year-label').textContent=calYear;
  var idx=buildDayIndex();
  var today=new Date();
  var html='';
  MOIS_FR.forEach(function(nomMois,mi){
    var firstDay=new Date(calYear,mi,1);
    var lastDay=new Date(calYear,mi+1,0).getDate();
    var startDow=(firstDay.getDay()+6)%7;
    var dowHtml='';
    DOW_FR.forEach(function(l){dowHtml+='<div class="cal-dow-lbl">'+l+'</div>';});
    var cells='';
    for(var i=0;i<startDow;i++)cells+='<div class="cal-day empty"></div>';
    for(var day=1;day<=lastDay;day++){
      var mm=String(mi+1).padStart(2,'0');
      var dd=String(day).padStart(2,'0');
      var dateStr=dd+'/'+mm;
      var isToday=today.getFullYear()===calYear&&today.getMonth()===mi&&today.getDate()===day;
      var info=idx[dateStr];
      var cls='cal-day';
      if(isToday)cls+=' today';
      if(info){
        var types=[...info.types];
        if(types.length>1)cls+=' multi';
        else cls+=' '+types[0];
      }else cls+=' no-data';
      if(info){
        cells+='<button class="'+cls+'" data-date="'+dateStr+'" data-label="'+nomMois+' '+day+'" onclick="showCalPopup(event,this.dataset.date,this.dataset.label)">'+day+'</button>';
      }else{
        cells+='<button class="'+cls+'">'+day+'</button>';
      }
    }
    html+='<div class="cal-month"><div class="cal-month-hd">'+nomMois+'</div><div class="cal-month-body"><div class="cal-dow">'+dowHtml+'</div><div class="cal-days">'+cells+'</div></div></div>';
  });
  document.getElementById('cal-grid').innerHTML=html;
}

function showCalPopup(evt,dateStr,label){
  evt.stopPropagation();
  var idx=buildDayIndex();
  var info=idx[dateStr];
  if(!info)return;
  var types=[...info.types];
  var rows='';
  if(types.includes('peri')){
    var d2=PERI.filter(function(e){return e[dateStr];});
    var m=d2.filter(function(e){return e[dateStr]&&e[dateStr].m===true;}).length;
    var mi=d2.filter(function(e){return e[dateStr]&&e[dateStr].mi===true;}).length;
    var r=d2.filter(function(e){return e[dateStr]&&e[dateStr].r===true;}).length;
    var s=d2.filter(function(e){return e[dateStr]&&e[dateStr].s===true;}).length;
    rows+='<div style="margin-bottom:8px"><div style="font-size:11px;font-weight:600;color:#1d5fa8;margin-bottom:4px">Périscolaire</div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Matin</span><span class="cal-popup-val">'+m+'</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Midi</span><span class="cal-popup-val">'+mi+'</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Restau.</span><span class="cal-popup-val">'+r+'</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Soir</span><span class="cal-popup-val">'+s+'</span></div></div>';
  }
  if(types.includes('mer')){
    var all=[...MER_PLUS6,...MER_MOINS6].filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);});
    var m6=MER_MOINS6.filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    var p6=MER_PLUS6.filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    rows+='<div style="margin-bottom:8px"><div style="font-size:11px;font-weight:600;color:#0e7490;margin-bottom:4px">Mercredi ALSH</div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Présents</span><span class="cal-popup-val">'+all.length+' enfants</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">-6 ans</span><span class="cal-popup-val">'+m6+'</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">+6 ans</span><span class="cal-popup-val">'+p6+'</span></div></div>';
  }
  if(types.includes('vac')){
    var all=[...VAC_PLUS6,...VAC_MOINS6].filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);});
    var vm6=VAC_MOINS6.filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    var vp6=VAC_PLUS6.filter(function(e){return e[dateStr]&&(e[dateStr].matin||e[dateStr].journee||e[dateStr].restau||e[dateStr].apmidi);}).length;
    rows+='<div><div style="font-size:11px;font-weight:600;color:#7c3aed;margin-bottom:4px">Vacances ALSH</div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">Présents</span><span class="cal-popup-val">'+all.length+' enfants</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">-6 ans</span><span class="cal-popup-val">'+vm6+'</span></div>'+
      '<div class="cal-popup-row"><span class="cal-popup-lbl">+6 ans</span><span class="cal-popup-val">'+vp6+'</span></div></div>';
  }
  var popup=document.getElementById('cal-popup');
  popup.innerHTML='<div class="cal-popup-t">'+label+' '+calYear+'</div>'+rows+'<div style="font-size:11px;color:var(--text3);margin-top:8px;cursor:pointer">Clic pour fermer</div>';
  var rb=evt.target.getBoundingClientRect();
  popup.style.display='block';
  var left=rb.right+8,top=rb.top;
  if(left+280>window.innerWidth)left=rb.left-288;
  if(top+popup.offsetHeight>window.innerHeight)top=window.innerHeight-popup.offsetHeight-10;
  popup.style.left=left+'px';popup.style.top=top+'px';
}

function closeCalPopup(){document.getElementById('cal-popup').style.display='none';}

const PROMPTS={
  peri:"Voici une photo d'une feuille de pointage périscolaire de l'école Deux Moulins.\nLis tous les noms et les présences pour chaque temps : Matin, Midi (Restauration scolaire), et Soir.\n- ⊕ coloré = présent (true)\n- ○ = absent (false)\n- \"ABS\" écrit = absent justifié (\"abs\")\nLa feuille a une classe en titre (ex: CE1/CE2, CP, PS...).\nGénère un JSON avec ce format exact :\n{\n  \"semaine\": \"S__ — JJ/MM au JJ/MM/AAAA\",\n  \"enfants\": [\n    {\"nom\":\"NOM Prénom\",\"cl\":\"CLASSE\",\"JJ/MM\":{\"m\":true,\"mi\":true,\"r\":true,\"s\":false}}\n  ]\n}\nDates en format JJ/MM (ex: 05/05). Une entrée par jour pour chaque enfant.",
  mer:"Voici une photo d'une feuille de pointage mercredi ALSH de l'école Deux Moulins.\nIl y a 4 colonnes : ALSH Matin, ALSH Journée, ALSH Restauration, ALSH Après-midi.\n- Une heure écrite = présent ce temps-là, note l'heure telle quelle (ex: \"8h30\")\n- ○ = absent sur ce temps\n- \"ABS\" écrit = absent justifié, note \"ABS\"\n- Une heure barrée = ignore-la, prends la suivante\nLe groupe est indiqué en titre : \"+6 ans\" → \"plus6\" / \"-6 ans\" → \"moins6\"\nGénère un JSON avec ce format exact :\n{\n  \"semaine\": \"Mercredi JJ/MM/AAAA — ALSH [groupe]\",\n  \"groupe\": \"moins6\",\n  \"enfants\": [\n    {\"nom\":\"NOM Prénom\",\"JJ/MM\":{\"matin\":\"8h30\",\"journee\":\"\",\"restau\":\"17h00\",\"apmidi\":\"\"}}\n  ]\n}\nDates en format JJ/MM. Champ vide (\"\") si rien n'est noté.",
  vac:"Voici une photo d'une feuille de pointage vacances ALSH de l'école Deux Moulins.\nIl y a 4 colonnes par jour : ALSH Matin, ALSH Journée, ALSH Restauration, ALSH Après-midi.\n- Une heure écrite = présent, note l'heure telle quelle\n- ○ = absent\n- \"ABS\" = absent justifié\n- Une heure barrée = ignore-la\nLe groupe est indiqué en titre : \"+6 ans\" → \"plus6\" / \"-6 ans\" → \"moins6\"\nGénère un JSON avec ce format :\n{\n  \"periode\": \"Vacances [nom] AAAA\",\n  \"groupe\": \"moins6\",\n  \"enfants\": [\n    {\"nom\":\"NOM Prénom\",\"JJ/MM\":{\"matin\":\"\",\"journee\":\"8h00\",\"restau\":\"17h00\",\"apmidi\":\"\"},...}\n  ]\n}\nUne date par colonne de jour. Champ vide si rien."
};

function initPrompts(){
  ['peri','mer','vac'].forEach(function(t){
    var el=document.getElementById('prompt-'+t);
    if(el)el.textContent=PROMPTS[t];
  });
}

function copyPrompt(type){
  navigator.clipboard.writeText(PROMPTS[type]).then(function(){showToast('Prompt copié ! Colle-le dans Claude avec ta photo');}).catch(function(){showToast('Copie manuelle nécessaire','warn');});
}

function showView(v,navEl){
  document.querySelectorAll('.view').forEach(function(x){x.classList.remove('active');});
  document.querySelectorAll('.ni').forEach(function(x){x.classList.remove('act','mact','vact','cact');});
  document.getElementById('view-'+v).classList.add('active');
  if(navEl){
    var cls=v.includes('vac')?'vact':v.includes('mer')?'mact':v==='calendrier'?'cact':'act';
    navEl.classList.add(cls);
  }
  var titles={
    'periscolaire':'Pointage périscolaire','recap-peri':'Récapitulatif périscolaire',
    'mercredi':'Mercredi ALSH — Pointage','recap-mer':'Mercredi ALSH — Récapitulatif',
    'vacances':'Vacances scolaires — Pointage','recap-vac':'Vacances scolaires — Récapitulatif',
    'calendrier':'Calendrier annuel'
  };
  document.getElementById('tb-title').textContent=titles[v]||v;
  if(v==='recap-peri')renderRecapPeri();
  if(v==='recap-mer')renderRecapMer();
  if(v==='recap-vac')renderRecapVac();
  if(v==='calendrier')renderCal();
  closeSB();
}

function toggleZ(id,chId){
  var z=document.getElementById(id),open=z.style.display==='none';
  z.style.display=open?'block':'none';
  document.getElementById(chId).style.transform=open?'rotate(180deg)':'';
}
function openSB(){document.getElementById('sb').classList.add('open');document.getElementById('ov').classList.add('show');}
function closeSB(){document.getElementById('sb').classList.remove('open');document.getElementById('ov').classList.remove('show');}
function showToast(msg,type){
  var c=document.getElementById('toasts'),t=document.createElement('div');
  t.className='toast'+(type?' '+type:'');t.textContent=msg;c.appendChild(t);
  requestAnimationFrame(function(){t.classList.add('show');});
  setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},300);},2800);
}

// INIT
document.addEventListener('click',function(e){
  var p=document.getElementById('cal-popup');
  if(p&&!p.contains(e.target)&&!e.target.classList.contains('cal-day'))p.style.display='none';
});
loadAll();
renderPeriDateTabs();renderMerDateTabs();renderVacDateTabs();renderPeriTable();initPrompts();
setTimeout(function(){
  loadFromSupabase().then(function(){
    // Après chargement Supabase, re-sync pour s'assurer que tout est envoyé
    console.log('Supabase chargé, sync en cours...');
    syncToSupabase();
  });
},200);

// Rechargement automatique depuis Supabase toutes les 30 secondes
setInterval(function(){
  loadFromSupabase();
},30000);
