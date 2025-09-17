import { Card, CardContent, Typography } from "@mui/material";

interface CardProps {
  title: string; // Texto del titulo
  value: number; // Valor a mostrar
  color: "primary" | "success" | "warning"; //Colores de la paleta de MUI
}

export const Cards = ({ title, value, color }: CardProps) => {
  return (
    <Card
      sx={{ bgcolor: `${color}.main`, color: "white", borderRadius: 3 }}
      elevation={6}
    >
      <CardContent>
        {/* Titulo */}
        <Typography variant="h6">{title}</Typography>
        {/* Valor */}
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};
