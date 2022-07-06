const sections = document.getElementsByClassName("section");
const navList = document.querySelectorAll('nav .sidebarMenu ul li');

window.addEventListener('scroll', ()=>{
    let current = '';
    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        console.log(sectionTop);
        if(scrollY = sectionTop){
            current = section.getAttribute('id');
        }
    });
'    console.log(current);'
    
    navList.forEach(li =>{
        li.classList.remove('active');
        if(li.classList.contains(current)){
            li.classList.add('active');
        };
    })
})