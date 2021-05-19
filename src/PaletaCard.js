import { Row, Col, Image, Popover, Button, Tooltip, message } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useState } from "react";
import copy from "clipboard-copy";
import axios from "axios";

const colores = [
  {
    color: "red",
  },
  {
    color: "yellow",
  },
  {
    color: "pink",
  },
  {
    color: "purple",
  },
  {
    color: "black",
  },
];

const content = (idPaleta, onDelete, nombre) => (
  <div>
    <a href={"/paleta/" + idPaleta} className="paletaCard-opcion">
      <span>Editar</span>
      <EditOutlined className="paletaCard-opIcon" />
    </a>
    <a
      onClick={() => onDelete(nombre, idPaleta)}
      className="paletaCard-opcion paletaCard-eliminar"
    >
      <span>Eliminar</span>
      <DeleteOutlined className="paletaCard-opIcon" />
    </a>
  </div>
);

const PaletaCard = ({ onDelete, paleta, mostrarCorazon, onFavoritoUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleColorClick = (color) => {
    copy(color);
    message.success("El código del color se ha copiado");
  };
  const updateFavorito = () => {
    setLoading(true);
    const usuario=JSON.parse(localStorage.getItem("user"));
    axios
      .put("http://localhost:4000/paleta/favorito", {
        idUsuario: usuario.idUsuario,
        idPaleta: paleta.idPaleta,
        favorito: !paleta.favorito,
      })
      .then(() => {
        //le avisa al papa que cambie la info
        onFavoritoUpdate(paleta.idPaleta, !paleta.favorito);
        setLoading(false);
      });
  };
  const renderIcon = () => {
    if (loading) return;
    if (mostrarCorazon) {
      if (paleta.favorito) {
        return (
          <HeartFilled
            onClick={updateFavorito}
            style={{
              color: "red",
              float: "right",
              marginRight: "10px",
              marginTop: "5px",
            }}
          />
        );
      } else {
        return (
          <HeartOutlined
            onClick={updateFavorito}
            style={{
              color: "white",
              float: "right",
              marginRight: "10px",
              marginTop: "5px",
            }}
          />
        );
      }
    } else {
      return (
        <Popover
          visible={edit}
          placement={"bottom"}
          content={content(paleta.idPaleta, onDelete, paleta.nombre)}
          trigger="click"
          onVisibleChange={(visible) => setEdit(visible)}
        >
          <MoreOutlined className={"paletaPuntitos"} />
        </Popover>
      );
    }
  };
  return (
    <div className="paletaCard">
      <div className="paletaCard-top">
        <p>{paleta.nombre}</p>
        {renderIcon()}
      </div>
      {paleta.colores.map((color) => {
        return (
          <div
            onClick={() => handleColorClick(color.color)}
            className="paletaCard-colores"
            style={{ backgroundColor: color.color }}
          />
        );
      })}

      {paleta.categorias.slice(0, 3).map((categoria) => {
        return <span className="paletaCard-categoria">{categoria.nombre}</span>;
      })}
      {paleta.categorias.length > 3 && (
        <Tooltip
          title={paleta.categorias
            .map((categoria) => categoria.nombre)
            .slice(3, paleta.categorias.length)
            .join(", ")}
        >
          <span>...</span>
        </Tooltip>
      )}
    </div>
  );
};

export default PaletaCard;
