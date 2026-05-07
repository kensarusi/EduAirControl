package com.eduaircontrol.backend.core.observer;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SensorEvent {
    private String type; //la variable(co2 temperatura, ruido)
    private double value; //El valor de la variable
    private String aula; //la ubicacion o el aula con la notificacion
    private String email; //El correo al que le va a llegar la notificacion

    public SensorEvent(String type, double value, String aula, String email) {
        this.type = type;
        this.value = value;
        this.aula = aula;
        this.email = email;
    }
}
