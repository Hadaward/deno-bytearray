# deno-bytearray
A byte wrapper that assists in the transmission of data packets between server and client.

# Example
```TypeScript
import {ByteArray} from "https://deno.land/x/bytearray@1.0.0/mod.ts";

// Writing data
const packet = new ByteArray().writeShort(2021).writeUTF("Hello world!");
console.log(packet.bytes); // result: å♀Hello world!
console.log(packet); // result: ByteArray { bytes: "\x07å\x00\fHello world!" }

// Reading data
console.log(packet.length, packet.readShort, packet.readUTF, packet.bytesAvailable); // result: 16 2021 Hello world! false

// If you have a string and need to unpack data you can initialize the ByteArray class with the string as the first argument:
const packet2 = new ByteArray("\x07å\x00\fHello world!");
console.log(packet2.bytesAvailable, packet2.readShort, packet2.readUTF); // result: true 2021 Hello world!
```
