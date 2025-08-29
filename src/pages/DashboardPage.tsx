// src/pages/DashboardPage.tsx

// Tipos
interface Repartidor {
  nombre: string;
  panVendido: number;
  extra: number;
  regreso: number;
  cambios: number;
  total: number;
}

interface Despacho {
  categoria: string;
  hay: number;
  ingresa: number;
  queda: number;
  precio: number;
  consumo: number;
  total: number;
}

// Datos de ejemplo
const repartidores: Repartidor[] = [
  {
    nombre: "Beto",
    panVendido: 50,
    extra: 5,
    regreso: 2,
    cambios: 1,
    total: 58,
  },
  {
    nombre: "Jonh",
    panVendido: 30,
    extra: 3,
    regreso: 1,
    cambios: 2,
    total: 36,
  },
];

const despachoManana: Despacho[] = [
  {
    categoria: "Pan blanco",
    hay: 100,
    ingresa: 20,
    queda: 80,
    precio: 10,
    consumo: 40,
    total: 400,
  },
  {
    categoria: "Pan integral",
    hay: 50,
    ingresa: 10,
    queda: 45,
    precio: 12,
    consumo: 15,
    total: 180,
  },
];

const despachoTarde: Despacho[] = [
  {
    categoria: "Pan dulce",
    hay: 60,
    ingresa: 15,
    queda: 50,
    precio: 15,
    consumo: 25,
    total: 375,
  },
  {
    categoria: "Bollería",
    hay: 40,
    ingresa: 5,
    queda: 35,
    precio: 20,
    consumo: 10,
    total: 200,
  },
];

export const DashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Repartidores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Despacho Mañana
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Despacho Tarde
              </a>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h1 className="mt-4 mb-4">Dashboard</h1>

          {/* Cards con métricas */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Pan Vendido</h5>
                  <p className="card-text">
                    {repartidores.reduce((acc, r) => acc + r.panVendido, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Ventas Mañana</h5>
                  <p className="card-text">
                    {despachoManana.reduce((acc, d) => acc + d.total, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Ventas Tarde</h5>
                  <p className="card-text">
                    {despachoTarde.reduce((acc, d) => acc + d.total, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla Repartidores */}
          <h2>Repartidores</h2>
          <div className="table-responsive mb-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Pan Vendido</th>
                  <th>Extra</th>
                  <th>Regreso</th>
                  <th>Cambios</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {repartidores.map((r) => (
                  <tr key={r.nombre}>
                    <td>{r.nombre}</td>
                    <td>{r.panVendido}</td>
                    <td>{r.extra}</td>
                    <td>{r.regreso}</td>
                    <td>{r.cambios}</td>
                    <td>{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabla Despacho Mañana */}
          <h2>Despacho Mañana</h2>
          <div className="table-responsive mb-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Hay</th>
                  <th>Ingresa</th>
                  <th>Queda</th>
                  <th>Precio</th>
                  <th>Consumo</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {despachoManana.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.categoria}</td>
                    <td>{d.hay}</td>
                    <td>{d.ingresa}</td>
                    <td>{d.queda}</td>
                    <td>{d.precio}</td>
                    <td>{d.consumo}</td>
                    <td>{d.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabla Despacho Tarde */}
          <h2>Despacho Tarde</h2>
          <div className="table-responsive mb-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Hay</th>
                  <th>Ingresa</th>
                  <th>Queda</th>
                  <th>Precio</th>
                  <th>Consumo</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {despachoTarde.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.categoria}</td>
                    <td>{d.hay}</td>
                    <td>{d.ingresa}</td>
                    <td>{d.queda}</td>
                    <td>{d.precio}</td>
                    <td>{d.consumo}</td>
                    <td>{d.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
