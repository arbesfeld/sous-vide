/*
This code will run the bluetooth as slave
pressing 1 turns on led 4
pressing 0 turns off led 4
*/

#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define RxD 1
#define TxD 0

#define TEMP_PIN 3
#define LED_PIN 7
#define RED_PIN 5
#define GREEN_PIN 4
#define BLUE_PIN 3

#define DEBUG_ENABLED  1
 
SoftwareSerial blueToothSerial(RxD,TxD);
 
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(TEMP_PIN);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

void setup() 
{ 
  blueToothSerial.begin(57600);
  
  pinMode(TEMP_PIN,INPUT);
  
  pinMode(LED_PIN,OUTPUT);
  digitalWrite(LED_PIN,HIGH);
 
  pinMode(RED_PIN,OUTPUT);
  pinMode(GREEN_PIN,OUTPUT);
  pinMode(BLUE_PIN,OUTPUT);
} 
 
void loop() 
{ 
  
  char recvChar;
  //check if there's any data sent from the remote bluetooth shield
  if(blueToothSerial.available()) {
    recvChar = blueToothSerial.read();
    blueToothSerial.print(recvChar);
    
    if(recvChar == '1')
      digitalWrite(LED_PIN, HIGH);
    else if (recvChar == '2')
      digitalWrite(LED_PIN, LOW);
   }
   
   delay(1000);
} 

void setColor(int red, int green, int blue)
{
  #ifdef COMMON_ANODE
    red = 255 - red;
    green = 255 - green;
    blue = 255 - blue;
  #endif
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);  
}
