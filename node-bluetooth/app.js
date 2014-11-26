var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.on('found', function(address, name) {
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {

            btSerial.on('data', function(buffer) {
                console.log("read: " + buffer.toString('utf-8'));
            });

            var state = true;
            setInterval(function () {
                state = !state;
                var printed = state ? '1' : '0';
                btSerial.write(new Buffer(printed, 'utf-8'), function(err, bytesWritten) {
                    if (err) console.log(err);
                });
            }, 1000);
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        btSerial.close();
    });
});

btSerial.inquire();