import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface DataTableProps {
  title: string; // Titulo de la tabla
  headers: string[]; //Encabezados de las columnas
  rows: (string | number)[][]; // Filas de la tabla
}

export const DataTable = ({ title, headers, rows }: DataTableProps) => {
  return (
    <>
      {/* Titulo de la tabla */}
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        {title}
      </Typography>
      {/* Contenedor de la tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rIndex) => (
              <TableRow key={rIndex}>
                {row.map((cell, cIndex) => (
                  <TableCell key={cIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
