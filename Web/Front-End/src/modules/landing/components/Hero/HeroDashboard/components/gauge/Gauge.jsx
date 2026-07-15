import "./Gauge.css";

export default function Gauge({

    value,

    label,

    color="#3cff78"

}){

const radius=70;

const stroke=10;

const normalizedRadius=radius-stroke;

const circumference=normalizedRadius*2*Math.PI;

const strokeDashoffset=

circumference-(value/100)*circumference;

return(

<div className="gauge">

<svg

height={radius*2}

width={radius*2}>

<circle

stroke="#203145"

fill="transparent"

strokeWidth={stroke}

r={normalizedRadius}

cx={radius}

cy={radius}

/>

<circle

stroke={color}

fill="transparent"

strokeLinecap="round"

strokeWidth={stroke}

strokeDasharray={`${circumference} ${circumference}`}

style={{

strokeDashoffset

}}

r={normalizedRadius}

cx={radius}

cy={radius}

/>

</svg>

<div className="gauge-content">

<h2>{value}</h2>

<span>{label}</span>

</div>

</div>

);

}