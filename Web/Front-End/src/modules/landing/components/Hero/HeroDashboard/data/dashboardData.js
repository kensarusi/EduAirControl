import {
    Activity,
    Leaf,
    Thermometer,
    Droplets,
    Bell,
    Database
} from "lucide-react";

export const metrics = [

    {
        icon: Activity,
        title: "Calidad del Aire",
        value: 28,
        unit: "",
        status: "Excelente",
        color: "#43FF72"
    },

    {
        icon: Leaf,
        title: "CO₂",
        value: 612,
        unit: "ppm",
        status: "Bueno",
        color: "#28F4D6"
    },

    {
        icon: Droplets,
        title: "Humedad",
        value: 48,
        unit: "%",
        status: "Optimp",
        color: "#38BDF8"
    },

    {
        icon: Thermometer,
        title: "Temperatura",
        value: 23.6,
        unit: "°C",
        status: "Comfortable",
        color: "#FBBF24"
    }

];