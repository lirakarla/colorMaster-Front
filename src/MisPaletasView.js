import Logo from "./Color master Logo.png";
import { Row, Col, Image, Select, Button, Modal, Space } from "antd";
import LoginCard from "./LoginCard";
import Menu from "./Menu";
import {PlusSquareFilled, ExclamationCircleOutlined }  from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import PaletaCard from "./PaletaCard";
import axios from "axios";
import { useState,useEffect } from "react";

const{confirm}= Modal;

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

  

const MisPaletasView = () => {
  const history=useHistory();

  const [paletas,setPaletas]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filtros,setFiltros]=useState([]);


  const showDeleteConfirm=(nombre, idPaleta)=> {
    confirm({
      title: '¿Seguro que desea eliminar la paleta '+nombre+'?',
      icon: <ExclamationCircleOutlined />,
      content: 'No podrás recuperar la paleta',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        setLoading(true);
        //llamo al back para borra la paleta
        axios.delete("http://localhost:4000/paleta/"+idPaleta).then(()=>{
        const nuevasPaletas=[...paletas].filter((paleta)=>paleta.idPaleta !== idPaleta) 
        setPaletas(nuevasPaletas);
        setLoading(false);
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //eso corre una vez
  useEffect(()=>{
      const usuario=JSON.parse(localStorage.getItem("user"));
      //cambiaaaaaaaaaaaaaaar despues
      if (!usuario) {

      return  history.push("/login")
    }
      axios.get("http://localhost:4000/paleta/usuario/"+usuario.idUsuario).then((res)=>{
        setPaletas(res.data)
        setLoading(false);
      })
    
  },[])//parte nueva de react
  if(loading){
    return <p>cargando   </p>
  }
  return (
    <div style={{ height: "100%" }}>
      <Menu pagina={"mispaletas"}></Menu>
      <Row style={{padding:"20px"}}>
        <Col span={4}>
          <Select
            
            style={{ width: 200 }}
            onSelect={(value)=>setFiltros([...filtros,value])}
            allowClear
            onClear={()=>setFiltros([])}
            mode="multiple"
            onDeselect={(value)=>setFiltros([...filtros].filter(filtro=>filtro !== value))}
          >{categoriasOriginales.map(categoria => {
              return(
                <Option key={categoria.nombre} value={categoria.nombre}>{categoria.nombre}</Option>
              )

          })}
           
          </Select>
        </Col>
        <Col span={4} offset={16}>
          <Button className="boton-paleta" onClick={()=>history.push("/paleta")} icon={<PlusSquareFilled  style={{fontSize: "20px"}}/>}>
              Crear Paleta
          </Button>
        </Col>
      </Row>

      {/*se renderiza las paletas*/ }
      <Row gutter={[0,48]} justify={"start"} style={{padding:"30px"}}>
           {
             paletas.map(paleta=>{
               /*checo si hay filtro */ 
               if ((filtros.length>0 && paleta.categorias.map(categoria => categoria.nombre).some(c=>filtros.includes(c)))|| filtros.length===0) {
                return(
                  <Col offset={1} span={4}>
                  <PaletaCard paleta= {paleta} onDelete={showDeleteConfirm}></PaletaCard>
                  </Col>
                 ) 
               }
               else{
                return  <></>
               }
             }) 
            
           } 
      </Row>
      
    </div>
  );
};

export default MisPaletasView;
