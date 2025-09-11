'use client';

import React, { useEffect, useState } from 'react';
import datosPruebas from './data/pruebas.json';

function calcularTR(limiteStr) {
  const limite = new Date(limiteStr).getTime();
  const ahora = Date.now();
  const tempo = limite - ahora;

  if (tempo <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true };
  }

  const dias = Math.floor(tempo / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tempo / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((tempo / (1000 * 60)) % 60);
  const segundos = Math.floor((tempo / 1000) % 60);

  return { dias, horas, minutos, segundos, terminado: false };
}

function Temporizador({ codigo, nombre, fecha }) {
  const [tiempo, setTiempo] = useState(() => calcularTR(fecha));

  useEffect(() => {
    if (tiempo.terminado) return;

    const intervalo = setInterval(() => {
      setTiempo(calcularTR(fecha));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fecha, tiempo.terminado]);

  const poquito = tiempo.dias < 7 || tiempo.terminado;

  return (
    <div
      style={{
        margin: 10,
        padding: 10,
        border: '1px solid #ccc',
        backgroundColor: poquito ? '#ffffffff' : '#ffffffff',
        color: poquito ? '#cc0000' : 'black',
      }}
    >
      <h3>
        {codigo} - {nombre}
      </h3>
      <p>Fecha: {new Date(fecha).toLocaleString()}</p>
      <p>
        Quedan {tiempo.dias} días, {tiempo.horas} horas, {tiempo.minutos} minutos y {tiempo.segundos} segundos para la prueba.
      </p>
    </div>
  );
}

export default function Page() {
  const pruebasValidas = datosPruebas.Pruebas.filter(
    (prueba) => new Date(prueba.fecha).getTime() > Date.now()
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>{datosPruebas.titulo}</h1>
      {pruebasValidas.length === 0 && <p>No hay pruebas próximas.</p>}
      {pruebasValidas.map((prueba, idx) => (
        <Temporizador key={idx} codigo={prueba.codigo} nombre={prueba.nombre} fecha={prueba.fecha} />
      ))}
    </div>
  );
}