const people = [
    { name: 'Lek', position: 'Father' },
    { name: 'Kan', position: 'Wife' },
    { name: 'DotOne', position: 'Daughter' }
]

export default ()=>{
   
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            return resolve(people);
        }, 3000)
    })
}