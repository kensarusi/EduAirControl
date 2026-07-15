import "./MetricCard.css";

export default function MetricCard({

icon:Icon,

title,

value,

unit,

status,

color,

children

}){

return(

<div className="metric-card">

<div className="metric-top">

<div className="metric-title">

<Icon

size={17}

color={color}

/>

<span>{title}</span>

</div>

</div>

<div className="metric-value">

{value}

<small>{unit}</small>

</div>

<div

className="metric-status"

style={{

color

}}

>

{status}

</div>

{children}

</div>

);

}