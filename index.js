//uso de programas/scrips para recoger de manera automatica info de las webs
//1.primero inciamos npm init -y  para crear el package.json
//2.luego instalaremos las dependencias (express, axios y cheerio): npm i express axios cheerio -E

const axios=require ("axios")
const cheerio=require ("cheerio")
const express= require ("express")
const app= express()

/*3.después de inicializar todo vamos a package.json para hacer un start, vamos a utilizar watch

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "start": "node --watch index.js",
  },
  
  guardamos, y ponemos en consola npm start
  
  */

//vamos a escrapear esta página de ejemplo, puede ser otra:
const url="https://carlosdiazgirol.github.io/dashboard/"
//accedmos a la página con axios
//pero antes le diremos a la ruta a la que quermos que acceda
app.get("/", (req,res)=>{
    //res.send("FUNCIONA!!!!")//miramos si funciona primero
/*lo que haremos primero es traernos la URL (sólo enlaces e imágenes) pero antes vamos a preparar
el axios para poder extraerlo*/ 
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
           // console.log(html)
           // res.send(html)  esto lo que hará es cargar todo el html
            const pageTitle=$("title").text()//por ejemplo nos vamos a traer el titulo
            
            const links=[];
            const imgs=[];

            $("a").each((index, element)=>{//cheerio tiene una opcion para recorrer las imagenes
              const link=$(element).attr("href")
              links.push(link)//una vez que lo tenemos vamos a pushearlo
          })

            $("img").each((index, element)=>{//cheerio tiene una opcion para recorrer las imagenes
            const img=$(element).attr("src")
            imgs.push(img)//una vez que lo tenemos vamos a pushearlo
          })
        console.log(links)
        console.log(imgs)
        //haremos un map para obtener cada uno de los links
    res.send(`
        <h1>${pageTitle}</h1>
        <h2>Enlaces</h2>
        <ul>
          ${links.map(link=>`<li>${link}</li>`).join("")}
        </ul>
        <h2>Imágenes</h2>
        <ul>
        ${imgs.map(img=>`<li><a href="${url}${img}>${img}</a></li>`).join("")}
        </ul>
        `
        )
    }
    })
    //console.log(link)//aquí veremos los enlaces
})

app.listen(3000, ()=>{
    console.log("express está escuchando en el puerto http://localhost:3000")
})


