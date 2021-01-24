export const loadState = ()=>{
 try{
   const estado = sessionStorage.getItem('state');
   if(estado === null){
     return undefined;
   }
   return JSON.parse(estado);
 } catch(err){
   return undefined;
 }
}

export const saveState = (state) => {
 try{
   console.log('Bueeeenos dias');
   console.log(state);
   const estado = JSON.stringify(state);
   console.log(estado);
   sessionStorage.setItem('state', estado);
 } catch(err){

 }
}
