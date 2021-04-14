import Logo from "./Color master Logo.png";
import { Input, Image, Col, Row, Button, Typography,Select, message} from "antd";
  import Menu from "./Menu";
import {InteractionOutlined, EditOutlined, UnlockOutlined,LockOutlined, Loading3QuartersOutlined} from "@ant-design/icons";
import bestContrast from 'get-best-contrast-color';
import{ChromePicker} from 'react-color';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"; //libreria de navegacion
import axios from "axios";
import copy from "clipboard-copy";
import {useHistory} from "react-router-dom";


const { Option } = Select;
const categoriasOriginales = [
  {
    nombre: "Fríos",
    idCategoria: 11,
  },
  {
    nombre: "Pasteles",
    idCategoria: 1,
  },
  {
    nombre: "Colores Vivos",
    idCategoria: 2,
  },
  {
    nombre: "Atardecer",
    idCategoria: 3,
  },
  {
    nombre: "Nocturnos",
    idCategoria: 4,
  },
  {
    nombre: "Frescos",
    idCategoria: 5,
  },
  {
    nombre: "Cálidos",
    idCategoria: 6,
  },
  {
    nombre: "Infantiles",
    idCategoria: 7,
  },
  {
    nombre: "Claros",
    idCategoria: 8,
  },
  {
    nombre: "Llamativos",
    idCategoria: 9,
  },
  {
    nombre: "Nude",
    idCategoria: 10,
  },
];

const{
  Title
}=Typography;

//conexion con el back
const crearPaleta=(nombre,colores,categorias,setLoading,setIdPaleta)=>{
  if (nombre.length<3 || nombre.length>15) {
    return message.warning("El nombre debe de tener entre 3 y 15 caracteres")  
  }
  setLoading(true);
  //agarro el id usuario desde que el usuario inicio sesion
  const usuario=JSON.parse(localStorage.getItem("user"))
  axios.post("http://localhost:4000/paleta", {
    categorias, colores, nombre, idUsuario:usuario.idUsuario
  }).then((res)=>{
    setLoading(false);
    message.success("La paleta se ha guardado con éxito")
    setIdPaleta(res.data.idPaleta)
  })
}


