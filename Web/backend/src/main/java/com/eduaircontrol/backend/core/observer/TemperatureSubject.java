package com.eduaircontrol.backend.core.observer;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TemperatureSubject implements Subject{
    
    private final List<Observer> observers = new ArrayList<>();

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
    
    public void CheckTemperature(double value){
        if (value > 27) {
            notifyObservers("Temperatura critica detectada" + value);
        }
    }
    
}
