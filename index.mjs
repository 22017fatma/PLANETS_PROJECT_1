import { parse } from 'csv-parse';
import fs from 'fs';

const habitableplanets =[];
function isHabitableplanets(planet){
    return planet['koi_disposition']==='CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
        }

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment:'#',
    columns:true,
}))
.on('data',(data)=>{
    if(isHabitableplanets(data)){
     habitableplanets.push(data);
    }
  
})
.on('error',(err)=>{
    console.log(err);
})
.on('end',()=>{
    console.log(habitableplanets.map((planet) =>{
         return planet['kepler_name'];
    }));
    console.log(`${habitableplanets.length} habitable planets found!`);
    console.log('done');
});

// parse();