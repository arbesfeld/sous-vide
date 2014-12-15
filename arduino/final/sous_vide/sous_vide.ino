
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is plugged into pin 3 on the Arduino
#define ONE_WIRE_BUS 14
#define RELAY_PIN 15

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

//DeviceAddress thermometer = { 0x28, 0x81, 0x63, 0xB3, 0x05, 0x00, 0x00, 0xB0 };

float setpoint = -1;
unsigned long endTime;
float epsilon = 2.0;
boolean goingUp = false;

void setup(void)
{
  // start serial port
  Serial.begin(57600);
  
  // Start up the library
  sensors.begin();
  // set the resolution to 10 bit (good enough?)
  //  sensors.setResolution(thermometer, 10);
  endTime = millis();
  pinMode(RELAY_PIN,OUTPUT);
}

float getAndPrintTemperature()
{
  float tempC = sensors.getTempCByIndex(0);
  if (tempC == -127.00) {
    Serial.println("ERROR");
  } else {
    Serial.println(tempC);
  }
  
  return tempC;
}

void readSerial()
{
   if (Serial.available()) {
     int identifier = Serial.parseInt();
     if (identifier == 1) {
       unsigned long seconds = Serial.parseInt();
       
       setpoint = Serial.parseFloat();
       
       unsigned long currentTime = millis();
       endTime = currentTime + seconds * 1000;
       delay(2000);
     } else if (identifier == 2) {
       epsilon = Serial.parseInt(); 
     }
   } 
}
void loop(void)
{ 
  sensors.requestTemperatures();
  
  float temp = getAndPrintTemperature();
  
  readSerial();
  
  if (setpoint < 0) {
    // yet to receive a command
    return;
  }
  
  if (millis() > endTime) {
     // stop cooking
   setpoint = -1;
   digitalWrite(RELAY_PIN, LOW);
     Serial.println("DONE");
   goingUp = false;
   return; 
  }
  
  if (goingUp && temp > setpoint) {
     // we passed the threshold, now let's turn off the heater and go down
     digitalWrite(RELAY_PIN, LOW);
     Serial.println("OFF");
     goingUp = false;
  } else if (! goingUp && temp < setpoint - 2 * epsilon) {
     // we should turn on the heater if we are below the top threshold
     digitalWrite(RELAY_PIN, HIGH);
     Serial.println("ON");
     goingUp = true;
  }
}
