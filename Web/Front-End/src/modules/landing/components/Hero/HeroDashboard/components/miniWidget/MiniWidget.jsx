import "./MiniWidget.css";

export default function MiniWidget({

icon:Icon,

title,

value,

subtitle,

color

}){

return(

<div className="mini-widget">

<div className="mini-top">

<Icon

size={18}

color={color}

/>

<span>{title}</span>

</div>

<div
className="mini-value">

{value}

</div>

<div

className="mini-subtitle"

style={{

color

}}

>

{subtitle}

</div>

</div>

);

}