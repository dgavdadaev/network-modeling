/**
 * Lab03 PowerPoint generator: Markdown -> editable PPTX.
 * PDF can be exported from the generated PPTX with LibreOffice or PowerPoint.
 * Run: node build_from_markdown.js
 */
'use strict';
const pptxgen=require('pptxgenjs');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const src=fs.readFileSync(path.join(root,'Lab03_Presentation_Source.md'),'utf8');
const parts=src.split(/\r?\n---\r?\n/g).map(s=>s.trim()).filter(Boolean);
const slidesData=parts.map((raw,index)=>{
  const typeMatch=raw.match(/<!--\s*type:\s*([\w-]+)\s*-->/);
  if(!typeMatch) throw new Error(`No slide type for slide ${index+1}`);
  const note=(raw.match(/<!--\s*speaker-notes:\s*([\s\S]*?)\s*-->/)||[])[1]||'';
  const main=raw.replace(/<!--[\s\S]*?-->/g,'').trim();
  const lines=main.split(/\r?\n/);
  const titleMatch=lines[0].match(/^#\s+(.+)$/);
  if(!titleMatch) throw new Error(`No H1 for slide ${index+1}`);
  const body=lines.slice(1).join('\n').trim();
  return {type:typeMatch[1], title:titleMatch[1], body, note};
});
if(slidesData.length!==42)throw new Error(`Expected 42 slides, got ${slidesData.length}`);
if(slidesData.some(s=>s.title==='Практическая значимость'||s.title==='Материалы лабораторной работы'))throw new Error('Slides to remove were found');
const pptx=new pptxgen();
pptx.layout='LAYOUT_WIDE';
pptx.author='Авдадаев Джамал Геланиевич';
pptx.subject='Лабораторная работа №3: воспроизводимый эксперимент в Mininet и iPerf3';
pptx.title='Моделирование сетей передачи данных — лабораторная работа №3';
pptx.lang='ru-RU';
pptx.theme={headFontFace:'Calibri',bodyFontFace:'Cambria',lang:'ru-RU'};
const W=13.333333,H=7.5;
const BG='FAFAFA',INK='22373A',DARK='22373A',ACC='DE9B5F',SECOND='516267';
const SH=pptx.ShapeType;
const HEADFONT='Calibri',BODYFONT='Cambria';
function t(s,txt,x,y,w,h,size=20,props={},family=BODYFONT){
  s.addText(txt,{x,y,w,h,fontFace:family,fontSize:size,color:INK,breakLine:false,
      margin:0,lang:'ru-RU',valign:'mid',...props});
}
function base(){let s=pptx.addSlide();s.background={color:BG};return s;}
function footer(s,idx,total){t(s,`${idx}/${total}`,12.47,7.12,.60,.19,10.8,{align:'right',color:SECOND});}
function header(s,txt){
  s.addShape(SH.rect,{x:0,y:0,w:W,h:.838,line:{color:DARK,transparency:100},fill:{color:DARK}});
  s.addShape(SH.line,{x:0,y:.840,w:1.15,h:0,line:{color:ACC,width:1.15}});
  s.addShape(SH.line,{x:1.15,y:.840,w:W-1.15,h:0,line:{color:'CCB9AA',width:.4}});
  t(s,txt,.31,.217,12.7,.44,19.5,{color:'FFFFFF',fit:'shrink'},HEADFONT);
}
function getImageSize(p){const bytes=fs.readFileSync(p);if(bytes.toString('hex',0,8)!=='89504e470d0a1a0a')throw new Error('Expected PNG: '+p);return [bytes.readUInt32BE(16),bytes.readUInt32BE(20)];}
function getImageSpec(body){
 const m=body.match(/!\[([^\]]+)\]\(([^)]+)\)/);
 if(!m)throw new Error('Missing Markdown image');
 return {caption:m[1],file:path.resolve(root,m[2])};
}
function addSlide(v){
 let s=base(),type=v.type;
 if(type==='cover'){
   let body=v.body.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
   let subtitle=body.find(x=>x.startsWith('## '))?.replace(/^## /,'')||'';
   const remainder=body.filter(x=>!x.startsWith('## '));
   t(s,v.title,.84,1.96,11.6,.48,23.4,{bold:true},HEADFONT);
   t(s,subtitle,.84,2.64,11.4,.43,20.5,{color:SECOND},HEADFONT);
   s.addShape(SH.line,{x:.84,y:3.505,w:11.66,h:0,line:{color:ACC,width:1.1}});
   t(s,remainder[0]||'',.84,4.24,10,.32,16.9);
   t(s,remainder[1]||'',.84,4.72,10,.32,16.9);
   t(s,remainder[2]||'',.84,5.34,11.3,.28,13.5,{color:SECOND});
 } else if(type==='divider'){
   t(s,v.title,3.67,3.11,8.3,.48,23.4,{},HEADFONT);
   s.addShape(SH.line,{x:3.67,y:3.865,w:6,h:0,line:{color:'D7CCC0',width:.6}});
   s.addShape(SH.line,{x:3.67,y:3.865,w:.19,h:0,line:{color:ACC,width:1.1}});
 } else if(type==='paragraph'){
   header(s,v.title);
   t(s,v.body,1.00,3.04,11.3,1.75,20.2,{valign:'mid',fit:'shrink',color:SECOND});
 } else if(type==='bullets'){
   header(s,v.title);
   let bullets=v.body.split('\n').map(x=>x.trim()).filter(x=>x.startsWith('- ')).map(x=>x.slice(2));
   let y=1.53;
   for(const line of bullets){
     s.addShape(SH.ellipse,{x:1.02,y:y+.153,w:.084,h:.084,fill:{color:ACC},line:{color:ACC}});
     t(s,line,1.33,y,10.8,.53,19.0,{fit:'shrink'});
     y+=.76;
   }
 } else if(type==='screenshot'){
   header(s,v.title);
   let {caption,file}=getImageSpec(v.body);
   if(!fs.existsSync(file))throw new Error(`Missing image ${file}`);
   let [iw,ih]=getImageSize(file);const maxw=11.35,maxh=5.77;
   let scale=Math.min(maxw/iw,maxh/ih);
   let w=iw*scale,h=ih*scale,x=(W-w)/2,y=.985+(5.80-h)/2;
   s.addImage({path:file,x,y,w,h});
   t(s,caption,1.04,6.875,11.27,.285,14.3,{align:'center',fit:'shrink'});
 } else if(type==='comparison'){
   header(s,v.title);
   let sections={};let cur='';let bottom='';
   for(const line of v.body.split('\n').map(x=>x.trim()).filter(Boolean)){
     if(line.startsWith('## ')){cur=line.slice(3);sections[cur]=[];}
     else if(line.startsWith('- ')&&cur){sections[cur].push(line.slice(2));}
     else if(!line.startsWith('#'))bottom+=line+' ';
   }
   const icmp=sections['ICMP']||[],tcp=sections['TCP / iPerf3']||[];
   t(s,'ICMP',1.15,1.31,4.6,.44,20.5,{bold:true},HEADFONT);
   for(let i=0;i<2;i++){
     const [label,value]=(icmp[i]||'').split(': ');
     let y=1.97+i*1.28;
     t(s,label||'',1.15,y,5.2,.30,15.0,{color:SECOND});
     t(s,value||'',1.15,y+.43,5.7,.40,20.1,{fit:'shrink'});
   }
   s.addShape(SH.line,{x:6.61,y:1.4,w:0,h:4.55,line:{color:'DDD6CB',width:.6}});
   t(s,'TCP / iPerf3',7.1,1.31,5.2,.44,20.5,{bold:true},HEADFONT);
   for(let i=0;i<2;i++){
     const [label,value]=(tcp[i]||'').split(': ');
     let y=1.97+i*1.28;
     t(s,label||'',7.1,y,5.2,.30,15.0,{color:SECOND});
     t(s,value||'',7.1,y+.43,5.1,.40,21.5,{fit:'shrink'});
   }
   t(s,bottom.trim(),1.15,5.58,11.0,.70,17.6,{color:SECOND,fit:'shrink'});
 } else throw new Error(`Unsupported slide type ${type}`);
 if(v.note)s.addNotes(v.note);
 return s;
}
const normalTotal=slidesData.filter(v=>v.type!=='divider').length;
let counter=0;
slidesData.forEach(v=>{let s=addSlide(v);if(v.type!=='divider')footer(s,++counter,normalTotal);});
const target=path.join(root,'Lab03_Presentation_Cambria_Calibri.pptx');
pptx.writeFile({fileName:target}).then(()=>console.log('CREATED',target,'slide count',slidesData.length,'numbered count',counter)).catch(err=>{console.error(err);process.exit(1)});
