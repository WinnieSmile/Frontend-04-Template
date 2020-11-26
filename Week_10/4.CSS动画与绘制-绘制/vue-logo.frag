precision mediump float;
void mainImage(){

}
float distance(vec2 point, vec3 line){
    return (line.x + line.y * point.y + line.z) / sqrt(point.x * point.x + point.y * point.y);
}

void main(){
    
}