export class ByteArray {
	bytes:string;
	
	constructor(input: string="") {
		this.bytes = input;
	}
	
	// getter
	get length() {
		return this.bytes.length;
	}
	
	get bytesAvailable() {
		return this.bytes.length > 0;
	}
	
	// write
	write(value:string="") {
		this.bytes+=value;
		return this;
	}
	
	writeByte(value:number=0) {
		return this.write(String.fromCharCode(value&0xFF));
	}
	
	writeBoolean(value:boolean=false) {
		return this.writeByte(value&&1||0);
	}
	
	writeShort(value:number=0) {
		return this.writeByte((value>>8)&0xFF).writeByte(value&0xFF);
	}
	
	writeInt(value:number=0) {
		return this.writeByte((value>>24)&0xFF).writeByte((value>>16)&0xFF).writeByte((value>>8)&0xFF).writeByte(value&0xFF);
	}
	
	writeUTF(value:string="") {
		return this.writeShort(value.length).write(value);
	}
	
	// read (getter-like: [ByteArray.readByte])
	get readByte() {
		const byte=this.bytes.charCodeAt(0);
		this.bytes=this.bytes.substr(1);
		return byte;
	}
	
	get readBoolean() {
		return this.readByte==0&&false||true;
	}
	
	get readShort() {
		return this.readByte<<8|this.readByte<<0;
	}
	
	get readInt() {
		return this.readByte<<24|this.readByte<<16|this.readByte<<8|this.readByte<<0;
	}
	
	get readUTF() {
		const length=this.readShort,result=this.bytes.substr(0, length);
		this.bytes=this.bytes.substr(length,this.bytes.length);
		return result;
	}
}