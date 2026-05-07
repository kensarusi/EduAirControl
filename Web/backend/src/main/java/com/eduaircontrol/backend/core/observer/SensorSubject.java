package com.eduaircontrol.backend.core.observer;

import java.util.ArrayList;
import java.util.List;

public class SensorSubject implements Subject{
    
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
    public void notifyObservers(SensorEvent event) {
        observers.forEach (o -> o.update(event));
    }
    
    public void detectChange(SensorEvent event){
        notifyObservers(event);
    }
    
}
