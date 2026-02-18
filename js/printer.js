printer.addEventListener('click', ()=>{
    if (result.innerHTML=="") {
        return 0;
    }
    window.print()
    return 0;
})