//https://youtu.be/HvDqbzu0i0E
//https://observablehq.com/@mbostock/quadtree-art

class Histogram{
	constructor(blob){
		this.img = blob;
		this.img.loadPixels();
		this.px = this.img.pixels;
		
		this.R = new Uint32Array(256);
		this.G = new Uint32Array(256);
		this.B = new Uint32Array(256);
		// this.A = new Uint32Array(256);
		this.total = 0;
		this.varianceR = this.varianceG = this.varianceB = 0;
		this.meanR = this.meanG = this.meanB = 0;
		this.totalR = this.totalG = this.totalB = 0;
		this.valueR = this.valueG = this.valueB = 0;
		this.stdDeviation = 0;
		this.error = 0;
		this.area_exponent = 0.25
		this.area_error = Math.pow(blob.width*blob.height, this.area_exponent);

		//histogram
		for(let i=0,v=0;i<this.px.length;i+=4){
			this.R[ this.px[i + 0] ]++; //red
			this.G[ this.px[i + 1] ]++; //green
			this.B[ this.px[i + 2] ]++; //blue
			// this.A[ this.px[i + 3] ]++; //alpha
		}
	}
	rgb(){
		return [this.R, this.G, this.B];
	}
	avg(){
		
		for(let i=0;i < 256;i++){
			this.totalR += this.R[i];
			this.totalG += this.G[i];
			this.totalB += this.B[i];
			//sum weighted 
			this.valueR += this.R[i] * i;
			this.valueG += this.G[i] * i;
			this.valueB += this.B[i] * i;
		}
		
		//True mean
		this.meanR = this.totalR / this.R.length;
		this.meanG = this.totalG / this.G.length;
		this.meanB = this.totalB / this.B.length;
		
		// //what is this?
		this.valueR /= totalR;
		this.valueG /= totalG;
		this.valueB /= totalB;
				
	}
	weightedAvg(){

	// weightedAvg
		for(let i=0;i < 256;i++){
			this.varianceR += sq( avg.valueR - i ) * this.R[i];
			this.varianceG += sq( avg.valueG - i ) * this.G[i];
			this.varianceB += sq( avg.valueB - i ) * this.B[i];
		}
		
		this.varianceR = Math.sqrt(this.varianceR / this.totalR);
		this.varianceB = Math.sqrt(this.varianceB / this.totalB);
		this.varianceG = Math.sqrt(this.varianceG / this.totalG);
		
		this.total = (this.totalR + this.totalG + this.totalB) / 3;
		this.variance = this.varianceR * 0.2989 + this.varianceG * 0.5870 + this.varianceB * 0.1140;
		this.stdDeviation = Math.sqrt( this.variance );
		this.error = this.stdDeviation * this.area_error;
		
		return [this.valueR,
						this.valueG,
						this.valueB, 
						this.error ]; 
	}
}







