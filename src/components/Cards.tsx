import { Card, CardContent, Typography } from "@mui/material";

interface CardProps {
  title: string; // Texto del titulo
  value: number | string; // Valor a mostrar
  color: string;
}

export const Cards = ({ title, value, color }: CardProps) => {
  return (
    <Card
      sx={{ bgcolor: color, color: "#FFFFFF", borderRadius: 3 }}
      elevation={6}
    >
      <CardContent>
        {/* Titulo */}
        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
          {title}
        </Typography>
        {/* Valor */}
        <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
