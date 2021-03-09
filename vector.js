class Vector{
  constructor(x = 0,y = 0){
    this.x = x
    this.y = y
  }
  sum(vec){
    this.x += Number(vec.x.toFixed(4))
    this.y += Number(vec.y.toFixed(4))
    return this
  }
  sub(vec){
    this.x -= vec.x 
    this.y -= vec.y
    return this
  }
  mult(vec){
    if(vec instanceof Vector){
      this.x *= vec.x
      this.y *= vec.y
      return this
    }
      this.x *= vec
      this.y *= vec
      return this  
    }
  div(vec){
    
    if(vec.x === 0 || vec.y === 0 || vec === 0){
      return this
    }
    if(vec instanceof Vector){
      this.x = this.x / vec.x
      this.y = this.y / vec.y
      return this
      }
    this.x = this.x / vec
    this.y = this.y / vec
    return this
  }
  mag(){
     let mag = Math.sqrt((this.x * this.x) + (this.y * this.y))
     if(isNaN(mag)){
         console.log('mag',this.x, this.y)
     }
     return mag
  }
  norm(){
    let leng = this.mag()    
    return this.mult(1/leng)
  }
  setMag(n){
    return this.norm().mult(n)
  }
  limit(max){
    if(this.mag() > max){
      return this.div(this.mag()).mult(max)
    }
   
  }
}


export default Vector