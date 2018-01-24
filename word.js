var GameWord = function (wordlist){
    this.newList = wordlist,
    this.idxRemove = ""
    
};
GameWord.prototype.randomNumber = function (min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}
GameWord.prototype.word = function(){
    var max = this.newList.length;
    var r = this.randomNumber(max,0)
    this.idxRemove = r
    return this.newList[r];
}
GameWord.prototype.removeItm = function(){
    if(this.idxRemove>=0){
        this.newList.splice(this.idxRemove,1);
    }
}

module.exports = GameWord;