const actualizarPaleta=(nombre,colores,categorias,setLoading,idPaleta)=>{
  if (nombre.length<3 || nombre.length>15) {
    return message.warning("El nombre debe de tener entre 3 y 15 caracteres")  
  }
  setLoading(true);
  //agarro el id usuario desde que el usuario inicio sesion
  const usuario=JSON.parse(localStorage.getItem("user"))
  axios.put("http://localhost:4000/paleta", {
    categorias, colores, nombre, idUsuario:usuario.idUsuario,idPaleta
  }).then((res)=>{
    setLoading(false);
    message.success("La paleta se ha guardado con éxito")
  })

}
const getRandomColor=()=>{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const lockColor=(i,colores)=>{
  const nuevosColores=[1,2,3,4,5].map((numero,j)=>{
     return{
       //propiedades
       color:colores[j].color,
       //?: ternario sirve para no hacer un if en el primer espacio se significa si es lo que quiero y sino esta la segundo
       locked: j===i ? !colores[j].locked :colores[j].locked
     }
   });
   return nuevosColores;
}

//color del picker
const changeColor=(i,colores,color)=>{
  console.log(color)
  const nuevosColores=[1,2,3,4,5].map((numero,j)=>{
     return{
       //si es el color que queremos cambiar se deja el de la libreria sino se cambia
       color:j===i ? color.hex :colores[j].color, 
       locked:colores[j].locked
       //?: ternario sirve para no hacer un if en el primer espacio se significa si es lo que quiero y sino esta la segundo
     
     }
   });
   return nuevosColores;
}


const generarRandomColores=(colores)=>{
  const coloresRandom=[1,2,3,4,5].map((numero,i)=>{
   if (colores===undefined || (colores && !colores[i].locked)) {
    return{
      //propiedades
      color:getRandomColor(),
      locked:false
    }
   }
   else{
    return{
      //propiedades
      color:colores[i].color,
      locked:true
    }
   }
    
  });
  return coloresRandom;
}

const PaletaView= () => {
  let params=useParams()

  //para los colores random
  const [colores,setColores]=useState([])

  const history=useHistory();

  const[idPaleta,setIdPaleta]=useState(params.idPaleta)

  const [categorias,setCategorias]=useState([])

  const [editableActual,setEditableActual]=useState(null)

  const[nombre,setNombre]=useState("")

  const[loading,setLoading]=useState(false)
  //eso corre una vez
  useEffect(()=>{
    const usuario=localStorage.getItem("user");
    if (!usuario) {
        history.push("/login")
    }

    if(idPaleta===undefined){
     
     setColores(generarRandomColores())
    } 
    else{

      axios.get("http://localhost:4000/paleta/"+idPaleta).then((res)=>{
        setCategorias(res.data.categorias)
        setColores(res.data.colores)
        setNombre(res.data.nombre)
      })
    }
  },[])//parte nueva de react

  const handleSelect=(option)=>{
    console.log(option);
    console.log(categorias);
    const categoria= categoriasOriginales.find(o=>o.idCategoria===Number(option));

    for (let index = 0; index < categorias.length; index++) {
      const element = categorias[index];
      
      //va a hacer que se rompa el set categorias y no agregue la misma categoria
      if(element.nombre ===categoria.nombre){
        return
      }   
    }
 
    //arreglo de objetos
    setCategorias([...categorias, categoria])
  }

  const handleDeSelect=(option)=>{
    console.log(option)
    setCategorias([...categorias].filter(value =>value.nombre !== option))
  }

  //sirve para dar click y copiar el color
  const handleColorClick=(color)=>{
    copy(color)
    message.success("El código del color se ha copiado")
  }

  return (
  <div style={{height:"100%"}}>
   <Menu>

   </Menu>
   <div className="paleta-container" >
     <Row className="paleta-top">
        <Col span={6} offset={9}>
            <Input value={nombre} onChange={(e)=>setNombre(e.target.value)} style={{borderRadius:"10px"}}>

            </Input>
        </Col>
     </Row>
     <div className="inner-container">
     <Row style={{margin:"10px"}}>
       <Col span={4}>
         <Button className="boton-paleta" onClick={()=> setColores(generarRandomColores(colores))} icon={<InteractionOutlined style={{fontSize: "20px"}}/>}>
            Aleatorizar
            
         </Button>
       </Col>
       <Col span={4} offset={16} align="right">
       <Button loading={loading} onClick={()=>idPaleta===undefined ?   crearPaleta(nombre,colores,categorias, setLoading,setIdPaleta): actualizarPaleta(nombre,colores,categorias, setLoading,idPaleta)} className="boton-guardar">
           Guardar
         </Button>
       </Col>
     </Row>
       {colores.map((objeto,i)=>{
         const colorTexto=bestContrast(objeto.color,["white", "black"]); 
         return (
          <div onClick={()=>handleColorClick(objeto.color)} className="colorBlock" style={{backgroundColor: objeto.color}}>
            <span className="colorHex" style={{color:colorTexto}}>
              {
                objeto.color
              }
            </span>
            <EditOutlined onClick={()=>editableActual === i ?setEditableActual(null) : setEditableActual(i)}  style={{color:colorTexto}}/>
            {i===editableActual && 
              <div style={{position: 'absolute', zIndex: 1}} > 
                <ChromePicker color={objeto.color} onChangeComplete={(color)=>setColores(changeColor(i, colores, color))}  /> 
              </div>}
              
            {
              objeto.locked ?
               <LockOutlined onClick={()=>setColores(lockColor(i, colores))} style={{color:colorTexto, display:"block", marginTop:"80%", marginRight:"60%"}}/>
              :
              <UnlockOutlined onClick={()=>setColores(lockColor(i, colores))} style={{color:colorTexto, display:"block", marginTop:"80%", marginRight:"60%"}}/>
            }
          </div>
         )
       })}
       <Title level={5} style={{marginTop:"30px"}}>
        
       Categorías
       </Title>
       <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      value={categorias.map(c=>c.nombre)}
      //... se sign. para poner los datos
      onSelect={handleSelect}
      onDeselect={handleDeSelect}
      onClear={(option)=>setCategorias([])}
    >
      {/* CategoriasOriginales son todas las que existen en la bd  */}
      {categoriasOriginales.map(objeto=>{
        return(
          <Option key={objeto.idCategoria}>
            {
              objeto.nombre
            }
          </Option>
        )
      })}
    </Select>
  
     </div>
   </div>
  </div>
  )
};

export default PaletaView;


