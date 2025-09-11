'use client';

const pruebas = ({ datosPrueba, indice }) => {
  return (
    <div className="caja-prueba">
      <div className="prueba-cabecera">{indice + 1}</div>
      <div className="nombre-prueba">{datosPrueba.nombre}</div>
    </div>
  );
};

export default pruebas;