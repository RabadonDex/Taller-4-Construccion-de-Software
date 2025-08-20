import data from "./data/nombres.json"

export default function Page() {
  return(
  <>
    <h1>{data.titulo}</h1>
    <ul>
      {data.palabras.map((palabras, idx)=>(
        <li key={idx}>{palabras.nombre}</li>
      ))}
    </ul>
  </>
  );
}