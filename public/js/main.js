window.addEventListener('load', () => {
    
    const ul = document.querySelector("#header-ul");
    const links = ul.querySelectorAll("a");
    let current = document.querySelector(`[href="${window.location.pathname}"]`);
    if( current != null ){
        for(let i = 0; i < links.length; i++){
            links[i].className = current.classList.remove("active");
        }
        
        current.classList.add('active');
    }
    
    
    
})


