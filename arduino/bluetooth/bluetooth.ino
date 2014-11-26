/*
This code will run the bluetooth as slave
pressing 1 turns on led 4
pressing 0 turns off led 4
*/

#include <SoftwareSerial.h>

#define RxD 0
#define TxD 1

#define DEBUG_ENABLED  1
 
SoftwareSerial blueToothSerial(RxD,TxD);

int led = 7;
 
void setup() 
{ 
  pinMode(RxD, INPUT);
  pinMode(TxD, OUTPUT);
  setupBlueToothConnection();
  
  pinMode(led,OUTPUT);
  digitalWrite(led,HIGH);
 
} 
 
void loop() 
{ 
  char recvChar;
  while(1){
    //check if there's any data sent from the remote bluetooth shield
    if(blueToothSerial.available()){
      recvChar = blueToothSerial.read();
      blueToothSerial.print(recvChar);
      
        if(recvChar == '1')
          digitalWrite(led,HIGH);  
       
        else
          digitalWrite(led,LOW); 
    }
  }
} 
 
void setupBlueToothConnection()
{
  blueToothSerial.begin(9600); //Set BluetoothBee BaudRate to default baud rate 38400
  delay(1000);
  blueToothSerial.print("\r\n+STWMOD=0\r\n"); //set the bluetooth work in slave mode
  delay(200);
  blueToothSerial.print("\r\n+STNA=Arbesfeld\r\n"); //set the bluetooth name as "HC-05"
  delay(200);
  blueToothSerial.print("\r\n+STOAUT=1\r\n"); // Permit Paired device to connect me
  blueToothSerial.print("\r\n+STAUTO=0\r\n"); // Auto-connection should be forbidden here
  
  delay(2000); // This delay is required.
  //blueToothSerial.print("\r\n+INQ=1\r\n"); //make the slave bluetooth inquirable 
  blueToothSerial.print("bluetooth connected!\n");
  
  delay(2000); // This delay is required.
  blueToothSerial.flush();
}

